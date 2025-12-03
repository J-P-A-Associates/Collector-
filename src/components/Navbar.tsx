import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Collectors Hub</Link>
        <div className="space-x-6">
          <Link href="/collections">Collections</Link>
          <Link href="/trade">Trade</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}
