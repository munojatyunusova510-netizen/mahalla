// ==========================================================================
// Mening Mahallam - Initial Mock Data (O'zbekiston mahallasi namunasida)
// ==========================================================================

export const MAHALLA_INFO = {
  name: "Navro'z mahallasi",
  shortName: "Navro'z MFY",
  region: "Toshkent shahri",
  district: "Yunusobod tumani",
  address: "Yunusobod tumani, 4-mavze, 18-bino",
  phone: "+998 71 234-56-78",
  email: "navroz.mfy@toshkent.uz",
  workingHours: "Dushanba - Shanba: 09:00 - 18:00",
  population: "6 420 nafar",
  households: "1 280 ta xonadon",
  streetsCount: "14 ta ko'cha"
};

export const PROBLEM_CATEGORIES = [
  { id: "all", label: "Barchasi", icon: "LayoutGrid" },
  { id: "roads", label: "Yo'llar va piyodalar yo'lagi", icon: "Car" },
  { id: "lighting", label: "Ko'cha chiroqlari", icon: "Lightbulb" },
  { id: "water", label: "Suv va kanalizatsiya", icon: "Droplets" },
  { id: "waste", label: "Chiqindilar va tozalik", icon: "Trash2" },
  { id: "greenery", label: "Obodonlashtirish va bog'lar", icon: "Trees" },
  { id: "energy", label: "Gaz va elektr ta'minoti", icon: "Zap" },
  { id: "other", label: "Boshqa masalalar", icon: "HelpCircle" }
];

export const PROBLEM_STATUSES = {
  yangi: { label: "Yangi", class: "badge-status-yangi", color: "#1d4ed8" },
  korib_chiqilmoqda: { label: "Ko'rib chiqilmoqda", class: "badge-status-korib-chiqilmoqda", color: "#b45309" },
  jarayonda: { label: "Jarayonda", class: "badge-status-jarayonda", color: "#c2410c" },
  hal_qilindi: { label: "Hal qilindi", class: "badge-status-hal-qilindi", color: "#15803d" }
};

export const INITIAL_PROBLEMS = [
  {
    id: "prob-101",
    title: "14-ko'chadagi piyodalar yo'lagida chuqurlar paydo bo'lgan",
    description: "Kuzgi yomg'irlardan so'ng bolalar bog'chasiga olib boruvchi yo'lakda 3 ta katta chuqur paydo bo'ldi. Aholi va yosh bolali onalar o'tishiga jiddiy noqulaylik tug'dirmoqda.",
    category: "roads",
    address: "14-ko'cha, 22-uy ro'parasi",
    author: "Javohir K.",
    date: "2026-10-10",
    status: "jarayonda",
    votes: 47,
    hasVoted: false,
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    officialResponse: "Tuman yo'llardan foydalanish korxonasiga buyurtma yuborildi. Asfalt yotqizish ishlari 18-oktabrga rejalashtirilgan."
  },
  {
    id: "prob-102",
    title: "Bog' ko'chasidagi 3 ta tungi yoritgich simlari uzilgan",
    description: "Tungi paytda ko'cha butunlay qorong'i bo'lib qolmoqda. O'quvchilar kechki to'garakdan qaytishida xavfsizlik talablariga javob bermayapti.",
    category: "lighting",
    address: "Bog' ko'chasi, 8-12 uylar oralig'i",
    author: "Nilufar O.",
    date: "2026-10-12",
    status: "yangi",
    votes: 32,
    hasVoted: false,
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    officialResponse: "Murojaat ro'yxatga olindi. 'ToshshaharNur' mutaxassisi joyiga chiqib o'rganishi kutilmoqda."
  },
  {
    id: "prob-103",
    title: "Bolalar maydonchasidagi arg'imchoq va trenajyorlar ta'mirtalab",
    description: "4-mavze hovlisidagi umumiy o'yin maydonchasida ikkita arg'imchoq zanjiri uzilgan va xavfli holatga kelgan. Bolalar xavfsizligi uchun zudlik bilan sozlash zarur.",
    category: "greenery",
    address: "4-mavze, 15 va 16-uylar oralig'idagi xiyobon",
    author: "Sanjar M.",
    date: "2026-10-08",
    status: "ko'rib_chiqilmoqda",
    votes: 56,
    hasVoted: false,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    officialResponse: "Mahalla faollari ko'rikdan o'tkazdi. Payvandlash va yangi xavfsiz o'rindiqlar o'rnatish smetasi tuzilmoqda."
  },
  {
    id: "prob-104",
    title: "Chiqindi yig'ish joyi atrofini panjara bilan to'sish va konteynerlarni yangilash",
    description: "Eski chiqindi maydonchasi shamolda chiqindilar tarqalishiga sabab bo'lmoqda. Zamonaviy yopiq eko-burchak tashkil qilish taklif qilinadi.",
    category: "waste",
    address: "Sharqiy ko'cha burchagi",
    author: "Zohid A.",
    date: "2026-10-01",
    status: "hal_qilindi",
    votes: 89,
    hasVoted: true,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    officialResponse: "Murojaat to'liq hal etildi! 'Mahr-toza' korxonasi bilan birgalikda 4 ta yangi yopiq konteyner o'rnatildi va hudud panjara bilan to'sildi."
  },
  {
    id: "prob-105",
    title: "Ichimlik suvi bosimi pastligi (ayniqsa yuqori qavatlarda)",
    description: "Kechki soat 19:00 dan 22:00 gacha 4 va 5-qavatdagi xonadonlarda suv bosimi juda pasayib ketmoqda. Nasos stansiyasini ko'rikdan o'tkazish kerak.",
    category: "water",
    address: "Guliston ko'chasi, 24, 25-ko'p qavatli uylar",
    author: "Dilnoza R.",
    date: "2026-10-06",
    status: "jarayonda",
    votes: 64,
    hasVoted: false,
    image: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
    officialResponse: "'O'zsuvta'minot' tuman bo'limi tomonidan qo'shimcha gidrofor o'rnatish ishlari olib borilmoqda."
  },
  {
    id: "prob-106",
    title: "Eski transformator podstansiyasini yangilash va ortiqcha yuklamani bartaraf etish",
    description: "Yoz va qish mavsumida elektr tarmoqlarida tez-tez uzilishlar kuzatilmoqda. Aholi soni ortgani sababli transformator quvvatini oshirish talab etiladi.",
    category: "energy",
    address: "Markaziy ko'cha, TP-148",
    author: "Akmal B.",
    date: "2026-09-28",
    status: "ko'rib_chiqilmoqda",
    votes: 112,
    hasVoted: false,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    officialResponse: "HETK tuman korxonasining 2026-yilgi modernizatsiya dasturiga kiritildi."
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "Yangi Eko-Xiyobon va Yashil Maydon barpo etildi",
    description: "Ilgari qarovsiz bo'lib yotgan 1.2 gektar bo'sh yer o'rnida zamonaviy dam olish bog'i, 300 dan ortiq manzarali daraxtlar, o'rindiqlar va favvora bunyod etildi.",
    beforeImage: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
    date: "2026-09-01",
    category: "Obodonlashtirish",
    impact: "6 400 dan ortiq mahalla ahli uchun qulay dam olish hududi yaratildi."
  },
  {
    id: "ach-2",
    title: "Quyosh panelli energiya tejovchi ko'cha yoritish tizimi",
    description: "Mahallamizning barcha 14 ta ichki ko'chalarida 120 ta zamonaviy LED va quyosh panelli tungi chiroqlar o'rnatildi. Elektr xarajati 70% ga qisqardi.",
    beforeImage: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    date: "2026-08-15",
    category: "Energiya tejamkorlik",
    impact: "Tungi xavfsizlik 100% ga yetkazildi, elektr energiyasi tejalmoqda."
  },
  {
    id: "ach-3",
    title: "Yoshlar uchun zamonaviy mini-futbol va workout maydonchasi",
    description: "Mahalla yoshlari va bolalari sport bilan muntazam shug'ullanishi uchun sun'iy qoplamali stadion va zamonaviy trenajyorlar bilan jihozlangan ochiq maydoncha foydalanishga topshirildi.",
    beforeImage: "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-30",
    category: "Sport va sog'lom turmush",
    impact: "Har kuni 150 dan ortiq yoshlar va nuroniylar sport mashg'ulotlarida qatnashmoqda."
  },
  {
    id: "ach-4",
    title: "Ichki yo'llarni to'liq asfaltlash va veloyo'lak barpo etish",
    description: "Tuman hokimligi va aholi tashabbusi bilan umumiy uzunligi 3.4 km bo'lgan ichki ko'chalarga yangi sifatli asfalt yotqizildi va xavfsiz veloyo'laklar belgilandi.",
    beforeImage: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-20",
    category: "Yo'l infratuzilmasi",
    impact: "Avtotransport va piyodalar harakati uchun to'liq qulaylik ta'minlandi."
  }
];

export const INITIAL_SOCIAL_INITIATIVES = [
  {
    id: "soc-1",
    code: "YORDAM-042",
    title: "Kuz-qish mavsumi uchun isitish vositalari va ko'mir ta'minoti",
    category: "Mavsumiy ko'mak",
    targetGoal: "12 ta xonadon",
    collectedProgress: 9,
    progressPercent: 75,
    neededItems: ["Isitish radiatorlari", "Briket/ko'mir yoqilg'isi", "Issiq kiyimlar to'plami"],
    status: "Faol",
    deadline: "2026-11-01",
    description: "Kuz-qish mavsumida ijtimoiy himoyaga muhtoj, yolg'iz keksalar va boquvchisini yo'qotgan oilalarni issiqlik bilan ta'minlashga qaratilgan xayriya tashabbusi.",
    verifiedBy: "Ijtimoiy xodim va Mahalla raisi tomonidan tasdiqlangan"
  },
  {
    id: "soc-2",
    code: "YORDAM-088",
    title: "Ijtimoiy daftardagi oilalar farzandlari uchun o'quv qurollari va kiyim-kechak",
    category: "Bolalar ta'limi",
    targetGoal: "25 nafar o'quvchi",
    collectedProgress: 21,
    progressPercent: 84,
    neededItems: ["Maktab sumkasi", "Daftar va qalamdon to'plami", "Maktab formasi va poyabzal"],
    status: "Faol",
    deadline: "2026-10-30",
    description: "Mahallamizdagi kam ta'minlangan oilalarda voyaga yetayotgan iqtidorli o'quvchilarni sifatli dars qurollari va qishki kiyimlar bilan to'liq ta'minlash dasturi.",
    verifiedBy: "Yoshlar yetakchisi va Xotin-qizlar faoli tomonidan tasdiqlangan"
  },
  {
    id: "soc-3",
    code: "YORDAM-103",
    title: "Keksa nuroniylar va bemor fuqarolar uchun patronaj va zarur dori-darmonlar",
    category: "Tibbiy ko'mak",
    targetGoal: "15 nafar fuqaro",
    collectedProgress: 11,
    progressPercent: 73,
    neededItems: ["Zarur dori vositalari", "Qon bosimi o'lchash apparatlari", "Ortopedik vositalar"],
    status: "Faol",
    deadline: "2026-11-15",
    description: "Doimiy tibbiy parvarishga muhtoj yolg'iz onaxon va otaxonlar salomatligini mustahkamlash, zarur dori-darmonlar yetkazib berish.",
    verifiedBy: "Mahalla shifokori va Ijtimoiy xizmatlar markazi tomonidan tasdiqlangan"
  },
  {
    id: "soc-4",
    code: "YORDAM-115",
    title: "Homiylik asosida turar-joy tom qismini joriy ta'mirlash",
    category: "Uy-joy ta'miri",
    targetGoal: "3 ta xonadon",
    collectedProgress: 2,
    progressPercent: 66,
    neededItems: ["Shifer / tunuka mahsulotlari", "Yog'och va sement", "Qurilishda ko'ngillilar ko'magi"],
    status: "Faol",
    deadline: "2026-10-25",
    description: "Kuzgi yomg'irlar oldidan tomi yaroqsiz holatga kelib qolgan nogironligi bo'lgan fuqarolar xonadonini hashar yo'li bilan ta'mirlash.",
    verifiedBy: "Mahalla faollari va mahalla muhandisi tomonidan tasdiqlangan"
  }
];

export const INITIAL_PROPOSALS = [
  {
    id: "prop-1",
    trackingCode: "MH-2026-1042",
    type: "taklif",
    title: "Mahalla hududida kutubxona va shaxmat-shashka burchagini tashkil qilish",
    description: "Mahalla guzari binosida yoshlar va nuroniylar uchun bepul kitob almashish (book-crossing) javoni va shaxmat doskalari qo'yishni taklif qilaman.",
    category: "Madaniyat va ma'naviyat",
    submittedBy: "Ulug'bek Sodiqov",
    phone: "+998 90 *** ** 41",
    date: "2026-10-05",
    status: "qabul_qilindi",
    timeline: [
      { step: "Yuborildi", date: "2026-10-05 10:15", status: "completed", note: "Murojaat fuqaro tomonidan onlayn shaklda yuborildi." },
      { step: "Qabul qilindi", date: "2026-10-06 09:30", status: "completed", note: "Mahalla kotibiyati tomonidan ro'yxatga olindi va ijrochiga yo'naltirildi." },
      { step: "O'rganilmoqda", date: "2026-10-08 14:00", status: "current", note: "Guzar binosidagi bo'sh xona ajratish imkoniyati ko'rib chiqilmoqda." },
      { step: "Ijroga qaratildi", date: null, status: "pending", note: "Xomiylar va kitob jamg'armasi bilan kelishuv." },
      { step: "Natija", date: null, status: "pending", note: "Yakuniy xulosa." }
    ]
  },
  {
    id: "prop-2",
    trackingCode: "MH-2026-2184",
    type: "shikoyat",
    title: "Qurilish chiqindilarini noqonuniy to'kish holati bo'yicha",
    description: "Chilonzor ko'chasining chetidagi bo'sh maydonga noma'lum yuk mashinasi tunda qurilish chiqindilarini tashlab ketgan. Jarima qo'llash va tozalatishni so'raymiz.",
    category: "Ekologiya",
    submittedBy: "Munira Xalilova",
    phone: "+998 93 *** ** 12",
    date: "2026-10-07",
    status: "ijroga_qaratildi",
    timeline: [
      { step: "Yuborildi", date: "2026-10-07 08:20", status: "completed", note: "Foto dalillar bilan murojaat kelib tushdi." },
      { step: "Qabul qilindi", date: "2026-10-07 09:10", status: "completed", note: "Profilaktika inspektoriga topshirildi." },
      { step: "O'rganilmoqda", date: "2026-10-07 15:40", status: "completed", note: "Kuzatuv kameralari yordamida transport vositasi aniqlandi." },
      { step: "Ijroga qaratildi", date: "2026-10-09 11:00", status: "current", note: "Qoidabuzarga ma'muriy bayonnoma rasmiylashtirilib, hududni tozalash majburiyati yuklatildi." },
      { step: "Natija", date: null, status: "pending", note: "Hudud tozaligi to'liq tiklangach hisobot yuklanadi." }
    ]
  },
  {
    id: "prop-3",
    trackingCode: "MH-2026-3490",
    type: "taklif",
    title: "Haftalik yakshanba sport-sog'lomlashtirish yugurish marafoni",
    description: "Har yakshanba tongi soat 07:00 da mahalla ahli uchun 'Salomatlik sari qadam' shiori ostida 2 km masofaga ommaviy yugurish va ertalabki badantarbiya o'tkazish.",
    category: "Sport",
    submittedBy: "Bobur Karimov",
    phone: "+998 97 *** ** 89",
    date: "2026-09-25",
    status: "hal_qilindi",
    timeline: [
      { step: "Yuborildi", date: "2026-09-25 11:30", status: "completed", note: "Yoshlar taklifi yuborildi." },
      { step: "Qabul qilindi", date: "2026-09-26 10:00", status: "completed", note: "Yoshlar yetakchisi ma'qulladi." },
      { step: "O'rganilmoqda", date: "2026-09-27 16:00", status: "completed", note: "Xavfsiz yo'nalish tanlandi." },
      { step: "Ijroga qaratildi", date: "2026-09-28 12:00", status: "completed", note: "E'lonlar tarqatildi." },
      { step: "Natija", date: "2026-10-01 08:00", status: "completed", note: "Tadbir muvaffaqiyatli yo'lga qo'yildi va har yakshanba an'anaga aylandi!" }
    ]
  }
];

export const INITIAL_NEWS = [
  {
    id: "news-1",
    title: "Yurtimiz obodligi uchun umumxalq xayriya hashari o'tkazildi",
    excerpt: "Navro'z mahallasida 400 dan ortiq fuqarolar, nuroniylar va yoshlar ishtirokida keng ko'lamli obodonlashtirish hashari bo'lib o'tdi.",
    content: "O'zbekiston Respublikasi Vazirlar Mahkamasi farmoyishiga binoan o'tkazilgan hasharda mahallamizdagi barcha ko'chalar, ariqlar va daraxtlar tartibga keltirildi. 2 km uzunlikdagi ariqlar tozalandi, 500 dan ortiq manzarali ko'chatlar ekildi. Tadbir so'ngida nuroniy otaxon va onaxonlar el-yurt tinchligi uchun duo qildilar.",
    category: "Hashar va obodonlik",
    date: "2026-10-12",
    readTime: "3 daqiqa",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    views: 412
  },
  {
    id: "news-2",
    title: "Mahalla yoshlari o'rtasida 'Besh tashabbus' sport musobaqasi g'oliblari aniqlandi",
    excerpt: "Stol tennisi, mini-futbol va shaxmat bo'yicha o'tkazilgan 3 kunlik bellashuvda 80 dan ziyod yoshlar faol ishtirok etishdi.",
    content: "Mahalla yoshlar yetakchisi tashabbusi bilan tashkil etilgan turnirda qizg'in bahslar bo'lib o'tdi. G'olib yoshlarga mahalla boshqaruvi va homiylar tomonidan diplom hamda esdalik sovg'alari topshirildi. Endi ular tuman bosqichida mahalla sharafini himoya qilishadi.",
    category: "Sport va yoshlar",
    date: "2026-10-09",
    readTime: "2 daqiqa",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
    views: 328
  },
  {
    id: "news-3",
    title: "Mahalla binosida yoshlar uchun bepul dasturlash va xorijiy til to'garaklari yo'lga qo'yildi",
    excerpt: "Zamonaviy IT kasblariga qiziquvchi maktab o'quvchilari uchun haftada 3 marotaba bepul darslar o'tkazilmoqda.",
    content: "Mahallamiz yoshlarini kelajak kasblariga yo'naltirish maqsadida maxsus kompyuter xonasi jihozlandi. Malakali mentorlar yoshlarga frontend asoslari, robototexnika hamda ingliz tili so'zlashuv kurslarini o'rgatishmoqda.",
    category: "Ta'lim va IT",
    date: "2026-10-04",
    readTime: "4 daqiqa",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    views: 520
  },
  {
    id: "news-4",
    title: "Xalqaro keksalar kuni munosabati bilan nuroniylar holidan xabar olindi",
    excerpt: "'Hech kim mehr va e'tibordan chetda qolmasin' shiori ostida 35 nafar faxriylarimiz xonadoniga tashrif buyurildi.",
    content: "Mahalla raisi, xotin-qizlar faoli va profilaktika inspektori hamrohligida nuroniy qariyalarimizga bayram sovg'alari, oziq-ovqat mahsulotlari yetkazildi. Tuman poliklinikasi shifokorlari tomonidan ularning salomatligi bepul chuqurlashtirilgan tibbiy ko'rikdan o'tkazildi.",
    category: "Ijtimoiy tadbirlar",
    date: "2026-10-01",
    readTime: "3 daqiqa",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80",
    views: 295
  }
];

export const MAHALLA_OFFICIALS = [
  {
    id: "off-1",
    name: "Alisher Ikromov",
    role: "Mahalla fuqarolar yig'ini raisi",
    department: "Mahalla boshqaruvi",
    phone: "+998 71 234-56-78",
    receptionDays: "Dushanba, Chorshanba: 14:00 - 18:00",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "off-2",
    name: "Sanjarbek Rustamov",
    role: "Hokim yordamchisi",
    department: "Tadbirkorlik va kambag'allikni qisqartirish",
    phone: "+998 90 123-45-67",
    receptionDays: "Seshanba, Payshanba: 09:00 - 12:00",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "off-3",
    name: "Gulnora Rahimova",
    role: "Xotin-qizlar faoli",
    department: "Oila va xotin-qizlar masalalari",
    phone: "+998 93 987-65-43",
    receptionDays: "Har kuni: 10:00 - 16:00",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "off-4",
    name: "Jahongir Olimov",
    role: "Yoshlar yetakchisi",
    department: "Yoshlar ishlari agentligi vakili",
    phone: "+998 97 555-44-33",
    receptionDays: "Har kuni: 09:00 - 18:00",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "off-5",
    name: "Mayor Otabek Shokirov",
    role: "Profilaktika katta inspektori",
    department: "Ichki ishlar idoralari",
    phone: "+998 98 111-22-33",
    receptionDays: "Har kuni 24/7 xizmatda",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "off-6",
    name: "Shahnoza Yusupova",
    role: "Ijtimoiy xodim",
    department: "Ijtimoiy himoya milliy agentligi",
    phone: "+998 90 777-88-99",
    receptionDays: "Dushanba - Juma: 09:00 - 17:00",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  }
];

export const EMERGENCY_CONTACTS = [
  { service: "Yong'in xavfsizligi", number: "101", icon: "Flame" },
  { service: "Ichki ishlar (Militsiya)", number: "102", icon: "Shield" },
  { service: "Tez tibbiy yordam", number: "103", icon: "Ambulance" },
  { service: "Gaz avariya xizmati", number: "104", icon: "AlertTriangle" },
  { service: "Mahalla ishonch telefoni", number: "1102", icon: "PhoneCall" },
  { service: "FVV qutqaruv xizmati", number: "1050", icon: "LifeBuoy" }
];
