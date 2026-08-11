import React, { useState } from 'react';

const MOCK_RESTAURANTS = [
  { id: 1, name: 'The Italian Corner', cuisine: 'Italian', maxGuests: 12 },
  { id: 2, name: 'Sakura Sushi', cuisine: 'Japanese', maxGuests: 8 },
  { id: 3, name: 'Le Petit Bistro', cuisine: 'French', maxGuests: 10 },
  { id: 4, name: 'Spice Route', cuisine: 'Indian', maxGuests: 15 },
  { id: 5, name: 'El Mariachi', cuisine: 'Mexican', maxGuests: 20 },
];

const MOCK_TIME_SLOTS = [
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
];

interface FormData {
  restaurantId: string;
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}
