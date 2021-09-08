

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
    
    var elIdsNotToggle = ['btn'];
    elIdsNotToggle.forEach(element => {
        document.getElementById(element).classList.toggle('unFilter');
    })
   }else{
    
   }

 
}

var profile;
function onSignIn(googleUser) {
            
    profile = googleUser.getBasicProfile();
    googleUser.disconnect();
    
    sessionStorage.profilePicSrc=profile.getImageUrl();
    sessionStorage.userName = profile.getGivenName();
    sessionStorage.userEmail = profile.getEmail();
    sessionStorage.userId = profile.getId();
    window.location.replace("./");
}

document.getElementById('signInX').addEventListener('click', ()=>{
    
    window.location.replace("./");
})

document.addEventListener("DOMContentLoaded", reColourEverything);
