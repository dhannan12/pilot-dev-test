/**
 * BuildPatientPortal — Patient portal for managing appointments, treatment plans, and progress tracking
 *
 * Features: upcoming appointments, treatment history, exercise programs, medical records, messages
 *
 * Ticket: SCRUM-729 | Branch: proto/SCRUM-717
 */

import React, { useState } from 'react'

interface Appointment {
  id: string
  date: string
  time: string
  therapist: string
  type: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

interface TreatmentRecord {
  id: string
  date: string
  therapist: string
  diagnosis: string
  treatment: string
  notes: string
}

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  completed: boolean
  videoUrl?: string
}

interface Message {
  id: string
  from: string
  subject: string
  date: string
  read: boolean
  preview: string
}

interface Document {
  id: string
  name: string
  type: string
  date: string
  size: string
}

const mockAppointments: Appointment[] = [
  {
    id: 'apt1',
    date: '2026-08-15',
    time: '10:00 AM',
    therapist: 'Dr. Sarah Johnson',
    type: 'Physical Therapy Session',
    status: 'scheduled'
  },
  {
    id: 'apt2',
    date: '2026-08-18',
    time: '2:30 PM',
    therapist: 'Dr. Michael Chen',
    type: 'Follow-up Assessment',
    status: 'scheduled'
  },
  {
    id: 'apt3',
    date: '2026-08-08',
    time: '11:00 AM',
    therapist: 'Dr. Sarah Johnson',
    type: 'Initial Consultation',
    status: 'completed'
  },
  {
    id: 'apt4',
    date: '2026-08-10',
    time: '3:00 PM',
    therapist: 'Dr. Emily Rodriguez',
    type: 'Manual Therapy',
    status: 'completed'
  },
  {
    id: 'apt5',
    date: '2026-08-22',
    time: '9:00 AM',
    therapist: 'Dr. Michael Chen',
    type: 'Progress Review',
    status: 'scheduled'
  }
]

const mockTreatmentHistory: TreatmentRecord[] = [
  {
    id: 'tr1',
    date: '2026-08-10',
    therapist: 'Dr. Emily Rodriguez',
    diagnosis: 'Lower back pain, lumbar strain',
    treatment: 'Manual therapy, therapeutic exercises',
    notes: 'Patient showing good progress. Reduced pain level from 7/10 to 4/10.'
  },
  {
    id: 'tr2',
    date: '2026-08-08',
    therapist: 'Dr. Sarah Johnson',
    diagnosis: 'Acute lumbar strain',
    treatment: 'Initial assessment, heat therapy, TENS',
    notes: 'Started treatment plan. Patient educated on proper lifting techniques.'
  },
  {
    id: 'tr3',
    date: '2026-08-05',
    therapist: 'Dr. Sarah Johnson',
    diagnosis: 'Lower back pain',
    treatment: 'Initial consultation and examination',
    notes: 'Comprehensive assessment completed. Treatment plan developed.'
  },
  {
    id: 'tr4',
    date: '2026-08-03',
    therapist: 'Dr. Michael Chen',
    diagnosis: 'Chronic lower back pain',
    treatment: 'Postural assessment, core strengthening exercises',
    notes: 'Patient demonstrates good understanding of exercises.'
  },
  {
    id: 'tr5',
    date: '2026-07-30',
    therapist: 'Dr. Emily Rodriguez',
    diagnosis: 'Lumbar muscle tension',
    treatment: 'Soft tissue massage, stretching program',
    notes: 'Significant improvement in range of motion observed.'
  }
]

const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Pelvic Tilt',
    sets: 3,
    reps: 10,
    completed: true,
    videoUrl: '#'
  },
  {
    id: 'ex2',
    name: 'Bridge Exercise',
    sets: 3,
    reps: 12,
    completed: true,
    videoUrl: '#'
  },
  {
    id: 'ex3',
    name: 'Cat-Cow Stretch',
    sets: 2,
    reps: 15,
    completed: false,
    videoUrl: '#'
  },
  {
    id: 'ex4',
    name: 'Bird Dog',
    sets: 3,
    reps: 10,
    completed: false,
    videoUrl: '#'
  },
  {
    id: 'ex5',
    name: 'Prone Press-up',
    sets: 2,
    reps: 8,
    completed: false,
    videoUrl: '#'
  }
]

const mockMessages: Message[] = [
  {
    id: 'msg1',
    from: 'Dr. Sarah Johnson',
    subject: 'Your upcoming appointment reminder',
    date: '2026-08-12',
    read: false,
    preview: 'Just a reminder about your appointment on August 15th at 10:00 AM...'
  },
  {
    id: 'msg2',
    from: 'Rehabd Admin',
    subject: 'New exercise program available',
    date: '2026-08-11',
    read: false,
    preview: 'Your therapist has updated your exercise program. Please review...'
  },
  {
    id: 'msg3',
    from: 'Dr. Emily Rodriguez',
    subject: 'Treatment progress update',
    date: '2026-08-10',
    read: true,
    preview: 'Great progress in our last session! Keep up with your exercises...'
  },
  {
    id: 'msg4',
    from: 'Billing Department',
    subject: 'Invoice for recent sessions',
    date: '2026-08-09',
    read: true,
    preview: 'Your invoice for sessions in August is now available...'
  },
  {
    id: 'msg5',
    from: 'Dr. Michael Chen',
    subject: 'Pre-appointment questionnaire',
    date: '2026-08-08',
    read: true,
    preview: 'Please complete this brief questionnaire before your next visit...'
  }
]

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    name: 'Initial Assessment Report',
    type: 'PDF',
    date: '2026-08-05',
    size: '245 KB'
  },
  {
    id: 'doc2',
    name: 'Treatment Plan',
    type: 'PDF',
    date: '2026-08-05',
    size: '189 KB'
  },
  {
    id: 'doc3',
    name: 'Exercise Program',
    type: 'PDF',
    date: '2026-08-08',
    size: '512 KB'
  },
  {
    id: 'doc4',
    name: 'Progress Notes - August',
    type: 'PDF',
    date: '2026-08-10',
    size: '156 KB'
  },
  {
    id: 'doc5',
    name: 'Insurance Pre-Authorization',
    type: 'PDF',
    date: '2026-08-03',
    size: '98 KB'
  }
]

export default function BuildPatientPortal() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'treatment' | 'exercises' | 'messages' | 'documents'>('dashboard')
  const [exercises, setExercises] = useState(mockExercises)

  const toggleExerciseCompletion = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ))
  }

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'scheduled')
  const completedExercises = exercises.filter(ex => ex.completed).length
  const unreadMessages = mockMessages.filter(msg => !msg.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Patient Portal</h1>
              <p className="text-blue-100 mt-1">Welcome back, John Doe</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition">
                Book Appointment
              </button>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-semibold text-lg">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'appointments', label: 'Appointments' },
              { id: 'treatment', label: 'Treatment History' },
              { id: 'exercises', label: 'Exercises' },
              { id: 'messages', label: 'Messages', badge: unreadMessages },
              { id: 'documents', label: 'Documents' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-4 font-medium border-b-2 transition relative ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-600 text-sm font-medium">Next Appointment</div>
                <div className="text-2xl font-bold text-blue-600 mt-2">Aug 15</div>
                <div className="text-gray-500 text-sm mt-1">10:00 AM</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-600 text-sm font-medium">Exercise Progress</div>
                <div className="text-2xl font-bold text-green-600 mt-2">{completedExercises}/{exercises.length}</div>
                <div className="text-gray-500 text-sm mt-1">Completed today</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-600 text-sm font-medium">Total Sessions</div>
                <div className="text-2xl font-bold text-purple-600 mt-2">12</div>
                <div className="text-gray-500 text-sm mt-1">This month</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-gray-600 text-sm font-medium">Unread Messages</div>
                <div className="text-2xl font-bold text-orange-600 mt-2">{unreadMessages}</div>
                <div className="text-gray-500 text-sm mt-1">New notifications</div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="space-y-3">
                {upcomingAppointments.slice(0, 3).map(apt => (
                  <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{apt.type}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {apt.therapist} • {apt.date} at {apt.time}
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Exercises */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Exercise Program</h2>
              <div className="space-y-3">
                {exercises.slice(0, 3).map(exercise => (
                  <div key={exercise.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={exercise.completed}
                        onChange={() => toggleExerciseCompletion(exercise.id)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <div>
                        <div className={`font-semibold ${exercise.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {exercise.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {exercise.sets} sets × {exercise.reps} reps
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Watch Video
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">All Appointments</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockAppointments.map(apt => (
                <div key={apt.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {apt.status}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">{apt.type}</h3>
                      </div>
                      <div className="mt-2 text-gray-600">
                        <div className="flex items-center gap-6">
                          <span>📅 {apt.date}</span>
                          <span>🕐 {apt.time}</span>
                          <span>👨‍⚕️ {apt.therapist}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {apt.status === 'scheduled' && (
                        <>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Reschedule
                          </button>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                            Cancel
                          </button>
                        </>
                      )}
                      {apt.status === 'completed' && (
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                          View Notes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'treatment' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Treatment History</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockTreatmentHistory.map(record => (
                <div key={record.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-sm font-medium text-gray-500">{record.date}</div>
                        <div className="text-sm text-gray-600">{record.therapist}</div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="font-semibold text-gray-700">Diagnosis:</span>
                          <span className="text-gray-900 ml-2">{record.diagnosis}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Treatment:</span>
                          <span className="text-gray-900 ml-2">{record.treatment}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Notes:</span>
                          <span className="text-gray-900 ml-2">{record.notes}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View Full Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Exercise Program</h2>
              <p className="text-gray-600 mt-2">Complete your daily exercises as prescribed by your therapist</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Daily Progress</span>
                  <span className="text-sm font-medium text-gray-900">{completedExercises}/{exercises.length} completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(completedExercises / exercises.length) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                {exercises.map(exercise => (
                  <div key={exercise.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={exercise.completed}
                        onChange={() => toggleExerciseCompletion(exercise.id)}
                        className="w-6 h-6 text-blue-600 rounded"
                      />
                      <div className="flex-1">
                        <div className={`text-lg font-semibold ${exercise.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {exercise.name}
                        </div>
                        <div className="text-gray-600 mt-1">
                          {exercise.sets} sets × {exercise.reps} repetitions
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Watch Video
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                        Instructions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`p-6 hover:bg-gray-50 transition cursor-pointer ${!msg.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {!msg.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                        <h3 className={`text-lg ${!msg.read ? 'font-bold' : 'font-semibold'} text-gray-900`}>
                          {msg.subject}
                        </h3>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        From: {msg.from} • {msg.date}
                      </div>
                      <p className="text-gray-700">{msg.preview}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm ml-4">
                      Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Medical Documents</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockDocuments.map(doc => (
                  <div key={doc.id} className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                          {doc.type}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                          <div className="text-sm text-gray-600">
                            {doc.date} • {doc.size}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
