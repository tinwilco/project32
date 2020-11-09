var AWS = require('aws-sdk');

var table = 'moods';

exports.handler = function (event, context, callback) {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var user = 'unknown';
  var mood = 'happy';
  var date = new Date();

  var params = {
    TableName: table,
    Item: {
      user,
      mood,
      date,
    },
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        'Unable to add item. Error JSON:',
        JSON.stringify(err, null, 2),
      );
      callback(err);
    } else {
      console.log('Added item:', JSON.stringify(data, null, 2));
      callback(null, 200);
    }
  });
};
