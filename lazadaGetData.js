const Request = require('request');
const config = require('config');
const lazada = require('./lazadaGetUrlGenerator');

const appKey = config.get('appKey');
const accessToken = config.get('accessToken');
const appSecret = config.get('appSecret');

const apiPath = '/order/get';
const endPoint = 'https://api.lazada.co.th/rest';

const commonParamsObj = {};
commonParamsObj.app_key = appKey;
commonParamsObj.access_token = accessToken;
commonParamsObj.timestamp = Date.now();
commonParamsObj.sign_method = 'sha256';
commonParamsObj.sign = '';

const requestParamsObj = {};
requestParamsObj.order_id = '[your order id OR demo order id]';

const lazadaUrl = lazada.getRequestUrl(
  commonParamsObj,
  requestParamsObj,
  appSecret,
  apiPath,
  endPoint
);

function processResult(result) {
  console.log('processResult - result', result, '\n\n');
}
function errorHandler(error) {
  console.log('processError - error', error, '\n\n');
}

async function fetchTheData(requestUrl) {
  return await new Promise(function(resolve, reject) {
    Request.get(requestUrl, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(body));
    });
  });
}

async function getLazadaData(requestUrl) {
  const result = await fetchTheData(requestUrl);
  processResult(result);
  // return result;
}

getLazadaData(lazadaUrl);
