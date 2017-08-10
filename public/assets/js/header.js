
$(document).ready(function() {
  $('.selectData').click(function () {
    var element = $(this);
    var buss = element.attr("data-buss");
    var owner = element.attr("data-owner");
    if (buss.length>0 && owner.length>0) {
      //flagParamas 0:business 1:branch 2:calendar 3:employee y servicelist 4:client
      if ($('#flagParamas').val()=='0') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=0"+"&value="+$('#optionSelect').val();
      }else if ($('#flagParamas').val()=='1') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner;
      }else if ($('#flagParamas').val()=='2') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=2"+"&value="+$('#optionSelect').val();
      }else if ($('#flagParamas').val()=='3') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=3"+"&value="+$('#optionSelect').val();
      }else {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=4"+"&value="+$('#optionSelect').val();
      }
    }
  });

  /*$('#SelectBranch').change(function () {
    var element = $(this).find('option:selected');
    var buss = element.attr("data-buss");
    var owner = element.attr("data-owner");

    if (buss.length>0 && owner.length>0) {
      //flagParamas 0:business 1:branch 2:calendar 3:employee y servicelist 4:client
      if ($('#flagParamas').val()=='0') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=0"+"&value="+$('#optionSelect').val();
      }else if ($('#flagParamas').val()=='1') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner;
      }else if ($('#flagParamas').val()=='2') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=2"+"&value="+$('#optionSelect').val();
      }else if ($('#flagParamas').val()=='3') {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=3"+"&value="+$('#optionSelect').val();
      }else {
        window.location.href = "/branch?buss="+buss+"&owner="+owner+"&flagParamas=4"+"&value="+$('#optionSelect').val();
      }
    }
  });*/


});
