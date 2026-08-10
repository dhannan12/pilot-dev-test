import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle2, Edit2, Save, X } from 'lucide-react';
import { mockMenuItems, mockRestaurantRoles } from './RestaurantUpdate.mock';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface UserRole {
  id: string;
  name: string;
  role: string;
  canEdit: boolean;
}

const RestaurantUpdate: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [userRole] = useState<UserRole>(mockRestaurantRoles[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MenuItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleEdit = (item: MenuItem) => {
    if (!userRole.canEdit) {
      setErrorMessage('You do not have permission to edit menu items.');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setEditingId(item.id);
    setFormData({ ...item });
    setErrorMessage('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData(null);
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === 'price' ? parseFloat(value) : value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === 'available' ? value === 'true' : value,
      });
    }
  };

  const handleSave = () => {
    if (!formData) return;

    if (!formData.name.trim()) {
      setErrorMessage('Menu item name is required.');
      return;
    }

    if (formData.price < 0) {
      setErrorMessage('Price cannot be negative.');
      return;
    }

    setMenuItems(
      menuItems.map((item) => (item.id === editingId ? formData : item))
    );

    setSuccessMessage(`Menu item "${formData.name}" updated successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
    setEditingId(null);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Restaurant Menu Manager</h1>
          <p className="text-slate-600">Update and manage your menu items</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Current User:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              userRole.canEdit
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {userRole.name} ({userRole.role})
            </span>
          </div>
        </div>

        {/* Alert Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {editingId === item.id ? (
                // Edit Mode
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                      Item Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData?.name || ''}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Enter item name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData?.description || ''}
                      onChange={handleInputChange}
                      className="mt-1 resize-none"
                      placeholder="Enter item description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-sm font-medium text-slate-700">
                        Price ($)
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData?.price || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-sm font-medium text-slate-700">
                        Category
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        value={formData?.category || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g., Appetizer"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="available" className="text-sm font-medium text-slate-700">
                      Availability
                    </Label>
                    <Select
                      value={formData?.available ? 'true' : 'false'}
                      onValueChange={(value) => handleSelectChange('available', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Available</SelectItem>
                        <SelectItem value="false">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              ) : (
                // View Mode
                <>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-slate-900">{item.name}</CardTitle>
                        <CardDescription className="mt-1">{item.category}</CardDescription>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-2xl font-bold text-slate-900">${item.price.toFixed(2)}</span>
                      <Button
                        onClick={() => handleEdit(item)}
                        disabled={!userRole.canEdit}
                        className={`${
                          userRole.canEdit
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-400 cursor-not-allowed'
                        } text-white`}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {menuItems.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-slate-500 text-lg">No menu items found.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RestaurantUpdate;