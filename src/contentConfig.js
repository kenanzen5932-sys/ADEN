/**
 * Romantik Aşk Sitesi - Aden & Never Özel Yapılandırması
 */

export const siteConfig = {
  // 1. Hero / Üst Bölüm
  hero: {
    badge: "Aden İçin ❤️",
    title: "Hayatımın en güzel tesadüfü",
  },

  // 2. Fotoğraf Galerisi (public/images/ klasöründeki kullanıcı fotoğrafları)
  photos: [
    {
      id: 1,
      src: "/images/12222.jpeg",
      alt: "Aden & Never",
      caption: "Birlikte her an bir ömre bedel...",
    },
    {
      id: 2,
      src: "/images/WhatsApp Image 2026-10-07 at 19.03.03.jpeg",
      alt: "Aden",
      caption: "Gülüşünle dünyamı aydınlatan kadın...",
    },
    {
      id: 3,
      src: "/images/FFFF.jpeg",
      alt: "En güzel anlarımız",
      caption: "Kalbimin en güzel köşesisin...",
    },
    {
      id: 4,
      src: "/images/FFFFF.jpeg",
      alt: "Sonsuza kadar",
      caption: "Her anında huzur bulduğum sevgilim...",
    },
  ],

  // 3. Fotoğrafların Altındaki Romantik Mesaj
  middleMessage: {
    title: "İyi ki varsın ❤️",
    description: "Bu siteyi sadece sana söylemek istediğim şeyleri anlatabilmek için hazırladım.",
  },

  // 4. Mektup Zarfı Bölümü
  envelope: {
    title: "💌 Sana Bir Mektubum Var",
    subtitle: "Okumak için dokun",
    buttonText: "Notu Oku 💕",
  },

  // 5. Aşk Mektubu İçeriği
  loveLetter: {
    title: "Sevgilime ❤️",
    paragraphs: [
      "Hayatıma girdiğin günden beri bazı şeyler eskisi gibi değil.",
      "Çünkü artık her güzel şeyin içinde seni görüyorum.",
      "Gülüşünü düşündüğümde yüzümde istemsiz bir tebessüm oluşuyor. Sesini duyduğumda günüm güzelleşiyor.",
      "Bazen sana ne kadar değer verdiğimi anlatacak kelimeleri bulamıyorum. Ama şunu bilmeni istiyorum:",
      "Seni gerçekten çok seviyorum.",
      "İyi ki hayatımdasın.\nİyi ki varsın.\nVe iyi ki benimlesin. ❤️",
    ],
    closing: {
      line1: "Bu sadece bir web sitesi değil...",
      line2: "Kalbimden sana bıraktığım küçük bir hatıra. ❤️",
      infinityText: "∞ Seni Çok Seviyorum ∞",
    },
  },

  // 6. Arka Plan Müziği
  music: {
    src: "/music/our-song.mp3",
    label: "Bizim Şarkımız",
  },

  // 7. Footer
  footer: {
    title: "Aden ve Never ❤️",
    symbol: "∞",
  },
};
