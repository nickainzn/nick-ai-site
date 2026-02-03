import { pipeline } from 
"https://cdn.jsdelivr.net/npm/@xenova/transformers@2.8.0";

const chat = document.getElementById("chat");
const tokensSpan = document.getElementById("tokens");

let tokens = 0;
let generator;

async function loadModel() {
  addAI("Carregando modelo de IA...");
  generator = await pipeline(
    "text-generation",
    "Xenova/distilgpt2"
  );
  chat.innerHTML = "";
  addAI("IA pronta. Pergunte algo.");
}

loadModel();

function addUser(text) {
  chat.innerHTML += `<div class="msg user">Você: ${text}</div>`;
}

function addAI(text) {
  chat.innerHTML += `<div class="msg ai">IA: ${text}</div>`;
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const input = document.getElementById("prompt");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addUser(text);

  tokens += text.length;
  tokensSpan.textContent = tokens;

  const result = await generator(text, {
    max_new_tokens: 60,
  });

  addAI(result[0].generated_text.replace(text, ""));
}
