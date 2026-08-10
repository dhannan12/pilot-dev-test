import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users } from 'lucide-react';

interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string;
}

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ReservationFormData>>({});

  const timeSlots = ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];
  const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

  const validateForm = (): boolean => {
    const newErrors: Partial<ReservationFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          guests: '2',
          specialRequests: '',
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Make a Reservation</CardTitle>
            <CardDescription className="text-amber-100">Book your table at our restaurant</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h3>
                <p className="text-gray-600 mb-4">Thank you for your reservation. We look forward to seeing you on {formData.date} at {formData.time}.</p>
                <p className="text-sm text-gray-500">A confirmation email has been sent to {formData.email}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`border-2 ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-700 font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" /> Date *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`border-2 ${errors.date ? 'border-red-500' : 'border-gray-200'} focus:border-amber-500`}
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-gray-700 font-semibold flex items-center gap-2"><Clock className="w-4 h-4" /> Time *</Label>
                    <Select value={formData.time} onValueChange={(value) => handleSelectChange('time', value)}>
                      <SelectTrigger className={`border-2 ${errors.time ? 'border-red-500' : 'border-gray-200'}`}>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-gray-700 font-semibold flex items-center gap-2"><Users className="w-4 h-4" /> Number of Guests</Label>
                    <Select value={formData.guests} onValueChange={(value) => handleSelectChange('guests', value)}>
                      <SelectTrigger className="border-2 border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {guestOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option} {option === '1' ? 'Guest' : 'Guests'}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests" className="text-gray-700 font-semibold">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    placeholder="Any dietary restrictions, allergies, or special occasions?"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="border-2 border-gray-200 focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Confirm Reservation
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        date: '',
                        time: '',
                        guests: '2',
                        specialRequests: '',
                      });
                      setErrors({});
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReservationForm;