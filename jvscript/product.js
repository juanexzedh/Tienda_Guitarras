const params = new URLSearchParams(window.location.search);
const id = params.get("guitar");

const titulo = document.getElementById("guitarTitle");
const imagen = document.getElementById("guitarImage");
const specs = document.getElementById("specs");
const video = document.getElementById("reviewVideo");

fetch(`http://127.0.0.1:8000/api/productos/${id}`)

.then(res => res.json())

.then(guitarra => {

    if (!guitarra) {

        document.body.innerHTML = "<h2>Guitar not found</h2>";
        return;
    }

    const buyBtn = document.querySelector(".buy-btn");

    buyBtn.addEventListener("click", () => {

        localStorage.setItem(
            "compra_actual",
            JSON.stringify(guitarra)
        );

        window.location.href = "../checkout.html";
    });
    
    titulo.textContent = guitarra.maker + " " + guitarra.model;
    imagen.src = "../.." + (guitarra.imagen_producto || guitarra.imagen);
    imagen.onerror = () => {
        imagen.onerror = null;
        imagen.src = "../../assets/img/default_guitar.webp";
    };

    specs.innerHTML = "";

    function agregarSpec(nombre, valor) {
        if (!valor || valor === "null") return;
        const li = document.createElement("li");
        li.innerHTML = `<strong>${nombre}:</strong> ${valor}`;
        specs.appendChild(li);
    }

    agregarSpec("Maker", guitarra.maker);
    agregarSpec("Model", guitarra.model);
    agregarSpec("Introduced", guitarra.introduced);
    agregarSpec("Popularity", guitarra.popularity);
    agregarSpec("Production Dates", guitarra.dates);

    agregarSpec(
        "Price",
        "$" + Number(guitarra.precio).toLocaleString("es-CO")
    );

    const users = [
        guitarra.notable_user1,
        guitarra.notable_user2,
        guitarra.notable_user3
    ].filter(u => u && u !== "null");

    if (users.length > 0) {

        agregarSpec(
            "Notable Users",
            users.join(", ")
        );
    }

    const features = [
        guitarra.feature1,
        guitarra.feature2,
        guitarra.feature3,
        guitarra.feature4,
        guitarra.feature5
    ].filter(f => f && f !== "null");

    features.forEach((f, i) => {

        agregarSpec("Feature " + (i + 1), f);
    });

    if (guitarra.review_video) {

        let url = guitarra.review_video;
        let videoID = "";

        if (url.includes("youtu.be/")) {
            videoID = url.split("youtu.be/")[1].split("?")[0];
        }

        else if (url.includes("watch?v=")) {

            videoID = url.split("watch?v=")[1].split("&")[0];
        }
        video.src = `https://www.youtube.com/embed/${videoID}`;
    }
})

.catch(error => {

    console.error("Error loading guitar:", error);
});