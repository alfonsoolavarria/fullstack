$(document).ready(function() {

  $('form').submit(function (e) {
    e.preventDefault();
    var dataSend = {
      direccion : e.currentTarget[0].value,
      cuidad : e.currentTarget[1].value,
      country : e.currentTarget[2].value,
      cp : e.currentTarget[3].value,
      tiponegocio : e.currentTarget[4].value,
      nombrenegocio : e.currentTarget[5].value,
      nombre : e.currentTarget[6].value,
      phone : e.currentTarget[7].value,
      email : e.currentTarget[8].value,
      pwd : e.currentTarget[9].value,
      type:'Propietario'
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
      if (dataSend.direccion && dataSend.cuidad && dataSend.cp) {
        $("#businessDelaysucc").trigger("click");
        $(".clean").trigger("click");
        $.post('/business',dataSend)
        .done(function (result) {
          if (result.valores.length>0) {
            //$(".page2").css('visibility','visible');
            //$(".registerBusiness").css('visibility','visible');
            //$("#detailsBusiness").append('<input type="text" class="form-control details" name="detalles" placeholder="Detalles" autocomplete="off" value="'+result.valores[0].name+'" required/>');
            console.log('****',result.valores[0].latlong.latitude);
            console.log('****',result.valores[0].latlong.longitude);
            console.log('****',result.valores[0].name);
            //$(".negocio").attr('value',result.valores[0].name);
          }else {
            $(".negocio").attr('value','');
          }
        }).fail(function(error) {
          console.log(error.responseText);
          $("#businessDelayerr").trigger("click");
          $(".clean").trigger("click");
        });

      }else {
        console.log('nises');
      }
    //});
  });

});
