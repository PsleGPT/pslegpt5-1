"use client";

import { useState } from 'react';
import MessageList from '@/components/MessageList';
import UserMenu from './UserMenu';

// Define the Message interface (Consider moving to a shared types file)
interface Message {
  id: string | number;
  text: string;
  user_id: string | number;
  timestamp: Date | string | number;
  chat_id: string | number;
}

interface ChatInterfaceProps {
  initialMessages: Message[];
  userId: string; // User ID passed from the server component
  chatId: string; // Example chat ID
}

// TODO: Add Logout Functionality
// One way is to create a form with a button that calls a logout server action.
// <form action="/auth/logout" method="post">
//   <button type="submit">Logout</button>
// </form>

export default function ChatInterface({ initialMessages, userId, chatId }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const newMessage: Message = {
        id: Date.now(), // Temporary client-side ID
        text: trimmedInput,
        user_id: userId, // Use the authenticated user ID
        timestamp: new Date(),
        chat_id: chatId,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      // TODO: Add logic here to actually save the message to Supabase
      // using a server action or the client-side Supabase client.
      // Example using client (ensure client utility exists and handles errors):
      // const supabase = createClient(); // from @/utils/supabase/client
      // await supabase.from('messages').insert({ text: trimmedInput, user_id: userId, chat_id: chatId });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Simple Chat (Chat ID: {chatId})</h1>
        <UserMenu />
      </header>
      <main className="flex-1 overflow-y-auto p-4">
         {/* Render MessageList - Ensure MessageList is also a Client Component */}
        <MessageList messages={messages} currentUserId={userId} />
      </main>
      <footer className="bg-white dark:bg-gray-800 shadow p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
} 