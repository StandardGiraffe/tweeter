
// ###########
//  Functions
// ###########

// Escape hazardous text to prevent Cross-Site-Scripting
// (Code taken from Lighthouse Labs example)
function escape(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Factory function to build and return a populated HTML tweet unit using a provided object.
const createTweetElement = function (tweetObject) {

  const $tweet = $("<article>").addClass("tweet");
  const createdDate = new Date(tweetObject.created_at).toLocaleTimeString();

  const header = `<header><img src="${tweetObject.user.avatars.small}" class="avatar"><p class="name-full">${escape(tweetObject.user.name)}</p><p class="name-handle">${escape(tweetObject.user.handle)}</p></header>`

  const content = `<p class="tweet-content">${escape(tweetObject.content.text)}</p>`

  const footer = `<footer><span>${createdDate}</span>
            <span class="action-icons"><i class="fas fa-heart"></i></span><span class="action-icons"><i class="fas fa-exchange-alt"></i></span><span class="action-icons"><i class="fas fa-flag"></i></span></footer>`

  $tweet.append(header);
  $tweet.append(content);
  $tweet.append(footer);

  return $tweet;
}

// Update the webpage by adding all tweets in the database (reverse-chronological order).
const renderTweets = function (tweetsDatabase) {
  for (let i = 0; i < tweetsDatabase.length; i++) {
    let currentTweet = createTweetElement(tweetsDatabase[i]);
    $('#old-tweets').prepend(currentTweet);
  }
}




// ###################
//  Actual Execution:
// ###################

$(document).ready(function() {

  // Fetches tweets from the /tweets page
  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" })
    .then(function (fetchedTweets) {
      renderTweets(fetchedTweets);
    });
  }

  loadTweets();

  const $submitButton = $(".new-tweet form");
  const $composeButton = $("#compose-button");

  // Warning-flag HTML for insertion as needed
  const $warnTooShort = $(`<span class="error"><span id="too-short"><i class="fas fa-exclamation-triangle"></i>TOO TERSE.</span></span>`);
  const $warnTooLong = $(`<span class="error"><span id="too-long"><i class="fas fa-exclamation-triangle"></i>LOQUACIOUS MUCH.</span></span>`);

  // The "WRITE." button toggles new-tweet form visibility/focus.
  $composeButton.on("click", function () {
    $("section.new-tweet").slideToggle(200, function() {
      $(this).find("textarea").focus();
    });
  });

  // The "YES." button attempts to submit content in the new-tweet form to the database, after validation checks.
  $submitButton.submit(function(event) {
    event.preventDefault();
    const $submittedTweet = $(this).serialize();

    // Validation checks:
    $("#too-short").hide(50);
    $("#too-long").hide(50);

    // Workaround to ensure that irregular characters (which would be submitted as their hex values rather than plain text) don't count against the length limit as three characters.
    let $messageLength = $(this).find("textarea").val().length;

    if ($messageLength < 1 || !$submittedTweet) {
      $("#too-short").show(75);

    } else if ($messageLength > 140) {
      $("#too-long").show(75);

    } else {
      $.ajax("/tweets", {
        data: $submittedTweet,
        method: "POST"})
      .then(function () {

        // Reset the tweet counter and removes blush.
        $(".new-tweet").css("background-color", "#eee")
        $("span.counter").text("140");

        // Prepends the most recent tweet to the top of #old-tweets without reloading the whole database.
        let tweetToAdd = {};
        $.ajax("/tweets", { method: "GET" })
        .then(function (fetchedTweets) {
          tweetToAdd = fetchedTweets[fetchedTweets.length - 1];
          $('#old-tweets').prepend(createTweetElement(tweetToAdd));

          // Clears the textbox upon successful submission.
          $(".new-tweet textarea").val("");
        })
      })
    }
  })
})