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

  // Server action for deleting a collection
  const deleteCollection = async (id: string) => {
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
        <p className="text-center py-12 text-xl text-gray-600">
          No collections yet. Create your first one!
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <div key={c.id} className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition">
              <Link href={`/collections/${c.id}`} className="block">
                <h3 className="text-2xl font-bold mb-2 hover:text-blue-600">{c.name}</h3>
                <p className="text-gray-600 mb-1">
                  {c.category}{c.subcategory && ` – ${c.subcategory}`}
                </p>
                <p className="text-sm text-gray-500">{c.is_public ? 'Public' : 'Private'}</p>
              </Link>

              {/* DELETE BUTTON */}
              <form action={deleteCollection.bind(null, c.id)} className="mt-4">
                <button
                  type="submit"
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Delete Collection
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      {/* LOGOUT BUTTON — ALWAYS VISIBLE */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link
          href="/logout"
          className="bg-red-600 text-white px-7 py-4 rounded-full shadow-2xl hover:bg-red-700 font-semibold text-lg flex items-center gap-2"
        >
          Log Out
        </Link>
      </div>
    </div>
  )
}
