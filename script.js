const quizData = [
    {
        question: "what does HTML stand for?",
        options:[
            "Hypertext Transfer Protocol",
            "Hypertext Markup Language", 
            "Hyperlink and Text Markup Language",
            "Hypertext Machine Language"
        ],
        correctAnswer: 1 ,
    },

    {
        question: "Which method is used to add elements to an array in JavaScript?",
        options:[
            "push()",
            "add()", 
            "append()",
            "insert()"
        ],
        correctAnswer: 0 ,
    },

    {
        question: "Which property is used to change the background color in CSS?",
        options:[
            "color",
            "bg-color", 
            "bgColor",
            "background-color"
        ],
        correctAnswer: 3 ,
    },

    {
        question: "Which element is used for the largest heading in HTML?",
        options:[
            "<h2>",
            "<h3>", 
            "<h1>",
            "<h6>"
        ],
        correctAnswer: 2 ,
    },

    {
        question: "Which CSS property is used to change the text color?",
        options:[
            "text-color",
            "color", 
            "font-color",
            "text-style"
        ],
        correctAnswer: 1 ,
    },

    {
        question: "How do you declare a JavaScript variable?",
        options:[
            "variable name",
            "declare name", 
            "var name",
            "define name"
        ],
        correctAnswer: 2 ,
    },

    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        options:[
            "title",
            "src", 
            "alt",
            "longdesc"
        ],
        correctAnswer: 2 ,
    },

    {
        question: "How do you make a list that lists its items with squares in CSS?",
        options:[
            "list-type: square",
            "list-style-type: square", 
            "list-square: true",
            "list-style: square"
        ],
        correctAnswer: 1 ,
    },

    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options:[
            "onchange",
            "onmouseclick", 
            "onclick",
            "onmouseover"
        ],
        correctAnswer: 2 ,
    },
];

let quizquestion = document.querySelector('.question') ;

let answers = document.querySelectorAll('.answer') ;

let input1 = document.querySelector('#a') ;
let input2 = document.querySelector('#b') ;
let input3 = document.querySelector('#c') ;
let input4 = document.querySelector('#d') ;

let option1 = document.querySelector('#option1') ;
let option2 = document.querySelector('#option2') ;
let option3 = document.querySelector('#option3') ;
let option4 = document.querySelector('#option4') ;

let alloptions = [input1,input2,input3,input4] ;

let button = document.querySelector('#btn') ;


console.log((Math.floor(Math.random()*8))+1)
let currentQuiz=0;
let score = 0 ;

const loadQuiz = ()=>{
    const {question,options}=quizData[currentQuiz] ;
    quizquestion.innerText = `${currentQuiz+1}: ${question}` ;
    options.forEach((opt,i)=>{
        window[`option${[i+1]}`].innerText = opt ;
    })  
}

loadQuiz() ;

function getSelectedOption(){
    let answerIndex ;
   answers.forEach((item,i)=>{
    if(item.checked){
        answerIndex = i ;
    }
   })
   return answerIndex ;
}

function deSelectAnswer(){
    answers.forEach((item,i)=>{
        if(item.checked){
            item.checked=false ;
        }
    })
};

let resultSection = document.querySelector('.result') ;

button.addEventListener('click',(e)=>{
    const selectOptionINdex = getSelectedOption() ;

    if(selectOptionINdex===quizData[currentQuiz].correctAnswer){
        score++ ;
    }
    answers.forEach((item,i)=>{
        if(item.checked){
            currentQuiz++ ;
        }
    })

    // currentQuiz++ ;
    if(currentQuiz<quizData.length){
        deSelectAnswer() ;
        loadQuiz() ;
        document.querySelector('.result').classList.remove('active') ;
    }else{
        document.querySelector('.scoreSection').innerText = `${score}/${quizData.length} Correct Answers` ;
        document.querySelector('.quiz-section').style.display='none' ;
        document.querySelector('.result').classList.add('active') ;
    }
})

function reload(){
    document.querySelector('.result').classList.remove('active') ;
    currentQuiz=0 ;
    deSelectAnswer() ;
    loadQuiz() ;
    document.querySelector('.quiz-section').style.display='block' ;
}
