export type Post = {
  slug: string;
  dateEn: string;
  dateAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  tag: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: 'heinz-power-water-package',
    dateEn: 'Nov 15, 2025',
    dateAr: '15 نوفمبر 2025',
    titleEn: 'Heinz power & water package delivered (MV + LV + WWTP)',
    titleAr: 'تسليم حزمة القدرة والمياه لهاينز (جهد متوسط + منخفض + معالجة)',
    descEn:
      'Full MV/LV networks, switch gear, RMUs and transformers energized and tested. 61M EGP waste-water treatment plant commissioned and handed over.',
    descAr:
      'تشغيل واختبار شبكات الجهد المتوسط والمنخفض والموزعات والمحولات بالكامل. تشغيل وتسليم محطة معالجة الصرف بقيمة 61 مليون جنيه.',
    tag: 'Handover',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=70&auto=format&fit=crop',
  },
  {
    slug: 'koun-ras-el-hekma-mobilization',
    dateEn: 'Sep 01, 2025',
    dateAr: '1 سبتمبر 2025',
    titleEn: 'Koun Ras El Hekma mobilization with Mabany Edrees',
    titleAr: 'بدء تجهيز موقع كون رأس الحكمة مع مباني إدريس',
    descEn:
      'Enabling works and concrete structures underway on the North Coast. 150M EGP phase mobilized with full site setup and HSE plan.',
    descAr:
      'أعمال التمكين والهياكل الخرسانية جارية في الساحل الشمالي. بدء مرحلة بـ150 مليون جنيه مع تجهيز كامل للموقع وخطة سلامة.',
    tag: 'New project',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=70&auto=format&fit=crop',
  },
  {
    slug: 'heinz-jar-bottle-expansion',
    dateEn: 'Dec 20, 2024',
    dateAr: '20 ديسمبر 2024',
    titleEn: 'Heinz Jar & Bottle expansion — 295M EGP milestone',
    titleAr: 'توسعة البرطمانات والزجاجات لهاينز — إنجاز بـ295 مليون جنيه',
    descEn:
      'Civil, steel and full MEP scope completed over 18 months in 6th October. Jar and bottle lines handed over with finishing and commissioning.',
    descAr:
      'اكتمال الأعمال المدنية والمعدنية والكهروميكانيكا خلال 18 شهرًا في 6 أكتوبر. تسليم خطوط البرطمانات والزجاجات مع التشطيب والتشغيل.',
    tag: 'Industrial',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=70&auto=format&fit=crop',
  },
  {
    slug: 'carrefour-fast-track-fitouts',
    dateEn: 'Oct 10, 2023',
    dateAr: '10 أكتوبر 2023',
    titleEn: 'Carrefour fast-track fit-outs delivered in 2 months',
    titleAr: 'تسليم تشطيبات كارفور السريعة خلال شهرين',
    descEn:
      'El Hosary and Saraya El Qoba supermarkets fitted out in a 2-month fast-track. MEP retrofit and refrigeration interfaces completed without downtime.',
    descAr:
      'تشطيب فرعي الحصري وسرايا القبة بنظام المسار السريع خلال شهرين. تعديل الكهروميكانيكا وواجهات التبريد دون توقف التشغيل.',
    tag: 'Retail',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200&q=70&auto=format&fit=crop',
  },
];
