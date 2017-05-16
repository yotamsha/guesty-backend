/**
 * Created by yotam on 15/05/2017.
 */
var fs = require('fs');
var json2csv = require('json2csv');

var CSVExporter = {
    /**
     * Exports the given tweets array into a CSV file.
     * @param columns the csv columns configuration.
     * @param dataArray an Array with objects to be exported.
     */
    exportToFile: function (columns, dataArray, cb) {
        var csv = json2csv({data: dataArray, fields: columns});
        fs.writeFile('tweets.csv', csv, function (err) {
            if (err) {
                throw err;
            }
            console.log('file saved');
            cb();
        });
    }

};
module.exports = CSVExporter