"use server";

import { Resend } from "resend";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitCareerApplication(
  prevState: ApplicationState,
  formData: FormData
): Promise<ApplicationState> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return { status: "error", message: "Server configuration error" };
    }

    const resend = new Resend(apiKey);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const mobile = formData.get("mobile") as string;
    const phone = formData.get("phone") as string;
    const optInSms = formData.get("optInSms") === "on" || formData.get("optInSms") === "true";
    const email = formData.get("email") as string;
    const socialProfile = formData.get("socialProfile") as string;
    const university = formData.get("university") as string;
    const address1 = formData.get("address1") as string;
    const address2 = formData.get("address2") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const zip = formData.get("zip") as string;
    const resume = formData.get("resume") as File | null;

    if (!firstName || !lastName || !mobile || !phone || !email) {
      return { status: "error", message: "Missing required fields" };
    }

    const attachments = [];
    if (resume && resume.size > 0) {
      const buffer = await resume.arrayBuffer();
      attachments.push({
        filename: resume.name,
        content: Buffer.from(buffer),
      });
    }

    const fromEmail = process.env.RESEND_FROM;
    if (!fromEmail) {
      console.error("Missing RESEND_FROM environment variable");
      return { status: "error", message: "Server configuration error" };
    }

    const toEmail = process.env.CAREER_APPLICATION_TO || "hr@skyallianceinc.com";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Job Application: ${firstName} ${lastName}`,
      text: `
New application received.

Name: ${firstName} ${lastName}
Mobile: ${mobile}
Phone: ${phone}
Opt In - SMS: ${optInSms ? "Yes" : "No"}
Email: ${email}
Social Profile: ${socialProfile || "N/A"}
University/College: ${university || "N/A"}

Address:
${address1 || "N/A"}
${address2 || ""}
${city || "N/A"}, ${state || "N/A"} ${zip || "N/A"}

${resume ? "Resume is attached." : "No resume attached."}
      `,
      attachments,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { status: "error", message: error.message };
    }

    return { status: "success" };
  } catch (error) {
    console.error("Career application error:", error);
    return { status: "error", message: "Internal server error" };
  }
}
