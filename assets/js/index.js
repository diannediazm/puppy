
    $(function(){
      $("[data-toggle='tooltip']").tooltip();
      $("[data-toggle='popover']").popover();
      $('#contacto').on('show.bs.modal', function (e) {
      console.log('el modal se está mostrando');
        $('#contactoBTN').removeClass('btn-outline-success');
        $('#contactoBTN').addClass('btn-primary');
        $('#contactoBTN').prop('disabled', true);
      });
      $('#contacto').on('shown.bs.modal', function (e) {
      console.log('el modal se mostró');
      });
      $('#contacto').on('hide.bs.modal', function (e) {
      console.log('el modal se está ocultando');
      });
      $('#contacto').on('hidden.bs.modal', function (e) {
      console.log('el modal se ocultó');
      $('#contactoBTN').prop('disabled', false);
      $('#contactoBTN').removeClass('btn-primary');
      $('#contactoBTN').addClass('btn-outline-success');
      });
  });
