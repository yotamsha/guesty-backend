/**
 * Created by yotam on 14/05/2017.
 */

var Utils = {

    /**
     *
     * @returns {Date} returns the date of Yesterday.
     */
    getYesterdayDate: function () {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        return date;
    },

    /**
     *
     * @param date to format
     * @returns {string} The given date in a YYYY-MM-DD format
     */
    toAPIDateFormat: function (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }
};
module.exports = Utils;