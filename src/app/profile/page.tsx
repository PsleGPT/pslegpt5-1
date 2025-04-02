import React from 'react';

// This is a Server Component by default
export default function ProfilePage() {
  // TODO: Fetch user profile data from Supabase using createServerClient
  // const supabase = await createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user?.id).single();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p>This is the user profile page.</p>
      {/* TODO: Display user profile information here */}
      {/* <pre>{JSON.stringify({ user, profile, error }, null, 2)}</pre> */}
      <p><a href="/" className="text-blue-500 hover:underline">Back to Chat</a></p>
    </div>
  );
} 