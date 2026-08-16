/**
 * VolunteerSubmitsRegistration — Form for volunteers to register with required information
 *
 * Features: personal info fields, skills selection, availability input, emergency contact, form validation
 *
 * Ticket: SCRUM-927 | Branch: proto/SCRUM-926
 */

import { useState } from 'react'

interface VolunteerRegistration {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  dateOfBirth: string
  skills: string[]
  availability: string
  emergencyContact: string
  emergencyPhone: string
  agreedToTerms: boolean
  submittedAt: string
}

// Mock submitted registrations
const mockRegistrations: VolunteerRegistration[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    dateOfBirth: '1990-05-15',
    skills: ['Event Planning', 'Communications'],
    availability: 'Weekends',
    emergencyContact: 'John Johnson',
    emergencyPhone: '(555) 123-9999',
    agreedToTerms: true,
    submittedAt: '2026-08-10T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Ave',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    dateOfBirth: '1985-11-22',
    skills: ['Technical Support', 'Teaching'],
    availability: 'Evenings',
    emergencyContact: 'Lisa Chen',
    emergencyPhone: '(555) 234-8888',
    agreedToTerms: true,
    submittedAt: '2026-08-11T14:20:00Z'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 345-6789',
    address: '789 Pine Rd',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    dateOfBirth: '1992-03-08',
    skills: ['Fundraising', 'Social Media'],
    availability: 'Flexible',
    emergencyContact: 'Carlos Rodriguez',
    emergencyPhone: '(555) 345-7777',
    agreedToTerms: true,
    submittedAt: '2026-08-12T09:15:00Z'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    address: '321 Elm St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    dateOfBirth: '1988-07-30',
    skills: ['Mentoring', 'Event Planning'],
    availability: 'Weekdays',
    emergencyContact: 'Anna Thompson',
    emergencyPhone: '(555) 456-6666',
    agreedToTerms: true,
    submittedAt: '2026-08-13T16:45:00Z'
  },
  {
    id: '5',
    firstName: 'Jessica',
    lastName: 'Martinez',
    email: 'jessica.martinez@email.com',
    phone: '(555) 567-8901',
    address: '654 Maple Dr',
    city: 'Denver',
    state: 'CO',
    zipCode: '80201',
    dateOfBirth: '1995-09-18',
    skills: ['Communications', 'Teaching'],
    availability: 'Weekends',
    emergencyContact: 'Maria Martinez',
    emergencyPhone: '(555) 567-5555',
    agreedToTerms: true,
    submittedAt: '2026-08-14T11:00:00Z'
  }
]

const availableSkills = [
  'Event Planning',
  'Communications',
  'Technical Support',
  'Teaching',
  'Fundraising',
  'Social Media',
  'Mentoring',
  'Administration',
  'Community Outreach'
]

export default function VolunteerSubmitsRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    skills: [] as string[],
    availability: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreedToTerms: false
  })

  const [submittedRegistrations, setSubmittedRegistrations] = useState<VolunteerRegistration[]>(mockRegistrations)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill'
    if (!formData.availability.trim()) newErrors.availability = 'Availability is required'
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required'
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required'
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const newRegistration: VolunteerRegistration = {
      id: String(submittedRegistrations.length + 1),
      ...formData,
      submittedAt: new Date().toISOString()
    }

    setSubmittedRegistrations(prev => [newRegistration, ...prev])
    setShowSuccess(true)
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      dateOfBirth: '',
      skills: [],
      availability: '',
      emergencyContact: '',
      emergencyPhone: '',
      agreedToTerms: false
    })

    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div data-testid="volunteersubmitsregistration" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Registration</h1>
          <p className="text-gray-600 mb-6">Please complete all required fields to register as a volunteer</p>

          {showSuccess && (
            <div data-testid="volunteersubmitsregistration-success" className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✓ Registration submitted successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    data-testid="volunteersubmitsregistration-firstname"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    data-testid="volunteersubmitsregistration-lastname"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-testid="volunteersubmitsregistration-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    data-testid="volunteersubmitsregistration-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    data-testid="volunteersubmitsregistration-dateofbirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    data-testid="volunteersubmitsregistration-address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      data-testid="volunteersubmitsregistration-city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      data-testid="volunteersubmitsregistration-state"
                      value={formData.state}
                      onChange={handleInputChange}
                      maxLength={2}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      data-testid="volunteersubmitsregistration-zipcode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills & Interests *</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSkills.map((skill) => (
                  <label
                    key={skill}
                    data-testid="volunteersubmitsregistration-skill-option"
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.skills.includes(skill)
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="mr-2"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && <p className="mt-2 text-sm text-red-600">{errors.skills}</p>}
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  When are you available? *
                </label>
                <select
                  id="availability"
                  name="availability"
                  data-testid="volunteersubmitsregistration-availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.availability ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select availability</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Evenings">Evenings</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.availability && <p className="mt-1 text-sm text-red-600">{errors.availability}</p>}
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    data-testid="volunteersubmitsregistration-emergencycontact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.emergencyContact && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact}</p>}
                </div>

                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    data-testid="volunteersubmitsregistration-emergencyphone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.emergencyPhone && <p className="mt-1 text-sm text-red-600">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  data-testid="volunteersubmitsregistration-terms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-700">
                  I agree to the terms and conditions and understand that my information will be used to coordinate volunteer activities. *
                </span>
              </label>
              {errors.agreedToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreedToTerms}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                data-testid="volunteersubmitsregistration-submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-300"
              >
                Submit Registration
              </button>
              <button
                type="button"
                data-testid="volunteersubmitsregistration-reset"
                onClick={() => {
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    dateOfBirth: '',
                    skills: [],
                    availability: '',
                    emergencyContact: '',
                    emergencyPhone: '',
                    agreedToTerms: false
                  })
                  setErrors({})
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Submitted Registrations List */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Registrations</h2>
          <div data-testid="volunteersubmitsregistration-list" className="space-y-4">
            {submittedRegistrations.map((registration) => (
              <div
                key={registration.id}
                data-testid="volunteersubmitsregistration-item"
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {registration.firstName} {registration.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{registration.email}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(registration.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Phone:</span>{' '}
                    <span className="text-gray-900">{registration.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">City:</span>{' '}
                    <span className="text-gray-900">{registration.city}, {registration.state}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Availability:</span>{' '}
                    <span className="text-gray-900">{registration.availability}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Skills:</span>{' '}
                    <span className="text-gray-900">{registration.skills.join(', ')}</span>
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
