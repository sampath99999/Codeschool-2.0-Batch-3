app.service("swalService", function () {
  this.showAlert = function (title, message, type) {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      timer: 1000,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  };
});
