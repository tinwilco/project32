var AWS = require('aws-sdk');

var table = 'moods';

exports.handler = function(event, context, callback) {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var user = 'unknown';
  var date = new Date();

  var params = {
    TableName: table,
    Key: {
      user,
      date,
    },
  };

  docClient.query(params, function(err, data) {
    if (err) {
      console.error(
        'Unable to get item. Error JSON:',
        JSON.stringify(err, null, 2),
      );
      callback(err);
    } else {
      console.log('Fetched item:', JSON.stringify(data, null, 2));
      callback(null, JSON.stringify(data));
    }
  });
};
