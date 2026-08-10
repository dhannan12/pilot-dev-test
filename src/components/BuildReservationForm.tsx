import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Clock } from 'lucide-react';
import { mockReservationData } from './BuildReservationForm.mock';

interface ReservationFormData {
  guestName: string;
  email: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: string;
  specialRequests: string;
}

const BuildReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    guestName: '',
    email: '',
    phone: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: '',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ReservationFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ReservationFormData> = {};

    if (!formData.guestName.trim()) newErrors.guestName = 'Guest name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.reservationDate) newErrors.reservationDate = 'Date is required';
    if (!formData.reservationTime) newErrors.reservationTime = 'Time is required';
    if (!formData.numberOfGuests) newErrors.numberOfGuests = 'Number of guests is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          guestName: '',
          email: '',
          phone: '',
          reservationDate: '',
          reservationTime: '',
          numberOfGuests: '',
          specialRequests: '',
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Make a Reservation</CardTitle>
            <CardDescription className="text-blue-100">Book your table with us today</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="mb-4 text-5xl">✓</div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Reservation Confirmed!</h3>
                <p className="text-gray-600">Thank you for your reservation. We look forward to seeing you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Guest Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Guest Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestName" className="text-gray-700">Full Name *</Label>
                      <Input
                        id="guestName"
                        name="guestName"
                        placeholder="John Doe"
                        value={formData.guestName}
                        onChange={handleInputChange}
                        className={errors.guestName ? 'border-red-500' : ''}
                      />
                      {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>

                {/* Reservation Details Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold text-gray-800">Reservation Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reservationDate" className="text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Date *
                      </Label>
                      <Input
                        id="reservationDate"
                        name="reservationDate"
                        type="date"
                        value={formData.reservationDate}
                        onChange={handleInputChange}
                        className={errors.reservationDate ? 'border-red-500' : ''}
                      />
                      {errors.reservationDate && <p className="text-red-500 text-sm">{errors.reservationDate}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reservationTime" className="text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Time *
                      </Label>
                      <Select value={formData.reservationTime} onValueChange={(value) => handleSelectChange('reservationTime', value)}>
                        <SelectTrigger className={errors.reservationTime ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockReservationData.availableTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.reservationTime && <p className="text-red-500 text-sm">{errors.reservationTime}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfGuests" className="text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Number of Guests *
                    </Label>
                    <Select value={formData.numberOfGuests} onValueChange={(value) => handleSelectChange('numberOfGuests', value)}>
                      <SelectTrigger className={errors.numberOfGuests ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockReservationData.guestCounts.map((count) => (
                          <SelectItem key={count} value={count.toString()}>
                            {count} {count === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.numberOfGuests && <p className="text-red-500 text-sm">{errors.numberOfGuests}</p>}
                  </div>
                </div>

                {/* Special Requests Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold text-gray-800">Special Requests</h3>
                  <div className="space-y-2">
                    <Label htmlFor="specialRequests" className="text-gray-700">Additional Notes</Label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      placeholder="Any special requests or dietary restrictions?"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  >
                    Confirm Reservation
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        guestName: '',
                        email: '',
                        phone: '',
                        reservationDate: '',
                        reservationTime: '',
                        numberOfGuests: '',
                        specialRequests: '',
                      });
                      setErrors({});
                    }}
                    className="flex-1"
                  >
                    Clear Form
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

export default BuildReservationForm;