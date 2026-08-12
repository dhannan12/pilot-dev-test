import React from 'react';

interface Service {
  id: number;
  name: string;
  duration: string;
  price: number;
}

interface Review {
  id: number;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface WorkingHour {
  day: string;
  hours: string;
}

interface StylistData {
  id: number;
  name: string;
  title: string;
  bio: string;
  experience: string;
  imageUrl: string;
  rating: number;
  totalReviews: number;
  specialties: string[];
  services: Service[];
  reviews: Review[];
  workingHours: WorkingHour[];
}

const MOCK_STYLIST: StylistData = {
  id: 1,
  name: 'Sarah Johnson',
  title: 'Master Hair Stylist',
  bio: 'Passionate about creating stunning hairstyles that bring out the best in every client. With over 10 years of experience in cutting, coloring, and styling, I specialize in modern trends and classic elegance.',
  experience: '10+ years',
  imageUrl: 'https://via.placeholder.com/300x300/6366f1/ffffff?text=SJ',
  rating: 4.9,
  totalReviews: 127,
  specialties: ['Hair Coloring', 'Balayage', 'Haircuts', 'Styling', 'Hair Extensions'],
  services: [
    { id: 1, name: 'Haircut & Style', duration: '60 min', price: 65 },
    { id: 2, name: 'Full Color', duration: '120 min', price: 150 },
    { id: 3, name: 'Balayage', duration: '180 min', price: 220 },
    { id: 4, name: 'Blowout', duration: '45 min', price: 45 },
    { id: 5, name: 'Hair Extensions', duration: '240 min', price: 350 },
  ],
  reviews: [
    {
      id: 1,
      customerName: 'Emily Chen',
      rating: 5,
      comment: 'Sarah is amazing! She listened to exactly what I wanted and delivered a perfect balayage. The color is stunning and so natural-looking.',
      date: '2026-08-05',
    },
    {
      id: 2,
      customerName: 'Michelle Rodriguez',
      rating: 5,
      comment: 'Best haircut I\'ve ever had! Sarah really knows how to work with curly hair. Highly recommend!',
      date: '2026-07-28',
    },
    {
      id: 3,
      customerName: 'Jessica Williams',
      rating: 5,
      comment: 'Very professional and talented. My hair has never looked better. Will definitely be back!',
      date: '2026-07-15',
    },
    {
      id: 4,
      customerName: 'Amanda Thompson',
      rating: 4,
      comment: 'Great experience overall. Sarah was friendly and did a wonderful job on my hair color.',
      date: '2026-07-02',
    },
    {
      id: 5,
      customerName: 'Lauren Davis',
      rating: 5,
      comment: 'Sarah transformed my hair! The extensions look so natural. I couldn\'t be happier with the results.',
      date: '2026-06-20',
    },
  ],
  workingHours: [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
};

export default function BuildStylistProfile() {
  const stylist = MOCK_STYLIST;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= Math.floor(rating)
                ? 'text-yellow-400'
                : star - 0.5 <= rating
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={stylist.imageUrl}
                alt={stylist.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {stylist.name}
              </h1>
              <p className="text-xl text-indigo-600 mb-4">{stylist.title}</p>
              <div className="flex items-center gap-4 mb-4">
                {renderStars(stylist.rating)}
                <span className="text-lg font-semibold text-gray-700">
                  {stylist.rating}
                </span>
                <span className="text-gray-600">
                  ({stylist.totalReviews} reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{stylist.bio}</p>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-semibold">Experience:</span>
                <span>{stylist.experience}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialties</h2>
          <div className="flex flex-wrap gap-3">
            {stylist.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
          <div className="space-y-4">
            {stylist.services.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-400 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-gray-600">{service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-600">
                    ${service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Working Hours Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Working Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stylist.workingHours.map((schedule, index) => (
              <div
                key={index}
                className="flex justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-semibold text-gray-700">{schedule.day}</span>
                <span className={schedule.hours === 'Closed' ? 'text-red-500' : 'text-gray-600'}>
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Reviews</h2>
          <div className="space-y-6">
            {stylist.reviews.map((review) => (
              <div
                key={review.id}
                className="pb-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.customerName}
                    </h3>
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-6 text-center">
          <button className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg">
            Book Appointment with {stylist.name}
          </button>
        </div>
      </div>
    </div>
  );
}
