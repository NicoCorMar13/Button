const button = document.getElementById("notifyBtn");

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.error("Error SW:", err));
}

button.addEventListener("click", async () => {
    // Pedir permiso
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification("¡Hola! 👋", {
                body: "Has hecho clic en el botón",
                icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
            });
        });
    } else {
        alert("Permiso denegado para notificaciones");
    }
});