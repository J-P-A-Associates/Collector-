import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-4">Collectors App</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        The easiest way to catalog your collectibles, track their value, and trade with others.
      </p>
      <div className="space-x-4">
        <Link href="/login" className="bg-black text-white px-6 py-3 rounded-lg font-medium">
          Log in
        </Link>
        <Link href="/signup" className="bg-gray-200 px-6 py-3 rounded-lg font-medium">
          Sign up
        </Link>
      </div>
    </main>
  )
}
