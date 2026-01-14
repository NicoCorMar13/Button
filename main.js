const button = document.getElementById("boton");

console.log("JS cargado:", button);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.error("Error SW:", err));
}

if (button) {
    button.addEventListener("click", async () => {
        console.log("Botón pulsado");

        const permission = await Notification.requestPermission();
        console.log("Permiso:", permission);

        if (permission === "granted") {
            const registration = await navigator.serviceWorker.ready;
            registration.showNotification("¡Hola! 👋", {
                body: "Has hecho clic en el botón",
            });
        } else {
            alert("No diste permiso para notificaciones");
        }
    });
} else {
    console.error("❌ No se encontró el botón notifyBtn");
}

