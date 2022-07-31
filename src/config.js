//sets use of .env file
require('dotenv').config();

//configures twitter integration and sets parameters for which tweets to retweet
module.exports = {
  twitterKeys: {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  //Sets hashtags we are targeting
  query: '#100Devs, #100DEVS',
  //Gets most recent rather than most popular
  result_type: 'recent',
  //Onl english language
  lang: 'en',

  //below are a bunch of variables 100DaysofCode-twitter-bot were storing in their .env file, I guess. I kept in case things wouldn't run to see if one of them might be necessary. It seems to run fine without them.

//   twitterConfig: {
//     queryString: process.env.QUERY_STRING,
//     username: process.env.TWITTER_USERNAME,
//     tweetTimeOutMin: process.env.TWEET_TIME_OUT_MIN,
//     tweetTimeOutMax: process.env.TWEET_TIME_OUT_MAX,
//     tweetQueueTime: 1000 * 60 * process.env.TWEET_QUEUE_TIME
//   }
};