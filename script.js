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

// ACTUALIZAR ESTILO DEL MENU
function updateMenuActive(activeScreenId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if(activeScreenId === 'screen-home') document.getElementById('nav-home').classList.add('active');
    else if(activeScreenId === 'screen-form') document.getElementById('nav-form').classList.add('active');
    else if(activeScreenId === 'screen-about') document.getElementById('nav-about').classList.add('active');
}

// ✅ FUNCIÓN ACTUALIZADA: GUARDA Y MUESTRA EN EL HISTORIAL
function handleSubmit(event) {
    event.preventDefault();
    
    // 1. Obtener datos del formulario
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const msg = document.getElementById('msgInput').value;

    // 2. Mostrar en pantalla de resultado
    document.getElementById('showName').innerText = name;
    document.getElementById('showEmail').innerText = email;
    document.getElementById('showMsg').innerText = msg;

    // 3. CREAR NUEVO ELEMENTO PARA LA LISTA DE ACTIVIDADES
    const newActivity = document.createElement('div');
    newActivity.className = 'card';
    newActivity.innerHTML = `
        <p class="text-gray-700 font-medium">${name}</p>
        <p class="text-sm text-gray-500">${email}</p>
        <p class="text-xs text-gray-400 mt-2">Registrado recientemente</p>
    `;

    // 4. AGREGARLO AL INICIO DE LA LISTA
    const container = document.getElementById('activities-container');
    container.insertBefore(newActivity, container.firstChild);

    // 5. Limpiar formulario
    document.getElementById('dataForm').reset();

    // 6. Ir a pantalla de éxito
    showScreen('screen-result');
}