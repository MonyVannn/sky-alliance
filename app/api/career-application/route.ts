import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure you have RESEND_API_KEY set in your environment variables.
const resend = new Resend(process.env.RESEND_API_KEY || "re_123456789");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const mobile = formData.get("mobile") as string;
    const phone = formData.get("phone") as string;
    const optInSms = formData.get("optInSms") === "true";
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
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let attachments = [];
    if (resume) {
      const buffer = await resume.arrayBuffer();
      attachments.push({
        filename: resume.name,
        content: Buffer.from(buffer),
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Sky Alliance Careers <onboarding@resend.dev>", // Update to verified domain e.g. careers@skyallianceinc.com in prod
      to: process.env.CAREER_APPLICATION_TO || "hr@skyallianceinc.com",
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
