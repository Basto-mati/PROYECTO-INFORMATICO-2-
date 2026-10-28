const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuarioInput = document.getElementById('usuario').value.trim();
        const contrasenaInput = document.getElementById('contrasena').value;

        const errorUsuario = document.getElementById('errorUsuario');
        const errorContrasena = document.getElementById('errorContrasena');
        const errorGeneral = document.getElementById('errorGeneral');

        if (errorUsuario) errorUsuario.textContent = '';
        if (errorContrasena) errorContrasena.textContent = '';
        if (errorGeneral) errorGeneral.textContent = '';

        if (usuarioInput === '') {
            if (errorUsuario) errorUsuario.textContent = 'Por favor, ingresá tu usuario.';
            return;
        }
        if (contrasenaInput.trim() === '') {
            if (errorContrasena) errorContrasena.textContent = 'Por favor, ingresá tu contraseña.';
            return;
        }

        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioValido = usuariosGuardados.find(
            (u) => u.usuario.toLowerCase() === usuarioInput.toLowerCase()
                && (u.contrasena ?? u.password) === contrasenaInput
        );

        if (usuarioValido) {
            alert(`Hola, ${usuarioValido.usuario}!`);
            localStorage.setItem('usuarioActivo', JSON.stringify(usuarioValido));
            window.location.href = 'index.html';
        } else {
            if (errorGeneral) errorGeneral.textContent = 'El usuario o la contraseña son incorrectos.';
        }
    });
}