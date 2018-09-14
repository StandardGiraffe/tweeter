
// Create a function, "howFull", that:
// - Checks the contents of the textarea and compares it against the maximum characters allowed (default 140), returning the percentage of the capacity used.

// Create a function, "blushNewTweet", that:
// - Changes the background-color value of the new tweet box from grey to red depending on the value of howFull().
// - Greys out the textarea when howFull >= 100%.

// Create a function, "shakeNewTweet" that:
// - On each keypress, nudges the textbox randomly in one direction (up, down, left, right) and back by a number of pixels proportionate to how close howFull is to 100%.
// - At 100%, on each keystroke, sets opacity of new tweet section to 80% and quickly fades back to 100%.

const howFull = function (current, max) {
  console.log(Math.floor((current / max)*100));
  return Math.floor((current / max)*100);
}

const shakeMaker = function (howFull) {
  const shakeInstructions = {};

  // Sets one a random value between 0 and 7 to represent compass directions
  shakeInstructions.direction = Math.floor(Math.random()*7);

  shakeInstructions.magnitude = Math.pow((howFull/100), 3);

  console.log(shakeInstructions);
  return shakeInstructions;
  // returns an object with direction and magnitude
}

// shakeMaker(10);
// shakeMaker(20);
// shakeMaker(30);
// shakeMaker(40);
// shakeMaker(50);
// shakeMaker(60);
// shakeMaker(70);
// shakeMaker(80);
// shakeMaker(90);
// shakeMaker(100);

const shakeNewTweet = function (shakeArray) {
  // takes an object with two values: direction: <0-3>, magnitude: <em value>;
}