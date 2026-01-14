button.addEventListener("click", async () => {
    let permission = Notification.permission;
    console.log("Estado inicial:", permission);

    if (permission === "default") {
        permission = await Notification.requestPermission();
        console.log("Resultado:", permission);
    }

    if (permission !== "granted") {
        console.warn("Permiso no concedido");
        alert("No tienes permiso para notificaciones (política de empresa)");
        return;
    }

    // Notificación directa → la más resistente a políticas corporativas
    try {
        new Notification("¡Prueba en empresa!", {
            body: "Notificación sin Service Worker (modo desarrollo)",
            icon: "/tu-icono-local.png"  // mejor usa uno local si puedes
        });
        console.log("Notificación directa mostrada OK");
    } catch (err) {
        console.error("Error incluso en directa:", err);
    }
});