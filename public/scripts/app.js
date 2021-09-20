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
var myChart;
var exPage = false;
var data;
var config;
var uniqueLineOffsetTops = [1, 1, 1];
var lineOffsetTops = [];

var allScores = [];
//localStorage.setItem("names", JSON.stringify(names));

var profilePage = document.getElementById("profilePage");
var settingsBtn = document.getElementById("settingsLink");
var contactBtn = document.getElementById("contactLink");
var loginBtn = document.getElementById("loginLink");

var accountBtn = document.getElementById("loginLink")
var accountPage = document.getElementById("accountPage");
var accountPageX = document.getElementById("accountPageX");

var settingsPage = document.getElementById("settingsPage");
var settingsPageX = document.getElementById("settingsPageX");

var contactPage = document.getElementById("contactPage");
var contactPageX = document.getElementById("contactPageX");

var refreshDiv = document.getElementById("refreshDiv");
var refreshBox = document.getElementById("refreshBox");

var deleteHighScoreBtn = document.getElementById("deleteHighScoreBtn");

var time = 30;
var timeLeft = 30;
var timer = document.getElementById("timerNum");

var slider = document.getElementById("timerSlider");

var victoryPage = document.getElementById("victoryPage");
var victoryPageX = document.getElementById("victoryPageX");
var wpmDisplay = document.getElementById("wpm");
var accuracy = document.getElementById("accuracy");

var settingsCheckBox1 = document.getElementById("settingsCheckBox1");

var darkThemeP = document.getElementById("darkThemeP");

var darkTheme = true;
var colourPalletDark = {
  text: "#364a5f",
  error: "#9E2A2B",
  correct: "#9fc9ff",
  highlight: "#13283F",
  navHighlight: "#17314b",
  bodyBg: "#112030",
};

var theme = colourPalletDark;

function fetchList() {
  return fetch("wordList.json")
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
async function waitForList() {
  var x = await fetchList();
  wordlist = x;

  if (x != undefined) {
    setUp();
    refreshBox.style.opacity = 1;
  }
}

function setUp() {
  sessionStorage.darkTheme = darkTheme;

  if (isSignedIn()) {
   
    
   
    document.getElementById("profilePageX").src = sessionStorage.photoURL;
  } else {
  }
  if (localStorage.time === undefined) {
    localStorage.time = 30;
  } else {
    time = localStorage.time;
  }
  if (localStorage.allScores === undefined || localStorage.allScores == "") {
    localStorage.allScores = "";
    allScores = [];
  } else {
    allScores = JSON.parse(localStorage.allScores);
  }

  timeLeft = time;
  timer.innerHTML = time;
  slider.value = time;
  gameDisabled = false;
  container.style.display = "inline-flex";
  for (let i = 0; i <= 500; i++) {
    makeWord();
  }
  box_children.forEach((word) => {
    text += word.innerHTML;
  });

  
}

function offsetTopEl(id) {
  el = document.getElementById(id);
  return el.offsetTop;
}
function flashWords() {
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

function nextCharId(currentId = currentCharId()) {
  if (document.getElementById(currentId).innerHTML == "nbsp;") {
    //previous el because curr would be &nbpsn

    next =
      parseInt(
        document.getElementById(currentId).previousElementSibling.id.slice(4)
      ) + 1;
  } else if (
    document.getElementById(currentId).nextElementSibling.innerHTML == "&nbsp"
  ) {
    next = document.getElementById(currentId.nextElementSibling.id.slice(4));
  } else {
    next = parseInt(currentId.slice(4)) + 1;
  }

  return "char" + next;
}

function prevCharId() {
  if (
    document.getElementById(currentCharId()).previousElementSibling === null
  ) {
    // for if its the first char and there is no previous element sibling
    let prevId = "char" + (currentChar - 1);

    return prevId;
  } else {
    return document.getElementById(currentCharId()).previousElementSibling.id;
  }
}

function removeLine(line) {
  let i = box.firstElementChild;

  while (checkLine(i.id) != line) {
    //to make i equal to the first word in the line to be deleted
    //set i to the next word along and check again
    let idNum = parseInt(i.id.slice(4));
    let newId = idNum + 1;
    i = document.getElementById("word" + newId);
  }
  //I now is equal to the first word of the line to be deleted (i is an el)
  //turn i into an int

  i = i.id.slice(4);
  let firstWordToBeDeleted = document.getElementById("word" + i);
  let lastWordToBeDeleted = wordAtEndOfLine(line);

  let firstNum = parseInt(firstWordToBeDeleted.id.slice(4));
  let lastNum = parseInt(lastWordToBeDeleted.id.slice(4));

  for (let a = firstNum; a <= lastNum; a++) {
    let toDelete = document.getElementById("word" + a);
    toDelete.remove();
  }
}

function skipCurrentWord() {
  rmBgEl(document.getElementById(currentCharId(currentChar)));

  let children = document.getElementById("word" + currentWord).children;
  for (c of children) {
    underLineEl(c);
  }

  let oldChar = currentChar;
  currentWord++;
  curWordEl = document.getElementById("word" + currentWord);
  currentChar = curWordEl.firstElementChild.id.substring(4);
  let newChar = currentChar;
  let difference = newChar - oldChar;
  textTyped += text.slice(parseInt(oldChar) - 1, parseInt(newChar) - 1);
  text = text.slice(difference);

  addBgEl(document.getElementById(currentCharId(currentChar)));
}
function changeChar(correct, space, key) {
  colorChangeId = "char" + currentChar.toString();
  char = document.getElementById(colorChangeId);
  currentLine = checkLine(currentCharId(currentChar));
  typedNum++;

  if (correct) {
    if (space) {
      currentWord++;
      textTyped = textTyped + " ";
    } else {
      textTyped += text.slice(0, 1);
    }

    textUserTyped += key;
    text = text.slice(1, text.length);
    char.style.color = theme.correct;
    currentChar++;
  } else {
    errorTotal++;
    if (key == " ") {
      skipCurrentWord();
      return false;
    } else if (space) {
      if (currentCharId() == charAtEndOfLine().id) {
      } else {
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
      textTyped += text.slice(0, 1);
      textUserTyped += key;
      text = text.slice(1, text.length);
      char.style.color = theme.error;
      currentChar++;
    }
  }

  addBgEl(document.getElementById(currentCharId(currentChar)));
  rmBgEl(document.getElementById(currentCharId(currentChar - 1)));

  if (checkLine(currentCharId(currentChar)) == 3) {
    removeLine(1);
  }
}

function currentCharId(num = currentChar) {
  return "char" + num.toString();
}

function curWordEl() {
  return document.getElementById("word" + currentWord);
}

function checkLine(id) {
  let count = 0;
  while (uniqueLineOffsetTops.length != 4) {
    checkMe = box.children[count];
    let offsetTopNum = offsetTopEl(checkMe.id);

    lineOffsetTops.push(offsetTopNum);
    uniqueLineOffsetTops = new Set(lineOffsetTops);
    uniqueLineOffsetTops = [...uniqueLineOffsetTops];

    count++;
  }

  if (offsetTopEl(id) == uniqueLineOffsetTops[0]) {
    return 1;
  } else if (offsetTopEl(id) == uniqueLineOffsetTops[1]) {
    return 2;
  } else if (offsetTopEl(id) == uniqueLineOffsetTops[2]) {
    return 3;
  } else {
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
  let chara = document.createElement("p");
  chara.innerHTML = char;
  chara.className = "char";

  if (errorChar) {
    chara.id = "chare" + idChareIterations.toString();
    idChareIterations++;
  } else {
    chara.id = "char" + idCharIterations.toString();
    idCharIterations++;
  }

  return chara;
}
function wordAtStartOfLine(line) {
  for (let i = 0; i < box.children.length; i++) {
    if (checkLine(box.children[i].id) == line) {
      return box.children[i];
    }
  }
}
function wordAtEndOfLine(line) {
  let num = box.children.length;
  let firstWord = box.firstElementChild.id.slice(4);
  for (let i = firstWord; i < num; i++) {
    let wordId = "word" + i;
    let wordEl = document.getElementById(wordId);
    let lineCheck = checkLine(wordEl.id);
    let nextLine = checkLine(wordEl.nextElementSibling.id);
    if (lineCheck == nextLine) {
    } else if (lineCheck == line) {
      return wordEl;
    }
  }
}
function charAtEndOfLine(line = checkLine(curWordEl(currentWord).id)) {
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
  changeBackColor = document.getElementById(
    "char" + (currentChar - 1).toString()
  );

  let errorChar = false;
  if (currentChar != 1) {
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

    text = textTyped.slice(-1, textTyped.length) + text;
    changeBackColor.style.color = theme.text;
    currentChar--;
  } else {
    //this is for all of the red char

    toDelete = document.getElementById(
      document.getElementById(currentCharId(currentChar)).previousElementSibling
        .id
    );
    toDelete.parentElement.removeChild(toDelete);
  }

  textTyped = textTyped.slice(0, textTyped.length - 1);

  textUserTyped = textUserTyped.slice(0, textUserTyped.length - 1);

  if (
    document.getElementById(currentCharId()).innerHTML == "&nbsp;" &&
    errorChar == false
  ) {
    currentWord--;
  }
}

function resetTest() {
  clearInterval(intervalVar);
  timer.innerHTML = localStorage.time;
  timerStarted = false;
  timeLeft = localStorage.time;
  refreshWords();
}
function refreshWords() {
  typedNum = 0;
  errorTotal = 0;
  idCharIterations = 1;
  idWordIterations = 1;
  currentChar = 1;
  currentWord = 1;
  char = 1;
  container.style.display = "none";
  container.style.opacity = 0;
  while (true) {
    try {
      box.firstElementChild.remove();
    } catch (e) {
      textUserTyped = "";
      textTyped = "";
      text = "";

      setUp();
      container.style.display = "flex";

      setTimeout(function () {
        container.style.opacity = 1;
      }, 50);

      break;
    }
  }
}

var blurred = false;
function blurEl(elNot) {
  if(isMobile()){
    return false;
  }
  blurred = true;

  document.getElementById("timerAndSlider").style.opacity = 0.3;
  document.getElementById("timerAndSlider").style.webkitFilter = "blur(4px)";

  document.getElementById("box").style.opacity = 0.3;
  document.getElementById("box").style.webkitFilter = "blur(4px)";

  document.getElementById("refreshDiv").style.opacity = 0.3;
  document.getElementById("refreshDiv").style.webkitFilter = "blur(4px)";

  try {
    elNot.style.opacity = 1;
    elNot.style.webkitFilter = "blur(0px)";
  } catch (e) {}
}
function unBlurEverything() {
  blurred = false;
  document.getElementById("timerAndSlider").style.opacity = 1;
  document.getElementById("timerAndSlider").style.webkitFilter = "blur(0px)";

  document.getElementById("box").style.opacity = 1;
  document.getElementById("box").style.webkitFilter = "blur(0px)";

  document.getElementById("refreshDiv").style.opacity = 1;
  document.getElementById("refreshDiv").style.webkitFilter = "blur(0px)";
}

var intervalVar;
var timerStarted = false;

function startTimer(sec) {
  if (timeLeft == 0) {
  } else {
    timerStarted = true;
    timerNum.innerHTML = sec;
    intervalVar = setInterval(subSec, 1000);
  }
}
function subSec() {
  if (timeLeft == 1) {
    clearInterval(intervalVar);
    disableGame();
    endScreen();
    timerStarted = false;
  } else {
    timerNum.innerHTML = timerNum.innerHTML - 1;
    timeLeft--;
  }
}

function disableGame() {
  gameDisabled = true;
  container.style.display = "none";
}

function endScreen() {
  exPage = true;
  let wpm = () => {
    if (typedNum - errorTotal >= 1) {
      return Math.round((typedNum - errorTotal) / 5 / (time / 60));
    }
    return 0;
  };

  let accuracyCalc = () => {
    if (typedNum - errorTotal >= 1) {
      return Math.round(((typedNum - errorTotal) / typedNum) * 100);
    } else {
      return 0;
    }
  };

  allScores.push(wpm());

  localStorage.allScores = JSON.stringify(allScores);

  container.style.display = "none";
  victoryPage.style.display = "flex";
  victoryPage.style.opacity = 0;

  wpmDisplay.innerHTML = wpm();
  accuracy.innerHTML = accuracyCalc() + "%";
  let newHighScoreBool = false;

  if (checkHighScore(wpm())) {
    newHighScoreBool = true;
  }
  setTimeout(() => {
    if (newHighScoreBool) {
      document.getElementById("wpmStar").style.display = "block";
      localStorage.highScoreSaved = wpm();
    } else {
      document.getElementById("wpmStar").style.display = "none";
    }
    victoryPage.style.opacity = 1;
  }, 50);
  data = {
    labels: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    datasets: [
      {
        label: "",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",

        data: allScores.slice(-15),
      },
    ],
  };

  config = {
    type: "line",
    data: data,
    options: {
      tooltips: {
        enabled: false,
      },
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
      },

      scales: {
        //Math.max(allScores.slice(-15))
        y: {
          min: 0,
          max: Math.ceil(localStorage.highScoreSaved / 20) * 20 + 20,
          ticks: {
            stepSize: 20,
          },
        },
        xAxes: [
          {
            ticks: {
              display: false,
            },
          },
        ],
        x: {
          ticks: {
            display: false,
          },
        },
      },
    },
  };

  try {
    myChart.destroy();
  } catch (e) {}

  myChart = new Chart(document.getElementById("myChart"), config);
  document.getElementById("myChart").width = "800";
  document.getElementById("myChart").height = "300";
}

function toggleSlider() {
  if (!timerStarted) {
    if (window.getComputedStyle(slider, null).visibility == "hidden") {
      slider.style.visibility = "visible";
      sliderBool = true;
    } else {
      slider.style.visibility = "hidden";
    }
  }
}
function updateTime() {
  localStorage.time = slider.value;
  time = localStorage.time;
  timeLeft = time;
  timerNum.innerHTML = timeLeft;
}

function darkThemeToggle() {
  if (sessionStorage.darkTheme == "true") {
    darkTheme = false;
    sessionStorage.darkTheme = false;

    reColourEverything();
  } else {
    darkTheme = true;
    sessionStorage.darkTheme = true;

    reColourEverything();
  }
}
function isMobile(){
  return navigator.userAgentData.mobile;
}
function checkHighScore(wpm) {
  if (
    localStorage.highScoreSaved === "undefined" ||
    localStorage.highScoreSaved === undefined
  ) {
    localStorage.highScoreSaved = 0;
  }
  if (wpm > localStorage.highScoreSaved) {
    highScore = localStorage.highScoreSaved = wpm;
    return true;
  }
  return false;
}

function isSignedIn() {
  if (sessionStorage.displayName == undefined || sessionStorage.displayName == "undefined") {
    return false;
  }
  return true;
}

function signOut() {
  exPage = false;
  profilePage.style.left = "100%";
  profilePage.style.display = "none";
  document.getElementById("profilePic").style.display = "none";
  unBlurEverything();

  resetTest();
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut();
  document.getElementById("signInLink").style.display = "flex";
  document.getElementById("profilePic").src = "";
  document.getElementById("profilePic").style.display = "none";

  sessionStorage.clear();
}

var onload = () => {
  gapi.load("auth2", function () {
    gapi.auth2.init();
  });
};
function isFiltered() {
  let el = document.getElementsByTagName("html")[0];
  if (el.className == "filter") {
    return true;
  }
  return false;
}
function reColourEverything() {
  sessionStorage.darkTheme = darkTheme;
  let light = isFiltered();

  if ((light && darkTheme) || (!light && !darkTheme)) {
    var elements = document.getElementsByTagName("html");
    for (i = 0; i < elements.length; i++) {
      elements[i].classList.toggle("filter");
    }

    var elIdsNotToggle = [
      "profilePic",
      "profilePageX",
      "victoryPage",
      "settingsCheckBox1",
      "deleteHighScoreBtn",
      "reportABugBtn",
    ];
    elIdsNotToggle.forEach((element) => {
      document.getElementById(element).classList.toggle("unFilter");
    });
  }
}
function hover(element) {
  element.style.backgroundColor = theme.navHighlight;
}
function hoverOff(element) {
  element.style.backgroundColor = "transparent";
}

function signInPage() {
  if (!timerStarted && !exPage) {
    window.location.href = "login.html";
  }
}
function alertMessage(message, color = "red") {
  document.getElementById("alertBox").style.display = "block";
  document.getElementById("alertBox").style.backgroundColor = color;
  document.getElementById("alertMessage").innerText = message;
}
var tabDown = false;
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 8) {
    deleteChar();
  } else if (e.keyCode == 9) {
    tabDown = true;
  }
});

window.addEventListener("keypress", (e) => {
  if (blurred || gameDisabled || sliderBool || exPage) {
    return false;
  } else if (e.keyCode == 13 && tabDown) {
    resetTest();
  } else {
   
    slider.style.visibility = "hidden";
    sliderBool = false;
    let key = String.fromCharCode(e.keyCode);
    checkKey(key);
    if (!timerStarted) startTimer(time);
  }
});

settingsBtn.addEventListener("click", () => {
  debugger;
  if (!timerStarted && !exPage) {
    exPage = true;
    sliderBool = false;
    slider.style.visibility = "hidden";
    if(!isMobile()){
      
      settingsPage.style.left = "0px";
      settingsPage.style.display = "flex"
      

      blurEl(settingsPage);
    }else{
      settingsPage.style.display = "flex"
      contactBtn.style.display="none";
      settingsBtn.style.display="none";
      accountBtn.style.display = "none";
    }
    
  }
});
settingsPageX.addEventListener("click", () => {
  exPage = false;
  if(isMobile()){
    settingsPage.style.display = 'none';
    contactBtn.style.display="flex";
    settingsBtn.style.display="flex";
    accountBtn.style.display = "flex"
  }else{
    settingsPage.style.left = "-50%";
    unBlurEverything();
  }
});

contactBtn.addEventListener("click", () => {
  
  exPage = true;
    sliderBool = false;
    slider.style.visibility = "hidden";
    debugger;
    if(!isMobile()){
      
      contactPage.style.left = "0px";
      contactPage.style.display = "flex"
      

      blurEl(contactPage);
    }else{
      
      contactPage.style.display = "flex";

      settingsBtn.style.display = "none";
      contactBtn.style.display = "none";
      accountBtn.style.display = "none";

    }
});
contactPageX.addEventListener("click", () => {
  exPage = false;
  if(isMobile()){
    contactPage.style.display = 'none';
    settingsBtn.style.display = "flex";
    contactBtn.style.display = "flex";
    accountBtn.style.display = "flex"
  }else{
    contactPage.style.left = "-50%";
    unBlurEverything();
  }
  
 
});
loginBtn.addEventListener("click", () => {
  debugger;
  exPage = false;
  sliderBool = false;
  slider.style.visibility = "hidden";
  if(isSignedIn()){
    if (!timerStarted && !exPage) {
      document.getElementById("profilePageX").style.display = "flex";
      exPage = true;

      accountPage.style.left = "0px";
      accountPage.style.display = "flex"

      settingsPage.style.display = "none"

      contactBtn.style.display="none";
      settingsBtn.style.display="none";
      accountBtn.style.display="none";
      
  

      
      sliderBool = false;
      slider.style.visibility = "hidden";
      blurEl(accountPage);
    }
  }else{
    signInPage();
  }
  
  
});
accountPageX.addEventListener("click", () => {
  exPage = false;
  if(isMobile()){
    accountPage.style.display = 'none';

    settingsBtn.style.display = "flex";
    contactBtn.style.display = "flex";
    accountBtn.style.display = "flex"
  }else{
    accountPage.style.left = "-50%";


    settingsBtn.style.display = "flex";
    contactBtn.style.display = "flex";
    accountBtn.style.display = "flex"
    unBlurEverything();
  }
  
 
});
refreshDiv.addEventListener("click", () => {
  if(blurred){
    return false;
  }
  resetTest();
});

victoryPageX.addEventListener("click", () => {
  exPage = false;
  resetTest();

  container.style.display = "inline-flex";
  victoryPage.style.display = "none";
});
timer.addEventListener("mouseover", () => {
  if (exPage || blurred) {
    return false;
  }

  toggleSlider();
});

timerAndSlider.onselectstart = function () {
  return false;
};

box.onselectstart = function () {
  return false;
};
document.body.onselectstart = function () {
  return false;
};

var sliderBool = false;

slider.addEventListener("mouseup", () => {
  exPage = false;
  sliderBool = false;

  slider.style.visibility = "hidden";

  updateTime();
});
slider.addEventListener("mouseOut", () => {
  exPage = false;
  sliderBool = false;

  slider.style.visibility = "hidden";

  updateTime();
});
slider.addEventListener("click", () => {
  if (exPage || timerStarted || blurred) {
    return false;
  }
  
  
  sliderBool = true;
});
timerAndSlider.addEventListener("mouseleave", () => {
  exPage = false;
  sliderBool = false;
  slider.style.visibility = "hidden";
});

settingsCheckBox1.addEventListener("change", () => {
  darkThemeToggle();
});

deleteHighScoreBtn.addEventListener("click", () => {
  let doubleCheck = confirm(
    "Warning, you are about to delete your saved highscore, this action cannot be undone"
  );
  if (doubleCheck) {
    localStorage.highScoreSaved = "undefined";
  }
  return false;
});
document.getElementById("reportABugBtn").addEventListener("click", () => {
  alert("You can contact me here: easi.type.beta.feeback@gmail.com");
});



window.addEventListener("load", function () {
  if (sessionStorage.darkTheme == "true") {
    darkTheme = true;
  } else if (sessionStorage.darkTheme == "false") {
    darkTheme = false;
  } else {
    darkTheme = true;
  }
  reColourEverything();
  if (!darkTheme) {
    document.getElementById("settingsCheckBox1").checked = true;
  }
  waitForList();
});
