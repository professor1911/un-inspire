// Media manifest. Captions, categories and video metadata live here.
// The image FILES are plain files in frontend/public/media (see MEDIA_CHECKLIST.md at the repo root):
//   natu1-p01.jpg … natu1-p15.jpg, natu2-p01.jpg … natu2-p20.jpg, students-p01.jpg … students-p07.jpg
export const MEDIA_BASE = "/media";

export const VIDEOS = [
  {
    "id": "video-01",
    "src": "/media/videos/video-01.mp4",
    "poster": "/media/videos/video-01-poster.jpg",
    "width": 640,
    "height": 252,
    "caption": "Japan ⇄ India: research, education and innovation in a shared loop",
    "captionJa": "日本とインド：研究・教育・イノベーションを結ぶ循環"
  },
  {
    "id": "video-02",
    "src": "/media/videos/video-02.mp4",
    "poster": "/media/videos/video-02-poster.jpg",
    "width": 524,
    "height": 450,
    "caption": "One planet, closed loops: energy, water and materials circulating",
    "captionJa": "ひとつの地球、循環する資源：エネルギー・水・物質のめぐり"
  },
  {
    "id": "video-03",
    "src": "/media/videos/video-03.mp4",
    "poster": "/media/videos/video-03-poster.jpg",
    "width": 640,
    "height": 390,
    "caption": "Five pillars, one foundation",
    "captionJa": "5つの柱とひとつの土台"
  },
  {
    "id": "video-04",
    "src": "/media/videos/video-04.mp4",
    "poster": "/media/videos/video-04-poster.jpg",
    "width": 640,
    "height": 360,
    "caption": "Many minds, one future",
    "captionJa": "多くの知恵、ひとつの未来"
  },
  {
    "id": "video-05",
    "src": "/media/videos/video-05.mp4",
    "poster": "/media/videos/video-05-poster.jpg",
    "width": 576,
    "height": 450,
    "caption": "The Food–Energy–Water nexus",
    "captionJa": "食料・エネルギー・水のネクサス"
  },
  {
    "id": "video-06",
    "src": "/media/videos/video-06.mp4",
    "poster": "/media/videos/video-06-poster.jpg",
    "width": 562,
    "height": 450,
    "caption": "Co-creation: researchers, government, industry and communities around one place",
    "captionJa": "共創：研究者・行政・産業界・地域社会がひとつの地域を囲む"
  }
];
export const videoById = (id) => VIDEOS.find((v) => v.id === id);

export const GALLERY_ITEMS = [
  {
    "type": "galleryPhoto",
    "title": "Alpine highlands in summer, with snow patches still on the slopes",
    "subtitle": "夏の高山。斜面にはまだ残雪が見えます",
    "category": "Nature & Seasons",
    "image": "/media/natu1-p01.jpeg",
    "order": 1,
    "tags": [
      "natu1",
      "page-01"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A pine-topped rock islet with snow-covered mountains behind",
    "subtitle": "雪をいただく山々を背にした、松の生える岩の小島",
    "category": "Coast & Waterways",
    "image": "/media/natu2-p01.jpeg",
    "order": 2,
    "tags": [
      "natu2",
      "page-01"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A torii gate and mountain hut on a high ridge",
    "subtitle": "稜線に立つ鳥居と山小屋",
    "category": "Nature & Seasons",
    "image": "/media/natu1-p02.jpeg",
    "order": 3,
    "tags": [
      "natu1",
      "page-02"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A castle keep standing out against a bright winter sky",
    "subtitle": "冬の青空にそびえる城の天守",
    "category": "City & Heritage",
    "image": "/media/natu2-p02.jpeg",
    "order": 4,
    "tags": [
      "natu2",
      "page-02"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Hikers on a stone path through the alpine valley",
    "subtitle": "高山の谷を抜ける石畳の道を歩く登山者",
    "category": "Nature & Seasons",
    "image": "/media/natu1-p03.jpeg",
    "order": 5,
    "tags": [
      "natu1",
      "page-03"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Cherry blossoms along the river, with a tour boat passing",
    "subtitle": "桜の咲く川沿いを遊覧船が進む",
    "category": "Festivals",
    "image": "/media/natu2-p03.jpeg",
    "order": 6,
    "tags": [
      "natu2",
      "page-03"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Conifers and trees heavy with fresh snow",
    "subtitle": "新雪をまとった木々",
    "category": "Nature & Seasons",
    "image": "/media/natu1-p04.jpeg",
    "order": 7,
    "tags": [
      "natu1",
      "page-04"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Thatched farmhouses in a mountain village",
    "subtitle": "山あいの集落に並ぶ茅葺きの家々",
    "category": "City & Heritage",
    "image": "/media/natu2-p04.jpeg",
    "order": 8,
    "tags": [
      "natu2",
      "page-04"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A glass observation tower rising above a park",
    "subtitle": "公園にそびえるガラス張りの展望塔",
    "category": "City & Heritage",
    "image": "/media/natu1-p05.jpeg",
    "order": 9,
    "tags": [
      "natu1",
      "page-05"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Toyama Station with trams and buses",
    "subtitle": "路面電車とバスが行き交う富山駅",
    "category": "City & Heritage",
    "image": "/media/natu2-p05.jpeg",
    "order": 10,
    "tags": [
      "natu2",
      "page-05"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Lunch with a view of the snowy campus",
    "subtitle": "雪景色のキャンパスを望むランチ",
    "category": "Campus",
    "image": "/media/natu1-p06.jpeg",
    "order": 11,
    "tags": [
      "natu1",
      "page-06"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A bridge walkway with snow-capped mountains beyond the city",
    "subtitle": "市街地の向こうに雪山を望む橋の歩道",
    "category": "City & Heritage",
    "image": "/media/natu2-p06.jpeg",
    "order": 12,
    "tags": [
      "natu2",
      "page-06"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "An illuminated bridge reflected on the water at night",
    "subtitle": "夜の水面に映るライトアップされた橋",
    "category": "City & Heritage",
    "image": "/media/natu1-p07.jpeg",
    "order": 13,
    "tags": [
      "natu1",
      "page-07"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "The city waterfront with distant mountains",
    "subtitle": "遠くの山並みと市街地の水辺",
    "category": "City & Heritage",
    "image": "/media/natu2-p07.jpeg",
    "order": 14,
    "tags": [
      "natu2",
      "page-07"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A green mountain lake framed by autumn forest",
    "subtitle": "秋の森に囲まれた緑色の山あいの湖",
    "category": "Nature & Seasons",
    "image": "/media/natu1-p08.jpeg",
    "order": 15,
    "tags": [
      "natu1",
      "page-08"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A ginkgo-lined campus road in full autumn gold",
    "subtitle": "黄金色に染まる銀杏並木のキャンパスの道",
    "category": "Campus",
    "image": "/media/natu2-p08.jpeg",
    "order": 16,
    "tags": [
      "natu2",
      "page-08"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A circular tulip garden around a red tulip sculpture",
    "subtitle": "赤いチューリップのオブジェを囲む円形の花壇",
    "category": "Festivals",
    "image": "/media/natu1-p09.jpeg",
    "order": 17,
    "tags": [
      "natu1",
      "page-09"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A snowy campus courtyard seen from above",
    "subtitle": "上から見下ろす雪のキャンパス中庭",
    "category": "Campus",
    "image": "/media/natu2-p09.jpeg",
    "order": 18,
    "tags": [
      "natu2",
      "page-09"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A palm tree wearing a thick coat of snow",
    "subtitle": "雪をたっぷり積もらせたヤシの木",
    "category": "Nature & Seasons",
    "image": "/media/natu1-p10.jpeg",
    "order": 19,
    "tags": [
      "natu1",
      "page-10"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A tree-lined campus road in autumn colours",
    "subtitle": "紅葉する並木のキャンパスの道",
    "category": "Campus",
    "image": "/media/natu2-p10.jpeg",
    "order": 20,
    "tags": [
      "natu2",
      "page-10"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Fireworks over the harbour beside an illuminated sailing ship",
    "subtitle": "電飾の帆船のそばで港の夜空に上がる花火",
    "category": "Festivals",
    "image": "/media/natu1-p11.jpeg",
    "order": 21,
    "tags": [
      "natu1",
      "page-11"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A snow-covered campus road after a heavy fall",
    "subtitle": "大雪のあとの雪に覆われたキャンパスの道",
    "category": "Campus",
    "image": "/media/natu2-p11.jpeg",
    "order": 22,
    "tags": [
      "natu2",
      "page-11"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A wide river weir with water spilling over",
    "subtitle": "幅広い堰を流れ落ちる川の水",
    "category": "Coast & Waterways",
    "image": "/media/natu1-p12.jpeg",
    "order": 23,
    "tags": [
      "natu1",
      "page-12"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Autumn leaves in front of a campus building",
    "subtitle": "キャンパスの建物の前の紅葉",
    "category": "Campus",
    "image": "/media/natu2-p12.jpeg",
    "order": 24,
    "tags": [
      "natu2",
      "page-12"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A curtain of fireworks over a crowded festival ground at night",
    "subtitle": "夜の祭り会場に広がる花火の幕と大勢の人々",
    "category": "Festivals",
    "image": "/media/natu1-p13.jpeg",
    "order": 25,
    "tags": [
      "natu1",
      "page-13"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A snowy campus path beside a campus map board",
    "subtitle": "キャンパスマップ看板のそばの雪道",
    "category": "Campus",
    "image": "/media/natu2-p13.jpeg",
    "order": 26,
    "tags": [
      "natu2",
      "page-13"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A red firework bursting above the harbour",
    "subtitle": "港の上に開く赤い花火",
    "category": "Festivals",
    "image": "/media/natu1-p14.jpeg",
    "order": 27,
    "tags": [
      "natu1",
      "page-14"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A river bridge with a long snow-capped mountain range",
    "subtitle": "雪をかぶった連峰を望む川の橋",
    "category": "City & Heritage",
    "image": "/media/natu2-p14.jpeg",
    "order": 28,
    "tags": [
      "natu2",
      "page-14"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Thatched gassho-style houses beside a golden rice field",
    "subtitle": "黄金色の田んぼと合掌造りの家々",
    "category": "City & Heritage",
    "image": "/media/natu1-p15.jpeg",
    "order": 29,
    "tags": [
      "natu1",
      "page-15"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A quiet canal lined with boats and traditional houses",
    "subtitle": "船と古い家並みが続く静かな運河",
    "category": "Coast & Waterways",
    "image": "/media/natu2-p15.jpeg",
    "order": 30,
    "tags": [
      "natu2",
      "page-15"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Fishing boats beside weathered wooden warehouses",
    "subtitle": "年季の入った木造の倉庫と漁船",
    "category": "Coast & Waterways",
    "image": "/media/natu2-p16.jpeg",
    "order": 31,
    "tags": [
      "natu2",
      "page-16"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A sunflower field under a cloudy sky",
    "subtitle": "曇り空の下に広がるひまわり畑",
    "category": "Nature & Seasons",
    "image": "/media/natu2-p17.jpeg",
    "order": 32,
    "tags": [
      "natu2",
      "page-17"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A snow-filled alpine valley seen from a high ridge",
    "subtitle": "稜線から見下ろす雪の残る高山の谷",
    "category": "Nature & Seasons",
    "image": "/media/natu2-p18.jpeg",
    "order": 33,
    "tags": [
      "natu2",
      "page-18"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "Highland ponds and green ridges in summer",
    "subtitle": "夏の高原の池と緑の稜線",
    "category": "Nature & Seasons",
    "image": "/media/natu2-p19.jpeg",
    "order": 34,
    "tags": [
      "natu2",
      "page-19"
    ]
  },
  {
    "type": "galleryPhoto",
    "title": "A mountain hut with hikers and a rainbow-coloured cloud",
    "subtitle": "登山者でにぎわう山小屋と虹色の雲",
    "category": "Nature & Seasons",
    "image": "/media/natu2-p20.jpeg",
    "order": 35,
    "tags": [
      "natu2",
      "page-20"
    ]
  }
];

export const STUDENT_PROFILES = [
  {
    "title": "Atsushi Hiroka",
    "subtitle": "Master’s student · Sustainability Studies",
    "category": "Graduate Student",
    "description": "I am Atsushi Hiroka, pursuing a master’s degree in Sustainability Studies at the University of Toyama. My interests are migration and human resource management. I study the cross-cultural adaptation of highly skilled foreign workers through systematic reviews. I am interested in how foreigners adapt to different cultures.",
    "quote": "For me, sustainability means adapting to change while protecting the environment, communities, and human well-being.",
    "image": "/media/students-p01.jpeg"
  },
  {
    "title": "Yvonne Kiki Nchanji",
    "subtitle": "JSPS–UNU Postdoctoral Research Fellow",
    "category": "Postdoctoral Researcher",
    "description": "I am Yvonne Kiki Nchanji, JSPS–UNU Postdoctoral Research Fellow at the University of Toyama, Japan. My research interest and specialization are in forest governance, gender and social inclusion and sustainable livelihoods. My work on forest resource governance, gendered livelihoods strategies, NTFP value chains, and smallholder farmer practices has strengthened my interdisciplinary research, policy analysis, and stakeholder engagement skills. I aim to contribute to scalable solutions and governance approaches that are environmentally sustainable, socially inclusive and responsive to the realities of vulnerable and resource-dependent communities.",
    "quote": "For me, sustainability means creating a future where people and nature can thrive together.",
    "image": "/media/students-p02.jpeg"
  },
  {
    "title": "Farida Ayu",
    "subtitle": "PhD student · Sustainable Global Environmental Studies",
    "category": "Graduate Student",
    "description": "Farida Ayu here! I’m currently navigating my PhD journey in Sustainable Global Environmental Studies at the University of Toyama. With a passion for Geography and Sustainability Studies, I explore how remote sensing and GIS can help us better understand terrestrial environments, particularly vegetation dynamics, carbon neutrality, and climate change. Through satellite data, scenario projections, and socio-economic analysis, I bring fresh spatial evidence to the table.",
    "quote": "For me, sustainability means finding a balance-conserving nature while ensuring society is not left behind!",
    "image": "/media/students-p03.jpeg"
  },
  {
    "title": "Rubiya Khazir",
    "subtitle": "Master’s student · Sustainability",
    "category": "Graduate Student",
    "description": "I am Rubiya Khazir, currently pursuing a Master’s in sustainability at the University of Toyama, Japan. My academic interests and specialisation lie in crop diversification and how it can help farming communities especially in mountain regions, adapt to a changing climate and an uncertain economy. I work with cropping, land-use, climate and socio-economic data to understand what makes mountain agriculture resilient.",
    "quote": "For me sustainable means being patient because the things that last are usually the things that were grown slowly and cared for.",
    "image": "/media/students-p04.jpeg"
  },
  {
    "title": "Avinash Singh",
    "subtitle": "Master’s student (2026–2028) · Global SDGs Program",
    "category": "Graduate Student",
    "description": "I am Avinash Singh, a master’s student (2026-2028) in the Global SDGs Program at the University of Toyama. I am interested in sustainability, technology, and data-driven decision-making. I believe the most important challenges of our time cannot be solved by a single discipline, which is why I enjoy exploring problems from multiple perspectives and turning ideas into practical solutions. I hope to contribute, even in a small way, to a future where innovation helps address sustainability challenges.",
    "quote": "For me, sustainability means ensuring that today’s progress and innovation become tomorrow’s opportunities, not tomorrow’s problems.",
    "image": "/media/students-p05.jpeg"
  },
  {
    "title": "Indinna Shofia Astuty",
    "subtitle": "Master’s student · Sustainability Science",
    "category": "Graduate Student",
    "description": "Hi, I am Indinna Shofia Astuty, a master’s degree student in Sustainability Science at the University of Toyama. My academic background and specialization are in spatial mapping using Remote Sensing and GIS, with prior experience in benthic habitat mapping. In addition to coastal areas, I am particularly interested in the renewable energy transition, focusing on its socio-environment dynamics and spatial equity.",
    "quote": "For me, sustainability means creating harmony between society and nature through daily conscious decisions to preserve our shared future.",
    "image": "/media/students-p06.jpeg"
  },
  {
    "title": "Sabahat Khaleeq",
    "subtitle": "Graduate in Sustainability Science",
    "category": "Graduate Student",
    "description": "I am Sabahat Khaleeq, a graduate in Sustainability Science from the University of Toyama, with an academic background in Applied Psychology. My interests lie in understanding how human behaviour, wellbeing, and social responsibility can shape more sustainable communities. I believe meaningful sustainability begins with understanding people, because lasting change depends not only on innovation, but also on how we think, choose, and act.",
    "quote": "For me, sustainability starts with awareness when people understand how their choices affect others and the world around them, meaningful change becomes possible.",
    "image": "/media/students-p07.jpeg"
  }
];

export const STRIPS = {
  "about": [
    "natu2-p02",
    "natu2-p05",
    "natu1-p05",
    "natu2-p07"
  ],
  "research": [
    "natu1-p15",
    "natu2-p17",
    "natu2-p16",
    "natu2-p01"
  ],
  "education": [
    "natu2-p08",
    "natu2-p09",
    "natu2-p10",
    "natu2-p13"
  ]
};

const key = (img) => img.split("/").pop().replace(/\.jpg$/, "");
export const photoById = (id) => GALLERY_ITEMS.find((i) => key(i.image) === id);
