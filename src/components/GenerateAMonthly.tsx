/**
 * GenerateAMonthly — Generate a monthly absence report for a student
 *
 * Features: student selection, month/year picker, absence summary, exportable report display
 *
 * Ticket: SCRUM-941 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface Student {
  id: string
  name: string
  grade: string
}

interface AbsenceRecord {
  date: string
  type: 'Full Day' | 'Partial' | 'Tardy' | 'Excused'
  reason: string
  duration?: string
}

interface MonthlyReport {
  studentId: string
  month: number
  year: number
  totalAbsences: number
  excusedAbsences: number
  unexcusedAbsences: number
  tardies: number
  records: AbsenceRecord[]
}

// Mock data
const MOCK_STUDENTS: Student[] = [
  { id: 'S001', name: 'Emma Johnson', grade: '10th Grade' },
  { id: 'S002', name: 'Liam Smith', grade: '9th Grade' },
  { id: 'S003', name: 'Olivia Brown', grade: '11th Grade' },
  { id: 'S004', name: 'Noah Davis', grade: '10th Grade' },
  { id: 'S005', name: 'Ava Wilson', grade: '12th Grade' },
]

const MOCK_ABSENCE_RECORDS: Record<string, AbsenceRecord[]> = {
  'S001': [
    { date: '2024-01-05', type: 'Full Day', reason: 'Illness - Flu' },
    { date: '2024-01-12', type: 'Partial', reason: 'Medical Appointment', duration: '2 hours' },
    { date: '2024-01-18', type: 'Excused', reason: 'Family Emergency' },
    { date: '2024-01-23', type: 'Tardy', reason: 'Transportation Issue', duration: '15 minutes' },
    { date: '2024-01-29', type: 'Full Day', reason: 'Personal Day' },
  ],
  'S002': [
    { date: '2024-01-08', type: 'Full Day', reason: 'Unexcused Absence' },
    { date: '2024-01-15', type: 'Tardy', reason: 'Overslept', duration: '20 minutes' },
    { date: '2024-01-22', type: 'Partial', reason: 'Dentist Appointment', duration: '1.5 hours' },
  ],
  'S003': [
    { date: '2024-01-03', type: 'Excused', reason: 'Religious Holiday' },
    { date: '2024-01-10', type: 'Full Day', reason: 'Sick - Cold' },
    { date: '2024-01-17', type: 'Tardy', reason: 'Late Bus', duration: '10 minutes' },
    { date: '2024-01-24', type: 'Partial', reason: 'College Visit', duration: '3 hours' },
    { date: '2024-01-31', type: 'Full Day', reason: 'Illness' },
  ],
  'S004': [
    { date: '2024-01-11', type: 'Full Day', reason: 'Medical Procedure' },
    { date: '2024-01-19', type: 'Tardy', reason: 'Traffic', duration: '12 minutes' },
  ],
  'S005': [
    { date: '2024-01-04', type: 'Partial', reason: 'Early Dismissal - Doctor', duration: '2 hours' },
    { date: '2024-01-16', type: 'Full Day', reason: 'School Sanctioned Event' },
    { date: '2024-01-25', type: 'Tardy', reason: 'Weather', duration: '18 minutes' },
    { date: '2024-01-30', type: 'Excused', reason: 'Court Appearance' },
  ],
}

export default function GenerateAMonthly() {
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState<number>(1)
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [report, setReport] = useState<MonthlyReport | null>(null)

  const generateReport = () => {
    if (!selectedStudent) return

    const records = MOCK_ABSENCE_RECORDS[selectedStudent] || []
    const fullDayAbsences = records.filter(r => r.type === 'Full Day').length
    const partialAbsences = records.filter(r => r.type === 'Partial').length
    const excused = records.filter(r => r.type === 'Excused').length
    const tardies = records.filter(r => r.type === 'Tardy').length
    const totalAbsences = fullDayAbsences + partialAbsences
    const unexcused = totalAbsences - excused

    setReport({
      studentId: selectedStudent,
      month: selectedMonth,
      year: selectedYear,
      totalAbsences,
      excusedAbsences: excused,
      unexcusedAbsences: unexcused,
      tardies,
      records,
    })
  }

  const getMonthName = (month: number) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[month - 1]
  }

  const selectedStudentData = MOCK_STUDENTS.find(s => s.id === selectedStudent)

  return (
    <div data-testid="generateamonthly" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Monthly Absence Report</h1>
          <p className="text-gray-600 mb-6">Generate comprehensive absence reports for students</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select
                id="student-select"
                data-testid="generateamonthly-student"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose Student --</option>
                {MOCK_STUDENTS.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.grade})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <select
                id="month-select"
                data-testid="generateamonthly-month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>
                    {getMonthName(month)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                id="year-select"
                data-testid="generateamonthly-year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[2022, 2023, 2024, 2025, 2026].map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            data-testid="generateamonthly-generate"
            onClick={generateReport}
            disabled={!selectedStudent}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Generate Report
          </button>
        </div>

        {report && selectedStudentData && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Absence Report - {getMonthName(report.month)} {report.year}
              </h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="font-medium">Student:</span>
                <span>{selectedStudentData.name}</span>
                <span className="text-gray-400">|</span>
                <span>{selectedStudentData.grade}</span>
                <span className="text-gray-400">|</span>
                <span>ID: {selectedStudentData.id}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="text-sm text-red-600 font-medium mb-1">Total Absences</div>
                <div className="text-3xl font-bold text-red-700">{report.totalAbsences}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 font-medium mb-1">Excused</div>
                <div className="text-3xl font-bold text-green-700">{report.excusedAbsences}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="text-sm text-orange-600 font-medium mb-1">Unexcused</div>
                <div className="text-3xl font-bold text-orange-700">{report.unexcusedAbsences}</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-sm text-yellow-600 font-medium mb-1">Tardies</div>
                <div className="text-3xl font-bold text-yellow-700">{report.tardies}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Records</h3>
              {report.records.length > 0 ? (
                <div data-testid="generateamonthly-list" className="space-y-3">
                  {report.records.map((record, index) => (
                    <div
                      key={index}
                      data-testid="generateamonthly-item"
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-gray-800">{record.date}</span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              record.type === 'Full Day'
                                ? 'bg-red-100 text-red-700'
                                : record.type === 'Partial'
                                ? 'bg-orange-100 text-orange-700'
                                : record.type === 'Excused'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {record.type}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{record.reason}</div>
                        {record.duration && (
                          <div className="text-xs text-gray-500 mt-1">Duration: {record.duration}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No absence records found for this period
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t flex gap-3">
              <button
                data-testid="generateamonthly-export"
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
              >
                Export to PDF
              </button>
              <button
                data-testid="generateamonthly-print"
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors"
              >
                Print Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
