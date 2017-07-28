$(document).ready(function() {
  var dataSend = {}, flag=0;

  $(".one").click(function() {
    $(".one").addClass("active");
    $(".two").removeClass("active");
  });

  $(".two").click(function() {
    $(".one").removeClass("active");
    $(".two").addClass("active");
  });

  $("#clienteCreate").click(function() {
    $(".loadgif").css("visibility","");
    $("#clienteCreate").css("visibility","hidden");
    var dataSend = {
      name:$('#client-name-new').val(),
      email:$('#client-email-new').val(),
      phone:$('#client-phone-new').val(),
      imagen:$('.dropify-render img').attr('src'),
      password:'12345678',
    }
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (validateEmail(dataSend.email)) {
      $("#clientsucc").trigger("click");
      $.post('/client',dataSend)
      .done(function (result) {
        if (result.code==409) {
          $("#clientConflict").trigger("click");
          $(".loadgif").css("visibility","hidden");
          $("#clienteCreate").css("visibility","");
        }else {
          $("#clientSave").trigger("click");
          location.reload();
        }
      }).fail(function(error) {
        console.log(error.responseText);
      });
    }else {
      $("#email-error").trigger("click");
    }
  });

  $('.edit-client').click(function () {

    var button = $(this);
    var text = button[0].innerText;
    var id = button.data('edit-id');
    $('.resetcl-'+id).empty();
    if (text=='Guardar') {
      if (flag==1) {
        dataSend.id=id;
        flag = 0;
        flagClient=0;
        console.log('mandar esto ',dataSend);
        $("#clientsucc").trigger("click");
        $.ajax({
          url:'/client',
          data:dataSend,
          type: 'PUT',
          success: function functionName(data) {
            console.log('*************',data);
            if (data.code==409) {
              $("#clientConflict-").trigger("click");
            }
            else if (data.code!=409 && data.code!=200) {
              $("#clientError-").trigger("click");
            }
          }
        });
        dataSend={};
      }
      $("#client-name-"+id).attr("disabled",true);
      $("#client-email-"+id).attr("disabled",true);
      $("#client-phone-"+id).attr("disabled",true);
      $('.resetcl-'+id).append("<span id='nameC-text-"+id+"'>Editar</span>");
    }else {
      $("#client-name-"+id).removeAttr("disabled");
      $("#client-name-"+id).focus();
      $("#client-email-"+id).removeAttr("disabled");
      $("#client-phone-"+id).removeAttr("disabled");
      $('.resetcl-'+id).append("<span id='nameC-text-"+id+"'>Guardar</span>");

      $("#client-phone-"+id).keyup(function () {
        dataSend.phone = $("#client-phone-"+id).val();
        flag=1;
        dataSend.flagClient=1;

      });
      $("#client-name-"+id).keyup(function () {
        dataSend.name = $("#client-name-"+id).val();
        flag=1;
        dataSend.flagClient=1;

      });
      $("#client-email-"+id).keyup(function () {
        dataSend.email = $("#client-email-"+id).val();
        flag=1;
        dataSend.flagClient=1;

      });
    }
  });


  $(".delete-cliente").click(function () {
    var button = $(this);
    var id = button.data('delete-id');
    $(".modalClient-"+id).css("visibility", "visible");
  });


  $(".canceleCm").click(function () {
    var button = $(this);
    var id = button.data('cancelc-id');
    $(".modalClient-"+id).css("visibility", "hidden");
  });

  $(".deleteCm").click(function () {
    var button = $(this);
    var id = button.data('del-id');
    $(".modalClient-"+id).css("visibility", "hidden");
    $.ajax({
      url:'/client',
      data:{flagClient:0,id:id},
      type: 'PUT',
      success: function functionName(data) {
        location.reload();
      }
    });
  });


});
