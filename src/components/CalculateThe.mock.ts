export interface Reservation {
  id: string;
  date: string;
  guestName: string;
  roomNumber: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export const mockReservations: Reservation[] = [
  {
    id: 'RES001',
    date: '2024-01-15',
    guestName: 'John Smith',
    roomNumber: 101,
    status: 'confirmed',
  },
  {
    id: 'RES002',
    date: '2024-01-15',
    guestName: 'Sarah Johnson',
    roomNumber: 102,
    status: 'confirmed',
  },
  {
    id: 'RES003',
    date: '2024-01-15',
    guestName: 'Michael Brown',
    roomNumber: 103,
    status: 'pending',
  },
  {
    id: 'RES004',
    date: '2024-01-15',
    guestName: 'Emily Davis',
    roomNumber: 104,
    status: 'confirmed',
  },
  {
    id: 'RES005',
    date: '2024-01-15',
    guestName: 'Robert Wilson',
    roomNumber: 105,
    status: 'cancelled',
  },
  {
    id: 'RES006',
    date: '2024-01-16',
    guestName: 'Jessica Martinez',
    roomNumber: 201,
    status: 'confirmed',
  },
  {
    id: 'RES007',
    date: '2024-01-16',
    guestName: 'David Anderson',
    roomNumber: 202,
    status: 'pending',
  },
  {
    id: 'RES008',
    date: '2024-01-16',
    guestName: 'Lisa Taylor',
    roomNumber: 203,
    status: 'confirmed',
  },
  {
    id: 'RES009',
    date: '2024-01-17',
    guestName: 'James Thomas',
    roomNumber: 301,
    status: 'confirmed',
  },
  {
    id: 'RES010',
    date: '2024-01-17',
    guestName: 'Patricia Jackson',
    roomNumber: 302,
    status: 'confirmed',
  },
  {
    id: 'RES011',
    date: '2024-01-17',
    guestName: 'Christopher White',
    roomNumber: 303,
    status: 'pending',
  },
  {
    id: 'RES012',
    date: '2024-01-17',
    guestName: 'Jennifer Harris',
    roomNumber: 304,
    status: 'confirmed',
  },
];