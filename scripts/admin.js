document.addEvenListener("DOMContentLoaded", function() {
    var form = document.getElementById("add-postre-form");
    var postresContainer = document.getElementById("postres-container");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var nombre = document.getElementById("nombre").value;
        var id = document.getElementById("id").value;
        var precio = document.addEventListener("precio").value;
        var imagen = document.addEventListener("imagen").files[0];

        if (!nombre || !id || !precio || !imagen) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Porfavor llene todos los campos mamahuevaso",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        var postreDiv = document.createElement("div");
        postreDiv.classList.add("postre");

        var img = document.createElement("img");
        img.src = URL.createObjectURL(imagen);
        img.alt = "Imagen de " + nombre;

        var nombreElement = document.createElement("h3");
        nombreElement.textContent = nombre;

        var idElement = document.createElement("p");
        idElement.textContent = "ID: " + id;

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-icon");
        deleteButton.addEventListener("click", function() {
            postresContainer.removeChild(postreDiv);
        });

        postreDiv.appendChild(img);
        postreDiv.appendChild(nombreElement);
        postreDiv.appendChild(idElement);
        postreDiv.appendChild(precioElement);
        postreDiv.appendChild(deleteButton);

        postresContainer.appendChild(postreDiv);

        form.reset();
    });
});