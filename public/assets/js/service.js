$(document).ready(function() {

  var dataSend = {};
  dataSend.duration=0;
  var flag = 0;
  var she = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
  var cant = [1,2,3,4];
    $('.service').click(function () {
      var str = $('.rangeUi-tip').text();
      var dur = str.substr(1,$('.rangeUi-tip').text().length);
      dataSend = {
        serviceName:$('#topicName').val(),
        duration:dur,
        price:$('#topicPrice').val(),
        description:$('#topicDescription').val(),
        employee:[],
        idBusiness:$('#businessid').val(),
      }



    try {
      for (var i = 0; i < $(".input-select-final").select2()[0].length; i++) {
        if ($(".input-select-final").select2()[0][i].selected==true) {
          dataSend.employee.push({
            id:$(".input-select-final").select2()[0][i].id,
            name:$(".input-select-final").select2()[0][i].text,
          });
        }
      }

    } catch (e) {
      console.log('error con empleados',e);
      dataSend.employee=[];
    }

    if ($('#serviceLunes1').val().length>0 || $('#serviceLunes2').val().length>0 || $('#serviceLunes3').val().length>0 || $('#serviceLunes4').val().length>0) {
      if ($('#serviceLunes1').val().length>0 && $('#serviceLunes2').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceLunes1').val().length<1 && $('#serviceLunes2').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceLunes3').val().length>0 && $('#serviceLunes4').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceLunes3').val().length<1 && $('#serviceLunes4').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if (($('#serviceLunes1').val().length>0 && $('#serviceLunes2').val().length>0) && ($('#serviceLunes3').val().length<1 || $('#serviceLunes4').val().length<1)) {
        $("#CompletaHora").trigger("click");
        return;
      }else if (($('#serviceLunes1').val().length<1 || $('#serviceLunes2').val().length<1) && ($('#serviceLunes3').val().length>0 && $('#serviceLunes4').val().length>0)) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceLunes1').val().length>0 && $('#serviceLunes2').val().length>0) {

        //en proceso
      }

    }
    if ($('#serviceMartes1').val().length>0 || $('#serviceMartes2').val().length>0 || $('#serviceMartes3').val().length>0 || $('#serviceMartes4').val().length>0) {
      if ($('#serviceMartes1').val().length>0 && $('#serviceMartes2').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceMartes1').val().length<1 && $('#serviceMartes2').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceMartes3').val().length>0 && $('#serviceMartes4').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceMartes3').val().length<1 && $('#serviceMartes4').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if (($('#serviceMartes1').val().length>0 && $('#serviceMartes2').val().length>0) && ($('#serviceMartes3').val().length<1 || $('#serviceMartes4').val().length<1)) {
        $("#CompletaHora").trigger("click");
        return;
      }else if (($('#serviceMartes1').val().length<1 || $('#serviceMartes2').val().length<1) && ($('#serviceMartes3').val().length>0 && $('#serviceMartes4').val().length>0)) {
        $("#CompletaHora").trigger("click");
        return;
      }
    }
    if ($('#serviceMiercoles1').val().length>0 || $('#serviceMiercoles2').val().length>0 || $('#serviceMiercoles3').val().length>0 || $('#serviceMiercoles4').val().length>0) {
      if ($('#serviceMiercoles1').val().length>0 && $('#serviceMiercoles2').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceMiercoles1').val().length<1 && $('#serviceMiercoles2').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceMiercoles3').val().length>0 && $('#serviceMiercoles4').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceMiercoles3').val().length<1 && $('#serviceMiercoles4').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if (($('#serviceMiercoles1').val().length>0 && $('#serviceMiercoles2').val().length>0) && ($('#serviceMiercoles3').val().length<1 || $('#serviceMiercoles4').val().length<1)) {
        $("#CompletaHora").trigger("click");
        return;
      }else if (($('#serviceMiercoles1').val().length<1 || $('#serviceMiercoles2').val().length<1) && ($('#serviceMiercoles3').val().length>0 && $('#serviceMiercoles4').val().length>0)) {
        $("#CompletaHora").trigger("click");
        return;
      }
    }
    if ($('#serviceJueves1').val().length>0 || $('#serviceJueves2').val().length>0 || $('#serviceJueves3').val().length>0 || $('#serviceJueves4').val().length>0) {
      if ($('#serviceJueves1').val().length>0 && $('#serviceJueves2').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceJueves1').val().length<1 && $('#serviceJueves2').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceJueves3').val().length>0 && $('#serviceJueves4').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceJueves3').val().length<1 && $('#serviceJueves4').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if (($('#serviceJueves1').val().length>0 && $('#serviceJueves2').val().length>0) && ($('#serviceJueves3').val().length<1 || $('#serviceJueves4').val().length<1)) {
        $("#CompletaHora").trigger("click");
        return;
      }else if (($('#serviceJueves1').val().length<1 || $('#serviceJueves2').val().length<1) && ($('#serviceJueves3').val().length>0 && $('#serviceJueves4').val().length>0)) {
        $("#CompletaHora").trigger("click");
        return;
      }
    }
    if ($('#serviceViernes1').val().length>0 || $('#serviceViernes2').val().length>0 || $('#serviceViernes3').val().length>0 || $('#serviceViernes4').val().length>0) {
      if ($('#serviceViernes1').val().length>0 && $('#serviceViernes2').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceViernes1').val().length<1 && $('#serviceViernes2').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceViernes3').val().length>0 && $('#serviceViernes4').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceViernes3').val().length<1 && $('#serviceViernes4').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if (($('#serviceViernes1').val().length>0 && $('#serviceViernes2').val().length>0) && ($('#serviceViernes3').val().length<1 || $('#serviceViernes4').val().length<1)) {
        $("#CompletaHora").trigger("click");
        return;
      }else if (($('#serviceViernes1').val().length<1 || $('#serviceViernes2').val().length<1) && ($('#serviceViernes3').val().length>0 && $('#serviceViernes4').val().length>0)) {
        $("#CompletaHora").trigger("click");
        return;
      }
    }
    if ($('#serviceSabado1').val().length>0 || $('#serviceSabado2').val().length>0 || $('#serviceSabado3').val().length>0 || $('#serviceSabado4').val().length>0) {
      if ($('#serviceSabado1').val().length>0 && $('#serviceSabado2').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceSabado1').val().length<1 && $('#serviceSabado2').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceSabado3').val().length>0 && $('#serviceSabado4').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceSabado3').val().length<1 && $('#serviceSabado4').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if (($('#serviceSabado1').val().length>0 && $('#serviceSabado2').val().length>0) && ($('#serviceSabado3').val().length<1 || $('#serviceSabado4').val().length<1)) {
        $("#CompletaHora").trigger("click");
        return;
      }else if (($('#serviceSabado1').val().length<1 || $('#serviceSabado2').val().length<1) && ($('#serviceSabado3').val().length>0 && $('#serviceSabado4').val().length>0)) {
        $("#CompletaHora").trigger("click");
        return;
      }
    }
    if ($('#serviceDomingo1').val().length>0 || $('#serviceDomingo2').val().length>0 || $('#serviceDomingo3').val().length>0 || $('#serviceDomingo4').val().length>0) {
      if ($('#serviceDomingo1').val().length>0 && $('#serviceDomingo2').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceDomingo1').val().length<1 && $('#serviceDomingo2').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if ($('#serviceDomingo3').val().length>0 && $('#serviceDomingo4').val().length<1) {
        $("#CompletaHora").trigger("click");
        return;
      }else if ($('#serviceDomingo3').val().length<1 && $('#serviceDomingo4').val().length>0) {
        $("#CompletaHora").trigger("click");
        return;
      }
      if (($('#serviceDomingo1').val().length>0 && $('#serviceDomingo2').val().length>0) && ($('#serviceDomingo3').val().length<1 || $('#serviceDomingo4').val().length<1)) {
        $("#CompletaHora").trigger("click");
        return;
      }else if (($('#serviceDomingo1').val().length<1 || $('#serviceDomingo2').val().length<1) && ($('#serviceDomingo3').val().length>0 && $('#serviceDomingo4').val().length>0)) {
        $("#CompletaHora").trigger("click");
        return;
      }
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

      console.log(dataSend);

      $.post('/service',dataSend)
      .done(function (result) {
        console.log('rpuesta devueltaaa',result);
        $(".btn-flat").trigger("click");
        location.reload();
      }).fail(function(error) {
        console.log(error.responseText);
      });


  });


    $('.editS').click(function () {
      var button = $(this);
      var text = button[0].innerText;
      var id = button.data('edit-id');
      $('.btnS-'+id).empty();

      if (text=='Guardar') {
        dataSend.id=id;
        dataSend.employee=[];

        if ($('#Lunes-0-'+id).val().length>0 || $('#Lunes-1-'+id).val().length>0 || $('#Lunes-2-'+id).val().length>0 || $('#Lunes-3-'+id).val().length>0) {
          if ($('#Lunes-0-'+id).val().length>0 && $('#Lunes-1-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Lunes-0-'+id).val().length<1 && $('#Lunes-1-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if ($('#Lunes-2-'+id).val().length>0 && $('#Lunes-3-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Lunes-2-'+id).val().length<1 && $('#Lunes-3-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if (($('#Lunes-0-'+id).val().length>0 && $('#Lunes-1-'+id).val().length>0) && ($('#Lunes-2-'+id).val().length<1 || $('#Lunes-3-'+id).val().length<1)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if (($('#Lunes-0-'+id).val().length<1 || $('#Lunes-1-'+id).val().length<1) && ($('#Lunes-2-'+id).val().length>0 && $('#Lunes-3-'+id).val().length>0)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }

        }

        if ($('#Martes-0-'+id).val().length>0 || $('#Martes-1-'+id).val().length>0 || $('#Martes-2-'+id).val().length>0 || $('#Martes-3-'+id).val().length>0) {
          if ($('#Martes-0-'+id).val().length>0 && $('#Martes-1-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Martes-0-'+id).val().length<1 && $('#Martes-1-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if ($('#Martes-2-'+id).val().length>0 && $('#Martes-3-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Martes-2-'+id).val().length<1 && $('#Martes-3-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if (($('#Martes-0-'+id).val().length>0 && $('#Martes-1-'+id).val().length>0) && ($('#Martes-2-'+id).val().length<1 || $('#Martes-3-'+id).val().length<1)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if (($('#Martes-0-'+id).val().length<1 || $('#Martes-1-'+id).val().length<1) && ($('#Martes-2-'+id).val().length>0 && $('#Martes-3-'+id).val().length>0)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }

        }

        if ($('#Miercoles-0-'+id).val().length>0 || $('#Miercoles-1-'+id).val().length>0 || $('#Miercoles-2-'+id).val().length>0 || $('#Miercoles-3-'+id).val().length>0) {
          if ($('#Miercoles-0-'+id).val().length>0 && $('#Miercoles-1-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Miercoles-0-'+id).val().length<1 && $('#Miercoles-1-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if ($('#Miercoles-2-'+id).val().length>0 && $('#Miercoles-3-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Miercoles-2-'+id).val().length<1 && $('#Miercoles-3-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if (($('#Miercoles-0-'+id).val().length>0 && $('#Miercoles-1-'+id).val().length>0) && ($('#Miercoles-2-'+id).val().length<1 || $('#Miercoles-3-'+id).val().length<1)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if (($('#Miercoles-0-'+id).val().length<1 || $('#Miercoles-1-'+id).val().length<1) && ($('#Miercoles-2-'+id).val().length>0 && $('#Miercoles-3-'+id).val().length>0)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
        }

        if ($('#Jueves-0-'+id).val().length>0 || $('#Jueves-1-'+id).val().length>0 || $('#Jueves-2-'+id).val().length>0 || $('#Jueves-3-'+id).val().length>0) {
          if ($('#Jueves-0-'+id).val().length>0 && $('#Jueves-1-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Jueves-0-'+id).val().length<1 && $('#Jueves-1-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if ($('#Jueves-2-'+id).val().length>0 && $('#Jueves-3-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Jueves-2-'+id).val().length<1 && $('#Jueves-3-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if (($('#Jueves-0-'+id).val().length>0 && $('#Jueves-1-'+id).val().length>0) && ($('#Jueves-2-'+id).val().length<1 || $('#Jueves-3-'+id).val().length<1)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if (($('#Jueves-0-'+id).val().length<1 || $('#Jueves-1-'+id).val().length<1) && ($('#Jueves-2-'+id).val().length>0 && $('#Jueves-3-'+id).val().length>0)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }

        }

        if ($('#Viernes-0-'+id).val().length>0 || $('#Viernes-1-'+id).val().length>0 || $('#Viernes-2-'+id).val().length>0 || $('#Viernes-3-'+id).val().length>0) {
          if ($('#Viernes-0-'+id).val().length>0 && $('#Viernes-1-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Viernes-0-'+id).val().length<1 && $('#Viernes-1-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if ($('#Viernes-2-'+id).val().length>0 && $('#Viernes-3-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Viernes-2-'+id).val().length<1 && $('#Viernes-3-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if (($('Vierness-0-'+id).val().length>0 && $('#Viernes-1-'+id).val().length>0) && ($('#Viernes-2-'+id).val().length<1 || $('#Viernes-3-'+id).val().length<1)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if (($('#Viernes-0-'+id).val().length<1 || $('#Viernes-1-'+id).val().length<1) && ($('#Viernes-2-'+id).val().length>0 && $('#Viernes-3-'+id).val().length>0)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
        }

        if ($('#Sabado-0-'+id).val().length>0 || $('#Sabado-1-'+id).val().length>0 || $('#Sabado-2-'+id).val().length>0 || $('#Sabado-3-'+id).val().length>0) {
          if ($('#Sabado-0-'+id).val().length>0 && $('#Sabado-1-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Sabado-0-'+id).val().length<1 && $('#Sabado-1-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if ($('#Sabado-2-'+id).val().length>0 && $('#Sabado-3-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Sabado-2-'+id).val().length<1 && $('#Sabado-3-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if (($('#Sabado-0-'+id).val().length>0 && $('#Sabado-1-'+id).val().length>0) && ($('#Sabado-2-'+id).val().length<1 || $('#Sabado-3-'+id).val().length<1)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if (($('#Sabado-0-'+id).val().length<1 || $('#Sabado-1-'+id).val().length<1) && ($('#Sabado-2-'+id).val().length>0 && $('#Sabado-3-'+id).val().length>0)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }

        }

        if ($('#Domingo-0-'+id).val().length>0 || $('#Domingo-1-'+id).val().length>0 || $('#Domingo-2-'+id).val().length>0 || $('#Domingo-3-'+id).val().length>0) {
          if ($('#Domingo-0-'+id).val().length>0 && $('#Domingo-1-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Domingo-0-'+id).val().length<1 && $('#Domingo-1-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if ($('#Domingo-2-'+id).val().length>0 && $('#Domingo-3-'+id).val().length<1) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if ($('#Domingo-2-'+id).val().length<1 && $('#Domingo-3-'+id).val().length>0) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }
          if (($('#Domingo-0-'+id).val().length>0 && $('#Domingo-1-'+id).val().length>0) && ($('#Domingo-2-'+id).val().length<1 || $('#Domingo-3-'+id).val().length<1)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }else if (($('#Domingo-0-'+id).val().length<1 || $('#Domingo-1-'+id).val().length<1) && ($('#Domingo-2-'+id).val().length>0 && $('#Domingo-3-'+id).val().length>0)) {
            $("#CompletaHora").trigger("click");
            dataSend.flag = 0;
          }

        }


        try {
          for (var i = 0; i < $(".input-edit").select2()[0].length; i++) {
            if ($(".input-edit").select2()[0][i].selected==true) {
              dataSend.employee.push({
                id:$(".input-edit").select2()[0][i].id,
                name:$(".input-edit").select2()[0][i].text,
              });
            }
          }

        } catch (e) {
          console.log('error con empleados',e);
          dataSend.employee=[];
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

        var stringDuration2 = $("#service-duration-"+id).text();
        dataSend.duration = stringDuration2.trim();
        //if (flag==1) {
          flag = 0;
          console.log('a enviar ',dataSend);
          $.ajax({
            url:'/service',
            data:dataSend,
            type: 'PUT',
            success: function functionName(data) {
              console.log('*************',data);
            }
          });
          dataSend={};
          $("#serviceDelay-"+id).trigger("click");
        //}

        /*horario*/
        for (var i = 0; i < she.length; i++) {
          for (var ii = 0; ii < cant.length; ii++) {
            $("#"+she[i]+"-"+ii+"-"+id).attr("disabled",true);
          }
        }
        /******/

        $("#service-serviceName-"+id).attr("disabled",true);
        $("#service-duration-"+id).css({"pointerEvents":"none"});
        $("#service-price-"+id).attr("disabled",true);
        $("#service-description-"+id).attr("disabled",true);
        $("#selectSe-"+id).attr("disabled",true);
        $('.btnS-'+id).append("<span id='nameS-"+id+"'>Editar</span>");

      }else {
        /*horario*/
        for (var i = 0; i < she.length; i++) {
          for (var ii = 0; ii < cant.length; ii++) {
            $("#"+she[i]+"-"+ii+"-"+id).removeAttr("disabled");
          }
        }
        /******/
        var stringDuration1 = $("#service-duration-"+id).text();
        dataSend.duration = stringDuration1.trim();
        $("#service-name-"+id).removeAttr("disabled");
        $("#service-duration-"+id).css({"pointerEvents":"auto"});
        $("#service-price-"+id).removeAttr("disabled");
        $("#service-description-"+id).removeAttr("disabled");
        $("#selectSe-"+id).removeAttr("disabled");
        $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");

        $("#service-serviceName-"+id).keyup(function () {
          dataSend.serviceName = $("#service-serviceName-"+id).val();
          flag=1;
        });
        /*$("#service-duration-"+id).keyup(function () {
          dataSend.duration = $("#service-duration-"+id).val();
          flag=1;
        });*/
        $("#service-price-"+id).keyup(function () {
          dataSend.price = $("#service-price-"+id).val();
          flag=1;
        });
        $("#service-description-"+id).keyup(function () {
          dataSend.description = $("#service-description-"+id).val();
          flag=1;
        });
      }
    });


    $('.deleteS').click(function () {
      var button = $(this);
      var id = button.data('delete-id');
      $(".modalS-"+id).css("visibility", "visible");

    });
    $('.Sok').click(function () {
      var button = $(this);
      var id = button.data('ok-id');
      $('.modalS-'+id).css("visibility", "hidden");
      $.ajax({
        url:'/service',
        data:{delete:true,id:id},
        type: 'PUT',
        success: function functionName(data) {
          location.reload();
        }
      });
      $("#serviceok-"+id).trigger("click");
    });


    $('.Scancel').click(function () {
      var button = $(this);
      var id = button.data('cancel-id');
      $('.modalS-'+id).css("visibility", "hidden");
      var delayMillis = 100;
      setTimeout(function() {
        $("#servicecancel-"+id).trigger("click");
      }, delayMillis);
    });

    $('.timepicker').click(function () {
      $('.popover').css('z-index',10000);
    });

});
