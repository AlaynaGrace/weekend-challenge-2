$(document).ready(onReady);
var nums = ['0','1','2','3','4','5','6','7','8','9'];
var ops = ['+','-','x','÷'];
var total = '';
var finished = false;

function onReady(){
  //event listeners
  $('#add').on('click', buttonFunction);
  $('#subtract').on('click', buttonFunction);
  $('#multiply').on('click', buttonFunction);
  $('#divide').on('click', buttonFunction);
  $('#equals').on('click',sendingData);
  $('#clear').on('click', clearFunction);

  // $('.buttons').on('click',buttonFunction);
  for (var i = 0; i <10; i++) {
    $('#' + i.toString()).on('click', buttonFunction);
  }

}
//made one function that takes in the type of operation
function sendingData(){
  console.log('in sending');
  var ind = 0;
  for(var i = 0; i<total.length;i++){
    for(var j=0; j<ops.length;j++){
      if(total.charAt(i) === ops[j]){
        ind = i;
      }
    }
  }
  var firstNum = '';
  var secondNum = '';
  for(i = 0; i<ind;i++){
    firstNum += total.charAt(i);
  }
  for(i = ind + 1; i<total.length;i++){
    secondNum += total.charAt(i);
  }
  //creates an objectToSend w/ the 1st #, 2nd #, and operation
  var objectToSend = {
    first: firstNum,
    second: secondNum,
    op: total.charAt(ind)
  };
  console.log(objectToSend);

  //1st ajax call sends the data
  $.ajax({
    url: '/math',
    method: 'POST',
    data: objectToSend,
    success: function(response){
      console.log(response);
    }
  });
  //2nd ajax call asks for the total and displays it on the DOM
  $.ajax({
    url: '/math',
    method: 'GET',
    success: function(response){
      console.log('recieved response!');
      $('#ans').text('Computing...');
      setTimeout(function(){
        if(response.answer % 1 !== 0){
          $('#ans').text(response.answer.toFixed(8));
        }
        else{
          $('#ans').text(response.answer);
        }
        finished = true;
      },3000);

    }
  });
}
function buttonFunction(){
  if(finished){
    clearFunction();
    finished = false;
  }
  total += $(this).text();
  $('#ans').text(total);
}

function clearFunction(){
  $('#ans').empty();
  total = '';
}
