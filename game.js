var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started=false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function () {

            $("body").removeClass("game-over");
        }, 300);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence() {

    userClickedPattern = [];

    level += 1;
    $("h1").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * (4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(250).fadeIn(250);

    playSound(randomChosenColour);

}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    $("#" + name).click(function () { audio.play() });
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {

        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


