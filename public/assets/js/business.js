$(document).ready(function() {
  var flagUser = 0;
  var flagBusiness = 0;
  var dataSend = {};
  var flag = 0;
  var icon = '' , banner='';

  $('.registerBusiness').click(function () {
    $('form').submit(function (e) {
      $(".loadgif").css("visibility","");
      $(".registerBusiness").css("visibility","hidden");
      e.preventDefault();
      dataSend = {
        address : $("#direccion").val(),
        city : $("#ciudad").val(),
        country : $("#pais").val(),
        cp : $("#cp").val(),
        horario : $("#horario").val(),
        detalles : $("#detalles").val(),
        typeCommerce : $("#selectCategories").val(),
        nameCommerce : $("#negocio").val(),
        name : $("#nombreP").val(),
        phone : $("#phone").val(),
        email : $("#email").val(),
        web : $("#web").val(),
        password : $("#pass").val(),
        type:'Propietario',
        icon:$('.image-icon2 .dropify-render img').attr('src'),
        banner:$('.image-banner2 .dropify-render img').attr('src'),
      }

      //var latitude=0,longitude=0;

      function getLocation() {
        var p = new Promise(function (resolve, reject){
          var address = direccion + ', ' + cp + ', ' + cuidad + ', ' + country;
          if (address.length == 0) {
            alert('Ingresa una dirección');
          } else {
            $('#googleMap').css('background', 'url(img/input-spinner.gif) center center no-repeat');
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
              'address': address
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                var data ={latitude:latitude,longitude:longitude};
                resolve(data);
              } else {
                alert("No pudimos encontrar esa direccion, prueba con otra y acomodala en el mapa.");
                //$('#googleMap').css('background', 'none');
                reject(new Error('Error'));
              }
            });
          }
        });
        return p;
      };

      //getLocation().then(function(data) {
      if (dataSend.address && dataSend.city && dataSend.cp) {
        $("#businessDelaysucc").trigger("click");
        $.post('/business',dataSend)
        .done(function (result) {
          $(".loadgif").css("visibility","hidden");
          $(".registerBusiness").css("visibility","");
          if (result.data.code==409) {
            $("#businessConflict").trigger("click");
          }else {
            $(".clean").trigger("click");
            $(".image-icon .dropify-render img").attr("src","");
            $(".image-banner .dropify-render img").attr("src","");
            $("#businessSave").trigger("click");
          }
        }).fail(function(error) {
          console.log(error.responseText);
          $("#businessDelayerr").trigger("click");
          $(".clean").trigger("click");
          $(".image-icon .dropify-render img").attr("src","");
          $(".image-banner .dropify-render img").attr("src","");
        });
      }else {
        console.log('---');
      }
      //});
    });
  });



  $('.btn-sm-edit').click(function () {
    var button = $(this);
    var text = button[0].innerText;
    var id = button.data('edit-id');
    var iduser = button.data('user-bus');
    $('.btn-'+id).empty();
    if (text=='Guardar') {
      if (icon != $('.image-icon-'+id+' .dropify-render img').attr('src')) {
        dataSend.icon=$('.image-icon-'+id+' .dropify-render img').attr('src');
        dataSend.nameicon=$('.image-icon-'+id+' .dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner .dropify-filename .dropify-filename-inner').text();
        flag=1;
        dataSend.flagBusiness=1;
        icon = '';
      }
      if (banner != $('.image-banner-'+id+' .dropify-render img').attr('src')) {
        dataSend.banner=$('.image-banner-'+id+' .dropify-render img').attr('src');
        dataSend.namebanner=$('.image-banner-'+id+' .dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner .dropify-filename .dropify-filename-inner').text();
        dataSend.flagBusiness=1;
        flag=1;
        banner='';
      }
      dataSend.id=id;
      dataSend.iduser=iduser;
      if (flag==1) {
        flag = 0;
        flagUser = 0;
        flagBusiness=0;
        $.ajax({
          url:'/business',
          data:dataSend,
          type: 'PUT',
          success: function functionName(data) {
            if (data.code!=200) {
              $("#businessError-"+id).trigger("click");
            }else {
              $("#businessCorrect-"+id).trigger("click");
            }

          }
        });
        dataSend={};
        $("#businessDelaylist-"+id).trigger("click");
      }

      $("#name-"+id).attr("disabled",true);
      $("#address-"+id).attr("disabled",true);
      $("#country-"+id).attr("disabled",true);
      $("#city-"+id).attr("disabled",true);
      $("#cp-"+id).attr("disabled",true);
      $("#owner-"+id).attr("disabled",true);
      $("#telefono-"+id).attr("disabled",true);
      $("#email-"+id).attr("disabled",true);
      $("#tipo-"+id).attr("disabled",true);

      $('.image-icon-'+id+' .dropify-wrapper .iconIcon').attr("disabled",true);
      $('.image-icon-'+id+' .dropify-wrapper').addClass("disabled");
      $('.image-banner-'+id+' .dropify-wrapper .banner').attr("disabled",true);
      $('.image-banner-'+id+' .dropify-wrapper').addClass("disabled");

      $('.btn-'+id).append("<span id='nameE-"+id+"'>Editar</span>");

    }else {
      //console.log('poner aqui para poder editar');
      $("#name-"+id).removeAttr("disabled");
      $("#address-"+id).removeAttr("disabled");
      $("#address-"+id).focus();
      $("#country-"+id).removeAttr("disabled");
      $("#city-"+id).removeAttr("disabled");
      $("#cp-"+id).removeAttr("disabled");
      $("#owner-"+id).removeAttr("disabled");
      $("#telefono-"+id).removeAttr("disabled");
      $("#email-"+id).removeAttr("disabled");
      $("#tipo-"+id).removeAttr("disabled");
      $('.image-icon-'+id+' .dropify-wrapper .iconIcon').removeAttr("disabled");
      $('.image-icon-'+id+' .dropify-wrapper').removeClass("disabled");
      $('.image-banner-'+id+' .dropify-wrapper .banner').removeAttr("disabled");
      $('.image-banner-'+id+' .dropify-wrapper').removeClass("disabled");
      icon = $('.image-icon-'+id+' .dropify-render img').attr('src');
      banner = $('.image-banner-'+id+' .dropify-render img').attr('src');

      $('.btn-'+id).append("<span id='nameE-"+id+"'>Guardar</span>");
      $("#name-"+id).keyup(function () {
        dataSend.nameCommerce = $("#name-"+id).val();
        flag=1;
        dataSend.flagBusiness=1;

      });
      $("#address-"+id).keyup(function () {
        dataSend.address = $("#address-"+id).val();
        flag=1;
        dataSend.flagBusiness=1;
      });
      $("#country-"+id).keyup(function () {
        dataSend.country = $("#country-"+id).val();
        flag=1;
        dataSend.flagBusiness=1;
      });
      $("#city-"+id).keyup(function () {
        dataSend.city = $("#city-"+id).val();
        flag=1;
        dataSend.flagBusiness=1;
      });
      $("#cp-"+id).keyup(function () {
        dataSend.cp = $("#cp-"+id).val();
        flag=1;
        dataSend.flagBusiness=1;
      });
      $("#owner-"+id).keyup(function () {
        flag=1;
        dataSend.flagUser=1;
        dataSend.name = $("#owner-"+id).val();
      });
      $("#telefono-"+id).keyup(function () {
        flag=1;
        dataSend.flagUser=1;
        dataSend.phone = $("#telefono-"+id).val();
      });
      $("#email-"+id).keyup(function () {
        flag=1;
        dataSend.flagUser=1;
        dataSend.email = $("#email-"+id).val();
      });
      $("#tipo-"+id).change(function () {
        flag = 1;
        dataSend.flagBusiness=1;
        dataSend.typeCommerce = $("#tipo-"+id).val();
      });
    }

  });

$('.btn-danger').click(function () {
  var button = $(this);
  var id = button.data('delete-id');
  $(".modal-"+id).css("visibility", "visible");

});

$('.btn-warning').click(function () {
  var button = $(this);
  var id = button.data('activate-id');
  $('.msg').empty();
  $('.msg').text('Seguro de Activar?');
  $('.ok').empty();
  $('.ok').text('Activar');
  $(".modal-"+id).css("visibility", "visible");

});

$('.ok').click(function () {
  var button = $(this);
  var activa = false, deleteB=false;
  var id = button.data('ok-id');
  var dataE = {};
  dataE.id = id;
  $('.modal-'+id).css("visibility", "hidden");
  if ($('#ok-'+id).text()=='Activar') {
    dataE.activa=true;
  }else {
    dataE.deleteB=true;
  }
  $.ajax({
    url:'/business',
    data:dataE,
    type: 'PUT',
    success: function functionName(data) {
      location.reload();
    }
  });

  if ($('#ok-'+id).text()=='Activar') {
    $("#businessactivada-"+id).trigger("click");
  }else {
    $("#businessok-"+id).trigger("click");
  }
});


$('.cancel').click(function () {
  var button = $(this);
  var id = button.data('cancel-id');
  $('.modal-'+id).css("visibility", "hidden");
  var delayMillis = 100;
  setTimeout(function() {
    $("#businesscancel-"+id).trigger("click");
  }, delayMillis);
});



$('.image-icon2 .dropify-wrapper').css({ borderRadius:"150px",width:"154px", height:"167px", marginLeft:"70px" });
$('.image-banner2 .dropify-wrapper').css({ width:"34%", height:"100%", marginLeft:"34%" });

$('.iconstyle .dropify-wrapper').css({ borderRadius:"150px",width:"154px", height:"167px", marginLeft:"70px" });
$('.bannerstyle .dropify-wrapper').css({ width:"34%", height:"100%", marginLeft:"34%" });


});
