function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  
  var profile = googleUser.getBasicProfile();
  unsubscribeBlock(googleUser);
  sessionStorage.clear();
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();
  
  sessionStorage.userId = profile.getId();
  sessionStorage.userName = profile.getName();
  sessionStorage.userEmail = profile.getEmail();
  sessionStorage.userProfilepicURL = profile.getImageUrl();
  
  
  
    
  
  document.location.href = "/.";
  
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
    
    var elIdsNotToggle = ['btn'];
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



function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}