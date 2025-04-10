document.addEventListener('DOMContentLoaded', () => {
    const modelSelect = document.getElementById('modelo');
    const inputPrompt = document.getElementById('inputPrompt');
    const outputPrompt = document.getElementById('outputPrompt');
    const generateBtn = document.getElementById('generarBtn');
    const copyBtn = document.getElementById('copiarBtn');
    const mensajeCopia = document.getElementById('mensajeCopia');
  
    // Cargar modelos desde JSON
    fetch('assets/models.json')
      .then(res => res.json())
      .then(data => {
        data.forEach(model => {
          const option = document.createElement('option');
          option.value = model.id;
          option.textContent = model.name;
          modelSelect.appendChild(option);
        });
      })
      .catch(err => {
        console.error('Error cargando los modelos:', err);
        modelSelect.innerHTML = '<option>Error al cargar modelos</option>';
      });
  
    // Generar prompt adaptado
    generateBtn.addEventListener('click', () => {
      const texto = inputPrompt.value.trim();
      const modeloSeleccionado = modelSelect.value;
  
      if (!texto || !modeloSeleccionado) {
        outputPrompt.value = 'Por favor ingresá un prompt y seleccioná un modelo.';
        return;
      }
  
      fetch('assets/models.json')
        .then(res => res.json())
        .then(modelos => {
          const modelo = modelos.find(m => m.id === modeloSeleccionado);
  
          if (!modelo) {
            outputPrompt.value = 'Modelo no encontrado.';
            return;
          }
  
          const generado = `📌 Modelo seleccionado: ${modelo.name}\n\n${modelo.prefijo || ''}${texto}${modelo.sufijo || ''}`;
          outputPrompt.value = generado;
        });
    });
  
    // Copiar al portapapeles
    copyBtn.addEventListener('click', () => {
      outputPrompt.select();
      document.execCommand('copy');
      mensajeCopia.style.display = 'inline';
      setTimeout(() => {
        mensajeCopia.style.display = 'none';
      }, 2000);
    });
  });
  