// The PayloadPanel module is designed to handle
// all display and behaviors of the conversation column of the app.
/* eslint no-unused-vars: "off" */
/* global Api: true, Common: true, PayloadPanel: true*/
var PayloadPanel = (function() {
  var settings = {
    selectors: {
      payloadColumn: '#payload-column',
      payloadInitial: '#payload-initial-message',
      payloadRequest: '#payload-request',
      payloadResponse: '#payload-response'
    },
    payloadTypes: {
      request: 'request',
      response: 'response'
    }
  };
  return {// Publicly accessible methods defined
    init: init,
    togglePanel: togglePanel
  };
  function init() {// Initialize the module
    payloadUpdateSetup();
  }
  function togglePanel(event, element) {// Toggle panel between being:
    var payloadColumn = document.querySelector(settings.selectors.payloadColumn);// reduced width (default for large resolution apps)
    if (element.classList.contains('full')) {// hidden (default for small/mobile resolution apps)
      element.classList.remove('full');// full width (regardless of screen size)
      payloadColumn.classList.remove('full');
    }
    else {
      element.classList.add('full');
      payloadColumn.classList.add('full');
    }
  }
  function payloadUpdateSetup() {// Set up callbacks on payload setters in Api module
    var currentRequestPayloadSetter = Api.setRequestPayload;// This causes the displayPayload function to be called when messages are sent / received
    Api.setRequestPayload = function(newPayloadStr) {
      currentRequestPayloadSetter.call(Api, newPayloadStr);
      displayPayload(settings.payloadTypes.request);
    };
    var currentResponsePayloadSetter = Api.setResponsePayload;
    Api.setResponsePayload = function(newPayload) {
      currentResponsePayloadSetter.call(Api, newPayload);
      displayPayload(settings.payloadTypes.response);
    };
  }
  function displayPayload(typeValue) {// Display a request or response payload that has just been sent/received();
    var isRequest = checkRequestType(typeValue);
    if (isRequest !== null) {
      var payloadDiv = buildPayloadDomElement(isRequest);// Create new payload DOM element
      var payloadElement = document.querySelector(isRequest ? settings.selectors.payloadRequest : settings.selectors.payloadResponse);
      while (payloadElement.lastChild)// Clear out payload holder element
        payloadElement.removeChild(payloadElement.lastChild);
      payloadElement.appendChild(payloadDiv);// Add new payload element
      var payloadInitial = document.querySelector(settings.selectors.payloadInitial);// Set the horizontal rule to show (if request and response payloads both exist)
      if (Api.getRequestPayload() || Api.getResponsePayload())// or to hide (otherwise)
        payloadInitial.classList.add('hide');
    }
  }
  function checkRequestType(typeValue) {// Checks if the given typeValue matches with the request "name", the response "name", or neither
    if (typeValue === settings.payloadTypes.request)// Returns true if request, false if response, and null if neither
      return true;// Used to keep track of what type of payload we're currently working with
    else if (typeValue === settings.payloadTypes.response)
      return false;
    return null;
  }
  function buildPayloadDomElement(isRequest) {// Constructs new DOM element to use in displaying the payload
    var payloadPrettyString = jsonPrettyPrint(isRequest ? Api.getRequestPayload() : Api.getResponsePayload());
    var payloadJson = {
      'tagName': 'div',
      'children': [{
        'tagName': 'div',// <div class='header-text'>
        'text': isRequest ? 'User input' : 'Watson understands',
        'classNames': ['header-text']
      }, {
        'tagName': 'div',// <div class='code-line responsive-columns-wrapper'>
        'classNames': ['code-line', 'responsive-columns-wrapper'],
        'children': [{
          'tagName': 'pre',// <div class='line-numbers'>
          'text': createLineNumberString((payloadPrettyString.match(/\n/g) || []).length + 1),
          'classNames': ['line-numbers']
        }, {
          'tagName': 'pre',// <div class='payload-text responsive-column'>
          'classNames': ['payload-text', 'responsive-column'],
          'html': payloadPrettyString
        }]
      }]
    };
    return Common.buildDomElement(payloadJson);
  }
  function jsonPrettyPrint(json) {// Format (payload) JSON to make it more readable
    if (json === null)
      return '';
    var convert = JSON.stringify(json, null, 2);
    convert = convert.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    convert = convert.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'number';
      if (/^"/.test(match))
        if (/:$/.test(match))
          cls = 'key';
        else{
          cls = 'string';
        }
      else if (/true|false/.test(match))
        cls = 'boolean';
      else if (/null/.test(match))
        cls = 'null';
      return '<span class="' + cls + '">' + match + '</span>';
    });
    return convert;
  }
  function createLineNumberString(numberOfLines) {// Used to generate a string of consecutive numbers separated by new lines
    var lineString = '';// - used as line numbers for displayed JSON
    var prefix = '';
    for (var i = 1; i <= numberOfLines; i++) {
      lineString += prefix;
      lineString += i;
      prefix = '\n';
    }
    return lineString;
  }
}());
