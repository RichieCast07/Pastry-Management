document.getElementById('add-postre-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value.trim();
    var id = document.getElementById('id').value.trim();
    var precio = document.getElementById('precio').value.trim();
    var imagenUrl = document.getElementById('imagen-postre').querySelector('img') ? document.getElementById('imagen-postre').querySelector('img').src : '';

    if (!nombre || !id || !precio || !imagenUrl) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Por favor complete todos los campos y seleccione una imagen.',
            showConfirmButton: false,
            timer: 2500
        });
        return;
    }

    if(precio<=0){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El precio no puede ser negativo o cero',
            showConfirmButton: false,
            timer: 2500
        });
    }
    else{
        guardarPostre(nombre, id, precio, imagenUrl);
    }


    document.getElementById('nombre').value = '';
    document.getElementById('id').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('hidden-image-input').value = '';
    var imagenPostre = document.getElementById('imagen-postre');
    imagenPostre.innerHTML = '';
    imagenPostre.style.display = 'none';
});

document.getElementById('hidden-image-input').addEventListener('change', function(event) {
    cargarImagen(event);
});

function cargarImagen(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var imagenPostre = document.getElementById('imagen-postre');
        imagenPostre.innerHTML = '';
        var newImg = document.createElement('img');
        newImg.src = e.target.result;
        newImg.style.width = "100%";
        newImg.style.height = "100%";
        newImg.style.objectFit = "cover";
        imagenPostre.appendChild(newImg);
        imagenPostre.style.display = 'flex';
        document.getElementById('upload-text').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function guardarPostre(nombre, id, precio, imagenUrl) {
    var postre = {
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagenUrl
    };

    var postres = JSON.parse(localStorage.getItem('postres')) || [];
    postres.push(postre);
    localStorage.setItem('postres', JSON.stringify(postres));

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Postre agregado correctamente.',
        showConfirmButton: false,
        timer: 2500
    });
}
