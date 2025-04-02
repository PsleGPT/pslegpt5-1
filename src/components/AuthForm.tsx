"use client";

import { useState } from 'react';
// Remove direct supabase client import if no longer needed here
// import { supabase } from '@/lib/supabaseClient';

// Import the server actions
import { login, signup } from '@/app/auth/actions';
import { toast } from 'sonner'; // Import the toast function

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up and Log In
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Re-add loading state
  // We'll use toasts for errors now instead of component state
  // const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Create FormData from the form state
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    if (isSignUp) {
      try {
        const result = await signup(formData);
        if (result.success) {
          toast.success("Sign Up Successful!", {
            description: "Please check your email (and spam folder) for the verification link.",
            duration: 8000, // Keep toast visible longer
          });
          // Optionally reset form fields
          setEmail('');
          setPassword('');
        } else {
          toast.error("Sign Up Failed", {
            description: result.message,
          });
        }
      } catch /* (e) */ {
        toast.error("An unexpected error occurred during sign up.");
      }
    } else {
      // Login action now returns error details or redirects on success.
      try {
        // Await the login action to get the result in case of error
        const result = await login(formData);

        // If result is defined, it means an error occurred and redirect didn't happen
        if (result) {
           if (result.requiresVerification) {
             // Specific toast for unverified email
             toast.warning("Email Verification Required", {
               description: result.message,
               duration: 8000,
             });
           } else {
             // Generic error toast for other login failures
             toast.error("Login Failed", {
               description: result.message,
             });
           }
        }
        // If result is undefined, the action successfully redirected, no client action needed

      } catch (e) {
        // This catch block handles unexpected errors during the action call itself
        console.error("Unexpected login error:", e);
        toast.error("Login Failed", {
           description: (e instanceof Error) ? e.message : "An unexpected error occurred.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {isSignUp ? 'Create Account' : 'Log In'}
        </h2>
        {/* Remove action prop, use onSubmit instead */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Disable inputs while loading
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Disable inputs while loading
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
            />
          </div>

          {/* Error display removed, handled by toasts */}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:focus:ring-offset-gray-800"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <button
            onClick={() => { setIsSignUp(!isSignUp); }} // Toggle mode
            disabled={loading} // Disable toggle while loading
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
} 