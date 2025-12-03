export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h2 className="text-2xl font-bold mb-6">Create your account</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Username" className="w-full px-4 py-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-black text-white py-3 rounded font-medium">
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}
