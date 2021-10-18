var defaultPallet = {
    text: "#616161",
    error: "#7e2a33",
    correct: "white",
    highlight: "rgb(247, 223, 203)",
    navHighlight: "rgb(247, 223, 203)",
    bodyBg: "#313131",
    timerBg: "#D7B19D",
    sectionBg: "#e5f3db",
    sectionColor: "#412319",
  };
var theme = defaultPallet;
let signIn = true;
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
function toggleSignIn(el){
    let login = document.getElementById('login');
    let signup = document.getElementById('signup');
    let signInBtns = document.getElementById('signInBtns')
    let signUpBtns = document.getElementById('signUpBtns')
    let loginPage = document.getElementById('loginPage');
    let signupPage = document.getElementById('signupPage');
    
    if(el == 'signup'){
        
        signIn = false;
        
        loginPage.style.display = "none";
        signupPage.style.display = "flex";

    }else if(el == "login"){
        signIn = true;
        
        loginPage.style.display = "flex";
        signupPage.style.display = "none";
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


window.addEventListener('load', ()=>{
    reColourEverything();
})



