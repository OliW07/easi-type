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
let signIn = true;
function alertMessage(message,color="red"){
    document.getElementById('alertBox').style.display = 'block';
    document.getElementById('alertBox').style.backgroundColor = color;
    document.getElementById('alertMessage').innerText = message;
}
function toggleSignIn(el){
    let login = document.getElementById('login');
    let signup = document.getElementById('signup');
    let signInBtns = document.getElementById('signInBtns')
    let signUpBtns = document.getElementById('signUpBtns')
    
    if(signIn && el != 'login'){
        
        signIn = false;
        login.classList.toggle("loginSignupToggle");
        signup.classList.toggle("loginSignupToggle");
        signInBtns.style.display = "none";
        signUpBtns.style.display = "flex";

    }else if(!signIn && el == "login"){
        signIn = true;
        login.classList.toggle("loginSignupToggle");
        signup.classList.toggle("loginSignupToggle");
        signInBtns.style.display = "flex";
        signUpBtns.style.display = "none";
    }
}



function isFiltered(){
    let el = document.getElementsByTagName('html')[0];
    if(el.className == "filter"){
        return true;
 
    }
    return false;
 }

function reColourEverything(){
    
    document.body.style.color = theme.text;

    let r = document.querySelector(':root');
    let rs = getComputedStyle(r);
    r.style.setProperty('--bodyBg', theme.bodyBg);
    r.style.setProperty('--bodyColor', theme.text);
    r.style.setProperty('--footerBg', theme.footerBg);
    r.style.setProperty('--sectionBg', theme.sectionBg);
   

 
}



document.getElementById('signInX').addEventListener('click', ()=>{
    
    window.location.replace("./");
})

document.addEventListener("DOMContentLoaded", reColourEverything);



