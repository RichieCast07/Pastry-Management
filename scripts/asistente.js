function addPedido() {
    var container = document.createElement("form");
    alert("Hacer Pedidos");
}

function hacerCobro() {
    var form = document.createElement("form");
    var selectPedido = document.createElement("select");
    var inputCantidadCobro = document.createElement("input");
    var inputCantidadPago = document.createElement("input");
    var labelDeuda = document.createElement("label");
    var labelCambio = document.createElement("label");
    var labelDeudaActual = document.createElement("label");
    var btnCobrar = document.createElement("button");
    var encabezado = document.createElement("h1")


    for(let i=0; i<listaPedidos; i++){
        var optionPedido = document.createElement("option");

        optionPedido.value = i;
        optionPedido.textContent = listaPedidos.get(i).nombre;

        selectPedido.appendChild(optionPedido);
    }

    encabezado.classList.add("encabezado");
    selectPedido.classList.add("selectPedido");
    selectPedido.id="select-pedido";
    inputCantidadCobro.classList.add("elemento");
    inputCantidadCobro.id = "cantidad-cobro";
    inputCantidadCobro.addEventListener("input", actualizarDeuda);
    inputCantidadPago.classList.add("elemento");
    inputCantidadPago.id = "cantidad-pago";
    inputCantidadPago.addEventListener("input", actualizarCambio);
    labelCambio.classList.add("elemento");
    labelCambio.id = "cambio";
    labelDeuda.classList.add("elemento");
    labelDeuda.id = "deuda";
    labelDeudaActual.classList.add("elemento");
    labelDeudaActual.id = "deuda-actual";
    btnCobrar.classList.add("elemento");
    btnCobrar.id="btn-cobrar";
    btnCobrar.addEventListener("click", cobrar);

    form.appendChild(selectPedido);
    form.appendChild(inputCantidadCobro);
    form.appendChild(labelDeuda);
    form.appendChild(inputCantidadPago);
    form.appendChild(labelCambio);
    form.appendChild(btnCobrar);
    form.appendChild(labelDeudaActual);

    document.body.appendChild(encabezado);
    document.body.appendChild(form);
}

function cobrar(){
    var selectPedido = document.getElementById("select-pedido");
    var inputCantidadCobro = document.getElementById("cantidad-cobro");

    listaPedidos.get(selectPedido.value).abonar(inputCantidadCobro.value);
    alert("Cobro realizado con éxito"); 
}

function actualizarCambio(){
    var inputCantidadCobro = document.getElementById("cantidad-cobro");
    var inputCantidadPago = document.createElement("cantidad-pago");
    var labelCambio = document.createElement("cambio");
    var boton = document.getElementById("btn-cobrar");

    if(inputCantidadPago.value>=inputCantidadCobro.value){
        labelCambio.textContent = inputCantidadPago.value-inputCantidadCobro.value;
    }else{
        labelCambio.textContent ="!!!!!!"
        boton.disabled=true;
    }
}

function actualizarDeuda(){
    var inputCantidadCobro = document.getElementById("cantidad-cobro");
    var labelDeudaActual = document.createElement("deuda-actual");
    var labelDeuda = document.getElementById("btn-cobrar");

    labelDeudaActual.textContent = labelDeuda.textContent-inputCantidadCobro.value;
}

function search() {
    
}
