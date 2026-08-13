/**
 * ManagePatient — Dentist interface for managing patient treatment plans and clinical notes
 *
 * Features: patient list view, treatment plan management, clinical notes documentation, role-based access control, treatment history tracking
 *
 * Ticket: SCRUM-754 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface ClinicalNote {
  id: string
  patientId: string
  date: string
  author: string
  authorRole: 'dentist' | 'dental_hygienist' | 'other'
  noteType: 'examination' | 'treatment' | 'follow-up' | 'consultation'
  content: string
}

interface TreatmentPlan {
  id: string
  patientId: string
  treatmentName: string
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled'
  startDate: string
  completionDate?: string
  cost: number
  notes: string
}

interface Patient {
  id: string
  name: string
  dateOfBirth: string
  phone: string
  email: string
  lastVisit: string
  nextAppointment?: string
  activeConditions: string[]
}

// Mock data
const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P001',
    name: 'Sarah Johnson',
    dateOfBirth: '1985-03-15',
    phone: '(555) 123-4567',
    email: 'sarah.j@email.com',
    lastVisit: '2026-07-20',
    nextAppointment: '2026-08-25',
    activeConditions: ['Cavity - Molar 18', 'Gingivitis']
  },
  {
    id: 'P002',
    name: 'Michael Chen',
    dateOfBirth: '1992-11-08',
    phone: '(555) 234-5678',
    email: 'mchen@email.com',
    lastVisit: '2026-08-05',
    nextAppointment: '2026-09-10',
    activeConditions: ['Root Canal - Tooth 14']
  },
  {
    id: 'P003',
    name: 'Emily Rodriguez',
    dateOfBirth: '1978-06-22',
    phone: '(555) 345-6789',
    email: 'emily.rod@email.com',
    lastVisit: '2026-08-10',
    activeConditions: ['Crown Replacement - Tooth 3', 'Teeth Whitening']
  },
  {
    id: 'P004',
    name: 'David Thompson',
    dateOfBirth: '2001-09-30',
    phone: '(555) 456-7890',
    email: 'dthompson@email.com',
    lastVisit: '2026-08-01',
    nextAppointment: '2026-08-20',
    activeConditions: ['Braces Adjustment']
  },
  {
    id: 'P005',
    name: 'Jessica Martinez',
    dateOfBirth: '1988-12-05',
    phone: '(555) 567-8901',
    email: 'jmartinez@email.com',
    lastVisit: '2026-07-28',
    nextAppointment: '2026-09-05',
    activeConditions: ['Implant Consultation', 'Periodontal Disease']
  }
]

const MOCK_TREATMENT_PLANS: TreatmentPlan[] = [
  {
    id: 'TP001',
    patientId: 'P001',
    treatmentName: 'Cavity Filling - Molar 18',
    status: 'in-progress',
    startDate: '2026-07-20',
    cost: 250,
    notes: 'Composite filling required, patient prefers tooth-colored material'
  },
  {
    id: 'TP002',
    patientId: 'P001',
    treatmentName: 'Deep Cleaning',
    status: 'planned',
    startDate: '2026-08-25',
    cost: 180,
    notes: 'Address gingivitis, patient sensitive to cold'
  },
  {
    id: 'TP003',
    patientId: 'P002',
    treatmentName: 'Root Canal - Tooth 14',
    status: 'in-progress',
    startDate: '2026-08-05',
    cost: 1200,
    notes: 'Multi-visit procedure, currently at stage 2 of 3'
  },
  {
    id: 'TP004',
    patientId: 'P003',
    treatmentName: 'Crown Replacement - Tooth 3',
    status: 'planned',
    startDate: '2026-08-15',
    cost: 1500,
    notes: 'Old crown showing wear, zirconia crown recommended'
  },
  {
    id: 'TP005',
    patientId: 'P004',
    treatmentName: 'Orthodontic Adjustment',
    status: 'completed',
    startDate: '2026-08-01',
    completionDate: '2026-08-01',
    cost: 150,
    notes: 'Monthly braces tightening completed successfully'
  },
  {
    id: 'TP006',
    patientId: 'P005',
    treatmentName: 'Dental Implant Consultation',
    status: 'completed',
    startDate: '2026-07-28',
    completionDate: '2026-07-28',
    cost: 100,
    notes: 'CT scan ordered, patient approved for implant'
  },
  {
    id: 'TP007',
    patientId: 'P005',
    treatmentName: 'Periodontal Treatment',
    status: 'planned',
    startDate: '2026-09-05',
    cost: 800,
    notes: 'Scaling and root planing required for moderate periodontitis'
  }
]

const MOCK_CLINICAL_NOTES: ClinicalNote[] = [
  {
    id: 'CN001',
    patientId: 'P001',
    date: '2026-07-20',
    author: 'Dr. Amanda Wilson',
    authorRole: 'dentist',
    noteType: 'examination',
    content: 'Patient presents with cavity on molar 18. X-ray shows moderate decay not reaching pulp. Recommended composite filling. Also noted mild gingivitis, scheduled deep cleaning.'
  },
  {
    id: 'CN002',
    patientId: 'P002',
    date: '2026-08-05',
    author: 'Dr. James Park',
    authorRole: 'dentist',
    noteType: 'treatment',
    content: 'Root canal procedure stage 2 completed. Canal cleaned and shaped. Patient tolerated procedure well with local anesthesia. Next visit for obturation scheduled.'
  },
  {
    id: 'CN003',
    patientId: 'P003',
    date: '2026-08-10',
    author: 'Lisa Chen RDH',
    authorRole: 'dental_hygienist',
    noteType: 'examination',
    content: 'Routine cleaning completed. Patient inquired about crown on tooth 3 - showing marginal wear. Dentist consulted, replacement recommended.'
  },
  {
    id: 'CN004',
    patientId: 'P004',
    date: '2026-08-01',
    author: 'Dr. Amanda Wilson',
    authorRole: 'dentist',
    noteType: 'treatment',
    content: 'Orthodontic adjustment completed. Brackets checked, wire changed to 0.018 NiTi. Patient reports minimal discomfort. Progress photos taken.'
  },
  {
    id: 'CN005',
    patientId: 'P005',
    date: '2026-07-28',
    author: 'Dr. James Park',
    authorRole: 'dentist',
    noteType: 'consultation',
    content: 'Implant consultation for missing tooth 19. CT scan ordered. Patient is good candidate - adequate bone density. Discussed timeline and costs.'
  }
]

export default function ManagePatient() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('P001')
  const [currentUserRole, setCurrentUserRole] = useState<'dentist' | 'dental_hygienist' | 'other'>('dentist')
  const [showNewNoteForm, setShowNewNoteForm] = useState(false)
  const [showNewTreatmentForm, setShowNewTreatmentForm] = useState(false)
  const [newNote, setNewNote] = useState({ noteType: 'examination', content: '' })
  const [newTreatment, setNewTreatment] = useState({
    treatmentName: '',
    cost: '',
    notes: '',
    startDate: ''
  })

  const selectedPatient = MOCK_PATIENTS.find(p => p.id === selectedPatientId)
  const patientTreatments = MOCK_TREATMENT_PLANS.filter(tp => tp.patientId === selectedPatientId)
  const patientNotes = MOCK_CLINICAL_NOTES.filter(cn => cn.patientId === selectedPatientId)

  const canDocumentNotes = currentUserRole === 'dentist' || currentUserRole === 'dental_hygienist'

  const handleAddNote = () => {
    if (!canDocumentNotes) {
      alert('Only dentists and dental hygienists can document clinical notes.')
      return
    }
    if (newNote.content.trim()) {
      alert(`Clinical note added successfully!\nType: ${newNote.noteType}\nContent: ${newNote.content}`)
      setNewNote({ noteType: 'examination', content: '' })
      setShowNewNoteForm(false)
    }
  }

  const handleAddTreatment = () => {
    if (newTreatment.treatmentName && newTreatment.cost && newTreatment.startDate) {
      alert(`Treatment plan added successfully!\nTreatment: ${newTreatment.treatmentName}\nCost: $${newTreatment.cost}`)
      setNewTreatment({ treatmentName: '', cost: '', notes: '', startDate: '' })
      setShowNewTreatmentForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h1>
          <p className="text-gray-600">Manage treatment plans and clinical documentation</p>
          
          {/* Role Selector (for demo purposes) */}
          <div className="mt-4 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Current Role:</label>
            <select
              value={currentUserRole}
              onChange={(e) => setCurrentUserRole(e.target.value as 'dentist' | 'dental_hygienist' | 'other')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="dentist">Dentist</option>
              <option value="dental_hygienist">Dental Hygienist</option>
              <option value="other">Administrative Staff</option>
            </select>
            {!canDocumentNotes && (
              <span className="text-xs text-red-600 font-medium">
                ⚠️ Cannot document clinical notes
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="col-span-1 bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Patients</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {MOCK_PATIENTS.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedPatientId === patient.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="font-medium text-gray-900">{patient.name}</div>
                  <div className="text-sm text-gray-500 mt-1">ID: {patient.id}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                  {patient.nextAppointment && (
                    <div className="text-xs text-blue-600 mt-1">
                      Next: {new Date(patient.nextAppointment).toLocaleDateString()}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Details & Treatment Plans */}
          <div className="col-span-2 space-y-6">
            {selectedPatient ? (
              <>
                {/* Patient Info */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {selectedPatient.name}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Date of Birth:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Patient ID:</span>
                      <span className="ml-2 text-gray-900">{selectedPatient.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-2 text-gray-900">{selectedPatient.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2 text-gray-900">{selectedPatient.email}</span>
                    </div>
                  </div>
                  {selectedPatient.activeConditions.length > 0 && (
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-700">Active Conditions:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedPatient.activeConditions.map((condition, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Treatment Plans */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Treatment Plans</h3>
                    <button
                      onClick={() => setShowNewTreatmentForm(!showNewTreatmentForm)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                    >
                      + New Treatment
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    {showNewTreatmentForm && (
                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <h4 className="font-medium text-gray-900 mb-3">Add New Treatment Plan</h4>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Treatment name"
                            value={newTreatment.treatmentName}
                            onChange={(e) => setNewTreatment({ ...newTreatment, treatmentName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="number"
                              placeholder="Cost"
                              value={newTreatment.cost}
                              onChange={(e) => setNewTreatment({ ...newTreatment, cost: e.target.value })}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                            <input
                              type="date"
                              value={newTreatment.startDate}
                              onChange={(e) => setNewTreatment({ ...newTreatment, startDate: e.target.value })}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          <textarea
                            placeholder="Treatment notes"
                            value={newTreatment.notes}
                            onChange={(e) => setNewTreatment({ ...newTreatment, notes: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleAddTreatment}
                              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                            >
                              Add Treatment
                            </button>
                            <button
                              onClick={() => setShowNewTreatmentForm(false)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {patientTreatments.map((treatment) => (
                      <div key={treatment.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{treatment.treatmentName}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(treatment.status)}`}>
                            {treatment.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>
                            <span className="text-gray-500">Start Date:</span>
                            <span className="ml-2">{new Date(treatment.startDate).toLocaleDateString()}</span>
                          </div>
                          {treatment.completionDate && (
                            <div>
                              <span className="text-gray-500">Completed:</span>
                              <span className="ml-2">{new Date(treatment.completionDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-500">Cost:</span>
                            <span className="ml-2 font-medium">${treatment.cost}</span>
                          </div>
                          {treatment.notes && (
                            <div className="mt-2 text-xs text-gray-500 italic">{treatment.notes}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Notes */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Clinical Notes</h3>
                    <button
                      onClick={() => {
                        if (!canDocumentNotes) {
                          alert('Only dentists and dental hygienists can document clinical notes.')
                          return
                        }
                        setShowNewNoteForm(!showNewNoteForm)
                      }}
                      disabled={!canDocumentNotes}
                      className={`px-4 py-2 text-sm rounded-md ${
                        canDocumentNotes
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      + New Note
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    {!canDocumentNotes && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-800">
                          ⚠️ Only dentists and dental hygienists can document clinical notes in the system.
                        </p>
                      </div>
                    )}

                    {showNewNoteForm && canDocumentNotes && (
                      <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                        <h4 className="font-medium text-gray-900 mb-3">Add Clinical Note</h4>
                        <div className="space-y-3">
                          <select
                            value={newNote.noteType}
                            onChange={(e) => setNewNote({ ...newNote, noteType: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="examination">Examination</option>
                            <option value="treatment">Treatment</option>
                            <option value="follow-up">Follow-up</option>
                            <option value="consultation">Consultation</option>
                          </select>
                          <textarea
                            placeholder="Enter clinical note..."
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleAddNote}
                              className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                            >
                              Save Note
                            </button>
                            <button
                              onClick={() => setShowNewNoteForm(false)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {patientNotes.map((note) => (
                      <div key={note.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase">
                              {note.noteType}
                            </span>
                            <div className="text-sm text-gray-600 mt-1">
                              {note.author} • {note.authorRole.replace('_', ' ')}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(note.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-sm text-gray-800 mt-2">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                Select a patient to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
