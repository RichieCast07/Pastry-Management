console.log(pedidos)

function buscar(){
    let master = document.getElementById("results");
    let container = document.getElementById("result-container");
    let aBuscar = document.getElementById("buscador").value;
    let mjeNoEncontrado = document.getElementById("not-found");
    let found= false;
    if(container){
        container.remove();
        let newContainer = document.createElement("div");
        newContainer.id = "result-container";
        master.appendChild(newContainer);
    }else{
        let newContainer = document.createElement("div");
        newContainer.id = "result-container";
        master.appendChild(newContainer);
    }
    
    pedidos.forEach(pedido => {
        if(pedido.nombre === aBuscar || pedido.tipo.nombre === aBuscar){
            mjeNoEncontrado.textContent = "";
            renderizarEncontrado(pedido);
            found = true;
        }
    });
    if(!found){
        mjeNoEncontrado.textContent = "No hay pedidos que coincidan";
    }
}

function renderizarEncontrado(pedido){
    let container = document.getElementById("result-container");

    const pedidoElement = document.createElement('div');
    pedidoElement.className = 'pedido-item';
    if(pedido.tipo.nombre){
        pedidoElement.innerHTML = `
        <div class="pedido-header" onclick="toggleDetails(this)">
            <img src="${pedido.tipo.imagen}" alt="Imagen de ${pedido.tipo.nombre}" class="pedido-imagen">
            <div class="pedido-info">
                <h4 class="pedido-nombre">Nombre: ${pedido.nombre}</h4>
                <p class="pedido-total">Total: ${pedido.tipo.precio*pedido.cantidad}</p>
            </div>
            <div class="price-delete-container">
                <span class="postre-precio">Restante: $${pedido.deuda}</span></div>
        </div>
    `;
    }else{
        pedidoElement.innerHTML = `
        <div class="pedido-header" onclick="toggleDetails(this)">
            <div class="postre-imagen"></div>
            <div class="pedido-info">
                <h4 class="pedido-nombre">Nombre: ${pedido.nombre}</h4>
                <p class="pedido-total">Postre: ${pedido.tipo}</p>
            </div>
            <div class="price-delete-container">
                <span class="postre-precio">Restante: $${pedido.deuda}</span></div>
        </div>
    `;
    }
    container.appendChild(pedidoElement);
}