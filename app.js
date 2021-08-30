var gameDisabled = false;
var typedNum = 0;
var errorTotal = 0;
var wordlist;
var box = document.getElementById("box");
var currentChar = 1;
var currentWord = 1;
var idCharIterations = 1;
var idWordIterations = 1;
var idChareIterations = 1;
var text = "";
var textTyped = "";
var textUserTyped = "";
var box_children = [document.getElementById("box").children];
var typed = "this";
var afterError = [];
var char;
var colorChangeId;
var changeBackColor;
var toDelete;

var exPage = false;

var uniqueLineOffsetTops = [1,1,1];
var lineOffsetTops= [];

//var allScores = localStorage.allScores;
//localStorage.setItem("names", JSON.stringify(names));

var aboutBtn = document.getElementById('aboutLink');
var settingsBtn = document.getElementById('settingsLink');
var contactBtn = document.getElementById('contactLink');

var aboutPage = document.getElementById('aboutPage');
var aboutPageX = document.getElementById('aboutPageX');

var settingsPage = document.getElementById('settingsPage');
var settingsPageX = document.getElementById('settingsPageX');

var contactPage = document.getElementById('contactPage');
var contactPageX = document.getElementById('contactPageX');

var refreshDiv = document.getElementById('refreshDiv');
var refreshBox = document.getElementById('refreshBox');

var deleteHighScoreBtn = document.getElementById('deleteHighScoreBtn');

var time = 30;
var timeLeft = 30;
var timer = document.getElementById('timerNum');

var slider = document.getElementById('timerSlider');

var victoryPage = document.getElementById('victoryPage');
var victoryPageX = document.getElementById('victoryPageX');
var wpmDisplay = document.getElementById('wpm');
var accuracy = document.getElementById('accuracy');


var settingsCheckBox1 = document.getElementById('settingsCheckBox1');

var darkThemeP = document.getElementById('darkThemeP');

var darkTheme = settingsCheckBox1.checked ? 'true' : 'false';
var colourPalletDark = {
    "bodyBg":"#09141f",
    "text":"#364a5f",
    "error":"#9E2A2B",
    "correct":"#778da9",
    "navBg":"#778da9",
    "highlight":"#13283F",
    
};
var colourPalletLight = {
    "bodyBg":"#e3f5ff",
    "text":"#73abfa",
    "error":"#ff8787",
    "correct":"#3d8eff",
    "navBg":"#b8d5ff",
    "highlight":"#416fa3",
};

var theme = (darkTheme ? colourPalletDark : colourPalletLight);

function fetchList(){
    
    return fetch('wordList.json')
    .then(response => response.json())
    .catch(error => console.log(error));
    
}
async function waitForList(){
    var x = await fetchList();
    wordlist = x;
    
    if(x != undefined){
        setUp();
        refreshBox.style.opacity = 1;
    }
}

waitForList();

function setUp(){
    
    gameDisabled = false;
    container.style.display = 'inline-flex';
    for (let i = 0; i <= 500; i++) {
        
        makeWord();
    
    
    }
    box_children.forEach((word) => {
        text += word.innerHTML;
    });
    
    
}

function offsetTopEl(id){
    el = document.getElementById(id);
    return el.offsetTop;
    
}
function flashWords(){
    
    box.style.opacity = 1;
}


function checkKey(key) {
    let nextChar = text.slice(0, 1);
    let space = false;
    if (nextChar == " ") {
        space = true;
    }
    if (key == nextChar) {
        changeChar(true, space, key);
    } else {
        changeChar(false, space, key);
    }
}


function nextCharId(currentId=currentCharId()) {
    
    if(document.getElementById(currentId).innerHTML == "nbsp;"){
        //previous el because curr would be &nbpsn
        
        next = parseInt(document.getElementById(currentId).previousElementSibling.id.slice(4)) + 1;
        console.log(next)
    }else if(document.getElementById(currentId).nextElementSibling.innerHTML == "&nbsp"){
        next = document.getElementById(currentId.nextElementSibling.id.slice(4));
    }else{
        next = parseInt(currentId.slice(4)) + 1;
    }

    

    
    return "char" + next;
}

function prevCharId() {
    
    if(document.getElementById(currentCharId()).previousElementSibling === null){
       
        // for if its the first char and there is no previous element sibling
       let prevId = "char" + (currentChar - 1)
       
       return prevId;
    }else{
        return document.getElementById(currentCharId()).previousElementSibling.id;
    }
    

}


function removeLine(line){
    
    let i = box.firstElementChild;
    
    while(checkLine(i.id) != line){
        //to make i equal to the first word in the line to be deleted
        //set i to the next word along and check again
        let idNum = parseInt(i.id.slice(4))
        let newId = idNum + 1;
        i = document.getElementById("word" + newId);
        console.log(i)
    }
    //I now is equal to the first word of the line to be deleted (i is an el)
    //turn i into an int

    i = i.id.slice(4);
    let firstWordToBeDeleted = document.getElementById("word" + i);
    let lastWordToBeDeleted = wordAtEndOfLine(line);

    let firstNum = parseInt(firstWordToBeDeleted.id.slice(4));
    let lastNum = parseInt(lastWordToBeDeleted.id.slice(4));
        
    for(let a = firstNum; a <= lastNum; a++){
        let toDelete = document.getElementById('word'+a);
        toDelete.remove();
    }
    
}

function changeChar(correct, space, key) {
    colorChangeId = "char" + currentChar.toString();
    char = document.getElementById(colorChangeId);
    currentLine = checkLine(currentCharId(currentChar));
    typedNum++;


    if (correct) {
        if (space) {
            currentWord++;
            textTyped = textTyped + ' '
        } else {
            textTyped += text.slice(0, 1);
        }

        textUserTyped += key;
        text = text.slice(1, text.length);
        char.style.color = theme.correct;
        currentChar++;
    } else {
        errorTotal++;

        if (space) {
            if(currentCharId() == charAtEndOfLine().id){

            }else{
                afterError.push(currentChar);
            
                let chare = makeChar(key, true);
        
                text += key;
                textUserTyped += key;
                textTyped += key;
                curWordEl().insertAdjacentElement("beforeend", chare);
                curWordEl().insertBefore(chare, chare.previousElementSibling);
                chare.style.color = theme.error;
            }
            


        } else {
            textTyped += text.slice(0, 1)
            textUserTyped += key
            text = text.slice(1, text.length);
            char.style.color = theme.error;
            currentChar++;
        }
    }

    addBgEl(document.getElementById(currentCharId(currentChar)));
    rmBgEl(document.getElementById(currentCharId(currentChar - 1)));
   

    if(checkLine(currentCharId(currentChar)) == 3){
        removeLine(1);
    }

}

function currentCharId(num=currentChar) {
    return "char" + num.toString()
}

function curWordEl() {
    return document.getElementById('word' + currentWord);
}

function checkLine(id){
    let count = 0;
    while(uniqueLineOffsetTops.length != 4){
        
        checkMe = box.children[count];
        let offsetTopNum = offsetTopEl(checkMe.id);

        
        lineOffsetTops.push(offsetTopNum);  
        uniqueLineOffsetTops = new Set(lineOffsetTops);
        uniqueLineOffsetTops = [...uniqueLineOffsetTops];
        //console.log(uniqueLineOffsetTops);
        count++;
    }
    


   
    if(offsetTopEl(id) == uniqueLineOffsetTops[0]){
        return 1;
    }else if(offsetTopEl(id) == uniqueLineOffsetTops[1]){
        return 2;
    }else if(offsetTopEl(id) == uniqueLineOffsetTops[2]){
        return 3;
    }else{
        return 4;
    }
}


function randomWord() {
    
    
    let random = wordlist[Math.floor(Math.random() * wordlist.length)];
    return random;
    
    
}

function makeWord() {
    let word = randomWord();
    let letters = word.split("");

    let div = document.createElement("div");

    div.id = "word" + idWordIterations.toString();

    letters.forEach((letter) => {
        let chara = makeChar(letter);

        text += chara.innerText;
        div.append(chara);

    });

    let space = makeChar("&nbsp");
    text += " ";
    div.append(space);


    div.className = "word";
    box.append(div);
    idWordIterations++;
    
 
    
    
    

}


function makeChar(char, errorChar = false) {
    let chara = document.createElement("p")
    chara.innerHTML = char
    chara.className = "char"

    
    if (errorChar) {
        chara.id = "chare" + idChareIterations.toString();
        idChareIterations++;
    } else {
        chara.id = "char" + idCharIterations.toString();
        idCharIterations++;
    }

    
    
    return chara;
}
function wordAtStartOfLine(line){
    for(let i = 0; i < box.children.length; i++){
        if(checkLine(box.children[i].id)==line){
            return box.children[i];
        }
    }
}
function wordAtEndOfLine(line){
   
    let num = box.children.length;
    let firstWord = box.firstElementChild.id.slice(4);
    for(let i = firstWord; i < num; i++){
        let wordId = "word" + i;
        let wordEl = document.getElementById(wordId);
        let lineCheck = checkLine(wordEl.id);
        let nextLine = checkLine(wordEl.nextElementSibling.id)
        if(lineCheck == nextLine){

        }else if(lineCheck == line){
            
            return wordEl;
            
        }
    }
}
function charAtEndOfLine(line=checkLine((curWordEl(currentWord).id))){
    return wordAtEndOfLine(line).lastChild;
}


function underLineEl(el) {
    el.style.textDecoration = "underline";
}
function removeUnderlineEl(el) {
    el.style.textDecoration = "none";
}


function addBgEl(el) {
    el.style.backgroundColor = theme.highlight;
}
function rmBgEl(el) {
    el.style.backgroundColor = theme.bodyBg;
}

function deleteChar() {
    changeBackColor = document.getElementById('char' + (currentChar - 1).toString());
    
    let errorChar = false;
    if(currentChar != 1){
        typedNum--;
    }

    try {

        //we need to have a try statement here becuase 
        //if there isn't a previous element sibling 
        //(in the func above) an error will occur.


        if (prevCharId().slice(0, 5) == "chare") {
            
            errorChar = true;
        }
    } catch (e) {
        //doesn't need to output, this is not an error
    }
    

    if (errorChar == false) {
        if (currentChar !== 1) {
            rmBgEl(document.getElementById(currentCharId(currentChar)));
            addBgEl(document.getElementById(currentCharId(currentChar - 1)));
        }

        //just for all the regular char and the actual ' '
        console.log('text update var');
        text = textTyped.slice(-1, textTyped.length) + text;
        changeBackColor.style.color = theme.text;
        currentChar--;


    } else {

        //this is for all of the red char

        
        
        toDelete = document.getElementById(document.getElementById(currentCharId(currentChar)).previousElementSibling.id);
        toDelete.parentElement.removeChild(toDelete);



    }

    textTyped = textTyped.slice(0, (textTyped.length) - 1);




    textUserTyped = textUserTyped.slice(0, (textUserTyped.length) - 1);
    
    

    if (document.getElementById(currentCharId()).innerHTML == "&nbsp;" && errorChar == false) {
        currentWord--;
    }

}

function resetTest(){

    clearInterval(intervalVar);
    timer.innerHTML = time;
    timerStarted = false;
    timeLeft = time;
    refreshWords();
}
function refreshWords(){

    typedNum = 0;
    errorTotal = 0;
    idCharIterations = 1;
    idWordIterations = 1;
    currentChar = 1;
    currentWord = 1;
    char = 1;
    container.style.display = 'none'; 
    container.style.opacity = 0;
    while(true){
        try{
            box.firstElementChild.remove();
        }catch(e){
            textUserTyped = '';
            textTyped = '';
            text = '';
            
            setUp();
            container.style.display = 'flex'; 
            
            setTimeout(
                function(){ 
                    container.style.opacity = 1; 
                }, 50);

            break;
        }
    }
}



var blurred = false;
function blurEl(elNot){
    blurred = true
    
    
    document.getElementById('container').style.opacity = 0.3;
    document.getElementById('container').style.webkitFilter = "blur(4px)";
    try{
        elNot.style.opacity = 1;
    }catch(e){}
    
}
function unBlurEverything(){
    blurred = false;
   document.getElementById('container').style.opacity = 1;
   document.getElementById('container').style.webkitFilter = "blur(0px)";
   
}

var intervalVar; 
var timerStarted =false;

function startTimer(sec){
    if(timeLeft == 0){
        
    }else{
        timerStarted = true;
        timerNum.innerHTML = sec;
        intervalVar = setInterval(subSec,1000);
    }
    
  
}
function subSec(){
    if(timeLeft == 1){
        clearInterval(intervalVar);
        disableGame();
        endScreen();
        timerStarted = false;
    }else{
        timerNum.innerHTML = timerNum.innerHTML-1;
        timeLeft--;
    }
    
}

function disableGame(){
    gameDisabled = true;
    container.style.display = "none";
}
function endScreen(){
    try{
        document.getElementById("highScoreH2").remove()
    }catch(e){}
    let wpm = () =>{
        if(typedNum-errorTotal >= 1){
            return Math.round((typedNum-errorTotal)/5/(time/60));
        }
        return 0;
        
    }
   /* if(allScores === null){
        localStorage.allScores = new Array()
        allScores.push(wpm());
    }else{
        allScores.push(wpm());
    }*/
    let accuracyCalc = () => {
        
        if(typedNum-errorTotal >= 1){
            return Math.round((typedNum-errorTotal)/typedNum*100);
        }else{
            return 0;
        }
        
    } 


    container.style.display = 'none';
    victoryPage.style.display = "flex";
    victoryPage.style.opacity = 0;
    
    wpmDisplay.innerHTML = wpm();
    accuracy.innerHTML = accuracyCalc() + "%";
    let newHighScoreBool = false;
    
    if(checkHighScore(wpm())){
        newHighScoreBool = true;
    }
    setTimeout(
        () => { 
            if(newHighScoreBool){
                
                
                highScoreH2 = document.createElement('h2');
                highScoreH2.id = "highScoreH2";
                victoryPage.append(highScoreH2);
                highScoreH2.innerHTML = "New High Score " + wpm();

            }
            victoryPage.style.opacity = 1; 

        }, 50);
    
}


function toggleSlider(){
    if(!timerStarted){
        if (window.getComputedStyle(slider, null).display == 'none') {
            slider.style.display = "block";
        } else {
            slider.style.display = "none";
        }
    }
}
function updateTime(){
    time = slider.value;
    timeLeft = time;
    timerNum.innerHTML = timeLeft;
}

function darkThemeToggle(){
    debugger;
    if(darkTheme){
        
        darkTheme = false;
        console.log(darkTheme)
        reColourEverything();
        victoryPage.style.border = "2px solid black";
    }else{
        
        darkTheme = true;
        console.log(darkTheme)
        reColourEverything();
        victoryPage.style.border = "none";
    }
}


function checkHighScore(wpm){
    if(localStorage.highScoreSaved === undefined){
        localStorage.highScoreSaved = 0;
    }
    if(wpm > localStorage.highScoreSaved){
        highScore = localStorage.highScoreSaved = wpm;
        return true;
    }
    return false;
}



function reColourEverything(){
    debugger;
    theme = (darkTheme ? colourPalletDark : colourPalletLight);
    document.body.style.backgroundColor = theme.bodyBg;
    document.body.style.color = theme.color;
    aboutPage.style.backgroundColor = theme.navBg;
    settingsPage.style.backgroundColor = theme.navBg;
    contactPage.style.backgroundColor = theme.navBg;
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 8) {
        deleteChar();
    }
});

window.addEventListener("keypress", (e) => {
    if(blurred || gameDisabled || sliderBool){
        return false;
    }
   
    slider.style.display = "none";
    sliderBool = false;
    let key = String.fromCharCode(e.keyCode);
    checkKey(key);
    if(!timerStarted)startTimer(time);
    
});
aboutBtn.addEventListener('click',() => {
   if(timerStarted){
       return false;
   }
    exPage = true;
    aboutPage.style.left = "0px";
    sliderBool = false;
    slider.style.display = "none";
    blurEl(aboutPage);
});

aboutPageX.addEventListener('click',() => {
   
    exPage = false;
    aboutPage.style.left = "-50%";
    unBlurEverything();
    
});


settingsBtn.addEventListener('click',() => {
    if(timerStarted){
        return false;
    }
    exPage = true;
    settingsPage.style.left = "0px";
    sliderBool = false;
    slider.style.display = "none";
    blurEl(settingsPage);
});
settingsPageX.addEventListener('click',() => {
   
    exPage = false;
    settingsPage.style.left = "-50%";
    unBlurEverything();
    
});

contactBtn.addEventListener('click',() => {
    if(timerStarted){
        return false;
    }
    exPage = true;
    contactPage.style.left = "0px";
    sliderBool = false;
    slider.style.display = "none";
    blurEl(contactPage);
});
contactPageX.addEventListener('click',() => {
    exPage = false;
    contactPage.style.left = "-50%";
    unBlurEverything();
    
    
});
refreshDiv.addEventListener('click',() => {
    resetTest();
    
});

victoryPageX.addEventListener('click',() => {
    
    resetTest();
    
    container.style.display = 'inline-flex';
    victoryPage.style.display = 'none';
    
    
});
timer.addEventListener('click',() => {
    if(exPage){
        return false;
    }
    toggleSlider();

});

timerAndSlider.onselectstart = function() { return false; };

box.onselectstart = function() { return false; };
document.body.onselectstart = function() { return false; };

var sliderBool = false;

slider.addEventListener('mouseup', () => {
    sliderBool = false;
    console.log('up')
    slider.style.display = "none";
    updateTime();
});
slider.addEventListener('click', () => {
    
    sliderBool = true;
});
timerAndSlider.addEventListener('mouseleave', () => {
    
    sliderBool = false;
    slider.style.display = "none";
});

settingsCheckBox1.addEventListener('change', () => {
    darkThemeToggle();
});

deleteHighScoreBtn.addEventListener('click', () => {
    let doubleCheck = confirm('Warning, you are about to delete your saved highscore, this action cannot be undone');
    if(doubleCheck){
        localStorage.highScoreSaved = undefined;
    }
    return false;
});
