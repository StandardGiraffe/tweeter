$(document).ready(function () {

  // Assign RainbowVis-JS library
  const angryBlush = new Rainbow();
  angryBlush.setSpectrum("#eeeeee", "#eeeeee", "#d15e38", "#8e0707");



  // **************************
  //  Angry text box functions
  // **************************

  // Calculate the percentage of available characters used as an integer
  const howFull = function (current, max) {
    return Math.floor((current / max)*100);
  }

  // Factory function to build an object with a random direction (0-7) and magnitude (0-1) based on how close to capacity the tweet is, curving up dramatically towards the end for maximum comedy.
  const shakeMaker = function (howFull) {
    const shakeInstructions = {};

    // Sets one a random value between 0 and 7 to represent compass cardinals and diagonals.
    shakeInstructions.direction = Math.floor(Math.random()*7);

    // Creates a magnitude based on the remaining characters available and then cubes it to form a desired exponential curve with a slow onset and then rapid completion.
    shakeInstructions.magnitude = Math.pow((howFull/100), 3);

    return shakeInstructions;
  }

  // Colors the background of the input box based on how close to capacity the tweet is.  Uses RainbowVis-JS library to interpolate colour hex values along the curve.  (In this implementation, the curve is the same as the shake magnitude curve.)
  // https://github.com/anomal/RainbowVis-JS
  const addBlush = function (howFull, curve) {

    currentBlush = howFull * curve;
    $(".new-tweet").css("background-color", "#" + angryBlush.colorAt(currentBlush));

  }

  // Take shakeMaker's object and nudge the input box in the given direction, by the given magnitude, for 40 ms, then return it to it's correct position.
  const shakeNewTweet = function (shakeArray) {

    const nudge = function (direction, magnitude) {

      let inverter = "";

      if (direction === "up" || direction === "right") {
        inverter = "-";
      } else {
        inverter = "";
      }

      if (direction === "up" || direction === "down") {
        $(".new-tweet").css("top", inverter + magnitude.toString() + "em");
      } else if (direction === "left" || direction === "right") {
        $(".new-tweet").css("right", inverter + magnitude.toString() + "em");
      } else {
        console.log("Invalid input.");
      }
    }

    const unNudge = function () {
      $(".new-tweet").css("top", "0em");
      $(".new-tweet").css("right", "0em");
    }

    switch (shakeArray.direction) {
      case 0:
        nudge("up", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
      case 1:
        nudge("up", shakeArray.magnitude);
        nudge("right", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
      case 2:
        nudge("right", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
      case 3:
        nudge("right", shakeArray.magnitude);
        nudge("down", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
      case 4:
        nudge("down", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
      case 5:
        nudge("down", shakeArray.magnitude);
        nudge("left", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
      case 6:
        nudge("left", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
      case 7:
        nudge("left", shakeArray.magnitude);
        nudge("up", shakeArray.magnitude);
        setTimeout(unNudge, 40);
        break;
    }
  }

  // Contents of the User-Rejection Technology Confirmation Box:
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
      </section>`;




  // ##############################
  //  Events on typing start here:
  // ##############################

  $(".new-tweet form textarea").on("input", function () {

    const charsRemaining = (140 - $(this).val().length);
    const capacityUsed = howFull(140 - charsRemaining, 140);
    const quakeReport = shakeMaker(capacityUsed);

    // User-Rejection Technology Warning System Update 5000!
    addBlush(capacityUsed, quakeReport.magnitude);
    shakeNewTweet(quakeReport);
    const charCounter = $(this).siblings(".counter");

    // Standard character count update:
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

