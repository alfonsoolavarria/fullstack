$(document).ready(function() {
  $('form').submit(function (e) {
    e.preventDefault();
    //console.log(e.currentTarget[0].value); //name


    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }


    if (validateEmail(e.currentTarget[0].value)) {

      $.post('/forgot',{email:e.currentTarget[0].value})
      .done(function (result) {
        console.log('iuuuuuu--->',result);
      }).fail(function(error) {
        console.log(error.responseText);
        alert( "error" );
      });

    }

  });
});
