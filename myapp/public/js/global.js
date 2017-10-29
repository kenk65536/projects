var arrayLocation = [["青洲區", "台山區", "馬場區", "祐漢區", "黑沙環區", "黑沙環新填海區", "望廈及水塘區", "筷子基區"],
  ["林茂塘區", "高士德及雅廉訪區", "新橋區", "新橋區"],
  ["新口岸區", "外港及南灣湖新填海區", "中區"],
  ["荷蘭園區", "東望洋區(松山區)"],
  ["下環區", "南西灣及主教山區"],
  ["海洋及小潭山區", "海洋及小潭山區", "大學及北安灣區", "北安及大潭山區", "氹仔舊城及馬場區", "澳門大學新校區"],
  ["路環市區", "石排灣", "九澳村", "黑沙村"]
];
function keyDown(event){
  var keyCode = event.keyCode;
  var keyWhich = event.which;
  if(event.keyCode === 13 || event.which === 13)
    alert('Entry');
  else{
    document.getElementById('p1').innerHTML = 'p1: ' + keyCode;
    dpcument.getElementById('p2').innerHTML = 'p2: ' + keyWhich;
  }
}
function loginButton(){
  var loginName = document.getElementById('loginText').value;
  document.getElementById('p2').innerHTML = 'p2: ' + loginName;
}
function selectTest(){
//  var selectValue = selectLocation1.value;
  var form = document.getElementById('selectForm');
  alert(form.selectLocation1.value);
}
function renew(index){
  var selectLocation1 = document.getElementById('selectLocation1');
  if(index < 1){
    selectLocation1.options[0] = new Option("請選擇");
    selectLocation1.length = 1;
    alert('請選擇您所在之區域');
  }
  else{
    for(var i=0; i<arrayLocation[index - 1].length; i++)
      selectLocation1.options[i] = new Option(arrayLocation[index - 1][i], arrayLocation[index - 1][i]);
    selectLocation1.length = arrayLocation[index - 1].length;
  }
}
function createTextField(){
  var textField = document.createElement('input');
  textField.setAttribute('type', 'text');
  document.getElementById('createHere').appendChild(textField);
}
