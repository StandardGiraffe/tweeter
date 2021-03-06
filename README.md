# Tweeter Project (TweeTERSE.)

Tweeter is a simple, single-page Twitter clone.

[Starter code](https://github.com/lighthouse-labs/tweeter) for the project was provided by [Lighthouse Labs](https://www.lighthouselabs.ca/).


## Screenshots
![Patent-pending customer-rejection technology in action.](https://media.giphy.com/media/d7pzSDcMrtfbekhTPF/giphy.gif)
(Watch the full video [here](https://youtu.be/2cdHzJU4srY).)

![Main interface: tweets are listed in reverse-chronological order beneath the submission button.](https://raw.githubusercontent.com/StandardGiraffe/tweeter/master/docs/tweet-list.png)

![Clicking the "WRITE." button will toggle the input box with a comely animation, assuming you haven't been rejected by the application.](https://raw.githubusercontent.com/StandardGiraffe/tweeter/master/docs/toggle-animation.png)



## Features implemented by me
- Tweet input form with toggle button on the navigation bar
- Tweet validation (too long/empty submission) with dynamic error responses shown
- Tweets are persisted to database with MongoDB
- On-the-fly updating of page content using AJAX
- Dynamic character counter with patent-pending Customer-Rejection Technology™!


## Dependencies
- Express
- Node 5.10.x or above
- RainbowVis-JS
- MongoDB
- jQuery
- Body-Parser
- Chance


## Getting Started
- Install all dependencies
```
$ npm install
```
- Initialize the database server, then run the application server.
```
npm start local
```


###### Last updated 2018-09-14
