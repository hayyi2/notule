import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCnomggsa6YSS5vu71nxeMKErJ2yK1eNrY",
    authDomain: "notule.firebaseapp.com",
    projectId: "notule",
    storageBucket: "notule.appspot.com",
    messagingSenderId: "440261667741",
    appId: "1:440261667741:web:57b907250dea81a78c9d74",
    measurementId: "G-M9GEYMFTL0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

// if (process.env.NODE_ENV === 'development') {
//     console.log("use local emulator")
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     connectAuthEmulator(auth, "http://127.0.0.1:9099")
// }