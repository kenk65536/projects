function sendText(sendContext){
  var context;// Retrieve the context from the previous server response
  var latestResponse = Api.getResponsePayload();
  if (latestResponse)
    context = latestResponse.context;
  Api.sendRequest(sendContext, context);// Send the user message
}
function pricePlan(pricePlan){
  switch(pricePlan){
    case "automaticTransfer":
      sendText('轉帳');
    break;
    case "atm":
      sendText('自動櫃員機');
    break;
    case "internetBanking":
      sendText('網上銀行');
    break;
    case "telephoneFinance":
      sendText('電話理財');
    break;
    case "mailCheckbook":
      sendText('郵寄支票');
    break;
    case "counter":
      sendText('櫃檯繳費');
    break;
    case "checkbook":
      sendText('支票通');
    break;
    default:
    break;
  }
}
function priceElectric(selected){
  switch(selected){
    case "electricity":
      if(selectedLanguage == "UK English Female")
        sendText('Electricity');
      else if(selectedLanguage == "Portuguese Female")
        sendText('Eletricidade');
      else
        sendText('電量');
    break;
    case "bill":
      sendText('帳單');
    break;
    case "account":
      sendText('帳戶');
    break;
    case "payForPrice":
      sendText('付費方式');
    break;
    case "calculation":
      sendText('計費方式');
    break;
    default:
    break;
  }
}
function calculatePricePlan(selected){
  switch(selected){
    case "a1":
      sendText('一般收費');
    break;
    case "a2":
      sendText('平民收費');
    break;
    case "a3":
      sendText('社會慈善機構收費');
    break;
    case "a4":
      sendText('社會援助收費');
    break;
    default:
    break;
  }
}
function selectedLocation1(){
  var selectedLocation = document.getElementById('selectLocation1').value;
  switch(selectedLocation){
    case '大堂區':
      sendText('大堂區');
    break;
    case '望德堂區':
      sendText('望德堂區');
    break;
    case '風順堂區':
      sendText('風順堂區');
    break;
    case '花地瑪堂區':
      sendText('花地瑪堂區');
    break;
    case '聖安多尼堂區':
      sendText('聖安多尼堂區');
    break;
    case '嘉模堂區':
      sendText('嘉模堂區');
    break;
    case '聖方濟各堂區':
      sendText('聖方濟各堂區');
    break;
  }
}
function aboutGov(selectedAbountGov){
  sendText(selectedAbountGov.value);
}
function accumuationAboutGovMoney(selectedAccumuationAboutGovMoney){
  sendText(selectedAccumuationAboutGovMoney.value);
}
function checkLocation(){
  var checkLocation = document.getElementById('selectLocation1');
}