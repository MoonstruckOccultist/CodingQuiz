var qBody = document.getElementById('quiz');
var button = document.getElementById('B');
var timer = document.getElementById('timeLeft');
var h1 = qBody.querySelector('h1');
var p = qBody.querySelector("p");
var score = 0;
var qAnswered = 0;
var sBoard = document.getElementById('sBoard');


var highScores = [];

var sLeft = 100;

var guessS = 1;

let QsAndAs = [
    {
        Q: "A && in a Javascript 'if statement' means it will only execute the code if____",
        Cs: {
            1: "Both conditions are true",
            2: "Both conditions are false",
            3: "There's an error",
            4: "It is called on using the variable name"
        },
        A: 1,
    },
    {
        Q: "What does a .then promise method do",
        Cs: {
            1: "Waits until previous function has finished to execute next function",
            2: "Takes the returned results in the previous function and uses that data in the next function",
            3: "Waits until previous function has returned results uses that returned data in the next function",
            4: "I have no #$!@#&% clue"
        },
        A: 3,
    },
    {
        Q: "Which of the following symbols can execute an unnamed function?",
        Cs: {
            1: "=>",
            2: "()",
            3: "!=",
            4: "::::)"
        },
        A: 1,
    },
    {
        Q: "A JS object is defined by two customizible parts what are those parts called?",
        Cs: {
            1: "{Key: 'lock'}",
            2: "{Key: 'Value'}",
            3: "{Name: function}",
            4: "{BODY: SOUL}"
        },
        A: 2,
    },
    {
        Q: "On a website url, which of the following symbols represents a url route?",
        Cs: {
            1: "\\",
            2: "=",
            3: "?",
            4: "/"
        },
        A: 4,
    },
    {
        Q: "In the following example what is X?: switch(X) {code}",
        Cs: {
            1: "Expression",
            2: "Variable",
            3: "Case",
            4: "Object"
        },
        A: 1,
    },
    {
        Q: "In .CSS how do you modify something based on screen size?",
        Cs: {
            1: "if (screen = #px) {}",
            2: "when screen = #px {}",
            3: "@media screen and (max-width: #px) {}",
            4: ":viewport.#px {}"
        },
        A: 3,
    },
    {
        Q: "What is an object method",
        Cs: {
            1: "A named function that is part of an object and can use data from the class it's part of",
            2: "An unnamed function",
            3: "An unnamed function that is part of an object and can use data from the class it's part of",
            4: "Is that like the socratic method?"
        },
        A: 1,
    },
    {
        Q: "What does API stand for",
        Cs: {
            1: "APplication Interface",
            2: "Application Programing Interface",
            3: "Accesible Programing Interface",
            4: "Active Port Import"
        },
        A: 2,
    },
    {
        Q: "What does CSS stand for",
        Cs: {
            1: "Creative Sheets Styling",
            2: "Computing Style Sheet",
            3: "Creative Style Sheet",
            4: "Cascading Style Sheets"
        },
        A: 4,
    },

];
var i = 0;

function startQuiz() {
    qAnswered = 0
    score = 0
    h1.classList.remove("title");
    button.setAttribute('class', 'hide');
    p.setAttribute('class', 'hide');

    if (document.querySelector('.Highscores')) {
        var delScor = document.querySelector(`.Highscores`);
        delScor.remove();
    }

    i = 0;
    var list = document.createElement('ul');
    list.setAttribute('id', 'answers');
    qBody.appendChild(list);
    for (var n = 0; n < 4; n++) {
        var li = document.createElement('li');
        li.setAttribute('class', 'item')
        list.appendChild(li)

        var inp = document.createElement('input');
        inp.setAttribute('id', `${n + 1}`);
        inp.setAttribute('type', 'button');
        inp.setAttribute('class', `aButton`);
        li.appendChild(inp);
    }
    var aContain = document.getElementById('answers')
    aContain.addEventListener("click", function (event) {
        var choice = event.target;
        choice = event.target;
        if (choice.matches("input")) {
            // console.log("choice: " + choice.id);
            checkAnNext(choice.id);
        }
    });
    timer.textContent = sLeft

    showQ();
};


function showQ() {
    h1.textContent = `${QsAndAs[i].Q}`;
    for (var n = 0; n < 4; n++) {
        var indvInp = document.getElementById(`${n + 1}`);
        indvInp.setAttribute('value', `${n + 1}: ${QsAndAs[i].Cs[n + 1]}`);
    }
}

function checkAnNext(ch) {
    guessS = 1;
    // console.log("Answer: " +QsAndAs[i].A);
    if (ch == QsAndAs[i].A) {
        msg.setAttribute('class', 'correct');
        msg.textContent = "CORRECT";
        gTimer;
        score++;
    } else {
        msg.setAttribute('class', 'incorrect');
        msg.textContent = "INCORRECT";
        sLeft = sLeft - 10;
        timer.textContent = sLeft
        gTimer;
    }
    i++;
    qAnswered++;
    // console.log("score: " + score)
    if (qAnswered == QsAndAs.length) {
        enterHS();
    } else {
        // console.log(qAnswered)
        showQ();
    }

}

var gTimer = setInterval(function () {
    if (guessS > 0) {
        guessS--;
    } else {
        msg.setAttribute('class', 'hide');
    }

}, 1000);

function enterHS() {
    var delAns = document.getElementById(`answers`);
    delAns.remove();

    h1.textContent = `YOU SCORED: ${score}/${QsAndAs.length}`;

    var form = document.createElement('form');
    form.setAttribute('id', 'Iform')
    qBody.appendChild(form);

    // var lab = document.createElement('label');
    // lab.setAttribute('for', 'iInput');
    // form.appendChild(lab);
    // lab.textContent = ""

    var initials = document.createElement('input');
    initials.setAttribute('type', 'text');
    initials.setAttribute('id', 'iInput');
    initials.setAttribute('placeholder', 'AAA');
    initials.setAttribute('maxLength', '3');
    initials.setAttribute('size', '3');
    form.appendChild(initials);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (initials.value == "") {
            return;
        }
        console.log(`${initials.value} ${score}`)
        // make the array have both name and score attached in each item, and then sort by highest number all that other shit and display top 10
        const fScore = `${initials.value} ${score}`;
        highScores.push(fScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        // var test = JSON.parse(localStorage.getItem("highScores"));
        // console.log(test);

        viewHS();
    });
}

function viewHS() {
    p.setAttribute('class', 'hide');
    button.setAttribute('class', '')
    
    var delF = document.getElementById('Iform');

    qBody.removeChild(delF);
    qBody.removeChild(button);

    var HSs = document.createElement('ul');
    HSs.setAttribute('class', 'Highscores');
    qBody.appendChild(HSs);


    console.log(highScores);

    for (var x = 0; highScores.length > x && x < 9; x++) {
        var listedScore = document.createElement('li');
        listedScore.setAttribute('id', 'scoreList');
        HSs.appendChild(listedScore)
        listedScore.textContent = highScores[x]
    }

    qBody.appendChild(button)
    button.textContent = "TRY AGAIN?"

}



// console.log(QsAndAs.length);

var storedScores = JSON.parse(localStorage.getItem("highScores"))
if (storedScores !== null) {
    console.log(storedScores);
    highScores = storedScores;
    console.log(highScores);
}

// split the scores array between names and scores and then order them by highest score


button.addEventListener("click", startQuiz);

