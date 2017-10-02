var voiceStopButton;
var voiceStop = true;
function voiceButton(event){
  voiceStopButton = document.getElementById('voiceStopButton');
  if(voiceStop){
    voiceStop = false;
    document.getElementById("voiceStopButton").src='image/voice-up.gif';
  }
  else{
    voiceStop = true;
    document.getElementById("voiceStopButton").src='image/voice-down.gif';
  }
}
var selectedLanguage;
function show(speechStream){
  if(!voiceStop)
    responsiveVoice.speak(speechStream, selectedLanguage);
}
function language(speechStream){
  switch(speechStream) {
    case "english":
      selectedLanguage = "UK English Female";
      sendText(speechStream);
    break;
    case "中文":
      selectedLanguage = "Chinese Taiwan Female";
      sendText(speechStream);
    break;
    case "廣東話":
      selectedLanguage = "Chinese (Hong Kong) Female";
      sendText(speechStream);
    break;
    case "portuguese":
      selectedLanguage = "Portuguese Female";
      sendText(speechStream);
    break;
    default:
    break;
  }
}