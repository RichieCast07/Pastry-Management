
const postres = JSON.parse(localStorage.getItem('postres')) || [];

window.addEventListener('load', function(){
    const selectPostres = this.document.getElementById("tipo-postre");

    if(selectPostres){
        postres.forEach(function(postre, indice){
            let optionNewPostre = document.createElement("option");
            optionNewPostre.value=indice;
            optionNewPostre.textContent=postre.nombre;
            selectPostres.appendChild(optionNewPostre);

        });
    }
});


let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
let selectPostre = document.getElementById('tipo-postre');

if(selectPostre){
    selectPostre.addEventListener('change', function() {
        const tipoPostre = postres[this.value];
        const pedidoExistente = pedidos.find(p => p.tipo === tipoPostre.nombre);
        const cantidadInput = document.querySelector('.cantidad-postre');
    
        cantidadInput.value = pedidoExistente ? pedidoExistente.cantidad : 1;
        actualizarTotal(cantidadInput.value);
    });
}

document.querySelectorAll('.ajustar-cantidad').forEach(button => {
    button.addEventListener('click', function() {
        const incrementar = this.dataset.increment === 'true';
        ajustarCantidad(incrementar);
    });
});

function ajustarCantidad(incrementar) {
    const cantidadInput = document.querySelector('.cantidad-postre');
    let cantidad = parseInt(cantidadInput.value);
    cantidad = incrementar ? cantidad + 1 : Math.max(1, cantidad - 1);
    cantidadInput.value = cantidad;
    actualizarTotal(cantidad);
}

function actualizarPedido() {
    const anticipo = parseFloat(document.querySelector('.anticipo').value);
    const nombre = document.getElementById('nombre-cliente').value;
    const tipoPostre = postres[document.getElementById('tipo-postre').value];
    const cantidad = parseInt(document.querySelector('.cantidad-postre').value);
    const pedidoExistente = pedidos.find(p => p.nombre === nombre);
    if (pedidoExistente) {
        console.log("Ajuste de cant")
        pedidoExistente.cantidad = cantidad;
    } else {
        console.log("Nuevo pedido")
        let nuevoPedido = {nombre: nombre, tipo: tipoPostre, cantidad: cantidad, deuda: (tipoPostre.precio * cantidad)-anticipo };
        pedidos.push(nuevoPedido);
        console.log(pedidos[pedidos.length-1]);
        
    }
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function calcularTotal(cant) {
    const tipoPostre = postres[document.getElementById('tipo-postre').value];
    return  tipoPostre.precio * cant;
}

function actualizarTotal(cant) {
    const total = calcularTotal(cant);
    document.querySelector('.a-pagar').textContent = `A pagar: $${total}`;
}

let pedidoForm = document.getElementById('pedido-form');

if(pedidoForm){
    
    pedidoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre-cliente').value;
        const anticipo = parseFloat(document.querySelector('.anticipo').value);
        const tipoPostre = postres[document.getElementById('tipo-postre').value];
        const cantidad = parseInt(document.querySelector('.cantidad-postre').value);
        const total =  tipoPostre.precio * cantidad ;
        console.log(total)
        if (anticipo <= 0) {
            alert('El anticipo debe ser mayor que cero.');
            return;
        }
        if (total <= anticipo) {
            alert('El total debe ser mayor que el anticipo.');
            return;
        } 
        Swal.fire({
            icon: 'success',
            title: 'Pedido realizado',
            html: `Pedido realizado por ${nombre}. Total antes de anticipo: $${total}. Anticipo: $${anticipo}. Total a pagar: $${total - anticipo}`,
            confirmButtonText: 'Cerrar'
        }).then((result) => {
            if (result.isConfirmed) {
                actualizarPedido();
                document.getElementById('pedido-form').reset();
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
            }
        });
    });

}