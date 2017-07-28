$(document).ready(function() {
  $('form').submit(function (e) {
    e.preventDefault();
    /*console.log(e);
    console.log(e.currentTarget[0].value); //name
    console.log(e.currentTarget[1].value); // email
    console.log(e.currentTarget[2].value); // password*/

    $.post('/login/',{email:e.currentTarget[0].value,password:e.currentTarget[2].value})
    .done(function (result) {

    }).fail(function(error) {
      console.log(error.responseText);
      alert( "error" );
    });


  });
});
