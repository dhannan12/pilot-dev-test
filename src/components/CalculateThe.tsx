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
      alert('Please select a date');
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

  const getStatusColor = (status: string): string => {
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
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Reservations</CardTitle>
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
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCalculate} className="flex-1">
                Calculate
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="space-y-4 border-t pt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-600 mb-1">Total Reservations</p>
                <p className="text-3xl font-bold text-blue-900">{totalReservations}</p>
                <p className="text-xs text-blue-500 mt-1">for {selectedDate}</p>
              </div>

              {/* Reservations List */}
              {filteredReservations.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">Reservation Details</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {filteredReservations.map((reservation: Reservation) => (
                      <div
                        key={reservation.id}
                        className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="font-medium">{reservation.guestName}</p>
                            <p className="text-sm text-gray-600">
                              Room {reservation.roomNumber}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              reservation.status
                            )}`}
                          >
                            {reservation.status.charAt(0).toUpperCase() +
                              reservation.status.slice(1)}
                          </span>
                        </div>
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

          {/* Empty State */}
          {!hasSearched && (
            <div className="text-center py-8 text-gray-500">
              <p>Select a date and click Calculate to view reservations</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculateThe;