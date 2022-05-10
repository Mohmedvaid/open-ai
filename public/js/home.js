$(document).ready(function() {
  $('#formMain').submit(function(e) {
    e.preventDefault();
    var form = $(this);
    console.log(form.serialize());
  })
})