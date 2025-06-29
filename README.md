# CSUEB Support Assistant

An AI-powered support chatbot for California State University, East Bay (CSUEB) built with React and Google's Gemini AI.

## 🎯 Overview

The CSUEB Support Assistant is a modern, responsive web application that provides students, faculty, and staff with instant access to information about CSUEB. The assistant can help with questions about academic programs, admissions, campus facilities, student services, and much more.

## ✨ Features

- **AI-Powered Conversations**: Powered by Google's Gemini 2.5 Flash model
- **Voice Input**: Speech-to-text functionality for hands-free interaction
- **Copy & Share**: Copy individual messages or responses with one click
- **PDF Export**: Export entire conversations as formatted PDF documents
- **Real-time Streaming**: See responses as they're being generated
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Markdown Support**: Rich text formatting for better readability
- **Professional UI**: Clean, modern interface with CSUEB branding

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **Speech Recognition**: Web Speech API
- **PDF Generation**: jsPDF + html2canvas
- **Markdown Rendering**: markdown-it

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd csueb-support
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application component
├── App.css                 # Application styles
├── index.js               # React app entry point
├── index.css              # Global styles and Tailwind imports
├── components/
│   ├── Header/            # Application header component
│   ├── ChatForm/          # Chat input form with voice support
│   ├── ChatOutput/        # Message display and conversation history
│   └── SpeechRecognition/ # Speech recognition hook
└── hooks/
    └── usePdfExport.ts    # PDF export functionality
```

## 🎮 Usage

### Basic Chat
1. Type your question in the input field
2. Press Enter or click "Send"
3. View the AI-generated response

### Voice Input
1. Click the microphone icon in the input field
2. Speak your question clearly
3. Click the microphone again to stop recording
4. Edit the transcribed text if needed
5. Send your message

### Copy Messages
1. Hover over any message
2. Click the copy icon in the message header
3. The message text is copied to your clipboard

### Export to PDF
1. Start a conversation with the assistant
2. Click the "Export as PDF" button above the chat
3. The PDF will be automatically downloaded

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is minified and optimized for the best performance.

### `npm run eject`
**Note: This is a one-way operation. Once you eject, you can't go back!**

## 🌐 Browser Support

- **Chrome/Edge**: Full support (recommended)
- **Firefox**: Limited speech recognition support
- **Safari**: Partial speech recognition support
- **Mobile browsers**: Varies by device and browser

## 🤖 AI Assistant Capabilities

The CSUEB Support Assistant is specifically trained to help with:

- **Academic Programs**: Course information, degree requirements, majors and minors
- **Admissions**: Application process, requirements, deadlines
- **Campus Life**: Student organizations, events, facilities
- **Student Services**: Academic advising, tutoring, counseling
- **Financial Aid**: Scholarships, grants, payment options
- **Career Services**: Job placement, internships, career counseling
- **Library Resources**: Research help, database access, study spaces
- **Housing & Dining**: On-campus living, meal plans, facilities

## 🔒 Privacy & Security

- No conversation data is stored permanently
- All API calls are made directly to Google's servers
- Speech recognition is processed locally in your browser
- No personal information is collected or stored

## 🛠️ Development

### Adding New Features

1. Create new components in the `src/components/` directory
2. Add custom hooks in the `src/hooks/` directory
3. Update styles in `src/index.css` or component-specific CSS files
4. Test thoroughly across different browsers and devices

### Customizing the Assistant

To modify the AI assistant's behavior, update the `systemInstruction` in [`src/App.jsx`](src/App.jsx):

```javascript
systemInstruction: `You are a helpful assistant for California State University, East Bay (CSUEB)...`
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For technical support or questions about this application, please contact the development team or create an issue in the repository.

## 🎓 About CSUEB

California State University, East Bay is a public university serving the San Francisco Bay Area with a commitment to academic excellence, diversity, and student success.

---

**Built with ❤️ for the CSUEB community**
