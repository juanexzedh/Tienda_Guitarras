const tituloPagina = document.querySelector('h1').innerText.toLowerCase();
const contenedor = document.getElementById('contenedor-guitarras');
const activarPrecio = document.getElementById("activarPrecio");
const searchInput = document.getElementById("searchInput");
const priceSlider = document.getElementById("priceSlider");
const priceValue = document.getElementById("priceValue");
const brandContainer = document.getElementById("brandFilters");
const paginacionContainer = document.getElementById("paginacion");

let todasLasGuitarras = [];

// Paginacion
let paginaActual = 1;
const guitarrasPorPagina = 9;

// API Laravel
fetch('http://127.0.0.1:8000/api/productos')
.then(res => res.json())
.then(data => {
    console.log(data);

    todasLasGuitarras = data;
    generarFiltrosMarca(data);
    aplicarFiltros();
})
.catch(error => console.error("Error cargando API:", error));

// Generar marcas automáticamente
function generarFiltrosMarca(guitarras) {

    brandContainer.innerHTML = "";

    const marcas = [...new Set(guitarras.map(g => g.maker))];

    marcas.forEach(marca => {

        const label = document.createElement("label");

        label.innerHTML = `
            <input type="checkbox" value="${marca}">
            ${marca}
        `;

        brandContainer.appendChild(label);
    });
}

// Renderizar guitarras
function renderizarGuitarras(guitarras) {

    contenedor.innerHTML = "";

    const inicio = (paginaActual - 1) * guitarrasPorPagina;
    const fin = inicio + guitarrasPorPagina;

    const guitarrasPagina = guitarras.slice(inicio, fin);

    if (guitarrasPagina.length === 0) {

        contenedor.innerHTML = "<p>No guitars found.</p>";
        return;
    }

    guitarrasPagina.forEach(g => {

        const slug = encodeURIComponent(g.id);

        const card = document.createElement("a");

        card.classList.add("card");

        card.href = `products/product-${tituloPagina}.html?guitar=${slug}`;

        card.innerHTML = `
            <div class="imagen">

                <img 
                    src="..${g.imagen}"
                    alt="${g.model}" 
                    onerror="this.onerror=null;this.src='/Tienda_Guitarras/assets/img/default_guitar.webp'"
                >

                ${g.introduced < 1960 ? '<div class="badge">Vintage</div>' : ''}

            </div>

            <div class="info">

                <h4 class="guitar-name">
                    ${g.maker} ${g.model}
                </h4>

                <p class="price">
                    $${Number(g.precio).toLocaleString("es-CO")}
                </p>

                <button class="buy-btn">
                    More Info
                </button>

            </div>
        `;

        contenedor.appendChild(card);
    });
}

// Paginacion
function renderizarPaginacion(guitarras) {

    paginacionContainer.innerHTML = "";

    const totalPaginas = Math.ceil(guitarras.length / guitarrasPorPagina);

    if (totalPaginas <= 1) return;

    for (let i = 1; i <= totalPaginas; i++) {

        const btn = document.createElement("button");

        btn.textContent = i;

        if (i === paginaActual) {
            btn.classList.add("activo");
        }

        btn.addEventListener("click", () => {

            paginaActual = i;

            renderizarGuitarras(guitarras);
            renderizarPaginacion(guitarras);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        paginacionContainer.appendChild(btn);
    }
}

// Aplicar filtros
function aplicarFiltros() {

    let resultado = [...todasLasGuitarras];

    const textoBusqueda = searchInput.value.toLowerCase();

    const precioMax = Number(priceSlider.value);

    const marcasSeleccionadas = [
        ...document.querySelectorAll("#brandFilters input:checked")
    ].map(el => el.value);

    // FILTRO POR TIPO
    const filtroMap = {
        'acoustic': 'acustica',
        'electric': 'electrica',
        'electroacoustic': 'electroacustica'
    };

    const tipoDeseado = filtroMap[tituloPagina];

    resultado = resultado.filter(g => g.tipo === tipoDeseado);

    // FILTRO BUSCADOR
    if (textoBusqueda !== "") {

        resultado = resultado.filter(g =>
            (g.maker + " " + g.model)
            .toLowerCase()
            .includes(textoBusqueda)
        );
    }

    // FILTRO PRECIO
    if (activarPrecio.checked) {

        resultado = resultado.filter(g =>
            g.precio <= precioMax
        );
    }

    // FILTRO MARCA
    if (marcasSeleccionadas.length > 0) {

        resultado = resultado.filter(g =>
            marcasSeleccionadas.includes(g.maker)
        );
    }

    paginaActual = 1;

    renderizarGuitarras(resultado);
    renderizarPaginacion(resultado);
}

// EVENTOS
searchInput.addEventListener("input", aplicarFiltros);

priceSlider.addEventListener("input", () => {

    const precio = Number(priceSlider.value);

    priceValue.textContent = "$" + precio.toLocaleString("es-CO");

    aplicarFiltros();
});

activarPrecio.addEventListener("change", () => {

    priceSlider.disabled = !activarPrecio.checked;

    aplicarFiltros();
});

brandContainer.addEventListener("change", aplicarFiltros);