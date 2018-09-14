$(document).ready(function () {

  // Shaker functions

  const howFull = function (current, max) {
    return Math.floor((current / max)*100);
  }

  const shakeMaker = function (howFull) {
    const shakeInstructions = {};

    // Sets one a random value between 0 and 7 to represent compass directions
    shakeInstructions.direction = Math.floor(Math.random()*7);

    shakeInstructions.magnitude = Math.pow((howFull/100), 3);

    return shakeInstructions;
    // returns an object with direction and magnitude
  }

  const shakeNewTweet = function (shakeArray) {
    switch (shakeArray.direction) {
      case 0:
        $(".new-tweet").css("top", "-" + (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {$(".new-tweet").css("top", "0em")}, 40);
        break;
      case 1:
        $(".new-tweet").css("top", "-" + (shakeArray.magnitude).toString() + "em");
        $(".new-tweet").css("right", "-" + (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {
          $(".new-tweet").css("top", "0em");
          $(".new-tweet").css("right", "0em");
        }, 40);
        break;
      case 2:
        $(".new-tweet").css("right", "-" + (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {
          $(".new-tweet").css("right", "0em");
        }, 40);
        break;
      case 3:
        $(".new-tweet").css("top", (shakeArray.magnitude).toString() + "em");
        $(".new-tweet").css("right", "-" + (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {
          $(".new-tweet").css("top", "0em");
          $(".new-tweet").css("right", "0em");
        }, 40);
        break;
      case 4:
        $(".new-tweet").css("top", (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {
          $(".new-tweet").css("top", "0em");
        }, 40);
        break;
      case 5:
        $(".new-tweet").css("top", (shakeArray.magnitude).toString() + "em");
        $(".new-tweet").css("right", (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {
          $(".new-tweet").css("top", "0em");
          $(".new-tweet").css("right", "0em");
        }, 40);
        break;
      case 6:
        $(".new-tweet").css("right", (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {
          $(".new-tweet").css("right", "0em");
        }, 40);
        break;
      case 7:
        $(".new-tweet").css("top", "-" + (shakeArray.magnitude).toString() + "em");
        $(".new-tweet").css("right", (shakeArray.magnitude).toString() + "em");
        setTimeout(() => {
          $(".new-tweet").css("top", "0em");
          $(".new-tweet").css("right", "0em");
        }, 40);
        break;
    }
  }


  $(".new-tweet form textarea").on("input", function () {

    let charsRemaining = (140 - $(this).val().length);
    shakeNewTweet(shakeMaker(howFull(140 - charsRemaining, 140)));
    const charCounter = $(this).siblings(".counter");

    charCounter.text(charsRemaining);
    if (charsRemaining < 0) {
      charCounter.addClass("exceeded-counter");
    } else {
      charCounter.removeClass("exceeded-counter");
    }

  });

});

