import React, { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  manager: string;
  menuItems: MenuItem[];
}

const MOCK_RESTAURANT: Restaurant = {
  id: 'rest-001',
  name: 'The Golden Fork',
  manager: 'John Smith',
  menuItems: [
    {
      id: 'item-001',
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with lemon butter sauce',
      price: 24.99,
      category: 'Main Course',
      available: true,
    },
    {
      id: 'item-002',
      name: 'Caesar Salad',
      description: 'Crisp romaine with parmesan and croutons',
      price: 12.99,
      category: 'Appetizer',
      available: true,
    },
    {
      id: 'item-003',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center',
      price: 8.99,
      category: 'Dessert',
      available: false,
    },
    {
      id: 'item-004',
      name: 'Ribeye Steak',
      description: '12oz premium cut with seasonal vegetables',
      price: 34.99,
      category: 'Main Course',
      available: true,
    },
  ],
};

export default function RestaurantUpdate() {
  const [restaurant, setRestaurant] = useState<Restaurant>(MOCK_RESTAURANT);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Main Course',
    available: true,
  });

  const handleEditClick = (item: MenuItem) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
  };

  const handleSaveEdit = () => {
    if (editFormData && editingId) {
      setRestaurant({
        ...restaurant,
        menuItems: restaurant.menuItems.map((item) =>
          item.id === editingId ? editFormData : item
        ),
      });
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleDeleteItem = (id: string) => {
    setRestaurant({
      ...restaurant,
      menuItems: restaurant.menuItems.filter((item) => item.id !== id),
    });
  };

  const handleAddItem = () => {
    const id = `item-${Date.now()}`;
    setRestaurant({
      ...restaurant,
      menuItems: [
        ...restaurant.menuItems,
        {
          ...newItem,
          id,
        },
      ],
    });
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: 'Main Course',
      available: true,
    });
    setShowAddForm(false);
  };

  const handleEditFieldChange = (
    field: keyof MenuItem,
    value: string | number | boolean
  ) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: value,
      });
    }
  };

  const handleNewItemFieldChange = (
    field: keyof Omit<MenuItem, 'id'>,
    value: string | number | boolean
  ) => {
    setNewItem({
      ...newItem,
      [field]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {restaurant.name}
          </h1>
          <p className="text-lg text-slate-600">
            Manager: <span className="font-semibold">{restaurant.manager}</span>
          </p>
        </div>

        {/* Add New Item Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md"
          >
            {showAddForm ? '✕ Cancel' : '+ Add New Menu Item'}
          </button>
        </div>

        {/* Add New Item Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-green-600">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Menu Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    handleNewItemFieldChange('name', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Pasta Carbonara"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) =>
                    handleNewItemFieldChange('price', parseFloat(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    handleNewItemFieldChange('category', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option>Appetizer</option>
                  <option>Main Course</option>
                  <option>Dessert</option>
                  <option>Beverage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Available
                </label>
                <select
                  value={newItem.available ? 'true' : 'false'}
                  onChange={(e) =>
                    handleNewItemFieldChange('available', e.target.value === 'true')
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) =>
                    handleNewItemFieldChange('description', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Describe the dish..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddItem}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Save Item
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-slate-300 text-slate-800 font-semibold rounded-lg hover:bg-slate-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Menu Items List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Menu Items ({restaurant.menuItems.length})
          </h2>

          {restaurant.menuItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-slate-600 text-lg">No menu items yet.</p>
            </div>
          ) : (
            restaurant.menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                {editingId === item.id && editFormData ? (
                  // Edit Mode
                  <div className="p-6 border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Edit Menu Item
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Item Name
                        </label>
                        <input
                          type="text"
                          value={editFormData.name}
                          onChange={(e) =>
                            handleEditFieldChange('name', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={editFormData.price}
                          onChange={(e) =>
                            handleEditFieldChange(
                              'price',
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={editFormData.category}
                          onChange={(e) =>
                            handleEditFieldChange('category', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option>Appetizer</option>
                          <option>Main Course</option>
                          <option>Dessert</option>
                          <option>Beverage</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Available
                        </label>
                        <select
                          value={editFormData.available ? 'true' : 'false'}
                          onChange={(e) =>
                            handleEditFieldChange(
                              'available',
                              e.target.value === 'true'
                            )
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="true">Available</option>
                          <option value="false">Not Available</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={editFormData.description}
                          onChange={(e) =>
                            handleEditFieldChange('description', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                        />
                      </div>
                    </div>
