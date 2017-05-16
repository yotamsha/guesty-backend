/**
 * Created by yotam on 16/05/2017.
 */

var nodemailer = require('nodemailer');
var fs = require('fs');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.argv[2],
        pass: process.argv[3] 
    }
});

var EmailConnector = {
    
    sendEmailWithFile: function (filepath, filename) {
        console.log('sending csv.. ');
        fs.readFile(filename, function (err, data) {
            transporter.sendMail({
                to: 'Tal.Sieger_Guesty_notification+reply-2S68XV1qpPuw-54.211C@comeetreply.com',
                subject: 'CSV exported!',
                body: 'CSV file is attached.',
                attachments: [{'filename': filename, 'content': data}]
            }), function (err) {
                if (err) {
                    // Handle error
                    console.log("Error:" , err);
                }
            }
        });
    }
};
module.exports = EmailConnector;