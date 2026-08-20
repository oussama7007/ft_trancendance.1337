import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  ChatConversation,
  Language,
  Listing,
} from '../types';


interface ChatPageProps {

  lang: Language;

  chats: ChatConversation[];

  setChats: React.Dispatch<
    React.SetStateAction<ChatConversation[]>
  >;

  activeChatId: number;

  setActiveChatId: (
    id: number
  ) => void;

  t: any;

  selectedListing: Listing | null;
}


export const ChatPage: React.FC<ChatPageProps> = ({
  chats,
  setChats,
  activeChatId,
  setActiveChatId,
  t,
  selectedListing,
}) => {

  // =====================================================
  // INPUT
  // =====================================================

  const [inputMsg, setInputMsg] =
    useState('');


  // =====================================================
  // SCROLL
  // =====================================================

  const messagesEndRef =
    useRef<HTMLDivElement>(null);


  // =====================================================
  // ACTIVE CHAT
  // =====================================================

  const activeChat =
    chats.find(
      (c) => c.id === activeChatId
    ) || chats[0];


  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

  }, [activeChat?.messages]);


  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!inputMsg.trim()) {
      return;
    }

    if (!activeChat) {
      return;
    }


    const newMsg = {

      sender: 'me' as const,

      text: inputMsg.trim(),

      time: new Date().toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      ),

    };


    const updatedChats =
      chats.map((chat) => {

        if (chat.id === activeChat.id) {

          return {

            ...chat,

            lastMessage:
              inputMsg.trim(),

            messages: [
              ...chat.messages,
              newMsg,
            ],

          };

        }

        return chat;

      });


    setChats(updatedChats);

    setInputMsg('');

  };


  return (

    <div className="max-w-6xl mx-auto p-4 sm:p-6 h-[calc(100vh-100px)] flex flex-col font-sans">

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 flex-1 flex overflow-hidden">


        {/* =================================================
            SIDEBAR
        ================================================= */}

        <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">

          {/* HEADER */}

          <div className="p-5 border-b border-gray-100 font-extrabold text-sm text-gray-900 flex items-center justify-between">

            <span>
              {t.chat || 'Chats'}
            </span>

            <span className="text-xs bg-orange-50 text-[#F4845F] px-2.5 py-1 rounded-full font-extrabold border border-orange-100">

              💬 {chats.length}

            </span>

          </div>


          {/* LIST */}

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">

            {chats.map((chat) => (

              <div
                key={chat.id}
                onClick={() =>
                  setActiveChatId(chat.id)
                }
                className={`p-4 flex items-center gap-3 cursor-pointer transition-all ${
                  chat.id === activeChat?.id
                    ? 'bg-white shadow-sm font-bold text-gray-900 border-r-4 border-[#F4845F]'
                    : 'hover:bg-gray-100/50 text-gray-600'
                }`}
              >

                {/* AVATAR */}

                <div className="relative shrink-0">

                  <img
                    src={chat.avatar}
                    alt={chat.userName}
                    className="w-12 h-12 rounded-2xl object-cover border border-gray-200 shadow-sm"
                  />

                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />

                </div>


                {/* INFO */}

                <div className="flex-1 min-w-0">

                  <p className="text-xs font-extrabold truncate text-gray-900">
                    {chat.userName}
                  </p>

                  <p className="text-[11px] text-gray-400 truncate mt-0.5 font-medium">
                    {chat.lastMessage}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =================================================
            CHAT WINDOW
        ================================================= */}

        {activeChat ? (

          <div className="flex-1 flex flex-col bg-white">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm">

              <div className="flex items-center gap-3">

                <img
                  src={activeChat.avatar}
                  alt={activeChat.userName}
                  className="w-10 h-10 rounded-2xl border border-gray-200 object-cover"
                />

                <div>

                  <h3 className="font-extrabold text-xs text-gray-900">
                    {activeChat.userName}
                  </h3>

                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">

                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />

                    {t.online || 'Online'}

                  </p>

                </div>

              </div>


              <span className="text-xs bg-blue-50 text-[#4285F4] font-extrabold px-3.5 py-1.5 rounded-xl border border-blue-100">

                🇲🇦 {t.directContact || 'Direct Chat'}

              </span>

            </div>


            {/* =================================================
                SELECTED PROPERTY
            ================================================= */}

            {selectedListing && (

              <div className="px-4 pt-4">

                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 flex items-center gap-3">

                  <img
                    src={
                      selectedListing.imageUrl ||
                      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'
                    }
                    alt={
                      selectedListing.title?.en ||
                      'Property'
                    }
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">

                    <p className="text-[10px] text-[#F4845F] font-black uppercase">
                      {langLabel(selectedListing, t)}
                    </p>

                    <p className="text-xs font-black text-gray-900 truncate">

                      {selectedListing.title?.en ||
                        'Property'}

                    </p>

                    <p className="text-[10px] text-gray-500 font-semibold">

                      📍 {selectedListing.city}

                      {' • '}

                      {selectedListing.price} DH

                    </p>

                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                MESSAGES
            ================================================= */}

            <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-[#f8f9fa]">

              {activeChat.messages.map(
                (msg, idx) => (

                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.sender === 'me'
                        ? 'items-end'
                        : 'items-start'
                    }`}
                  >

                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm font-medium ${
                        msg.sender === 'me'
                          ? 'bg-[#F4845F] text-white rounded-br-none shadow-md'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                      }`}
                    >

                      {msg.text}

                    </div>

                    <span className="text-[10px] text-gray-400 mt-1 px-1 font-semibold">
                      {msg.time}
                    </span>

                  </div>

                )
              )}

              <div ref={messagesEndRef} />

            </div>


            {/* =================================================
                INPUT
            ================================================= */}

            <form
              onSubmit={handleSendMessage}
              className="p-3.5 border-t border-gray-100 flex items-center gap-2 bg-white"
            >

              <input
                type="text"
                placeholder={
                  t.typeMessage ||
                  'Type a message...'
                }
                value={inputMsg}
                onChange={(e) =>
                  setInputMsg(e.target.value)
                }
                className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs font-semibold focus:border-[#F4845F] outline-none transition"
              />

              <button
                type="submit"
                className="bg-[#F4845F] hover:bg-[#e07553] text-white px-6 py-3 rounded-2xl text-xs font-extrabold transition shadow-md"
              >
                {t.send || 'Send'} 🚀
              </button>

            </form>

          </div>

        ) : (

          <div className="flex-1 flex items-center justify-center text-gray-400 text-xs font-semibold">

            {t.selectChat ||
              'Select a chat conversation'}

          </div>

        )}

      </div>

    </div>

  );
};


// =====================================================
// SMALL HELPER
// =====================================================

const langLabel = (
  listing: Listing,
  t: any
) => {

  return (
    t.property ||
    'Selected property'
  );

};