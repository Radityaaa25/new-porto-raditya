import type { Dictionary } from "./types";

export const id = {
  meta: {
    title: "Raditya Ananda Satria - Web Developer / Tech Enthusiast",
    description:
      "Web developer di Jakarta yang bekerja dengan Next.js dan React, berlatar multimedia dan tertarik pada AI.",
    ogAlt: "Raditya Ananda Satria, web developer dan tech enthusiast di Jakarta",
  },
  nav: [
    { key: "work", href: "/work", label: "Karya" },
    { key: "about", href: "/about", label: "Tentang" },
    { key: "contact", href: "/contact", label: "Kontak" },
  ],
  ui: {
    primary: "Utama",
    footerNav: "Footer",
    menu: "Menu",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    siteMenu: "Menu situs",
    language: "Bahasa",
    languageHint: "Ganti bahasa",
    themeDark: "Ganti ke tema terang",
    themeLight: "Ganti ke tema gelap",
    copyEmail: "Salin email",
    copied: "Tersalin",
    copyFailed: "Gagal menyalin",
    view: "Lihat",
    visitSite: "Buka situs",
    externalNote: "Terbuka di tab baru",
    all: "Semua",
    personal: "Personal",
    team: "Tim",
    close: "Tutup",
    backHome: "Kembali ke beranda",
    nextProject: "Proyek berikutnya",
    backToWork: "Kembali ke karya",
    role: "Peran",
    year: "Tahun",
    stack: "Stack",
    index: "Indeks",
    loading: "Memuat",
    flagship: "Flagship",
    skipToContent: "Lewati ke konten",
  },
  preloader: {
    statuses: [
      "Menyiapkan grid",
      "Mengukur margin",
      "Menata huruf",
      "Siap saat kamu siap.",
    ],
    sign: "Dibuat dengan teliti.",
  },
  hero: {
    kicker: "Web Developer / Tech Enthusiast - AI Enthusiast",
    lines: ["Antarmuka saya rancang.", "Lalu saya bangun."],
    accent: "bangun",
    intro:
      "Web developer di Jakarta. Bekerja dengan Next.js dan React, berlatar multimedia, dan tertarik pada AI.",
    selectedWork: "Karya pilihan",
    shippedLabel: "proyek rilis",
    scroll: "Gulir",
    socials: "Jejak lain",
    photoAlt: "Potret Raditya Ananda Satria dengan latar merah",
  },
  home: {
    statement: {
      label: "Pendekatan",
      title: "Cara saya bekerja",
      body:
        "Saya peduli pada rasa antarmuka sebelum dijelaskan. Tipografi, ritme, dan gerak membawa pesan; kode di baliknya menjaga semuanya cepat, aksesibel, dan mudah dirawat.",
    },
    work: {
      label: "Karya pilihan",
      title: "Proyek yang sudah saya bangun.",
      intro:
        "Enam situs yang sudah rilis: alat personal, kerja tim, dan satu entri hackathon. Tangkapan layar asli, tautannya hidup.",
      viewAll: "Lihat semua karya",
      featured: "Unggulan",
      index: "Indeks lengkap",
      previewHint: "Arahkan kursor ke baris untuk pratinjau",
    },
    about: {
      label: "Tentang",
      title: "Berlatar desain, berlatih jadi developer.",
      body: [
        "Saya Raditya, tinggal di Jakarta. Saya membangun antarmuka web dengan Next.js dan React, dan mendesainnya juga. Saya mulai dari multimedia: desain grafis, editing video, dan produksi konten.",
        "Sekarang saya kuliah Sistem Informasi di Universitas Bina Sarana Informatika sambil merilis proyek personal dan tim, dari alat belajar berbasis AI sampai tiket acara dan aplikasi bisnis.",
      ],
      cta: "Kenalan lebih jauh",
      factsLabel: "Ringkasnya",
      facts: [
        { label: "Basis", value: "Jakarta, Indonesia / GMT+7" },
        { label: "Pendidikan", value: "Sistem Informasi, UBSI (2025 - sekarang)" },
        { label: "Bahasa", value: "Indonesia aktif, Inggris dan Korea pasif" },
        { label: "Fokus", value: "Next.js / React dan multimedia" },
      ],
    },
    process: {
      label: "Proses",
      title: "Cara saya membangun.",
      intro: "Empat langkah yang saya pakai di tiap proyek.",
      steps: [
        { title: "Desain", body: "Petakan konten dan urutan layar dulu, lalu tentukan tipografi, grid, dan gerak di Figma dan browser." },
        { title: "Bangun", body: "Komponen Next.js dan React, gaya berbasis token, dan konten bertipe di satu tempat. Screenshot asli sejak awal." },
        { title: "Rilis", body: "Git, Vercel, domain hidup, lalu cek mobile, keyboard, reduced motion, dan koneksi lambat." },
        { title: "Iterasi", body: "Lihat apa yang rusak, rapikan copy, dan jaga sistem tetap mudah diubah alih-alih menulis ulang dari nol." },
      ],
    },
    aboutTeaser: {
      label: "Tentang",
      title: "Dari multimedia ke kode.",
      body: "Desain grafis, video, dan produksi konten mengajari saya ritme dan detail. Next.js dan React membuatnya interaktif.",
      cta: "Kenalan lebih jauh",
      currentlyLabel: "Sekarang",
      currently: [
        "Kuliah Sistem Informasi di UBSI.",
        "Merilis proyek personal dan tim dengan Next.js.",
        "Memimpin tim Scaffdev sebagai project manager dan full-stack developer.",
        "Mengeksplorasi integrasi AI di produk web.",
      ],
    },
    capabilities: {
      label: "Kemampuan",
      title: "Cara saya bekerja: desain, bangun, rilis.",
      intro: "Tiga hal yang saya kerjakan di tiap proyek, sesuai urutannya.",
      items: [
        {
          title: "Desain",
          body: "Tata letak antarmuka, tipografi, dan gerak, diputuskan di Figma dan di browser.",
        },
        {
          title: "Bangun",
          body: "Front end Next.js dan React, komponen demi komponen, dengan kode yang bisa saya rawat.",
        },
        {
          title: "Rilis",
          body: "Git, Vercel, domain nyata. Setiap proyek di situs ini hidup dan bertaut.",
        },
      ],
    },
    marquee: ["Web developer", "Desainer antarmuka", "Latar multimedia", "Next.js", "React", "Laravel", "AI"],
    closing: {
      label: "Berikutnya",
      title: "Punya proyek yang ingin dibangun?",
      body: "Email cara tercepat. Jakarta, GMT+7.",
      cta: "Mulai percakapan",
    },
    toolbox: {
      label: "Perangkat",
      title: "Alat yang saya pakai.",
      intro:
        "Dikelompokkan sesuai cara saya memakainya. Yang familiar dulu, yang masih dasar saya akui.",
    },
    experience: {
      label: "Pengalaman",
      title: "Tempat saya belajar.",
      intro: "Kerja produksi, organisasi mahasiswa, dan fondasi multimedia.",
    },
    highlights: {
      label: "Rekap",
      title: "Angka yang bisa dicek.",
      intro: "Hitungan dari situs ini dan CV saya.",
      counters: [
        { value: 6, label: "Proyek rilis" },
        { value: 3, label: "Entri pengalaman" },
        { value: 2, label: "Entri pendidikan" },
        { value: 3, label: "Bahasa" },
      ],
    },
    contact: {
      label: "Kontak",
      title: "Mari bikin sesuatu.",
      body: "Email adalah jalur tercepat. Saya baca semuanya dan balas saat sempat.",
      cta: "Mulai percakapan",
      emailLabel: "Email",
      socialsLabel: "Temukan saya",
    },
  },
  about: {
    meta: {
      title: "Tentang",
      description: "Latar belakang, pendidikan, keahlian, dan pengalaman Raditya Ananda Satria.",
    },
    label: "Tentang",
    title: "Berlatar desain, berlatih jadi developer.",
    intro:
      "Saya Raditya Ananda Satria, web developer di Jakarta. Saya membangun antarmuka web dengan Next.js dan React, dan mendesainnya juga. Latar multimedia di desain grafis, video, dan produksi konten masih memengaruhi cara saya melihat layout dan detail.",
    ctaContact: "Hubungi saya",
    ctaWork: "Lihat karya",
    profileLabel: "Profil",
    profile: [
      "Saya Raditya Ananda Satria, tinggal di Jakarta. Saya membangun antarmuka web dengan Next.js dan React, dan mendesainnya juga. Saya mulai dari multimedia: desain grafis, editing video, dan produksi konten. Sampai sekarang itu masih memengaruhi cara saya melihat layout, ritme, dan detail.",
      "Sekarang saya kuliah Sistem Informasi di Universitas Bina Sarana Informatika sambil terus merilis proyek personal dan tim, dari alat belajar berbasis AI sampai tiket acara dan aplikasi bisnis.",
    ],
    experienceLabel: "Pengalaman",
    educationLabel: "Pendidikan",
    skillsLabel: "Keahlian",
    languagesLabel: "Bahasa",
    photoAlt: "Potret Raditya Ananda Satria dengan latar merah tua",
    photoLabel: "RA / 001",
    photoCaption: "Jakarta / 6.2088 S, 106.8456 E",
    factsLabel: "Sekilas",
    facts: [
      { label: "Lokasi", value: "Jakarta, Indonesia" },
      { label: "Pendidikan", value: "Sistem Informasi, UBSI (2025 - sekarang)" },
      { label: "Bahasa", value: "Indonesia aktif, Inggris dan Korea pasif" },
      { label: "Fokus", value: "Next.js / React dan multimedia" },
    ],
    cvNote: "CV lengkap tersedia atas permintaan.",
  },
  work: {
    meta: {
      title: "Karya",
      description: "Proyek pilihan Raditya Ananda Satria.",
    },
    label: "Indeks / Karya",
    title: "Proyek pilihan",
    intro:
      "Proyek personal dan tim yang sudah rilis di web. Setiap entri punya halaman detail dan tautan ke situs aslinya.",
    filterLabel: "Saring proyek",
    featuredLabel: "Proyek unggulan",
    detail: {
      overview: "Ringkasan",
      brief: "Tentang proyek",
      problem: "Masalah",
      approach: "Pendekatan",
      stackLabel: "Stack",
      roleLabel: "Peran",
      yearLabel: "Tahun",
      liveLabel: "Situs live",
      screensLabel: "Tangkapan layar",
      nextLabel: "Proyek berikutnya",
    },
  },
  contact: {
    meta: {
      title: "Kontak",
      description: "Hubungi Raditya Ananda Satria lewat email.",
    },
    label: "Kontak",
    title: "Mari bikin sesuatu.",
    intro:
      "Ceritakan yang sedang kamu bangun. Email paling cepat; formulir akan membuka aplikasi email kalau kanal pengiriman belum tersambung.",
    emailLabel: "Email",
    write: "Tulis langsung",
    baseLabel: "Basis",
    baseTitle: "Jakarta, Indonesia",
    baseBody: "Tinggal di Jakarta, GMT+7. Email cara tercepat untuk menghubungi saya.",
    form: {
      label: "Pesan",
      title: "Kirim pesan",
      name: "Nama",
      email: "Email",
      message: "Pesan",
      namePlaceholder: "Nama lengkap",
      emailPlaceholder: "kamu@contoh.com",
      messagePlaceholder: "Apa yang sedang kamu bangun?",
      send: "Kirim pesan",
      sending: "Mengirim",
      successTitle: "Pesan siap.",
      successBody:
        "Aplikasi email kamu akan terbuka dengan isi pesan. Kalau tidak, salin alamat email di atas.",
      error: "Ada yang gagal. Kirim email langsung saja.",
      fallback: "Formulir ini membuka aplikasi email karena layanan pengiriman belum tersambung.",
      required: "Wajib diisi.",
      invalidEmail: "Masukkan alamat email yang valid.",
    },
  },
  footer: {
    backToTop: "Kembali ke atas",
    note: "Dibuat di Jakarta",
    rights: "Seluruh hak dilindungi",
    socials: "Tautan sosial",
  },
  notFound: {
    label: "404",
    title: "Halaman ini keluar jalur.",
    body: "Tautannya mungkin sudah lama, atau halamannya sudah pindah. Indeks karya bisa jadi titik mulai.",
    back: "Kembali ke beranda",
    work: "Lihat karya",
  },
  command: {
    label: "Command palette",
    placeholder: "Lompat ke halaman, ganti tema, salin email",
    empty: "Tidak ada hasil.",
    pages: "Halaman",
    actions: "Aksi",
    socials: "Sosial",
    theme: "Ganti tema",
    language: "Ganti bahasa",
    copyEmail: "Salin alamat email",
    copied: "Email tersalin",
    hint: "Cmd/Ctrl + K",
  },
  projectCopy: {
    clarise: {
      title: "Clarise",
      category: "Produk / Learning",
      summary:
        "Platform belajar adaptif berbasis AI dengan kursus interaktif, tutor AI, gamifikasi, dan AI course builder.",
      description: [
        "Clarise adalah platform belajar adaptif berbasis AI. Ada kursus interaktif, tutor AI, gamifikasi lewat XP, badge, dan streak, plus AI Course Builder.",
        "Dibangun dengan Next.js di domain sendiri. Antarmukanya harus tetap jelas meski banyak status belajar di dalamnya.",
      ],
      imageAlt: "Halaman utama Clarise dengan antarmuka gelap dan kartu kursus",
    },
    "safetrack-depin": {
      title: "SafeTrack Depin",
      category: "Hackathon / DePIN",
      summary:
        "Sistem logistik IoT dan AI untuk memantau keamanan pengiriman secara real time, dibuat untuk hackathon 0G jalur DePIN.",
      description: [
        "SafeTrack adalah sistem logistik IoT dan AI untuk memantau keamanan pengiriman secara real time, dibuat untuk hackathon 0G jalur DePIN.",
        "Proyek ini menggabungkan pelacakan langsung dengan antarmuka yang menampilkan status pengiriman dan kejadian keamanan saat terjadi.",
      ],
      imageAlt: "Halaman utama SafeTrack Depin dengan pesan shipment clarity",
    },
    vascode: {
      title: "VasCode Creative",
      category: "Agensi / Web",
      summary:
        "Company profile untuk agensi kreatif dan production house yang menangani web, video, fotografi, dan desain grafis.",
      description: [
        "VasCode Creative adalah company profile untuk agensi kreatif dan production house. Cakupannya web development, video, fotografi, dan desain grafis.",
        "Situsnya perlu menampilkan beberapa disiplin produksi tanpa kehilangan satu identitas yang jelas.",
      ],
      imageAlt: "Halaman company profile VasCode Creative",
    },
    "pentas-seni": {
      title: "Pentas Seni TK Aisyiyah 21",
      category: "Acara / Tiket",
      summary:
        "Aplikasi pendaftaran dan e-ticket digital untuk acara pentas seni sekolah, dipakai peserta sungguhan.",
      description: [
        "Aplikasi pendaftaran dan e-ticket digital untuk acara pentas seni TK Aisyiyah 21.",
        "Dipakai peserta sungguhan, jadi alurnya harus nyaman di ponsel, saat antre, tanpa bikin bingung.",
      ],
      imageAlt: "Halaman pendaftaran dan e-ticket Pentas Seni",
    },
    "nana-bites": {
      title: "Nana Bites",
      category: "Kuliner / Pre-order",
      summary:
        "Landing page dan sistem pre-order untuk bisnis camilan, terhubung dengan pemesanan lewat WhatsApp.",
      description: [
        "Nana Bites adalah landing page dan sistem pre-order untuk bisnis camilan.",
        "Pesanan diarahkan ke WhatsApp, mengikuti cara bisnisnya memang melayani pelanggan.",
      ],
      imageAlt: "Landing page Nana Bites dengan bagian pre-order",
    },
    scaffdev: {
      title: "Scaffdev",
      category: "Tooling / Dev",
      summary:
        "Generator scaffolding untuk developer Indonesia: starter Next.js dan Laravel siap jalan dengan UI jadi, struktur folder best-practice, dan integrasi lokal pilihan.",
      description: [
        "Scaffdev membuat project baru dari satu command npx: UI jadi, struktur folder best-practice, file .env.example, dan panduan SETUP.md. Saat ini tersedia template Next.js dan Laravel.",
        "Situsnya menampilkan enam template siap generate, Builder untuk kombinasi integrasi custom, dan integrasi pilihan: Supabase, Xendit, Cloudinary, serta Resend. Sumbernya tersedia dengan lisensi Shield.",
      ],
      imageAlt: "Halaman utama Scaffdev, generator starter kit Next.js dan Laravel",
    },
  },
  experience: [
    {
      role: "Staf Desain Grafis",
      organization: "Divisi Kominfo, Himpunan Mahasiswa Sistem Informasi UBSI",
      period: "2025 - sekarang",
      summary: "Poster, banner, feed Instagram, dan flyer.",
    },
    {
      role: "Content Design and Editor",
      organization: "PKL di KFT",
      period: "Apr - Sep 2023",
      summary:
        "Visual media sosial, editing foto dan video di lingkungan produksi profesional.",
    },
    {
      role: "Videografer dan Editor",
      organization: "Ujian kompetensi SMK Pusaka 1 Jakarta",
      period: "2024",
      summary: "Produksi video penuh untuk ujian kompetensi.",
    },
  ],
  education: [
    {
      role: "Sistem Informasi",
      organization: "Universitas Bina Sarana Informatika",
      period: "2025 - sekarang",
      summary: "Sedang menempuh.",
    },
    {
      role: "Multimedia",
      organization: "SMK Pusaka 1 Jakarta",
      period: "2021 - 2024",
      summary: "Fondasi vokasional multimedia.",
    },
  ],
  skillGroups: [
    {
      label: "Web",
      items: [
        { name: "React", icon: "react", level: "Terbiasa" },
        { name: "Next.js", icon: "next", level: "Terbiasa" },
        { name: "HTML", icon: "html", level: "Terbiasa" },
        { name: "CSS", icon: "css", level: "Terbiasa" },
        { name: "JavaScript", icon: "js", level: "Terbiasa" },
        { name: "Python", icon: "python", level: "Dasar" },
        { name: "PHP", icon: "php", level: "Dasar" },
        { name: "Laravel", icon: "laravel", level: "Dasar" },
        { name: "MySQL", icon: "mysql", level: "Dasar" },
      ],
    },
    {
      label: "Desain",
      items: [
        { name: "Figma", icon: "figma", level: "Terbiasa" },
        { name: "Canva", icon: "canva", level: "Terbiasa" },
        { name: "Tailwind CSS", icon: "tailwind", level: "Terbiasa" },
      ],
    },
    {
      label: "Konten",
      items: [
        { name: "CapCut", icon: "capcut", level: "Terbiasa" },
        { name: "Video", icon: "film", level: "Terbiasa" },
        { name: "Fotografi", icon: "camera", level: "Terbiasa" },
      ],
    },
    {
      label: "Rilis",
      items: [
        { name: "Git", icon: "git", level: "Terbiasa" },
        { name: "GitHub", icon: "github", level: "Terbiasa" },
        { name: "Vercel", icon: "vercel", level: "Terbiasa" },
      ],
    },
  ],
  languages: [
    { label: "Indonesia", level: "Aktif" },
    { label: "Inggris", level: "Pasif" },
    { label: "Korea", level: "Pasif" },
  ],
  educationFact: "Sistem Informasi, UBSI (2025 - sekarang)",
  focusFact: "React, Next.js, desain antarmuka, motion",
} satisfies Dictionary;