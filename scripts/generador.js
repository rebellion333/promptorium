// scripts/generador.js

async function cargarModelos() {
    try {
      const response = await fetch('assets/models.json');
      const data = await response.json();
      const select = document.getElementById('modelo');
      data.forEach(model => {
        const option = document.createElement('option');
        option.value = model.nombre;
        option.textContent = model.nombre;
        select.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar modelos:', error);
    }
  }
  
  function generarPrompt() {
    const modelo = document.getElementById('modelo').value;
    const objetivo = document.getElementById('objetivo').value;
    const salida = document.getElementById('resultado');
  
    fetch('assets/models.json')
      .then(res => res.json())
      .then(data => {
        const modeloData = data.find(m => m.nombre === modelo);
        if (!modeloData) return;
  
        const promptGenerado = `${modeloData.formato.replace('{objetivo}', objetivo)}\n\nTips: ${modeloData.tips.join(' | ')}`;
  
        salida.textContent = promptGenerado;
  
        document.getElementById('copiar-btn').style.display = 'inline-block';
      });
  }
  
  function copiarPrompt() {
    const resultado = document.getElementById('resultado').textContent;
    navigator.clipboard.writeText(resultado)
      .then(() => {
        const mensaje = document.createElement('div');
        mensaje.textContent = '✅ ¡Prompt copiado al portapapeles!';
        mensaje.className = 'mensaje-copiado';
        document.body.appendChild(mensaje);
        setTimeout(() => mensaje.remove(), 2500);
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    cargarModelos();
    document.getElementById('generar-btn').addEventListener('click', generarPrompt);
    document.getElementById('copiar-btn').addEventListener('click', copiarPrompt);
  });
  