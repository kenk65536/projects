var Api = (function() {// The Api module is designed to handle all interactions with the server
  var requestPayload;
  var responsePayload;
  var messageEndpoint = '/api/message';
  return {// Publicly accessible methods defined
    sendRequest: sendRequest,
    getRequestPayload: function() {// The request/response getters/setters are defined here to prevent internal methods
      return requestPayload;// from calling the methods without any of the callbacks that are added elsewhere.
    },
    setRequestPayload: function(newPayloadStr) {
      requestPayload = JSON.parse(newPayloadStr);
    },
    getResponsePayload: function() {
      return responsePayload;
    },
    setResponsePayload: function(newPayloadStr) {
      responsePayload = JSON.parse(newPayloadStr);
    }
  };
  function sendRequest(text, context) {//Send a message request to the server
    var payloadToWatson = {};//Build request payload
    if (text)
      payloadToWatson.input = {
        text: text
      };
    if (context)
      payloadToWatson.context = context;
    var http = new XMLHttpRequest();//Built http request
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText)
        Api.setResponsePayload(http.responseText);
    };
    var params = JSON.stringify(payloadToWatson);
    if (Object.getOwnPropertyNames(payloadToWatson).length !== 0)//Stored in variable (publicly visible through Api.getRequestPayload)
      Api.setRequestPayload(params);//to be used throughout the application
    http.send(params);//Send request
  }
}());
