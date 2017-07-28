$(document).ready(function() {
  $('form').submit(function (e) {
    e.preventDefault();
    //console.log(e.currentTarget[0].value); //name

    /*$.post('/forgot',{email:e.currentTarget[0].value})
    .done(function (result) {

    }).fail(function(error) {
      console.log(error.responseText);
      alert( "error" );
    });*/


  });
});
