export default function NewCollection() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Create New Collection</h1>
      <form className="space-y-6">
        <input placeholder="Collection name (e.g. Pokémon Cards)" className="w-full px-4 py-3 border rounded-lg" />
        <textarea placeholder="Description (optional)" className="w-full px-4 py-3 border rounded-lg" rows={4} />
        <label className="flex items-center gap-2">
          <input type="checkbox" /> Make collection public
        </label>
        <button type="submit" className="bg-black text-white px-8 py-3 rounded-lg font-medium">
          Create Collection
        </button>
      </form>
    </div>
  )
}
