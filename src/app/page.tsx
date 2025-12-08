// src/app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

// This line fixes the DynamicServerError for good
export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  // If logged in → go straight to collections
  if (user) {
    redirect('/collections')
  }

  // Not logged in → show landing page
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold mb-6">Collectors Hub</h1>
      <p className="text-xl mb-10 max-w-2xl">
        The easiest way to catalog your collectibles, track their value, and trade with others.
      </p>
      <div className="space-x-6">
        <Link
          href="/login"
          className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="bg-gray-200 text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-300"
        >
          Sign Up
        </Link>
      </div>
    </main>
  )
}
