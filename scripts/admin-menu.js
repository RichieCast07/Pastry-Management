function goToAddDessert() {
    window.location.href = 'add.html';
}
function goToDeleteDessert() {
    window.location.href = 'delete.html';
}
function closeSession() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cerrando Sesión...',
        showConfirmButton: false,
        timer: 2500
    }).then(() => {
        window.location.href = '/index.html';
    });
}