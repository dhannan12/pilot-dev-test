/**
 * SetupUser — User registration and authentication system for restaurant staff
 *
 * Features: registration form, login form, role selection, password validation, mock user management
 *
 * Ticket: SCRUM-1067 | Branch: proto/SCRUM-1056
 */

import { useState } from 'react'

interface User {
  id: number
  username: string
  email: string
  role: 'admin' | 'manager' | 'staff'
  createdAt: string
}

const MOCK_USERS: User[] = [
  { id: 1, username: 'admin', email: 'admin@restaurant.com', role: 'admin', createdAt: '2026-01-15' },
  { id: 2, username: 'john_manager', email: 'john@restaurant.com', role: 'manager', createdAt: '2026-02-20' },
  { id: 3, username: 'sarah_staff', email: 'sarah@restaurant.com', role: 'staff', createdAt: '2026-03-10' },
  { id: 4, username: 'mike_chef', email: 'mike@restaurant.com', role: 'staff', createdAt: '2026-04-05' },
  { id: 5, username: 'lisa_manager', email: 'lisa@restaurant.com', role: 'manager', createdAt: '2026-05-12' }
]

export default function SetupUser() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Register form state
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')
  const [regRole, setRegRole] = useState<'admin' | 'manager' | 'staff'>('staff')
  
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    
    if (!loginUsername || !loginPassword) {
      setError('Please enter both username and password')
      return
    }
    
    const user = users.find(u => u.username === loginUsername)
    if (!user) {
      setError('Invalid username or password')
      return
    }
    
    setCurrentUser(user)
    setMessage(`Welcome back, ${user.username}! Logged in as ${user.role}`)
    setLoginUsername('')
    setLoginPassword('')
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    
    // Validation
    if (!regUsername || !regEmail || !regPassword || !regConfirmPassword) {
      setError('All fields are required')
      return
    }
    
    if (regPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (users.some(u => u.username === regUsername)) {
      setError('Username already exists')
      return
    }
    
    if (users.some(u => u.email === regEmail)) {
      setError('Email already registered')
      return
    }
    
    const newUser: User = {
      id: users.length + 1,
      username: regUsername,
      email: regEmail,
      role: regRole,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    setUsers([...users, newUser])
    setMessage(`Account created successfully! Welcome, ${regUsername}`)
    setRegUsername('')
    setRegEmail('')
    setRegPassword('')
    setRegConfirmPassword('')
    setRegRole('staff')
    setMode('login')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setMessage('Logged out successfully')
    setError('')
  }

  if (currentUser) {
    return (
      <div data-testid="setupuser" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">User Dashboard</h1>
                <p className="text-gray-600">Manage your account and view user information</p>
              </div>
              <button
                data-testid="setupuser-logout"
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

            {message && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                {message}
              </div>
            )}

            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Current User</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="font-semibold text-gray-800">{currentUser.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-semibold text-gray-800 capitalize">{currentUser.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-800">{currentUser.createdAt}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">All Users</h2>
              <div data-testid="setupuser-list" className="space-y-3">
                {users.map(user => (
                  <div
                    key={user.id}
                    data-testid="setupuser-item"
                    className={`p-4 rounded-lg border-2 ${
                      user.id === currentUser.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{user.username}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-700'
                              : user.role === 'manager'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {user.role}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Since {user.createdAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="setupuser" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Restaurant Auth System
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Secure user registration and authentication
          </p>

          {message && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex border-b border-gray-200 mb-6">
            <button
              data-testid="setupuser-tab-login"
              onClick={() => {
                setMode('login')
                setError('')
                setMessage('')
              }}
              className={`flex-1 py-3 font-medium transition ${
                mode === 'login'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              data-testid="setupuser-tab-register"
              onClick={() => {
                setMode('register')
                setError('')
                setMessage('')
              }}
              className={`flex-1 py-3 font-medium transition ${
                mode === 'register'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  data-testid="setupuser-login-username"
                  type="text"
                  value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  data-testid="setupuser-login-password"
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              <button
                data-testid="setupuser-login-submit"
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  data-testid="setupuser-register-username"
                  type="text"
                  value={regUsername}
                  onChange={e => setRegUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Choose a username"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  data-testid="setupuser-register-email"
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your.email@restaurant.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  data-testid="setupuser-register-role"
                  value={regRole}
                  onChange={e => setRegRole(e.target.value as 'admin' | 'manager' | 'staff')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  data-testid="setupuser-register-password"
                  type="password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Min. 8 characters"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  data-testid="setupuser-register-confirm-password"
                  type="password"
                  value={regConfirmPassword}
                  onChange={e => setRegConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Re-enter password"
                />
              </div>

              <button
                data-testid="setupuser-register-submit"
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Create Account
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              {users.length} registered users • Try username: <span className="font-mono font-semibold">admin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
