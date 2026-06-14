$(document).ready(function () {

    const contenedor = $("#checkoutCard");

    const producto = JSON.parse(
        localStorage.getItem("compra_actual")
    );

    if (!producto) {

        contenedor.html("<p>No product selected</p>");
        return;
    }

    let botonClase = "boton-electric";

    if (producto.tipo === "acustica")
        botonClase = "boton-acoustic";

    if (producto.tipo === "electroacustica")
        botonClase = "boton-electro";

    if (producto.tipo === "electrica")
        botonClase = "boton-electric";

    contenedor.html(`
        <div class="card-image">

            <img src="/Tienda_Guitarras${producto.imagen_producto || producto.imagen}">

        </div>

        <div class="card-info">

            <p>
                ${producto.maker} ${producto.model}
            </p>

            <p>Year: ${producto.introduced}</p>

            <p>Type: ${producto.tipo}</p>

            <button id="confirmarCompra"
                class="boton ${botonClase}">

                Confirm Purchase

            </button>

        </div>
    `);

    $("#confirmarCompra").on("click", finalizarCompra);
});

function finalizarCompra() {

    const producto = JSON.parse(
        localStorage.getItem("compra_actual")
    );

    if (!producto) {

        alert("No selected product");
        return;
    }

    const compra = {

        nombre: `${producto.maker} ${producto.model}`,

        marca: producto.maker,

        tipo: producto.tipo,

        precio: producto.precio,

        imagen: producto.imagen,

        fechaCompra: new Date()
            .toISOString()
            .split("T")[0]
    };

    $.ajax({

        url: "https://retoolapi.dev/LaVHx6/historial_compras",

        type: "POST",

        contentType: "application/json",

        data: JSON.stringify(compra),

        success: function () {

            alert("Purchase Completed Successfully 🎸");

            localStorage.removeItem("compra_actual");

            window.location.href = "../index.html";
        },

        error: function (error) {

            console.error(
                "Error registering purchase:",
                error
            );

            alert("Purchase registration error");
        }
    });
}