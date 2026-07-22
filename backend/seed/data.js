/**
 * Seed data transcribed from the UT-INSPIRE technical brief.
 * Every "person" entry uses a real name from the brief; roles are grouped
 * by the categories the brief defined (Project Members, India Team,
 * Postdocs, Graduate Students, Support Staff, Advisors). Publications,
 * events, news and resources are realistic placeholder entries mapped
 * 1:1 to the brief's field keys - swap in real records post-launch.
 */

const pillars = [
  {
    type: "pillar",
    order: 1,
    title: "Research Excellence",
    description:
      "Interdisciplinary inquiry into climate change, resource shortages, and demographic transitions across Toyama's agro-coastal regions.",
  },
  {
    type: "pillar",
    order: 2,
    title: "Education & Capacity Building",
    description:
      "Project- and field-based learning that equips students to design practical sustainability solutions.",
  },
  {
    type: "pillar",
    order: 3,
    title: "Sustainability Living Lab",
    description:
      "Real-world co-creation with researchers, policymakers, industry, and communities across five focus regions.",
  },
  {
    type: "pillar",
    order: 4,
    title: "Global Partnerships & Networks",
    description:
      "Collaborations spanning universities, government, industry, and civil society - anchored by IIT Kharagpur, India.",
  },
  {
    type: "pillar",
    order: 5,
    title: "Innovation & Impact",
    description:
      "Publications, policy briefs, and open resources that translate research into practical, adoptable solutions.",
  },
];

const researchThemes = [
  "Climate Change Adaptation and Resilience",
  "Climate-Smart Agriculture",
  "Food-Energy-Water Nexus",
  "Digital Agriculture and Artificial Intelligence",
  "Nature-Based Solutions",
  "Disaster Risk Reduction",
  "Circular Economy and Resource Efficiency",
  "Sustainable Rural and Regional Development",
].map((title, i) => ({
  type: "researchTheme",
  order: i + 1,
  title,
}));

const flagshipFocus = [
  "Farmland abandonment and land-use transitions",
  "Fisheries and coastal livelihood transitions",
  "Climate-resilient agriculture",
  "Sustainable coastal systems and communities",
].map((title, i) => ({
  type: "flagshipFocus",
  order: i + 1,
  title,
}));

const educationComponents = [
  {
    title: "Sustainability Integration Studio (SIS)",
    description: "A studio-based course where students prototype solutions to real sustainability problems.",
  },
  {
    title: "Interdisciplinary Graduate Education",
    description: "Cross-department coursework connecting agriculture, engineering, policy, and social science.",
  },
  {
    title: "Project-Based & Field-Based Learning",
    description: "Coursework anchored in Living Lab sites rather than the classroom alone.",
  },
  {
    title: "Joint Supervision & Co-creation",
    description: "Students co-supervised across disciplines and, where relevant, across partner institutions.",
  },
  {
    title: "Student & Faculty Exchange",
    description: "Mobility programs with partner universities, including IIT Kharagpur.",
  },
  {
    title: "International Summer School",
    description: "A short intensive program bringing international students into Toyama's Living Labs.",
  },
  {
    title: "Professional & Policy Training",
    description: "Executive and policy-track training for practitioners outside the university.",
  },
].map((c, i) => ({ type: "educationComponent", order: i + 1, title: c.title, description: c.description }));

const livingLabs = [
  {
    title: "Regional Sustainability and Rural Revitalization",
    description: "Working with rural municipalities on land-use and demographic transition strategies.",
  },
  {
    title: "Climate-Smart Agriculture and Food Systems",
    description: "Field trials and farmer partnerships piloting climate-resilient cultivation methods.",
  },
  {
    title: "Sustainable Coastal Communities and Fisheries",
    description: "Co-research with coastal communities navigating fisheries and livelihood transitions.",
  },
  {
    title: "Controlled Environment Agriculture and Hydroponics",
    description: "Applied research into resource-efficient, climate-controlled growing systems.",
  },
  {
    title: "Japan-India Collaborative Research and Innovation",
    description: "Joint projects with IIT Kharagpur spanning agriculture, water, and rural development.",
  },
].map((l, i) => ({ type: "livingLab", order: i + 1, title: l.title, description: l.description }));

const partnerCategories = [
  "Universities & Research Institutes",
  "Government & Policy Organizations",
  "Industry & Private Sector",
  "International Organizations",
  "NGOs & Civil Society",
  "Local Communities & Stakeholders",
].map((title, i) => ({ type: "partnerCategory", order: i + 1, title }));

// People - every name is transcribed directly from the brief.
const people = [
  { title: "Geetha Mohan", category: "Principal Investigator", order: 1 },
  ...[
    "Naoya Wada",
    "Horie Norio",
    "Shamik Chakraborty",
    "Shishir Sharmin",
    "Miles Isao Peterson",
    "Poonam Biswal",
    "Yvonne Kiki Nchanji",
  ].map((title, i) => ({ title, category: "Project Member", order: i + 2 })),
  ...["Dillip Kumar Swain", "Ahmad Faisal", "Tongzukwaha"].map((title, i) => ({
    title,
    category: "India Team",
    order: i + 20,
  })),
  { title: "Hiroki Kiriyama", category: "Postdoctoral Researcher", order: 30 },
  ...[
    "Farida Ayu",
    "Sabahat Khaleeq",
    "Atsushi Hiroka",
    "Rubiya Khazir",
    "Indinna Shofia Astuty",
    "Avinash Singh",
    "S.M. Shariar Ahmed",
    "Shailendra Bahadur Kunwar",
    "Akinyi Winnie Elizabeth",
  ].map((title, i) => ({ title, category: "Graduate Student", order: i + 40 })),
  { title: "Kiyokawa Takami", category: "Support Staff", order: 60 },
  ...["Kazuhiko Takeuchi", "Thomas Elmqvist", "Kensuke Fukushi", "Daniel Karthe"].map((title, i) => ({
    title,
    category: "Advisor",
    order: i + 70,
  })),
].map((p) => ({ type: "person", ...p }));

const publications = [
  {
    title: "Farmland Abandonment and Land-Use Transition in Coastal Toyama",
    subtitle: "Geetha Mohan, Naoya Wada et al. - Sustainability Science",
    category: "Journal Article",
    date: new Date("2025-11-01"),
  },
  {
    title: "Climate-Resilient Agriculture: Lessons from the ReACT Program",
    subtitle: "Shamik Chakraborty, Hiroki Kiriyama",
    category: "Journal Article",
    date: new Date("2025-08-15"),
  },
  {
    title: "Living Labs as a Model for University-Community Co-Research",
    subtitle: "Kazuhiko Takeuchi, Geetha Mohan (Eds.)",
    category: "Book",
    date: new Date("2025-05-01"),
  },
  {
    title: "Digital Agriculture and AI in Smallholder Coastal Systems",
    subtitle: "Miles Isao Peterson, Dillip Kumar Swain",
    category: "Book Chapter",
    date: new Date("2025-03-20"),
  },
  {
    title: "Fisheries Transitions Under Demographic Decline",
    subtitle: "Presented at the Asia-Pacific Sustainability Conference",
    category: "Conference Paper",
    date: new Date("2025-10-02"),
  },
  {
    title: "Toward Circular Rural Economies: A Toyama Case Study",
    subtitle: "Policy Brief No. 3",
    category: "Policy Brief",
    date: new Date("2025-09-10"),
  },
  {
    title: "Food-Energy-Water Nexus Baseline Assessment, Toyama Prefecture",
    subtitle: "GRASS Technical Report Series",
    category: "Technical Report",
    date: new Date("2025-06-18"),
  },
].map((p, i) => ({ type: "publication", order: i + 1, ...p }));

const events = [
  {
    title: "International Summer School on Sustainability Science",
    subtitle: "Gofuku Campus, University of Toyama",
    category: "Training Programme",
    date: new Date("2026-08-03"),
  },
  {
    title: "Japan-India Living Lab Exchange Workshop",
    subtitle: "With IIT Kharagpur",
    category: "Workshop",
    date: new Date("2026-09-14"),
  },
  {
    title: "Public Lecture: Climate Adaptation in Agro-Coastal Regions",
    subtitle: "Speaker: Thomas Elmqvist",
    category: "Seminar",
    date: new Date("2026-10-05"),
  },
  {
    title: "UT-INSPIRE Annual Sustainability Conference",
    subtitle: "Toyama International Conference Center",
    category: "Conference",
    date: new Date("2026-11-20"),
  },
].map((e, i) => ({ type: "event", order: i + 1, ...e }));

const news = [
  {
    title: "UT-INSPIRE Launches ReACT Flagship Research Program",
    description: "The President's Fund-backed initiative formally kicks off with field sites across Toyama's coast.",
    category: "News",
    date: new Date("2026-04-01"),
  },
  {
    title: "GRASS and IIT Kharagpur Sign Renewed MOU",
    description: "The two institutions extend their collaborative research and student-exchange agreement.",
    category: "Press Release",
    date: new Date("2026-05-12"),
  },
  {
    title: "UT-INSPIRE Featured in National Sustainability Broadcast",
    description: "Coverage of the Living Lab approach to rural revitalization in Toyama Prefecture.",
    category: "Media Coverage",
    date: new Date("2026-06-22"),
  },
].map((n, i) => ({ type: "news", order: i + 1, ...n }));

const resources = [
  { title: "Toyama Coastal Land-Use Dataset (2015–2025)", category: "Datasets" },
  { title: "Annual Sustainability Report 2025", category: "Reports" },
  { title: "Living Lab Facilitator's Handbook", category: "Educational Materials" },
  { title: "ReACT Program Overview - Slide Deck", category: "Presentations" },
].map((r, i) => ({ type: "resource", order: i + 1, ...r }));

export const seedData = [
  ...pillars,
  ...researchThemes,
  ...flagshipFocus,
  ...educationComponents,
  ...livingLabs,
  ...partnerCategories,
  ...people,
  ...publications,
  ...events,
  ...news,
  ...resources,
];
