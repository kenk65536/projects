var voiceStop = false;
var selectedLanguage = "Chinese (Hong Kong) Female";
function show(speechStream){
  if(!voiceStop)
    responsiveVoice.speak(speechStream, selectedLanguage);
}