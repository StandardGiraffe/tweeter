$(document).ready(function () {

  // Import rainbowvis library
  const angryBlush = new Rainbow();
  angryBlush.setSpectrum("#eeeeee", "#d15e38", "#d15e38", "#8e0707");



  // **************************
  //  Angry text box functions
  // **************************

  // Calculate the percentage of available characters used as an integer
  const howFull = function (current, max) {
    return Math.floor((current / max)*100);
  }

  // Build an object with a random direction (0-7) and magnitude (0-1) based on how close to capacity the tweet is, curving dramatically towards the end for maximum comedy.
  const shakeMaker = function (howFull) {
    const shakeInstructions = {};

    // Sets one a random value between 0 and 7 to represent compass directions
    shakeInstructions.direction = Math.floor(Math.random()*7);

    shakeInstructions.magnitude = Math.pow((howFull/100), 3);

    return shakeInstructions;
    // returns an object with direction and magnitude
  }

  // Colors the background of the input box based on how close to capacity the tweet is.  Uses RainbowVis-JS library to interpolate colours along the curve.  (In this example, the curve is the same as the shake magnitude curve.)
  // https://github.com/anomal/RainbowVis-JS
  const addBlush = function (howFull, curve) {

    currentBlush = howFull * curve;
    // currentBlush = howFull * shakeMaker(howFull).magnitude;

    $(".new-tweet").css("background-color", "#" + angryBlush.colorAt(currentBlush));
  }

  // Take shakeMaker's object and nudge the input box in the given direction, by the given magnitude, for 40 ms, then return it to it's correct position.
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

  // Contents of the User-Rejection Box
  const rejectionMessage = `      <section class="reject-user">
        <span class="dictionary-definition">
          <p>
            <span class="word"><a href="https://www.merriam-webster.com/dictionary/terse">terse</a></span> <span class="pronunciation">\ˈtərs\</span>  <span class="part-of-speech">(adj.)</span><br><span class="definition">1 : using few words : devoid of superfluity<br>2 : smoothly elegant : polished</span>
          </p>
        </span>
        <span class="rejection-message">
          <p><i class="fas fa-user-times"></i>  USER REJECTED.</span>
          </p>
        </span>
      </section>`


  // ##############################
  //  Events on typing start here:
  // ##############################

  $(".new-tweet form textarea").on("input", function () {

    let charsRemaining = (140 - $(this).val().length);
    addBlush(howFull(140 - charsRemaining, 140), shakeMaker(howFull(140 - charsRemaining, 140)).magnitude);
    shakeNewTweet(shakeMaker(howFull(140 - charsRemaining, 140)));
    const charCounter = $(this).siblings(".counter");

    charCounter.text(charsRemaining);

    if (charsRemaining < -4) {
      // Too far!
      $("section.new-tweet").remove();
      $("main.container").prepend(rejectionMessage);


    } else if (charsRemaining < 0) {
      // Redden the counter
      charCounter.addClass("exceeded-counter");

    } else {
      // Blacken the counter
      charCounter.removeClass("exceeded-counter");
    }

  });

});

