var capture;
var ConversationPanel = (function() {// The ConversationPanel module is designed to handle
  var settings = {// all display and behaviors of the conversation column of the app.
    selectors: {/* eslint no-unused-vars: "off" */
      chatBox: '#scrollingChat',/* global Api: true, Common: true*/
      fromUser: '.from-user',
      fromWatson: '.from-watson',
      latest: '.latest'
    },
    authorTypes: {
      user: 'user',
      watson: 'watson'
    }
  };
  return {// Publicly accessible methods defined
    init: init,
    inputKeyDown: inputKeyDown
  };
  function init() {// Initialize the module
    chatUpdateSetup();
    Api.sendRequest( '', null );
    setupInputBox();
  }
  function chatUpdateSetup() {// Set up callbacks on payload setters in Api module
    var currentRequestPayloadSetter = Api.setRequestPayload;// This causes the displayMessage function to be called when messages are sent / received
    Api.setRequestPayload = function(newPayloadStr) {
      currentRequestPayloadSetter.call(Api, newPayloadStr);
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.user);
    };
    var currentResponsePayloadSetter = Api.setResponsePayload;
    Api.setResponsePayload = function(newPayloadStr) {
      currentResponsePayloadSetter.call(Api, newPayloadStr);
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.watson);
    };
  }
  function setupInputBox() {// Set up the input box to underline text as it is typed
    var input = document.getElementById('textInput');// This is done by creating a hidden dummy version of the input box that
    var dummy = document.getElementById('textInputDummy');// is used to determine what the width of the input text should be.
    var minFontSize = 14;// This value is then used to set the new width of the visible input box.
    var maxFontSize = 16;
    var minPadding = 4;
    var maxPadding = 6;
    if (dummy === null) {// If no dummy input box exists, create one
      var dummyJson = {
        'tagName': 'div',
        'attributes': [{
          'name': 'id',
          'value': 'textInputDummy'
        }]
      };
//      dummy = Common.buildDomElement(dummyJson);
//      document.body.appendChild(dummy);
    }
    function adjustInput() {
      if (input.value === '') {
        input.classList.remove('underline');// If the input box is empty, remove the underline
        input.setAttribute('style', 'width:' + '100%');
        input.style.width = '100%';
      }
      else {// otherwise, adjust the dummy text to match, and then set the width of
        input.classList.add('underline');// the visible input box to match it (thus extending the underline)
        var txtNode = document.createTextNode(input.value);
        ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height',
          'text-transform', 'letter-spacing'].forEach(function(index) {
            dummy.style[index] = window.getComputedStyle(input, null).getPropertyValue(index);
          });
        dummy.textContent = txtNode.textContent;
        var padding = 0;
        var htmlElem = document.getElementsByTagName('html')[0];
        var currentFontSize = parseInt(window.getComputedStyle(htmlElem, null).getPropertyValue('font-size'), 10);
        if (currentFontSize)
          padding = Math.floor((currentFontSize - minFontSize) / (maxFontSize - minFontSize) * (maxPadding - minPadding) + minPadding);
        else
          padding = maxPadding;
        var widthValue = ( dummy.offsetWidth + padding) + 'px';
        input.setAttribute('style', 'width:' + widthValue);
        input.style.width = widthValue;
      }
    }
    input.addEventListener('input', adjustInput);// Any time the input changes, or the window resizes, adjust the size of the input box
    window.addEventListener('resize', adjustInput); 
    Common.fireEvent(input, 'input');// Trigger the input event once to set up the input box and dummy element
  }
  function displayMessage(newPayload, typeValue) {// Display a user or Watson message that has just been sent/received
    var isUser = isUserMessage(typeValue);
    var textExists = (newPayload.input && newPayload.input.text) || (newPayload.output && newPayload.output.text);
    if (isUser !== null && textExists) {
      var messageDivs = buildMessageDomElements(newPayload, isUser);// Create new message DOM element
      var chatBoxElement = document.querySelector(settings.selectors.chatBox);
      var previousLatest = chatBoxElement.querySelectorAll((isUser ? settings.selectors.fromUser : settings.selectors.fromWatson) + settings.selectors.latest);
      if (previousLatest)// Previous "latest" message is no longer the most recent
        Common.listForEach(previousLatest, function(element) {
          element.classList.remove('latest');
        });
      messageDivs.forEach(function(currentDiv) {
        chatBoxElement.appendChild(currentDiv);
        currentDiv.classList.add('load');// Class to start fade in animation
      });
      scrollToChatBottom();// Move chat to the most recent messages when new messages are added
    }
  }
  function isUserMessage(typeValue) {// Checks if the given typeValue matches with the user "name", the Watson "name", or neither
    if (typeValue === settings.authorTypes.user)// Returns true if user, false if Watson, and null if neither
      return true;// Used to keep track of whether a message was from the user or Watson
    else if (typeValue === settings.authorTypes.watson)
      return false;
    return null;
  }
  function buildMessageDomElements(newPayload, isUser) {// Constructs new DOM element from a message payload
    var textArray = isUser ? newPayload.input.text : newPayload.output.text;
    if(!isUser)
      capture = textArray;
//      alert(textArray);
    if (Object.prototype.toString.call( textArray ) !== '[object Array]')
      textArray = [textArray];
    var messageArray = [];
    textArray.forEach(function(currentText) {
      if (currentText) {
        var messageJson = {
          'tagName': 'div',// <div class='segments'>
          'classNames': ['segments'],
          'children': [{
            'tagName': 'div',// <div class='from-user/from-watson latest'>
            'classNames': [(isUser ? 'from-user' : 'from-watson'), 'latest', ((messageArray.length === 0) ? 'top' : 'sub')],
            'children': [{
              'tagName': 'div',// <div class='message-inner'>
              'classNames': ['message-inner'],
              'children': [{
                'tagName': 'p',// <p>{messageText}</p>
                'text': currentText
              }]
            }]
          }]
        };
        messageArray.push(Common.buildDomElement(messageJson));
      }
    });
    return messageArray;
  }
  // Scroll to the bottom of the chat window (to the most recent messages)
  // Note: this method will bring the most recent user message into view,
  // even if the most recent message is from Watson.
  // This is done so that the "context" of the conversation is maintained in the view,
  // even if the Watson message is long.
  function scrollToChatBottom() {
    var scrollingChat = document.querySelector('#scrollingChat');
    var scrollEl = scrollingChat.querySelector(settings.selectors.fromUser + settings.selectors.latest);// Scroll to the latest message sent by the user
    if (scrollEl)
      scrollingChat.scrollTop = scrollEl.offsetTop;
  }
  function inputKeyDown(event, inputBox) {// Handles the submission of input
    if (event.keyCode === 13 && inputBox.value) {// Submit on enter key, dis-allowing blank messages
      var context;// Retrieve the context from the previous server response
      var latestResponse = Api.getResponsePayload();
      if (latestResponse)
        context = latestResponse.context;
      Api.sendRequest(inputBox.value, context);// Send the user message
      inputBox.value = '';// Clear input box for further messages
      Common.fireEvent(inputBox, 'input');
    }
  }
}());