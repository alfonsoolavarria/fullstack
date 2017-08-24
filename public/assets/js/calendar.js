//http://easyautocomplete.com/guide
$(document).ready(function() {
  $(".fc-month-button").css("color","aqua");

  //only number input
  $(function() {
    $('#b').on('keydown', '#durationC', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
  });

  $(function() {
    $('#a').on('keydown', '#durationB', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
  });

 var dataService;
  //autocomplete cliente
  var jsonCliente = JSON.parse($('#valores-json').val());

  var options = {
    data:jsonCliente,
  	getValue: "name",
    list: {
      maxNumberOfElements: 10,
      match: {
        enabled: true
      },
  		onSelectItemEvent: function() {
  			var value = $("#clienteE").getSelectedItemData().objectId;
        //pongo el id del cliente
  			$("#data-id-cliente").val(value).trigger("change");
  		}
  	}
  };
  $("#clienteE").easyAutocomplete(options);
  //fin autocomplete client

  //autocomplete Edit-cliente
  var options = {
    data:jsonCliente,
  	getValue: "name",
    list: {
      maxNumberOfElements: 10,
      match: {
        enabled: true
      },
  		onSelectItemEvent: function() {
  			var value = $("#editEname").getSelectedItemData().objectId;
        //pongo el id del cliente
  			$("#data-id-cliente").val(value).trigger("change");
  		}
  	}
  };
  $("#editEname").easyAutocomplete(options);
  //fin autocomplete Edit-client

  //autocomplete Edit-service
  var dataSs = JSON.parse($("#valoresS-json").val());
  var options = {
    data:dataSs,
  	getValue: "name",
    list: {
      maxNumberOfElements: 10,
      match: {
        enabled: true
      },
  		onSelectItemEvent: function() {
  			var value = $("#servicioO2").getSelectedItemData().id;
        //pongo el id del cliente
  			$("#data-id-service").val(value).trigger("change");
  		}
  	}
  };
  $("#servicioO2").easyAutocomplete(options);
  //fin autocomplete Edit-service

  //autocomplete Edit-employee
  var dataEe = JSON.parse($("#valoresEm-json").val());
  var options = {
    data:dataEe,
  	getValue: "name",
    list: {
      maxNumberOfElements: 10,
      match: {
        enabled: true
      },
  		onSelectItemEvent: function() {
  			var value = $("#employeeE2").getSelectedItemData().objectId;
        console.log(value);
        //pongo el id del cliente
  			$("#data-id-emple").val(value).trigger("change");
  		}
  	}
  };
  $("#employeeE2").easyAutocomplete(options);
  //fin autocomplete Edit-employee


  //autocomplete service
  //$("#eac-container-clienteE").click(function() {
    //$("#servicioO").removeAttr("disabled");
    $("#eac-container-servicioO").css("zIndex","1710");
    var dataS = JSON.parse($("#valoresS-json").val());
    /*dataS = $.grep(dataS, function(data1, index) {
     return data1.bussi == $("#data-id-cliente").val();
   });*/
    if (dataS.length<1) {dataS=[{name:'No hay servicio disponible'}] }
    var options2 = {
      data:dataS,
      getValue: "name",
      list: {
        maxNumberOfElements: 10,
        match: {
          enabled: true
        },
        onSelectItemEvent: function() {
          var value2 = $("#servicioO").getSelectedItemData().id;
          var duravalue = $("#servicioO").getSelectedItemData().duration;
          //pongo la duracion
          $("#durationB").val(duravalue)
          //pongo el id del servicio
          $("#data-id-service").val(value2).trigger("change");
        }
      }
    };
    $("#servicioO").easyAutocomplete(options2);
  //});
  //fin autocomplete service


  //autocomplete empledo
  var dataE = JSON.parse($("#valoresEm-json").val());
  if (dataE.length<1) {dataE=[{name:'No hay empleado disponible'}] }
  var options3 = {
    data:dataE,
    getValue: "name",
    list: {
      maxNumberOfElements: 10,
      match: {
        enabled: true
      },
      onSelectItemEvent: function() {
        var value2 = $("#employeeE").getSelectedItemData().objectId;
        //pongo el id del empleado
        $("#data-id-emple").val(value2).trigger("change");
      }
    }
  };
  $("#employeeE").easyAutocomplete(options3);
  //fin autocomplete empledo


  $("#servicioO").click(function () {
    $("#eac-container-servicioO").css("zIndex","1710");
    //$("#employeeE").removeAttr("disabled");
    $("#eac-container-employeeE").css("zIndex","1710");

  });

  //modal new
  $(".close-cliente").click(function() {
    $("#clienteE").val("");
    $("#servicioO").val("");
    $("#employeeE").val("");

    $('#data-id-cliente').val("");
    $('#data-id-service').val("");
    $('#data-id-emple').val("");

    //$("#servicioO").attr("disabled",true);
  });

  $(".close-service").click(function() {
    $("#clienteE").val("");
    $("#servicioO").val("");
    $("#durationB").val("");
    $("#employeeE").val("");

    $('#data-id-cliente').val("");
    $('#data-id-service').val("");
    $('#data-id-emple').val("");

  });

  $(".close-employe").click(function() {
    $("#clienteE").val("");
    $("#servicioO").val("");
    $("#employeeE").val("");

    $('#data-id-cliente').val("");
    $('#data-id-service').val("");
    $('#data-id-emple').val("");
  });

  $(".close-cliente2").click(function() {
    $("#editEname").val("");
  });

  $(".close-service2").click(function() {
    $("#servicioO2").val("");
  });

  $(".close-employe2").click(function() {
    $("#employeeE2").val("");
  });

  function toolsInputs() {
    $("#editEname").attr("disabled",true);
    $("#servicioO2").attr("disabled",true);
    $("#employeeE2").attr("disabled",true);

    $("#infoA").attr("disabled",true);
    $("#hourup").attr("disabled",true);
    $("#editStarts").attr("disabled",true);
    $("#durationC").attr("disabled",true);

    $("#editEname").css("background","#eee");
    $("#servicioO2").css("background","#eee");
    $("#employeeE2").css("background","#eee");
    $(".changed-cita").text("Cambiar Cita");
    $(".changed-cita").css("background","");
    $(".changed-cita").css("color","");
    return;
  }

  //remove disabled edit cita
  $(".changed-cita").click(function() {
    if ($(".changed-cita").text()!='Guardar') {
      $("#editEname").removeAttr("disabled");
      $("#servicioO2").removeAttr("disabled");
      $("#employeeE2").removeAttr("disabled");

      $("#editEname").css("background","white");
      $("#servicioO2").css("background","white");
      $("#employeeE2").css("background","white");

      $("#infoA").removeAttr("disabled");
      $("#hourup").removeAttr("disabled");
      $("#editStarts").removeAttr("disabled");
      $("#durationC").removeAttr("disabled");
      $(".changed-cita").text("Guardar");
      $(".changed-cita").css("background","#4caf50");
      $(".changed-cita").css("color","white");

      $(".changed-cita").attr("id","edit-save-cita");
    }else {

      var duration = $('#durationC').val();
      var startdateinit = new Date($('#editStarts').val()+" "+$('#hourup').val());
      var startdatefinish = moment(startdateinit).format("YYYY-MM-DD HH:mm");
      var enddateiniti = moment(startdatefinish).add(parseInt(duration),'m');
      var dataendfinal = moment(enddateiniti).format("YYYY-MM-DD HH:mm");

      var dataSendBooking2;
      dataSendBooking2={
        duration:duration,
        client:$('#data-id-cliente').val(),
        service:$('#data-id-service').val(),
        employee:$('#data-id-emple').val(),
        additionalInfo:$('#infoA').val(),
        business:$('#idBusiness').val(),
        startDate:startdatefinish,
        idBooking:$('#data-id-booking').val(),
        endDate:dataendfinal,
        deleteBooking:false,
      }

      if (dataSendBooking2.client.length<1 || dataSendBooking2.service.length<1 || dataSendBooking2.employee.length<1 || $("#employeeE2").val().length<1 || $("#servicioO2").val().length<1 || $("#editEname").val().length<1 ) {
        $("#booking-invalido").trigger("click");
        return;
      }

      if (dataSendBooking2.duration.length<1 || $('#hourup').val().length<1) {
        $("#cl-invalido").trigger("click");
        return;
      }
      $(".loadgif").css("visibility","");
      $(".sect1").css("visibility","hidden");
      $(".sect2").css("visibility","hidden");
      $.ajax({
        url:'/booking',
        data:dataSendBooking2,
        type: 'PUT',
        success: function functionName(data) {
          location.reload();
        }
      });
      $(".changed-cita").removeAttr("id");
      toolsInputs();

    }
  });

  $(".modal-edit-close").click(function() {
    toolsInputs();
  });


  $('form').submit(function (e) {
    e.preventDefault();
    $(".loadgif").css("visibility","");
    $("#modalNewService").css("visibility","hidden");
    $(".btn-pure").css("visibility","hidden");
    var duration = $('#durationB').val();
    var startdateinit = new Date($('#fechaA').val()+" "+$('#horaH').val());
    var startdatefinish = moment(startdateinit).format("YYYY-MM-DD HH:mm");
    var enddateiniti = moment(startdatefinish).add(parseInt(duration),'m');
    var dataendfinal = moment(enddateiniti).format("YYYY-MM-DD HH:mm");

    var dataSendBooking;
    dataSendBooking={
      duration:duration,
      client:$('#data-id-cliente').val(),
      service:$('#data-id-service').val(),
      employee:$('#data-id-emple').val(),
      additionalInfo:$('#info').val(),
      business:$('#idBusiness').val(),
      startDate:startdatefinish,
      endDate:dataendfinal,
      state:0,
    }
    if (dataSendBooking.client.length<1 || dataSendBooking.employee.length<1 || dataSendBooking.service.length<1) {
      $("#booking-invalido").trigger("click");
      $(".loadgif").css("visibility","hidden");
      $("#modalNewService").css("visibility","");
      $(".btn-pure").css("visibility","hidden");
      return;
    }
    $.post('/booking',dataSendBooking)
      .done(function (result) {
        //$(".close-modal-cita").trigger("click");
        location.reload();
    }).fail(function(error) {
      console.log(error.responseText);
      console.log('error poner alertify');
    });
  });


  //herramientas para el modal de cita
  $(".easy-autocomplete").css("width","");
  $("#provider-json").before("<i class='input-search-icon md-search' aria-hidden='true'></i>");
  $("#eac-container-clienteE").css("zIndex","1710");

  $("#eac-container-editEname").css("zIndex","1710");//edit-client
  $("#eac-container-servicioO2").css("zIndex","1710");//edit-client
  $("#eac-container-employeeE2").css("zIndex","1710");//edit-client

  $('#horaH').click(function () {
    $(".popover").css("zIndex","1710");
  });
  $('#hourup').click(function () {
    $(".popover").css("zIndex","1710");
  });
  $('#servicioO2').click(function () {
    $(".popover").css("zIndex","1710");
  });
  $('#employeeE2').click(function () {
    $(".popover").css("zIndex","1710");
  });

  //EDITAR CITA FORM PUT

$('.finish-booking').click(function () {
  var dataFinish = {
    state:1,
    status:true,
    deleteBooking:true,
    idBooking:$('#data-id-booking').val(),
  }
  //alfonso
  $(".loadgif").css("visibility","");
  $(".sect1").css("visibility","hidden");
  $(".sect2").css("visibility","hidden");

  $.ajax({
    url:'/booking',
    data:dataFinish,
    type: 'PUT',
    success: function functionName(data) {

      location.reload();
    }
  });
});

  //Borrar la cita
  $('#deteBooking').click(function () {
    $(".msg").text("Desea borrar la cita?");
    $(".delete-booking").text("Borrar");
    $(".modal-confirm").attr("id","modal-"+$('#data-id-booking').val());
    $("#modal-"+$('#data-id-booking').val()).css("visibility", "visible");
  });
  //No presentada
  $('.no-present').click(function () {
    $(".modal-confirm").attr("id","modal-"+$('#data-id-booking').val());
    $(".msg").text("Desea marcar la cita como no presentada?");
    $(".delete-booking").text("Aceptar");
    $("#modal-"+$('#data-id-booking').val()).css("visibility", "visible");
  });

  $('.cancel-booking').click(function () {
    $('#modal-'+$('#data-id-booking').val()).css("visibility", "hidden");
    var delayMillis = 100;
    setTimeout(function() {
      $("#booking-cancel").trigger("click");
    }, delayMillis);
  });

  $('.delete-booking').click(function () {
    var dataDelete,flag=false;
    $(".loadgif").css("visibility","");
    $(".sect1").css("visibility","hidden");
    $(".sect2").css("visibility","hidden");


    $('#modal-'+$('#data-id-booking').val()).css("visibility", "hidden");
    if ($('.delete-booking').text()=='Borrar') {
      dataDelete ={
        status:false,
        state:2,
        deleteBooking:true,
        idBooking:$('#data-id-booking').val(),
      }
      flag=true;
    }else {
      dataDelete ={
        state:3,
        status:true,
        deleteBooking:true,
        idBooking:$('#data-id-booking').val(),
      }
    }
    $.ajax({
      url:'/booking',
      data:dataDelete,
      type: 'PUT',
      success: function functionName(data) {

        location.reload();
      }
    });

    if (flag) {
      $("#booking-deleateada").trigger("click");
      $("#deteBooking").css("visibility","hidden");
    }else {
      $("#booking-nopresente").trigger("click");
    }


  });

  $("#modalCliente").click(function() {
    $('#addNewCalendar').modal('hide');
    $('#addClient').modal('show');
  });

  $(".close-modal-client").click(function() {
    $('#addNewCalendar').modal('show');
    $('#addClient').modal('hide');
    $(".loadgif").css("visibility","hidden");
    $("#newClienteM").css("visibility","");
  });

  $(".modal-second").click(function() {
    $('#addNewCalendar').modal('show');
    $('#addClient').modal('hide');
  });

  $("#newClienteM").click(function(e) {
    if ($("#clientname").val().length<1 || $("#emailcliente").val().length<1 ) {
      $("#cl-invalido").trigger("click");
      return;
    }else {
      $(".loadgif").css("visibility","");
      $("#newClienteM").css("visibility","hidden");
      var dataSendC = {
        name:$("#clientname").val(),
        phone:$("#phonecliente").val(),
        email:$("#emailcliente").val(),
        imagen:$('.dropify-render img').attr('src'),
        password:'12345678',
      };
      $.post('/client',dataSendC)
        .done(function (result) {
          if (result.data) {
            var newdata = JSON.parse($("#valores-json").val());
            newdata.push(result.data);
            $(".paste").remove();
            $(".inp-cli").append("<div class='input-search input-search-dark paste'><input type='text' class='form-control other' id='clienteE' name='cliente' placeholder='Busca por nombre, email o tel&eacute;fono' required><button onclick='resetD()' type='button' class='input-search-close icon md-close close-clienteD' aria-label='Close'></button></div>");

            $("#valorestwo").val(JSON.stringify(newdata));
            var jsonClientet = JSON.parse($("#valorestwo").val());
            var options = {
              data:jsonClientet,
              getValue: "name",
              list: {
                maxNumberOfElements: 10,
                match: {
                  enabled: true
                },
                onSelectItemEvent: function() {
                  var value = $("#clienteE").getSelectedItemData().objectId;
                  //pongo el id del cliente
                  $("#data-id-cliente").val(value).trigger("change");
                }
              }
            };
            $("#clienteE").easyAutocomplete(options);
            $(".easy-autocomplete").css("width","");
            $("#eac-container-clienteE").css("zIndex","1710");
          }

          $(".loadgif").css("visibility","hidden");
          $("#newClienteM").css("visibility","");
          $('#addNewCalendar').modal('show');
          $('#addClient').modal('hide');

      }).fail(function(error) {
        console.log(error.responseText);
        console.log('error poner alertify');
        $(".loadgif").css("visibility","hidden");
        $("#newClienteM").css("visibility","");
      });
    }
    e.preventDefault();
  });

});
