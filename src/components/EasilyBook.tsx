import { useState } from 'react'

interface Service {
  id: number
  name: string
  duration: number
  price: number
}

interface Stylist {
  id: number
  name: string
  specialty: string
}

interface TimeSlot {
  id: number
  time: string
  available: boolean
}

interface Appointment {
  id: number
  date: string
  time: string
  service: string
  stylist: string
  clientName: string
}

const SERVICES: Service[] = [
  { id: 1, name: 'Haircut', duration: 45, price: 50 },
  { id: 2, name: 'Hair Coloring', duration: 120, price: 120 },
  { id: 3, name: 'Blowout', duration: 30, price: 40 },
  { id: 4, name: 'Highlights', duration: 150, price: 150 },
  { id: 5, name: 'Keratin Treatment', duration: 180, price: 200 }
]

const STYLISTS: Stylist[] = [
  { id: 1, name: 'Sarah Johnson', specialty: 'Color Specialist' },
  { id: 2, name: 'Michael Chen', specialty: 'Creative Cuts' },
  { id: 3, name: 'Emma Williams', specialty: 'Texture Expert' },
  { id: 4, name: 'David Martinez', specialty: 'Bridal Styling' },
  { id: 5, name: 'Lisa Anderson', specialty: 'Men\'s Grooming' }
]

const TIME_SLOTS: TimeSlot[] = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: true },
  { id: 3, time: '11:00 AM', available: false },
  { id: 4, time: '12:00 PM', available: true },
  { id: 5, time: '01:00 PM', available: true },
  { id: 6, time: '02:00 PM', available: false },
  { id: 7, time: '03:00 PM', available: true },
  { id: 8, time: '04:00 PM', available: true }
]

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 1, date: '2026-08-15', time: '10:00 AM', service: 'Haircut', stylist: 'Sarah Johnson', clientName: 'John Doe' },
  { id: 2, date: '2026-08-16', time: '02:00 PM', service: 'Hair Coloring', stylist: 'Emma Williams', clientName: 'Jane Smith' },
  { id: 3, date: '2026-08-17', time: '11:00 AM', service: 'Blowout', stylist: 'Michael Chen', clientName: 'Alice Brown' },
  { id: 4, date: '2026-08-18', time: '09:00 AM', service: 'Highlights', stylist: 'David Martinez', clientName: 'Bob Wilson' },
  { id: 5, date: '2026-08-19', time: '03:00 PM', service: 'Keratin Treatment', stylist: 'Lisa Anderson', clientName: 'Carol Davis' }
]

export default function EasilyBook() {
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Calculate total cost of selected services
  const totalCost = selectedServices.reduce((sum, service) => sum + service.price, 0)
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0)

  const toggleService = (service: Service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id)
      if (isSelected) {
        return prev.filter((s) => s.id !== service.id)
      } else {
        return [...prev, service]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedServices.length === 0 || !selectedStylist || !selectedDate || !selectedTime || !clientName || !clientEmail || !clientPhone) {
      alert('Please fill in all fields and select at least one service')
      return
    }

    const serviceNames = selectedServices.map((s) => s.name).join(', ')
    setConfirmationMessage(
      `Appointment booked successfully! ${clientName}, your services (${serviceNames}) with ${selectedStylist.name} are scheduled for ${selectedDate} at ${selectedTime.time}. Total cost: $${totalCost}`
    )
    setShowConfirmation(true)

    // Reset form
    setTimeout(() => {
      setSelectedServices([])
      setSelectedStylist(null)
      setSelectedDate('')
      setSelectedTime(null)
      setClientName('')
      setClientEmail('')
      setClientPhone('')
      setShowConfirmation(false)
      setConfirmationMessage('')
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Easy Online Booking</h1>
          <p className="text-lg text-gray-600">Book your appointment in minutes</p>
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Cancellation Policy:</span> Please notify us 24 hours in advance to avoid cancellation fees.
            </p>
          </div>
        </div>

        {showConfirmation && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">{confirmationMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Selection */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Select Services</h2>
              <p className="text-sm text-gray-600 mb-3">Select one or more services</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((service) => {
                  const isSelected = selectedServices.some((s) => s.id === service.id)
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.duration} minutes</p>
                          <p className="text-lg font-bold text-purple-600 mt-2">${service.price}</p>
                        </div>
                        {isSelected && (
                          <svg className="h-6 w-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              {selectedServices.length > 0 && (
                <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Selected: {selectedServices.length} service(s)</p>
                      <p className="text-xs text-gray-600">Total Duration: {totalDuration} minutes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Cost:</p>
                      <p className="text-2xl font-bold text-purple-600">${totalCost}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stylist Selection */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Choose Stylist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STYLISTS.map((stylist) => (
                  <button
                    key={stylist.id}
                    type="button"
                    onClick={() => setSelectedStylist(stylist)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedStylist?.id === stylist.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{stylist.name}</h3>
                    <p className="text-sm text-gray-600">{stylist.specialty}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Select Date</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            {/* Time Selection */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Choose Time</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => slot.available && setSelectedTime(slot)}
                    disabled={!slot.available}
                    className={`p-3 border-2 rounded-lg font-medium transition-all ${
                      selectedTime?.id === slot.id
                        ? 'border-purple-500 bg-purple-500 text-white'
                        : slot.available
                        ? 'border-gray-200 hover:border-purple-300'
                        : 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                    {!slot.available && <span className="block text-xs">Booked</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>

        {/* Recent Appointments */}
        <div className="mt-10 bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Appointments</h2>
          <div className="space-y-4">
            {MOCK_APPOINTMENTS.map((appointment) => (
              <div
                key={appointment.id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-all"
              >
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{appointment.clientName}</h3>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                    <p className="text-sm text-gray-500">with {appointment.stylist}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-purple-600">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
