import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  const { data: collections } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', user?.id!)
    .order('created_at', { ascending: false })

  const handleDelete = async (id: string) => {
    'use server'
    await supabase.from('collections').delete().eq('id', id)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto relative min-h-screen pb-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Collections</h1>
        <Link href="/collections/new" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          + New Collection
        </Link>
      </div>

      {(!collections || collections.length === 0) ? (
        <p className="text-xl text-center py-12 text-gray-600">
          No collections yet. Create your first one!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Link key={c.id} href={`/collections/${c.id}`} className="block group">
              <div className="border rounded-lg p-6 bg-white shadow hover:shadow-xl transition">
                <h3 className="text-2xl font-bold group-hover:text-blue-600">{c.name}</h3>
                <p className="text-gray-600 mt-1">
                  {c.category}{c.subcategory && ` – ${c.subcategory}`}
                </p>
                <p className="text-sm mt-2">{c.is_public ? 'Public' : 'Private'}</p>

                {/* Delete Button */}
                <form action={handleDelete.bind(null, c.id)} className="mt-4">
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Delete Collection
                  </button>
                </form>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* SINGLE, CLEAN LOGOUT BUTTON */}
      <Link
        href="/logout"
        className="fixed bottom-8 right-8 bg-red-600 text-white px-7 py-4 rounded-full rounded-full shadow-2xl hover:bg-red-700 font-medium text-lg z-50"
      >
        Log Out
      </Link>
    </div>
  )
}
