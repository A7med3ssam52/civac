export type Service = {
  id: string;
  icon: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  pointsEn: string[];
  pointsAr: string[];
};

export const services: Service[] = [
  {
    id: "civil",
    icon: "building",
    titleEn: "Civil & Architecture",
    titleAr: "المدني والمعماري",
    descEn: "Concrete, steel, roads and infrastructure for industrial and commercial facilities.",
    descAr: "خرسانات وهياكل وطرق وبنية تحتية للمنشآت الصناعية والتجارية.",
    pointsEn: ["Earthworks & concrete", "Steel structures", "Roads & infrastructure", "Water & sewerage", "Concrete / Epoxy / U-Crete floors", "Villas & commercial buildings", "Hospitals", "Water features (lakes, fountains, pools)", "Repair & strengthening of structures"],
    pointsAr: ["أعمال ترابية وخرسانات", "هياكل معدنية", "طرق وبنية تحتية", "مياه وصرف", "أرضيات خرسانية / إيبوكسي / يو-كريت", "فلل ومباني تجارية", "مستشفيات", "مسطحات مائية (بحيرات ونوافير وحمامات)", "ترميم وتقوية المنشآت"]
  },
  {
    id: "finishing",
    icon: "paint",
    titleEn: "Finishing Works",
    titleAr: "أعمال التشطيبات",
    descEn: "High-end finishing for factories, retail and offices that lasts.",
    descAr: "تشطيبات راقية للمصانع والتجزئة والمكاتب تدوم.",
    pointsEn: ["Internal & external plastering", "Primer coats", "Final paint coats", "Ceramic / marble / industrial flooring", "Suspended ceilings", "Decorative gypsum", "Thermal & moisture insulation"],
    pointsAr: ["محارة داخلية وخارجية", "دهانات برايمر", "دهانات نهائية", "سيراميك / رخام / أرضيات صناعية", "أسقف معلقة", "جبس زخرفي", "عزل حراري ورطوبة"]
  },
  {
    id: "mechanical",
    icon: "fan",
    titleEn: "Mechanical (MEP)",
    titleAr: "الميكانيكا",
    descEn: "HVAC, fire fighting, plumbing and process utilities.",
    descAr: "تكييف ومكافحة حريق وسباكة ومرافق صناعية.",
    pointsEn: ["HVAC & ventilation", "Fire fighting", "Plumbing & water treatment", "Boilers & compressed air", "Smoke system", "Gas system", "Infra networks", "Oil & grease / Dechlorinated stations"],
    pointsAr: ["تكييف وتهوية", "مكافحة حريق", "سباكة ومعالجة مياه", "غلايات وهواء مضغوط", "نظام سحب الدخان", "نظام الغاز", "شبكات البنية التحتية", "زيوت وشحوم / محطات إزالة الكلور"]
  },
  {
    id: "electrical",
    icon: "zap",
    titleEn: "Electrical & Control",
    titleAr: "الكهرباء والتحكم",
    descEn: "MV networks, lighting, BMS and low-current systems.",
    descAr: "شبكات جهد متوسط وإضاءة وBMS وتيار خفيف.",
    pointsEn: ["MV network — overhead lines & MV cables", "MV switchgear, RMU & transformers", "Lighting turnkey (indoor/outdoor)", "BMS & control", "Fire alarm / access control", "Sound / nurse / BGM-PA systems", "CCTV / data / telephone networks", "Power quality & energy saving", "Smart home / I-Bus"],
    pointsAr: ["شبكة جهد متوسط — خطوط هوائية وكابلات", "موزعات و RMU ومحولات", "إضاءة تسليم مفتاح داخلي وخارجي", "BMS وتحكم", "إنذار حريق وتحكم دخول", "صوتي / تمريض / إذاعة داخلية", "شبكات CCTV وداتا وتليفون", "جودة قدرة وتوفير طاقة", "منزل ذكي / I-Bus"]
  },
  {
    id: "food",
    icon: "factory",
    titleEn: "Food Solution",
    titleAr: "الحلول الغذائية",
    descEn: "Stainless fabrication and hygienic lines for food factories.",
    descAr: "تصنيع استانلس وخطوط صحية لمصانع الأغذية.",
    pointsEn: ["S.S tanks manufacturing", "S.S pipes — production lines", "S.S pipes — CIP lines", "S.S furniture — tables, chairs, handrails, ladders, platforms", "S.S & metal conveyors", "Equipment installation", "Production hall preparation"],
    pointsAr: ["تصنيع تانكات استانلس", "مواسير استانلس — خطوط الإنتاج", "مواسير استانلس — خطوط CIP", "فرش استانلس — ترابيزات وكراسي ودرابزين وسلالم ومنصات", "سيور استانلس ومعدنية", "تركيب معدات", "تجهيز صالات الإنتاج"]
  }
];
