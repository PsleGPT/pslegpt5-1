"use client";

import { useState } from 'react';
// Import MessageList and define the Message type
import MessageList from '@/components/MessageList'; // Assuming @/ maps to src/

// Define the structure of a message object (should match components)
// Consider moving this to a shared types file (e.g., src/types/index.ts)
interface Message {
  id: string | number;
  text: string;
  user_id: string | number;
  timestamp: Date | string | number;
  chat_id: string | number;
}

// Placeholder for the current user's ID - replace with actual auth logic
const CURRENT_USER_ID = "user1";
// Placeholder Chat ID - replace with dynamic chat selection later
const CURRENT_CHAT_ID = "chat1";

// Sample initial messages - Use static ISO strings for timestamps
const initialMessages: Message[] = [
  { id: 1, text: "Hey there!", user_id: "assistant1", timestamp: "2024-04-01T10:00:00.000Z", chat_id: CURRENT_CHAT_ID },
  { id: 2, text: "Hi! How can I help?", user_id: CURRENT_USER_ID, timestamp: "2024-04-01T10:01:00.000Z", chat_id: CURRENT_CHAT_ID },
];

export default function Home() {
  const [input, setInput] = useState('');
  // Use state to hold the messages
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      // console.log("Sending:", trimmedInput); // Keep for debugging if needed

      // Create a new message object
      const newMessage: Message = {
        id: Date.now(), // Use timestamp as a temporary unique ID
        text: trimmedInput,
        user_id: CURRENT_USER_ID,
        timestamp: new Date(),
        chat_id: CURRENT_CHAT_ID, // Assign to the current chat
      };

      // Add the new message to the state
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      setInput(''); // Clear input after sending
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header Placeholder (Optional) */}
      <header className="bg-white dark:bg-gray-800 shadow p-4 text-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Simple Chat (Chat ID: {CURRENT_CHAT_ID})</h1>
      </header>

      {/* Message Display Area - Replace placeholders with MessageList */}
      <main className="flex-1 overflow-y-auto">
         {/* Pass messages and current user ID to MessageList */}
         <MessageList messages={messages} currentUserId={CURRENT_USER_ID} />
      </main>

      {/* Input Area */}
      <footer className="bg-white dark:bg-gray-800 shadow p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send on Enter key
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
