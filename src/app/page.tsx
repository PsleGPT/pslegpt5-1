// This page is a Server Component

// Import the server client creator
import { createClient } from '@/utils/supabase/server';
import AuthForm from '@/components/AuthForm'; // Import the AuthForm component
import ChatInterface from '@/components/ChatInterface'; // Import the new ChatInterface component

// Define the Message interface (Consider moving to a shared types file)
// This might still be needed if you fetch initial messages here
interface Message {
  id: string | number;
  text: string;
  user_id: string | number;
  timestamp: Date | string | number;
  chat_id: string | number;
}

// Main Page Component (Server Component)
export default async function Home() {
  const supabase = await createClient(); // Create server client

  const { data: { user } } = await supabase.auth.getUser();

  // Placeholder Chat ID and initial messages - replace with actual data fetching logic
  const CURRENT_CHAT_ID = "chat1";
  const initialMessages: Message[] = user ? [
    // Example messages if needed - ideally fetched from DB
    { id: 1, text: "Welcome!", user_id: "assistant1", timestamp: "2024-04-01T10:00:00.000Z", chat_id: CURRENT_CHAT_ID },
    // { id: 2, text: "Your first message?", user_id: user.id, timestamp: "2024-04-01T10:01:00.000Z", chat_id: CURRENT_CHAT_ID },
  ] : [];

  // TODO: Fetch actual messages for the current chat from Supabase here if the user is logged in
  // Example:
  // let fetchedMessages: Message[] = [];
  // if (user) {
  //   const { data, error } = await supabase
  //     .from('message') // Use correct table name from schema.sql
  //     .select('*')
  //     .eq('chat_id', CURRENT_CHAT_ID)
  //     .order('created_at', { ascending: true });
  //   if (error) console.error('Error fetching messages:', error);
  //   else fetchedMessages = data || [];
  // }

  return (
    <div>
      {user ? (
        // If user is logged in, show the chat interface
        <ChatInterface
          // Pass fetched messages instead of placeholders if implemented
          initialMessages={initialMessages} // Use fetchedMessages if you implemented fetching
          userId={user.id} // Pass user ID
          chatId={CURRENT_CHAT_ID} // Pass relevant chat ID
        />
      ) : (
        // If user is not logged in, show the AuthForm
        <AuthForm />
      )}
      {/* TODO: Display messages from server actions (e.g., "Check your email") */}
      {/* You can read searchParams here to display the message from redirects */}
      {/* Example: const message = searchParams.get('message'); */}
      {/* {message && <p>{message}</p>} */}
    </div>
  );
}
