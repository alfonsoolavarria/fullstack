$(document).ready(function() {

  var dataSend = {};
  var flag = 0;
  var she = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
  var cant = [1,2,3,4];

    $('.service').click(function () {
      dataSend = {
        serviceName:$('#topicName').val(),
        duration:$('#topicDuration').val(),
        price:$('#topicPrice').val(),
        description:$('#topicDescription').val(),
        employee:[],
        idBusiness:$('#businessid').val(),
      }

    try {
      for (var i = 0; i < $(".select2-hidden-accessible").select2()[1].length; i++) {
        if ($(".select2-hidden-accessible").select2()[1][i].selected==true) {
          dataSend.employee.push({
            id:$(".select2-hidden-accessible").select2()[1][i].id,
            name:$(".select2-hidden-accessible").select2()[1][i].text,
          });
        }
      }

    } catch (e) {
      console.log('error con empleados',e);
      dataSend.employee=[];
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

      $.post('/service',dataSend)
      .done(function (result) {
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

        for (var i = 0; i < $(".select2-hidden-accessible").select2()[0].length; i++) {
          if ($(".select2-hidden-accessible").select2()[0][i].selected) {
            dataSend.employee.push({
              id:$(".select2-hidden-accessible").select2()[0][i].id,
              name:$(".select2-hidden-accessible").select2()[0][i].text,
            });
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


        //if (flag==1) {
          flag = 0;
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
        $("#service-duration-"+id).attr("disabled",true);
        $("#service-price-"+id).attr("disabled",true);
        $("#service-description-"+id).attr("disabled",true);
        $("#selectSe-"+id).attr("disabled",true);
        $('.btnS-'+id).append("<span id='nameS-"+id+"'>Editar</span>");

      }else {
        /*horario*/
        for (var i = 0; i < she.length; i++) {
          for (var ii = 0; ii < cant.length; ii++) {
            console.log('----',ii);
            $("#"+she[i]+"-"+ii+"-"+id).removeAttr("disabled");
          }
        }
        /******/

        $("#service-name-"+id).removeAttr("disabled");
        $("#service-duration-"+id).removeAttr("disabled");
        $("#service-price-"+id).removeAttr("disabled");
        $("#service-description-"+id).removeAttr("disabled");
        $("#selectSe-"+id).removeAttr("disabled");
        $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");

        $("#service-serviceName-"+id).keyup(function () {
          dataSend.serviceName = $("#service-serviceName-"+id).val();
          flag=1;
        });
        $("#service-duration-"+id).keyup(function () {
          dataSend.duration = $("#service-duration-"+id).val();
          flag=1;
        });
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
