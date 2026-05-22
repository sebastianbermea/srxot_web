import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBq6-iWsJeh6InHXgMDkPdxh68YlURny5E",
    authDomain: "srxot-web.firebaseapp.com",
    projectId: "srxot-web",
    storageBucket: "srxot-web.firebasestorage.app",
    messagingSenderId: "994688811938",
    appId: "1:994688811938:web:d9d389c76bcf06d274a8fb",
    measurementId: "G-WLCRVH8MNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
});
export const analytics = getAnalytics(app);

export default app;