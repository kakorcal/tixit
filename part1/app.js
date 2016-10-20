$(document).ready(function(){
  var $list1 = $('#list1');
  var $list2 = $('#list2');

  $('#textField1').on('keyup', function(e){
    if(e.keyCode === 13){
      var me = $("<li class='me'></li>");
      var you = $("<li class='you'></li>");
      me.html('Me: ' + e.target.value);
      you.html('You: ' + e.target.value);
      $list1.append(me);
      $list2.append(you);
      this.value = '';
    }
  });

  $('#textField2').on('keyup', function(e){
    if(e.keyCode === 13){
      var me = $("<li class='me'></li>");
      var you = $("<li class='you'></li>");
      me.html('Me: ' + e.target.value);
      you.html('You: ' + e.target.value);
      $list1.append(you);
      $list2.append(me);
      this.value = '';
    }
  });
});