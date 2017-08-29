
$(document).ready(function() {
//employeeCreate
var dataSend = {};
var flag = 0;
var icon = '';
var she = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
var cant = [1,2,3,4];

$('#employeeCreate').click(function () {
    /*
    Crea color hexadecimal random
    */
    function aleatorio(inferior,superior){
      numPosibilidades = superior - inferior
      aleat = Math.random() * numPosibilidades
      aleat = Math.floor(aleat)
      return parseInt(inferior) + aleat
    }

    function dame_color_aleatorio(){
       hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
       color_aleatorio = "#";
       for (i=0;i<6;i++){
          posarray = aleatorio(0,hexadecimal.length)
          color_aleatorio += hexadecimal[posarray]
       }
       return color_aleatorio
     }
     //fin de la creacion del color

    var dataSend = {
      name:$('#name').val(),
      email:$('#email').val(),
      password:$('#password').val(),
      phone:$('#phone').val(),
      id:$('#idBusiness').val(),
      flag:$('#BidFlag').val(),
      imagen:$('.dropify-render img').attr('src'),
      color:dame_color_aleatorio(),
    }

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    //horario
    if ($('#serviceLunes1').val().length>0 || $('#serviceLunes2').val().length>0 || $('#serviceLunes3').val().length>0 || $('#serviceLunes4').val().length>0) {
      if ($('#serviceLunes1').val().length>0 && $('#serviceLunes2').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceLunes1').val().length<1 && $('#serviceLunes2').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if ($('#serviceLunes3').val().length>0 && $('#serviceLunes4').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceLunes3').val().length<1 && $('#serviceLunes4').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
       if (($('#serviceLunes1').val().length<1 || $('#serviceLunes2').val().length<1) && ($('#serviceLunes3').val().length>0 && $('#serviceLunes4').val().length>0)) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    }
    if ($('#serviceMartes1').val().length>0 || $('#serviceMartes2').val().length>0 || $('#serviceMartes3').val().length>0 || $('#serviceMartes4').val().length>0) {
      if ($('#serviceMartes1').val().length>0 && $('#serviceMartes2').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceMartes1').val().length<1 && $('#serviceMartes2').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if ($('#serviceMartes3').val().length>0 && $('#serviceMartes4').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceMartes3').val().length<1 && $('#serviceMartes4').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
       if (($('#serviceMartes1').val().length<1 || $('#serviceMartes2').val().length<1) && ($('#serviceMartes3').val().length>0 && $('#serviceMartes4').val().length>0)) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    }
    if ($('#serviceMiercoles1').val().length>0 || $('#serviceMiercoles2').val().length>0 || $('#serviceMiercoles3').val().length>0 || $('#serviceMiercoles4').val().length>0) {
      if ($('#serviceMiercoles1').val().length>0 && $('#serviceMiercoles2').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceMiercoles1').val().length<1 && $('#serviceMiercoles2').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if ($('#serviceMiercoles3').val().length>0 && $('#serviceMiercoles4').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceMiercoles3').val().length<1 && $('#serviceMiercoles4').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if (($('#serviceMiercoles1').val().length<1 || $('#serviceMiercoles2').val().length<1) && ($('#serviceMiercoles3').val().length>0 && $('#serviceMiercoles4').val().length>0)) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    }
    if ($('#serviceJueves1').val().length>0 || $('#serviceJueves2').val().length>0 || $('#serviceJueves3').val().length>0 || $('#serviceJueves4').val().length>0) {
      if ($('#serviceJueves1').val().length>0 && $('#serviceJueves2').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceJueves1').val().length<1 && $('#serviceJueves2').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if ($('#serviceJueves3').val().length>0 && $('#serviceJueves4').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceJueves3').val().length<1 && $('#serviceJueves4').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    if (($('#serviceJueves1').val().length<1 || $('#serviceJueves2').val().length<1) && ($('#serviceJueves3').val().length>0 && $('#serviceJueves4').val().length>0)) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    }
    if ($('#serviceViernes1').val().length>0 || $('#serviceViernes2').val().length>0 || $('#serviceViernes3').val().length>0 || $('#serviceViernes4').val().length>0) {
      if ($('#serviceViernes1').val().length>0 && $('#serviceViernes2').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceViernes1').val().length<1 && $('#serviceViernes2').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if ($('#serviceViernes3').val().length>0 && $('#serviceViernes4').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceViernes3').val().length<1 && $('#serviceViernes4').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if (($('#serviceViernes1').val().length<1 || $('#serviceViernes2').val().length<1) && ($('#serviceViernes3').val().length>0 && $('#serviceViernes4').val().length>0)) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    }
    if ($('#serviceSabado1').val().length>0 || $('#serviceSabado2').val().length>0 || $('#serviceSabado3').val().length>0 || $('#serviceSabado4').val().length>0) {
      if ($('#serviceSabado1').val().length>0 && $('#serviceSabado2').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceSabado1').val().length<1 && $('#serviceSabado2').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if ($('#serviceSabado3').val().length>0 && $('#serviceSabado4').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceSabado3').val().length<1 && $('#serviceSabado4').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
       if (($('#serviceSabado1').val().length<1 || $('#serviceSabado2').val().length<1) && ($('#serviceSabado3').val().length>0 && $('#serviceSabado4').val().length>0)) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    }
    if ($('#serviceDomingo1').val().length>0 || $('#serviceDomingo2').val().length>0 || $('#serviceDomingo3').val().length>0 || $('#serviceDomingo4').val().length>0) {
      if ($('#serviceDomingo1').val().length>0 && $('#serviceDomingo2').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceDomingo1').val().length<1 && $('#serviceDomingo2').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if ($('#serviceDomingo3').val().length>0 && $('#serviceDomingo4').val().length<1) {
        $("#CompletaHoraS").trigger("click");
        return;
      }else if ($('#serviceDomingo3').val().length<1 && $('#serviceDomingo4').val().length>0) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
      if (($('#serviceDomingo1').val().length<1 || $('#serviceDomingo2').val().length<1) && ($('#serviceDomingo3').val().length>0 && $('#serviceDomingo4').val().length>0)) {
        $("#CompletaHoraS").trigger("click");
        return;
      }
    }

    if ($('#serviceLunes1').val().length<1 && $('#serviceMartes1').val().length<1 && $('#serviceMiercoles1').val().length<1 && $('#serviceJueves1').val().length<1 && $('#serviceViernes1').val().length<1 && $('#serviceSabado1').val().length<1 && $('#serviceDomingo1').val().length<1) {
      $("#CompletaHoraS").trigger("click");
      return;
    }

    dataSend.schedule=[{
      "Lunes":[{
        "horario1":[$('#serviceLunes1').val(),$('#serviceLunes2').val()],
        "horario2":[$('#serviceLunes3').val(),$('#serviceLunes4').val()]
      }],
      "Martes":[{
        "horario1":[$('#serviceMartes1').val(),$('#serviceMartes2').val()],
        "horario2":[$('#serviceMartes3').val(),$('#serviceMartes4').val()]
      }],
      "Miercoles":[{
        "horario1":[$('#serviceMiercoles1').val(),$('#serviceMiercoles2').val()],
        "horario2":[$('#serviceMiercoles3').val(),$('#serviceMiercoles4').val()]
      }],
      "Jueves":[{
        "horario1":[$('#serviceJueves1').val(),$('#serviceJueves2').val()],
        "horario2":[$('#serviceJueves3').val(),$('#serviceJueves4').val()]
      }],
      "Viernes":[{
        "horario1":[$('#serviceViernes1').val(),$('#serviceViernes2').val()],
        "horario2":[$('#serviceViernes3').val(),$('#serviceViernes4').val()]
      }],
      "Sabado":[{
        "horario1":[$('#serviceSabado1').val(),$('#serviceSabado2').val()],
        "horario2":[$('#serviceSabado3').val(),$('#serviceSabado4').val()]
      }],
      "Domingo":[{
        "horario1":[$('#serviceDomingo1').val(),$('#serviceDomingo2').val()],
        "horario2":[$('#serviceDomingo3').val(),$('#serviceDomingo4').val()]
      }],
    }];
    //fin de horario1

    $(".loadgif").css("visibility","");
    $("#employeeCreate").css("visibility","hidden");
    $(".cancelar").css("visibility","hidden");

    if (validateEmail($('#email').val())) {
      $("#employeeDelaysucc").trigger("click");
      $.post('/employee',dataSend)
      .done(function (result) {
        if (result.code==409) {
          $("#employeeConflict").trigger("click");
          $(".loadgif").css("visibility","hidden");
          $("#employeeCreate").css("visibility","");
          $(".cancelar").css("visibility","");
          $(".tagemail").css("color","red");
          $("#email").focus();
        }else {
          location.reload();
        }

      }).fail(function(error) {
        console.log(error.responseText);
      });
    }else {
      $("#EmailInvalid").trigger("click");
      $(".loadgif").css("visibility","hidden");
      $("#employeeCreate").css("visibility","");
      $(".cancelar").css("visibility","");
      $(".tagemail").css("color","red");
      $("#email").focus();
    }
});

  $('.edit').click(function () {
    var button = $(this);
    var text = button[0].innerText;
    var id = button.data('edit-id');
    $('.btn-'+id).empty();
    if (text=='Guardar') {
      if (icon != $('.icon-empl-'+id+' .dropify-render img').attr('src')) {
        dataSend.icon=$('.icon-empl-'+id+' .dropify-render img').attr('src');
        dataSend.nameicon=$('.icon-empl-'+id+' .dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner .dropify-filename .dropify-filename-inner').text();
        flag=1;
        icon = '';
      }
      dataSend.id=id;

      if ($('#Lunes-0-'+id).val().length>0 || $('#Lunes-1-'+id).val().length>0 || $('#Lunes-2-'+id).val().length>0 || $('#Lunes-3-'+id).val().length>0) {
        if ($('#Lunes-0-'+id).val().length>0 && $('#Lunes-1-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Lunes-0-'+id).val().length<1 && $('#Lunes-1-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if ($('#Lunes-2-'+id).val().length>0 && $('#Lunes-3-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          flag = 0;
        }else if ($('#Lunes-2-'+id).val().length<1 && $('#Lunes-3-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if (($('#Lunes-0-'+id).val().length>0 && $('#Lunes-1-'+id).val().length>0) && ($('#Lunes-2-'+id).val().length<1 || $('#Lunes-3-'+id).val().length<1)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if (($('#Lunes-0-'+id).val().length<1 || $('#Lunes-1-'+id).val().length<1) && ($('#Lunes-2-'+id).val().length>0 && $('#Lunes-3-'+id).val().length>0)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }

      }

      if ($('#Martes-0-'+id).val().length>0 || $('#Martes-1-'+id).val().length>0 || $('#Martes-2-'+id).val().length>0 || $('#Martes-3-'+id).val().length>0) {
        if ($('#Martes-0-'+id).val().length>0 && $('#Martes-1-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Martes-0-'+id).val().length<1 && $('#Martes-1-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if ($('#Martes-2-'+id).val().length>0 && $('#Martes-3-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Martes-2-'+id).val().length<1 && $('#Martes-3-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if (($('#Martes-0-'+id).val().length>0 && $('#Martes-1-'+id).val().length>0) && ($('#Martes-2-'+id).val().length<1 || $('#Martes-3-'+id).val().length<1)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if (($('#Martes-0-'+id).val().length<1 || $('#Martes-1-'+id).val().length<1) && ($('#Martes-2-'+id).val().length>0 && $('#Martes-3-'+id).val().length>0)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }

      }

      if ($('#Miercoles-0-'+id).val().length>0 || $('#Miercoles-1-'+id).val().length>0 || $('#Miercoles-2-'+id).val().length>0 || $('#Miercoles-3-'+id).val().length>0) {
        if ($('#Miercoles-0-'+id).val().length>0 && $('#Miercoles-1-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Miercoles-0-'+id).val().length<1 && $('#Miercoles-1-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if ($('#Miercoles-2-'+id).val().length>0 && $('#Miercoles-3-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Miercoles-2-'+id).val().length<1 && $('#Miercoles-3-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if (($('#Miercoles-0-'+id).val().length>0 && $('#Miercoles-1-'+id).val().length>0) && ($('#Miercoles-2-'+id).val().length<1 || $('#Miercoles-3-'+id).val().length<1)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if (($('#Miercoles-0-'+id).val().length<1 || $('#Miercoles-1-'+id).val().length<1) && ($('#Miercoles-2-'+id).val().length>0 && $('#Miercoles-3-'+id).val().length>0)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
      }

      if ($('#Jueves-0-'+id).val().length>0 || $('#Jueves-1-'+id).val().length>0 || $('#Jueves-2-'+id).val().length>0 || $('#Jueves-3-'+id).val().length>0) {
        if ($('#Jueves-0-'+id).val().length>0 && $('#Jueves-1-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Jueves-0-'+id).val().length<1 && $('#Jueves-1-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if ($('#Jueves-2-'+id).val().length>0 && $('#Jueves-3-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Jueves-2-'+id).val().length<1 && $('#Jueves-3-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if (($('#Jueves-0-'+id).val().length>0 && $('#Jueves-1-'+id).val().length>0) && ($('#Jueves-2-'+id).val().length<1 || $('#Jueves-3-'+id).val().length<1)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if (($('#Jueves-0-'+id).val().length<1 || $('#Jueves-1-'+id).val().length<1) && ($('#Jueves-2-'+id).val().length>0 && $('#Jueves-3-'+id).val().length>0)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }

      }

      if ($('#Viernes-0-'+id).val().length>0 || $('#Viernes-1-'+id).val().length>0 || $('#Viernes-2-'+id).val().length>0 || $('#Viernes-3-'+id).val().length>0) {
        if ($('#Viernes-0-'+id).val().length>0 && $('#Viernes-1-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Viernes-0-'+id).val().length<1 && $('#Viernes-1-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if ($('#Viernes-2-'+id).val().length>0 && $('#Viernes-3-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Viernes-2-'+id).val().length<1 && $('#Viernes-3-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if (($('Vierness-0-'+id).val().length>0 && $('#Viernes-1-'+id).val().length>0) && ($('#Viernes-2-'+id).val().length<1 || $('#Viernes-3-'+id).val().length<1)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if (($('#Viernes-0-'+id).val().length<1 || $('#Viernes-1-'+id).val().length<1) && ($('#Viernes-2-'+id).val().length>0 && $('#Viernes-3-'+id).val().length>0)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
      }

      if ($('#Sabado-0-'+id).val().length>0 || $('#Sabado-1-'+id).val().length>0 || $('#Sabado-2-'+id).val().length>0 || $('#Sabado-3-'+id).val().length>0) {
        if ($('#Sabado-0-'+id).val().length>0 && $('#Sabado-1-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Sabado-0-'+id).val().length<1 && $('#Sabado-1-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if ($('#Sabado-2-'+id).val().length>0 && $('#Sabado-3-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Sabado-2-'+id).val().length<1 && $('#Sabado-3-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if (($('#Sabado-0-'+id).val().length>0 && $('#Sabado-1-'+id).val().length>0) && ($('#Sabado-2-'+id).val().length<1 || $('#Sabado-3-'+id).val().length<1)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if (($('#Sabado-0-'+id).val().length<1 || $('#Sabado-1-'+id).val().length<1) && ($('#Sabado-2-'+id).val().length>0 && $('#Sabado-3-'+id).val().length>0)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }

      }

      if ($('#Domingo-0-'+id).val().length>0 || $('#Domingo-1-'+id).val().length>0 || $('#Domingo-2-'+id).val().length>0 || $('#Domingo-3-'+id).val().length>0) {
        if ($('#Domingo-0-'+id).val().length>0 && $('#Domingo-1-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Domingo-0-'+id).val().length<1 && $('#Domingo-1-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if ($('#Domingo-2-'+id).val().length>0 && $('#Domingo-3-'+id).val().length<1) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if ($('#Domingo-2-'+id).val().length<1 && $('#Domingo-3-'+id).val().length>0) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }
        if (($('#Domingo-0-'+id).val().length>0 && $('#Domingo-1-'+id).val().length>0) && ($('#Domingo-2-'+id).val().length<1 || $('#Domingo-3-'+id).val().length<1)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }else if (($('#Domingo-0-'+id).val().length<1 || $('#Domingo-1-'+id).val().length<1) && ($('#Domingo-2-'+id).val().length>0 && $('#Domingo-3-'+id).val().length>0)) {
          $("#CompletaHoraS").trigger("click");
          $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
          return;

        }

      }

      /*horario*/

      dataSend.schedule=[{
        "Lunes":[{
          "horario1":[$('#Lunes-0-'+id).val(),$('#Lunes-1-'+id).val()],
          "horario2":[$('#Lunes-2-'+id).val(),$('#Lunes-3-'+id).val()]
        }],
        "Martes":[{
          "horario1":[$('#Martes-0-'+id).val(),$('#Martes-1-'+id).val()],
          "horario2":[$('#Martes-2-'+id).val(),$('#Martes-3-'+id).val()]
        }],
        "Miercoles":[{
          "horario1":[$('#Miercoles-0-'+id).val(),$('#Miercoles-1-'+id).val()],
          "horario2":[$('#Miercoles-2-'+id).val(),$('#Miercoles-3-'+id).val()]
        }],
        "Jueves":[{
          "horario1":[$('#Jueves-0-'+id).val(),$('#Jueves-1-'+id).val()],
          "horario2":[$('#Jueves-2-'+id).val(),$('#Jueves-3-'+id).val()]
        }],
        "Viernes":[{
          "horario1":[$('#Viernes-0-'+id).val(),$('#Viernes-1-'+id).val()],
          "horario2":[$('#Viernes-2-'+id).val(),$('#Viernes-3-'+id).val()]
        }],
        "Sabado":[{
          "horario1":[$('#Sabado-0-'+id).val(),$('#Sabado-1-'+id).val()],
          "horario2":[$('#Sabado-2-'+id).val(),$('#Sabado-3-'+id).val()]
        }],
        "Domingo":[{
          "horario1":[$('#Domingo-0-'+id).val(),$('#Domingo-1-'+id).val()],
          "horario2":[$('#Domingo-2-'+id).val(),$('#Domingo-3-'+id).val()]
        }],
      }];

      /******/
      $(".loadgif").css("visibility","");
      $(".edit").css("visibility","hidden");
      $(".btn-danger").css("visibility","hidden");

      if (flag==1) {
        flag = 0;
        $.ajax({
          url:'/employee',
          data:dataSend,
          type: 'PUT',
          success: function functionName(data) {
            if (data.code!=200) {
              $("#EditEmpleoyeeError").trigger("click");
              $(".loadgif").css("visibility","hidden");
              $(".edit").css("visibility","");
              $(".btn-danger").css("visibility","");
              $(".tagemail").css("color","red");
              return;
            }else {
              $("#EditEmployeeSave").trigger("click");
              $(".tagemail").css("color","");
              $(".loadgif").css("visibility","hidden");
              $(".edit").css("visibility","");
              $(".btn-danger").css("visibility","");
            }

          }
        });
        dataSend={};
        $("#employeeDelay").trigger("click");
      }

      /*horario*/
      for (var i = 0; i < she.length; i++) {
        for (var ii = 0; ii < cant.length; ii++) {
          $("#"+she[i]+"-"+ii+"-"+id).attr("disabled",true);
        }
      }
      /******/

      $('.icon-empl-'+id+' .dropify-wrapper .iconIcon2').attr("disabled",true);
      $('.icon-empl-'+id+' .dropify-wrapper').addClass("disabled");

      $("#emplo-name-"+id).attr("disabled",true);
      $("#emplo-phone-"+id).attr("disabled",true);
      $("#emplo-email-"+id).attr("disabled",true);
      $('.btn-'+id).append("<span id='nameE-"+id+"'>Editar</span>");

    }else {
      /*horario*/
      for (var i = 0; i < she.length; i++) {
        for (var ii = 0; ii < cant.length; ii++) {
          $("#"+she[i]+"-"+ii+"-"+id).removeAttr("disabled");
        }
      }
      /******/
      $("#emplo-name-"+id).removeAttr("disabled");
      $("#emplo-name-"+id).focus();
      $("#emplo-phone-"+id).removeAttr("disabled");
      $("#emplo-email-"+id).removeAttr("disabled");
      $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");

      $('.icon-empl-'+id+' .dropify-wrapper .iconIcon2').removeAttr("disabled");
      $('.icon-empl-'+id+' .dropify-wrapper').removeClass("disabled");

      icon = $('.icon-empl-'+id+' .dropify-render img').attr('src');

      $("#emplo-name-"+id).keyup(function () {
        dataSend.name = $("#emplo-name-"+id).val();
        flag=1;
      });
      $("#emplo-phone-"+id).keyup(function () {
        dataSend.phone = $("#emplo-phone-"+id).val();
        flag=1;
      });
      $("#emplo-email-"+id).keyup(function () {
        dataSend.email = $("#emplo-email-"+id).val();
        flag=1;
      });


    }
  });


  $('.btn-danger').click(function () {
    var button = $(this);
    var id = button.data('delete-id');
    $(".modale-"+id).css("visibility", "visible");

  });

  $('.disabledEmpl').click(function () {
    var button = $(this);
    var id = button.data('activate-id');
    $('.empl').empty();
    $('.empl').text('Seguro de Activar?');
    $('.oke').empty();
    $('.oke').text('Activar');
    $(".modale-"+id).css("visibility", "visible");

  });

  $('.oke').click(function () {
    var dataE = {};
    var button = $(this);
    var id = button.data('ok-id');
    $('.modale-'+id).css("visibility", "hidden");
    if ($('#oke-'+id).text()=='Activar') {
      dataE.activa=true;
    }else {
      dataE.deleteB=true;
    }
    dataE.id = id;
    $.ajax({
      url:'/employee',
      data:dataE,
      type: 'PUT',
      success: function functionName(data) {
        location.reload();
      }
    });
    if ($('#oke-'+id).text()=='Activar') {
      $("#emploDesactivate").trigger("click");
    }else {
      $("#emplook").trigger("click");
    }

  });


  $('.cancele').click(function () {
    var button = $(this);
    var id = button.data('cancel-id');
    $('.modale-'+id).css("visibility", "hidden");
    var delayMillis = 100;
    setTimeout(function() {
      $("#emplocancel").trigger("click");
    }, delayMillis);
  });

  $('.cancelar').click(function () {
    $(".loadgif").css("visibility","hidden");
    $("#employeeCreate").css("visibility","");
  });

  $('.iconstyle2 .dropify-wrapper').css({ borderRadius:"150px",width:"154px", height:"167px", marginLeft:"70px" });

  $('.timepicker').click(function () {
    $('.popover').css('z-index',10000);
  });

});
