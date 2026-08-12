import { useState } from 'react'

interface Service {
  id: number
  name: string
  duration: number
  price: number
  description: string
}

interface Stylist {
  id: number
  name: string
  specialty: string
  rating: number
  experience: string
}

interface TimeSlot {
  id: number
  time: string
  available: boolean
}

const SERVICES: Service[] = [
  { id: 1, name: 'Classic Haircut', duration: 45, price: 55, description: 'Professional cut with styling' },
  { id: 2, name: 'Premium Color', duration: 120, price: 145, description: 'Full color treatment with conditioning' },
  { id: 3, name: 'Styling & Blowout', duration: 40, price: 45, description: 'Professional styling and blowout' },
  { id: 4, name: 'Balayage Highlights', duration: 180, price: 195, description: 'Hand-painted highlights with toner' },
  { id: 5, name: 'Keratin Smoothing', duration: 150, price: 225, description: 'Deep smoothing treatment' },
  { id: 6, name: 'Hair Extensions', duration: 180, price: 350, description: 'Premium hair extension application' },
  { id: 7, name: 'Beard Trim & Shave', duration: 30, price: 35, description: 'Professional grooming service' }
]

const STYLISTS: Stylist[] = [
  { id: 1, name: 'Isabella Rodriguez', specialty: 'Color Specialist', rating: 4.9, experience: '10+ years' },
  { id: 2, name: 'Marcus Thompson', specialty: 'Master Stylist', rating: 4.8, experience: '8 years' },
  { id: 3, name: 'Sophia Chen', specialty: 'Texture Expert', rating: 5.0, experience: '12 years' },
  { id: 4, name: 'Oliver Bennett', specialty: 'Bridal & Events', rating: 4.7, experience: '7 years' },
  { id: 5, name: 'Ava Martinez', specialty: 'Men\'s Grooming', rating: 4.9, experience: '9 years' }
]

const TIME_SLOTS: TimeSlot[] = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '09:30 AM', available: false },
  { id: 3, time: '10:00 AM', available: true },
  { id: 4, time: '10:30 AM', available: true },
  { id: 5, time: '11:00 AM', available: false },
  { id: 6, time: '11:30 AM', available: true },
  { id: 7, time: '12:00 PM', available: true },
  { id: 8, time: '12:30 PM', available: true },
  { id: 9, time: '01:00 PM', available: false },
  { id: 10, time: '01:30 PM', available: true },
  { id: 11, time: '02:00 PM', available: true },
  { id: 12, time: '02:30 PM', available: false },
  { id: 13, time: '03:00 PM', available: true },
  { id: 14, time: '03:30 PM', available: true },
  { id: 15, time: '04:00 PM', available: true },
  { id: 16, time: '04:30 PM', available: false }
]

export default function BuildBookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const steps = [
    { number: 1, title: 'Service', completed: !!selectedService },
    { number: 2, title: 'Stylist', completed: !!selectedStylist },
    { number: 3, title: 'Date & Time', completed: !!selectedDate && !!selectedTime },
    { number: 4, title: 'Details', completed: !!clientName && !!clientEmail && !!clientPhone }
  ]

  const canProceedToStep = (step: number): boolean => {
    if (step === 1) return true
    if (step === 2) return !!selectedService
    if (step === 3) return !!selectedService && !!selectedStylist
    if (step === 4) return !!selectedService && !!selectedStylist && !!selectedDate && !!selectedTime
    return false
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedService && selectedStylist && selectedDate && selectedTime && clientName && clientEmail && clientPhone) {
      setIsSubmitted(true)
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setCurrentStep(1)
        setSelectedService(null)
        setSelectedStylist(null)
        setSelectedDate('')
        setSelectedTime(null)
        setClientName('')
        setClientEmail('')
        setClientPhone('')
        setSpecialRequests('')
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Book Your Appointment</h1>
          <p className="text-lg text-gray-600">Experience luxury hair care with our expert stylists</p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-green-900">Booking Confirmed!</h3>
                <p className="text-sm text-green-800 mt-1">
                  {clientName}, your {selectedService?.name} with {selectedStylist?.name} is scheduled for {selectedDate} at {selectedTime?.time}.
                </p>
                <p className="text-sm text-green-800 mt-2">
                  Total: <span className="font-bold">${selectedService?.price}</span> | Duration: {selectedService?.duration} min
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <button
                  onClick={() => canProceedToStep(step.number) && setCurrentStep(step.number)}
                  disabled={!canProceedToStep(step.number)}
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg transition-all ${
                    currentStep === step.number
                      ? 'bg-indigo-600 text-white shadow-lg scale-110'
                      : step.completed
                      ? 'bg-green-500 text-white'
                      : canProceedToStep(step.number)
                      ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {step.completed ? '✓' : step.number}
                </button>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${currentStep === step.number ? 'text-indigo-600' : 'text-gray-600'}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Service</h2>
                  <p className="text-gray-600">Select the service that best fits your needs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(service)
                        setCurrentStep(2)
                      }}
                      className={`p-5 border-2 rounded-xl text-left transition-all transform hover:scale-105 ${
                        selectedService?.id === service.id
                          ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                          : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">{service.name}</h3>
                        {selectedService?.id === service.id && (
                          <span className="text-indigo-600 text-xl">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-indigo-600">${service.price}</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {service.duration} min
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Stylist Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Stylist</h2>
                  <p className="text-gray-600">Choose from our team of experienced professionals</p>
                  {selectedService && (
                    <div className="mt-3 inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                      Service: {selectedService.name} - ${selectedService.price}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {STYLISTS.map((stylist) => (
                    <button
                      key={stylist.id}
                      type="button"
                      onClick={() => {
                        setSelectedStylist(stylist)
                        setCurrentStep(3)
                      }}
                      className={`p-5 border-2 rounded-xl text-left transition-all transform hover:scale-105 ${
                        selectedStylist?.id === stylist.id
                          ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                          : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{stylist.name}</h3>
                        {selectedStylist?.id === stylist.id && (
                          <span className="text-indigo-600 text-xl">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-indigo-600 font-medium mb-2">{stylist.specialty}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{stylist.experience}</span>
                        <span className="flex items-center text-yellow-500 font-semibold">
                          ⭐ {stylist.rating}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-start">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Date & Time Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick Date & Time</h2>
                  <p className="text-gray-600">Select your preferred appointment slot</p>
                  {selectedService && selectedStylist && (
                    <div className="mt-3 space-x-2">
                      <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                        {selectedService.name}
                      </span>
                      <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                        with {selectedStylist.name}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full md:w-auto px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none text-lg font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => slot.available && setSelectedTime(slot)}
                        disabled={!slot.available}
                        className={`p-3 border-2 rounded-lg font-semibold transition-all ${
                          selectedTime?.id === slot.id
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                            : slot.available
                            ? 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => selectedDate && selectedTime && setCurrentStep(4)}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedDate && selectedTime
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Client Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
                  <p className="text-gray-600">Please provide your contact details</p>
                </div>

                {/* Booking Summary */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-3">Appointment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold text-gray-900">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Stylist:</span>
                      <span className="font-semibold text-gray-900">{selectedStylist?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold text-gray-900">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold text-gray-900">{selectedTime?.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-gray-900">{selectedService?.duration} minutes</span>
                    </div>
                    <div className="border-t-2 border-indigo-300 pt-2 mt-2 flex justify-between">
                      <span className="text-gray-900 font-bold">Total:</span>
                      <span className="text-2xl font-bold text-indigo-600">${selectedService?.price}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="clientName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="clientName"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="clientEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="clientEmail"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="clientPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="clientPhone"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any special requests or notes..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
            <p className="text-sm text-gray-600">
              Please provide at least 24 hours notice for cancellations to avoid a cancellation fee.
              Rescheduling is always free with advance notice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
