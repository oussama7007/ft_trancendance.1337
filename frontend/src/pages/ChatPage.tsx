import React, { useState, useEffect, useRef } from 'react';
import { ChatConversation, Language } from '../types';

interface ChatPageProps {
  lang: Language;
  chats: ChatConversation[];
  setChats: React.Dispatch<React.SetStateAction<ChatConversation[]>>;
  activeChatId: number;
  setActiveChatId: (id: number) => void;
  t: any;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
  t
}) => {
  const [inputMsg, setInputMsg] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      sender: 'me' as const,
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedChats = chats.map((c) => {
      if (c.id === activeChat.id) {
        return {
          ...c,
          lastMessage: inputMsg,
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    });

    setChats(updatedChats);
    setInputMsg('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 h-[calc(100vh-100px)] flex flex-col">
      <div className="bg-white rounded-3xl shadow-xl border border-amber-100 flex-1 flex overflow-hidden">
        
        {/* Sidebar Chat List */}
        <div className="w-1/3 border-l border-gray-100 flex flex-col bg-amber-50/20">
          <div className="p-4 border-b border-amber-100 font-black text-base text-gray-800 flex items-center justify-between">
            <span>{t.chat}</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              💬 {chats.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-all ${
                  chat.id === activeChat?.id 
                    ? 'bg-white shadow-md font-semibold text-amber-800 border-r-4 border-amber-600' 
                    : 'hover:bg-amber-50/50 text-gray-700'
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.userName} className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-200" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{chat.userName}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {activeChat ? (
          <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <img src={activeChat.avatar} alt={activeChat.userName} className="w-10 h-10 rounded-2xl border border-amber-200" />
                <div>
                  <h3 className="font-bold text-sm text-gray-800">{activeChat.userName}</h3>
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    {t.online}
                  </p>
                </div>
              </div>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-xl border border-amber-200">
                🇲🇦 التواصل المباشر
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {activeChat.messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-amber-600 text-white rounded-br-none font-medium' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 flex items-center gap-2 bg-white">
              <input 
                type="text" 
                placeholder={t.typeMessage}
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button 
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold transition shadow-md shadow-amber-600/20"
              >
                {t.send} 🚀
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
            {t.selectChat}
          </div>
        )}

      </div>
    </div>
  );
};