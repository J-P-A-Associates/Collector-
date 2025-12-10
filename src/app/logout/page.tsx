'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Logout() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.auth.signOut().then(() => {
      router.push('/')
      router.refresh()
    })
  }, [supabase, router])

  return <p className="text-center mt-20">Logging you out...</p>
}
