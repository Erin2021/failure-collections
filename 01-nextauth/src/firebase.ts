// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiKOKh4eMKRGSNDXQFd3j2BmZAge_lBAw",
  authDomain: "next-auth-firebase-admin-a2521.firebaseapp.com",
  projectId: "next-auth-firebase-admin-a2521",
  storageBucket: "next-auth-firebase-admin-a2521.appspot.com",
  messagingSenderId: "459220346405",
  appId: "1:459220346405:web:14ee8e9e731f27260a41cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); //우리 app에 대한 인증을 사용할래
