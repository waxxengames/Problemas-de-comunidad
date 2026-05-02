// BASE DE DATOS LOCAL (donde se guardan los usuarios)
let usuarios = [];

// AL CARGAR LA PÁGINA
window.onload = function() {
    // Cargar usuarios guardados
    if(localStorage.getItem('usuarios')) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'));
    }
    // Empezar siempre en el LOGIN
    showScreen('screen-login');
};

// FUNCIÓN PRINCIPAL PARA CAMBIAR DE PANTALLA
function showScreen(screenId) {
    document.querySelectorAll('[id^="screen-"]').forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('block');
    });
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('block');
    }
    window.scrollTo(0,0);
    updateMenuActive(screenId);
}

// MOSTRAR U OCULTAR MENU
function updateMenuActive(activeScreenId) {
    const menu = document.querySelector('.fixed.bottom-0');
    if(activeScreenId === 'screen-login' || activeScreenId === 'screen-register') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if(activeScreenId === 'screen-home') document.getElementById('nav-home').classList.add('active');
    else if(activeScreenId === 'screen-form') document.getElementById('nav-form').classList.add('active');
    else if(activeScreenId === 'screen-about') document.getElementById('nav-about').classList.add('active');
}

// ✅ FUNCIÓN DE INICIO DE SESIÓN
function iniciarSesion() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;

    // Buscar si el usuario existe
    const usuarioEncontrado = usuarios.find(u => u.usuario === user && u.contraseña === pass);

    if(usuarioEncontrado) {
        alert(`✅ Bienvenido ${usuarioEncontrado.nombre}!`);
        showScreen('screen-home');
    } else {
        alert('❌ Usuario o contraseña incorrectos. Intenta de nuevo o regístrate.');
    }
}

// ✅ FUNCIÓN PARA CREAR CUENTA
function registrarCuenta() {
    const nombre = document.getElementById('regName').value;
    const usuario = document.getElementById('regUser').value;
    const contraseña = document.getElementById('regPass').value;

    if(nombre === "" || usuario === "" || contraseña === "") {
        alert('⚠️ Por favor llena todos los campos');
        return;
    }

    // Verificar si el usuario ya existe
    const existe = usuarios.some(u => u.usuario === usuario);
    if(existe) {
        alert('⚠️ Ese nombre de usuario ya existe');
        return;
    }

    // Guardar nuevo usuario
    const nuevoUsuario = { nombre, usuario, contraseña };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('✅ Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
    showScreen('screen-login');
}

// ✅ FUNCIÓN PARA GUARDAR REGISTROS EN EL FORMULARIO
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const msg = document.getElementById('msgInput').value;

    document.getElementById('showName').innerText = name;
    document.getElementById('showEmail').innerText = email;
    document.getElementById('showMsg').innerText = msg;

    const newActivity = document.createElement('div');
    newActivity.className = 'card';
    newActivity.innerHTML = `
        <p class="text-gray-700 font-medium">${name}</p>
        <p class="text-sm text-gray-500">${email}</p>
        <p class="text-xs text-gray-400 mt-2">Registrado recientemente</p>
    `;

    const container = document.getElementById('activities-container');
    container.prepend(newActivity);

    document.getElementById('dataForm').reset();
    showScreen('screen-result');
}