class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class ListaEnlazada{
    constructor(){
        this.head = null;
        this.length = 0;
    }

    add(value){
        if(!this.head){
            this.head = value;
        }else{
            let actual = this.head;
            while(actual.next){
                actual= actual.next;
            }
            actual.next=value;
        }
        this.length ++;
    }
    removeIn(index){
        if (index < 0 || index >= this.length || !this.head) {
            return null; 
        }
        if (index === 0) {
            const nodeRemoved = this.head;
            this.head = nodeRemoved.next;
            this.length--;
            return nodeRemoved.dato;
        }
        let before = null;
        let actual = this.head;
        let counter = 0;
        while (counter < index) {
            before = actual;
            actual = actual.next;
            counter++;
        }
        before.next = actual.next;
        this.length--;
        return actual.dato;
    }

    get(index){
        if (index < 0 || index >= this.length || !this.head) {
            return null;
        }
        let counter = 0;
        let actual = this.head;
        while (counter < index) {
            actual = actual.next;
            counter++;
        }
        return actual.dato;
    }
}

class Postre {
    constructor(urlImg, id, name, precio){
        this.name = name;
        this.precio = precio;
        this.id = id;
        this.urlImg = urlImg;
        this.cantidad = 1;
    }
}

class Pedido {
    constructor(name, listaPostres, total, anticipo){
        this.name = name;
        this.listaPostres = listaPostres;
        this.total = total;
        this.anticipo = anticipo;
        this.restante = total-anticipo;
    }

    abonar(cantidad){
        this.restante = restante-cantidad;
    }
}