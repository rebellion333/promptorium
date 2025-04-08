
function generatePrompt() {
  const ai = document.getElementById("ai").value;
  const input = document.querySelector("textarea").value;
  const output = document.getElementById("output");
  output.innerText = `Prompt generado para ${ai}: "${input}"`;
}
