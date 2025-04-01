import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';

// Re-define the Message interface or import it if defined globally
interface Message {
  id: string | number;
  text: string;
  user_id: string | number;
  timestamp: Date | string | number;
  chat_id: string | number;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string | number;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No messages yet.</p>
      ) : (
        messages.map((message) => (
          <MessageItem
            key={message.id} // Ensure unique key for each message
            message={message}
            currentUserId={currentUserId}
          />
        ))
      )}
      {/* Empty div to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 