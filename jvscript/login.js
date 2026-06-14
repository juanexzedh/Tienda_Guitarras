const API_LOGIN =
    "http://127.0.0.1:8000/api/login";

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(API_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();
        if (!response.ok || !data.token) {
            localStorage.clear();
            alert(
                data.error || "Invalid login"
            );
            return;
        }
        localStorage.setItem(
            "token",
            data.token
        );
        alert("Login successful 🔥");
        window.location.href = "http://localhost/Tienda_Guitarras/content/admin.html";
    }

    catch(error) {
        console.error(error);
        localStorage.clear();
        alert("Server error");
    }
});