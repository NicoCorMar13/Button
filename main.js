/*const button = document.getElementById("boton");

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
}*/

// Lista de días
const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const contenedor = document.getElementById("semanas");

// Pedir permiso de notificaciones al cargar
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Crear los inputs
dias.forEach(dia => {
  const div = document.createElement("div");
  div.classList.add("dia");

  const label = document.createElement("label");
  label.textContent = dia;

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Escribe algo...";
  input.id = dia;

  // Cargar lo que estaba guardado
  input.value = localStorage.getItem(dia) || "";

  // Guardar y notificar al escribir
  input.addEventListener("input", () => {
    localStorage.setItem(dia, input.value);

    if (Notification.permission === "granted") {
      new Notification(`Se actualizó ${dia}`, {
        body: input.value ? `Nuevo texto: "${input.value}"` : "Texto borrado",
        icon: "icono-192.png" // si quieres un icono
      });
    }
  });

  div.appendChild(label);
  div.appendChild(input);
  contenedor.appendChild(div);
});

