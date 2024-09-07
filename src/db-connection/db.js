import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBCidah5-F70fJ9FjDN5rU84mGkHz9wckU",
    authDomain: "testing-c248e.firebaseapp.com",
    projectId: "testing-c248e",
    storageBucket: "testing-c248e.appspot.com",
    messagingSenderId: "984392203711",
    appId: "1:984392203711:web:8f2133ef5849cde131b50a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const db = getFirestore(app);
 
  export default db;