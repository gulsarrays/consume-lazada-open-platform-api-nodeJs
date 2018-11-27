const config = require('config');
const lazada = require('./lazadaGetData');

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

const params = {
  commonParamsObj,
  requestParamsObj,
  appSecret,
  apiPath,
  endPoint
};
async function getLazadaData(params) {
  const result = await lazada.getLazadaData(params);
  if (result.code === '0') {
    processResult(result);
  } else {
    errorHandler(result);
  }
}

getLazadaData(params);

function processResult(result) {
  console.log('processResult - result', result, '\n\n');
}
function errorHandler(error) {
  console.log('processError - error', error, '\n\n');
}
