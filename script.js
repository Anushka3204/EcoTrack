const quizData = [
    {
        question: "How do you commute to work/ school?",
        type: "radio",
        options: [{ label: "walk", points: 30 },
        { label: "public transport", points: 20 },
        { label: "personal vehicle: two-wheeler", points: -10 },
        { label: "personal vehicle: car", points: -30 }]
    },
    {
        question: "Do you use public transport?",
        type: "radio",
        options: [{ label: "regularly", points: 20 },
        { label: "sometimes", points: 10 },
        { label: "never", points: -20 }]
    },
    // {
    //     question: "Electricity consumed (Divided by the total by number of members in your household)",
    //     type: "radio",
    //     options: [{ label: "100  or less (~Rs. 600)", points: 30 },
    //     { label: "Approx. 300 units (~Rs. 2200)", points: 10 },
    //     { label: "More than that", points: -10 }]
    // },
    // {
    //     question: "Monthly gas bill",
    //     type: "radio",
    //     options: [{ label: "", points: 20 },
    //     { label: "", points: 10 },
    //     { label: "", points: -20 }]
    // },
    // {
    //     question: "Number of kilometers driven by your personal vehicle (annually) ",
    //     type: "text",
    //     options: [{ label: "", points: 20 },
    //     { label: "", points: 10 },
    //     { label: "", points: -20 }]

    // },
    {
        question: "Number of airplane trips in a year?",
        type: "radio",
        options: [{ label: "zero", points: 30 },
        { label: "1-3", points: 10 },
        { label: "3-5", points: -10 },
        { label: "more than 5", points: -30 }]
    },
    {
        question: "How often do you order out?",
        type: "radio",
        options: [{ label: "Rarely", points: 20 },
        { label: "Once a week", points: 45 },
        { label: "Few times a month", points: 10 },
        { label: "Very Frequently", points: -15 }]
    },
    {
        // change type here
        question: "How often do you recycle?",
        type: "radio",
        options: [{ label: "regularly", points: 20 },
        { label: "sometimes", points: 10 },
        { label: "never", points: -10 }]
    },
    {
        question: "Have you planted any trees (and are looking after them)?",
        type: "radio",
        options: [{ label: "Yes", points: 20 },
        { label: "I have a few plants in my balcony", points: 10 },
        { label: "No", points: -10 }]
    },
    {
        question: "Have you ever participated in a tree plantation drive?",
        type: "radio",
        options: [{ label: "Yes, a bunch", points: 20 },
        { label: "Yes, once or twice", points: 10 },
        { label: "Never", points: -10 }]
    },
    {
        question: "How often do you have animal-based diet?",
        type: "radio",
        options: [{ label: "Never", points: 25 },
        { label: "Rarely", points: 20 },
        { label: "Few times a month", points: 10 },
        { label: "Very Frequently", points: -20 }]
    },
];

let currentQuestion = 0;
const preBtn = document.getElementById("pre-btn");
const nextBtn = document.getElementById("next-btn");
let totalPoints = 0;
const resultDiv = document.querySelector(".result-div");
resultDiv.style.display = "none";
const resultBox = document.querySelector(".result-box");
resultBox.style.display = "none";

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

        const selectedOption = document.querySelector(`input[name="option"]:checked`);
        if (!selectedOption) {
            alert("Please select an answer before proceeding to the next question.");
            return;
        }
        else{
            saveAnswer();
        }
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            displayQuestion();
        }
        else {
            submitAnswer();
        }
    });
});

preBtn.addEventListener("click", function () {
    currentQuestion--;
    displayQuestion();
});

function saveAnswer() {
    const questionData = quizData[currentQuestion];
    const selectedOption = document.querySelector(`input[name="option"]:checked`);

    if (!selectedOption) {
        alert("Please select an answer before proceeding to the next question.");
        return;
    }

    const selectedOptionIndex = parseInt(selectedOption.id.split("-")[1]);
    const selectedOptionPoints = questionData.options[selectedOptionIndex].points;
    console.log("points:", selectedOptionPoints)
    totalPoints += selectedOptionPoints;
    console.log("total:", totalPoints);
    let pointsMeter = document.getElementById("pointsMeter");
    pointsMeter.value = totalPoints;
    
};

function submitAnswer() {
    const container = document.querySelector(".container");
    container.style.display = "none";
    resultDiv.style.display = "block";
    resultBox.style.display = "block";
    circularMeter(totalPoints);
};

function circularMeter(totalPoints)
{
    let circularProgress = document.querySelector(".circular-progress");
    let progressValue = document.querySelector(".progress-value");

    let startValue = 0;
    let endValue = totalPoints;
    let speed = 30;

    let progress = setInterval(() => {
        result = document.querySelector(".result");
    
        // startValue++;
        if(endValue < 0)
        {
            let modValue = -(endValue);
            if(startValue == modValue){
                clearInterval(progress);
            }
            startValue++;
            result.innerHTML = startValue;
            progressValue.textContent = `-${startValue}`;
            circularProgress.style.background = `conic-gradient(#e8332a ${startValue * 3.6}deg, #ededed 0deg)`;
        }
        else{
            if(startValue == endValue){
                clearInterval(progress);
            }
            startValue++;
            result.innerHTML = startValue;
            progressValue.textContent = `${startValue}`;
            circularProgress.style.background = `conic-gradient(#dfe82a ${startValue * 3.6}deg, #ededed 0deg)`;
            
        }       
    }, speed);

}