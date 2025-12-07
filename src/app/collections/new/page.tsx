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

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert('Not logged in')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('collections')
      .insert({
        user_id: user.id,
        name: name.trim(),
        category,
        subcategory: subcategory.trim() || null,
        is_public: isPublic
      })

    if (error) {
      alert('Error: ' + error.message)
      console.error(error)
    } else {
      window.location.href = '/collections'  // hard redirect = fresh data
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Collection</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Collection Name *</label>
          <input required value={name} onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg" placeholder="Bob's Pokémon Cards" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subcategory (optional)</label>
          <input value={subcategory} onChange={e => setSubcategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg" placeholder="Vintage Base Set" />
        </div>
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
          <span>Make collection public</span>
        </label>
        <button type="submit" disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50">
          {loading ? 'Creating...' : 'Create Collection'}
        </button>
      </form>
    </div>
  )
}
