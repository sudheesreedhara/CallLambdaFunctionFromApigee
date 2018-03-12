const express = require('express'),
	    aws     = require('aws-sdk'),
	    apigee  = require('apigee-access'),
	    bp      = require('body-parser');

var app = express();
app.use(bp.json());
var lambda = {};
var key, secret;
var kvm = apigee.getKeyValueMap('creds', 'environment');
kvm.get('AWS_ACCESS_KEY_ID',function(err, key_value) {
    key=key_value;
});
kvm.get('AWS_SECRET_ACCESS_KEY',function(err, key_value) {
    secret=key_value;
});

app.get('/', function(req, resp) {
	var params = {
		FunctionName: "helloWorld", 
		Payload: JSON.stringify({})
    };
    lambda = new aws.Lambda( {
		accessKeyId: key, 
		secretAccessKey: secret,
		region: 'us-east-2'
	});
    lambda.invoke(params, function (err, data) {
        if (err) {
            resp.end('Error: ' + err);
        } else {
            resp.end(data.Payload);
        }
    });
});
app.listen(9000);
console.log('Listening on port 9000');
