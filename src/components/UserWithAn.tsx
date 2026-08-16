/**
 * UserWithAn — Expired membership check-in attempt handler
 *
 * Features: expired status display, membership renewal prompt, check-in denial, payment options, membership history
 *
 * Ticket: SCRUM-959 | Branch: proto/SCRUM-951
 */

import React, { useState } from 'react'

interface MembershipRecord {
  id: string
  memberName: string
  memberId: string
  membershipType: string
  expiryDate: string
  daysExpired: number
  lastCheckIn: string
  joinDate: string
}

interface RenewalOption {
  id: string
  name: string
  duration: string
  price: number
  discount?: number
}

const EXPIRED_MEMBERS: MembershipRecord[] = [
  {
    id: '1',
    memberName: 'Sarah Johnson',
    memberId: 'MEM-10234',
    membershipType: 'Premium Membership',
    expiryDate: '2026-07-15',
    daysExpired: 32,
    lastCheckIn: '2026-07-14',
    joinDate: '2025-01-10'
  },
  {
    id: '2',
    memberName: 'Michael Chen',
    memberId: 'MEM-10567',
    membershipType: 'Basic Membership',
    expiryDate: '2026-08-01',
    daysExpired: 15,
    lastCheckIn: '2026-07-30',
    joinDate: '2024-08-01'
  },
  {
    id: '3',
    memberName: 'Emily Rodriguez',
    memberId: 'MEM-10891',
    membershipType: 'Elite Membership',
    expiryDate: '2026-06-30',
    daysExpired: 47,
    lastCheckIn: '2026-06-29',
    joinDate: '2023-06-30'
  },
  {
    id: '4',
    memberName: 'David Thompson',
    memberId: 'MEM-11023',
    membershipType: 'Student Membership',
    expiryDate: '2026-07-20',
    daysExpired: 27,
    lastCheckIn: '2026-07-19',
    joinDate: '2025-09-01'
  },
  {
    id: '5',
    memberName: 'Jessica Williams',
    memberId: 'MEM-11245',
    membershipType: 'Premium Membership',
    expiryDate: '2026-08-10',
    daysExpired: 6,
    lastCheckIn: '2026-08-09',
    joinDate: '2024-02-10'
  }
]

const RENEWAL_OPTIONS: RenewalOption[] = [
  {
    id: 'monthly-basic',
    name: 'Basic Monthly',
    duration: '1 Month',
    price: 29.99
  },
  {
    id: 'monthly-premium',
    name: 'Premium Monthly',
    duration: '1 Month',
    price: 49.99
  },
  {
    id: 'quarterly-premium',
    name: 'Premium Quarterly',
    duration: '3 Months',
    price: 134.99,
    discount: 10
  },
  {
    id: 'annual-premium',
    name: 'Premium Annual',
    duration: '12 Months',
    price: 499.99,
    discount: 17
  },
  {
    id: 'elite-monthly',
    name: 'Elite Monthly',
    duration: '1 Month',
    price: 79.99
  }
]

export default function UserWithAn() {
  const [selectedMember, setSelectedMember] = useState<MembershipRecord>(EXPIRED_MEMBERS[0])
  const [showRenewalOptions, setShowRenewalOptions] = useState(false)
  const [selectedRenewal, setSelectedRenewal] = useState<string | null>(null)
  const [checkInAttempted, setCheckInAttempted] = useState(false)

  const handleCheckInAttempt = () => {
    setCheckInAttempted(true)
  }

  const handleRenewNow = () => {
    setShowRenewalOptions(true)
  }

  const handleSelectRenewal = (renewalId: string) => {
    setSelectedRenewal(renewalId)
  }

  const handleProcessRenewal = () => {
    if (selectedRenewal) {
      alert(`Renewal processed successfully! Membership renewed with ${selectedRenewal}`)
      setShowRenewalOptions(false)
      setCheckInAttempted(false)
      setSelectedRenewal(null)
    }
  }

  const handleContactSupport = () => {
    alert('Connecting you with member support...')
  }

  const handleChangeMember = (memberId: string) => {
    const member = EXPIRED_MEMBERS.find(m => m.id === memberId)
    if (member) {
      setSelectedMember(member)
      setCheckInAttempted(false)
      setShowRenewalOptions(false)
      setSelectedRenewal(null)
    }
  }

  const selectedRenewalOption = RENEWAL_OPTIONS.find(r => r.id === selectedRenewal)

  return (
    <div data-testid="userwithan" className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gym Check-In System
          </h1>
          <p className="text-gray-600">Member verification and check-in portal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Select Member
              </h2>
              <div data-testid="userwithan-list" className="space-y-3">
                {EXPIRED_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    data-testid="userwithan-item"
                    onClick={() => handleChangeMember(member.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedMember.id === member.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{member.memberName}</div>
                    <div className="text-sm text-gray-600">{member.memberId}</div>
                    <div className="text-xs text-red-600 mt-1 font-medium">
                      Expired {member.daysExpired} days ago
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Check-In Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Member Information */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedMember.memberName}
                    </h2>
                    <p className="text-gray-600">{selectedMember.memberId}</p>
                  </div>
                  <div className="bg-red-100 border-2 border-red-500 rounded-lg px-4 py-2">
                    <div className="text-xs font-semibold text-red-800 uppercase">Status</div>
                    <div className="text-lg font-bold text-red-600">EXPIRED</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600">Membership Type</div>
                    <div className="font-semibold text-gray-900">{selectedMember.membershipType}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Expiry Date</div>
                    <div className="font-semibold text-red-600">{selectedMember.expiryDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Days Expired</div>
                    <div className="font-semibold text-red-600">{selectedMember.daysExpired} days</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Last Check-In</div>
                    <div className="font-semibold text-gray-900">{selectedMember.lastCheckIn}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Member Since</div>
                    <div className="font-semibold text-gray-900">{selectedMember.joinDate}</div>
                  </div>
                </div>
              </div>

              {/* Check-In Attempt */}
              {!checkInAttempted && !showRenewalOptions && (
                <div className="mb-6">
                  <button
                    data-testid="userwithan-checkin"
                    onClick={handleCheckInAttempt}
                    className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                  >
                    Attempt Check-In
                  </button>
                </div>
              )}

              {/* Check-In Denial Message */}
              {checkInAttempted && !showRenewalOptions && (
                <div className="mb-6">
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-6">
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h3 className="text-xl font-bold text-red-800 mb-2">
                          Check-In Denied
                        </h3>
                        <p className="text-red-700 mb-3">
                          We're sorry, but we cannot complete your check-in because your membership expired on <strong>{selectedMember.expiryDate}</strong> ({selectedMember.daysExpired} days ago).
                        </p>
                        <p className="text-red-700">
                          Please renew your membership to regain access to the gym facilities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      data-testid="userwithan-renew"
                      onClick={handleRenewNow}
                      className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                    >
                      Renew Membership Now
                    </button>
                    <button
                      data-testid="userwithan-support"
                      onClick={handleContactSupport}
                      className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Contact Member Support
                    </button>
                  </div>
                </div>
              )}

              {/* Renewal Options */}
              {showRenewalOptions && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Select Renewal Plan
                    </h3>
                    <p className="text-gray-600">
                      Choose a membership plan to renew your access
                    </p>
                  </div>

                  <div data-testid="userwithan-renewal-list" className="space-y-3 mb-6">
                    {RENEWAL_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        data-testid="userwithan-renewal-item"
                        onClick={() => handleSelectRenewal(option.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          selectedRenewal === option.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">
                              {option.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              Duration: {option.duration}
                            </div>
                            {option.discount && (
                              <div className="text-xs text-green-600 font-medium mt-1">
                                Save {option.discount}%
                              </div>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-gray-900">
                              ${option.price}
                            </div>
                          </div>
                          <input
                            type="radio"
                            data-testid={`userwithan-renewal-radio-${option.id}`}
                            checked={selectedRenewal === option.id}
                            onChange={() => {}}
                            className="w-5 h-5 ml-4 text-green-600"
                          />
                        </div>
                      </button>
                    ))}
                  </div>

                  {selectedRenewalOption && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">Selected Plan</div>
                          <div className="font-bold text-gray-900">{selectedRenewalOption.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Total</div>
                          <div className="text-2xl font-bold text-green-600">
                            ${selectedRenewalOption.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      data-testid="userwithan-cancel"
                      onClick={() => {
                        setShowRenewalOptions(false)
                        setSelectedRenewal(null)
                      }}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      data-testid="userwithan-submit"
                      onClick={handleProcessRenewal}
                      disabled={!selectedRenewal}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        selectedRenewal
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Process Renewal
                    </button>
                  </div>
                </div>
              )}

              {/* Help Text */}
              {!checkInAttempted && !showRenewalOptions && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-yellow-800">
                      <strong>Note:</strong> This membership has expired and check-in will be denied. The member will need to renew their membership before accessing gym facilities.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
