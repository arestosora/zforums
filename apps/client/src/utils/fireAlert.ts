import Swal from 'sweetalert2';

export const showSuccessAlert = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title'
      }
    });
  };
  
  export const showErrorAlert = (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title'
      }
    });
  };