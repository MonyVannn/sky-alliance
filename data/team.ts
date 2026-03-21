import type { TeamMemberCardProps } from "@/components/TeamMemberCard";

export type TeamMember = TeamMemberCardProps;

/** Portrait-oriented Unsplash URLs (placeholders until you add real headshots). */
const unsplashPortrait = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&h=1000&q=80`;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Kong Y Sun",
    title: "Manager",
    bio: "Sets strategic direction and builds long-term client relationships across Sky Alliance’s growth initiatives.",
    extendedBio:
      "Kong leads firm-wide strategy and partnership development, aligning Sky Alliance’s consultative model with client growth goals across Texas and beyond. They focus on durable client relationships, clear executive communication, and measurable outcomes.\n\nWith a background in business development and account leadership, Alex works closely with operations and field teams to keep campaigns coordinated, accountable, and grounded in what clients actually need to scale.",
    imageSrc: "/team/kong.png",
    socials: {
      linkedin: "https://www.linkedin.com/company/skyalliancetx/",
      facebook: "https://www.facebook.com/skyalliancetx",
      x: "https://x.com/SkyAllianceTX",
    },
  },
  {
    "name": "Nancy Ding",
    "title": "Business Analytics",
    "bio": "Oversees data execution and ensures every team hits targets through precise modeling, trend analysis, and actionable insights.",
    "extendedBio": "Nancy leads the analytical engine at Sky Alliance—translating raw data into strategic roadmaps, performance benchmarks, and high-level reporting. She bridges the gap between complex datasets and executive decision-making, ensuring every campaign is backed by empirical evidence and rigorous quality standards.\n\nNancy is known for her ability to spot emerging market trends, optimize operational efficiency through predictive modeling, and maintain data integrity even when navigating high-velocity shifts in project scope.",
    "imageSrc": "/team/nancy.png",
    "socials": {
      "linkedin": "https://www.linkedin.com/company/skyalliancetx/",
    },
  },
  {
    "name": "Eric Yoon",
    "title": "Team Lead",
    "bio": "Focuses on consultative outreach and partnership expansion in the Dallas B2B market.",
    "extendedBio": "Eric spearheads Sky Alliance’s partnership initiatives in the Dallas B2B sector, balancing high-level market mapping with the hands-on mentorship of his outreach team. He prioritizes a consultative approach, ensuring that every initial engagement is built on trust, long-term value, and a deep understanding of stakeholder needs.\n\nBeyond driving his own portfolio, Eric is responsible for sharpening the team's messaging discipline and outbound strategy. He ensures the Dallas team maintains a high standard of follow-through, navigating complex market opportunities with the clarity and preparation necessary to hit aggressive growth targets.",
    "imageSrc": "/team/eric.png",
  },
  {
    "name": "Derrick Luckett Jr",
    "title": "Team Lead",
    "bio": "Designs onboarding and skill development so new hires ramp quickly and lead with confidence.",
    "extendedBio": "Derrick builds the onboarding paths, role-play frameworks, and skill drills that allow new hires at Sky Alliance to ramp up quickly without sacrificing quality. He acts as a bridge between foundational training and field execution, ensuring every team member enters their role with a high level of technical proficiency and confidence.\n\nFrom mastering product knowledge to navigating advanced conversation control, Derrick’s leadership emphasizes the power of deliberate practice and consistent feedback. He is dedicated to reinforcing high standards while celebrating the incremental improvements that lead to long-term professional success.",
    "imageSrc": "/team/derrick.png",
    "socials": {
      "linkedin": "https://www.linkedin.com/company/skyalliancetx/",
      "facebook": "https://www.facebook.com/skyalliancetx",
    },
  },
  {
    "name": "Liz Arellano",
    "title": "Account Executive",
    "bio": "Keeps field campaigns organized and aligned with client goals from kickoff through reporting.",
    "extendedBio": "Liz serves as the operational anchor for multi-touch campaigns—tracking milestones, materials, and reporting to ensure seamless execution between internal teams and clients. She maintains tight communication channels from the initial kickoff through the final wrap-up, ensuring no detail is overlooked.\n\nThriving on precision and proactive updates, Liz excels at translating high-level client goals into practical, weekly execution strategies. Her approach provides field teams with the clarity and confidence they need to deliver results that consistently exceed expectations.",
    "imageSrc": "/team/liz.png",
    "socials": {
      "x": "https://x.com/SkyAllianceTX",
    },
  },
  {
    "name": "Hansei Jang",
    "title": "Media Manager",
    "bio": "Grows market share through disciplined team leadership and high standards for customer experience.",
    "extendedBio": "Hansei drives Sky Alliance’s brand presence by blending creative storytelling with data-driven media strategies. He oversees the development of high-impact content and manages digital channels to ensure every campaign resonates with the target audience while upholding strict brand standards.\n\nHis leadership style emphasizes creative accountability and strategic consistency—building media teams that scale Sky Alliance’s reputation and market share through polished, high-performance communication.",
    "imageSrc": "/team/hansei.png",
    "socials": {
      "linkedin": "https://www.linkedin.com/company/skyalliancetx/",
    },
  },
  {
    "name": "Vaishunavi Velgapudi",
    "title": "Human Resources",
    "bio": "Champions hiring, mentorship, and the collaborative culture that makes Sky Alliance a place people want to grow.",
    "extendedBio": "Vaishunavi shapes the hiring strategies, onboarding culture, and ongoing mentorship programs that ensure Sky Alliance attracts top-tier talent and provides a clear path for professional advancement. She builds the foundational systems that reinforce collaboration, ensuring that recognition is a core part of the employee experience.\n\nFrom refining interview loops to establishing meaningful team rituals, Vaishunavi keeps the organizational culture intentional. She is dedicated to maintaining clear values, providing fair feedback loops, and cultivating a workplace where high-impact work is both visible and celebrated.",
    "imageSrc": "/team/v.png",
    "socials": {
      "linkedin": "https://www.linkedin.com/company/skyalliancetx/",
      "facebook": "https://www.facebook.com/skyalliancetx",
    },
  },
  {
    "name": "Monyvann Men",
    "title": "Business Analytics",
    "bio": "Drives strategic growth by converting complex data into actionable insights and operational excellence.",
    "extendedBio": "Monyvann anchors the analytical framework at Sky Alliance—translating operational data into clear performance metrics, trend forecasts, and strategic growth opportunities. He builds the reporting systems that allow leadership to make informed, data-backed decisions with confidence.\n\nFrom optimizing campaign ROI to identifying market inefficiencies, Monyvann keeps the organization’s strategy intentional. His work ensures that every project is measured against high standards of accuracy, providing the clarity needed to scale performance while maintaining a steady pulse on regional KPIs.",
    "imageSrc": "/team/vann.png",
    "socials": {
      "linkedin": "https://www.linkedin.com/company/skyalliancetx/",
      "facebook": "https://www.facebook.com/skyalliancetx",
    },
  }
];
