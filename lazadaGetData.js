const crypto = require('crypto');
const Request = require('request');

const getSortedArray = params => {
  const arrKey = [];
  for (let key in params.commonParamsObj) {
    if (key === 'sign') {
      continue;
    }
    arrKey.push(key);
  }
  for (let key in params.requestParamsObj) {
    arrKey.push(key);
  }

  const sorted = arrKey.sort(function(a, b) {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  });

  return sorted;
};

const getRequestUrl = params => {
  let strParams = params.apiPath;
  let requestUrl = '';

  const sorted = getSortedArray(params);

  for (let value of sorted) {
    let paramsValue = '';
    if (typeof params.requestParamsObj[value] === 'undefined') {
      paramsValue = params.commonParamsObj[value];
    } else {
      paramsValue = params.requestParamsObj[value];
    }
    strParams = strParams + value + paramsValue;
    requestUrl = requestUrl + '&' + value + '=' + paramsValue;
  }

  signature = crypto
    .createHmac(params.commonParamsObj['sign_method'], params.appSecret)
    .update(strParams)
    .digest('hex')
    .toUpperCase();

  requestUrl =
    params.endPoint + params.apiPath + '?sign=' + signature + requestUrl;
  return requestUrl;
};

const fetchLazadaData = async requestUrl => {
  return await new Promise(function(resolve, reject) {
    Request.get(requestUrl, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(JSON.parse(body));
    });
  });
};

const getLazadaData = async params => {
  const requestUrl = await getRequestUrl(params);
  const result = await fetchLazadaData(requestUrl);
  return result;
};

module.exports.getRequestUrl = getRequestUrl;
module.exports.getLazadaData = getLazadaData;
