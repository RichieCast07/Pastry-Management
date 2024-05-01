
const selectPedido = document.getElementById('pedidos-select');
const inputAbono = document.getElementById('cantidad-cobro');
const inputPagoCon = document.getElementById('pago-con');

if(selectPedido && inputAbono && inputPagoCon){
        
    window.addEventListener('load', function(){
        const select = this.document.getElementById("pedidos-select");

        pedidos.forEach(function(pedido, indice){
            let optionNew = document.createElement("option");
            optionNew.value=indice;
            optionNew.textContent=pedido.nombre;
            select.appendChild(optionNew);

        });
    });

    console.log(pedidos)

    function actualizarListaPedidos() {
        selectPedido.innerHTML = '';
        let i=0;
        pedidos.forEach(pedido => {
            let option = document.createElement('option');
            option.value = i; 
            option.textContent = pedido.nombre;
            selectPedido.appendChild(option);
            i++
        });
    }

    if(selectPedido){
        selectPedido.addEventListener('change', function(){
            const deudaSpan = document.getElementById("deuda");
            deudaSpan.textContent = pedidos[selectPedido.value].deuda;
        })
    }
    if(inputAbono){
        inputAbono.addEventListener('change', function(){
            const deudaActualSpan = document.getElementById("deuda-actual");
            deudaActualSpan.textContent = pedidos[selectPedido.value].deuda-inputAbono.value;
        })
    }
    if(inputPagoCon){
        inputPagoCon.addEventListener('change', function(){
            if(inputAbono.value<=inputPagoCon.value){                
                const cambio = document.getElementById("cambio");
                cambio.textContent = inputPagoCon.value-inputAbono.value;
            }else{
                alert("No intente pagar con una cantidad menor a la que va a abonar");
            }
        })
    }

    function calcularCambio() {
        const pagoCon = parseFloat(document.getElementById('pago-con').value);
        if (pagoCon < 0) {
            alert('El pago no puede ser negativo.');
            return;
        }
        const cantidadCobro = parseFloat(document.getElementById('cantidad-cobro').value);
        if (cantidadCobro <= 0) {
            alert('La cantidad a cobrar debe ser mayor que cero.');
            return;
        }
        const cambio = Math.max(pagoCon - cantidadCobro, 0);
        document.getElementById('cambio').textContent = `$${cambio.toFixed(2)}`;
    }

    function realizarCobro() {
        const deudaSpan = document.getElementById("deuda");
        deudaSpan.textContent = pedidos[selectPedido.value].deuda;
        const deudaActualSpan = document.getElementById("deuda-actual");
        deudaActualSpan.textContent = pedidos[selectPedido.value].deuda-parseFloat(inputAbono.value);
        const cambio = document.getElementById("cambio");
        cambio.textContent = parseFloat(inputPagoCon.value)-parseFloat(inputAbono.value);
        console.log(pedidos[selectPedido.value].deuda);

        pedidos[selectPedido.value].deuda = pedidos[selectPedido.value].deuda-parseFloat(inputAbono.value);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        console.log(pedidos[selectPedido.value].deuda);
        Swal.fire({
            icon: 'success',
            title: 'Pago exitoso',
            html: 'Pago realizado con exito',
            confirmButtonText: 'Cerrar'
        }).then((result) => {
            inputAbono.value="";
            inputPagoCon.value="";
            console.log(pedidos);  
        });
    }

}