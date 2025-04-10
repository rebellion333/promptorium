// scripts/generador.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("prompt-form");
    const output = document.getElementById("prompt-output");
    const promptText = document.getElementById("prompt-text");
    const copyBtn = document.getElementById("copy-btn");
    const copyMsg = document.getElementById("copy-msg");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const objetivo = document.getElementById("objetivo").value.trim();
      const modelo = document.getElementById("modelo").value;
      const tono = document.getElementById("tono").value;
      const restricciones = document.getElementById("restricciones").value.trim();
  
      const prompt = `Generá un prompt para ${modelo} que cumpla con el objetivo: "${objetivo}"` +
        (tono ? `, utilizando un tono ${tono}` : "") +
        (restricciones ? `, evitando: ${restricciones}` : ".");
  
      promptText.textContent = prompt;
      output.style.display = "block";
      copyBtn.style.display = "inline-block";
      copyMsg.textContent = "";
    });
  
    copyBtn.addEventListener("click", () => {
      const text = promptText.textContent;
      navigator.clipboard.writeText(text).then(() => {
        copyMsg.textContent = "✅ ¡Prompt copiado al portapapeles!";
        setTimeout(() => {
          copyMsg.textContent = "";
        }, 2500);
      });
    });
  });
  