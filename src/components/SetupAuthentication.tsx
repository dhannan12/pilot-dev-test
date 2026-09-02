/**
 * SetupAuthentication — User registration and authentication setup interface
 *
 * Features: user registration form, role selection, password validation, recently registered users list, account type management
 *
 * Ticket: SCRUM-1286 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface UserRole {
  id: string
  name: string
  description: string
  permissions: string[]
}

interface RegisteredUser {
  id: string
  fullName: string
  email: string
  role: string
  registeredAt: string
  status: 'active' | 'pending' | 'inactive'
}

const USER_ROLES: UserRole[] = [
  {
    id: 'tradesperson',
    name: 'Tradesperson',
    description: 'Service provider offering professional trades services',
    permissions: ['create_service', 'manage_bookings', 'view_earnings']
  },
  {
    id: 'client',
    name: 'Client',
    description: 'Customer seeking tradesperson services',
    permissions: ['book_service', 'leave_review', 'view_bookings']
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Platform administrator with full access',
    permissions: ['manage_users', 'view_analytics', 'manage_platform', 'moderate_content']
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Business manager overseeing multiple tradespersons',
    permissions: ['manage_team', 'view_reports', 'approve_bookings']
  },
  {
    id: 'support',
    name: 'Support Staff',
    description: 'Customer support team member',
    permissions: ['view_tickets', 'assist_users', 'access_help_docs']
  }
]

const MOCK_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: 'user-001',
    fullName: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'Tradesperson',
    registeredAt: '2026-09-01T14:30:00Z',
    status: 'active'
  },
  {
    id: 'user-002',
    fullName: 'Sarah Martinez',
    email: 'sarah.martinez@example.com',
    role: 'Client',
    registeredAt: '2026-09-01T11:15:00Z',
    status: 'active'
  },
  {
    id: 'user-003',
    fullName: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Manager',
    registeredAt: '2026-08-31T16:45:00Z',
    status: 'pending'
  },
  {
    id: 'user-004',
    fullName: 'Emily Thompson',
    email: 'emily.thompson@example.com',
    role: 'Tradesperson',
    registeredAt: '2026-08-31T09:20:00Z',
    status: 'active'
  },
  {
    id: 'user-005',
    fullName: 'David Rodriguez',
    email: 'david.rodriguez@example.com',
    role: 'Client',
    registeredAt: '2026-08-30T13:00:00Z',
    status: 'active'
  },
  {
    id: 'user-006',
    fullName: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'Support Staff',
    registeredAt: '2026-08-30T10:30:00Z',
    status: 'active'
  },
  {
    id: 'user-007',
    fullName: 'Robert Brown',
    email: 'robert.brown@example.com',
    role: 'Administrator',
    registeredAt: '2026-08-29T15:10:00Z',
    status: 'active'
  }
]

export default function SetupAuthentication() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Mock registration success
      alert(`Registration successful for ${formData.fullName} as ${formData.role}`)
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      })
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    })
    setErrors({})
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="setupauthentication" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication & User Registration Setup
          </h1>
          <p className="text-gray-600">
            Configure user registration and manage authentication for the tradesperson marketplace platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                User Registration Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    data-testid="setupauthentication-fullname"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-testid="setupauthentication-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="user@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      data-testid="setupauthentication-password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      data-testid="setupauthentication-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      data-testid="setupauthentication-confirmpassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      data-testid="setupauthentication-toggle-confirmpassword"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    User Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    data-testid="setupauthentication-role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                      errors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a role</option>
                    {USER_ROLES.map(role => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    data-testid="setupauthentication-submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
                  >
                    Register User
                  </button>
                  <button
                    type="button"
                    data-testid="setupauthentication-reset"
                    onClick={handleReset}
                    className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* User Roles Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available User Roles
              </h2>
              <div className="space-y-3" data-testid="setupauthentication-roles-list">
                {USER_ROLES.map(role => (
                  <div
                    key={role.id}
                    data-testid="setupauthentication-role-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{role.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {role.permissions.length} permissions
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map(permission => (
                        <span
                          key={permission}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recently Registered Users */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recently Registered
              </h2>
              <div className="space-y-3" data-testid="setupauthentication-list">
                {MOCK_REGISTERED_USERS.map(user => (
                  <div
                    key={user.id}
                    data-testid="setupauthentication-item"
                    className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-gray-900 text-sm">{user.fullName}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{user.email}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{user.role}</span>
                      <span className="text-gray-400">{formatDate(user.registeredAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
