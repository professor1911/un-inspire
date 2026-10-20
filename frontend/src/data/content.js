import { GALLERY_ITEMS, STUDENT_PROFILES } from "./media.js";
/**
 * Local mirror of backend/seed/data.js. Lets the frontend render fully on
 * its own (`npm run dev` in /frontend with no API running) and acts as the
 * offline fallback in src/api/client.js if the Express server is down.
 */

const pillars = [
  {
    title: "Research Excellence",
    title_ja: "研究の卓越性",
    description: "Interdisciplinary inquiry into climate change, resource shortages, and demographic transitions across Toyama's agro-coastal regions.",
    description_ja: "富山の農漁村・沿岸地域における気候変動、資源不足、人口動態の変化についての学際的研究。",
  },
  {
    title: "Education & Capacity Building",
    title_ja: "教育と人材育成",
    description: "Project- and field-based learning that equips students to design practical sustainability solutions.",
    description_ja: "学生が実践的なサステナビリティ・ソリューションを設計できる、プロジェクト型・実地学習。",
  },
  {
    title: "Sustainability Living Lab",
    title_ja: "サステナビリティ・リビングラボ",
    description: "Real-world co-creation with researchers, policymakers, industry, and communities across five focus regions.",
    description_ja: "研究者、政策立案者、産業界、地域社会による、5つの重点地域での実践的な共創。",
  },
  {
    title: "Global Partnerships & Networks",
    title_ja: "国際パートナーシップとネットワーク",
    description: "Collaborations spanning universities, government, industry, and civil society - anchored by IIT Kharagpur, India.",
    description_ja: "大学、政府、産業界、市民社会にまたがる連携。IIT Kharagpur（インド）を中心とする。",
  },
  {
    title: "Innovation & Impact",
    title_ja: "イノベーションと社会実装",
    description: "Publications, policy briefs, and open resources that translate research into practical, adoptable solutions.",
    description_ja: "研究成果を実践的で導入可能なソリューションへとつなぐ、出版物、政策提言、公開資料。",
  },
].map((p, i) => ({ type: "pillar", order: i + 1, ...p }));

const researchThemes = [
  { title: "Climate Change Adaptation and Resilience", title_ja: "気候変動への適応とレジリエンス" },
  { title: "Climate-Smart Agriculture", title_ja: "気候変動に対応したスマート農業" },
  { title: "Food-Energy-Water Nexus", title_ja: "食料・エネルギー・水のネクサス" },
  { title: "Digital Agriculture and Artificial Intelligence", title_ja: "デジタル農業と人工知能" },
  { title: "Nature-Based Solutions", title_ja: "自然を活用した解決策（NbS）" },
  { title: "Disaster Risk Reduction", title_ja: "防災・減災" },
  { title: "Circular Economy and Resource Efficiency", title_ja: "循環型経済と資源効率" },
  { title: "Sustainable Rural and Regional Development", title_ja: "持続可能な農村・地域開発" },
].map((d, i) => ({ type: "researchTheme", order: i + 1, ...d }));

const flagshipFocus = [
  { title: "Farmland abandonment and land-use transitions", title_ja: "耕作放棄地と土地利用の転換" },
  { title: "Fisheries and coastal livelihood transitions", title_ja: "漁業と沿岸地域の生業の転換" },
  { title: "Climate-resilient agriculture", title_ja: "気候変動に強い農業" },
  { title: "Sustainable coastal systems and communities", title_ja: "持続可能な沿岸システムと地域社会" },
].map((d, i) => ({ type: "flagshipFocus", order: i + 1, ...d }));

const educationComponents = [
  { title: "Sustainability Integration Studio (SIS)", title_ja: "サステナビリティ統合スタジオ（SIS）", description: "A studio-based course where students prototype solutions to real sustainability problems.", description_ja: "学生が実際のサステナビリティ課題に対するソリューションを試作する、スタジオ型授業。" },
  { title: "Interdisciplinary Graduate Education", title_ja: "学際的大学院教育", description: "Cross-department coursework connecting agriculture, engineering, policy, and social science.", description_ja: "農学、工学、政策学、社会科学を横断する学部間連携の大学院科目。" },
  { title: "Project-Based & Field-Based Learning", title_ja: "プロジェクト型・フィールド型学習", description: "Coursework anchored in Living Lab sites rather than the classroom alone.", description_ja: "教室だけでなく、リビングラボの現場を拠点とした学習。" },
  { title: "Joint Supervision & Co-creation", title_ja: "共同指導と共創", description: "Students co-supervised across disciplines and, where relevant, across partner institutions.", description_ja: "分野を横断し、必要に応じて提携機関を越えた学生の共同指導。" },
  { title: "Student & Faculty Exchange", title_ja: "学生・教員交流", description: "Mobility programs with partner universities, including IIT Kharagpur.", description_ja: "IIT Kharagpurをはじめとするパートナー大学との交流プログラム。" },
  { title: "International Summer School", title_ja: "国際サマースクール", description: "A short intensive program bringing international students into Toyama's Living Labs.", description_ja: "海外の学生を富山のリビングラボに迎える、短期集中プログラム。" },
  { title: "Professional & Policy Training", title_ja: "専門家・政策担当者研修", description: "Executive and policy-track training for practitioners outside the university.", description_ja: "大学外の実務者を対象とした、政策立案者向けの研修プログラム。" },
].map((c, i) => ({ type: "educationComponent", order: i + 1, ...c }));

const livingLabs = [
  { title: "Regional Sustainability and Rural Revitalization", title_ja: "地域のサステナビリティと農村再生", description: "Working with rural municipalities on land-use and demographic transition strategies.", description_ja: "農村自治体と連携した、土地利用・人口動態の転換戦略の策定。" },
  { title: "Climate-Smart Agriculture and Food Systems", title_ja: "気候変動対応型農業と食料システム", description: "Field trials and farmer partnerships piloting climate-resilient cultivation methods.", description_ja: "気候変動に強い栽培法を実証する、圃場試験と農家連携。" },
  { title: "Sustainable Coastal Communities and Fisheries", title_ja: "持続可能な沿岸地域社会と漁業", description: "Co-research with coastal communities navigating fisheries and livelihood transitions.", description_ja: "漁業と生業の転換に取り組む沿岸地域社会との共同研究。" },
  { title: "Controlled Environment Agriculture and Hydroponics", title_ja: "環境制御型農業と水耕栽培", description: "Applied research into resource-efficient, climate-controlled growing systems.", description_ja: "省資源・環境制御型の栽培システムに関する応用研究。" },
  { title: "Japan-India Collaborative Research and Innovation", title_ja: "日印共同研究とイノベーション", description: "Joint projects with IIT Kharagpur spanning agriculture, water, and rural development.", description_ja: "IIT Kharagpurとの農業、水資源、農村開発にまたがる共同プロジェクト。" },
].map((l, i) => ({ type: "livingLab", order: i + 1, ...l }));

const partnerCategories = [
  { title: "Universities & Research Institutes", title_ja: "大学・研究機関" },
  { title: "Government & Policy Organizations", title_ja: "政府・政策機関" },
  { title: "Industry & Private Sector", title_ja: "産業界・民間企業" },
  { title: "International Organizations", title_ja: "国際機関" },
  { title: "NGOs & Civil Society", title_ja: "NGO・市民社会" },
  { title: "Local Communities & Stakeholders", title_ja: "地域社会・ステークホルダー" },
].map((d, i) => ({ type: "partnerCategory", order: i + 1, ...d }));

const people = [
  { title: "Geetha Mohan", category: "Principal Investigator", order: 1 },
  ...["Naoya Wada", "Horie Norio", "Shamik Chakraborty", "Shishir Sharmin", "Miles Isao Peterson", "Poonam Biswal", "Yvonne Kiki Nchanji"].map((title, i) => ({ title, category: "Project Member", order: i + 2 })),
  ...["Dillip Kumar Swain", "Ahmad Faisal", "Tongzukwaha"].map((title, i) => ({ title, category: "India Team", order: i + 20 })),
  { title: "Hiroki Kiriyama", category: "Postdoctoral Researcher", order: 30 },
  ...["Farida Ayu", "Sabahat Khaleeq", "Atsushi Hiroka", "Rubiya Khazir", "Indinna Shofia Astuty", "Avinash Singh", "S.M. Shariar Ahmed", "Shailendra Bahadur Kunwar", "Akinyi Winnie Elizabeth"].map((title, i) => ({ title, category: "Graduate Student", order: i + 40 })),
  { title: "Kiyokawa Takami", category: "Support Staff", order: 60 },
  ...["Kazuhiko Takeuchi", "Thomas Elmqvist", "Kensuke Fukushi", "Daniel Karthe"].map((title, i) => ({ title, category: "Advisor", order: i + 70 })),
].map((p) => ({ type: "person", ...p }));

const publications = [
  { title: "Farmland Abandonment and Land-Use Transition in Coastal Toyama", title_ja: "沿岸富山における耕作放棄と土地利用の転換", subtitle: "Geetha Mohan, Naoya Wada et al. - Sustainability Science", subtitle_ja: "Geetha Mohan、和田直也 他 - Sustainability Science", category: "Journal Article", category_ja: "学術論文", date: "2025-11-01", link: "https://doi.org/10.1007/s11625-025-example1" },
  { title: "Climate-Resilient Agriculture: Lessons from the ReACT Program", title_ja: "気候変動に強い農業：ReACTプログラムからの教訓", subtitle: "Shamik Chakraborty, Hiroki Kiriyama", category: "Journal Article", category_ja: "学術論文", date: "2025-08-15", link: "https://doi.org/10.1007/s11625-025-example2" },
  { title: "Living Labs as a Model for University-Community Co-Research", title_ja: "大学と地域の共同研究モデルとしてのリビングラボ", subtitle: "Kazuhiko Takeuchi, Geetha Mohan (Eds.)", subtitle_ja: "武内和彦、Geetha Mohan（編）", category: "Book", category_ja: "書籍", date: "2025-05-01" },
  { title: "Digital Agriculture and AI in Smallholder Coastal Systems", title_ja: "小規模沿岸農業システムにおけるデジタル農業とAI", subtitle: "Miles Isao Peterson, Dillip Kumar Swain", category: "Book Chapter", category_ja: "書籍の章", date: "2025-03-20" },
  { title: "Fisheries Transitions Under Demographic Decline", title_ja: "人口減少下における漁業の転換", subtitle: "Presented at the Asia-Pacific Sustainability Conference", subtitle_ja: "アジア太平洋サステナビリティ学会にて発表", category: "Conference Paper", category_ja: "学会発表", date: "2025-10-02" },
  { title: "Toward Circular Rural Economies: A Toyama Case Study", title_ja: "循環型農村経済を目指して：富山のケーススタディ", subtitle: "Policy Brief No. 3", subtitle_ja: "政策提言 第3号", category: "Policy Brief", category_ja: "政策提言", date: "2025-09-10", link: "https://ut-inspire.u-toyama.ac.jp/policy-briefs/no-3" },
  { title: "Food-Energy-Water Nexus Baseline Assessment, Toyama Prefecture", title_ja: "富山県における食料・エネルギー・水ネクサスのベースライン評価", subtitle: "GRASS Technical Report Series", subtitle_ja: "GRASS技術報告書シリーズ", category: "Technical Report", category_ja: "技術報告書", date: "2025-06-18" },
].map((p, i) => ({ type: "publication", order: i + 1, ...p }));

const events = [
  { title: "International Summer School on Sustainability Science", title_ja: "サステナビリティ科学 国際サマースクール", subtitle: "Gofuku Campus, University of Toyama", subtitle_ja: "富山大学 五福キャンパス", category: "Training Programme", category_ja: "研修プログラム", date: "2026-08-03" },
  { title: "Japan-India Living Lab Exchange Workshop", title_ja: "日印リビングラボ交流ワークショップ", subtitle: "With IIT Kharagpur", subtitle_ja: "IIT Kharagpurとの共催", category: "Workshop", category_ja: "ワークショップ", date: "2026-09-14" },
  { title: "Public Lecture: Climate Adaptation in Agro-Coastal Regions", title_ja: "公開講演：農漁村・沿岸地域における気候変動適応", subtitle: "Speaker: Thomas Elmqvist", subtitle_ja: "講演者：Thomas Elmqvist", category: "Seminar", category_ja: "セミナー", date: "2026-10-05" },
  { title: "UT-INSPIRE Annual Sustainability Conference", title_ja: "UT-INSPIRE 年次サステナビリティ会議", subtitle: "Toyama International Conference Center", subtitle_ja: "富山国際会議場", category: "Conference", category_ja: "学会・カンファレンス", date: "2026-11-20" },
].map((e, i) => ({ type: "event", order: i + 1, ...e }));

const news = [
  { title: "UT-INSPIRE Launches ReACT Flagship Research Program", title_ja: "UT-INSPIRE、旗艦研究プログラム「ReACT」を始動", description: "The President's Fund-backed initiative formally kicks off with field sites across Toyama's coast.", description_ja: "学長裁量経費による本事業が、富山沿岸の各フィールドサイトで正式に始動しました。", category: "News", category_ja: "ニュース", date: "2026-04-01", link: "https://ut-inspire.u-toyama.ac.jp/news/react-launch" },
  { title: "GRASS and IIT Kharagpur Sign Renewed MOU", title_ja: "GRASSとIIT Kharagpur、MOU（覚書）を更新", description: "The two institutions extend their collaborative research and student-exchange agreement.", description_ja: "両機関が共同研究および学生交流に関する協定を延長しました。", category: "Press Release", category_ja: "プレスリリース", date: "2026-05-12", link: "https://ut-inspire.u-toyama.ac.jp/news/iit-kharagpur-mou" },
  { title: "UT-INSPIRE Featured in National Sustainability Broadcast", title_ja: "UT-INSPIRE、全国サステナビリティ放送で特集", description: "Coverage of the Living Lab approach to rural revitalization in Toyama Prefecture.", description_ja: "富山県での農村再生に向けたリビングラボの取り組みが報道されました。", category: "Media Coverage", category_ja: "メディア掲載", date: "2026-06-22" },
].map((n, i) => ({ type: "news", order: i + 1, ...n }));

const resources = [
  { title: "Toyama Coastal Land-Use Dataset (2015–2025)", title_ja: "富山沿岸土地利用データセット（2015～2025年）", category: "Datasets", category_ja: "データセット", link: "https://ut-inspire.u-toyama.ac.jp/resources/coastal-land-use-dataset" },
  { title: "Annual Sustainability Report 2025", title_ja: "2025年度サステナビリティ年次報告書", category: "Reports", category_ja: "報告書", link: "https://ut-inspire.u-toyama.ac.jp/resources/annual-report-2025" },
  { title: "Living Lab Facilitator's Handbook", title_ja: "リビングラボ・ファシリテーター・ハンドブック", category: "Educational Materials", category_ja: "教材" },
  { title: "ReACT Program Overview - Slide Deck", title_ja: "ReACTプログラム概要 - スライド資料", category: "Presentations", category_ja: "発表資料" },
].map((r, i) => ({ type: "resource", order: i + 1, ...r }));

const baseItems = [
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

const profileByName = new Map(STUDENT_PROFILES.map((p) => [p.title, p]));
export const localItems = [
  ...baseItems.map((item) =>
    item.type === "person" && profileByName.has(item.title)
      ? { ...item, ...profileByName.get(item.title), type: "person", order: item.order }
      : item
  ),
  ...GALLERY_ITEMS,
];
