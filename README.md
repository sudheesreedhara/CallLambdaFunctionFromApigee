# Call Amazon AWS Lambda Function From Apigee Proxy
The idea here is to have a lambda sitting in Amazon that you call from Apigee Edge from inside of node.js. This example assumes that you you have an ecncrypted Key-value-map (KVM) in Apigee Edge called `creds` with two keys:

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

The values here should be your access key and secret respectively. These are the keys used to deploy and execute your Amazon lambda function.

## API Proxy
The API proxy is a barebones node.js script.  If you call it directly with `/` then it will use the credentials to call lambda.invoke() and then spit back that response.

Deploy the proxy like so using apigeetool and replace with your own organization and username:

```
apigeetool deployproxy -d . -o <organization> -n callLambda -u <username>  -e prod,test -V
``` 

Before you invoke, edit the `callLambda.js` and update `FunctionName` & `region` fields pointing to your Lambda function and AWS region.
