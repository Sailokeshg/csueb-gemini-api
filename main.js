import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import './style.css';

let API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let form = document.querySelector('form');
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector('.output');

const md = new MarkdownIt();
let conversationHistory = [];
let pendingResponse = '';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderConversation() {
  let html = '';
  conversationHistory.forEach(message => {
    if (message.role === 'user') {
      html += `<div class="user-message"><strong>You:</strong> ${escapeHtml(message.parts[0].text)}</div>`;
    } else {
      html += `<div class="model-message"><strong>Assistant:</strong> ${md.render(message.parts[0].text)}</div>`;
    }
  });
  
  if (pendingResponse) {
    html += `<div class="model-message"><strong>Assistant:</strong> ${md.render(pendingResponse)}</div>`;
  }
  
  output.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
}

function clearChat() {
  conversationHistory = [];
  pendingResponse = '';
  renderConversation();
}

form.onsubmit = async (ev) => {
  ev.preventDefault();
  const userMessage = promptInput.value.trim();
  if (!userMessage) return;

  // Add user message to history
  conversationHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  clearBtn.onclick = clearChat;

  promptInput.value = '';
  pendingResponse = '';
  renderConversation();

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await model.generateContentStream({ 
      contents: conversationHistory 
    });

    let buffer = [];
    for await (const chunk of result.stream) {
      buffer.push(chunk.text());
      pendingResponse = buffer.join('');
      renderConversation();
    }

    // Add final response to history
    conversationHistory.push({
      role: 'model',
      parts: [{ text: pendingResponse }]
    });
    pendingResponse = '';
    renderConversation();

  } catch (e) {
    output.innerHTML += `<div class="error">Error: ${escapeHtml(e.message)}</div>`;
  }
};