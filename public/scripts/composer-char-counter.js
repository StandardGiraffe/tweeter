$(document).ready(function () {

  $(".new-tweet form textarea").on("input", function () {

    let charsRemaining = (140 - $(this).val().length);
    const charCounter = $(this).siblings(".counter");

    charCounter.text(charsRemaining);
    if (charsRemaining < 0) {
      charCounter.css({color: "red"});
    } else {
      charCounter.css({color: "black"});
    }

  });

});

//   counter.addEventListener("dblclick", (event) => {
//     console.log(event);
//   })