const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const nextBtn = document.getElementById("next-btn");
let shuffledQuestions,
    currentQuestionIndex;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion()
})

let score = 0;

function startGame() {
    console.log("start");
    startBtn
        .classList
        .add("hide-me");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    questions.forEach(question => {
        question
            .answers
            .sort(() => Math.random() - 0.5);
    });
    currentQuestionIndex = 0;
    questionContainer
        .classList
        .remove("hide-me");
    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question
        .answers
        .forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button
                .classList
                .add("btn");
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
            answerButtonsElement.appendChild(button);

        });

}
function resetState() {
    nextBtn
        .classList
        .add("hide-me");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.getElementById("body-quiz"), correct)
    Array
        .from(answerButtonsElement.children)
        .forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })

    if (correct) {
        score++;
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn
            .classList
            .remove("hide-me");
    } else {
        startBtn.innerText = "Restart";
        startBtn
            .classList
            .remove("hide-me");
        totalScore();
        startBtn.addEventListener("click", totalScoreRestart())
    }

}

function totalScoreRestart() {
    score = 0;
}

function totalScore() {
    if (score===shuffledQuestions.length){
    alert("woooooooooow You are the Master Barteneder!, you score " + score + " out of " + shuffledQuestions.length);}
    else if (score >= 30){
        alert("Oooook not bad,you look like a good Barteneder!, you score " + score + " out of " + shuffledQuestions.length);
    }
    else if (score <= 20 ){
        alert("I know was not easy but next time will be better :)!, you score " + score + " out of " + shuffledQuestions.length);}
        else{{
            alert("You know what you are doing or almost :), you score " + score + " out of " + shuffledQuestions.length);}}

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element
            .classList
            .add("correct")
    } else {
        element
            .classList
            .add("wrong")
    }
}
function clearStatusClass(element) {
    element
        .classList
        .remove("correct")
    element
        .classList
        .remove("wrong")
}

const questions = [
    {
        question: "Which one is the right recipe for Negroni ?",
        answers: [
            {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Bianco / Shake method/ Coupette glass / Oran" +
                        "ge garnish ",
                correct: false
            }, {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Rosso / Throwing / Highball glass / Lemon ga" +
                        "rnish ",
                correct: false
            }, {
                text: " 3cl Campari, 3cl Gin, 3cl Vermouth Bianco / Build / Tumbler / Orange garnish",
                correct: false
            }, {
                text: " 3cl Campari,3cl Gin,3cl Vermouth Rosso./ Build / Tumbler / Orange garnish",
                correct: true
            }
        ]
    }, {
        question: "Which one is the right recipe for Margarita ?",
        answers: [
            {
                text: " 5cl White Tequila,1.5cl Contreau ,1.5cl Lime Juice / Shake method/ Coupette gla" +
                        "ss / Salt rim garnish ",
                correct: true
            }, {
                text: " 5cl Aged Tequila,1.5cl Contreau,1.5cl Lemon Juice  /Shake method / Coupette gla" +
                        "ss / Salt rim garnish ",
                correct: false
            }, {
                text: " 5cl aged Tequila,1.5cl Contreau ,1.5cl Lime Juice o / Build / Tumbler / Orange " +
                        "garnish",
                correct: false
            }, {
                text: " 5cl White Tequila,1.5cl Contreau ,1.5cl Lime Juice ./ Build / Tumbler / Salt Ri" +
                        "m garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Tommy's Margarita ?",
        answers: [
            {
                text: " 5cl White Tequila, 1.5cl Contreau ,1 .5cl Lime Juice / Shake method/ Coupette g" +
                        "lass / Salt rim garnish ",
                correct: false
            }, {
                text: " 5cl Aged Tequila, 1.5cl agave syrup,1.5cl Contreau,1.5cl Lemon Juice  /Shake me" +
                        "thod / Coupette glass / Salt rim garnish ",
                correct: false
            }, {
                text: " 5cl aged Tequila, 1.5cl agave syrup , 2cl Lime Juice o / shake/ Tumbler /lime g" +
                        "arnish",
                correct: true
            }, {
                text: " 5cl White Tequila, 1.5cl Contreau , 1.5cl Lime Juice ./ Build / Tumbler / Salt " +
                        "Rim garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Espresso Martini?",
        answers: [
            {
                text: " 5cl Vodka,  1.5cl Kahlua ,1.5cl Contreau , 2.5 cl Espresso / Shake method/ Coup" +
                        "ette glass / Coffee beans garnish ",
                correct: false
            }, {
                text: " 5cl Vodka, 2.5cl Kahlua , 2.5 cl Espresso , 1 cl sugar syrup / Shake method/ Co" +
                        "upette glass / Coffee beans garnish ",
                correct: false
            }, {
                text: " 5cl Vodka, 2.5cl Kahlua , 2.5 cl Espresso / Shake method/ Coupette glass / Coff" +
                        "ee beans garnish ",
                correct: true
            }, {
                text: " 4cl Vodka, 3.5cl Kahlua , 3.5 cl Espresso , 1 cl sugar syrup  / Shake method/ C" +
                        "oupette glass / Coffee beans garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Whiskey Sour ?",
        answers: [
            {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar ,2.5cl Lime Juice ,1 cl Egg white Optional/ Sh" +
                        "ake method/ Coupette glass / Orange  garnish ",
                correct: false
            }, {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar syrup ,2.5cl Lemon Juice ,1 cl Egg white Optio" +
                        "nal / build / Tumbler /Orange peel garnish",
                correct: false
            }, {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar syrup ,2.5cl Lemon Juice ,1 cl Egg white Optio" +
                        "nal / shake/ Tumbler /Orange peel garnish",
                correct: true
            }, {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar syrup ,2.5cl Lemon Juice ,1 cl Egg white Optio" +
                        "nal / shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for New York Sour ?",
        answers: [
            {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar ,2.5cl Lime Juice ,1 cl Egg white Optional,top" +
                        " red wine float / Shake method/ Coupette glass / Orange  garnish ",
                correct: false
            }, {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar syrup ,2.5cl Lemon Juice ,1 cl Egg white Optio" +
                        "nal ,top red wine float  / build / Tumbler /Orange peel garnish",
                correct: false
            }, {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar syrup ,2.5cl Lemon Juice ,1 cl Egg white Optio" +
                        "nal,top red wine float / shake/ Tumbler /Orange peel garnish",
                correct: true
            }, {
                text: " 5cl Bourbon Whiskey, 1.5cl Sugar syrup ,2.5cl Lemon Juice ,1 cl Egg white Optio" +
                        "nal,top red wine float  / shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Negroni Sbagliato ?",
        answers: [
            {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Bianco / Shake method/ Coupette glass / Oran" +
                        "ge garnish ",
                correct: false
            }, {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Rosso / Throwing / Highball glass / Lemon ga" +
                        "rnish ",
                correct: false
            }, {
                text: " 3cl Campari, 3cl Prosecco, 3cl Vermouth Bianco / Build / Tumbler / Orange garni" +
                        "sh",
                correct: false
            }, {
                text: " 3cl Campari,3cl Prosecco,3cl Vermouth Rosso./ Build / Tumbler / Orange garnish",
                correct: true
            }
        ]
    }, {
        question: "Which one is the right recipe for Americano ?",
        answers: [
            {
                text: " 3cl Campari,3cl Soda,3cl Vermouth Bianco / Shake method/ Coupette glass / Orang" +
                        "e garnish ",
                correct: false
            }, {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Rosso / Throwing / Highball glass / Lemon ga" +
                        "rnish ",
                correct: false
            }, {
                text: " 3cl Campari, 3cl Prosecco, 3cl Vermouth Bianco / Build / Tumbler / Orange garni" +
                        "sh",
                correct: false
            }, {
                text: " 3cl Campari,3cl Soda,3cl Vermouth Rosso./ Build / Tumbler / Orange garnish",
                correct: true
            }
        ]
    }, {
        question: "Which one is the right recipe for Boulevardier ?",
        answers: [
            {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Bianco / Shake method/ Coupette glass / Oran" +
                        "ge garnish ",
                correct: false
            }, {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Rosso / Throwing / Highball glass / Lemon ga" +
                        "rnish ",
                correct: false
            }, {
                text: " 3cl Campari, 3cl Gin, 3cl Vermouth Bianco / Build / Tumbler / Orange garnish",
                correct: false
            }, {
                text: " 3cl Campari,3cl bourbon Whiskey,3cl Vermouth Rosso./ Build / Tumbler / Orange g" +
                        "arnish",
                correct: true
            }
        ]
    }, {
        question: "Which one is the right recipe for Garibaldi ?",
        answers: [
            {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Bianco / Shake method/ Coupette glass / Oran" +
                        "ge garnish ",
                correct: false
            }, {
                text: " 3cl Campari,3cl Vodka,3cl Vermouth Rosso / Throwing / Highball glass / Lemon ga" +
                        "rnish ",
                correct: false
            }, {
                text: " 3cl Campari, 3cl Gin, Orange Juice 10 cl / Build / Tumbler / Orange garnish",
                correct: false
            }, {
                text: " 6cl Campari,10 cl Orange Juice./ Shake method / Highball glass / Orange garnish",
                correct: true
            }
        ]
    }, {
        question: "Which one is the right recipe for Yellow Bird ?",
        answers: [
            {
                text: " 4cl Bourbon Whiskey, 1.5cl Sugar ,2.5cl Lime Juice ,4cl Pineapple juice / Shake" +
                        " method/ Coupette glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 4cl Rum, 1cl Sugar ,2cl Lime Juice ,4cl Pineapple juice ,2cl Campari/ Build/ Tu" +
                        "mbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 4cl dark Rum, 1cl Sugar ,2cl Lime Juice ,4cl Pineapple juice ,2cl Campari/ Shak" +
                        "e method/ Tumbler glass / Pineapple  garnish ",
                correct: true
            }, {
                text: " 4cl Vodka, 1cl Sugar ,2cl Lime Juice ,4cl Pineapple juice ,2cl Campari / shake/" +
                        " Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Mary Pickford?",
        answers: [
            {
                text: " 4cl Bourbon Whiskey, 1.5cl Sugar ,2.5cl Lime Juice ,4cl Pineapple juice / Shake" +
                        " method/ Coupette glass / Pineapple  garnish ",
                correct: false
            }, {
                text: "  5cl Vodka, 0.5 cl grenadine ,0.5cl lime,0.5cl Maraschino ,4cl Pineapple juice/" +
                        " Build/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 5cl Vodka, 0.5 cl grenadine ,0.5cl Lime maraschino ,4cl Pineapple juice / Shake" +
                        " method/ Coupette glass / Pineapple  garnish ",
                correct: true
            }, {
                text: " 5cl Vodka, 0.5 cl grenadine ,0.5cl Lime maraschino ,4cl Pineapple juice/ shake/" +
                        " Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Old fashion?",
        answers: [
            {
                text: " 4cl Bourbon Whiskey, 0.5cl Sugar ,5 dash angostura bitter  / Shake method/ Coup" +
                        "ette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  4cl Bourbon Whiskey, 0.5cl Sugar ,5 dash angostura bitter ,4cl Pineapple juice" +
                        "/ Build/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 6cl Bourbon Whiskey, 0.5cl Sugar ,5 dash angostura bitter/ Build/ Tumbler glass" +
                        " / Orange Peel  garnish ",
                correct: true
            }, {
                text: "4cl Bourbon Whiskey, 0.5cl Sugar ,5 dash angostura bitter/ Shake/ Tumbler /lime " +
                        "garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Mojito?",
        answers: [
            {
                text: " 5cl white Cuban Rum, 2 cl Sugar , 2.5 cl Lime juice,Mint leafs 7-8,Splash Soda " +
                        " / Shake method/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  5cl white Cuban Rum, 2 cl Sugar , 2.5 cl Lime juice,Mint leafs 7-8,Splash Soda" +
                        "/ Build/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 5cl white Cuban Rum, 2 cl Sugar , 2.5 cl Lime juice,Mint leafs 7-8,Splash Soda/" +
                        " Build/ Tumbler glass / Mint  garnish ",
                correct: true
            }, {
                text: "5cl white Cuban Rum, 2 cl Sugar , 2.5 cl Lime juice,Mint leafs 7-8,Splash Soda/ " +
                        "Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for French Martini ?",
        answers: [
            {
                text: " 5cl Vodka,2cl Chambord ,5cl Pineapple juice,1cl lime juice / Shake method/ Coup" +
                        "ette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  5cl Vodka,2cl Chambord ,5cl Pineapple juice,/ Build/ Tumbler glass / Pineapple" +
                        "  garnish ",
                correct: false
            }, {
                text: " 5cl Vodka,2cl Chambord ,5cl Pineapple juice, /Shake method/ Coupette glass / Pi" +
                        "neapple  garnish ",
                correct: true
            }, {
                text: "5cl Vodka,2cl Chambord ,5cl Pineapple juice, 0.5cl Sugar ,5 dash angostura bitte" +
                        "r/ Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Daiquiri?",
        answers: [
            {
                text: " 6cl Rum dark, 1.5cl Sugar ,2.5 Lime juice ,Half Lime Shell  //Shake method/ Cou" +
                        "pette glass / Lime  garnish  ",
                correct: false
            }, {
                text: "  6cl  Cuban Rum Blanco, 1.5cl Sugar ,2.5 Lemon juice ,Half Lime Shell/Shake met" +
                        "hod/ Coupette glass / Lime  garnish ",
                correct: false
            }, {
                text: " 6cl  Cuban Rum Blanco, 1.5cl Sugar ,2.5 Lime juice ,Half Lime Shell/Shake metho" +
                        "d/ Coupette glass / Lime  garnish ",
                correct: true
            }, {
                text: " 6cl  Cuban Rum Blanco, 1.5cl Sugar ,2.5 Lime juice ,Half Lime Shell/ Shake/ Tum" +
                        "bler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Manahttan?",
        answers: [
            {
                text: " 4cl Bourbon Whiskey, 0.5cl Sugar ,5 dash angostura bitter ,5 cl Red vermouth / " +
                        "Shake method/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  5cl Canadian Whiskey, 1.5 cl Red Vermouth ,2 dash angostura bitter/ Build/ Tum" +
                        "bler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 5cl Canadian Whiskey, 1.5 cl Red Vermouth ,2 dash angostura bitter/ Mix in Glas" +
                        "s/ Coupette glass / Orange Peel  garnish and Maraschino Cherry",
                correct: true
            }, {
                text: " 5cl Canadian Whiskey, 1.5 cl Red Vermouth ,2 dash angostura bitter/ Shake/ Tumb" +
                        "ler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Blood and Sand?",
        answers: [
            {
                text: "  3 cl scotch whiskey, 3cl Red orange juice ,1.5 cl Red Vermouth,1.5cl Cherry Br" +
                        "andy,0.5cl Lime / Mix in Glass/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  3 cl scotch whiskey, 3cl Red orange juice ,1.5 cl Red Vermouth,1.5cl Cherry Br" +
                        "andy,0.5 cl Lime/ Build/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 3 cl scotch whiskey, 3cl Red orange juice ,1.5 cl Red Vermouth,1.5cl Cherry Bra" +
                        "ndy,0.5 cl Lime/ Shake / Coupette glass / Orange Peel  garnish ",
                correct: true
            }, {
                text: " 3 cl scotch whiskey, 3cl Red orange juice ,1.5 cl Red Vermouth,1.5cl Cherry Bra" +
                        "ndy,0.5 cl Lime/ Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Peniccilin?",
        answers: [
            {
                text: " 5cl Scotch Whiskey,2.5cl Honey syrup ,2.5 cl Lemon Juice,1 piece ginger Well Sm" +
                        "ashed / Shake method/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  4cl Bourbon Whiskey,2.5cl Honey syrup ,2.5 cl Lemon Juice,1 piece ginger Well " +
                        "Smashed/ Build/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 5cl Scotch Whiskey,2.5cl Honey syrup ,2.5 cl Lemon Juice,1 piece ginger Well Sm" +
                        "ashed/ Shake/ Tumbler glass / Orange Peel  garnish ",
                correct: true
            }, {
                text: "5cl Rye Whiskey,2.5cl Honey syrup ,2.5 cl Lemon Juice,1 piece ginger Well Smashe" +
                        "d/ Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Dry Martini?",
        answers: [
            {
                text: " 6cl Vodka, 0.5cl Sugar ,5 dash angostura bitter  / Shake method/ Coupette glass" +
                        " / orange peel  garnish ",
                correct: false
            }, {
                text: "  6cl Gin or Vodka,1.5cl Dry Vermouth / Build/ Tumbler glass / olive garnish ",
                correct: false
            }, {
                text: " 6cl Gin or Vodka,1.5cl Dry Vermouth / Mix in Glass/ Nick & Nora glass / Lemon P" +
                        "eel or Olives  garnish ",
                correct: true
            }, {
                text: "6cl Gin or Vodka,1.5cl Red Vermouth / Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Dirty Martini?",
        answers: [
            {
                text: " 6 cl Gin ,1.5 cl Dry Vermouth ,1.5 cl Olives Water/ Mix in Glass/ Nick & Nora g" +
                        "lass /  Olives  garnish ",
                correct: false
            }, {
                text: " 6cl Gin or Vodka,1.5cl Dry Vermouth/ Build/ Tumbler glass / olive  garnish ",
                correct: false
            }, {
                text: " 6 cl Vodka ,1.5 cl Dry Vermouth ,1.5 cl Olives Water/ Mix in Glass/ Nick & Nora" +
                        " glass /  Olives  garnish ",
                correct: true
            }, {
                text: " 6 cl Vodka ,1.5 cl Olives Water/ Mix in Glass/ Nick & Nora glass /  Olives  gar" +
                        "nish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Vesper Martini?",
        answers: [
            {
                text: " 3 cl Vodka ,3 cl Gin ,2 cl Lillet Blanc / Shake method/ Coupette glass / orange" +
                        " peel  garnish ",
                correct: false
            }, {
                text: " 3 cl Vodka ,3 cl Gin ,2 cl Lillet Blanc/ Shake/ Nick & Nora glass / Olive Garni" +
                        "sh ",
                correct: false
            }, {
                text: " 3 cl Vodka ,3 cl Gin ,2 cl Lillet Blanc/ Shake/ Nick & Nora glass / Lemon Peel " +
                        "Garnish ",
                correct: true
            }, {
                text: "3 cl Vodka ,3 cl Gin ,2 cl Lillet Blanc/ Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Gin Basil Smash?",
        answers: [
            {
                text: " 5cl Gin , 2cl Sugar ,2.5 lime,5-7 Basil Smash / Shake method/ Coupette glass / " +
                        "orange peel  garnish ",
                correct: false
            }, {
                text: "  5cl  Vodka , 2cl Sugar ,2.5 lime,5-7 Basil Smash/ Build/ Tumbler glass /Basil " +
                        " garnish ",
                correct: false
            }, {
                text: " 5cl Gin , 2cl Sugar ,2.5 lime,5-7 Basil Smash/ Shake/ Tumbler glass / Basil and" +
                        " Lime  garnish ",
                correct: true
            }, {
                text: "5cl Gin , 2cl Sugar ,2.5 lime,5-7 Basil Smash Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Whiskey Smash?",
        answers: [
            {
                text: "  5cl Bourbon Whiskey, 2cl Sugar ,2.5 lemon juice ,smash all :1 wedge Lemon ,1 w" +
                        "edge orange, mint 4-5 leafs  / Shake method/ Coupette glass / orange peel  garni" +
                        "sh ",
                correct: false
            }, {
                text: " 5cl Bourbon Whiskey, 2cl Sugar ,1.5 lemon juice ,smash all :1 wedge Lemon ,1 we" +
                        "dge orange, mint 4-5 leafs / Build/ Tumbler glass / mint garnish ",
                correct: false
            }, {
                text: " 5cl Bourbon Whiskey, 2cl Sugar ,1.5 lemon juice ,smash all :1 wedge Lemon ,1 we" +
                        "dge orange, mint 4-5 leafs / Shake/ Tumbler glass / Orange Peel ,mint  garnish ",
                correct: true
            }, {
                text: " 5cl Bourbon Whiskey, 2cl Sugar ,1.5 lemon juice ,smash all :1 wedge Lemon ,1 we" +
                        "dge orange, mint 4-5 leafs / Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Corpse Revoivor #2 ?",
        answers: [
            {
                text: " 2 Cl Gin, 2 Cl Lemon ,2 Cl contreau,2 Cl lillet blanc,5 dash angostura bitter  " +
                        "/ Shake method/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  2 Cl Gin, 2 Cl Lemon ,2 Cl contreau,2 Cl lillet blanc,20 ml Pineapple, Spray A" +
                        "bsinthe / Build/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 2 Cl Gin, 2 Cl Lemon ,2 Cl contreau,2 Cl lillet blanc, Spray Absinthe / Shake/ " +
                        "Coupette glass / Lemon Peel  garnish ",
                correct: true
            }, {
                text: "2 Cl Gin, 2 Cl Lemon ,2 Cl contreau,2 Cl lillet rose/ Shake/ Tumbler /lime garni" +
                        "sh",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Last World?",
        answers: [
            {
                text: "  2 Cl Vodka, 2 Cl Lime ,2 Cl Maraschino,2 Cl Green chartruse / Shake method/ Co" +
                        "upette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  2 Cl Gin, 2 Cl Lime ,2 Cl contreau,2 Cl lillet blanc/ Build/ Tumbler glass / P" +
                        "ineapple  garnish ",
                correct: false
            }, {
                text: " 2 Cl Gin, 2 Cl Lime ,2 Cl Maraschino,2 Cl Green chartruse/ shake/ Coupette glas" +
                        "s / Lime peel garnish ",
                correct: true
            }, {
                text: " 2 Cl Bourbon, 2 Cl Lime ,2 Cl Maraschino,2 Cl Green chartruse/ Shake/ Tumbler /" +
                        "lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Alexander?",
        answers: [
            {
                text: " 3cl Vodka, 3 double cream , 3cl choccolate liqueur  / Shake method/ Coupette gl" +
                        "ass / orange peel  garnish ",
                correct: false
            }, {
                text: " 3cl Brandy, 3 double cream , 3cl choccolate liqueur / Build/ Tumbler glass / no" +
                        "  garnish ",
                correct: false
            }, {
                text: " 3cl cognac, 3 double cream , 3cl choccolate liqueur / shake/ coupette glass / n" +
                        "utmeg  garnish ",
                correct: true
            }, {
                text: "3cl cognac, 3 double cream , 3cl choccolate liqueur / Shake/ Tumbler /cacao garn" +
                        "ish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Grasshopper cocktail?",
        answers: [
            {
                text: " 3cl Creme de Menthe  , 2cl Vodka , 2cl Chocolate liqueur, 2 cl double cream/ Sh" +
                        "ake method/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  3cl Creme de Menthe  , 2cl Vodka , 3cl Chocolate liqueur/ Build/ Tumbler glass" +
                        " / no  garnish ",
                correct: false
            }, {
                text: " 3cl Green Creme de Menthe  , 3cl Double Cream , 3cl White Chocolate liqueur / S" +
                        "hake/ Coupette glass / no  garnish ",
                correct: true
            }, {
                text: "3cl Green Creme de Menthe  , 3cl Double Cream , 3cl Dark Chocolate liqueur / Sha" +
                        "ke/ Coupette glass / no  garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Black Russian?",
        answers: [
            {
                text: " 4cl Bourbon Whiskey,4 cl coffee Liquer,2 cl double cream   / Shake method/ Coup" +
                        "ette glass / orange peel  garnish ",
                correct: false
            }, {
                text: " 4 cl Vodka, 4 cl coffee Liquer,2 cl double cream / Build/ Tumbler glass / coffe" +
                        "e beans  garnish ",
                correct: false
            }, {
                text: " 4.5 cl Vodka, 4.5 cl coffee Liquer/ Build/ Tumbler glass / no  garnish ",
                correct: true
            }, {
                text: "4.5 cl Vodka, 4.5 cl coffee Liquer,1 cl sugar  / Shake/ Tumbler /no garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for White Russian ?",
        answers: [
            {
                text: " 4 cl Vodka, 4 cl coffee Liquer, ,5 dash angostura bitter  / Shake method/ Coupe" +
                        "tte glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  4 cl Vodka, 4 cl coffee Liquer,/ Build/ Tumbler glass / no  garnish ",
                correct: false
            }, {
                text: " 4 cl Vodka, 4 cl coffee Liquer,2 cl whipped double cream / Build / Tumbler glas" +
                        "s / coffee beans  garnish",
                correct: true
            }, {
                text: " 4 cl Vodka, 4 cl coffee Liquer,2 cl double cream / Shake / Tumbler /lime garnis" +
                        "h",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Brandy Crusta ?",
        answers: [
            {
                text: " 4cl Bourbon Whiskey, 1cl contreau ,0.5cl Maraschino , 1 cl sugar syrup, 2.5cl l" +
                        "emon ,2 dash angostura  / Shake/ Coupette glass /  Sugar Rim Orange Garnish ",
                correct: false
            }, {
                text: "  4.5cl Cognac, 1cl Contreau ,0.5cl Maraschino , 1 cl Sugar syrup, 2.5cl Lemon ," +
                        "2 dash angostura / Shake / Coupette glass /  Sugar Rim Orange Garnish ",
                correct: false
            }, {
                text: " 4.5cl Brandy, 1cl Contreau ,0.5cl Maraschino , 1 cl Sugar syrup, 2.5cl Lemon ,2" +
                        " dash angostura / Shake /  Tumbler glass / Sugar Rim Orange Garnish ",
                correct: true
            }, {
                text: " 4.5cl dark Rum, 1cl Contreau ,0.5cl Maraschino , 1 cl Sugar syrup, 2.5cl Lemon " +
                        ",2 dash angostura / Shake/ Tumbler glass / Sugar Rim Orange Garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Side car ?",
        answers: [
            {
                text: " 5cl Tequila, 2.5cl Contreau ,2.5 cl Lemon  / Shake method / Coupette glass / or" +
                        "ange peel  garnish ",
                correct: false
            }, {
                text: "  5cl Dark Rum, 2.5cl Contreau ,2.5 cl Lemon / Build/ Tumbler glass / Pineapple " +
                        " garnish ",
                correct: false
            }, {
                text: " 5cl Cognac, 2.5cl Contreau ,2.5 cl Lemon / Shake / Coupette glass / Sugar Rim O" +
                        "range Garnish ",
                correct: true
            }, {
                text: "5cl Vodka, 2.5cl Contreau ,2.5 cl Lemon/ Shake/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Porto flip?",
        answers: [
            {
                text: "  2.5 cl Cognac ,4.5 cl Red Porto ,1 Full egg ,1 cl sugar ,2cl Whipped Cream / S" +
                        "hake method/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: "  2.5 cl Brandy ,4.5 cl Red Porto ,1 Full egg ,1 cl sugar ,2cl Whipped Cream/ Bu" +
                        "ild/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: " 2.5 cl Coganc ,4.5 cl Red Porto ,1 Full egg ,1 cl sugar / Shake/ Coupette glass" +
                        " / Orange Peel  garnish ",
                correct: true
            }, {
                text: " 2.5 cl Coganc ,4.5 cl Red Porto ,1 Full egg ,1 cl sugar/ Shake/ Tumbler /lime g" +
                        "arnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Hanky Panky?",
        answers: [
            {
                text: "  3 cl Vodka , 3cl White Vermouth,3 cl Fernet brancar  / Shake method/ Coupette " +
                        "glass / orange peel  garnish ",
                correct: false
            }, {
                text: " 3 cl Gin , 3cl White Vermouth,3 cl Fernet branca / Stir/ Nick & Nora glass / Or" +
                        "ange Peel  garnish ",
                correct: false
            }, {
                text: " 3 cl Gin , 3cl Red Vermouth,3 cl Fernet branca / Stir/ Nick & Nora glass / Oran" +
                        "ge Peel  garnish ",
                correct: true
            }, {
                text: " 3 cl Bourbon Whiskey , 3cl White Vermouth,3 cl Fernet branca/ Shake/ Tumbler /l" +
                        "ime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Gimlet?",
        answers: [
            {
                text: "  6cl anejo Tequila, 3cl Lime cordial / Shake/ Coupette glass / Lime Peel  garni" +
                        "sh ",
                correct: false
            }, {
                text: " 6cl white Rum , 3cl Lime cordial / Shake/ Coupette glass / Lime Peel  garnish ",
                correct: false
            }, {
                text: " 6cl Gin , 3cl Lime cordial / Shake/ Coupette glass / Lime Peel  garnish ",
                correct: true
            }, {
                text: " 6cl Vodka , 3cl Lime cordial / Shake/ Coupette glass / Lime Peel  garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Charlie Chaplin?",
        answers: [
            {
                text: " 3 cl Apricot brandy , 3 cl  gin , 3 cl Lemon juice/ Shake/ coupette glass / Ora" +
                        "nge Peel  garnish ",
                correct: false
            }, {
                text: " 3 cl Apricot brandy , 3 cl Sloe gin , 3 cl Lemon juice/ Build/ Tumbler glass / " +
                        "Orange Peel  garnish ",
                correct: false
            }, {
                text: " 3 cl Apricot brandy , 3 cl Sloe gin , 3 cl Lime juice/Shake/ coupette glass / O" +
                        "range Peel  garnish ",
                correct: true
            }, {
                text: " 3 cl Cognac , 3 cl Sloe gin , 3 cl lemon juice/Shake/ coupette glass / Orange P" +
                        "eel  garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Mai Thai?",
        answers: [
            {
                text: " 3cl Dark Rum , 3 cl White Rum, 1 cl contreau ,2 cl Orgreat syrup, 2.5 cl Lime j" +
                        "uice / Shake method/ Coupette glass / orange peel  garnish ",
                correct: false
            }, {
                text: " 3cl Dark Rum , 3 cl White Rum, 1 cl contreau ,2 cl Orgreat syrup, 2.5 cl Lime j" +
                        "uice, 4cl Pineapple juice/ Build/ Tumbler glass / Pineapple  garnish ",
                correct: false
            }, {
                text: "3cl Dark Rum , 3 cl White Rum, 1 cl contreau ,2 cl Orgreat syrup, 2.5 cl Lime ju" +
                        "ice /Shake / Tumbler glass / Dark Rum Float Lime,Mint garnish ",
                correct: true
            }, {
                text: "5cl Bourbon Whiskey, 1 cl contreau ,2 cl Orgreat syrup, 2.5 cl Lime juice/ Shake" +
                        "/ Tumbler /lime garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Pina Colada?",
        answers: [
            {
                text: "  5 cl Coconut Rum ,9 cl Pineapple juice, 3cl Double cream  / Shake/ Hurricane g" +
                        "lass / Pineapple  garnish  ",
                correct: false
            }, {
                text: " 5 cl White Rum ,9 cl Pineapple juice, 3cl coconut water  / Shake/ Hurricane gla" +
                        "ss / Pineapple  garnish  ",
                correct: false
            }, {
                text: " 5 cl White Rum ,9 cl Pineapple juice, 3cl coconut milk cream  / Shake/ Hurrican" +
                        "e glass / Pineapple  garnish ",
                correct: true
            }, {
                text: " 5 cl White Tequila ,9 cl Pineapple juice, 3cl coconut milk cream  / Shake/ Hurr" +
                        "icane glass / Pineapple  garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Caipirinha?",
        answers: [
            {
                text: " 6cl  Cachaça, 3 cl  Lemon Juice, 2.5 cl sugar syrup/ Build/ Tumbler glass / Lem" +
                        "on,Lime  garnish ",
                correct: false
            }, {
                text: " 6cl  Cachaça, 2.5 cl  Lime Juice, 3-4 Bar spoon white caster sugar/ Build/ Tumb" +
                        "ler glass / Lemon,Lime  garnish ",
                correct: false
            }, {
                text: " 6cl  Cachaça, 1 Lime crushed, 3-4 Bar spoon white caster sugar /Build/ Tumbler " +
                        "glass / Lemon,Lime  garnish ",
                correct: true
            }, {
                text: " 6cl Vodka, 2.5 cl  Lime Juice, 3-4 Bar spoon white caster sugar Build/ Tumbler " +
                        "glass / Lemon,Lime  garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Hugo?",
        answers: [
            {
                text: "   5 cl Edelflower Liqueur, 80 ml White Wine,Top with Soda / Build/ Wine glass /" +
                        " Mint and Lime  Garnish  ",
                correct: false
            }, {
                text: "   5 cl Edelflower Liqueur, 80 ml White Wine / Build/ Wine glass / Mint and Lime" +
                        "  Garnish ",
                correct: false
            }, {
                text: " 4 cl Edelflower Liqueur, 80 ml Prosecco / Build/ Wine glass / Mint and Lime  Ga" +
                        "rnish ",
                correct: true
            }, {
                text: " 4 cl Edelflower syrup, 80 ml Prosecco / Build/ Wine glass / Mint and Lime  Garn" +
                        "ish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for French 75?",
        answers: [
            {
                text: " 3 cl Gin , 1.5 cl Sugar syrup , 1.5 cl Lime juice,top Champagne/ Shake method/ " +
                        "Coupette glass / Lemon peel  garnish",
                correct: false
            }, {
                text: " 3 cl Vodka , 1.5 cl Sugar syrup , 1.5 cl Lemon juice,top Champagne/ Shake metho" +
                        "d/ Coupette glass / Lemon peel  garnish ",
                correct: false
            }, {
                text: " 3 cl Gin , 1.5 cl Sugar syrup , 1.5 cl Lemon juice,top Champagne/ Shake method/" +
                        " Coupette glass / Lemon peel  garnish",
                correct: true
            }, {
                text: "3 cl Gin , 1.5 cl Sugar syrup , 1.5 cl Lemon juice,Top Prosecco/ Shake method/ C" +
                        "oupette glass / Lemon peel  garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Prince of Wales?",
        answers: [
            {
                text: " 3cl Vodka,0.5 cl Dom benedectine,0.5 cl Maraschino ,0.5 cl Demerara syrup ,3 cl" +
                        " Champagne,2 dash angostura bitter,1 Piece of pineapple/ Build/  glass / Pineapp" +
                        "le  garnish ",
                correct: false
            }, {
                text: "  3cl Gin,0.5 cl Dom benedectine,0.5 cl Maraschino ,0.5 cl Demerara syrup ,3 cl " +
                        "Champagne,2 dash angostura bitter,1 Piece of pineapple/ Build/  glass / Pineappl" +
                        "e  garnish ",
                correct: false
            }, {
                text: " 3cl Cognac,0.5 cl Dom benedectine,0.5 cl Maraschino ,0.5 cl Demerara syrup ,3 c" +
                        "l Champagne,2 dash angostura bitter,1 Piece of pineapple/ Build/  glass / Pineap" +
                        "ple  garnish ",
                correct: true
            }, {
                text: "3cl Rye whiskey,0.5 cl Dom benedectine,0.5 cl Maraschino ,0.5 cl Demerara syrup " +
                        ",3 cl Champagne,2 dash angostura bitter,1 Piece of pineapple/ Build/  glass / Pi" +
                        "neapple  garnish",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Royal Bermuda Yacht Club?",
        answers: [
            {
                text: "5cl Tequila ,2.5cl lime juice , 2.5cl falernum,1.5 cl Orange liqueur / Shake/ Tu" +
                        "mbler glass / Lime  garnish ",
                correct: false
            }, {
                text: "5cl dark Rum ,2.5cl lime juice ,2.5 cl Orange liqueur ,1cl Amaretto liqueur/ Sha" +
                        "ke/ Tumbler glass / Lime  garnish ",
                correct: false
            }, {
                text: "5cl dark Rum ,2.5cl lime juice , 2.5cl falernum,1.5 cl Orange liqueur / Shake/ T" +
                        "umbler glass / Lime  garnish ",
                correct: true
            }, {
                text: "5cl Coganc ,2.5cl lime juice , 2.5cl falernum,1.5 cl Orange liqueur / Shake/ Tum" +
                        "bler glass / Lime  garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Bellini ?",
        answers: [
            {
                text: "  3cl White Peach puree, 9cl Champagne / Mix in Glass/ Coupette glass / Peach   " +
                        "garnish  ",
                correct: false
            }, {
                text: "  3cl White Peach puree,9cl Prosecco / Shake/ Coupette glass / Peach   garnish  ",
                correct: false
            }, {
                text: " 3cl White Peach puree,9cl Prosecco / Mix in Glass/ Coupette glass / Peach garni" +
                        "sh ",
                correct: true
            }, {
                text: " 3cl Strawberry puree,9cl Prosecco / Mix in Glass/ Coupette glass / starwberry  " +
                        "garnish ",
                correct: false
            }
        ]
    }, {
        question: "Which one is the right recipe for Rossini ?",
        answers: [
            {
                text: " 3cl Coconut puree,9cl Prosecco / Mix in Glass/ Coupette glass / Peach garnish ",
                correct: false
            }, {
                text: " 3cl Pineapple puree,9cl Prosecco / Mix in Glass/ Coupette glass / Peach garnish" +
                        " ",
                correct: false
            }, {
                text: " 3cl Strawberry puree,9cl Prosecco / Mix in Glass/ Coupette glass / Strawberry g" +
                        "arnish ",
                correct: true
            }, {
                text: "3cl White Peach puree,9cl Prosecco / Mix in Glass/ Coupette glass / Peach garnis" +
                        "h",
                correct: false
            }
        ]
    }

]