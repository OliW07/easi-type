



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



