const API_URL = "https://retoolapi.dev/LaVHx6/historial_compras";

$(document).ready(function () {
    const contenedor = $("#historial");
    $.ajax({
        url: API_URL,
        type: "GET",
        success: function (data) {

            let contenido = "";
            if (data.length === 0) {
                contenido = "<p>No purchases yet 🎸</p>";
            }

            data.forEach(compra => {

                let tipoClase = "";
                let botonClase = "boton-electric";

                if (compra.tipo === "acustica") {
                    tipoClase = "acoustic";
                    botonClase = "boton-acoustic";
                }
                if (compra.tipo === "electroacustica") {
                    tipoClase = "electro";
                    botonClase = "boton-electro";
                }
                if (compra.tipo === "electrica") {
                    tipoClase = "electric";
                    botonClase = "boton-electric";
                }

                contenido += `
                    <div class="card">

                        <div class="card-image">
                            <img src="/Tienda_Guitarras${compra.imagen}">
                        </div>

                        <div class="card-info">

                            <p class="${tipoClase}">
                                ${compra.nombre}
                            </p>

                            <p class="historial-precio">
                                $${Number(compra.precio).toLocaleString()}
                            </p>

                            <p class="historial-fecha">
                                Purchased: ${compra.fechaCompra}
                            </p>

                        </div>
                    </div>
                `;
            });
            contenedor.html(contenido);
        },

        error: function (error) {
            console.error("Error cargando historial:", error);
            contenedor.html("<p>Error loading purchases</p>");
        }
    });
});