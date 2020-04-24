var jumbotron = $(".jumbotron")
var questions = $(".questions")
var questionsButtn = $(".showQ")
var timer = $(".timer")
var questionHere = $("#questionHere")
var bt1 = $("#bt1")
var bt2 = $("#bt2")
var bt3 = $("#bt3")
var bt4 = $("#bt4")
var answerBtn = $(".answersBtn")
var index = 0
var done = 0
var points = 0
var results = $(".results")
var initials = $(".initials")
var pointsShow = $(".pointsShow")
var initilasBtn = $(".initialsBtn")
var lastScore = $(".lastScore")

var timeRemaining = 60
if (timeRemaining < 0) {
    timeRemaining = done;
}

var questionsToAsk = [

    {
        tilte: "How Many Fingers Does Homer Simpson have on each hand in total?",
        choices: ["6", "10", " 12", "8"],
        answer: "8"
    },
    {
        tilte: "who were the PowerPuff Girls?",
        choices: ["Blossome Buttercup and Bubbles", "Paris and Nichole", "Daisy and Peach", "Mary-Kate and Ashley"],
        answer: "Blossome Buttercup and Bubbles"
    },
    {
        tilte: "In Calvin and Hobs",
        choices: ["Calvin is a boy and Hobs is a tiger", "Calvin is a Tiger and Hobs is a boy", "They are both boys", "They are both tigers"],
        answer: "Calvin is a boy and Hobs is a tiger"
    },
    {
        tilte: "How many eyes does Leila from Futurama Have?",
        choices: ["2", "3", "4", "1"],
        answer: "1"
    },

    {
        tilte: "In Ed, Edd and Eddy who was the tallest?",
        choices: ["Ed", "Edd", "Eddy", "Plank"],
        answer: "Ed"
    },
    {
        tilte: "Complete this sentance: Heros in a Half Shell",
        choices: ["Turtle Power ", "Ninja Time", "Cowabunga", "Mutant Hour"],
        answer: "Turtle Power"
    },



    {
        tilte: "In the show Recess what was the Ashleys catchphrase?",
        choices: ["Sizzling", "Fetch", "Scandalous", "Sublime"],
        answer: "Scandalous"
    },

    {
        tilte: "The Boondocks was originally published in what newspaper?",
        choices: ["The New York Times", "The Chicago Tribunal", "The Metro", "The Village Voice"],
        answer: "The Chicago Tribunal"
    }
]
var scoreFromLocal = JSON.parse(localStorage.getItem("scores"))
var thingsToSave = []
if (scoreFromLocal !== null) {
    console.log(scoreFromLocal);

    for (var j = 0; j < scoreFromLocal.length; j++) {
        var pTag = $("<p>")
        pTag.html("Last score " + scoreFromLocal[j].userScore + " By " + scoreFromLocal[j].userInit)
        $(".lastScore").append(pTag)
    }



    for (let j = 0; j < scoreFromLocal.length; j++) {
        thingsToSave.push(scoreFromLocal[j])
    }
}

questions.hide()
results.hide()
questionsButtn.on("click", function (event) {
    event.preventDefault()
    jumbotron.hide()
    questions.show()

    var interval = setInterval(function () {
        timer.html(timeRemaining)
        timeRemaining--

        if (timeRemaining < 0 || index === 7) {
            clearInterval(interval)
        }

    }, 1000)
    showQuestions(index)

})

answerBtn.on("click", function (event) {
    if (event.target.innerHTML === questionsToAsk[index].answer) {

        points++

    } else {

        timeRemaining = timeRemaining - 5

    }


    index++
    if (index > 7) {
        console.log("end of questions");
        questions.hide()
        results.show()
        scorePage()

    } else {

        showQuestions(index)
    }

    console.log(points);


})
function scorePage() {
    pointsShow.html("You scored " + points + " Points")

    initilasBtn.on("click", function (event) {



        thingsToSave.push({
            userInit: initials.val(),
            userScore: points
        })

        localStorage.setItem("scores", JSON.stringify(thingsToSave))
        location.reload()

    })
}

function showQuestions(index) {
    questionHere.html(questionsToAsk[index].tilte)
    bt1.html(questionsToAsk[index].choices[0])
    bt2.html(questionsToAsk[index].choices[1])
    bt3.html(questionsToAsk[index].choices[2])
    bt4.html(questionsToAsk[index].choices[3])

}