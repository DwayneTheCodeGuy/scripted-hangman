var word = ['A','B','A','L','O','N','E'];
var images = ['Hangman-0.png', 'Hangman-1.png', 'Hangman-2.png', 'Hangman-3.png', 'Hangman-4.png', 'Hangman-5.png', 'Hangman-6.png'];
var guesses = [];
var misses = 0;

function updateWord() {
  $("#word").empty();
  word.forEach(function (letter) {
    if (guesses.includes(letter)) {
      $("#word").append(letter);
    } else {
      $("#word").append("_");
    }
  });
}

function updateHangman() {
  $("#hangman").attr("src", images[misses]);
}

function hasWon() {
  return word.every(function (letter) {
    return guesses.includes(letter);
  });
}

function hasLost() {
  if (misses < 6) {
    return false;
  } else {
    return true;
  }
}

function guessLetter(letter) {
  letter = letter.toUpperCase();

  if (guesses.includes(letter)) {
    $("#message").text("You already guessed the letter '" + letter + "'!");
    $("#message").show();
    return;
  }

  guesses.push(letter);

  if (word.includes(letter) === false) {
    misses++;
  }
}

function newGame() {
  guesses = [];
  misses = 0;
  $("#message").hide();
  $("#newgame").hide();
  updateWord();
  updateHangman();
}

$(document).ready(function() {
  newGame();

  $("#newgame").click(newGame);

  $(document).keypress(function(event) {
    $("#message").empty();
    $("#message").hide();

    guessLetter(event.key);

    updateWord();
    updateHangman();

    if (hasWon()) {
      $("#message").text("You won!");
      $("#message").show();
      $("#newgame").show();
    }
    if (hasLost()) {
      $("#message").text("You lost!");
      $("#message").show();
      $("#newgame").show();
    }
  });
});
