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




var wordlist = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "i",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "when",
    "make",
    "can",
    "like",
    "time",
    "no",
    "just",
    "him",
    "know",
    "take",
    "person",
    "into",
    "year",
    "your",
    "good",
    "some",
    "could",
    "them",
    "see",
    "other",
    "than",
    "then",
    "now",
    "look",
    "only",
    "come",
    "its",
    "over",
    "think",
    "also",
    "back",
    "after",
    "use",
    "two",
    "how",
    "our",
    "work",
    "first",
    "well",
    "way",
    "even",
    "new",
    "want",
    "because",
    "any",
    "these",
    "give",
    "day",
    "most",
    "us",
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "i",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "when",
    "make",
    "can",
    "like",
    "time",
    "no",
    "just",
    "him",
    "know",
    "take",
    "person",
    "into",
    "year",
    "your",
    "good",
    "some",
    "could",
    "them",
    "see",
    "other",
    "than",
    "then",
    "now",
    "look",
    "only",
    "come",
    "its",
    "over",
    "think",
    "also",
    "back",
    "after",
    "use",
    "two",
    "how",
    "our",
    "work",
    "first",
    "well",
    "way",
    "even",
    "new",
    "want",
    "because",
    "any",
    "these",
    "give",
    "day",
    "most",
    "us",
    "a",
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "i",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "when",
    "make",
    "can",
    "like",
    "time",
    "no",
    "just",
    "him",
    "know",
    "take",
    "person",
    "into",
    "year",
    "your",
    "good",
    "some",
    "could",
    "them",
    "see",
    "other",
    "than",
    "then",
    "now",
    "look",
    "only",
    "come",
    "its",
    "over",
    "think",
    "also",
    "back",
    "after",
    "use",
    "two",
    "how",
    "our",
    "work",
    "first",
    "well",
    "way",
    "even",
    "new",
    "want",
    "because",
    "any",
    "these",
    "give",
    "day",
    "most",
    "us",
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "I",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me",
    "when",
    "make",
    "can",
    "like",
    "time",
    "no",
    "just",
    "him",
    "know",
    "take",
    "person",
    "into",
    "year",
    "your",
    "good",
    "some",
    "could",
    "them",
    "see",
    "other",
    "than",
    "then",
    "now",
    "look",
    "only",
    "come",
    "its",
    "over",
    "think",
    "also",
    "back",
    "after",
    "use",
    "two",
    "how",
    "our",
    "work",
    "first",
    "well",
    "way",
    "even",
    "new",
    "want",
    "because",
    "any",
    "these",
    "give",
    "day",
    "most",
    "us",
    "a",
    "act",
    "active",
    "activity",
    "age",
    "air",
    "amount",
    "answer",
    "anything",
    "apple",
    "area",
    "arm",
    "army",
    "art",
    "ask",
    "attack",
    "baby",
    "back",
    "bad",
    "bag",
    "ball",
    "bank",
    "base",
    "basket",
    "bath",
    "bear",
    "beautiful",
    "bed",
    "bedroom",
    "beer",
    "bell",
    "big",
    "bird",
    "birth",
    "birthday",
    "bit",
    "bite",
    "black",
    "block",
    "blood",
    "blow",
    "blue",
    "board",
    "boat",
    "body",
    "bone",
    "book",
    "border",
    "bottle",
    "bottom",
    "bowl",
    "box",
    "boy",
    "branch",
    "brave",
    "bread",
    "break",
    "breakfast",
    "bridge",
    "brother",
    "brown",
    "brush",
    "burn",
    "business",
    "bus",
    "buy",
    "cake",
    "call",
    "can",
    "candle",
    "cap",
    "car",
    "card",
    "care",
    "carry",
    "case",
    "cat",
    "catch",
    "chair",
    "chance",
    "change",
    "chicken",
    "child",
    "chocolate",
    "choice",
    "city",
    "class",
    "clock",
    "clothes",
    "cloud",
    "coffee",
    "coat",
    "cold",
    "comfortable",
    "common",
    "computer",
    "condition",
    "control",
    "cook",
    "corner",
    "cost",
    "count",
    "country",
    "course",
    "cover",
    "crash",
    "cross",
    "cry",
    "cup",
    "cut",
    "dance",
    "dark",
    "daughter",
    "day",
    "dead",
    "deep",
    "desk",
    "dinner",
    "direction",
    "dish",
    "dog",
    "door",
    "double",
    "draw",
    "dream",
    "dress",
    "drink",
    "drive",
    "drop",
    "dust",
    "duty",
    "ear",
    "earth",
    "east",
    "eat",
    "education",
    "effect",
    "egg",
    "end",
    "equal",
    "entrance",
    "escape",
    "evening",
    "event",
    "examination",
    "example",
    "exercise",
    "eye",
    "face",
    "fact",
    "fail",
    "fall",
    "family",
    "farm",
    "father",
    "fat",
    "fault",
    "fear",
    "feed",
    "feel",
    "female",
    "few",
    "fight",
    "fill",
    "film",
    "finger",
    "finish",
    "fire",
    "fish",
    "fix",
    "floor",
    "flower",
    "fly",
    "fold",
    "food",
    "foot",
    "football",
    "force",
    "form",
    "freedom",
    "friend",
    "front",
    "fruit",
    "fun",
    "funny",
    "future",
    "game",
    "garden",
    "gate",
    "general",
    "gift",
    "give",
    "glad",
    "glass",
    "go",
    "god",
    "gold",
    "good",
    "grandfather",
    "grandmother",
    "grass",
    "great",
    "green",
    "ground",
    "group",
    "hair",
    "half",
    "hall",
    "hand",
    "hat",
    "hate",
    "head",
    "heavy",
    "heart",
    "height",
    "hello",
    "help",
    "hide",
    "high",
    "hit",
    "hold",
    "hole",
    "holiday",
    "home",
    "hope",
    "horse",
    "hospital",
    "hotel",
    "house",
    "hour",
    "hurry",
    "husband",
    "hurt",
    "ice",
    "idea",
    "if",
    "increase",
    "inside",
    "iron",
    "invite",
    "island",
    "it",
    "job",
    "join",
    "juice",
    "jump",
    "keep",
    "key",
    "kill",
    "kind",
    "king",
    "kitchen",
    "knee",
    "knife",
    "ladder",
    "lady",
    "land",
    "laugh",
    "lead",
    "leave",
    "leg",
    "length",
    "lesson",
    "let",
    "letter",
    "library",
    "lie",
    "life",
    "light",
    "lip",
    "list",
    "listen",
    "lock",
    "long",
    "look",
    "love",
    "low",
    "luck",
    "machine",
    "main",
    "make",
    "male",
    "man",
    "many",
    "map",
    "mark",
    "market",
    "matter",
    "meal",
    "meat",
    "medicine",
    "meet",
    "member",
    "mention",
    "method",
    "middle",
    "milk",
    "mind",
    "minute",
    "miss",
    "mistake",
    "mix",
    "model",
    "moment",
    "money",
    "month",
    "morning",
    "most",
    "mother",
    "mountain",
    "mouth",
    "move",
    "music",
    "name",
    "nation",
    "nature",
    "neck",
    "net",
    "news",
    "newspaper",
    "night",
    "noise",
    "north",
    "nose",
    "nothing",
    "notice",
    "number",
    "object",
    "offer",
    "office",
    "oil",
    "one",
    "opposite",
    "orange",
    "order",
    "other",
    "outside",
    "page",
    "pain",
    "paint",
    "pair",
    "paper",
    "parent",
    "park",
    "part",
    "partner",
    "party",
    "pass",
    "past",
    "path",
    "pay",
    "peace",
    "pen",
    "people",
    "period",
    "person",
    "piano",
    "pick",
    "picture",
    "piece",
    "pin",
    "place",
    "plane",
    "plant",
    "plastic",
    "plate",
    "play",
    "plenty",
    "point",
    "police",
    "pool",
    "position",
    "possible",
    "potato",
    "power",
    "present",
    "press",
    "price",
    "private",
    "prize",
    "problem",
    "produce",
    "promise",
    "public",
    "pull",
    "push",
    "put",
    "queen",
    "question",
    "quiet",
    "radio",
    "rain",
    "raise",
    "reach",
    "read",
    "record",
    "red",
    "remove",
    "rent",
    "repair",
    "repeat",
    "reply",
    "report",
    "rest",
    "restaurant",
    "result",
    "return",
    "rice",
    "rich",
    "ride",
    "ring",
    "rise",
    "road",
    "rock",
    "room",
    "round",
    "rule",
    "run",
    "rush",
    "sad",
    "safe",
    "sail",
    "salt",
    "sand",
    "save",
    "school",
    "science",
    "search",
    "seat",
    "second",
    "sell",
    "sentence",
    "serve",
    "sex",
    "shake",
    "shape",
    "share",
    "she",
    "shine",
    "ship",
    "shirt",
    "shoe",
    "shoot",
    "shop",
    "shoulder",
    "show",
    "sick",
    "side",
    "signal",
    "silly",
    "silver",
    "simple",
    "single",
    "sing",
    "sink",
    "sister",
    "size",
    "skill",
    "skin",
    "skirt",
    "sky",
    "sleep",
    "slip",
    "smell",
    "smile",
    "smoke",
    "snow",
    "sock",
    "soft",
    "son",
    "sound",
    "soup",
    "south",
    "space",
    "special",
    "speed",
    "spell",
    "spend",
    "sport",
    "spread",
    "spring",
    "square",
    "stand",
    "star",
    "start",
    "station",
    "stay",
    "steal",
    "step",
    "still",
    "stomach",
    "stop",
    "store",
    "storm",
    "story",
    "street",
    "structure",
    "student",
    "study",
    "stupid",
    "subject",
    "substance",
    "sugar",
    "summer",
    "sun",
    "support",
    "surprise",
    "sweet",
    "swim",
    "table",
    "talk",
    "taste",
    "tea",
    "teach",
    "team",
    "tear",
    "telephone",
    "television",
    "tell",
    "tennis",
    "test",
    "thing",
    "tie",
    "title",
    "today",
    "toe",
    "tomorrow",
    "tonight",
    "tool",
    "tooth",
    "top",
    "total",
    "touch",
    "town",
    "train",
    "travel",
    "tree",
    "trouble",
    "trust",
    "try",
    "turn",
    "type",
    "uncle",
    "unit",
    "use",
    "usual",
    "vegetable",
    "village",
    "voice",
    "visit",
    "wait",
    "wake",
    "walk",
    "wash",
    "watch",
    "water",
    "way",
    "wear",
    "weather",
    "wedding",
    "week",
    "weight",
    "welcome",
    "west",
    "wheel",
    "while",
    "white",
    "wife",
    "will",
    "win",
    "wind",
    "window",
    "wine",
    "winter",
    "wish",
    "woman",
    "wonder",
    "word",
    "work",
    "world",
    "worry",
    "yard",
    "yesterday",
    "you",
    "young",
    "two",
];

var afterError = [];

for (let i = 0; i <= 24; i++) {
    makeWord();

}

box_children.forEach((word) => {
    text += word.innerHTML;
});



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
var char;
var colorChangeId;

function nextCharId() {

    next = currentChar + 1;
    nextId = currentCharId(next);
    return nextId;
}


function changeChar(correct, space, key) {
    colorChangeId = "char" + currentChar.toString();
    char = document.getElementById(colorChangeId);

    if (correct) {
        if (space) {
            currentWord++;
            textTyped = textTyped + ' '
        } else {
            textTyped += text.slice(0, 1);
        }

        textUserTyped += key;
        text = text.slice(1, text.length);
        char.style.color = "#778da9";
        currentChar++;
    } else {


        if (space) {
            afterError.push(currentChar);
            //let currentWordIdVar = curWordId();
            let chare = makeChar(key, true);





            text += key;
            textUserTyped += key;
            textTyped += key;
            curWordId(currentWord).insertAdjacentElement("beforeend", chare);
            curWordId(currentWord).insertBefore(chare, chare.previousElementSibling);
            chare.style.color = "#9e2a2b";



        } else {
            textTyped += text.slice(0, 1)
            textUserTyped += key
            text = text.slice(1, text.length);
            char.style.color = "#9e2a2b";
            currentChar++;
        }
    }

    addBgEl(currentCharId(currentChar));
    rmBgEl(currentCharId(currentChar - 1));
    //underLineEl(currentCharId(currentChar));
    //removeUnderlineEl(currentCharId(currentChar-1));

}

function currentCharId(num) {
    return document.getElementById(("char" + (num.toString())))
}

function curWordId(num) {
    return document.getElementById('word' + num.toString());
}

function randomWord() {
    let random = wordlist[Math.floor(Math.random() * wordlist.length)];
    return random;
}

function prevCharId() {
    try {
        return currentCharId(currentChar).previousElementSibling.id
    } catch (error) {
        return document.getElementById("char" + (currentChar - 1))
    }



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

    let space = makeChar("&nbsp")
    text += " ";
    div.append(space);


    div.className = "word";
    box.append(div);
    idWordIterations++;
}


function makeChar(char, errorChar = false) {
    let chara = document.createElement("h1");
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

var changeBackColor;
var toDelete;

function underLineEl(el) {
    el.style.textDecoration = "underline";
}

function removeUnderlineEl(el) {
    el.style.textDecoration = "none";
}

function addBgEl(el) {
    el.style.backgroundColor = "#1A3858";
}

function rmBgEl(el) {
    el.style.backgroundColor = "#0D1B2A";
}

function deleteChar() {
    changeBackColor = document.getElementById('char' + (currentChar - 1).toString());

    let errorChar = false;
    let keyToBeDeletedId = function() {

        //return currentCharId(currentChar).previousElementSibling.id
        return prevCharId();
    }

    try {

        //we need to have a try statement here becuase 
        //if there isn't a previous element sibling 
        //(in the func above) an error will occur.


        if (keyToBeDeletedId().slice(0, 5) == "chare") {

            errorChar = true;
        }
    } catch (e) {
        //doesn't need to output, this is not an error
    }
    //console.log("errorChar:" + errorChar)



    if (errorChar == false) {
        if (currentChar !== 1) {
            rmBgEl(currentCharId(currentChar));
            addBgEl(currentCharId(currentChar - 1));
        }

        //just for all the regular char and the actual ' '
        console.log('text update var');
        text = textTyped.slice(-1, textTyped.length) + text;
        changeBackColor.style.color = "#415a77";
        currentChar--;


    } else {

        //this is for all of the red char

        //console.log('error delete');

        toDelete = document.getElementById(currentCharId(currentChar).previousElementSibling.id);
        toDelete.parentElement.removeChild(toDelete);



    }

    textTyped = textTyped.slice(0, (textTyped.length) - 1);




    textUserTyped = textUserTyped.slice(0, (textUserTyped.length) - 1);


    if(currentChar == 1){

    }
    else if (document.getElementById(keyToBeDeletedId().innerText == "&nbsp")) {
        currentWord--;
    }

}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 8) {
        deleteChar();
    }
});

window.addEventListener("keypress", (e) => {

    let key = String.fromCharCode(e.keyCode);
    checkKey(key);
});