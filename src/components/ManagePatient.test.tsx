import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ManagePatient from './ManagePatient'

describe('ManagePatient', () => {
  it('renders without crashing', () => {
    render(<ManagePatient />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<ManagePatient />)
    expect(screen.getByText('Patient Management')).toBeTruthy()
    expect(screen.getByText('Manage treatment plans and clinical documentation')).toBeTruthy()
  })

  it('displays mock patient data', () => {
    render(<ManagePatient />)
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Michael Chen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Emily Rodriguez').length).toBeGreaterThan(0)
    expect(screen.getAllByText('David Thompson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Jessica Martinez').length).toBeGreaterThan(0)
  })

  it('displays patient details when selected', () => {
    render(<ManagePatient />)
    // First patient should be selected by default
    const sarahElements = screen.getAllByText('Sarah Johnson')
    expect(sarahElements.length).toBeGreaterThan(0)
    expect(screen.getByText('(555) 123-4567')).toBeTruthy()
    expect(screen.getByText('sarah.j@email.com')).toBeTruthy()
  })

  it('displays treatment plans section', () => {
    render(<ManagePatient />)
    expect(screen.getByText('Treatment Plans')).toBeTruthy()
    expect(screen.getByText('+ New Treatment')).toBeTruthy()
  })

  it('displays clinical notes section', () => {
    render(<ManagePatient />)
    expect(screen.getByText('Clinical Notes')).toBeTruthy()
    expect(screen.getByText('+ New Note')).toBeTruthy()
  })

  it('shows role selector for demo purposes', () => {
    render(<ManagePatient />)
    expect(screen.getByText('Current Role:')).toBeTruthy()
    const roleSelector = screen.getByRole('combobox') as HTMLSelectElement
    expect(roleSelector).toBeTruthy()
    expect(roleSelector.value).toBe('dentist')
  })

  it('enforces role-based access control for clinical notes', () => {
    render(<ManagePatient />)
    const roleSelector = screen.getByRole('combobox') as HTMLSelectElement
    
    // Change role to administrative staff (other)
    fireEvent.change(roleSelector, { target: { value: 'other' } })
    
    // Check that warning message appears
    expect(screen.getByText('⚠️ Cannot document clinical notes')).toBeTruthy()
    expect(screen.getByText(/Only dentists and dental hygienists can document clinical notes/)).toBeTruthy()
  })

  it('allows dentists to access clinical notes', () => {
    render(<ManagePatient />)
    const roleSelector = screen.getByRole('combobox') as HTMLSelectElement
    
    // Dentist role should be default
    expect(roleSelector.value).toBe('dentist')
    
    // New Note button should be enabled
    const newNoteButton = screen.getByText('+ New Note')
    expect(newNoteButton.className).not.toContain('cursor-not-allowed')
  })

  it('allows dental hygienists to access clinical notes', () => {
    render(<ManagePatient />)
    const roleSelector = screen.getByRole('combobox') as HTMLSelectElement
    
    // Change to dental hygienist
    fireEvent.change(roleSelector, { target: { value: 'dental_hygienist' } })
    
    // New Note button should be enabled
    const newNoteButton = screen.getByText('+ New Note')
    expect(newNoteButton.className).not.toContain('cursor-not-allowed')
  })

  it('displays treatment plan statuses', () => {
    render(<ManagePatient />)
    // Treatment plans should show status badges
    const statusElements = document.querySelectorAll('.bg-blue-100, .bg-yellow-100, .bg-green-100')
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('displays active conditions for patients', () => {
    render(<ManagePatient />)
    expect(screen.getByText('Active Conditions:')).toBeTruthy()
    expect(screen.getByText('Cavity - Molar 18')).toBeTruthy()
    expect(screen.getByText('Gingivitis')).toBeTruthy()
  })

  it('can switch between patients', () => {
    render(<ManagePatient />)
    
    // Click on Michael Chen
    const michaelButtons = screen.getAllByText('Michael Chen')
    fireEvent.click(michaelButtons[0])
    
    // Should display Michael's details
    expect(screen.getByText('(555) 234-5678')).toBeTruthy()
    expect(screen.getByText('mchen@email.com')).toBeTruthy()
  })

  it('shows new treatment form when button clicked', () => {
    render(<ManagePatient />)
    
    const newTreatmentButton = screen.getByText('+ New Treatment')
    fireEvent.click(newTreatmentButton)
    
    expect(screen.getByText('Add New Treatment Plan')).toBeTruthy()
    expect(screen.getByPlaceholderText('Treatment name')).toBeTruthy()
  })

  it('shows new note form when button clicked (for authorized roles)', () => {
    render(<ManagePatient />)
    
    const newNoteButton = screen.getByText('+ New Note')
    fireEvent.click(newNoteButton)
    
    expect(screen.getByText('Add Clinical Note')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter clinical note...')).toBeTruthy()
  })
})
