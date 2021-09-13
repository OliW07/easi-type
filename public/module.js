import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import { getAuth, signOut, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged,createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";



const googleProvider = new GoogleAuthProvider();



//import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNq7IRy1Uawf4WA02UdPw-xj24EJCR3F0",
  authDomain: "easi-type.com",
  projectId: "easi-type-ad596",
  storageBucket: "easi-type.com",
  messagingSenderId: "274771557255",
  appId: "1:274771557255:web:21fbe862b5c9f2da55b122",
  measurementId: "G-8D8NJDXGZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
let user = auth.currentUser;


async function createNewUser(email,password) {
  return new Promise(resolve =>{
    if(email == "" || password.length < 7){
      resolve('emailMissing');
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      
      user = userCredential.user;
      resolve('created')
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      resolve(error.message);
      
    });
  })
  
}

function storageSessionData(){
  try{

  
      sessionStorage.displayName = user.displayName;
      sessionStorage.email = user.email;
      sessionStorage.photoURL = user.photoURL;
      sessionStorage.emailVerified = user.emailVerified;
  }catch(e){}
}




function signInUser(email,password) {
  return new Promise(resolve => {
    
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
      const user = userCredential.user;
      resolve('signedIn');
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      resolve("Error ]" + errorMessage);
    });
  });
}


async function emailBtnPressed(signIn){
  signOut(auth);
  if(signIn){
    let email = document.getElementById('emailSignIn').value;
    let password = document.getElementById('passwordSignIn').value;
    let waiting = await signInUser(email, password);
    if(waiting == 'signedIn'){
      window.user=user;
      storageSessionData();
      window.location.href = "/."
    }else if(waiting.slice(0,5) == 'Error'){
      let mess = waiting.split(']')[1];
      console.log(mess)
      checkErrorMessage(mess);
    }else{
      console.log('waiting');
    }
  }else{
    let email = document.getElementById('emailSignUp').value;
    let password = document.getElementById('passwordSignUp').value;
    let name = document.getElementById('name').value;
    let waitingAgain = await createNewUser(email, password);
    if(waitingAgain == "created"){
      storageSessionData();
      sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('sent')
        alertMessage('We just send you a cofimation email, please click on the click to verify your account','green','/.')
      });
      
      
    }else{
      //error
      checkErrorMessage(waitingAgain);

    }
    
  }
  
}
function checkErrorMessage(message){
  switch(message){
    case 'emailMissing':
      alertMessage("Please make sure you're entering a valid email address, and your password is longer than six characters.",'red');
      break;
    case "Firebase: Error (auth/invalid-email).":
      alertMessage("Please enter a valid email address",'red');
      break;
    case "Firebase: Error (auth/email-already-in-use).":
      alertMessage("This email has already been regestigered with easi-type.com, try signing in again",'orange');
      break;
    case "Firebase: Error (auth/wrong-password).":
      alertMessage("Incorrect email/password, try again",'orange');
      break;
    case "Firebase: Error (auth/user-not-found).":
      alertMessage("There is no account associated with this email address, try creating a new account","orange");
      break;
    case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
        alertMessage("This account is temporarily disabled due to many failed login attempts, you can try again later, or reset your password","red");
        break;
    default:
       alertMessage("A problem occured thank you for understanding, try again later",'orange');
       break;
   
  }
}
function alertMessage(message,color="red",redirect='false'){
  document.getElementById('alertBox').style.display = 'block';
  document.getElementById('alertBox').style.backgroundColor = color;
  document.getElementById('alertMessage').innerText = message;
  if(redirect !== 'false'){
    document.getElementById('closebtn').addEventListener('click', () => {
      window.location = redirect;
    })
  }
}
function signInGoogle(){
  
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    window.location.href ="/."
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  
}




function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user !== null) {
      
      storageSessionData();
      
      
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
      
    }
    
    // ...
  } else {
    // User is signed out
    // ...
  }
  
});




window.onLoad = onLoad;
window.signInGoogle = signInGoogle;
window.createNewUser = createNewUser;
window.signInUser = signInUser;
window.emailBtnPressed = emailBtnPressed;
window.user = user;