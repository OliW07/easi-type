import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signInWithCredential, getRedirectResult,signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

//import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNq7IRy1Uawf4WA02UdPw-xj24EJCR3F0",
  authDomain: "easi-type-ad596.firebaseapp.com",
  projectId: "easi-type-ad596",
  storageBucket: "easi-type-ad596.appspot.com",
  messagingSenderId: "274771557255",
  appId: "1:274771557255:web:21fbe862b5c9f2da55b122",
  measurementId: "G-8D8NJDXGZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData;
    for (let i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

window.unsubscribeBlock = function (){
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      const credential = GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      
      // Sign in with credential from the Google user.
      signInWithCredential(auth, credential).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The credential that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
  
  
  
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}
