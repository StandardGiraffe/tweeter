const counter = document.getElementsByClassName("counter");

$(document).ready(function () {

  $(".new-tweet form textarea").on("input", function () {
    console.log(`You have ${140 - $(this).val().length} characters left.`);
  });
});

//   counter.addEventListener("dblclick", (event) => {
//     console.log(event);
//   })