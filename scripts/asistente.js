// scripts/asistente.js

document.addEventListener("DOMContentLoaded", () => {
    const promptForm = document.getElementById("asistente-form");
    const resultDiv = document.getElementById("asistente-output");
    const feedbackSection = document.getElementById("asistente-feedback");
  
    promptForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userInput = document.getElementById("user-prompt").value.trim();
  
      if (!userInput) {
        resultDiv.innerHTML = "<p class='error'>⚠️ Por favor escribí un prompt para analizar.</p>";
        return;
      }
  
      resultDiv.innerHTML = "<p>Cargando análisis...</p>";
  
      // Aquí podrías eventualmente integrar con una IA propia. Por ahora es estático.
      setTimeout(() => {
        const fakeAnalysis = `✅ Este prompt tiene buena claridad pero podría beneficiarse con más detalles específicos. Ej: agrega contexto sobre la audiencia objetivo o el tono.`;
        resultDiv.innerHTML = `
          <p><strong>Análisis:</strong> ${fakeAnalysis}</p>
          <button id="copy-analysis" class="btn">📋 Copiar análisis</button>
        `;
  
        document.getElementById("copy-analysis").addEventListener("click", () => {
          navigator.clipboard.writeText(fakeAnalysis).then(() => {
            alert("✅ ¡Análisis copiado al portapapeles!");
          });
        });
  
        feedbackSection.style.display = "block";
      }, 1000);
    });
  
    document.getElementById("asistente-feedback").addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        alert("🙏 ¡Gracias por tu feedback!");
      }
    });
  });
  