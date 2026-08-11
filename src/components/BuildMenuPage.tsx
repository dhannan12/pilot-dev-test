import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import { mockMenuItems, mockCategories } from './BuildMenuPage.mock';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const BuildMenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: categories[0]?.id || '',
    available: true,
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.price !== undefined) {
      const item: MenuItem = {
        id: `item-${Date.now()}`,
        name: newItem.name,
        description: newItem.description || '',
        price: newItem.price,
        category: newItem.category || categories[0]?.id || '',
        available: newItem.available ?? true,
      };
      setMenuItems([...menuItems, item]);
      setNewItem({
        name: '',
        description: '',
        price: 0,
        category: categories[0]?.id || '',
        available: true,
      });
      setIsAddingItem(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleToggleAvailability = (id: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const getCategoryName = (categoryId: string): string => {
    return categories.find((cat) => cat.id === categoryId)?.name || 'Unknown';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Build Menu</h1>
          <p className="text-slate-600">Manage your restaurant menu items and categories</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <Label htmlFor="search" className="text-sm font-medium text-slate-700 mb-2 block">
              Search Items
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="search"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button
            onClick={() => setIsAddingItem(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="items">Menu Items ({filteredItems.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
          </TabsList>

          {/* Menu Items Tab */}
          <TabsContent value="items" className="space-y-4">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap mb-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Add Item Form */}
            {isAddingItem && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle>Add New Menu Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="item-name" className="text-sm font-medium">Item Name</Label>
                      <Input
                        id="item-name"
                        value={newItem.name || ''}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="e.g., Caesar Salad"
                      />
                    </div>
                    <div>
                      <Label htmlFor="item-price" className="text-sm font-medium">Price</Label>
                      <Input
                        id="item-price"
                        type="number"
                        step="0.01"
                        value={newItem.price || 0}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="item-description" className="text-sm font-medium">Description</Label>
                    <Input
                      id="item-description"
                      value={newItem.description || ''}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Item description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="item-category" className="text-sm font-medium">Category</Label>
                    <select
                      id="item-category"
                      value={newItem.category || ''}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddItem} className="bg-green-600 hover:bg-green-700">
                      Save Item
                    </Button>
                    <Button
                      onClick={() => setIsAddingItem(false)}
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <Card key={item.id} className={item.available ? '' : 'opacity-60'}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {getCategoryName(item.category)}
                          </CardDescription>
                        </div>
                        <span className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-slate-600">{item.description}</p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            item.available ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        />
                        <span className="text-xs font-medium text-slate-600">
                          {item.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => handleToggleAvailability(item.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          {item.available ? 'Disable' : 'Enable'}
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-slate-500">No menu items found. Try adjusting your search or filters.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => {
                const itemCount = menuItems.filter((item) => item.category === category.id).length;
                return (
                  <Card key={category.id}>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">
                        <span className="font-semibold text-slate-900">{itemCount}</span> items in this category
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuildMenuPage;