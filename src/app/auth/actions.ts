'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Use the server utility created earlier
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData): Promise<{ success: boolean; message: string; requiresVerification?: boolean } | void> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login Error:', error.message); // Log server-side
    // Check for specific unverified email error
    // Note: Relying on the exact message string can be brittle. Check Supabase docs/error types if a more robust code/status is available.
    if (error.message.includes('Email not confirmed')) {
        return {
            success: false,
            message: 'Please check your email (and spam folder) to verify your account first.',
            requiresVerification: true,
        };
    }
    // Return generic error for other failures
    return {
        success: false,
        message: error.message || 'Could not authenticate user.',
    };
    // return redirect('/?message=Could not authenticate user') // Remove generic redirect on error
  }

  // Success: revalidate and redirect
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup Error:', error.message); // Log the error server-side
    return { success: false, message: error.message || 'Could not authenticate user.' };
    // return redirect('/?message=Could not authenticate user') // Remove redirect
  }

  // Don't revalidate or redirect here, let the client handle the success message
  // revalidatePath('/', 'layout')
  // return redirect('/?message=Check email to continue sign up process')
  return { success: true, message: 'Check email to continue sign up process.' };
}

export async function logout() {
  const supabase = await createClient(); // Use server client

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout Error:', error.message);
    // Redirecting even on error might be okay, as the client-side state might be cleared anyway
    // Or you could redirect with an error message: return redirect('/?message=Could not log out');
  }

  // Redirect to the home page after sign out.
  // The middleware and page load will handle showing the AuthForm.
  revalidatePath('/', 'layout'); // Ensure layout is revalidated
  redirect('/');
} 