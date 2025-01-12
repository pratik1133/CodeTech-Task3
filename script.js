
const questions = [
    {
        question: "What's your favorite activity?",
        options: {
            "Playing chess": "Ron Weasley",
            "Reading books": "Hermione Granger",
            "Flying on a broomstick": "Harry Potter",
            "Plotting revenge": "Draco Malfoy"
        }
    },
    {
        question: "Which house would you prefer?",
        options: {
            "Gryffindor": "Harry Potter",
            "Ravenclaw": "Hermione Granger",
            "Hufflepuff": "Ron Weasley",
            "Slytherin": "Draco Malfoy"
        }
    },
    {
        question: "Choose a magical item:",
        options: {
            "Wand": "Harry Potter",
            "Time Turner": "Hermione Granger",
            "Deluminator": "Ron Weasley",
            "Cursed Necklace": "Draco Malfoy"
        }
    },
    {
        question: "What's your biggest strength?",
        options: {
            "Bravery": "Harry Potter",
            "Intelligence": "Hermione Granger",
            "Loyalty": "Ron Weasley",
            "Ambition": "Draco Malfoy"
        }
    },
    {
        question: "Which pet would you choose?",
        options: {
            "Owl": "Harry Potter",
            "Cat": "Hermione Granger",
            "Rat": "Ron Weasley",
            "Snake": "Draco Malfoy"
        }
    }
];


// Character image mapping
const characterImages = {
    "Harry Potter": "images/harry.jpg",
    "Hermione Granger": "images/hermione.jpg",
    "Ron Weasley": "images/ron.jpg",
    "Draco Malfoy": "https://media.harrypotterfanzone.com/draco-malfoy-holds-up-his-wand.jpg"
};

let currentQuestionIndex = 0;
let characterScores = {
    "Harry Potter": 0,
    "Hermione Granger": 0,
    "Ron Weasley": 0,
    "Draco Malfoy": 0
};

// Shuffle questions
questions.sort(() => Math.random() - 0.5);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const resultEl = document.getElementById("result");
const characterEl = document.getElementById("character");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";

    for (const [option, character] of Object.entries(currentQuestion.options)) {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            characterScores[character]++;
            nextButton.style.display = "block";
        });
        optionsEl.appendChild(button);
    }
    nextButton.style.display = "none";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextButton.style.display = "none";
    resultEl.style.display = "block";

    const topCharacter = Object.keys(characterScores).reduce((a, b) =>
        characterScores[a] > characterScores[b] ? a : b
    );
    characterEl.textContent = topCharacter;

    // Add character image
    const img = document.createElement("img");
    img.src = characterImages[topCharacter];
    img.alt = topCharacter;
    img.style.width = "200px";
    img.style.marginTop = "20px";
    resultEl.appendChild(img);
}

loadQuestion();
