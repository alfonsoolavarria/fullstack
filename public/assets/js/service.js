$(document).ready(function() {

  var height = 1;
  var cantidad = 1;
  var dataSend = {};
  dataSend.duration=0;
  var flag = 0, category='';
  var she = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
  var cant = [1,2,3,4];




  if ($("#valueDestacados").val()) {
    if (JSON.parse($("#valueDestacados").val()).length>0) {
      var dataDestacada = JSON.parse($("#valueDestacados").val());
      for (var ii = 0; ii < dataDestacada.length; ii++) {
      /*  if (cantidad==1) {
          $("#texto").before("<div class='apendo' data-currentflag='"+1+"' data-gs-current-height='0' style=''><div data-gs-x='0' data-gs-y='0' data-gs-width='12' data-gs-height='2' class='grid-stack-item ui-draggable ui-resizable ui-resizable autohide apendo2' style=''></div></div>");
        }else {
          $(".apendo").attr('data-currentflag',cantidad);
        }*/
        $("#texto").before("<div class='apendo-"+dataDestacada[ii].objectId+"' style='height:70px;'></div>");
        //$(".apendo").attr('data-currentflag',cantidad);
        $(".apendo-"+dataDestacada[ii].objectId).append("<div class='grid-stack-item ui-draggable ui-resizable ui-resizable autohide apendo2-"+dataDestacada[ii].objectId+"' style='height:100%;position:relative;width:100%;'></div>");
        var toP = 20;
        if (cantidad!=1) {
          toP +=10;
          $(".apendo-"+dataDestacada[ii].objectId).css("margin-top", toP+"px");
        }

        var empl = "";
        if ($("#input-"+dataDestacada[ii].objectId).val().length>0) {
          for (var i = 0; i <= $("#input-"+dataDestacada[ii].objectId).val().length; i++) {
            empl+=$("#service-employee-"+i+"-"+dataDestacada[ii].objectId).text();
          }
        }
        if ($('.append-'+dataDestacada[ii].objectId)[0]==undefined) {
          cantidad +=1;
          height += 80;
          var listo = height+40;
          //$("#texto").remove();
          //$('.apendo-'+dataDestacada[ii].objectId).css('min-height', listo+'px');
          //$(".apendo-"+dataDestacada[ii].objectId).css('height',listo);
          //$(".apendo2-"+dataDestacada[ii].objectId).append("<div style='position:absolute;left:96%;cursor:pointer'><img style='width:70%;' class='appendFlag append-destacados-"+dataDestacada[ii].objectId+"' data-id-service-append='"+dataDestacada[ii].objectId+"' data-id-flag='true' src='/public/assets/images/fav_on.png'></div>");
          $(".apendo2-"+dataDestacada[ii].objectId).append("<div class='media append-"+dataDestacada[ii].objectId+"' style='height:100%;border-style:solid;border-top-color:white;border-left-color:white;border-right-color:white;border-bottom-color:silver;border-width:thin;'><div class='media-body'>\
          <form class='form-horizontal'>\
          <div class='grid-stack-item-content ui-draggable-handle'>\
          <div class='row'>\
          <div class='col-md-3' style='text-align:initial;'>\
          <a href='/service/"+dataDestacada[ii].objectId+"/"+$("#businessid").val()+"'>\
          <label class='form-control' id='"+dataDestacada[ii].objectId+"' style='border:0px;background:none;cursor:pointer;margin-left:-12px;'>"+$("#service-name-"+dataDestacada[ii].objectId).text()+"</label></a>\
          </div><div class='col-md-3' style='text-align: initial;'>"+empl+"</div><div class='col-md-3' style='text-align: initial;'>"+dataDestacada[ii].duration+"</div>\
          <div class='col-md-3' style='text-align: initial;'>"+dataDestacada[ii].price+"</div></div></div></form></div></div>");
        }else {
          //console.log('existe y lo borooo');
          $('.append-'+dataDestacada[ii].objectId).remove();
          $('.append-destacados-'+dataDestacada[ii].objectId).remove();
          height -=80;
          cantidad -=1;
          //$('.apendo').css('min-height', height+'px');
          //$(".apendo").css('height',height);
          //$(".apendo").attr('data-currentflag',cantidad);
          if (cantidad==1) {
            $(".apendo-"+dataDestacada[ii].objectId).remove();
            $("#provition").before("<b id='texto' style='margin-top:-2px;position:absolute;'>No Tiene Servicios Destacados</b>");
          }
        }

    }
  }else {
      $("#texto").css("visibility","visible");
    }
}


  /*$('body').on('click', 'img.appendFlag', function() { //quitar el destacado desde destacado en proceso
    var id = $(this).data('id-service-append');
    $('.append-'+id).remove();
    height -=80;
    cantidad -=1;
    $(".apendo").css('height',height);
    $(".apendo").attr('data-currentflag',cantidad);
    if (cantidad==1) {
      $(".apendo").remove();
      $("#provition").before("<b id='texto' style='margin-top:-2px;position:absolute;'>No Tiene Servicios Destacados</b>");
    }
  });*/

  $(".isfeaturedFlag").click(function() {
    var flaCustom;
    var id = $(this).data('id-service');

    if ($(".destacados-"+id).attr('data-id-flag')=='false') {
      flaCustom= true;
      $(".destacados-"+id).attr('data-id-flag','true');
      $(".destacados-"+id).attr("src","/public/assets/images/fav_on.png");

    }else {
      flaCustom= false;
      $(".destacados-"+id).attr('data-id-flag','false');
      $(".destacados-"+id).attr("src","/public/assets/images/fav_off.png");
    }
    //Apendo el destacado en la categoria

    if (JSON.parse($("#valueDestacados").val()).length>0) { //section 1
      //console.log('en desarroll---------------------------------o---->');
      if ($('.apendo2-'+id)[0]==undefined) {
        //console.log('apendar aunnn end esrrollo');

        $("#texto").before("<div class='apendo-"+id+"' style='height:70px;'></div>");
        var toP = 20;
        if (cantidad!=1) {
          toP +=10;
          $(".apendo-"+id).css("margin-top", toP+"px");
        }
        //if (cantidad==1) {
        //}//else {
        //$(".apendo").attr('data-currentflag',cantidad);
        $(".apendo-"+id).append("<div class='grid-stack-item ui-draggable ui-resizable ui-resizable autohide apendo2-"+id+"' style='height:100%;position:relative;width:100%;'></div>");
        //}

        var empl = "";
        if ($("#input-"+id).val().length>0) {
          for (var i = 0; i <= $("#input-"+id).val().length; i++) {
            empl+=$("#service-employee-"+i+"-"+id).text();
          }
        }
        cantidad +=1;
        height += 80;
        var listo = height+60;
        $("#texto").css("visibility","hidden");
        //$("#texto").remove();
        //$('.apendo').css('min-height', listo+'px');
        //$(".apendo").css('height',listo);
        //$(".apendo2-"+id).append("<div style='position:absolute;left:96%;cursor:pointer'><img style='width:70%;' class='appendFlag append-destacados-"+id+"' data-id-service-append='"+id+"' data-id-flag='true' src='/public/assets/images/fav_on.png'></div>");
        $(".apendo2-"+id).append("<div class='media append-"+id+"' style='height:100%;border-style:solid;border-top-color: white;border-left-color: white;border-right-color: white;border-bottom-color: silver;border-width: thin;'><div class='media-body'>\
        <form class='form-horizontal'>\
        <div class='grid-stack-item-content ui-draggable-handle'>\
        <div class='row'>\
        <div class='col-md-3' style='text-align: initial;'>\
        <a href='/service/"+id+"/"+$("#businessid").val()+"'>\
        <label class='form-control' id='"+id+"' style='border:0px;background:none;cursor:pointer;margin-left:-12px;'>"+$("#service-name-"+id).text()+"</label></a>\
        </div><div class='col-md-3' style='text-align: initial;'>"+empl+"</div><div class='col-md-3' style='text-align: initial;'>"+$("#service-duration-"+id).text()+"</div>\
        <div class='col-md-3' style='text-align: initial;'>"+$("#service-price-"+id).text()+"</div></div></div></form></div></div>");
      }else {
        //console.log('existe y lo borooo');
        $(".apendo-"+id).remove();
        $('.append-destacados-'+id).remove();
        $('.apendo2-'+id).remove();
        height -=80;
        cantidad -=1;
        //$('.apendo').css('min-height', height+'px');
        //$(".apendo").css('height',height);
        //$(".apendo").attr('data-currentflag',cantidad);
        if (cantidad==1) {
          $(".apendo-"+id).remove();
          $("#texto").css("visibility","visible");
          //$("#provition").before("<b id='texto' style='margin-top:-2px;position:absolute;'>No Tiene Servicios Destacados</b>");
          height =1;
        }
      }

    }else {//section 2

      if ($('.apendo2-'+id)[0]==undefined) {
      $("#texto").before("<div class='apendo-"+id+"' style='height:70px;'></div>");

      var toP = 20;
      if (cantidad!=1) {
        toP +=10;
        $(".apendo-"+id).css("margin-top", toP+"px");
      }

      $(".apendo-"+id).append("<div class='grid-stack-item ui-draggable ui-resizable ui-resizable autohide apendo2-"+id+"' style='height:100%;position:relative;width:100%;'></div>");

      var empl = "";
        if ($("#input-"+id).val().length>0) {
          for (var i = 0; i <= $("#input-"+id).val().length; i++) {
            empl+=$("#service-employee-"+i+"-"+id).text();
          }
        }

        cantidad +=1;
        height += 80;
        var listo = height+60;
        //$("#texto").remove();
        $("#texto").css("visibility","hidden");
        //$('.apendo-'+id).css('min-height', listo+'px');
        //$(".apendo-"+id).css('height',listo);
        //$(".apendo2-"+id).append("<div style='position:absolute;left:96%;cursor:pointer'><img style='width:70%;' class='appendFlag append-destacados-"+id+"' data-id-service-append='"+id+"' data-id-flag='true' src='/public/assets/images/fav_on.png'></div>");
        $(".apendo2-"+id).append("<div class='media append-"+id+"' style='height:100%;border-style:solid;border-top-color: white;border-left-color: white;border-right-color: white;border-bottom-color: silver;border-width: thin;'><div class='media-body'>\
        <form class='form-horizontal'>\
        <div class='grid-stack-item-content ui-draggable-handle'>\
        <div class='row'>\
        <div class='col-md-3' style='text-align: initial;'>\
        <a href='/service/"+id+"/"+$("#businessid").val()+"'>\
        <label class='form-control' id='"+id+"' style='border:0px;background:none;cursor:pointer;margin-left:-12px;'>"+$("#service-name-"+id).text()+"</label></a>\
        </div><div class='col-md-3' style='text-align: initial;'>"+empl+"</div><div class='col-md-3' style='text-align: initial;'>"+$("#service-duration-"+id).text()+"</div>\
        <div class='col-md-3' style='text-align: initial;'>"+$("#service-price-"+id).text()+"</div></div></div></form></div></div>");
      }else {
        //console.log('existe y lo borooo');
        $('.apendo-'+id).remove();
        $('.append-destacados-'+id).remove();
        $('.apendo2-'+id).remove();
        height -=80;
        cantidad -=1;
        //$(".apendo").attr('data-currentflag',cantidad);
        //$('.apendo').css('min-height', height+'px');
        //$(".apendo").css('height',height);
        if (cantidad==1) {
          $(".apendo-"+id).remove();
          //$("#provition").before("<b id='texto' style='margin-top:-2px;position:absolute;'>No Tiene Servicios Destacados</b>");
          $("#texto").css("visibility","visible");
          height = 1;
        }
      }

    }
    if ($(this).data('id-service').length>0) {
      $.ajax({
        url:'/service/featured/',
        data:{'isFeatured':flaCustom, id:$(this).data('id-service')},
        type: 'PUT',
        success: function functionName(data) {
          console.log('successful');
        }
      });
    }

    //<a href="/service/feature/<%=arreglo[aa][aaa].objectId%>">
  });


  $('.newcateservi').click(function () {
    if ($("#catename").val().length>0) {
      dataSend.categoryservice=$("#catename").val();
    }
    if ($('#businessid').val().length>0 && $("#catename").val().length>0) {
      $(".loadgif2").css("visibility","");
      $(".newcateservi").css("visibility","hidden");
      dataSend.idBusiness=$('#businessid').val();
      $.post('/service/category',dataSend)
      .done(function (result) {
        $(".loadgif2").css("visibility","hidden");
        $(".newcateservi").css("visibility","");
        if (result.code==200) {
          $('#selectcate').append($('<option>', {
            value: result.id,
            text: result.data
          }));
        }
        $("#catename").val("");
      }).fail(function(error) {
        console.log(error.responseText);
      });
    }


   });

    $('.service').click(function () {
      var dur = $("#asRangevalue").val();
      dataSend = {
        serviceName:$('#topicName').val(),
        duration:dur,
        price:$('#topicPrice').val(),
        description:$('#topicDescription').val(),
        employee:[],
        idBusiness:$('#businessid').val(),
        category:$("#selectcate").val(),
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


      $(".loadgif").css("visibility","");
      $(".service").css("visibility","hidden");
      $(".cancelService").css("visibility","hidden");
      if (dataSend.employee.length>0 && dataSend.category.length>0) {
        $("#serviceDelay").trigger("click");
        $.post('/service',dataSend)
        .done(function (result) {
          location.reload();
        }).fail(function(error) {
          console.log(error.responseText);
        });
      }else {
        $("#CompletaEmplo").trigger("click");
        $(".loadgif").css("visibility","hidden");
        $(".service").css("visibility","");
        $(".cancelService").css("visibility","");
      }


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
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Lunes-0-'+id).val().length<1 && $('#Lunes-1-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if ($('#Lunes-2-'+id).val().length>0 && $('#Lunes-3-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Lunes-2-'+id).val().length<1 && $('#Lunes-3-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if (($('#Lunes-0-'+id).val().length>0 && $('#Lunes-1-'+id).val().length>0) && ($('#Lunes-2-'+id).val().length<1 || $('#Lunes-3-'+id).val().length<1)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if (($('#Lunes-0-'+id).val().length<1 || $('#Lunes-1-'+id).val().length<1) && ($('#Lunes-2-'+id).val().length>0 && $('#Lunes-3-'+id).val().length>0)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }

        }

        if ($('#Martes-0-'+id).val().length>0 || $('#Martes-1-'+id).val().length>0 || $('#Martes-2-'+id).val().length>0 || $('#Martes-3-'+id).val().length>0) {
          if ($('#Martes-0-'+id).val().length>0 && $('#Martes-1-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Martes-0-'+id).val().length<1 && $('#Martes-1-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if ($('#Martes-2-'+id).val().length>0 && $('#Martes-3-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Martes-2-'+id).val().length<1 && $('#Martes-3-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if (($('#Martes-0-'+id).val().length>0 && $('#Martes-1-'+id).val().length>0) && ($('#Martes-2-'+id).val().length<1 || $('#Martes-3-'+id).val().length<1)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if (($('#Martes-0-'+id).val().length<1 || $('#Martes-1-'+id).val().length<1) && ($('#Martes-2-'+id).val().length>0 && $('#Martes-3-'+id).val().length>0)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }

        }

        if ($('#Miercoles-0-'+id).val().length>0 || $('#Miercoles-1-'+id).val().length>0 || $('#Miercoles-2-'+id).val().length>0 || $('#Miercoles-3-'+id).val().length>0) {
          if ($('#Miercoles-0-'+id).val().length>0 && $('#Miercoles-1-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Miercoles-0-'+id).val().length<1 && $('#Miercoles-1-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if ($('#Miercoles-2-'+id).val().length>0 && $('#Miercoles-3-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Miercoles-2-'+id).val().length<1 && $('#Miercoles-3-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if (($('#Miercoles-0-'+id).val().length>0 && $('#Miercoles-1-'+id).val().length>0) && ($('#Miercoles-2-'+id).val().length<1 || $('#Miercoles-3-'+id).val().length<1)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if (($('#Miercoles-0-'+id).val().length<1 || $('#Miercoles-1-'+id).val().length<1) && ($('#Miercoles-2-'+id).val().length>0 && $('#Miercoles-3-'+id).val().length>0)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
        }

        if ($('#Jueves-0-'+id).val().length>0 || $('#Jueves-1-'+id).val().length>0 || $('#Jueves-2-'+id).val().length>0 || $('#Jueves-3-'+id).val().length>0) {
          if ($('#Jueves-0-'+id).val().length>0 && $('#Jueves-1-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Jueves-0-'+id).val().length<1 && $('#Jueves-1-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if ($('#Jueves-2-'+id).val().length>0 && $('#Jueves-3-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Jueves-2-'+id).val().length<1 && $('#Jueves-3-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if (($('#Jueves-0-'+id).val().length>0 && $('#Jueves-1-'+id).val().length>0) && ($('#Jueves-2-'+id).val().length<1 || $('#Jueves-3-'+id).val().length<1)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if (($('#Jueves-0-'+id).val().length<1 || $('#Jueves-1-'+id).val().length<1) && ($('#Jueves-2-'+id).val().length>0 && $('#Jueves-3-'+id).val().length>0)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }

        }

        if ($('#Viernes-0-'+id).val().length>0 || $('#Viernes-1-'+id).val().length>0 || $('#Viernes-2-'+id).val().length>0 || $('#Viernes-3-'+id).val().length>0) {
          if ($('#Viernes-0-'+id).val().length>0 && $('#Viernes-1-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Viernes-0-'+id).val().length<1 && $('#Viernes-1-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if ($('#Viernes-2-'+id).val().length>0 && $('#Viernes-3-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Viernes-2-'+id).val().length<1 && $('#Viernes-3-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if (($('#Viernes-0-'+id).val().length>0 && $('#Viernes-1-'+id).val().length>0) && ($('#Viernes-2-'+id).val().length<1 || $('#Viernes-3-'+id).val().length<1)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if (($('#Viernes-0-'+id).val().length<1 || $('#Viernes-1-'+id).val().length<1) && ($('#Viernes-2-'+id).val().length>0 && $('#Viernes-3-'+id).val().length>0)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
        }

        if ($('#Sabado-0-'+id).val().length>0 || $('#Sabado-1-'+id).val().length>0 || $('#Sabado-2-'+id).val().length>0 || $('#Sabado-3-'+id).val().length>0) {
          if ($('#Sabado-0-'+id).val().length>0 && $('#Sabado-1-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Sabado-0-'+id).val().length<1 && $('#Sabado-1-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if ($('#Sabado-2-'+id).val().length>0 && $('#Sabado-3-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Sabado-2-'+id).val().length<1 && $('#Sabado-3-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if (($('#Sabado-0-'+id).val().length>0 && $('#Sabado-1-'+id).val().length>0) && ($('#Sabado-2-'+id).val().length<1 || $('#Sabado-3-'+id).val().length<1)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if (($('#Sabado-0-'+id).val().length<1 || $('#Sabado-1-'+id).val().length<1) && ($('#Sabado-2-'+id).val().length>0 && $('#Sabado-3-'+id).val().length>0)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }

        }

        if ($('#Domingo-0-'+id).val().length>0 || $('#Domingo-1-'+id).val().length>0 || $('#Domingo-2-'+id).val().length>0 || $('#Domingo-3-'+id).val().length>0) {
          if ($('#Domingo-0-'+id).val().length>0 && $('#Domingo-1-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Domingo-0-'+id).val().length<1 && $('#Domingo-1-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if ($('#Domingo-2-'+id).val().length>0 && $('#Domingo-3-'+id).val().length<1) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if ($('#Domingo-2-'+id).val().length<1 && $('#Domingo-3-'+id).val().length>0) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }
          if (($('#Domingo-0-'+id).val().length>0 && $('#Domingo-1-'+id).val().length>0) && ($('#Domingo-2-'+id).val().length<1 || $('#Domingo-3-'+id).val().length<1)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
          }else if (($('#Domingo-0-'+id).val().length<1 || $('#Domingo-1-'+id).val().length<1) && ($('#Domingo-2-'+id).val().length>0 && $('#Domingo-3-'+id).val().length>0)) {
            $("#CompletaHoraS").trigger("click");
            $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
            return;
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


        dataSend.category=$("#selectcateO-"+id).val();


        var stringDuration2 = $("#service-duration-"+id).text();
        dataSend.duration = stringDuration2.trim();
        $('.btn-sm').css("visibility", "hidden");
        $('.btn-danger').css("visibility", "hidden");
        $(".loadgif").css("visibility","");
        if (dataSend.employee.length>0) {
          flag = 0;
          $.ajax({
            url:'/service',
            data:dataSend,
            type: 'PUT',
            success: function functionName(data) {
              $("#EditEmployeeSave").trigger("click");
              $('.btn-sm').css("visibility", "");
              $('.btn-danger').css("visibility", "");
              $(".loadgif").css("visibility","hidden");
              $("#serviceDelay").css("visibility","hidden");
              $("#serviceok").css("visibility","hidden");
              $("#servicecancel").css("visibility","hidden");
              $("#CompletaHoraS").css("visibility","hidden");
              $("#CompletaEmplo").css("visibility","hidden");
              $("#EditEmployeeSave").css("visibility","hidden");
            }
          });
          dataSend={};
          $("#serviceDelay").trigger("click");
        }else {
          $('.btn-sm').css("visibility", "");
          $('.btn-danger').css("visibility", "");
          $(".loadgif").css("visibility","hidden");
          $("#CompletaEmplo").trigger("click");
          $('.btnS-'+id).append("<span id='nameS-"+id+"'>Guardar</span>");
          return;
        }

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
        $("#selectcateO-"+id).removeAttr("disabled");
        $("#catenameO-"+id).removeAttr("disabled");

        $("#service-name-"+id).keyup(function () {
          dataSend.serviceName = $("#service-name-"+id).val();
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
      $('.btn-sm').css("visibility", "hidden");
      $('.btn-danger').css("visibility", "hidden");
      $(".loadgif").css("visibility","");
      $.ajax({
        url:'/service',
        data:{delete:true,id:id},
        type: 'PUT',
        success: function functionName(data) {
          window.location.href = "/servicelist/"+$("#session").val();
        }
      });
      $("#serviceok").trigger("click");
    });


    $('.Scancel').click(function () {
      var button = $(this);
      var id = button.data('cancel-id');
      $('.modalS-'+id).css("visibility", "hidden");
      var delayMillis = 100;
      setTimeout(function() {
        $("#servicecancel").trigger("click");
      }, delayMillis);
    });

    $('.timepicker').click(function () {
      $('.popover').css('z-index',10000);
    });

    $('.cancelService').click(function () {
      $(".loadgif").css("visibility","hidden");
      $(".service").css("visibility","");
    });


});
