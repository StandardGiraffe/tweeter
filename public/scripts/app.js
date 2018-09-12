/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// ###########
//  Functions
// ###########

const createTweetElement = function (tweetObject) {

  // const $tweetArticle = $("<article class='tweet'>");
  const $tweet = $("<article>").addClass("tweet");
  const createdDate = new Date(tweetObject.created_at).toLocaleTimeString();

  const header = `<header><img src="${tweetObject.user.avatars.small}" class="avatar"><p class="name-full">${tweetObject.user.name}</p><p class="name-handle">${tweetObject.user.handle}</p></header>`

  const content = `<p class="tweet-content">${tweetObject.content.text}</p>`

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
    $('#old-tweets').append(currentTweet);
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

  // Renders all tweets in the "database" to the bottom of the tweet list.
  renderTweets(tweetData);

  // Listens for the tweet submission button.
  $submitButton = $(".new-tweet form")
  $submitButton.submit(function(event) {
    event.preventDefault();
    const $submittedTweet = $(this).serialize();
    console.log($submittedTweet);
    $.ajax("/tweets", {
      data: $submittedTweet,
      method: "POST"});

  })





})