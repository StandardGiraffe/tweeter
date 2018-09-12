/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// ###########
//  Functions
// ###########

// Escape hazardous text
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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

  // Listens for the tweet submission button.
  $submitButton = $(".new-tweet form")
  $submitButton.submit(function(event) {
    event.preventDefault();
    const $submittedTweet = $(this).serialize();

    // Validation checks:
    let $messageLength = $(this).find("textarea").val().length; // Or the hex values of irregular characters using serialize() sum to funny values.
    if ($messageLength < 1 || !$submittedTweet) {
      alert("Too terse!");
      console.log("Not posted.");
    } else if ($messageLength > 140) {
      alert("Not terse enough!");
      console.log("Not posted.");
    } else {
      $.ajax("/tweets", {
        data: $submittedTweet,
        method: "POST"})
      .then(function () {
        console.log("Tweet Posted");

        // Prepends the most recent tweet (yours) to the top of #old-tweets.
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