import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Mail, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { mockReservations } from './ConfirmationOf.mock';

interface Reservation {
  id: string;
  confirmationNumber: string;
  guestName: string;
  guestEmail: string;
  reservationDate: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  roomType: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  emailSent: boolean;
  emailSentAt?: string;
}

const ConfirmationOf: React.FC = () => {
  const [reservations] = useState<Reservation[]>(mockReservations);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(
    reservations[0] || null
  );
  const [emailResending, setEmailResending] = useState<string | null>(null);

  const handleResendEmail = (reservationId: string) => {
    setEmailResending(reservationId);
    setTimeout(() => {
      setEmailResending(null);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reservation Confirmations</h1>
        <p className="text-gray-600">Manage and resend reservation confirmation emails</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservations List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-semibold">Reservations</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {reservations.map((reservation) => (
              <button
                key={reservation.id}
                onClick={() => setSelectedReservation(reservation)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedReservation?.id === reservation.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{reservation.guestName}</p>
                    <p className="text-xs text-gray-500">#{reservation.confirmationNumber}</p>
                  </div>
                  {reservation.emailSent && (
                    <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Confirmation Details */}
        <div className="lg:col-span-2">
          {selectedReservation ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Reservation Confirmation
                    </CardTitle>
                    <CardDescription>
                      Confirmation #{selectedReservation.confirmationNumber}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(selectedReservation.status)}>
                    {selectedReservation.status.charAt(0).toUpperCase() +
                      selectedReservation.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Guest Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Guest Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium">{selectedReservation.guestName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium break-all">{selectedReservation.guestEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Reservation Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-600">Check-in</p>
                        <p className="font-medium">{selectedReservation.checkInDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-600">Check-out</p>
                        <p className="font-medium">{selectedReservation.checkOutDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-600">Guests</p>
                        <p className="font-medium">{selectedReservation.numberOfGuests}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-600">Room Type</p>
                        <p className="font-medium">{selectedReservation.roomType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm">Email Confirmation</span>
                  </div>
                  {selectedReservation.emailSent ? (
                    <div className="text-sm text-blue-700">
                      <p>✓ Confirmation email sent</p>
                      {selectedReservation.emailSentAt && (
                        <p className="text-xs text-blue-600 mt-1">
                          Sent on {selectedReservation.emailSentAt}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-blue-700">Pending email confirmation</p>
                  )}
                </div>

                {/* Price Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Price</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${selectedReservation.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleResendEmail(selectedReservation.id)}
                    variant="outline"
                    className="flex-1"
                    disabled={emailResending === selectedReservation.id}
                  >
                    {emailResending === selectedReservation.id ? (
                      'Sending...'
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Resend Confirmation
                      </>
                    )}
                  </Button>
                  <Button className="flex-1" variant="default">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">Select a reservation to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOf;