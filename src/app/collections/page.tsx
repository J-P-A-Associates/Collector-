'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const categories = [
  'Trading Cards','Coins','Stamps','Comics','Figurines','Art','Wine','Watches','Other'
]

export default function NewCollection() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Trading Cards')
  const [subcategory, setSubcategory] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      alert('Not logged in')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('collections')
      .insert({
        user_id: user.id,                    // ← guaranteed UUID
        name: name.trim(),
        category,
        subcategory: subcategory.trim() || null,
        is_public: isPublic
      })

    if (error) {
      alert('Error: ' + error.message)
      console.error(error)
    } else {
      router.push('/dashboard')
      router.refresh()   // forces fresh data
    }
    setLoading(false)
  }

  // rest of return() is unchanged — keep exactly what you have
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Collection</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ... all your inputs exactly as before ... */}
        <button type="submit" disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Collection'}
        </button>
      </form>
    </div>
  )
}
