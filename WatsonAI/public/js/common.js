// The Common module is designed as an auxiliary module
// to hold functions that are used in multiple other modules
/* eslint no-unused-vars: "off" */
var Common = (function() {
  return {// Publicly accessible methods defined
    buildDomElement: buildDomElementFromJson,
    fireEvent: fireEvent,
    listForEach: listForEach
  };
  function buildDomElementFromJson(domJson) {
    var element = document.createElement(domJson.tagName);// Create a DOM element with the given tag name
    if (domJson.text)// Fill the "content" of the element
      element.innerHTML = domJson.text;
    else if (domJson.html)
      element.insertAdjacentHTML('beforeend', domJson.html);
    if (domJson.classNames)// Add classes to the element
      for (var i = 0; i < domJson.classNames.length; i++) {
        element.classList.add(domJson.classNames[i]);
      }
    if (domJson.attributes)// Add attributes to the element
      for (var j = 0; j < domJson.attributes.length; j++) {
        var currentAttribute = domJson.attributes[j];
        element.setAttribute(currentAttribute.name, currentAttribute.value);
      }
    if (domJson.children)// Add children elements to the element
      for (var k = 0; k < domJson.children.length; k++) {
        var currentChild = domJson.children[k];
        element.appendChild(buildDomElementFromJson(currentChild));
      }
    return element;
  }
  function fireEvent(element, event) {// Trigger an event to fire
    var evt;
    if (document.createEventObject) { 
      evt = document.createEventObject();// dispatch for IE
      return element.fireEvent('on' + event, evt);
    } 
    evt = document.createEvent('HTMLEvents');// otherwise, dispatch for Firefox, Chrome + others
    evt.initEvent(event, true, true); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
  }
  function listForEach(list, callback) {// A function that runs a for each loop on a List, running the callback function for each one
    for (var i = 0; i < list.length; i++)
      callback.call(null, list[i]);
  }
}());