 function cargarPostresParaEliminar() {
    const postres = JSON.parse(localStorage.getItem('postres')) || [];
    const listaPostresContainer = document.getElementById('lista-postres');

    listaPostresContainer.innerHTML = '';

    postres.forEach((postre, index) => {
        const postreElement = document.createElement('div');
        postreElement.className = 'postre-item';
        postreElement.innerHTML = `
            <div class="postre-header" onclick="toggleDetails(this)">
                <img src="${postre.imagen}" alt="Imagen de ${postre.nombre}" class="postre-imagen">
                <div class="postre-info">
                    <h4 class="postre-nombre">Nombre: ${postre.nombre}</h4>
                    <p class="postre-id">ID: ${postre.id}</p>
                </div>
                <div class="price-delete-container">
                    <span class="postre-precio">$${postre.precio}</span>
                    <button onclick="eliminarPostre(event, ${index})" class="eliminar-btn"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        `;
        listaPostresContainer.appendChild(postreElement);
    });
}

function eliminarPostre(event, index) {
    event.stopPropagation();

    const postres = JSON.parse(localStorage.getItem('postres'));
    postres.splice(index, 1);
    localStorage.setItem('postres', JSON.stringify(postres));

    cargarPostresParaEliminar();
}

function toggleDetails(header) {
    const details = header.nextElementSibling;
    details.style.display = (details.style.display === 'none' || !details.style.display) ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', cargarPostresParaEliminar);
