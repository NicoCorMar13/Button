// Lista de días
const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const contenedor = document.getElementById("semanas");

// Pedir permiso de notificaciones al cargar
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

//Registramos el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('SW registrado', reg))
        .catch(err => console.log('Error registrando SW', err));
}

// Crear los inputs
dias.forEach(dia => {
    //Division por dia
  const div = document.createElement("div");
  div.classList.add("dia");

  //Letrero del dia
  const label = document.createElement("label");
  label.textContent = dia;

  //Entrada de texto
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Escribe algo...";
  input.id = dia;

  //Boton guardar
  const btn = document.createElement("button");
  btn.textContent = "Guardar";
  btn.style.marginTop = "5px";
  btn.id = dia;

  // Cargar lo que estaba guardado
  input.value = localStorage.getItem(dia) || "";

  // Guardar y notificar al escribir
  btn.addEventListener("click", async () => {
    //Obtenemos valor antiguo
    const valorAntiguo = localStorage.getItem(dia) || "";

    //Obtenemos el valor nuevo
    const valorNuevo = input.value

    //Comparamos valores
    if (valorNuevo === valorAntiguo){
        alert("No has hecho modificaciones a guardar.");
        return;/*Salimos de la funcion para que no continue y asi no hacemos cambios ni notificaciones de cambios*/
    }

    //Si son diferentes guardamos los cambios
    localStorage.setItem(dia, valorNuevo);

    //Alertamos que el usuario ha realizado cambios
    alert(`Has modificado el contenido del ${dia}`);

    //Comprobamos si se ha dado permiso para lanzar notificaciones
    if (Notification.permission !== "granted") {
        alert("No has dado permiso para notificaciones");
            return;//Si no hay permiso, salimos de la funcion para que no lance la notificacion
    }

    const registration = await navigator.serviceWorker.ready;

    //Lanzamos la notificacion al dispositivo
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