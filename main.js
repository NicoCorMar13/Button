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
  /*input.id = id;*/
  input.dataset.dia = dia;

  const btn = document.createElement("button");
  btn.textContent = "Guardar";
  btn.style.marginTop = "5px";
  /*btn.id = id;*/
  btn.dataset.dia = dia;

  // Cargar lo que estaba guardado
  input.value = localStorage.getItem(dia) || "";

  // Guardar y notificar al escribir
  btn.addEventListener("click", async () => {
    localStorage.setItem(dia, input.value);

    //const permission = await Notification.requestPermission();
    //console.log("Permiso: ", permission);

    if (Notification.permission !== "granted") {
        alert("No has dado permiso para notificaciones");
            return;
    }

    alert(`Has modificado el contenido del ${dia}`);

    const registration = await navigator.serviceWorker.ready;

    registration.showNotification("Modificacion guardada", {
        body: `Se actualizó ${dia}`,/*Para que muestre el dia, hay que utilizar acentos, no comillas*/
        icon: 'icono-192.png',
        tag: dia, /*Para agrupar las notificaciones del mismo dia*/
        data: {/*Para que al clickar nos lleve a este enlace*/
            url: "https://nicocormar13.github.io/Button/"
        }
    });
  });

  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(btn);
  contenedor.appendChild(div);
});

/*Para resaltar el dia cuando venimos de la notificacion*/
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const dia = params.get("dia");

    if (!dia) return;

    const bloque = document.querySelector(`.dia[data-dia="${dia}"]`);

    if (bloque) {
        bloque.classList.add("resaltado");

        bloque.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        setTimeout(() => {
            bloque.classList.remove("resaltado");
        }, 4000);
    }
});



