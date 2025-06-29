import React, { useState, useEffect, useRef } from 'react';
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
  const messagesEndRef = useRef(null);

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory, pendingResponse]);

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
        model: 'gemini-2.5-flash',
        systemInstruction: `You are a helpful assistant for California State University, East Bay (CSUEB). 
        You should focus on providing information about:
        - Academic programs and courses
        - Admissions and enrollment
        - Campus life and facilities
        - Student services and resources
        - Faculty and staff information
        - Campus events and activities
        - Financial aid and scholarships
        - Career services and internships
        - Library and research resources
        - Housing and dining options
        
        If asked about topics unrelated to CSUEB, politely redirect the conversation back to university-related topics.
        Always be helpful, accurate, and professional in your responses.`,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
      {/* Main content area with padding for fixed input */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl pb-32">
        {/* Show initial form only if no conversation */}
        {conversationHistory.length === 0 && !pendingResponse && (
          <ChatForm onSubmit={handleSubmit} onClear={handleClear} />
        )}
        
        <ChatOutput
          conversationHistory={conversationHistory}
          pendingResponse={pendingResponse}
          error={error}
          escapeHtml={escapeHtml}
          md={md}
        />
        
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </main>

      {/* Fixed input at bottom - ONLY show after conversation has started */}
      {(conversationHistory.length > 0 || pendingResponse) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <ChatForm onSubmit={handleSubmit} onClear={handleClear} isSticky={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;