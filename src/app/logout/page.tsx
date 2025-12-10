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
    })
  }, [supabase, router])

  return <p>Logging out...</p>
}
