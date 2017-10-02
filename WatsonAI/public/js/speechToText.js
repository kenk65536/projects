var infoBox;//訊息 label
var langCombo;
var startStopButton;
var final_transcript = '';//最終的辨識訊息的變數
var recognizing = false;//是否辨識中
function startButton(event) {
  startStopButton = document.getElementById("startStopButton");//取得「辨識/停止」這個按鈕控制項
  langCombo = document.getElementById("langCombo");//取得「辨識語言」這個選擇控制項
  if(recognizing){//如果正在辨識，則停止。
    document.getElementById("startStopButton").src='image/mic-off.svg';
    recognition.stop();
  }
  else{//否則就開始辨識
    document.getElementById("startStopButton").src='image/mic-on.svg';
    final_transcript = '';//最終的辨識訊息變數
    recognition.lang = langCombo.value;//設定辨識語言
    recognition.start();//開始辨識
  }
}
if (!('webkitSpeechRecognition' in window)){//如果找不到window.webkitSpeechRecognition這個屬性, 就是不支援語音辨識，要求使用者更新瀏覽器。
  //infoBox.innerText = "本瀏覽器不支援語音辨識，請更換瀏覽器！(Chrome 25 版以上才支援語音辨識)";
}
else {
  var recognition = new webkitSpeechRecognition();//建立語音辨識物件 webkitSpeechRecognition
  recognition.continuous = false;//設定連續辨識模式
  recognition.interimResults = true;//設定輸出中先結果。
  recognition.onstart = function(){//開始辨識
    recognizing = true;//設定為辨識中
  };
  recognition.onend = function(){//辨識完成
    recognizing = false;//設定為「非辨識中」
    infoBox.innerText = "";//不顯示訊息
  };
  recognition.onresult = function(event){//辨識有任何結果時
    var interim_transcript = '';//中間結果
    for (var i = event.resultIndex; i < event.results.length; ++i)//對於每一個辨識結果
      if (event.results[i].isFinal)//如果是最終結果
        final_transcript += event.results[i][0].transcript;//將其加入最終結果中
    if (final_transcript.trim().length > 0){//如果有最終辨識文字
      document.getElementById("startStopButton").src='image/mic-off.svg';
      sendText(final_transcript);
    }
  };
}