export type JobSection = {
  title: string;
  /** Plain text; use \\n\\n between paragraphs */
  content?: string;
  items?: string[];
};

export const JOB_DETAILS = {
  company: "Sky Alliance Group, Inc.",
  title: "Business Development Representative",
  subtitle: "Business Account Representative (B2B Sales)",
  location: "Dallas, TX",
  type: "Full-Time",
  department: "B2B Sales",
  salary: "$55,000 - $110,000 a year",
  metaLine: "Dallas, TX | Full-Time | Sky Alliance Inc.",
  sections: [
    {
      title: "About Sky Alliance",
      content: `Sky Alliance is a rapidly growing sales and marketing firm specializing in customer acquisition and business development for leading telecommunications clients. Through consultative sales strategies and in-person relationship building, we help companies expand their business customer base while providing our team members with a clear path toward leadership and management.

As we continue expanding our Business-to-Business (B2B) campaign in Dallas, we are looking for motivated professionals who are eager to develop their skills in business development, client relationship management, and strategic sales.`,
    },
    {
      title: "Position Overview",
      content: `The Business Account Representative will focus on developing relationships with small and medium-sized business owners in the Dallas area. In this role, you will represent our clients, present tailored business solutions, and drive new customer acquisition through professional, consultative sales.

This role is ideal for individuals looking to build a career in business development, sales leadership, or account management within a fast-growing company.`,
    },
    {
      title: "Key Responsibilities",
      items: [
        "Build and maintain strong relationships with local business owners and decision-makers",
        "Conduct in-person consultations to present business solutions and value propositions",
        "Identify and develop new business opportunities within assigned territories",
        "Manage client accounts and ensure a high level of customer satisfaction",
        "Track sales activity and pipeline using CRM tools",
        "Collaborate with team members and leadership to exceed campaign targets",
        "Participate in ongoing training focused on sales strategy, leadership, and professional development",
      ],
    },
    {
      title: "What We Look For",
      items: [
        "Strong communication and relationship-building skills",
        "Self-motivated, goal-oriented mindset",
        "Professional presence when interacting with business clients",
        "Ability to thrive in a fast-paced, team-driven environment",
        "Desire to grow into leadership and management roles",
      ],
    },
    {
      title: "Qualifications",
      items: [
        "Bachelor’s degree preferred",
        "0–3 years of experience in sales, business development, customer service, or account management",
        "Proficiency in Microsoft Office (Excel, Word, PowerPoint)",
        "Familiarity with CRM systems such as Salesforce or HubSpot is preferred",
        "Ability to manage multiple client interactions and maintain organized sales records",
        "Background in telecommunications, B2B sales, or consulting is advantageous but not required",
      ],
    },
    {
      title: "Practical Requirements",
      items: [
        "Valid Driver’s License and reliable transportation to commute to our North Dallas location.",
      ],
    },
    {
      title: "What We Offer",
      items: [
        "Competitive Earnings: Base pay plus performance bonuses with On Target Earnings of $55,000–$110,000",
        "Career Growth: Clear advancement opportunities into leadership and management roles",
        "Professional Development: Ongoing training in business development, consultative sales, and client management",
        "Mentorship: Work closely with experienced leaders invested in your success",
        "Collaborative Culture: A supportive, team-driven environment focused on growth and results",
      ],
    },
    {
      title: "Pay",
      content: "$55,000.00 - $110,000.00 per year",
    },
    {
      title: "Benefits",
      items: [
        "401(k)",
        "Dental insurance",
        "Employee discount",
        "Health insurance",
        "Paid time off",
        "Vision insurance",
      ],
    },
    {
      title: "Work Location",
      content: "In person",
    },
  ] satisfies JobSection[],
};
