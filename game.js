var gamePattern = [];
var userClickedPattern = [];
var level = -1;

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var randomChosenColorId = "#" + randomChosenColor;
  $(randomChosenColorId).fadeOut(50).fadeIn(50);
  var sound = "sounds/" + randomChosenColor + ".mp3";
  playSound(sound);
  level += 1;
  levelText = "level " + level;
  $("h1").text(levelText);
}

function playSound(name) {
  var theSound = new Audio(name);
  theSound.play();
}

$(".btn").click(function (e) {
  var userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  clickSound = "sounds/" + userChosenColor + ".mp3";
  playSound(clickSound);
  userChosenColorId = "#" + userChosenColor;
  animatePress(userChosenColorId);
  var lastIndex = userClickedPattern.length - 1;
  checkAnswer(lastIndex);
});

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  nextSequence();
  $(document).off("keydown");
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //if sequence has ended
    $('h1').text('Correct!');
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any key to start");

    //restart game

    $(document).keydown(function () {
      level = -1;
      gamePattern = [];
      userClickedPattern = [];
      nextSequence();
      $(document).off("keydown");
    });
  }
}
