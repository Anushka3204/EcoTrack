class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length === 0) {
            return "Underflow";
        }
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    sum() {
        let total = 0;
        this.items.forEach(item => {
            total += item;
        });
        return total;
    }


}

const ecoScore = new Stack();

const quizData = [
    {
        question: "How do you commute to work/ school?",
        type: "radio",
        options: [{ label: "walk", points: 0 },
        { label: "public transport", points: 200 },
        { label: "personal vehicle: two-wheeler", points: 700 },
        { label: "personal vehicle: car", points: 1000 }]
    },
    {
        question: "Do you use public transport?",
        type: "radio",
        options: [{ label: "As much as I can", points: 100 },
        { label: "Sometimes", points: 600 },
        { label: "Never", points: 1000 }]
    },
    {
        question: "Electricity consumed (Divided by the total by number of members in your household)",
        type: "radio",
        options: [{ label: "100 units or less (~Rs. 600)", points: 200 },
        { label: "100 to 300 units (~Rs. 2200)", points: 500 },
        { label: "More than that", points: 2000 }]
    },
    {
        question: "Monthly cooking gas bill (Divided by the total by number of members in your household)",
        type: "radio",
        options: [{ label: "less than 3scm", points: 200 },
        { label: "3 to 8 scm", points: 600 },
        { label: "More than that", points: 1000 }]
    },
    {
        question: "Number of kilometers driven by your personal vehicle (annually) ",
        type: "radio",
        options: [{ label: "I don't have one", points: 0 },
        { label: "5000 kilometers or less", points: 1000 },
        { label: "5000 to 12000 kilometers", points: 2000 },
        { label: "More than that", points: 5000 }]
    },
    {
        question: "Number of airplane trips in a year?",
        type: "text",
        pointsFormula: function (inputValue) {
            if (inputValue < 6) {
                return parseFloat(inputValue) * 1500;
            }
            else {
                return 7000;
            }

        }
    },
    {
        question: "How often do you order out?",
        type: "radio",
        options: [{ label: "Rarely", points: 50 },
        { label: "Once a week", points: 100 },
        { label: "Few times a month", points: 300 },
        { label: "Very Frequently", points: 600 }]
    },
    {
        question: "How often do you recycle?",
        type: "radio",
        options: [{ label: "regularly", points: 0 },
        { label: "sometimes", points: 100 },
        { label: "never", points: 300 }]
    },
    {
        question: "Have you planted any trees (and are looking after them)?",
        type: "radio",
        options: [{ label: "Yes", points: 0 },
        { label: "I have a few plants in my balcony", points: 50 },
        { label: "No", points: 300 }]
    },
    {
        question: "Have you ever participated in a tree plantation drive?",
        type: "radio",
        options: [{ label: "Yes, a bunch", points: 0 },
        { label: "Yes, once or twice", points: 10 },
        { label: "Never", points: 300 }]
    },
    {
        question: "How often do you have animal-based diet?",
        type: "radio",
        options: [{ label: "Never", points: 0 },
        { label: "Rarely", points: 80 },
        { label: "Few times a month", points: 200 },
        { label: "Very Frequently", points: 500 }]
    },
];

let currentQuestion = 0;


const preBtn = document.getElementById("pre-btn");
const nextBtn = document.getElementById("next-btn");
let pointsMeter = document.getElementById("pointsMeter");
const resultDiv = document.querySelector(".result-div");
resultDiv.style.display = "none";
const resultBox = document.querySelector(".result-box");
resultBox.style.display = "none";
const resultText = document.querySelector(".result-text");
resultText.style.display = "none";

function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const questionDiv = document.getElementById("question-div");
    questionDiv.innerHTML = `
    <h4>${questionData.question}</h4>
    ${generateOptions(questionData)}
    `;
    if (currentQuestion === 0) {
        preBtn.disabled = true;
    }
    else {
        preBtn.disabled = false;
    }
    if (currentQuestion === quizData.length - 1) {
        nextBtn.innerHTML = "Submit";
    }
    else {
        nextBtn.innerHTML = "Next"
    }
}

function generateOptions(questionData) {
    let optionsHTML = "";
    if (questionData.type === "radio") {
        questionData.options.forEach((option, index) => {
            optionsHTML += `
            <div class = "form-check">
            <input class = "form-check-input" type = "radio" name = "option" id="option-${index} value="${option}">
            <label class = "form-check-label" for="option-${index}"> 
            ${option.label}
            </label>
            </div>
            `;
        });
    }
    else if (questionData.type === "text") {
        optionsHTML += `
        <input type="text" class="form-control" id="text-option">
        `;
    }

    return optionsHTML
}

displayQuestion();

document.addEventListener("DOMContentLoaded", function () {
    nextBtn.addEventListener("click", function () {
        const questionData = quizData[currentQuestion];
        const selectedOption = document.querySelector(`input[name="option"]:checked`);
        if (questionData.type === "radio") {
            if (!selectedOption) {
                alert("Please select an answer before proceeding to the next question.");
                return;
            }
        } else if (questionData.type === "text") {
            const inputValue = document.getElementById(`text-option`).value.trim();
            if (inputValue === "") {
                alert("Please enter a value before proceeding.");
                return;
            }
        }
        saveAnswer();

        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            submitAnswer();
        }
    });
});

preBtn.addEventListener("click", function () {
    currentQuestion--;
    pointsMeter.value = pointsMeter.value - 10;
    ecoScore.pop();
    displayQuestion();
});

function saveAnswer() {
    const questionData = quizData[currentQuestion];

    if (questionData.type === "radio") {
        const selectedOption = document.querySelector(`input[name="option"]:checked`);
        if (!selectedOption) {
            alert("Please select an answer before proceeding to the next question.");
            return;
        }
        const selectedOptionIndex = parseInt(selectedOption.id.split("-")[1]);
        const selectedOptionPoints = questionData.options[selectedOptionIndex].points;
        console.log("points:", selectedOptionPoints)
        ecoScore.push(selectedOptionPoints);
        pointsMeter.value += 10;


    }
    else if (questionData.type === "text") {
        const inputValue = document.getElementById(`text-option`).value.trim();
        let selectedOptionPoints = questionData.pointsFormula(inputValue);
        console.log("points:", selectedOptionPoints);
        ecoScore.push(selectedOptionPoints);
        pointsMeter.value += 10;

    }
};

function submitAnswer() {
    const container = document.querySelector(".container");
    console.log(ecoScore.sum());
    let percentPoints = (ecoScore.sum() / 19000) * 100;
    let finalPoints = Math.floor(100 - percentPoints);
    container.style.display = "none";
    resultDiv.style.display = "block";
    resultBox.style.display = "block";
    pointsMeter.style.display = "none";
    circularMeter(finalPoints);
    if (finalPoints >= 70) {
        resultText.innerHTML = "Congratulations! You have a great eco-score!";
    }
    else if (finalPoints < 70 && finalPoints > 40) {
        resultText.innerHTML = "Your eco-score is decent, but there's room for improvement.";
    }
    else {
        resultText.innerHTML = "Your eco-score needs improvement. Consider adopting more eco-friendly practices.";
    }
    resultText.style.display = "block";
};

function circularMeter(finalPoints) {
    let circularProgress = document.querySelector(".circular-progress");
    let progressValue = document.querySelector(".progress-value");

    let startValue = 0;
    let endValue = finalPoints;
    let speed = 30;

    if (endValue >= 70) {
        let progress = setInterval(() => {
            result = document.querySelector(".result");
            startValue++;
            result.innerHTML = startValue;
            progressValue.textContent = `${startValue}`;
            circularProgress.style.background = `conic-gradient(#b0f512 ${startValue * 3.6}deg, #ededed 0deg)`;
            if (startValue == endValue) {
                clearInterval(progress);
            }

        }, speed);
    }
    else if (endValue > 40 && endValue < 70) {
        let progress = setInterval(() => {
            result = document.querySelector(".result");
            startValue++;
            result.innerHTML = startValue;
            progressValue.textContent = `${startValue}`;
            circularProgress.style.background = `conic-gradient(#ffed00 ${startValue * 3.6}deg, #ededed 0deg)`;
            if (startValue == endValue) {
                clearInterval(progress);
            }

        }, speed);
    }
    else {
        let progress = setInterval(() => {
            result = document.querySelector(".result");
            startValue++;
            result.innerHTML = startValue;
            progressValue.textContent = `${startValue}`;
            circularProgress.style.background = `conic-gradient(#f42213 ${startValue * 3.6}deg, #ededed 0deg)`;
            if (startValue == endValue) {
                clearInterval(progress);
            }

        }, speed);
    }


}

