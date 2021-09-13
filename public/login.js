
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
    debugger;
    let light = isFiltered();
    let darkTheme
    if(sessionStorage.darkTheme == 'true'){
        darkTheme = true
    }else{
        darkTheme = false;
    }

   if(light && darkTheme || !light && !darkTheme){
    var elements = document.getElementsByTagName("html");
    for (i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('filter');
    }
    
    var elIdsNotToggle = ['google-btn','email-btn'];
    elIdsNotToggle.forEach(element => {
        document.getElementById(element).classList.toggle('unFilter');
    })
   }else{
    
   }

 
}



document.getElementById('signInX').addEventListener('click', ()=>{
    
    window.location.replace("./");
})

document.addEventListener("DOMContentLoaded", reColourEverything);



