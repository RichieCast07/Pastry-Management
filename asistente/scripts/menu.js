function goToMakeDessert() {
    window.location.href = '../asistente/make.html';
}

function goToPaymentDessert() {
    window.location.href = '../asistente/payment.html';
}

function goToLookForDessert() {
    window.location.href = '../asistente/lookfor.html';
}

function closeSession() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cerrando Sesión...',
        showConfirmButton: false,
        timer: 2500
    }).then(() => {
        window.location.href = '../index.html';
    });
}