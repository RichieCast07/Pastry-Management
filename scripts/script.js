function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var users = [
        { username: "admin", password: "admin123", role: "administrador"},
        { username: "asistente", password: "asistente123", role: "asistente"}
    ];

    var found = false;
    var userRole = null;

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            found = true;
            userRole = users[i].role;
            break;
        }
    }

    if (found) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Inicio de Sesión Exitoso!",
            showConfirmButton: false,
            timer: 2500
        }).then(() => {
            if (userRole === "administrador") {
                window.location.href = "dashboard-admin.html";
            } else if (userRole === "asistente") {
                window.location.href = "../asistente/menu.html";
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops... datos incorrectos",
            text: "Por favor, intente de nuevo",
        });
    }
}

function menuUser(role) {
    var btnContainer = document.createElement("div");
    var arrayUser;

    if (role === "administrador") {
        arrayUser = [
            {id: "btn-add", content: "Añadir postre", nameFunction:"addDessert"},
            {id: "btn-delete", content: "Eliminar postre", nameFunction:"deleteDessert"}
        ];
    } else if (role === "asistente") {
        arrayUser = [
            {id: "btn-pedido", content: "Hacer pedido", nameFunction:"addPedido"},
            {id: "btn-cobro", content: "Cobrar", nameFunction:"hacerCobro"},
            {id: "btn-search", content: "Buscar", nameFunction:"search"}
        ];
    }

    for (let i = 0; i < arrayUser.length; i++) {
        var btn = document.createElement("button");
        btn.textContent = arrayUser[i].content;
        btn.id = arrayUser[i].id;
        btn.addEventListener("click", window[arrayUser[i].nameFunction]);
        btnContainer.appendChild(btn);
    };

    btnContainer.classList.add("sidebar");
    document.body.appendChild(btnContainer);
}
