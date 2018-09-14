## Input Box Toaster

Create a function, "howFull", that:
- Checks the contents of the textarea and compares it against the maximum characters allowed (default 140), returning the percentage of the capacity used.

Create a function, "blushNewTweet", that:
- Changes the background-color value of the new tweet box from grey to red depending on the value of howFull().
- Greys out the textarea when howFull >= 100%.

Create a function, "shakeNewTweet" that:
- On each keypress, nudges the textbox randomly in one direction (up, down, left, right) and back by a number of pixels proportionate to how close howFull is to 100%.
- At 100%, on each keystroke, sets opacity of new tweet section to 80% and quickly fades back to 100%.

