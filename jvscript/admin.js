const API_URL = "http://127.0.0.1:8000/api/productos"; 
const token = localStorage.getItem("token");
if (!token) {
    window.location.href =
    "http://localhost/Tienda_Guitarras/content/login.html";
}
let editandoId = null;
const tabla = document.getElementById("tablaProductos");
const buscador = document.getElementById("buscadorAdmin");
let todosLosProductos = [];

//Renderizar Productos
function renderizarProductos(productos) {
    tabla.innerHTML = "";
    productos.forEach(producto => {

        tabla.innerHTML += `
            <tr>
                <td>${producto.id}</td>

                <td>
                    <img
                        src="..${producto.imagen}"
                        onerror="this.onerror=null;this.src='../assets/img/default_guitar.webp'"
                    >
                </td>

                <td>${producto.maker}</td>

                <td>${producto.model}</td>

                <td>
                    $${Number(producto.precio).toLocaleString("es-CO")}
                </td>

                <td>${producto.tipo}</td>

                <td>
                    <button 
                        class="edit"
                        onclick="editarProducto(${producto.id || 0})">
                        Edit
                    </button>

                    <button 
                        class="delete"
                        onclick="eliminarProducto(${producto.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// Cargar productos --------------------------------------------------------------------------------
async function cargarProductos() {
    try {
        const response = await fetch(API_URL);
        const productos = await response.json();
        todosLosProductos = productos;
        renderizarProductos(productos);
    }

    catch(error) {
        console.error(
            "Error loading products:",
            error
        );
    }
}

// Eliminar producto ----------------------------------------------------------------------------
async function eliminarProducto(id) {

    const confirmar = confirm(
        "Delete this guitar?"
    );

    if (!confirmar) return;
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        });
        cargarProductos();
    }

    catch(error) {
        console.error(
            "Error deleting product:",
            error
        );
    }
}

// Placeholder Editar ----------------------------------------------------------------------------
async function editarProducto(id) {
    if (!id) return;
    try {
        const response =
            await fetch(`${API_URL}/${id}`);

        const producto =
            await response.json();

        // activar modo edicion
        editandoId = id;

        // Campos basicos
        document.getElementById("maker").value = producto.maker || "";

        document.getElementById("model").value = producto.model || "";

        document.getElementById("introduced").value = producto.introduced || "";

        document.getElementById("precio").value = producto.precio || "";

        document.getElementById("tipo").value = producto.tipo || "";

        document.getElementById("imagen").value = producto.imagen || "";

        document.getElementById("imagenProducto").value = producto.imagen_producto || "";

        document.getElementById("reviewVideo").value = producto.review_video || "";

        // limpiar dinamicos
        finishesContainer
            .querySelectorAll("input")
            .forEach(input => input.remove());

        featuresContainer
            .querySelectorAll("input")
            .forEach(input => input.remove());

        usersContainer
            .querySelectorAll("input")
            .forEach(input => input.remove());

        // Features
        const features = [
            producto.feature1,
            producto.feature2,
            producto.feature3,
            producto.feature4,
            producto.feature5

        ];

        features.forEach(feature => {
            if (!feature) return;
            const input = document.createElement("input");
            input.type = "text";
            input.value = feature;
            featuresContainer.appendChild(input);
        });

        // finishes
        const finishes = [
            producto.finish1,
            producto.finish2,
            producto.finish3,
            producto.finish4,
            producto.finish5

        ];

        finishes.forEach(finish => {
            if (!finish) return;
            const input = document.createElement("input");
            input.type = "text";
            input.value = finish;
            finishesContainer.appendChild(input);
        });

        // Users
        const users = [
            producto.notable_user1,
            producto.notable_user2,
            producto.notable_user3
        ];

        users.forEach(user => {
            if (!user) return;
            const input = document.createElement("input");
            input.type = "text";
            input.value = user;
            usersContainer.appendChild(input);
        });

        // scroll
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    catch(error) {
        console.error(
            "Error loading guitar:",
            error
        );
    }
}


//---------------------------------------------------------------------------------------------------------------
// CONTENEDORES
const featuresContainer = document.getElementById("featuresContainer");
const finishesContainer = document.getElementById("finishesContainer");
const usersContainer = document.getElementById("usersContainer");

// BOTONES
const addFeatureBtn = document.getElementById("addFeature");
const addFinishBtn = document.getElementById("addFinish");
const addUserBtn = document.getElementById("addUser");


// ADD FEATURE
addFeatureBtn.addEventListener("click", () => {
    const total = featuresContainer.querySelectorAll("input").length;
    if (total >= 5) {
        alert("Maximum 5 features");
        return;
    }

    const input = document.createElement("input");
    input.type = "text";

    input.placeholder =
        `Feature ${total + 1}`;
    featuresContainer.appendChild(input);
});

// ADD FINISH
addFinishBtn.addEventListener("click", () => {
    const total = finishesContainer.querySelectorAll("input").length;
    if (total >= 5) {
        alert("Maximum 5 finishes");
        return;
    }

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder =
        `Finish ${total + 1}`;
    finishesContainer.appendChild(input);
});

// ADD USER
addUserBtn.addEventListener("click", () => {

    const total = usersContainer.querySelectorAll("input").length;
    if (total >= 3) {
        alert("Maximum 3 users");
        return;
    }

    const input = document.createElement("input");
    input.type = "text";

    input.placeholder =
        `User ${total + 1}`;
    usersContainer.appendChild(input);
});
//-------------------------------------------------------------------------------------------------------------


// Guardar GUitarra ----------------------------------------------------------------------------
document.getElementById("guardarProducto")
.addEventListener("click", async () => {

    // features
    const featureInputs = featuresContainer.querySelectorAll("input");
    const features = [...featureInputs].map(input => input.value);

    // Finishes
    const finishInputs = finishesContainer.querySelectorAll("input");
    const finishes = [...finishInputs].map(input => input.value);

    // Users
    const userInputs = usersContainer.querySelectorAll("input");
    console.log(userInputs);
    const users = [...userInputs].map(input => input.value);
    console.log(users);
    
    // Producto
    const nuevoProducto = {
        maker: document.getElementById("maker").value,

        model: document.getElementById("model").value,

        introduced: document.getElementById("introduced").value || null,

        tipo: document.getElementById("tipo").value,

        precio: document.getElementById("precio").value,

        imagen: document.getElementById("imagen").value,

        imagen_producto: document.getElementById("imagenProducto").value,

        review_video: document.getElementById("reviewVideo").value || null,

        // Users
        notable_user1: users[0] || null,
        notable_user2: users[1] || null,
        notable_user3: users[2] || null,

        // Features
        feature1: features[0] || null,
        feature2: features[1] || null,
        feature3: features[2] || null,
        feature4: features[3] || null,
        feature5: features[4] || null,

        // Finishes
        finish1: finishes[0] || null,
        finish2: finishes[1] || null,
        finish3: finishes[2] || null,
        finish4: finishes[3] || null,
        finish5: finishes[4] || null
    };

    try {
        const url = editandoId
        ? `${API_URL}/${editandoId}`
        : API_URL;

        const metodo = "POST";

        const response = await fetch(url, {
        method: metodo,
        headers: {
            "Content-Type":
                "application/json",

            Authorization:
                `Bearer ${token}`
        },
        body:
            JSON.stringify(nuevoProducto)
    });

        if (!response.ok) {
            throw new Error(
                "Error creating guitar"
            );
        }
        alert(
            "Guitar created successfully 🎸"
        );
        // Salir del modo edicion
        editandoId = null;

        // Limpiar el forms
        document.getElementById("maker").value = "";
        document.getElementById("model").value = "";
        document.getElementById("introduced").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("imagen").value = "";
        document.getElementById("imagenProducto").value = "";
        document.getElementById("reviewVideo").value = "";

        // Limpiar dinamicos
        featuresContainer.innerHTML = "<h3>Features</h3>";
        finishesContainer.innerHTML = "<h3>Finishes</h3>";
        usersContainer.innerHTML = "<h3>Notable Users</h3>";
        cargarProductos();
    }

    catch(error) {
        console.error(error);
        alert(
            "Error creating guitar"
        );
    }
});

//Buscador --------------------------------------------------------------------------------------------------
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = todosLosProductos.filter(producto => {
        return (
            producto.id.toString().includes(texto) ||
            producto.maker.toLowerCase().includes(texto) ||
            producto.model.toLowerCase().includes(texto)
        );
    });
    renderizarProductos(filtrados);
});

// Cargar al iniciar
cargarProductos();