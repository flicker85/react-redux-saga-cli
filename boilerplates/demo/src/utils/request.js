import 'isomorphic-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export default function request(url, options) {
  switch(options.method) {
    case "POST":
    case "PUT":
      options.headers = { "Content-Type": "application/json" };
      break;
  }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}