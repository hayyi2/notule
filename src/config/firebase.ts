// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnomggsa6YSS5vu71nxeMKErJ2yK1eNrY",
    authDomain: "notule.firebaseapp.com",
    projectId: "notule",
    storageBucket: "notule.appspot.com",
    messagingSenderId: "440261667741",
    appId: "1:440261667741:web:57b907250dea81a78c9d74",
    measurementId: "G-M9GEYMFTL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);