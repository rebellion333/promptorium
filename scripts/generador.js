// scripts/generador.js

const modelosGeneradorURL = 'assets/models.json';
let modelosIA = [];

async function cargarModelosGenerador() {
  try {
    const response = await fetch(modelosGeneradorURL);
    modelosIA = await response.json();
    const selector = document.getElementById('modelo');
    modelosIA.forEach(modelo => {
      const option = document.createElement('option');
      option.value = modelo.nombre;
      option.textContent = modelo.nombre;
      selector.appendChild(option);
    });
    document.getElementById('cargando').style.display = 'none';
    document.getElementById('formulario-generador').style.display = 'block';
  } catch (error) {
    console.error('Error cargando modelos:', error);
  }
}

document.addEventListener('DOMContentLoaded', cargarModelosGenerador);

document.getElementById('formulario-generador')?.addEventListener('submit', e => {
  e.preventDefault();
  const idea = document.getElementById('idea').value;
  const modelo = document.getElementById('modelo').value;
  const promptGenerado = generarPrompt(idea, modelo);

  document.getElementById('resultado').innerHTML = `
    <p><strong>Prompt generado:</strong></p>
    <div class="prompt-generado">${promptGenerado}</div>
    <button id="copiarPrompt">📋 Copiar Prompt</button>
    <div class="feedback">
      <span>¿Este prompt te sirvió?</span>
      <button class="feedback-btn" onclick="feedbackGenerador(true)">👍</button>
      <button class="feedback-btn" onclick="feedbackGenerador(false)">👎</button>
    </div>
  `;

  document.getElementById('copiarPrompt').addEventListener('click', () => {
    navigator.clipboard.writeText(promptGenerado)
      .then(() => alert('✅ ¡Prompt copiado al portapapeles!'))
      .catch(() => alert('❌ Error al copiar el prompt.'));
  });
});

function generarPrompt(idea, modelo) {
  const modeloInfo = modelosIA.find(m => m.nombre === modelo);
  if (!modeloInfo) return `Prompt basado en: ${idea}`;

  return `Usando ${modeloInfo.nombre}, con sus fortalezas en ${modeloInfo.fortalezas.join(", ")}, genera: ${idea}`;
}

function feedbackGenerador(util) {
  if (util) {
    alert('Gracias por tu feedback positivo 🙌');
  } else {
    alert('Gracias por tu feedback, lo tendremos en cuenta 👀');
  }
}
