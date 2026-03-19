import type { TeamMemberCardProps } from "@/components/TeamMemberCard";

export type TeamMember = TeamMemberCardProps;

/** Portrait-oriented Unsplash URLs (placeholders until you add real headshots). */
const unsplashPortrait = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&h=1000&q=80`;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Alex Rivera",
    title: "Managing Partner",
    bio: "Sets strategic direction and builds long-term client relationships across Sky Alliance’s growth initiatives.",
    extendedBio:
      "Alex leads firm-wide strategy and partnership development, aligning Sky Alliance’s consultative model with client growth goals across Texas and beyond. They focus on durable client relationships, clear executive communication, and measurable outcomes.\n\nWith a background in business development and account leadership, Alex works closely with operations and field teams to keep campaigns coordinated, accountable, and grounded in what clients actually need to scale.",
    imageSrc: unsplashPortrait("photo-1560250097-0b93528c311a"),
    socials: {
      linkedin: "https://www.linkedin.com/company/skyalliancetx/",
      facebook: "https://www.facebook.com/skyalliancetx",
      x: "https://x.com/SkyAllianceTX",
    },
  },
  {
    name: "Jordan Kim",
    title: "Director of Operations",
    bio: "Oversees campaign execution and ensures every team hits targets with clarity, momentum, and strong coaching.",
    extendedBio:
      "Jordan owns day-to-day execution across Sky Alliance’s campaigns—translating strategy into calendars, quality standards, and consistent performance in the field. They coach leads, tighten processes, and remove friction so teams can focus on results.\n\nJordan is known for structured communication, rapid problem-solving, and a steady hand when timelines compress or priorities shift mid-quarter.",
    imageSrc: unsplashPortrait("photo-1472099645785-5658abf4ff4e"),
    socials: {
      linkedin: "https://www.linkedin.com/company/skyalliancetx/",
    },
  },
  {
    name: "Sam Patel",
    title: "Business Development Lead",
    bio: "Focuses on consultative outreach and partnership expansion in the Dallas B2B market.",
    extendedBio:
      "Sam drives outbound partnership conversations and consultative first meetings, emphasizing trust, fit, and long-term value over quick wins. They map market opportunities in Dallas B2B and connect the right stakeholders early.\n\nTheir work spans targeting, messaging discipline, and follow-through—ensuring opportunities progress with clarity and that Sky Alliance enters each engagement prepared.",
    imageSrc: unsplashPortrait("photo-1519345182560-3f2917c472ef"),
  },
  {
    name: "Taylor Brooks",
    title: "Sales Training Manager",
    bio: "Designs onboarding and skill development so new hires ramp quickly and lead with confidence.",
    extendedBio:
      "Taylor builds onboarding paths, role-play frameworks, and skill drills that help new hires ramp fast without cutting corners on quality. They partner with leads to reinforce standards and celebrate improvement over time.\n\nFrom foundational product knowledge to advanced conversation control, Taylor’s programs emphasize practice, feedback, and consistency in the field.",
    imageSrc: unsplashPortrait("photo-1500648767791-00dcc994a43e"),
    socials: {
      linkedin: "https://www.linkedin.com/company/skyalliancetx/",
      facebook: "https://www.facebook.com/skyalliancetx",
    },
  },
  {
    name: "Morgan Lee",
    title: "Campaign Coordinator",
    bio: "Keeps field campaigns organized and aligned with client goals from kickoff through reporting.",
    extendedBio:
      "Morgan is the operational glue for multi-touch campaigns—tracking milestones, materials, and reporting so nothing slips between teams and clients. They keep communication tight from kickoff through wrap-up.\n\nThey thrive on detail, proactive updates, and translating client goals into practical weekly execution that field teams can run with confidence.",
    imageSrc: unsplashPortrait("photo-1494790108377-be9c29b29330"),
    socials: {
      x: "https://x.com/SkyAllianceTX",
    },
  },
  {
    name: "Casey Nguyen",
    title: "Account Specialist",
    bio: "Serves as a day-to-day partner for clients, turning feedback into fast, measurable improvements.",
    extendedBio:
      "Casey is the reliable day-to-day contact for clients—translating feedback into action, coordinating internal teams, and keeping expectations clear. They focus on responsiveness and follow-through.\n\nWhether adjusting messaging, tightening reporting, or escalating risks early, Casey helps clients see progress week over week with transparency and care.",
    imageSrc: unsplashPortrait("photo-1506794778202-cad84cf45f1d"),
  },
  {
    name: "Riley Washington",
    title: "Regional Lead",
    bio: "Grows market share through disciplined team leadership and high standards for customer experience.",
    extendedBio:
      "Riley leads regional execution with an emphasis on coaching standards, customer experience, and disciplined growth. They set clear expectations, inspect what they expect, and elevate performance through consistent mentorship.\n\nTheir leadership style blends accountability with support—building teams that can scale reputation as well as revenue.",
    imageSrc: unsplashPortrait("photo-1438761681033-6461ffad8d80"),
    socials: {
      linkedin: "https://www.linkedin.com/company/skyalliancetx/",
    },
  },
  {
    name: "Jamie Ortiz",
    title: "Talent & Culture",
    bio: "Champions hiring, mentorship, and the collaborative culture that makes Sky Alliance a place people want to grow.",
    extendedBio:
      "Jamie shapes hiring, onboarding culture, and ongoing mentorship so Sky Alliance attracts people who want to grow—and gives them room to do it. They build systems that reinforce collaboration and recognition.\n\nFrom interview loops to team rituals, Jamie keeps culture intentional: clear values, fair feedback, and a workplace where great work is visible and celebrated.",
    imageSrc: unsplashPortrait("photo-1534528741775-53994a69daeb"),
    socials: {
      linkedin: "https://www.linkedin.com/company/skyalliancetx/",
      facebook: "https://www.facebook.com/skyalliancetx",
    },
  },
];
