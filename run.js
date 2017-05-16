var Utils = require('./utils');
var TwitterApiConnector = require('./twitter-api-connector');
var CSVExporter = require('./CSVExporter');
var EmailConnector = require('./email-connector');

var request_filters = {
    since : Utils.toAPIDateFormat(Utils.getYesterdayDate()),
    mentioned : "@Airbnb"
};
// Fetch Tweets
TwitterApiConnector.getTweets(request_filters,function (tweets) {
    var columns = [
        {
            label: 'Tweets',
            value: 'text'
        }
    ];
    // Exports tweets to file.
    CSVExporter.exportToFile(columns, tweets, function(){
        // send csv by email
        EmailConnector.sendEmailWithFile('./tweets.csv', 'tweets.csv');

    });
});