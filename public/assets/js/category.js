$(document).ready(function() {
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
});
