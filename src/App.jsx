import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import Header from './components/Header';
import ChatForm from './components/ChatForm';
import ChatOutput from './components/ChatOutput';
import './App.css';

const md = new MarkdownIt();

const App = () => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [pendingResponse, setPendingResponse] = useState('');
  const [error, setError] = useState(null);

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const handleSubmit = async (userMessage) => {
    if (!userMessage.trim()) return;

    setConversationHistory((prev) => [
      ...prev,
      { role: 'user', parts: [{ text: userMessage }] },
    ]);

    setPendingResponse('');
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
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
        contents: [...conversationHistory, { role: 'user', parts: [{ text: userMessage }] }],
      });

      let buffer = [];
      for await (const chunk of result.stream) {
        buffer.push(chunk.text());
        setPendingResponse(buffer.join(''));
      }

      setConversationHistory((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: buffer.join('') }] },
      ]);
      setPendingResponse('');
    } catch (e) {
      setError(e.message);
    }
  };

  const handleClear = () => {
    setConversationHistory([]);
    setPendingResponse('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <ChatForm onSubmit={handleSubmit} onClear={handleClear} />
        <ChatOutput
          conversationHistory={conversationHistory}
          pendingResponse={pendingResponse}
          error={error}
          escapeHtml={escapeHtml}
          md={md}
        />
      </main>
    </div>
  );
};

export default App;