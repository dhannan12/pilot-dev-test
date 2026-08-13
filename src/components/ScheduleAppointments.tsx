/**
 * ScheduleAppointments — Schedule dental appointments with treatment cost calculation
 *
 * Features: appointment scheduling, treatment plan selection, insurance coverage calculation, cost breakdown, date/time picker
 *
 * Ticket: SCRUM-751 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface Treatment {
  id: string
  name: string
  description: string
  baseCost: number
  duration: number // in minutes
  category: string
}

interface InsurancePlan {
  id: string
  name: string
  provider: string
  coveragePercent: number
  annualMax: number
  remaining: number
}

interface TimeSlot {
  id: string
  date: string
  time: string
  dentist: string
  available: boolean
}

interface AppointmentData {
  selectedTreatment: Treatment | null
  selectedInsurance: InsurancePlan | null
  selectedTimeSlot: TimeSlot | null
}

const MOCK_TREATMENTS: Treatment[] = [
  {
    id: 't1',
    name: 'Routine Cleaning',
    description: 'Standard dental cleaning and examination',
    baseCost: 150,
    duration: 60,
    category: 'Preventive'
  },
  {
    id: 't2',
    name: 'Teeth Whitening',
    description: 'Professional teeth whitening treatment',
    baseCost: 500,
    duration: 90,
    category: 'Cosmetic'
  },
  {
    id: 't3',
    name: 'Cavity Filling',
    description: 'Composite filling for tooth decay',
    baseCost: 250,
    duration: 45,
    category: 'Restorative'
  },
  {
    id: 't4',
    name: 'Root Canal',
    description: 'Root canal therapy for infected tooth',
    baseCost: 1200,
    duration: 120,
    category: 'Endodontic'
  },
  {
    id: 't5',
    name: 'Crown Placement',
    description: 'Dental crown installation',
    baseCost: 1500,
    duration: 90,
    category: 'Restorative'
  },
  {
    id: 't6',
    name: 'Dental Implant',
    description: 'Single tooth implant procedure',
    baseCost: 3000,
    duration: 180,
    category: 'Surgical'
  },
  {
    id: 't7',
    name: 'Orthodontic Consultation',
    description: 'Initial consultation for braces or aligners',
    baseCost: 100,
    duration: 45,
    category: 'Orthodontic'
  }
]

const MOCK_INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'ins1',
    name: 'Premium Dental Plan',
    provider: 'DentalCare Plus',
    coveragePercent: 80,
    annualMax: 2000,
    remaining: 2000
  },
  {
    id: 'ins2',
    name: 'Basic Coverage',
    provider: 'HealthGuard',
    coveragePercent: 50,
    annualMax: 1000,
    remaining: 750
  },
  {
    id: 'ins3',
    name: 'Family Plan',
    provider: 'SmileCare Insurance',
    coveragePercent: 70,
    annualMax: 1500,
    remaining: 1200
  },
  {
    id: 'ins4',
    name: 'Student Plan',
    provider: 'Campus Health',
    coveragePercent: 60,
    annualMax: 800,
    remaining: 800
  },
  {
    id: 'ins5',
    name: 'Senior Care',
    provider: 'Medicare Dental',
    coveragePercent: 75,
    annualMax: 2500,
    remaining: 1800
  }
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 'ts1', date: '2026-08-15', time: '09:00 AM', dentist: 'Dr. Sarah Johnson', available: true },
  { id: 'ts2', date: '2026-08-15', time: '10:30 AM', dentist: 'Dr. Michael Chen', available: true },
  { id: 'ts3', date: '2026-08-15', time: '02:00 PM', dentist: 'Dr. Sarah Johnson', available: false },
  { id: 'ts4', date: '2026-08-16', time: '09:00 AM', dentist: 'Dr. Emily Rodriguez', available: true },
  { id: 'ts5', date: '2026-08-16', time: '11:00 AM', dentist: 'Dr. Michael Chen', available: true },
  { id: 'ts6', date: '2026-08-16', time: '03:30 PM', dentist: 'Dr. Sarah Johnson', available: true },
  { id: 'ts7', date: '2026-08-17', time: '08:00 AM', dentist: 'Dr. Emily Rodriguez', available: true },
  { id: 'ts8', date: '2026-08-17', time: '01:00 PM', dentist: 'Dr. Michael Chen', available: true },
  { id: 'ts9', date: '2026-08-18', time: '10:00 AM', dentist: 'Dr. Sarah Johnson', available: true },
  { id: 'ts10', date: '2026-08-18', time: '04:00 PM', dentist: 'Dr. Emily Rodriguez', available: false }
]

export default function ScheduleAppointments() {
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    selectedTreatment: null,
    selectedInsurance: null,
    selectedTimeSlot: null
  })

  const [step, setStep] = useState<number>(1)
  const [useInsurance, setUseInsurance] = useState<boolean>(true)

  const calculateCosts = () => {
    if (!appointmentData.selectedTreatment) {
      return { baseCost: 0, insuranceCoverage: 0, patientPays: 0, savedAmount: 0 }
    }

    const baseCost = appointmentData.selectedTreatment.baseCost
    let insuranceCoverage = 0
    let patientPays = baseCost

    if (useInsurance && appointmentData.selectedInsurance) {
      const insurance = appointmentData.selectedInsurance
      const potentialCoverage = baseCost * (insurance.coveragePercent / 100)
      insuranceCoverage = Math.min(potentialCoverage, insurance.remaining)
      patientPays = baseCost - insuranceCoverage
    }

    return {
      baseCost,
      insuranceCoverage,
      patientPays,
      savedAmount: insuranceCoverage
    }
  }

  const costs = calculateCosts()

  const handleTreatmentSelect = (treatment: Treatment) => {
    setAppointmentData({ ...appointmentData, selectedTreatment: treatment })
  }

  const handleInsuranceSelect = (insurance: InsurancePlan) => {
    setAppointmentData({ ...appointmentData, selectedInsurance: insurance })
  }

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setAppointmentData({ ...appointmentData, selectedTimeSlot: slot })
    }
  }

  const canProceedToStep2 = appointmentData.selectedTreatment !== null
  const canProceedToStep3 = canProceedToStep2 && (!useInsurance || appointmentData.selectedInsurance !== null)
  const canConfirm = canProceedToStep3 && appointmentData.selectedTimeSlot !== null

  const handleConfirmAppointment = () => {
    if (canConfirm) {
      alert('Appointment confirmed! You will receive a confirmation email shortly.')
      // Reset form
      setAppointmentData({
        selectedTreatment: null,
        selectedInsurance: null,
        selectedTimeSlot: null
      })
      setStep(1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Schedule Your Appointment</h1>
          <p className="text-gray-600">Book your dental appointment and calculate treatment costs</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                1
              </div>
              <span className="text-sm mt-2 font-medium">Select Treatment</span>
            </div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <span className="text-sm mt-2 font-medium">Insurance & Cost</span>
            </div>
            <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                3
              </div>
              <span className="text-sm mt-2 font-medium">Pick Date & Time</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Treatment Selection */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Treatment</h2>
                <div className="space-y-3">
                  {MOCK_TREATMENTS.map((treatment) => (
                    <div
                      key={treatment.id}
                      onClick={() => handleTreatmentSelect(treatment)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        appointmentData.selectedTreatment?.id === treatment.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800">{treatment.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{treatment.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{treatment.category}</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{treatment.duration} min</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600">${treatment.baseCost}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => canProceedToStep2 && setStep(2)}
                    disabled={!canProceedToStep2}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      canProceedToStep2
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Insurance
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Insurance Selection */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Insurance Coverage</h2>
                
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useInsurance}
                      onChange={(e) => {
                        setUseInsurance(e.target.checked)
                        if (!e.target.checked) {
                          setAppointmentData({ ...appointmentData, selectedInsurance: null })
                        }
                      }}
                      className="w-5 h-5"
                    />
                    <span className="font-medium text-gray-700">I have dental insurance</span>
                  </label>
                </div>

                {useInsurance && (
                  <div className="space-y-3">
                    {MOCK_INSURANCE_PLANS.map((insurance) => (
                      <div
                        key={insurance.id}
                        onClick={() => handleInsuranceSelect(insurance)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          appointmentData.selectedInsurance?.id === insurance.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800">{insurance.name}</h3>
                            <p className="text-gray-600 text-sm">{insurance.provider}</p>
                            <div className="flex gap-4 mt-2">
                              <span className="text-sm text-gray-700">
                                Coverage: <span className="font-semibold">{insurance.coveragePercent}%</span>
                              </span>
                              <span className="text-sm text-gray-700">
                                Remaining: <span className="font-semibold">${insurance.remaining}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => canProceedToStep3 && setStep(3)}
                    disabled={!canProceedToStep3}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      canProceedToStep3
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Schedule
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Time Slot Selection */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Date & Time</h2>
                <div className="space-y-3">
                  {MOCK_TIME_SLOTS.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => handleTimeSlotSelect(slot)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        !slot.available
                          ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                          : appointmentData.selectedTimeSlot?.id === slot.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-800">{slot.date}</p>
                          <p className="text-gray-600 text-sm">{slot.dentist}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-blue-600">{slot.time}</p>
                          {!slot.available && <span className="text-xs text-red-600">Unavailable</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmAppointment}
                    disabled={!canConfirm}
                    className={`px-6 py-3 rounded-lg font-semibold ${
                      canConfirm
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cost Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cost Summary</h3>
              
              {appointmentData.selectedTreatment ? (
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600">Treatment</p>
                    <p className="font-semibold text-gray-800">{appointmentData.selectedTreatment.name}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Cost:</span>
                      <span className="font-semibold">${costs.baseCost.toFixed(2)}</span>
                    </div>
                    
                    {useInsurance && appointmentData.selectedInsurance && (
                      <>
                        <div className="flex justify-between text-green-600">
                          <span>Insurance Coverage ({appointmentData.selectedInsurance.coveragePercent}%):</span>
                          <span className="font-semibold">-${costs.insuranceCoverage.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    <div className="pt-4 border-t-2 border-gray-300">
                      <div className="flex justify-between text-lg">
                        <span className="font-bold text-gray-800">You Pay:</span>
                        <span className="font-bold text-blue-600">${costs.patientPays.toFixed(2)}</span>
                      </div>
                    </div>

                    {costs.savedAmount > 0 && (
                      <div className="bg-green-50 p-3 rounded-lg mt-4">
                        <p className="text-sm text-green-800">
                          You save <span className="font-bold">${costs.savedAmount.toFixed(2)}</span> with insurance!
                        </p>
                      </div>
                    )}
                  </div>

                  {appointmentData.selectedTimeSlot && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Appointment Details</p>
                      <div className="bg-blue-50 p-3 rounded-lg space-y-1">
                        <p className="text-sm font-semibold text-gray-800">{appointmentData.selectedTimeSlot.date}</p>
                        <p className="text-sm text-gray-700">{appointmentData.selectedTimeSlot.time}</p>
                        <p className="text-sm text-gray-700">{appointmentData.selectedTimeSlot.dentist}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Select a treatment to see cost details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
