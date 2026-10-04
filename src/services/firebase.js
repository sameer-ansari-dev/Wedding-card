import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';

// Environment variables or fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID"
);

let db = null;

if (isFirebaseConfigured) {
  try {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    console.log("Firebase Firestore initialized successfully.");
  } catch (err) {
    console.warn("Firebase initialization skipped, fallback mode active:", err);
  }
}

// Initial mock wishes for beautiful presentation out-of-the-box
const DEFAULT_WISHES = [
  {
    id: "wish-1",
    name: "Uncle Rashid & Family",
    attendance: "attending",
    guests: "4 Guests",
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair! Wishing Zaid & Zainab a blessed life together.",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: "wish-2",
    name: "Dr. Bilal & Aisha",
    attendance: "attending",
    guests: "2 Guests",
    message: "May Allah SWT shower your marriage with eternal love, harmony, and peace. Warmest congratulations!",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "wish-3",
    name: "Zaid & Humaira",
    attendance: "attending",
    guests: "2 Guests",
    message: "So thrilled for both of you! Looking forward to celebrating the Nikah and Walima inshaAllah!",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  }
];

export async function addGuestWish(wishData) {
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "wishes"), {
        ...wishData,
        createdAt: serverTimestamp()
      });
      return { id: docRef.id, ...wishData, createdAt: new Date().toISOString() };
    } catch (err) {
      console.error("Firestore write failed, saving locally:", err);
    }
  }

  // Fallback to localStorage
  const existing = getLocalWishes();
  const newWish = {
    id: "local-" + Date.now(),
    ...wishData,
    createdAt: new Date().toISOString()
  };
  const updated = [newWish, ...existing];
  localStorage.setItem("royal_wedding_wishes", JSON.stringify(updated));
  return newWish;
}

export async function fetchGuestWishes() {
  if (db) {
    try {
      const q = query(
        collection(db, "wishes"), 
        orderBy("createdAt", "desc"), 
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const wishes = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        wishes.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
        });
      });
      if (wishes.length > 0) return wishes;
    } catch (err) {
      console.warn("Firestore fetch failed, returning local wishes:", err);
    }
  }

  return getLocalWishes();
}

function getLocalWishes() {
  try {
    const saved = localStorage.getItem("royal_wedding_wishes");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_WISHES;
}
