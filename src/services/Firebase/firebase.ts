// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDhsb-MKTNob1hc1Uq041iUxpP-TqCqGMA",
    authDomain: "kick-ass-docs.firebaseapp.com",
    projectId: "kick-ass-docs",
    storageBucket: "kick-ass-docs.appspot.com",
    messagingSenderId: "589248096054",
    appId: "1:589248096054:web:3507beee05799628ce7597",
    measurementId: "G-L91TSTT6L8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
import { getAuth } from "firebase/auth";
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
