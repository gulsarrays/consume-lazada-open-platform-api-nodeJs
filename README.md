# consume-lazada-open-platform-api-nodeJs

Consume Lazada Open Platform's GET method API's ( get data from lazada ) by generating needed url with valid signature.

With this package we can call any Lazada Open Platform's Restful GET method API for any Region by generating valid signature.

Here you just need to populate two object's along with credentails as input as given in official document https://open.lazada.com/doc/api.htm

1. commonParamsObj - Common Parameters key/value pair
2. requestParamsObj - Request Parameters key/value pair

To store the credentails i am using the 'config' package (https://www.npmjs.com/package/config)
create a a file in a folder "config" as "default.json" and add the credentails as

```
{
  "appKey": "[YOUR APP KEY]",
  "accessToken": "[YOUR ACCESS TOKEN]",
  "appSecret": "[YOUR SERVER SECRET KEY]"
}
```

### Example:

```
const appKey = config.get('appKey');
const accessToken = config.get('accessToken');
const appSecret = config.get('appSecret');

const apiPath = '/order/get'; // Order API - GetOrder
const endPoint = 'https://api.lazada.co.th/rest'; // for Thailand Region

const commonParamsObj = {};
commonParamsObj.app_key = appKey;
commonParamsObj.access_token = accessToken;
commonParamsObj.timestamp = Date.now();
commonParamsObj.sign_method = 'sha256';
commonParamsObj.sign = '';

const requestParamsObj = {};
requestParamsObj.order_id = '[your order ID OR demo order id]';
```

**Please check the example.js file for reference**

**_modification in example.js file_**

1. npm i consume-lazada-open-platform-get-api
2. npm i config
3. create a a file in a folder "config" as "default.json" and add the credentails as
   {
   "appKey": "[YOUR APP KEY]",
   "accessToken": "[YOUR ACCESS TOKEN]",
   "appSecret": "[YOUR SERVER SECRET KEY]"
   }
4. copy example.js file in your root folder
5. update the apiPath/endPoint/order_id values corrospondingly as per your server configuration
6. change following line
   const lazada = require('./lazadaGetData');
   with
   const lazada = require('consume-lazada-open-platform-get-api');
7. run node example.js
