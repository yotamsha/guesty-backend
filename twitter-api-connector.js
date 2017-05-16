/**
 * Created by yotam on 15/05/2017.
 */
var https = require('https');
var _ = require('underscore');
var ACCESS_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAIxSwwAAAAAAOYiSIE7jMVLq6bQbRBD8XRLNhHM%3DDtXUyY0AqVz7WgCDHHds0pi0XcvhCDptGqO4tm4GVjYDoXWyla';
var MAX_RESULTS_COUNT = 100;


function _buildAPIRequest(request_filters) {
    var request_opts = {
        hostname: 'api.twitter.com',
        path: '/1.1/search/tweets.json?q=' +
        'since:' + request_filters.since +
        '%20' + request_filters.mentioned +
        '&count=' + MAX_RESULTS_COUNT,
        headers: {
            Authorization: 'Bearer ' + ACCESS_TOKEN
        }
    };

    return request_opts;
}

function _makeAPIRequest(request_options, callback) {
    https.get(request_options, function (result) {
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', function (data) {
            buffer += data;
        });
        result.on('end', function () {
            var response = JSON.parse(buffer);
            callback(response);

        });
    });
}

function _getTweetsPage(request_filters, cb) {
    var request_options = _buildAPIRequest(request_filters);
    _makeAPIRequest(request_options, function (data) {
        cb(data);
    });
}

function pageRetrieved(response, callback) {
    var formattedResult = _.map(response.statuses, function (obj) {
        return _.pick(obj, 'text')
    });
    callback(formattedResult);

}
var TwitterApiConnector = {

    /**
     * Retrieve tweets from Twitter API using the request filters.
     * @param request_filters the filters to add to the API request
     * @param callback the callback function to run after tweets data is retrieved.
     */
    getTweets: function (request_filters, callback) {
        _getTweetsPage(request_filters, function (response) {
            pageRetrieved(response, callback);
        });
    }
};

module.exports = TwitterApiConnector;