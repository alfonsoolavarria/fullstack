$(document).ready(function() {

  var dataSend = {};

  $('form').submit(function (e) {
    $(".loadgif").css("visibility","");
    $(".registerMainBusiness").css("visibility","hidden");
    e.preventDefault();
    dataSend = {
      nameB: $("#empresa").val(),
      name: $("#nombrePA").val(),
      email: $("#emailPA").val(),
      phone: $("#phonePA").val(),
      password: $("#passPA").val(),
      branch:false,
      typeCommerce : $("#selectCategories").val(),
      type:'Propietario Administrador',
    }
    $.post('/business',dataSend)
    .done(function (result) {
      $(".loadgif").css("visibility","hidden");
      $(".registerMainBusiness").css("visibility","");
      if (result && result.code==409) {
        $("#emailerror").trigger("click");
        $(".tagemail2").css("color","red");
        $("#emailPA").focus();
      }else {
        $(".clean").trigger("click");
        $("#mainbusinessSave").trigger("click");
        $(".tagemail2").css("color","");
        //redirecciono
        window.location.href = "/mainbusiness/list?user="+$("#userId").val();
      }
    }).fail(function(error) {
      console.log(error.responseText);
      $("#businessDelayerr").trigger("click");
      $(".clean").trigger("click");
    });
  });


  $('.btn-sm-edit2').click(function () {
    var button = $(this);
    var text = button[0].innerText;
    var id = button.data('edit-id');
    var iduser = button.data('user-bus');
    dataSend.id=id;
    dataSend.iduser=$("#user-"+id).val();
    $('.btn-'+id).empty();
    if (text=='Guardar') {
      if (dataSend.flag==1) {
        $.ajax({
          url:'/business',
          data:dataSend,
          type: 'PUT',
          success: function functionName(data) {
            console.log('respuest',data);
            if (data.code!=200) {
              $("#mainbusinessError-"+id).trigger("click");
            }else {
              $("#mainbusinessCorrect-"+id).trigger("click");
            }

          }
        });
        dataSend={};
        $("#mainbusinessDelaylist-"+id).trigger("click");
      }
      $("#nameE-"+id).attr("disabled",true);
      $("#owner-"+id).attr("disabled",true);
      $("#telefono-"+id).attr("disabled",true);
      $("#email-"+id).attr("disabled",true);
      $('.btn-'+id).append("<span id='editE-"+id+"'>Editar</span>");
    }else {

      $("#nameE-"+id).removeAttr("disabled");
      $("#owner-"+id).removeAttr("disabled");
      $("#telefono-"+id).removeAttr("disabled");
      $("#email-"+id).removeAttr("disabled");
      $('.btn-'+id).append("<span id='editE-"+id+"'>Guardar</span>");

      $("#nameE-"+id).focus();
      //$("#nameE-"+id).css({"border":"solid","border-left":"white","border-top":"white","border-right":"white"});


      $("#nameE-"+id).keyup(function () {
        dataSend.nameE = $("#nameE-"+id).val();
        dataSend.flag=1;
        dataSend.main=1;
      });
      $("#owner-"+id).keyup(function () {
        dataSend.name = $("#owner-"+id).val();
        dataSend.flaguser=1;
        dataSend.flag=1;
        dataSend.main=1;
      });
      $("#telefono-"+id).keyup(function () {
        dataSend.phone = $("#telefono-"+id).val();
        dataSend.flaguser=1;
        dataSend.flag=1;
        dataSend.main=1;
      });
      $("#email-"+id).keyup(function () {
        dataSend.email = $("#email-"+id).val();
        dataSend.flaguser=1;
        dataSend.flag=1;
        dataSend.main=1;
      });
    }

    });

  $('.danger-2').click(function () {
    var button = $(this);
    var id = button.data('delete-id');
    $(".modal-"+id).css("visibility", "visible");

  });

  $('.ok2').click(function () {
    var button = $(this);
    var activa = false, deleteB=false;
    var id = button.data('ok-id');
    var dataE = {};
    dataE.id = id;
    dataE.main = '1';
    dataE.iduser=$("#user-"+id).val();
    $('.modal-'+id).css("visibility", "hidden");
    if ($('#ok2-'+id).text()=='Activar') {
      dataE.activa=true;
    }else {
      dataE.deleteB=true;
    }
    $.ajax({
      url:'/business',
      data:dataE,
      type: 'PUT',
      success: function functionName(data) {
        console.log('listooooo',data);
        location.reload();
      }
    });

    if ($('#ok2-'+id).text()=='Activar') {
      $("#mainbusinessactivada-"+id).trigger("click");
    }else {
      $("#mainbusinessok-"+id).trigger("click");
    }
  });


  $('.cancel2').click(function () {
    var button = $(this);
    var id = button.data('cancel-id');
    $('.modal-'+id).css("visibility", "hidden");
    var delayMillis = 100;
    setTimeout(function() {
      $("#mainbusinesscancel-"+id).trigger("click");
    }, delayMillis);
  });

  $('.warning2').click(function () {
    var button = $(this);
    var id = button.data('activate-id');
    $('.msg').empty();
    $('.msg').text('Seguro de Activar?');
    $('.ok2').empty();
    $('.ok2').text('Activar');
    $(".modal-"+id).css("visibility", "visible");

  });



});
