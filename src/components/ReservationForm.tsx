import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  location: string;
  specialRequests: string;
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    location: '',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ReservationFormData>>({});

  const timeSlots = ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];
  const guestCounts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];
  const locations = ['Downtown', 'Uptown', 'Waterfront', 'Airport', 'Mall District'];

  const validateForm = (): boolean => {
    const newErrors: Partial<ReservationFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.guests) newErrors.guests = 'Number of guests is required';
    if (!formData.location) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ReservationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ReservationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      console.log('Reservation submitted:', formData);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '',
          location: '',
          specialRequests: '',
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">Reservation Confirmed!</CardTitle>
            <CardDescription className="text-green-600">Thank you for your reservation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-green-700">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Guests:</strong> {formData.guests}</p>
              <p><strong>Location:</strong> {formData.location}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Make a Reservation</CardTitle>
            <CardDescription className="text-blue-100">Book your table at our restaurant</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className={`${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              {/* Reservation Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Reservation Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`${errors.date ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-slate-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Time *
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleSelectChange('time', value)}>
                      <SelectTrigger className={`${errors.time ? 'border-red-500' : 'border-slate-300'}`}>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-slate-700 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Number of Guests *
                    </Label>
                    <Select value={formData.guests} onValueChange={(value) => handleSelectChange('guests', value)}>
                      <SelectTrigger className={`${errors.guests ? 'border-red-500' : 'border-slate-300'}`}>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {guestCounts.map((count) => (
                          <SelectItem key={count} value={count}>
                            {count} {count === '1' ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.guests && <p className="text-sm text-red-500">{errors.guests}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-slate-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location *
                    </Label>
                    <Select value={formData.location} onValueChange={(value) => handleSelectChange('location', value)}>
                      <SelectTrigger className={`${errors.location ? 'border-red-500' : 'border-slate-300'}`}>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="specialRequests" className="text-slate-700">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requests or dietary requirements?"
                  className="border-slate-300 resize-none"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors">
                Complete Reservation
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReservationForm;