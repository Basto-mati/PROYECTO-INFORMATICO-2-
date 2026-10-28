const listaWishlist = document.getElementById("wishlistJuegos");
const mensajeWishlist = document.getElementById("wishlistMensaje");

function mostrarWishlist() {
    const favoritosGuardados = JSON.parse(localStorage.getItem("wishlist")) || [];
    listaWishlist.replaceChildren();

    const juegosGuardados = favoritosGuardados
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

    if (juegosGuardados.length === 0) {
        mensajeWishlist.textContent = "Todavía no agregaste juegos a tu wishlist.";
        mensajeWishlist.className = "wishlist-vacio";
        return;
    }

    mensajeWishlist.textContent = "";

    juegosGuardados.forEach((juego) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-pelicula";

        const contenedorPoster = document.createElement("div");
        contenedorPoster.className = "poster-contenedor";

        const imagen = document.createElement("img");
        imagen.src = juego.imagen;
        imagen.alt = "Portada de " + juego.nombre;

        contenedorPoster.appendChild(imagen);

        const informacion = document.createElement("div");
        informacion.className = "info-pelicula";

        const titulo = document.createElement("h3");
        titulo.className = "titulo-pelicula";
        titulo.textContent = juego.nombre;

        const botonQuitar = document.createElement("button");
        botonQuitar.type = "button";
        botonQuitar.className = "btn-favorito";
        botonQuitar.textContent = "Quitar";
        botonQuitar.setAttribute("aria-label", "Quitar " + juego.nombre + " de la wishlist");
        botonQuitar.addEventListener("click", () => quitarDeWishlist(juego.id));

        informacion.append(titulo, botonQuitar);
        if (juego.detalleId) {
            const enlace = document.createElement("a");
            enlace.href = "juego.html?id=" + juego.detalleId;
            enlace.appendChild(contenedorPoster);
            tarjeta.append(enlace);
        } else {
            tarjeta.appendChild(contenedorPoster);
        }
        tarjeta.appendChild(informacion);
        listaWishlist.appendChild(tarjeta);
    });
}

function quitarDeWishlist(idJuego) {
    const favoritosGuardados = JSON.parse(localStorage.getItem("wishlist")) || [];
    const favoritosActualizados = favoritosGuardados
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
        .filter((favorito) => favorito && favorito.id !== idJuego);
    localStorage.setItem("wishlist", JSON.stringify(favoritosActualizados));
    mostrarWishlist();
}

mostrarWishlist();
