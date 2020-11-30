
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keypress(function()
{
    if (!started) 
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function()
{
    var buttonPushed = this.id;    
    userPattern.push(buttonPushed);

    clickAnimations(buttonPushed);
    playSounds(buttonPushed);
    checkSequence(userPattern.length-1);
});

function checkSequence(currentLevel)
{
    if (gamePattern[currentLevel] === userPattern[currentLevel])
    {
        if (userPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence(); 
            },1000);  
        } 
    }
    else
    {
        playSounds("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        level = 0;
        gamePattern = [];
        started = false;
    }
}

function nextSequence()
{
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level); 

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSounds(randomChosenColor);     
}

function playSounds(btn)
{
    var audio = new Audio("sounds/" + btn + ".mp3");
    audio.play(); 
}

function clickAnimations(btn)
{
    $("#" + btn).addClass("pressed");

    setTimeout(function () 
    {
        $("#" + btn).removeClass("pressed");
    }, 100);
}