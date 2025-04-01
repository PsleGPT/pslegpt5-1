import React from 'react';

// Define the structure of a message object
interface Message {
  id: string | number; // Use string or number depending on your ID type
  text: string;
  user_id: string | number; // ID of the user who sent the message
  timestamp: Date | string | number; // Use Date object, ISO string, or timestamp number
  chat_id: string | number; // ID of the chat this message belongs to
}

interface MessageItemProps {
  message: Message;
  currentUserId: string | number; // ID of the currently logged-in user
}

const MessageItem: React.FC<MessageItemProps> = ({ message, currentUserId }) => {
  const isSender = message.user_id === currentUserId;
  const alignment = isSender ? 'self-end ml-auto' : 'self-start';
  const bgColor = isSender ? 'bg-blue-500 text-white dark:bg-blue-700' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';

  // Basic timestamp formatting (you might want a more sophisticated library like date-fns)
  const formatTimestamp = (timestamp: Date | string | number): string => {
    try {
      const date = new Date(timestamp);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return 'Error';
    }
  };

  return (
    <div className={`p-3 rounded-lg max-w-xl ${alignment} ${bgColor} shadow`}>
      <p className="text-sm break-words">{message.text}</p>
      <span className="text-xs opacity-70 block text-right mt-1">
        {formatTimestamp(message.timestamp)}
      </span>
    </div>
  );
};

export default MessageItem; 