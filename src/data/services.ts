export type Service = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "civil",
    icon: "building",
    title: "Civil & Architecture",
    desc: "Concrete, steel, roads and infrastructure for industrial and commercial facilities.",
    points: ["Earthworks & concrete", "Steel structures", "Roads & infrastructure", "Water & sewerage", "Concrete / Epoxy / U-Crete floors", "Villas & commercial buildings", "Hospitals", "Water features (lakes, fountains, pools)", "Repair & strengthening of structures"]
  },
  {
    id: "finishing",
    icon: "paint",
    title: "Finishing Works",
    desc: "High-end finishing for factories, retail and offices that lasts.",
    points: ["Internal & external plastering", "Primer coats", "Final paint coats", "Ceramic / marble / industrial flooring", "Suspended ceilings", "Decorative gypsum", "Thermal & moisture insulation"]
  },
  {
    id: "mechanical",
    icon: "fan",
    title: "Mechanical (MEP)",
    desc: "HVAC, fire fighting, plumbing and process utilities.",
    points: ["HVAC & ventilation", "Fire fighting", "Plumbing & water treatment", "Boilers & compressed air", "Smoke system", "Gas system", "Infra networks", "Oil & grease / Dechlorinated stations"]
  },
  {
    id: "electrical",
    icon: "zap",
    title: "Electrical & Control",
    desc: "MV networks, lighting, BMS and low-current systems.",
    points: ["MV network — overhead lines & MV cables", "MV switchgear, RMU & transformers", "Lighting turnkey (indoor/outdoor)", "BMS & control", "Fire alarm / access control", "Sound / nurse / BGM-PA systems", "CCTV / data / telephone networks", "Power quality & energy saving", "Smart home / I-Bus"]
  },
  {
    id: "food",
    icon: "factory",
    title: "Food Solution",
    desc: "Stainless fabrication and hygienic lines for food factories.",
    points: ["S.S tanks manufacturing", "S.S pipes — production lines", "S.S pipes — CIP lines", "S.S furniture — tables, chairs, handrails, ladders, platforms", "S.S & metal conveyors", "Equipment installation", "Production hall preparation"]
  }
];
