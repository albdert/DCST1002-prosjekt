//this would be the object shape for storing the questions  
 //you can change the questions to your own taste or even add more questions..
const questions = [
    {
        question: "Hva bør du gjøre med PC-en når du går fra den?",
        optionA: "La den stå åpen",
        optionB: "Skru av skjermen",
        optionC: "Låse den med Windows + L",
        optionD: "Trekke ut strømledningen",
        correctOption: "optionC"
    },

    {
        question: "Hva er et godt kjennetegn på en falsk e-post?",
        optionA: "Den har alltid mange bilder",
        optionB: "Den ber deg trykke på en mistenkelig lenke",
        optionC: "Den kommer fra en venn",
        optionD: "Den har kort tekst",
        correctOption: "optionB"
    },

    {
        question: "Hva bør du gjøre hvis du får en SMS med en rar lenke?",
        optionA: "Trykke på den for å se hva som skjer",
        optionB: "Slette meldingen",
        optionC: "Sende den videre til en venn",
        optionD: "Svaret spiller ingen rolle",
        correctOption: "optionB"
    },

    {
        question: "Hvorfor bør du ikke bruke samme passord på alle tjenester?",
        optionA: "Det er kjedelig",
        optionB: "Da kan en angriper få tilgang til alt hvis ett passord blir lekket",
        optionC: "Passordene blir for lange",
        optionD: "Det er vanskelig å huske",
        correctOption: "optionB"
    },

    {
        question: "Hva er en enkel måte å lage et sterkt passord?",
        optionA: "Bruke fødselsdatoen din",
        optionB: "Bruke navnet ditt",
        optionC: "Bruke en passordfrase med flere ord",
        optionD: "Bruke bare tall",
        correctOption: "optionC"
    },

    {
        question: "Hva bør du gjøre med ukjente USB-minnepinner du finner?",
        optionA: "Koble dem til PC-en for å sjekke innholdet",
        optionB: "Gi dem til IT-ansvarlig",
        optionC: "Bruke dem til lagring",
        optionD: "Kaste dem i søpla",
        correctOption: "optionB"
    },

    {
        question: "Hva er tofaktorautentisering (2FA)?",
        optionA: "To passord på rad",
        optionB: "Et ekstra sikkerhetslag, f.eks. en kode på mobilen",
        optionC: "En metode for å lagre passord",
        optionD: "En type virusbeskyttelse",
        correctOption: "optionB"
    },

    {
        question: "Hva er en god vane når du lager passord?",
        optionA: "Bruke minst 16 tegn",
        optionB: "Bruke navnet på barnebarnet ditt",
        optionC: "Bruke telefonnummeret ditt",
        optionD: "Bruke fødselsdatoen din",
        correctOption: "optionA"
    },

    {
        question: "Hva bør du gjøre hvis du er usikker på en lenke i en e-post?",
        optionA: "Trykke på den for å sjekke",
        optionB: "Navigere til nettsiden selv via nettleseren",
        optionC: "Sende den til en venn",
        optionD: "Ignorere den og håpe det går bra",
        correctOption: "optionB"
    },

    {
        question: "Hva er en enkel måte å beskytte privat informasjon på?",
        optionA: "Bruke sterke passord og låse PC-en",
        optionB: "Dele passord med venner",
        optionC: "Skrive passord på en lapp på skjermen",
        optionD: "Aldri oppdatere PC-en",
        correctOption: "optionA"
    }
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question
let numAttempts = 1 //antall forsøk denne browser session

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions();
    const currentQuestion = shuffledQuestions[index];
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

    // Remove all highlight classes from options
    document.querySelectorAll('.option').forEach(label => {
        label.classList.remove('selected', 'correct', 'wrong');
    });
}
// Highlight selected option on click
document.querySelectorAll('.option').forEach(label => {
    label.addEventListener('click', function() {
        document.querySelectorAll('.option').forEach(l => l.classList.remove('selected'));
        this.classList.add('selected');
        // Also check the radio input
        const input = this.querySelector('input[type="radio"]');
        if (input) input.checked = true;
    });
});


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber];
    const currentQuestionAnswer = currentQuestion.correctOption;
    const options = document.getElementsByName("option");
    let correctLabel = null;
    let selectedLabel = null;
    let selectedValue = null;

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctLabel = option.labels && option.labels[0] ? option.labels[0] : null;
        }
        if (option.checked) {
            selectedLabel = option.labels && option.labels[0] ? option.labels[0] : null;
            selectedValue = option.value;
        }
    });

    // If no option selected, show modal
    if (!selectedLabel) {
        document.getElementById('option-modal').style.display = "flex";
        return;
    }

    // Remove previous highlight classes
    document.querySelectorAll('.option').forEach(label => {
        label.classList.remove('selected', 'correct', 'wrong');
    });

    // Show correct/wrong highlight
    if (selectedValue === currentQuestionAnswer) {
        if (selectedLabel) selectedLabel.classList.add('correct');
        playerScore++;
    } else {
        if (selectedLabel) selectedLabel.classList.add('wrong');
        if (correctLabel) correctLabel.classList.add('correct');
        wrongAttempt++;
    }
    indexNumber++;
    setTimeout(() => {
        questionNumber++;
    }, 1000);
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    document.querySelectorAll('.option').forEach(label => {
        label.classList.remove('selected', 'correct', 'wrong');
    });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Dette gikk ikke så bra, du må øve mer!"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Du har noe kontroll, men bør øve litt mer."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Du har god kontroll!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('number-attempts').innerHTML = numAttempts
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    numAttempts += 1
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
