import React, { useState } from 'react';


interface ChatFormProps {
  onSubmit: (input: string) => void;
  onClear: () => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, onClear }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <section className="form-section">
      <form onSubmit={handleSubmit}>
        <div className="prompt-box">
          <label>
            <input
              name="prompt"
              placeholder="Enter your question here"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button type="submit">Go</button>
        </div>
      </form>
      <button onClick={onClear} className="clear-button">
        Clear Chat
      </button>
    </section>
  );
};

export default ChatForm;