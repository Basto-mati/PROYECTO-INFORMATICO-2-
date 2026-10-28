const formregistrarse = document.getElementById('formregistrarse');

if (formregistrarse) {
    formregistrarse.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const contrasenaInput = document.getElementById('contrasena');
        const errorNombre = document.getElementById('errorNombre');
        const errorEmail = document.getElementById('errorEmail');
        const errorContrasena = document.getElementById('errorContrasena');

        const usuario = nombreInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const contrasena = contrasenaInput.value;

        errorNombre.textContent = '';
        errorEmail.textContent = '';
        errorContrasena.textContent = '';

        let formularioValido = true;

        if (!usuario) {
            errorNombre.textContent = 'Ingresá un nombre de usuario.';
            formularioValido = false;
        }

        if (!email) {
            errorEmail.textContent = 'Ingresá tu email.';
            formularioValido = false;
        } else if (!emailInput.validity.valid) {
            errorEmail.textContent = 'Ingresá un email válido.';
            formularioValido = false;
        }

        if (!contrasena.trim()) {
            errorContrasena.textContent = 'Ingresá una contraseña.';
            formularioValido = false;
        }

        if (!formularioValido) {
            return;
        }

        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioExiste = usuariosGuardados.some(
            (u) => u.usuario.toLowerCase() === usuario.toLowerCase()
        );
        const emailExiste = usuariosGuardados.some(
            (u) => u.email && u.email.toLowerCase() === email
        );

        if (usuarioExiste) {
            errorNombre.textContent = 'Ese nombre de usuario ya está registrado.';
            return;
        }

        if (emailExiste) {
            errorEmail.textContent = 'Ese email ya está registrado.';
            return;
        }

        usuariosGuardados.push({ usuario, email, contrasena });
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        alert('Cuenta registrada correctamente.');
        formregistrarse.reset();
    });
}
