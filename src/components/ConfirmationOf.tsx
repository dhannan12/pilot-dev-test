import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Mail, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { mockReservations } from './ConfirmationOf.mock';

interface Reservation {
  id: string;
  guestName: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  numberOfGuests: number;
  totalPrice: number;
  confirmationNumber: string;
  status: 'pending' | 'confirmed' | 'sent';
  location: string;
}

const ConfirmationOf: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleSendConfirmation = (reservationId: string) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, status: 'sent' } : res
      )
    );
    const reservation = reservations.find((r) => r.id === reservationId);
    if (reservation) {
      setSelectedReservation({ ...reservation, status: 'sent' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reservation Confirmations</h1>
        <p className="text-gray-600">Manage and send email confirmations for reservations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservations List */}
        <div className="lg:col-span-2 space-y-4">
          {reservations.map((reservation) => (
            <Card
              key={reservation.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedReservation(reservation)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{reservation.guestName}</CardTitle>
                    <CardDescription>Confirmation #{reservation.confirmationNumber}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(reservation.status)}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{reservation.checkInDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{reservation.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{reservation.numberOfGuests} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{reservation.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Confirmation Details */}
        <div>
          {selectedReservation ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Confirmation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Guest Name</p>
                    <p className="text-base font-semibold">{selectedReservation.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email Address</p>
                    <p className="text-base break-all">{selectedReservation.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Confirmation Number</p>
                    <p className="text-base font-mono font-semibold">{selectedReservation.confirmationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Room Type</p>
                    <p className="text-base">{selectedReservation.roomType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Check-in</p>
                    <p className="text-base">{selectedReservation.checkInDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Check-out</p>
                    <p className="text-base">{selectedReservation.checkOutDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Price</p>
                    <p className="text-lg font-bold text-blue-600">${selectedReservation.totalPrice}</p>
                  </div>
                </div>

                {selectedReservation.status === 'sent' ? (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Confirmation sent!</span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleSendConfirmation(selectedReservation.id)}
                    className="w-full gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Send Confirmation Email
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p>Select a reservation to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOf;