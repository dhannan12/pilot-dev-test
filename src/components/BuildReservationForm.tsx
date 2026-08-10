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
  partySize: string;
  specialRequests: string;
}

const BuildReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    guestName: '',
    email: '',
    phone: '',
    reservationDate: '',
    reservationTime: '',
    partySize: '',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        guestName: '',
        email: '',
        phone: '',
        reservationDate: '',
        reservationTime: '',
        partySize: '',
        specialRequests: '',
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Make a Reservation</CardTitle>
            <CardDescription className="text-blue-100">Book your table with us today</CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Reservation Confirmed!</h3>
                <p className="text-gray-600">Thank you for your reservation. We look forward to seeing you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Guest Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Guest Information</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestName" className="text-gray-700 font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="guestName"
                        name="guestName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.guestName}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Reservation Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Reservation Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reservationDate" className="text-gray-700 font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date *
                      </Label>
                      <Input
                        id="reservationDate"
                        name="reservationDate"
                        type="date"
                        value={formData.reservationDate}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reservationTime" className="text-gray-700 font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time *
                      </Label>
                      <Select value={formData.reservationTime} onValueChange={(value) => handleSelectChange('reservationTime', value)}>
                        <SelectTrigger id="reservationTime" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
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
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partySize" className="text-gray-700 font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Party Size *
                    </Label>
                    <Select value={formData.partySize} onValueChange={(value) => handleSelectChange('partySize', value)}>
                      <SelectTrigger id="partySize" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select party size" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockReservationData.partySizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} {size === '1' ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Special Requests Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests" className="text-gray-700 font-medium">
                      Special Requests
                    </Label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      placeholder="Any dietary restrictions, allergies, or special occasions?"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
                  >
                    Confirm Reservation
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() =>
                      setFormData({
                        guestName: '',
                        email: '',
                        phone: '',
                        reservationDate: '',
                        reservationTime: '',
                        partySize: '',
                        specialRequests: '',
                      })
                    }
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

export default BuildReservationForm;