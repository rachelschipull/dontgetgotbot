
// Implementation of DontGetGotBot

console.log('==== DontGetGotBot Starting... ====');

// Import dependencies
const Twit = require('twit');
// const schedule = require('node-schedule');

//MongoClient only needed if we start storing text for tweets to be sent. Currently bot is only retweeting.
// const MongoClient = require('mongodb').MongoClient

// Configuration
const config = require('./config');
const TwitterBot = new Twit(config.twitterKeys);

// API
const retweet = () => {
  const params = {
    q: config.query,
    result_type: config.result_type,
    lang: config.lang,
    tweet_mode: "extended"
  };

  TwitterBot.get('search/tweets', params, (err, data) => {
    // when no errors
    if (!err) {
      if (data.statuses[0].is_quote_status === true) {
        // If it is a quote tweet, get the tweet's ID
        let retweetID = data.statuses[0].id_str;
        console.log(data.statuses[0]);
        TwitterBot.post(
          'statuses/retweet/:id',
          { id: retweetID },
          (err, res) => {
            if (res) {
              console.log(`====> RETWEET SUCCESS ${retweetID}`);
            }
            if (err) {
              console.log(`====> ERROR in RETWEET ${err}`);
            }
          }
        );
      } else {
        console.log('====> Nothing to tweet');
      }
    } else {
      console.log(`====> ERROR ${err}`);
    }
  });
};

// Invoke API
retweet();
// 2 minutes
setInterval(retweet, 120000);


// const tweetDiscordLink = () => {
//   const tweet = `${SHARE_DISCORD_CHANNEL_LINK}`;
//   TwitterBot.post('statuses/update', { status: tweet }, () => {
//     console.log('SUCCESS: Discord Channel Link Sent');
//   });
// };

// // Use cron-job to schedule Discord Channel Promotion
// const rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = 11;
// rule.minute = 59;

// schedule.scheduleJob(rule, () => {
//   // eslint-disable-next-line no-console
//   console.log('Cron Job runs successfully');
//   tweetDiscordLink();
// });