export type Spec = { labelEn: string; labelAr: string; valueEn: string; valueAr: string }
export type Product = {
  id: string; category: string; icon: string; color: string; price: number; oldPrice?: number; image: string
  nameEn: string; nameAr: string; descEn: string; descAr: string
  rating: number; reviews: number; stock: number; badge?: string
  specs: Spec[]; extra?: Record<string, string>
}
export type Creator = {
  id: string; nameEn: string; nameAr: string; craftEn: string; craftAr: string
  cityEn: string; cityAr: string; bioEn: string; bioAr: string; icon: string; color: string
}
export const PRODUCTS: Product[] = [
  {
    "id": "e01",
    "category": "phones",
    "icon": "DeviceMobile",
    "color": "#1F2A44",
    "price": 4899.37,
    "image": "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Nova X7 phone",
    "nameAr": "هاتف نوفا X7",
    "descEn": "A 6.4 inch phone with a 108 MP camera and two day battery life",
    "descAr": "هاتف بشاشة 6.4 بوصة وكاميرا 108 ميجابكسل وبطارية تدوم يومين",
    "rating": 4.7,
    "reviews": 213,
    "stock": 14,
    "specs": [
      {
        "labelEn": "Display",
        "labelAr": "الشاشة",
        "valueEn": "6.4 inch AMOLED",
        "valueAr": "6.4 بوصة AMOLED"
      },
      {
        "labelEn": "Chip",
        "labelAr": "المعالج",
        "valueEn": "Nova Octa 3",
        "valueAr": "نوفا أوكتا 3"
      },
      {
        "labelEn": "Battery",
        "labelAr": "البطارية",
        "valueEn": "5,400 mAh",
        "valueAr": "5400 مللي أمبير"
      },
      {
        "labelEn": "Storage",
        "labelAr": "التخزين",
        "valueEn": "256 GB",
        "valueAr": "256 جيجابايت"
      }
    ],
    "oldPrice": 5299.0,
    "badge": "sale",
    "extra": {
      "brand": "Nova"
    }
  },
  {
    "id": "e02",
    "category": "laptops",
    "icon": "Laptop",
    "color": "#273449",
    "price": 12749.51,
    "image": "https://images.pexels.com/photos/8533587/pexels-photo-8533587.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "AeroBook 14 laptop",
    "nameAr": "لابتوب أيرو بوك 14",
    "descEn": "A 14 inch laptop with 16 GB memory and a 512 GB drive for work and study",
    "descAr": "لابتوب 14 بوصة بذاكرة 16 جيجابايت وقرص 512 جيجابايت للعمل والدراسة",
    "rating": 4.8,
    "reviews": 167,
    "stock": 9,
    "specs": [
      {
        "labelEn": "Display",
        "labelAr": "الشاشة",
        "valueEn": "14 inch, 2.8K",
        "valueAr": "14 بوصة، 2.8K"
      },
      {
        "labelEn": "Memory",
        "labelAr": "الذاكرة",
        "valueEn": "16 GB",
        "valueAr": "16 جيجابايت"
      },
      {
        "labelEn": "Storage",
        "labelAr": "التخزين",
        "valueEn": "512 GB SSD",
        "valueAr": "512 جيجابايت SSD"
      },
      {
        "labelEn": "Weight",
        "labelAr": "الوزن",
        "valueEn": "1.38 kg",
        "valueAr": "1.38 كجم"
      }
    ],
    "badge": "best",
    "extra": {
      "brand": "Aero"
    }
  },
  {
    "id": "e03",
    "category": "audio",
    "icon": "Headphones",
    "color": "#3A2B4F",
    "price": 1249.63,
    "image": "https://images.pexels.com/photos/7772548/pexels-photo-7772548.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Pulse buds pro",
    "nameAr": "سماعات بالس برو",
    "descEn": "Wireless earbuds with active noise cancelling and 32 hours of total playtime",
    "descAr": "سماعات لاسلكية بعزل ضوضاء نشط و32 ساعة تشغيل إجمالية",
    "rating": 4.6,
    "reviews": 342,
    "stock": 22,
    "specs": [
      {
        "labelEn": "Battery",
        "labelAr": "البطارية",
        "valueEn": "32 hours with case",
        "valueAr": "32 ساعة مع العلبة"
      },
      {
        "labelEn": "Bluetooth",
        "labelAr": "البلوتوث",
        "valueEn": "5.4",
        "valueAr": "5.4"
      },
      {
        "labelEn": "Water resistance",
        "labelAr": "مقاومة الماء",
        "valueEn": "IPX5",
        "valueAr": "IPX5"
      },
      {
        "labelEn": "Weight",
        "labelAr": "الوزن",
        "valueEn": "4.7 g each",
        "valueAr": "4.7 جرام لكل سماعة"
      }
    ],
    "oldPrice": 1499.0,
    "badge": "sale",
    "extra": {
      "brand": "Pulse"
    }
  },
  {
    "id": "e04",
    "category": "wearables",
    "icon": "Watch",
    "color": "#123B33",
    "price": 2399.17,
    "image": "https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Halo watch S2",
    "nameAr": "ساعة هالو S2",
    "descEn": "A smartwatch with heart rate and sleep tracking and a 10 day battery",
    "descAr": "ساعة ذكية بتتبع نبض القلب والنوم وبطارية 10 أيام",
    "rating": 4.5,
    "reviews": 198,
    "stock": 17,
    "specs": [
      {
        "labelEn": "Display",
        "labelAr": "الشاشة",
        "valueEn": "1.43 inch AMOLED",
        "valueAr": "1.43 بوصة AMOLED"
      },
      {
        "labelEn": "Battery",
        "labelAr": "البطارية",
        "valueEn": "10 days",
        "valueAr": "10 أيام"
      },
      {
        "labelEn": "Water resistance",
        "labelAr": "مقاومة الماء",
        "valueEn": "5 ATM",
        "valueAr": "5 ATM"
      },
      {
        "labelEn": "Sensors",
        "labelAr": "الحساسات",
        "valueEn": "Heart rate, SpO2, sleep",
        "valueAr": "نبض القلب، الأكسجين، النوم"
      }
    ],
    "badge": "new",
    "extra": {
      "brand": "Halo"
    }
  },
  {
    "id": "e05",
    "category": "home",
    "icon": "SpeakerHigh",
    "color": "#4A2C1A",
    "price": 899.43,
    "image": "https://images.pexels.com/photos/14309806/pexels-photo-14309806.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Echo room speaker",
    "nameAr": "سماعة إيكو للغرفة",
    "descEn": "A room speaker with clear vocals, deep bass, and voice control",
    "descAr": "سماعة غرفة بصوت واضح وجهير عميق وتحكم صوتي",
    "rating": 4.4,
    "reviews": 121,
    "stock": 26,
    "specs": [
      {
        "labelEn": "Power",
        "labelAr": "القدرة",
        "valueEn": "30 W",
        "valueAr": "30 واط"
      },
      {
        "labelEn": "Connection",
        "labelAr": "الاتصال",
        "valueEn": "Wi-Fi, Bluetooth",
        "valueAr": "واي فاي، بلوتوث"
      },
      {
        "labelEn": "Assistant",
        "labelAr": "المساعد",
        "valueEn": "Built in",
        "valueAr": "مدمج"
      },
      {
        "labelEn": "Weight",
        "labelAr": "الوزن",
        "valueEn": "1.1 kg",
        "valueAr": "1.1 كجم"
      }
    ],
    "extra": {
      "brand": "Echo"
    }
  },
  {
    "id": "e06",
    "category": "phones",
    "icon": "Camera",
    "color": "#2E2A26",
    "price": 8349.29,
    "image": "https://images.pexels.com/photos/16387546/pexels-photo-16387546/free-photo-of-popular-technology-items.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Lens Pro camera",
    "nameAr": "كاميرا لينس برو",
    "descEn": "A mirrorless camera with a 24 MP sensor and 4K video for creators",
    "descAr": "كاميرا بلا مرآة بمستشعر 24 ميجابكسل وفيديو 4K لصناع المحتوى",
    "rating": 4.9,
    "reviews": 87,
    "stock": 6,
    "specs": [
      {
        "labelEn": "Sensor",
        "labelAr": "المستشعر",
        "valueEn": "24.2 MP APS-C",
        "valueAr": "24.2 ميجابكسل APS-C"
      },
      {
        "labelEn": "Video",
        "labelAr": "الفيديو",
        "valueEn": "4K 30fps",
        "valueAr": "4K بمعدل 30 إطارًا"
      },
      {
        "labelEn": "Lens mount",
        "labelAr": "حامل العدسة",
        "valueEn": "Lens Pro E",
        "valueAr": "لينس برو E"
      },
      {
        "labelEn": "Weight",
        "labelAr": "الوزن",
        "valueEn": "429 g",
        "valueAr": "429 جرامًا"
      }
    ],
    "badge": "best",
    "extra": {
      "brand": "Lens"
    }
  },
  {
    "id": "e07",
    "category": "laptops",
    "icon": "DeviceTablet",
    "color": "#1E3A4F",
    "price": 3199.71,
    "image": "https://images.pexels.com/photos/3945691/pexels-photo-3945691.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Tab Lite 11",
    "nameAr": "تابلت تاب لايت 11",
    "descEn": "An 11 inch tablet for reading, notes, and streaming, with stylus support",
    "descAr": "تابلت 11 بوصة للقراءة والملاحظات والمشاهدة مع دعم القلم",
    "rating": 4.3,
    "reviews": 154,
    "stock": 19,
    "specs": [
      {
        "labelEn": "Display",
        "labelAr": "الشاشة",
        "valueEn": "11 inch LCD",
        "valueAr": "11 بوصة LCD"
      },
      {
        "labelEn": "Storage",
        "labelAr": "التخزين",
        "valueEn": "128 GB",
        "valueAr": "128 جيجابايت"
      },
      {
        "labelEn": "Battery",
        "labelAr": "البطارية",
        "valueEn": "13 hours",
        "valueAr": "13 ساعة"
      },
      {
        "labelEn": "Stylus",
        "labelAr": "القلم",
        "valueEn": "Included",
        "valueAr": "مرفق"
      }
    ],
    "extra": {
      "brand": "Nova"
    }
  },
  {
    "id": "e08",
    "category": "home",
    "icon": "BatteryCharging",
    "color": "#3B2E12",
    "price": 349.87,
    "image": "https://images.pexels.com/photos/5208781/pexels-photo-5208781.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Volt 65W charger",
    "nameAr": "شاحن فولت 65 واط",
    "descEn": "A compact 65 W GaN charger with two USB-C ports and one USB-A port",
    "descAr": "شاحن صغير 65 واط بتقنية GaN مع منفذي USB-C ومنفذ USB-A",
    "rating": 4.7,
    "reviews": 428,
    "stock": 41,
    "specs": [
      {
        "labelEn": "Power",
        "labelAr": "القدرة",
        "valueEn": "65 W GaN",
        "valueAr": "65 واط GaN"
      },
      {
        "labelEn": "Ports",
        "labelAr": "المنافذ",
        "valueEn": "2x USB-C, 1x USB-A",
        "valueAr": "منفذا USB-C ومنفذ USB-A"
      },
      {
        "labelEn": "Weight",
        "labelAr": "الوزن",
        "valueEn": "112 g",
        "valueAr": "112 جرامًا"
      },
      {
        "labelEn": "Cable",
        "labelAr": "الكابل",
        "valueEn": "Not included",
        "valueAr": "غير مرفق"
      }
    ],
    "extra": {
      "brand": "Volt"
    }
  },
  {
    "id": "e09",
    "category": "home",
    "icon": "PaperPlaneTilt",
    "color": "#243447",
    "price": 6499.13,
    "image": "https://images.pexels.com/photos/3619918/pexels-photo-3619918.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Orbit drone mini",
    "nameAr": "درون أوربت ميني",
    "descEn": "A foldable drone with a 4K camera, 34 minute flight time, and obstacle sensing",
    "descAr": "درون قابل للطي بكاميرا 4K وطيران 34 دقيقة واستشعار عوائق",
    "rating": 4.6,
    "reviews": 73,
    "stock": 8,
    "specs": [
      {
        "labelEn": "Camera",
        "labelAr": "الكاميرا",
        "valueEn": "4K 30fps",
        "valueAr": "4K بمعدل 30 إطارًا"
      },
      {
        "labelEn": "Flight time",
        "labelAr": "زمن الطيران",
        "valueEn": "34 minutes",
        "valueAr": "34 دقيقة"
      },
      {
        "labelEn": "Range",
        "labelAr": "المدى",
        "valueEn": "10 km",
        "valueAr": "10 كم"
      },
      {
        "labelEn": "Weight",
        "labelAr": "الوزن",
        "valueEn": "249 g",
        "valueAr": "249 جرامًا"
      }
    ],
    "badge": "new",
    "extra": {
      "brand": "Orbit"
    }
  },
  {
    "id": "e10",
    "category": "home",
    "icon": "Television",
    "color": "#1F1F2B",
    "price": 549.59,
    "image": "https://images.pexels.com/photos/16888144/pexels-photo-16888144/free-photo-of-electronic-devices-on-white-background.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Stream stick 4K",
    "nameAr": "عصا ستريم 4K",
    "descEn": "A streaming stick that turns any TV into a 4K smart TV with voice remote",
    "descAr": "عصا بث تحوّل أي تلفاز إلى تلفاز ذكي 4K مع ريموت صوتي",
    "rating": 4.2,
    "reviews": 265,
    "stock": 33,
    "specs": [
      {
        "labelEn": "Resolution",
        "labelAr": "الدقة",
        "valueEn": "4K HDR",
        "valueAr": "4K HDR"
      },
      {
        "labelEn": "Remote",
        "labelAr": "الريموت",
        "valueEn": "Voice remote",
        "valueAr": "ريموت صوتي"
      },
      {
        "labelEn": "Apps",
        "labelAr": "التطبيقات",
        "valueEn": "Streaming apps",
        "valueAr": "تطبيقات البث"
      },
      {
        "labelEn": "Power",
        "labelAr": "الطاقة",
        "valueEn": "USB powered",
        "valueAr": "تعمل عبر USB"
      }
    ],
    "extra": {
      "brand": "Stream"
    }
  },
  {
    "id": "e11",
    "category": "laptops",
    "icon": "Keyboard",
    "color": "#33261F",
    "price": 1099.23,
    "image": "https://images.pexels.com/photos/222835/pexels-photo-222835.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Mech keyboard 75",
    "nameAr": "لوحة مفاتيح ميك 75",
    "descEn": "A compact mechanical keyboard with hot swap switches and RGB backlight",
    "descAr": "لوحة مفاتيح ميكانيكية مدمجة بمفاتيح قابلة للتبديل وإضاءة RGB",
    "rating": 4.8,
    "reviews": 176,
    "stock": 15,
    "specs": [
      {
        "labelEn": "Layout",
        "labelAr": "التخطيط",
        "valueEn": "75%, 84 keys",
        "valueAr": "75%، 84 زرًا"
      },
      {
        "labelEn": "Switches",
        "labelAr": "المفاتيح",
        "valueEn": "Hot swap linear",
        "valueAr": "خطية قابلة للتبديل"
      },
      {
        "labelEn": "Connection",
        "labelAr": "الاتصال",
        "valueEn": "Bluetooth, USB-C",
        "valueAr": "بلوتوث، USB-C"
      },
      {
        "labelEn": "Battery",
        "labelAr": "البطارية",
        "valueEn": "40 hours",
        "valueAr": "40 ساعة"
      }
    ],
    "badge": "best",
    "extra": {
      "brand": "Mech"
    }
  },
  {
    "id": "e12",
    "category": "audio",
    "icon": "GameController",
    "color": "#2A1F33",
    "price": 799.91,
    "image": "https://images.pexels.com/photos/5208883/pexels-photo-5208883.jpeg?cs=tinysrgb&dpr=1&w=500",
    "nameEn": "Game pad pro",
    "nameAr": "يد تحكم جيم باد برو",
    "descEn": "A wireless controller with hall effect sticks and 40 hours of playtime",
    "descAr": "يد تحكم لاسلكية بعصي هول إفكت و40 ساعة لعب",
    "rating": 4.5,
    "reviews": 231,
    "stock": 28,
    "specs": [
      {
        "labelEn": "Connection",
        "labelAr": "الاتصال",
        "valueEn": "Bluetooth, 2.4 GHz",
        "valueAr": "بلوتوث، 2.4 جيجاهرتز"
      },
      {
        "labelEn": "Battery",
        "labelAr": "البطارية",
        "valueEn": "40 hours",
        "valueAr": "40 ساعة"
      },
      {
        "labelEn": "Sticks",
        "labelAr": "العصي",
        "valueEn": "Hall effect",
        "valueAr": "هول إفكت"
      },
      {
        "labelEn": "Compatibility",
        "labelAr": "التوافق",
        "valueEn": "PC, console, mobile",
        "valueAr": "حاسوب، كونسول، هاتف"
      }
    ],
    "extra": {
      "brand": "Pulse"
    }
  }
]
export const CATEGORIES = [
  {
    "id": "all",
    "en": "All",
    "ar": "الكل"
  },
  {
    "id": "phones",
    "en": "Phones",
    "ar": "هواتف"
  },
  {
    "id": "laptops",
    "en": "Laptops",
    "ar": "لابتوبات"
  },
  {
    "id": "audio",
    "en": "Audio",
    "ar": "صوتيات"
  },
  {
    "id": "wearables",
    "en": "Wearables",
    "ar": "قابلة للارتداء"
  },
  {
    "id": "home",
    "en": "Smart home",
    "ar": "منزل ذكي"
  }
]
export const CREATORS: Creator[] = []
export const BRANDS: string[] = [
  "Aero",
  "Echo",
  "Halo",
  "Lens",
  "Mech",
  "Nova",
  "Orbit",
  "Pulse",
  "Stream",
  "Volt"
]
