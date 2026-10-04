export const WEDDING_DATA = {
  groom: {
    name: "Zaid Ansari",
    fullName: "Syed Zaid Ansari",
    parents: "Son of Haji Afsar Ali Ansari",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  bride: {
    name: "Zainab Ansari",
    fullName: "Syeda Zainab Ansari",
    parents: "Daughter of Late Haji Saeed Ansari",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  bismillah: {
    arabic: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful",
    verse: "“And We created you in pairs”",
    surah: "Surah An-Naba [78:8]"
  },
  nikahDate: "2026-11-20T17:00:00+05:30", // Live Countdown target ISO String
  displayDates: {
    nikah: "Saturday, 14th November 2026 ( 3rd Jamadil Aakhir 1448 Hijri )",
    walima: "Saturday, 21st November 2026"
  },
  events: [
    {
      id: "nikah",
      title: "The Holy Nikah Ceremony",
      badge: "Sacred Covenant",
      date: "Friday, November 20, 2026",
      time: "05:00 PM - 08:00 PM IST",
      venueName: "The Grand Royal Palace & Convention",
      address: "Banjara Hills Road No. 12, Kotwali Dehat, Distt. Bijnor, Uttar Pardesh 500034",
      description: "Join us as we unite under the holy solemnization of Nikah followed by dinner.",
      mapUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8845244588725!2d78.4419918!3d17.4173167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97394c8e715b%3A0xd3b77ab6e8fb2636!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      icon: "HeartHandshake",
      dressCode: "Traditional / Royal Attire",
      program: [
        { time: "05:00 PM", detail: "Guest Arrival & Welcome Refreshments" },
        { time: "05:45 PM", detail: "Solemnization of Nikah" },
        { time: "06:30 PM", detail: "Dua & Blessings" },
        { time: "07:00 PM", detail: "Royal Feast (Dinner)" }
      ]
    },
    {
      id: "walima",
      title: "The Grand Walima Reception",
      badge: "Sunnah Celebration",
      date: "Saturday, November 21, 2026",
      time: "07:30 PM - 11:00 PM IST",
      venueName: "Imperial Palace Gardens",
      address: "Jubilee Hills Check Post Road, Kotwali Dehat, Distt. Bijnor, Uttar Pardesh 500033",
      description: "Celebrate the joyous occasion of Walima with dinner and blessings.",
      mapUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.529813291807!2d78.4069874!3d17.4325492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11be71f92e8587c4!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      icon: "Sparkles",
      dressCode: "Formal Black Tie / Ethnic Elegance",
      program: [
        { time: "07:30 PM", detail: "Reception & Welcoming Guests" },
        { time: "08:30 PM", detail: "Grand Entry of Couple" },
        { time: "09:00 PM", detail: "Dinner & Celebration" },
        { time: "10:30 PM", detail: "Farewell & Prayers" }
      ]
    }
  ],
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      caption: "Eternal Moments",
      subtext: "Beginning of forever"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      caption: "Royal Elegance",
      subtext: "Traditional heritage vibes"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      caption: "Sacred Vows",
      subtext: "Blessed union under Allah's mercy"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80",
      caption: "Golden Memories",
      subtext: "Joyful smiles and prayers"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      caption: "Warm Blessings",
      subtext: "Surrounded by loved ones"
    }
  ],
  audio: {
    // Royalty-free soothing instrumental ambient track
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=arabic-background-music-114407.mp3",
    title: "Soothing Oriental Oud Instrument"
  },
  hostNote: {
    arabic: "جزاكم الله خيراً",
    translation: "May Allah reward you with goodness",
    text: "Your presence and prayers are the greatest gift to us as we begin this new chapter in our lives."
  }
};
