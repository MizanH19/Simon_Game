var gamePattern=[];

var buttonColors=["red","blue","green","yellow"];

var userClickedPattern=[];

$(".btn").click(function(){
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
    // console.log(userClickedPattern)
    // var audio = new Audio("sounds/"+userChosenColor+".mp3");
    // audio.play();
});

var level=0;

var started=false;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
})

$(".start-button").click(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
        $(".start-button").hide();
    }
    else
    $(".start-button").hide();
})

// alert(randomChosenColor);
function nextSequence(){

    level++;
    $("#level-title").text("level "+level);

    userClickedPattern=[];

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
        audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentlevel){

    if(userClickedPattern[currentlevel]==gamePattern[currentlevel])
    console.log("succ");

    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startover();
    }

    if(userClickedPattern.length==gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000)
    }
}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
    $(".start-button").show();
}