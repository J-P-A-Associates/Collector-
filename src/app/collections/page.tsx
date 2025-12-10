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

  return (
    <div className="p-8 max-w-6xl mx-auto relative min-h-screen pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Collections</h1>
        <Link href="/collections/new" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          + New Collection
        </Link>
      </div>

      {(!collections || collections.length === 0) ? (
        <p className="text-xl text-gray-600 text-center py-12">
          No collections yet. Create your first one!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <div key={c.id} className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-bold">{c.name}</h3>
              <p className="text-gray-600">
                {c.category}{c.subcategory && ` – ${c.subcategory}`}
              </p>
              <p className="text-sm mt-2">{c.is_public ? 'Public' : 'Private'}</p>
            </div>
          ))}
        </div>
      )}

      {/* CLEAN, SINGLE LOGOUT BUTTON */}
      <Link
        href="/logout"
        className="fixed bottom-8 right-8 bg-red-600 text-white px-7 py-4 rounded-full shadow-xl hover:bg-red-700 font-medium text-lg z-50 transition"
      >
        Log Out
      </Link>
      <Link href="/logout" className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 font-medium z-50">
  Log Out
</Link>
    </div>
  )
}
