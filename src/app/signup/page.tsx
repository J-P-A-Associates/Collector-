'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/collections`  // ← SAME FIX
      }
    })
    if (error) alert(error.message)
    else alert('Check your email to confirm your account!')
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-6">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium"
        >
          {loading ? 'Sending...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}
