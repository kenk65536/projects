function sendText(sendContext){
  var context;//Retrieve the context from the previous server response
  var latestResponse = Api.getResponsePayload();
  if (latestResponse)
    context = latestResponse.context;
  Api.sendRequest(sendContext, context);//Send the user message
}
var chnNumChar = {
  零:0,
  一:1,
  二:2,
  兩:2,
  三:3,
  四:4,
  五:5,
  六:6,
  七:7,
  八:8,
  九:9,
  十:10
};
var chnNameValue = {
  十:{value:10, secUnit:false},
  百:{value:100, secUnit:false},
  千:{value:1000, secUnit:false},
  萬:{value:10000, secUnit:true},
  億:{value:100000000, secUnit:true}
}
function ChineseToNumber(chnStr){
  var rtn = 0;
  var section = 0;
  var number = 0;
  var secUnit = false;
  var chineseNumber = chnStr.match('[零一二兩三四五六七八九十百千萬]+');
  var returnText = chnStr.split(chineseNumber);
  if(chineseNumber !== null){
    var str = chineseNumber[0].split('');
    for(var i = 0; i < str.length; i++){
      var num = chnNumChar[str[i]];
      if(typeof num !== 'undefined'){
        number = num;
        if(i === str.length - 1)
          section += number;
      }
      else{
        var unit = chnNameValue[str[i]].value;
        secUnit = chnNameValue[str[i]].secUnit;
        if(secUnit){
          section = (section + number) * unit;
          rtn += section;
          section = 0;
        }
        else
          section += (number * unit);
        number = 0;
      }
    }
    var returnValue = parseInt(rtn) + parseInt(section);
    if(returnText.length === 1)
      return returnText[0] + ' ' + returnValue;
    else
      return returnText[0] + ' ' + returnValue + ' ' + returnText[returnText.length - 1];
  }
}