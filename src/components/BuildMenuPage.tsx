import React, { useState } from 'react'

const MOCK_MENU_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, description: 'Classic tomato, mozzarella, basil' },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, description: 'Tomato, mozzarella, pepperoni' },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: 9.99, description: 'Romaine, parmesan, croutons, dressing' },
  { id: 4, name: 'Greek Salad', category: 'Salad', price: 10.99, description: 'Mixed greens, feta, olives, tomatoes' },
  { id: 5, name: 'Spaghetti Carbonara', category: 'Pasta', price: 13.99, description: 'Pasta, eggs, bacon, parmesan' },
  { id: 6, name: 'Fettuccine Alfredo', category: 'Pasta', price: 12.99, description: 'Fettuccine, cream, parmesan, butter' },
  { id: 7, name: 'Chocolate Cake', category: 'Dessert', price: 6.99, description: 'Rich chocolate cake with frosting' },
  { id: 8, name: 'Tiramisu', category: 'Dessert', price: 7.99, description: 'Italian dessert with mascarpone and coffee' },
]

const CATEGORIES = ['All', 'Pizza', 'Salad', 'Pasta', 'Dessert']

export default function BuildMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [menuItems, setMenuItems] = useState(MOCK_MENU_ITEMS)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '' })
  const [showForm, setShowForm] = useState(false)

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  const handleAddItem = () => {
    setShowForm(true)
    setEditingId(null)
    setFormData({ name: '', category: '', price: '', description: '' })
  }

  const handleEditItem = (item: typeof MOCK_MENU_ITEMS[0]) => {
    setEditingId(item.id)
    setFormData({ name: item.name, category: item.category, price: item.price.toString(), description: item.description })
    setShowForm(true)
  }

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }

  const handleSaveItem = () => {
    if (!formData.name || !formData.category || !formData.price) return

    if (editingId) {
      setMenuItems(menuItems.map(item => 
        item.id === editingId 
          ? { ...item, name: formData.name, category: formData.category, price: parseFloat(formData.price), description: formData.description }
          : item
      ))
    } else {
      const newItem = {
        id: Math.max(...menuItems.map(i => i.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description
      }
      setMenuItems([...menuItems, newItem])
    }
    setShowForm(false)
    setFormData({ name: '', category: '', price: '', description: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Build Menu</h1>
          <p className="text-slate-600">Create and manage your restaurant menu</p>
        </div>

        <div className="mb-6 flex gap-3 flex-wrap">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddItem}
          className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
        >
          + Add New Item
        </button>

        {showForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Item Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSaveItem}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Item
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-20">{item.category[0]}</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">${item.price.toFixed(2)}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.category}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No items found in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}