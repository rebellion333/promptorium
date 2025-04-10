// scripts/score.js
const prompts = [
  {
    text: "Write a story in the style of Edgar Allan Poe set on Mars.",
    targetModel: "GPT-4",
    length: 78,
    clarity: 9,
    specificity: 8,
    creativity: 10
  },
  {
    text: "Create a business plan for an eco-friendly food delivery startup.",
    targetModel: "Claude 3",
    length: 65,
    clarity: 8,
    specificity: 7,
    creativity: 8
  }
];

function calculateScore(prompt) {
  return (
    prompt.clarity * 2 +
    prompt.specificity * 1.5 +
    prompt.creativity * 2.5 -
    Math.abs(100 - prompt.length) * 0.1
  ).toFixed(2);
}

function displayPrompts() {
  const container = document.getElementById('score-container');
  if (!container) return;
  prompts.forEach(prompt => {
    const div = document.createElement('div');
    div.className = 'prompt-entry';
    const score = calculateScore(prompt);
    div.innerHTML = `
      <div class="prompt-text"><strong>Prompt:</strong> ${prompt.text}</div>
      <div class="prompt-meta">Modelo: ${prompt.targetModel}</div>
      <div class="prompt-meta">Longitud: ${prompt.length} caracteres</div>
      <div class="prompt-score">Promptorium Score: ${score}</div>
    `;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', displayPrompts);

// Formulario para analizar un prompt personalizado
const analizarBtn = document.getElementById('analizarBtn');
if (analizarBtn) {
  analizarBtn.addEventListener('click', () => {
    const promptTexto = document.getElementById('userPrompt').value;
    const claridad = parseInt(document.getElementById('claridad').value);
    const especificidad = parseInt(document.getElementById('especificidad').value);
    const creatividad = parseInt(document.getElementById('creatividad').value);
    const longitud = promptTexto.length;

    const promptObj = {
      text: promptTexto,
      targetModel: "Custom",
      length: longitud,
      clarity: claridad,
      specificity: especificidad,
      creativity: creatividad
    };

    const resultado = document.getElementById('scoreResultado');
    resultado.textContent = `Promptorium Score: ${calculateScore(promptObj)}`;
  });
}