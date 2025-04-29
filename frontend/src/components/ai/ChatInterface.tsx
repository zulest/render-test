import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Bot, User, Loader2 } from 'lucide-react';
import { InputAudio } from './InputAudio';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hola, soy el asistente financiero IA de la cooperativa. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Autoscroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    fetch('api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage.text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const aiMessage: Message = {
          id: Date.now().toString(),
          sender: 'ai',
          text: data.message || 'Lo siento, no tengo información específica sobre esa consulta.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching AI response:', error);
        const aiMessage: Message = {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo más tarde.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-blue-50">
        <h2 className="text-lg font-semibold text-blue-900 flex items-center">
          <Bot className="mr-2" size={20} />
          Asistente Financiero IA
        </h2>
        <p className="text-sm text-blue-700">
          Consulta información, genera reportes o analiza indicadores financieros
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
              <div className="flex-shrink-0 mr-2 mt-0.5">
                {message.sender === 'user' ? (
                  <User size={18} className="text-blue-200" />
                ) : (
                  <Bot size={18} className="text-blue-600" />
                )}
              </div>
              <div>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3">
              <div className="flex items-center">
                <Loader2 size={18} className="text-blue-600 animate-spin mr-2" />
                <span className="text-sm">El asistente está escribiendo...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Paperclip size={20} />
          </button>

          <div className="flex-1 rounded-lg border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className="w-full p-3 text-gray-800 resize-none focus:outline-none rounded-lg max-h-32"
              rows={1}
              style={{ minHeight: '44px' }}
            />
          </div>

          <InputAudio onInput={setInputText} />

          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 rounded-full ${inputText.trim() && !isLoading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            <Send size={18} />
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-500 text-center">
          Sugerencias:
          <div className="mt-1 flex flex-wrap justify-center gap-2">
            {['Mostrar índice de morosidad', 'Generar reporte de liquidez', 'Análisis de cartera'].map((suggestion) => (
              <button
                key={suggestion}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs"
                onClick={() => setInputText(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};