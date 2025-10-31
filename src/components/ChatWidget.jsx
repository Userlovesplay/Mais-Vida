import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { accessibilityManager } from '../utils/accessibility';

const Message = ({ text, isUser, timestamp }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-card dark:bg-dark-bg text-text dark:text-dark-text'
            : 'bg-primary-2/30 dark:bg-primary-2/20 text-text dark:text-dark-text'
        }`}
      >
        <p className="text-sm leading-relaxed">{text}</p>
        <span className="text-xs opacity-70 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};

export const ChatWidget = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        text: t.chat.greeting,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, t.chat.greeting, messages.length]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      const cleanup = accessibilityManager.trapFocus(chatRef.current);
      inputRef.current?.focus();

      const handleEscape = () => setIsOpen(false);
      chatRef.current?.addEventListener('escapepressed', handleEscape);

      return () => {
        cleanup();
        chatRef.current?.removeEventListener('escapepressed', handleEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const autoResponse = {
        text: 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, autoResponse]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label={t.chat.open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 bg-black/20 sm:bg-transparent"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={chatRef}
            className="bg-white dark:bg-dark-card rounded-t-2xl sm:rounded-2xl w-full sm:w-96 h-[80vh] sm:h-[32rem] flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            <div className="bg-primary dark:bg-primary/90 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 id="chat-title" className="font-semibold text-lg">
                  {t.chat.title}
                </h3>
                <p className="text-sm opacity-90">{t.chat.status}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t.chat.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-6 space-y-4"
              role="log"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((message, index) => (
                <Message key={index} {...message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-primary/10 dark:border-primary-2/10 p-4">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.chat.placeholder}
                  rows={1}
                  className="flex-1 px-4 py-3 rounded-lg border border-primary/20 dark:border-primary-2/20 bg-card dark:bg-dark-bg text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  aria-label={t.chat.placeholder}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center"
                  aria-label={t.chat.send}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
