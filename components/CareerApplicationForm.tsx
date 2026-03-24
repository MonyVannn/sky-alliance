"use client";

import { useState } from "react";
import React from "react";

export default function CareerApplicationForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    phone: "",
    optInSms: true,
    email: "",
    socialProfile: "",
    university: "",
    address1: "",
    address2: "",
    city: "",
    state: "Alabama",
    zip: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      if (file) {
        formData.append("resume", file);
      }

      const res = await fetch("/api/career-application", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
      setForm({
        firstName: "",
        lastName: "",
        mobile: "",
        phone: "",
        optInSms: true,
        email: "",
        socialProfile: "",
        university: "",
        address1: "",
        address2: "",
        city: "",
        state: "Alabama",
        zip: "",
      });
      setFile(null);
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="firstName"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            First Name <span style={{ color: "#ff6f00" }}>*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="lastName"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            Last Name <span style={{ color: "#ff6f00" }}>*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="mobile"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            Mobile <span style={{ color: "#ff6f00" }}>*</span>
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            Phone <span style={{ color: "#ff6f00" }}>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          id="optInSms"
          name="optInSms"
          type="checkbox"
          checked={form.optInSms}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-[#4a148c] focus:ring-[#4a148c]"
        />
        <label
          htmlFor="optInSms"
          className="text-xs text-neutral-500 leading-relaxed"
        >
          <span className="font-semibold text-neutral-700 block mb-0.5">
            Opt In - SMS
          </span>
          Check this checkbox to opt-in to receiving SMS updates about your
          application and scheduling.
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            Email <span style={{ color: "#ff6f00" }}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="socialProfile"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            Social Profile
          </label>
          <input
            id="socialProfile"
            name="socialProfile"
            type="url"
            placeholder="Ex: http://www.facebook.com/YOUR NAME"
            value={form.socialProfile}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
          <span className="text-[10px] text-neutral-400">
            Facebook/Twitter/LinkedIn
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="university"
          className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
        >
          University/College
        </label>
        <input
          id="university"
          name="university"
          type="text"
          value={form.university}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
        />
      </div>

      <p className="text-xs text-neutral-500 border-b border-neutral-200 pb-4">
        All fields marked with an asterisk(*) are required.
      </p>

      <h4 className="text-sm font-semibold text-neutral-400">Optional</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address1"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            Address 1
          </label>
          <input
            id="address1"
            name="address1"
            type="text"
            value={form.address1}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address2"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            Address 2
          </label>
          <input
            id="address2"
            name="address2"
            type="text"
            value={form.address2}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="city"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="state"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
          >
            State/Province
          </label>
          <select
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
          >
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full sm:w-1/2 pr-2">
        <label
          htmlFor="zip"
          className="text-xs font-semibold uppercase tracking-widest text-neutral-500"
        >
          Zip / Postal Code
        </label>
        <input
          id="zip"
          name="zip"
          type="text"
          value={form.zip}
          onChange={handleChange}
          className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-[#171717] outline-none transition-all focus:border-[#4a148c] focus:bg-white focus:ring-2 focus:ring-[#4a148c]/10"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Resume <span style={{ color: "#ff6f00" }}>*</span>
        </label>
        <div className="relative w-full rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center hover:bg-neutral-100 transition-colors duration-200">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-sm text-neutral-600">
            {file ? (
              <span className="font-medium text-[#4a148c]">{file.name}</span>
            ) : (
              <span>
                Drag & drop or{" "}
                <span className="text-[#4a148c] underline">browse</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {submitStatus === "success" && (
        <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
          Application submitted successfully! We'll be in touch soon.
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          There was an error submitting your application. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
        mt-2 w-full relative z-0 flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-neutral-700
        px-7 py-3 text-sm font-semibold text-[#171717] cursor-pointer transition-all duration-300
        before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:scale-[2.5]
        before:rounded-[100%] before:bg-neutral-900 before:transition-transform before:duration-1000 before:content-['']
        hover:scale-[1.02] hover:border-neutral-900 hover:text-white hover:before:translate-y-[0%]
        active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:text-[#171717] disabled:hover:border-neutral-700 disabled:before:hidden
      "
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
