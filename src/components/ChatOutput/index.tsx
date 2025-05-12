import React from 'react';


interface ChatOutputProps {
  conversationHistory: { role: string; parts: { text: string }[] }[];
  pendingResponse?: string;
  error?: string;
  escapeHtml: (input: string) => string;
  md: { render: (input: string) => string };
}

const ChatOutput: React.FC<ChatOutputProps> = ({ conversationHistory, pendingResponse, error, escapeHtml, md }) => {
  return (
    <div className="output-container">
      {conversationHistory.map((message, index) => (
        <div key={index} className={message.role === 'user' ? 'user-message' : 'model-message'}>
          <strong>{message.role === 'user' ? 'You:' : 'Assistant:'}</strong>{' '}
          {message.role === 'user'
            ? escapeHtml(message.parts[0].text)
            : <span dangerouslySetInnerHTML={{ __html: md.render(message.parts[0].text) }} />}
        </div>
      ))}
      {pendingResponse && (
        <div className="model-message">
          <strong>Assistant:</strong>{' '}
          <span dangerouslySetInnerHTML={{ __html: md.render(pendingResponse) }} />
        </div>
      )}
      {error && <div className="error">Error: {escapeHtml(error)}</div>}
    </div>
  );
};

export default ChatOutput;