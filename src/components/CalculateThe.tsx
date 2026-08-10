import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockReservations } from './CalculateThe.mock';

interface Reservation {
  id: string;
  date: string;
  guestName: string;
  roomNumber: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const CalculateThe: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [totalReservations, setTotalReservations] = useState<number>(0);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleCalculate = (): void => {
    if (!selectedDate) {
      return;
    }

    const filtered = mockReservations.filter(
      (reservation: Reservation) => reservation.date === selectedDate
    );

    setFilteredReservations(filtered);
    setTotalReservations(filtered.length);
    setHasSearched(true);
  };

  const handleReset = (): void => {
    setSelectedDate('');
    setTotalReservations(0);
    setFilteredReservations([]);
    setHasSearched(false);
  };

  const confirmedCount = filteredReservations.filter(
    (r: Reservation) => r.status === 'confirmed'
  ).length;

  const pendingCount = filteredReservations.filter(
    (r: Reservation) => r.status === 'pending'
  ).length;

  const cancelledCount = filteredReservations.filter(
    (r: Reservation) => r.status === 'cancelled'
  ).length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Reservation Calculator</CardTitle>
          <CardDescription>
            Calculate the total number of reservations for a specific date
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date-input">Select Date</Label>
              <Input
                id="date-input"
                type="date"
                value={selectedDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedDate(e.target.value)
                }
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCalculate}
                disabled={!selectedDate}
                className="flex-1"
              >
                Calculate
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="space-y-4 border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Total Reservations</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {totalReservations}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Confirmed</p>
                      <p className="text-3xl font-bold text-green-600">
                        {confirmedCount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Pending</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {pendingCount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-red-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Cancelled</p>
                      <p className="text-3xl font-bold text-red-600">
                        {cancelledCount}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reservations List */}
              {filteredReservations.length > 0 ? (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Reservations for {selectedDate}</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredReservations.map((reservation: Reservation) => (
                      <div
                        key={reservation.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{reservation.guestName}</p>
                          <p className="text-sm text-gray-600">
                            Room {reservation.roomNumber}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            reservation.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : reservation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {reservation.status.charAt(0).toUpperCase() +
                            reservation.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reservations found for this date</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculateThe;