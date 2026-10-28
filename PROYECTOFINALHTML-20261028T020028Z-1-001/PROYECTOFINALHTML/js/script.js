const slides = document.querySelectorAll(".slide");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const carrusel = document.querySelector(".contenedor-carrusel-banner");

let indice = 0;
let temporizador;

function mostrarSlide(nuevoIndice) {
    if (nuevoIndice >= slides.length) {
        nuevoIndice = 0;
    } else if (nuevoIndice < 0) {
        nuevoIndice = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("activa");
    }

    slides[nuevoIndice].classList.add("activa");
    indice = nuevoIndice;
}

function iniciarAutoplay() {
    temporizador = setInterval(function () {
        mostrarSlide(indice + 1);
    }, 5000);
}

function detenerAutoplay() {
    clearInterval(temporizador);
}

btnPrev.addEventListener("click", function () {
    mostrarSlide(indice - 1);
});

btnNext.addEventListener("click", function () {
    mostrarSlide(indice + 1);
});

carrusel.addEventListener("mouseenter", detenerAutoplay);
carrusel.addEventListener("mouseleave", iniciarAutoplay);

iniciarAutoplay();

function obtenerFavoritos() {
    const guardados = JSON.parse(localStorage.getItem("wishlist")) || [];

    return guardados
        .map((favorito) => {
            if (typeof favorito === "number") {
                const juego = juegos.find((item) => item.id === favorito);
                return juego
                    ? {
                        id: juego.imagen,
                        nombre: juego.nombre,
                        imagen: juego.imagen,
                        detalleId: juego.id
                    }
                    : null;
            }

            return favorito;
        })
        .filter(Boolean);
}

function actualizarBotonesFavoritos(juego) {
    const agregado = obtenerFavoritos().some((favorito) => favorito.id === juego.id);

    document.querySelectorAll(".btn-favorito[data-juego-id]").forEach((boton) => {
        if (boton.dataset.juegoId !== juego.id) {
            return;
        }

        boton.textContent = agregado ? "♥ Agregado" : "♡ Agregar";
        boton.setAttribute(
            "aria-label",
            (agregado ? "Quitar " : "Agregar ") + juego.nombre + " " +
                (agregado ? "de" : "a") + " la wishlist"
        );
        boton.setAttribute("aria-pressed", String(agregado));
    });
}

document.querySelectorAll(".tarjeta-pelicula").forEach((tarjeta) => {
    const imagen = tarjeta.querySelector(".poster-contenedor img");
    const titulo = tarjeta.querySelector(".titulo-pelicula");
    const informacion = tarjeta.querySelector(".info-pelicula");

    if (!imagen || !titulo || !informacion) {
        return;
    }

    const juego = {
        id: imagen.getAttribute("src"),
        nombre: titulo.textContent.trim(),
        imagen: imagen.getAttribute("src"),
        detalleId: juegos.find((item) => item.imagen === imagen.getAttribute("src"))?.id
    };
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-favorito";
    boton.dataset.juegoId = juego.id;
    informacion.appendChild(boton);

    boton.addEventListener("click", () => {
        const favoritos = obtenerFavoritos();
        const existe = favoritos.some((favorito) => favorito.id === juego.id);
        const favoritosActualizados = existe
            ? favoritos.filter((favorito) => favorito.id !== juego.id)
            : [...favoritos, juego];

        localStorage.setItem("wishlist", JSON.stringify(favoritosActualizados));
        actualizarBotonesFavoritos(juego);
    });

    actualizarBotonesFavoritos(juego);
});
