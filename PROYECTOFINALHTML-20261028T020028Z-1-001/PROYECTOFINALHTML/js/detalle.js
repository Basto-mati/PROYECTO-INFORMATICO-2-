const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const juego = juegos.find((item) => item.id === id);

if (!juego) {
    document.querySelector(".detalle").textContent = "No se encontró ese juego.";
} else {
    document.getElementById("juegoNombre").textContent = juego.nombre;
    document.getElementById("juegoCategoria").textContent = juego.categoria || "";
    document.getElementById("juegoDescripcion").textContent =
        juego.descripcion || "Todavía no hay una descripción para este juego.";

    const imagen = document.getElementById("juegoImagen");
    const galeria = document.getElementById("juegoGaleria");
    const fotos = juego.fotos && juego.fotos.length ? juego.fotos : [juego.imagen];
    let indiceFoto = 0;

    function mostrarFoto(indice) {
        indiceFoto = (indice + fotos.length) % fotos.length;
        imagen.src = fotos[indiceFoto];
        imagen.alt = "Imagen " + (indiceFoto + 1) + " de " + juego.nombre;

        galeria.querySelectorAll(".miniatura-foto").forEach((boton, i) => {
            boton.classList.toggle("activa", i === indiceFoto);
            boton.setAttribute("aria-pressed", String(i === indiceFoto));
        });
    }

    fotos.forEach((ruta, indice) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "miniatura-foto";
        boton.setAttribute("aria-label", "Mostrar foto " + (indice + 1));
        boton.setAttribute("aria-pressed", "false");

        const miniatura = document.createElement("img");
        miniatura.src = ruta;
        miniatura.alt = "";
        boton.appendChild(miniatura);
        boton.addEventListener("click", () => mostrarFoto(indice));
        galeria.appendChild(boton);
    });

    document.getElementById("fotoAnterior").addEventListener("click", () => {
        mostrarFoto(indiceFoto - 1);
    });
    document.getElementById("fotoSiguiente").addEventListener("click", () => {
        mostrarFoto(indiceFoto + 1);
    });

    mostrarFoto(0);
}