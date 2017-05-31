
$(document).ready(function() {
//employeeCreate
var dataSend = {};
var flag = 0;


$('#employeeCreate').click(function () {
    var dataSend = {
      name:$('#name').val(),
      email:$('#email').val(),
      password:$('#password').val(),
      phone:$('#phone').val(),
      id:$('#idBusiness').val(),
      imagen:$('.dropify-render img').attr('src'),
    }
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (validateEmail($('#email').val())) {
      $.post('/employee',dataSend)
      .done(function (result) {
        $("#employeeDelaysucc").trigger("click");
        if (result.code==409) {
          $("#employeeConflict").trigger("click");
        }else {
          location.reload();
        }

      }).fail(function(error) {
        console.log(error.responseText);
      });
    }
});

  $('.edit').click(function () {
    var button = $(this);
    var text = button[0].innerText;
    var id = button.data('edit-id');
    $('.btn-'+id).empty();
    if (text=='Guardar') {
      dataSend.id=id;
      if (flag==1) {
        flag = 0;
        $.ajax({
          url:'/employee',
          data:dataSend,
          type: 'PUT',
          success: function functionName(data) {
            console.log('*************',data);
            if (data.code!=200) {
              $("#EditEmpleoyeeError").trigger("click");
            }else {
              $("#EditEmployeeSave").trigger("click");
            }

          }
        });
        dataSend={};
        $("#employeeDelay-"+id).trigger("click");
      }

      $("#emplo-name-"+id).attr("disabled",true);
      $("#emplo-phone-"+id).attr("disabled",true);
      $("#emplo-email-"+id).attr("disabled",true);
      $('.btn-'+id).append("<span id='nameE-"+id+"'>Editar</span>");

    }else {
      $("#emplo-name-"+id).removeAttr("disabled");
      $("#emplo-name-"+id).focus();
      $("#emplo-phone-"+id).removeAttr("disabled");
      $("#emplo-email-"+id).removeAttr("disabled");
      $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");

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
      $("#emploDesactivate-"+id).trigger("click");
    }else {
      $("#emplook-"+id).trigger("click");
    }

  });


  $('.cancele').click(function () {
    var button = $(this);
    var id = button.data('cancel-id');
    $('.modale-'+id).css("visibility", "hidden");
    var delayMillis = 100;
    setTimeout(function() {
      $("#emplocancel-"+id).trigger("click");
    }, delayMillis);
  });


});