import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildPatientPortal from './BuildPatientPortal'

describe('BuildPatientPortal', () => {
  it('renders without crashing', () => {
    render(<BuildPatientPortal />)
    expect(document.body).toBeTruthy()
  })

  it('displays the patient portal header', () => {
    render(<BuildPatientPortal />)
    expect(screen.getByText('Patient Portal')).toBeTruthy()
    expect(screen.getByText('Welcome back, John Doe')).toBeTruthy()
  })

  it('displays navigation tabs', () => {
    render(<BuildPatientPortal />)
    expect(screen.getByText('Dashboard')).toBeTruthy()
    expect(screen.getByText('Appointments')).toBeTruthy()
    expect(screen.getByText('Treatment History')).toBeTruthy()
    expect(screen.getByText('Exercises')).toBeTruthy()
    expect(screen.getByText('Messages')).toBeTruthy()
    expect(screen.getByText('Documents')).toBeTruthy()
  })

  it('displays dashboard quick stats by default', () => {
    render(<BuildPatientPortal />)
    expect(screen.getByText('Next Appointment')).toBeTruthy()
    expect(screen.getByText('Exercise Progress')).toBeTruthy()
    expect(screen.getByText('Total Sessions')).toBeTruthy()
    expect(screen.getByText('Unread Messages')).toBeTruthy()
  })

  it('displays upcoming appointments on dashboard', () => {
    render(<BuildPatientPortal />)
    expect(screen.getByText('Upcoming Appointments')).toBeTruthy()
    expect(screen.getByText('Physical Therapy Session')).toBeTruthy()
  })

  it('switches to appointments tab when clicked', () => {
    render(<BuildPatientPortal />)
    const appointmentsTab = screen.getByText('Appointments')
    fireEvent.click(appointmentsTab)
    expect(screen.getByText('All Appointments')).toBeTruthy()
  })

  it('displays appointment details with status', () => {
    render(<BuildPatientPortal />)
    const appointmentsTab = screen.getByText('Appointments')
    fireEvent.click(appointmentsTab)
    expect(screen.getAllByText(/Dr\./i).length).toBeGreaterThan(0)
    expect(screen.getAllByText('scheduled').length).toBeGreaterThan(0)
  })

  it('switches to treatment history tab', () => {
    render(<BuildPatientPortal />)
    const treatmentTab = screen.getByText('Treatment History')
    fireEvent.click(treatmentTab)
    expect(screen.getAllByText(/Lower back pain/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Diagnosis:/i).length).toBeGreaterThan(0)
  })

  it('displays treatment records with diagnosis and notes', () => {
    render(<BuildPatientPortal />)
    fireEvent.click(screen.getByText('Treatment History'))
    expect(screen.getAllByText(/Diagnosis:/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Treatment:/i).length).toBeGreaterThan(0)
  })

  it('switches to exercises tab and displays exercise program', () => {
    render(<BuildPatientPortal />)
    const exercisesTab = screen.getByText('Exercises')
    fireEvent.click(exercisesTab)
    expect(screen.getByText('Exercise Program')).toBeTruthy()
    expect(screen.getByText('Pelvic Tilt')).toBeTruthy()
    expect(screen.getByText('Bridge Exercise')).toBeTruthy()
  })

  it('displays exercise progress bar', () => {
    render(<BuildPatientPortal />)
    fireEvent.click(screen.getByText('Exercises'))
    expect(screen.getByText('Daily Progress')).toBeTruthy()
    expect(screen.getByText(/completed/i)).toBeTruthy()
  })

  it('toggles exercise completion status', () => {
    render(<BuildPatientPortal />)
    fireEvent.click(screen.getByText('Exercises'))
    const checkboxes = screen.getAllByRole('checkbox')
    const initialChecked = checkboxes.filter(cb => (cb as HTMLInputElement).checked).length
    fireEvent.click(checkboxes[2])
    const afterChecked = checkboxes.filter(cb => (cb as HTMLInputElement).checked).length
    expect(afterChecked).not.toBe(initialChecked)
  })

  it('switches to messages tab and displays messages', () => {
    render(<BuildPatientPortal />)
    const messagesTab = screen.getByText('Messages')
    fireEvent.click(messagesTab)
    expect(screen.getByText('Your upcoming appointment reminder')).toBeTruthy()
    expect(screen.getByText('New exercise program available')).toBeTruthy()
  })

  it('displays unread message indicators', () => {
    render(<BuildPatientPortal />)
    fireEvent.click(screen.getByText('Messages'))
    expect(screen.getAllByText(/admin/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/appointment reminder/i).length).toBeGreaterThan(0)
  })

  it('switches to documents tab and displays medical documents', () => {
    render(<BuildPatientPortal />)
    const documentsTab = screen.getByText('Documents')
    fireEvent.click(documentsTab)
    expect(screen.getByText('Medical Documents')).toBeTruthy()
    expect(screen.getByText('Initial Assessment Report')).toBeTruthy()
    expect(screen.getByText('Treatment Plan')).toBeTruthy()
  })

  it('displays document metadata (type, date, size)', () => {
    render(<BuildPatientPortal />)
    fireEvent.click(screen.getByText('Documents'))
    expect(screen.getAllByText(/KB/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/2026-08/i).length).toBeGreaterThan(0)
  })

  it('displays mock data for all sections', () => {
    render(<BuildPatientPortal />)
    // Check that we have at least 5 appointments
    fireEvent.click(screen.getByText('Appointments'))
    const appointmentElements = screen.getAllByText(/Dr\./i)
    expect(appointmentElements.length).toBeGreaterThanOrEqual(5)
  })
})
