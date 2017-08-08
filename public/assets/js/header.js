
$(document).ready(function() {
  $('#SelectBranch').change(function () {
    var element = $(this).find('option:selected');
    var buss = element.attr("data-buss");
    var owner = element.attr("data-owner");
    
    if (buss.length>0 && owner.length>0) {
      window.location.href = "/branch?buss="+buss+"&owner="+owner;
    }

  });
});
