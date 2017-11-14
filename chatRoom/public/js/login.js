$(function(){
  var login = $('#verifyLogin');
  login.click(function(){
    $('#divLogin').show(500);
  });
  var spanClose = $('#spanClose');
  spanClose.click(function(){
    $('#divLogin').hide(500);
  });
  var buttonCancel = $('#buttonCancel');
  buttonCancel.click(function(){
    $('#divLogin').hide(500);
  });
});
