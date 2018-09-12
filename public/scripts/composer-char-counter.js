$(document).ready(function () {

  $(".new-tweet form textarea").on("input", function () {

    let charsRemaining = (140 - $(this).val().length);
    const charCounter = $(this).siblings(".counter");

    charCounter.text(charsRemaining);
    if (charsRemaining < 0) {
      charCounter.addClass("exceeded-counter");
    } else {
      charCounter.removeClass("exceeded-counter");
    }

  });

});

//   counter.addEventListener("dblclick", (event) => {
//     console.log(event);
//   })