const crypto = require('crypto');

function getRequestUrl(
  commonParamsObj,
  requestParamsObj,
  appSecret,
  apiPath,
  endPoint
) {
  const arrKey = [];
  for (let key in commonParamsObj) {
    if (key === 'sign') {
      continue;
    }
    arrKey.push(key);
  }
  for (let key in requestParamsObj) {
    arrKey.push(key);
  }

  const sorted = arrKey.sort(function(a, b) {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  });

  let strParams = apiPath;
  let requestUrl = '';

  for (let value of sorted) {
    let paramsValue = '';
    if (typeof requestParamsObj[value] === 'undefined') {
      paramsValue = commonParamsObj[value];
    } else {
      paramsValue = requestParamsObj[value];
    }
    strParams = strParams + value + paramsValue;
    requestUrl = requestUrl + '&' + value + '=' + paramsValue;
  }

  signature = crypto
    .createHmac(commonParamsObj['sign_method'], appSecret)
    .update(strParams)
    .digest('hex')
    .toUpperCase();

  requestUrl = endPoint + apiPath + '?sign=' + signature + requestUrl;
  return requestUrl;
}

module.exports.getRequestUrl = getRequestUrl;
