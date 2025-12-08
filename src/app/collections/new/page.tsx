'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const categories = ['Trading Cards','Coins','Stamps','Comics','Figurines','Art','Wine','Watches','Other']

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
    if (!user) { alert('Not logged in'); setLoading(false); return }

    const { error } = await supabase
      .from('collections')
      .insert({
        user_id: user.id,
        name: name.trim(),
        category,
        subcategory: subcategory.trim() || null,
        is_public: isPublic,
        type: 'collection'  // ← This satisfies the column
      })

    if (error) {
      alert('Error: ' + error.message)
      console.error(error)
    } else {
      router.push('/collections')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Collection</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Collection Name" className="w-full px-4 py-2 border rounded" />
        <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-4 py-2 border rounded">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <input value={subcategory} onChange={e=>setSubcategory(e.target.value)} placeholder="Subcategory (optional)" className="w-full px-4 py-2 border rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} />
          <span>Make collection public</span>
        </label>
        <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded font-bold">
          {loading ? 'Creating...' : 'Create Collection'}
        </button>
      </form>
    </div>
  )
}
