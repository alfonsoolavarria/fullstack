$(document).ready(function() {

  var dataSend = {};

  $('form').submit(function (e) {
    $(".loadgif").css("visibility","");
    $(".mainregisterMainBusiness").css("visibility","hidden");
    e.preventDefault();
    dataSend = {
      address : $("#direccion").val(),
      city : $("#ciudad").val(),
      country : $("#pais").val(),
      cp : $("#cp").val(),
      horario : $("#horario").val(),
      detalles : $("#detalles").val(),
      emailcont:$("#emailCon").val(),
      phonecont:$("#phoneCon").val(),
      typeCommerce : $("#selectCategories").val(),
      nameCommerce : $("#negocio").val(),
      name : $("#nombreP").val(),
      phone : $("#phone").val(),
      email : $("#email").val(),
      web : $("#web").val(),
      password : $("#pass").val(),
      idmain : $("#mainbranch").val(),
      type:'Propietario',
      branch:true,
      icon:$('.image-icon2 .dropify-render img').attr('src'),
      banner:$('.image-banner2 .dropify-render img').attr('src'),
    }

    if (dataSend.address && dataSend.city && dataSend.cp) {
      $("#mainbusinessDelaysucc").trigger("click");
      $.post('/business',dataSend)
      .done(function (result) {
        $(".loadgif").css("visibility","hidden");
        $(".mainregisterMainBusiness").css("visibility","");
        if (result.result && result.result.code==409 && result.result.tag==0) {
          $("#mainbusinessConflict").trigger("click");
          $(".maintagemail").css("color","red");
          $(".maintagemail2").css("color","");
          $("#email").focus();
        }else if (result.result && result.result.code==409 && result.result.tag==2) {
          $("#mainbusinessConflict").trigger("click");
          $(".maintagemail2").css("color","red");
          $(".maintagemail").css("color","");
          $("#emailCon").focus();
        }else {
          $(".clean").trigger("click");
          $(".image-icon .dropify-render img").attr("src","");
          $(".image-banner .dropify-render img").attr("src","");
          $("#mainbusinessSave").trigger("click");
          window.location.href = "/branch?ownerAdmin=?user="+$("#userId").val();
        }
      }).fail(function(error) {
        console.log(error.responseText);
        $("#mainbusinessDelayerr").trigger("click");
        $(".clean").trigger("click");
        $(".image-icon .dropify-render img").attr("src","");
        $(".image-banner .dropify-render img").attr("src","");
      });
    }else {
      console.log('---');
    }



  });



});
