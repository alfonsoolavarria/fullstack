$(document).ready(function() {
  var flag=0, icon="";
  var dataSend = {};

  $('form').submit(function (e) {
    e.preventDefault();
    var datasend = {
      name:$("#nameCate").val(),
      imagen:$('.dropify-render img').attr('src'),
    }
    $(".categorySave").css("visibility","hidden");
    $(".loadgif").css("visibility","");
    $("#cateDelaysucc").trigger("click");
    $.post('/category',datasend)
    .done(function (result) {
      if (result.code==409) {
        $(".loadgif").css("visibility","hidden");
        $(".categorySave").css("visibility","");
        $("#cateErrorName").trigger("click");
      }else if (result.code==500) {
        $(".loadgif").css("visibility","hidden");
        $(".categorySave").css("visibility","");
        $("#cateErrorName").trigger("click");
      }else {
        $("#cateSave").trigger("click");
        $("#nameCate").val("");
        $(".dropify-render img").attr("src","");
        $(".dropify-preview").css("display","none");

        $(".loadgif").css("visibility","hidden");
        $(".categorySave").css("visibility","");
      }
    }).fail(function(error) {
      $("#cateError").trigger("click");
      $(".loadgif").css("visibility","hidden");
      $(".categorySave").css("visibility","");
    });
   });


  $(".edit-category").click(function() {
    var button = $(this);
    var id = button.data('custom-category');
    var text = button[0].innerText;
    if (text=='Guardar') {
      if (icon != $('.avatar-'+id+' .dropify-render img').attr('src')) {
        dataSend.icon = $('.avatar-'+id+' .dropify-render img').attr('src');
        dataSend.nameicon = $('.avatar-'+id+' .dropify-wrapper .dropify-preview .dropify-infos .dropify-infos-inner .dropify-filename .dropify-filename-inner').text();
        flag=1;
        icon = "";
      }

      if (flag==1) {
        flag = 0;
        $("#cateDelaysucc").trigger("click");
        button[0].innerText = 'Editar';
        $("#name-"+id).attr("disabled",true);
        $('.avatar-'+id+' .dropify-wrapper .iconIcon2').attr("disabled",true);
        $('.avatar-'+id+' .dropify-wrapper').addClass("disabled");
        $.ajax({
          url:'/category',
          data:dataSend,
          type: 'PUT',
          success: function functionName(data) {
            if (data.code==200) {
              $("#cateSave").trigger("click");
            }else {
              $("#cateError").trigger("click");
            }

          }
        });
      }
      button[0].innerText = 'Editar';
    }else {
      $('.avatar-'+id+' .dropify-wrapper .iconIcon2').removeAttr("disabled");
      $('.avatar-'+id+' .dropify-wrapper').removeClass("disabled");
      $("#name-"+id).removeAttr("disabled");
      $("#name-"+id).focus();
      button[0].innerText = 'Guardar';
      $("#name-"+id).keyup(function () {
        dataSend.name = $("#name-"+id).val();
        flag=1;
      });
      icon = $('.avatar-'+id+' .dropify-render img').attr('src');
      dataSend.id = id;
    }

  });

$('.avatar-online .dropify-wrapper').css({ borderRadius:"150px", height:"100px" });



});
