# Mening Mahallam — O‘zbekiston Raqamli Mahalla Platformasi

**Mening Mahallam** — O‘zbekiston mahallalarida aholi farovonligini oshirish, mavjud muammolarni shaffof va tezkor hal etish, jamoatchilik nazoratini kuchaytirish hamda ijtimoiy birdamlikni mustahkamlashga qaratilgan zamonaviy, to‘liq ishlaydigan raqamli platforma.

---

## 🌟 Asosiy imkoniyatlar

1. **Bosh sahifa (Home):**
   - Mahalla gerbi/logotipi va nomi (*Navro'z MFY, Yunusobod tumani*)
   - Ilhomlantiruvchi hero banner va tezkor murojaat tekshirish vidjeti
   - Jonli statistika hisoblagichlari (Murojaatlar soni, hal etilganlar, faol loyihalar, aholi soni)
   - Eng dolzarb va eng ko'p ovoz to'plagan muammolar saralangan bloki
   - Erishilgan yutuqlar interaktiv Before/After taqqoslash slayderi
   - Saxovat va ijtimoiy yordam tashabbuslari
   - **"Mahalla yettiligi"** (Rais, Hokim yordamchisi, Xotin-qizlar faoli, Yoshlar yetakchisi, Profilaktika inspektori, Ijtimoiy xodim) qabul kunlari va kontaktlari
   - Tezkor qutqaruv xizmatlari va ishonch telefonlari (101, 102, 103, 104, 1102, 1050)

2. **Mahalla muammolari (Problems):**
   - Muammolarni kategoriyalar (*Yo'llar, Ko'cha chiroqlari, Suv va oqova, Chiqindilar, Obodonlashtirish, Gaz/Elektr, Boshqa*) bo'yicha filtrlash
   - Holat (*Yangi, Ko'rib chiqilmoqda, Jarayonda, Hal qilindi*) bo'yicha saralash
   - Jonli qidiruv (muammo nomi, tavsif yoki aniq manzil bo'yicha)
   - Fuqarolar ovoz berishi (bir marta bosish bilan ovoz qo'shish/bekor qilish)
   - "Muammo yuborish" modali (mijoz tomonida validatsiya, fayl yuklash yoki namuna tanlash)
   - Muammo tafsilotlari modali va mas'ul tashkilot rasmiy javobi

3. **Mahalla yutuqlari (Achievements):**
   - Amalga oshirilgan obodonlashtirish, sport maydonchalari, quyosh panellari loyihalari
   - **Interaktiv Before & After suriluvchi slayder** (sichqoncha yoki barmoq bilan surib taqqoslash)
   - Natija va ijtimoiy foyda ko'rsatkichlari

4. **Ijtimoiy yordam (Saxovat & Ko'mak):**
   - Kam ta'minlangan, yolg'iz keksalar va ehtiyojmand oilalarga maqsadli yordam tashabbuslari
   - Ehtiyoj miqdori va to'plangan yordam vizual progress bari
   - **Shaxsiy daxlsizlik kafolati:** Oilalarning ismi, telefon raqami va aniq uyi ochiq ko'rsatilmaydi
   - "Yordam berish" modali (buyum/mahsulot, ko'ngilli mehnat)
   - "Ko'ngilli (Volontyor) sifatida ro'yxatdan o'tish" shakli
   - To'lov tizimlari bo'yicha shaffof eslatma

5. **Taklif va shikoyatlar (Proposals & Tracking):**
   - Taklif yoki shikoyat yo'llash shakli
   - Unikal kuzatuv kodi (masalan, `MH-2026-1042`) avtomatik generatsiyasi
   - **Kuzatuv (Tracking) tizimi:** Kodni kiritib 5 bosqichli vaqt shkalasini (*Yuborildi -> Qabul qilindi -> O'rganilmoqda -> Ijroga qaratildi -> Natija*) kuzatish
   - Ochiq takliflar umumiy reyestri

6. **Yangiliklar va tadbirlar (News):**
   - Hasharlar, sport musobaqalari, IT to'garaklari va madaniy tadbirlar
   - Qidiruv va kategoriyalar bo'yicha saralash
   - Yangilikni to'liq o'qish modali va ko'rishlar soni hisoblagichi

7. **Admin panel (Boshqaruv):**
   - Yangi muammolarni ko'rish, holatini o'zgartirish (*Yangi -> Jarayonda -> Hal qilindi*)
   - Har bir muammoga mutasaddi rasmiy javobini yozish
   - Yangilik va yutuqlar qo'shish/o'chirish
   - Murojaatlarni navbatdagi ijro bosqichiga o'tkazish
   - Barcha ma'lumotlarni dastlabki holatga qaytarish (*Reset*) tugmasi

---

## 📁 Loyiha papkalari tuzilishi

```text
mening-mahallam/
├── index.html                   # Asosiy HTML, Plus Jakarta Sans & Outfit shrifflari
├── package.json                 # Bog'liqliklar va skriptlar
├── vite.config.js               # Vite konfiguratsiyasi
├── src/
│   ├── main.jsx                 # Dasturning boshlanish nuqtasi va Router
│   ├── App.jsx                  # Asosiy layout, marshrutlar, modallar va Toast
│   ├── index.css                # Dizayn tizimi: CSS o'zgaruvchilari, ranglar, animatsiyalar
│   ├── data/
│   │   └── mockData.js          # Mahalla ma'lumotlari, mas'ullar, xizmatlar, namunaviy kontent
│   ├── services/
│   │   └── storageService.js    # Repository qatlami (localStorage + Promise API, backendga tayyor)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx       # Yuqori navigatsiya, mobil menyu va tezkor tugmalar
│   │   │   ├── Footer.jsx       # Mahalla kontaktlari, favqulodda raqamlar (101, 102, 103...)
│   │   │   ├── StatCard.jsx     # Statistik ko'rsatkichlar kartasi
│   │   │   ├── StatusBadge.jsx  # Holat belgilari (Yangi, Jarayonda, Hal qilindi...)
│   │   │   ├── Modal.jsx        # Qayta ishlatiluvchi universal modal komponenti
│   │   │   ├── Toast.jsx        # Bildirishnoma (alert) tizimi
│   │   │   └── BeforeAfterSlider.jsx # Oldin va keyin holatini taqqoslovchi interaktiv slayder
│   │   ├── problems/
│   │   │   ├── ProblemCard.jsx  # Muammo kartasi, ovoz berish va tafsilotlar
│   │   │   ├── ProblemDetailModal.jsx # Muammo to'liq ma'lumoti va mas'ul javobi
│   │   │   └── NewProblemModal.jsx   # Muammo yuborish shakli va validatsiya
│   │   ├── social/
│   │   │   ├── SocialCard.jsx   # Ijtimoiy yordam tashabbusi kartasi
│   │   │   ├── DonateModal.jsx  # Yordam qo'lini cho'zish modali va ogohlantirishlar
│   │   │   └── VolunteerModal.jsx # Ko'ngillilar (volontyorlar) anketasi
│   │   ├── proposals/
│   │   │   ├── ProposalForm.jsx # Taklif va shikoyat yuborish shakli
│   │   │   └── TrackRequest.jsx # Murojaat kodini tekshirish va vaqt shkalasi
│   │   └── achievements/
│   │       └── AchievementCard.jsx # Yutuqlar kartasi va ijtimoiy samara
│   └── pages/
│       ├── HomePage.jsx         # Bosh sahifa
│       ├── ProblemsPage.jsx     # Muammolar sahifasi va filtrlash
│       ├── AchievementsPage.jsx # Yutuqlar sahifasi
│       ├── SocialSupportPage.jsx# Ijtimoiy yordam sahifasi
│       ├── ProposalsPage.jsx    # Taklif, shikoyat va kuzatuv sahifasi
│       ├── NewsPage.jsx         # Yangiliklar va tadbirlar
│       └── AdminPage.jsx        # Mas'ullar boshqaruv paneli
```

---

## 🛠 Texnologiyalar

- **React 18** (Functional Components, Hooks: `useState`, `useEffect`, `useMemo`, `useRef`, `useCallback`)
- **React Router DOM 6** (SPA navigatsiyasi, URL parametrlari, avtomatik scroll)
- **Vite 5** (Tezkor modullar yig'uvchisi)
- **Vanilla CSS3 Design System** (CSS Custom Properties, Glassmorphism, Responsive Grid, Smooth Animations)
- **Lucide React** (Zamonaviy vektorli ikonalar)
- **Canvas Confetti** (Murojaat muvaffaqiyatli qabul qilinganda bayramona animatsiya)
- **LocalStorage Repository Pattern** (Kelajakda REST API yoki GraphQL bilan bir qatorda almashtirishga tayyor Promise qatlami)

---

## 🚀 Ishga tushirish yo'riqnomasi

### 1. Talablar
Kompyuteringizda **Node.js** (v18 yoki undan yuqori) o'rnatilgan bo'lishi kerak.

### 2. O'rnatish
Loyiha papkasida terminalni oching va quyidagi buyruqni bering:

```bash
npm install
```

### 3. Dasturni ishlab chiquvchi rejimida ishga tushirish (Development server)
```bash
npm run dev
```
Terminalda ko'rsatilgan manzilga kiring (odatda: `http://localhost:3000` yoki `http://localhost:5173`).

### 4. Ishchi bundle (Production build) yaratish
```bash
npm run build
```
Natijada `dist/` papkasida yuqori optimallashtirilgan statik fayllar hosil bo'ladi.

---

## 🔌 Kelajakda Backend ulash arxitekturasi (API tayyorgarligi)

Loyiha arxitekturasi `src/services/storageService.js` orqali to'liq qatlamlarga ajratilgan. Haqiqiy backend (Node.js/Express, Python/Django, Go yoki Java Spring) ulanganda faqatgina ushbu xizmat funksiyalaridagi `localStorage` chaqiruvlari `axios` yoki `fetch` bilan almashtiriladi:

| Xizmat funksiyasi | Mo'ljallangan REST API Endpoiniti | HTTP Metodi | Vazifasi |
| :--- | :--- | :--- | :--- |
| `storageService.getProblems()` | `/api/v1/problems` | `GET` | Muammolar ro'yxati (filtrlash bilan) |
| `storageService.createProblem()` | `/api/v1/problems` | `POST` | Yangi muammo qo'shish (Multi-part rasm bilan) |
| `storageService.toggleVoteProblem()` | `/api/v1/problems/:id/vote` | `POST` | Muammoga ovoz berish |
| `storageService.updateProblemStatus()` | `/api/v1/problems/:id/status`| `PATCH` | Mas'ul tomonidan holatni va javobni yangilash |
| `storageService.createProposal()` | `/api/v1/proposals` | `POST` | Taklif/shikoyat yuborish va tracking kod olish |
| `storageService.getProposalByCode()` | `/api/v1/proposals/:code` | `GET` | Kod orqali murojaat bosqichlarini tekshirish |
| `storageService.getSocialInitiatives()`| `/api/v1/social-initiatives` | `GET` | Tasdiqlangan ijtimoiy tashabbuslar |
| `storageService.supportInitiative()` | `/api/v1/social-initiatives/:id/pledge` | `POST` | Yordam arizasini topshirish |
| `storageService.getNews()` | `/api/v1/news` | `GET` | Yangiliklar va tadbirlar |
| `storageService.getStats()` | `/api/v1/stats/overview` | `GET` | Bosh sahifa jonli statistikasi |

### Xavfsizlik va Autentifikatsiya (Keyingi bosqich):
- **Admin va Mahalla mas'ullari:** Davlatning yagona identifikatsiya tizimi (OneID) yoki E-IMZO orqali kirish.
- **Rollar (RBAC):** `ROLE_CITIZEN`, `ROLE_MAHALLA_CHAIRMAN`, `ROLE_INSPECTOR`, `ROLE_SOCIAL_WORKER`, `ROLE_ADMIN`.
- **To'lov tizimlari:** Homiylik mablag'larini yig'ish Click, Payme yoki UzumBank litsenziyalangan billing shlyuzlari orqali rasmiy jamg'arma hisob raqamiga yo'naltiriladi.
