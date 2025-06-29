import React, { useState } from 'react';

interface ChatFormProps {
  onSubmit: (input: string) => void;
  onClear: () => void;
  isSticky?: boolean;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, onClear, isSticky = false }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  // Sticky version for bottom of screen
  if (isSticky) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1">
          <input
            name="prompt"
            placeholder="Ask a follow-up question..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          Send
        </button>
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
        >
          Clear
        </button>
      </form>
    );
  }

  // Original form for initial state (what you see in the screenshot)
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              name="prompt"
              placeholder="Ask me anything about CSUEB..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Send
          </button>
        </div>
      </form>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClear}
          className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default ChatForm;