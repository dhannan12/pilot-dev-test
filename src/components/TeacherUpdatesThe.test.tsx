import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TeacherUpdatesThe from './TeacherUpdatesThe'

describe('TeacherUpdatesThe', () => {
  it('renders without crashing', () => {
    render(<TeacherUpdatesThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock student data', () => {
    render(<TeacherUpdatesThe />)
    expect(screen.getByText('Emma Thompson')).toBeTruthy()
    expect(screen.getByText('Liam Johnson')).toBeTruthy()
    expect(screen.getByText('Olivia Martinez')).toBeTruthy()
    expect(screen.getByText('Noah Brown')).toBeTruthy()
    expect(screen.getByText('Ava Davis')).toBeTruthy()
  })

  it('displays class register header and summary', () => {
    render(<TeacherUpdatesThe />)
    expect(screen.getByText('Update Class Register')).toBeTruthy()
    expect(screen.getByText('Total:')).toBeTruthy()
    expect(screen.getByText('Present:')).toBeTruthy()
    expect(screen.getByText('Absent:')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<TeacherUpdatesThe />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="teacherupdatesthe"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="teacherupdatesthe-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teacherupdatesthe-subject"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teacherupdatesthe-period"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="teacherupdatesthe-mark-all-present"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="teacherupdatesthe-save"]')).toBeTruthy()
    
    // List elements
    expect(document.querySelector('[data-testid="teacherupdatesthe-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="teacherupdatesthe-item"]').length).toBeGreaterThan(0)
  })

  it('displays attendance dropdowns for each student', () => {
    render(<TeacherUpdatesThe />)
    const attendanceSelects = document.querySelectorAll('select[data-testid^="teacherupdatesthe-attendance-"]')
    expect(attendanceSelects.length).toBeGreaterThan(0)
  })

  it('displays save button', () => {
    render(<TeacherUpdatesThe />)
    expect(screen.getByText('Save Register')).toBeTruthy()
  })
})
