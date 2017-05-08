
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
    }

    $("#employeeDelaysucc").trigger("click");
    $.post('/employee',dataSend)
    .done(function (result) {
      if (result.code==409) {
        $("#employeeConflict").trigger("click");
      }else {
        location.reload();
      }
    }).fail(function(error) {
      console.log(error.responseText);
    });

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

  $('.oke').click(function () {
    var button = $(this);
    var id = button.data('ok-id');
    $('.modale-'+id).css("visibility", "hidden");
    $.ajax({
      url:'/employee',
      data:{delete:true,id:id},
      type: 'PUT',
      success: function functionName(data) {
        location.reload();
      }
    });
    $("#emplook-"+id).trigger("click");
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
