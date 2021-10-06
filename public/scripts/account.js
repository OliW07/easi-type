
var defaultPallet1 = {
    text: "#14279B",
    error: "#9E2A2B",
    correct: "#946e61",
    highlight: "rgb(244 211 191)",
    navHighlight: "rgb(244 211 191)",
    bodyBg: "#5C7AEA",
    timerBg: "#fff",
    sectionBg: "#a1b3f5",
    sectionColor: "#0a0b44",
  };
  var defaultPallet = {
    text: "#412319",
    error: "#b54e4f",
    correct: "#9cd12b",
    highlight: "rgb(244 211 191)",
    navHighlight: "rgb(244 211 191)",
    bodyBg: "#F1FFE7",
    timerBg: "#D7B19D",
    sectionBg: "#e5f3db",
    sectionColor: "#412319",
  };
  var theme = defaultPallet;


function reColourEverything(){

    document.body.style.color = theme.text;

    let r = document.querySelector(':root');
    let rs = getComputedStyle(r);
    r.style.setProperty('--bodyBg', '#f2fff5');
    r.style.setProperty('--bodyColor', theme.text);
    r.style.setProperty('--footerBg', theme.footerBg);
    r.style.setProperty('--sectionBg', theme.sectionBg);
}
function alertMessage(message, color = "red",confirm=false) {
  document.getElementById("alertBox").style.display = "block";
  document.getElementById("alertBox").style.backgroundColor = color;
  document.getElementById("alertMessage").innerText = message;
  if(confirm){
    document.getElementById("confimTick").style.display="block";
  }else{
    document.getElementById("confimTick").style.display="none";
  }
}
function deleteAccountConfirm(){
  let confirm = window.confirm("Are you sure you want to delete this account, this action CANNOT be undone");
  if(confirm){
    
    deleteAccount();
    signOutUser()
    sessionStorage.displayName = undefined;
    sessionStorage.email = undefined;
    sessionStorage.photoURL = 'assets/person.png';
    sessionStorage.emailVerified = undefined;
    window.location.href="/.";
  } 
}
function changePassword(){
 
  let confirm = window.confirm("Confirm for us to send a reset link to your email");
  if(confirm){
    resetPassword();
  } 
}
window.addEventListener("load", ()=>{
  document.getElementById('profilePic').src=sessionStorage.photoURL;
  
  document.getElementById('name').innerText=sessionStorage.displayName;
  document.getElementById('email').innerText=sessionStorage.email;
})
