var voiceStop = false;
var selectedLanguage = "Chinese (Hong Kong) Female";
function show(speechStream){
  if(!voiceStop)
    responsiveVoice.speak(speechStream, selectedLanguage, {onend: function(EndCallback){
      setTimeout(delayMs, 50);
    }});
}
function delayMs(){
  final_transcript = '';//最終的辨識訊息變數
  recognition.lang = 'yue-Hant-HK';//設定辨識語言
  recognition.start();//開始辨識
}