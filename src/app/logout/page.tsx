'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      router.push('/')
      router.refresh()
    })
  }, [supabase, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-xl">Logging you out...</p>
    </div>
  )
}
