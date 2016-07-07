'use strict';

import 'whatwg-fetch';

const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) return resp;
  const error = new Error(resp.statusText);
  error.resp = resp;
  throw error;
};

export default function (url, options) {
  const newOptions = Object.assign({}, options, { credentials: 'include' });
  return fetch(url, newOptions).then(checkStatus);
}
