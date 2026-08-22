/**
 * UserLogsHealth — Daily health metrics logging interface for users
 *
 * Features: health metric input, weight/blood pressure/heart rate tracking, mood logging, date selection, metric history view
 *
 * Ticket: SCRUM-1116 | Branch: proto/SCRUM-1115
 */

import { useState } from 'react'

interface HealthMetric {
  id: string
  date: string
  weight: number
  bloodPressureSystolic: number
  bloodPressureDiastolic: number
  heartRate: number
  mood: string
  notes: string
}

const MOCK_HEALTH_LOGS: HealthMetric[] = [
  {
    id: '1',
    date: '2026-08-22',
    weight: 165,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    heartRate: 72,
    mood: 'Great',
    notes: 'Feeling energetic after morning workout'
  },
  {
    id: '2',
    date: '2026-08-21',
    weight: 166,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 78,
    heartRate: 70,
    mood: 'Good',
    notes: 'Good sleep, balanced meals'
  },
  {
    id: '3',
    date: '2026-08-20',
    weight: 167,
    bloodPressureSystolic: 122,
    bloodPressureDiastolic: 82,
    heartRate: 75,
    mood: 'Okay',
    notes: 'Stressed at work, need better sleep'
  },
  {
    id: '4',
    date: '2026-08-19',
    weight: 166,
    bloodPressureSystolic: 119,
    bloodPressureDiastolic: 79,
    heartRate: 71,
    mood: 'Good',
    notes: 'Yoga session helped with relaxation'
  },
  {
    id: '5',
    date: '2026-08-18',
    weight: 165,
    bloodPressureSystolic: 121,
    bloodPressureDiastolic: 81,
    heartRate: 73,
    mood: 'Great',
    notes: 'Hit all fitness goals this week'
  },
  {
    id: '6',
    date: '2026-08-17',
    weight: 168,
    bloodPressureSystolic: 123,
    bloodPressureDiastolic: 83,
    heartRate: 76,
    mood: 'Fair',
    notes: 'Weekend indulgence, back to routine tomorrow'
  }
]

export default function UserLogsHealth() {
  const [logs, setLogs] = useState<HealthMetric[]>(MOCK_HEALTH_LOGS)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    mood: 'Good',
    notes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newLog: HealthMetric = {
      id: Date.now().toString(),
      date: formData.date,
      weight: parseFloat(formData.weight),
      bloodPressureSystolic: parseInt(formData.bloodPressureSystolic),
      bloodPressureDiastolic: parseInt(formData.bloodPressureDiastolic),
      heartRate: parseInt(formData.heartRate),
      mood: formData.mood,
      notes: formData.notes
    }

    setLogs(prev => [newLog, ...prev])
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      heartRate: '',
      mood: 'Good',
      notes: ''
    })
    
    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      heartRate: '',
      mood: 'Good',
      notes: ''
    })
  }

  return (
    <div data-testid="userlogshealth" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Metrics Log</h1>
              <p className="text-gray-600">Track your daily health measurements</p>
            </div>
            <button
              data-testid="userlogshealth-add"
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              {showForm ? 'Cancel' : '+ Log Today\'s Metrics'}
            </button>
          </div>
        </div>

        {/* Log Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Health Metrics</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    data-testid="userlogshealth-date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    data-testid="userlogshealth-weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    step="0.1"
                    required
                    placeholder="165.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Pressure - Systolic
                  </label>
                  <input
                    type="number"
                    name="bloodPressureSystolic"
                    data-testid="userlogshealth-systolic"
                    value={formData.bloodPressureSystolic}
                    onChange={handleInputChange}
                    required
                    placeholder="120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Pressure - Diastolic
                  </label>
                  <input
                    type="number"
                    name="bloodPressureDiastolic"
                    data-testid="userlogshealth-diastolic"
                    value={formData.bloodPressureDiastolic}
                    onChange={handleInputChange}
                    required
                    placeholder="80"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    name="heartRate"
                    data-testid="userlogshealth-heartrate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    required
                    placeholder="72"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mood
                  </label>
                  <select
                    name="mood"
                    data-testid="userlogshealth-mood"
                    value={formData.mood}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Great">Great</option>
                    <option value="Good">Good</option>
                    <option value="Okay">Okay</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  data-testid="userlogshealth-notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="How are you feeling today? Any observations?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  data-testid="userlogshealth-submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
                >
                  Save Metrics
                </button>
                <button
                  type="button"
                  data-testid="userlogshealth-cancel"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Health Logs History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Health History</h2>
          
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No health metrics logged yet. Start tracking your health today!</p>
          ) : (
            <div data-testid="userlogshealth-list" className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  data-testid="userlogshealth-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {new Date(log.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                        log.mood === 'Great' ? 'bg-green-100 text-green-800' :
                        log.mood === 'Good' ? 'bg-blue-100 text-blue-800' :
                        log.mood === 'Okay' ? 'bg-yellow-100 text-yellow-800' :
                        log.mood === 'Fair' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Mood: {log.mood}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Weight</p>
                      <p className="text-xl font-bold text-blue-700">{log.weight} lbs</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Blood Pressure</p>
                      <p className="text-xl font-bold text-purple-700">
                        {log.bloodPressureSystolic}/{log.bloodPressureDiastolic}
                      </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Heart Rate</p>
                      <p className="text-xl font-bold text-red-700">{log.heartRate} bpm</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Status</p>
                      <p className="text-sm font-semibold text-green-700">Logged</p>
                    </div>
                  </div>

                  {log.notes && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Notes:</span> {log.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
