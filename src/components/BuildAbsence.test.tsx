import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildAbsence from './BuildAbsence'

describe('BuildAbsence', () => {
  it('renders without crashing', () => {
    render(<BuildAbsence />)
    expect(document.body).toBeTruthy()
  })

  it('displays form title and description', () => {
    render(<BuildAbsence />)
    expect(screen.getByText('Report Student Absence')).toBeTruthy()
    expect(screen.getByText(/Please complete the form below/i)).toBeTruthy()
  })

  it('displays all student options', () => {
    render(<BuildAbsence />)
    const studentSelect = document.querySelector('[data-testid="buildabsence-student"]') as HTMLSelectElement
    expect(studentSelect).toBeTruthy()
    expect(studentSelect.options.length).toBeGreaterThan(5)
    // Verify at least some students are present
    const optionTexts = Array.from(studentSelect.options).map(opt => opt.text)
    expect(optionTexts.some(text => text.includes('Emma Johnson'))).toBeTruthy()
    expect(optionTexts.some(text => text.includes('Liam Smith'))).toBeTruthy()
  })

  it('displays all absence reasons', () => {
    render(<BuildAbsence />)
    const reasonSelect = document.querySelector('[data-testid="buildabsence-reason"]') as HTMLSelectElement
    expect(reasonSelect).toBeTruthy()
    expect(reasonSelect.options.length).toBeGreaterThan(5)
    // Verify absence reasons are present
    const optionTexts = Array.from(reasonSelect.options).map(opt => opt.text)
    expect(optionTexts.includes('Illness')).toBeTruthy()
    expect(optionTexts.includes('Medical Appointment')).toBeTruthy()
    expect(optionTexts.includes('Family Emergency')).toBeTruthy()
  })

  it('displays mock submitted reports', () => {
    render(<BuildAbsence />)
    expect(screen.getByText('Recent Absence Reports')).toBeTruthy()
    // Check for at least one mock report
    const items = document.querySelectorAll('[data-testid="buildabsence-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<BuildAbsence />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="buildabsence"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="buildabsence-student"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="buildabsence-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="buildabsence-reason"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="buildabsence-notes"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="buildabsence-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="buildabsence-reset"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="buildabsence-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="buildabsence-item"]')).toBeTruthy()
  })

  it('allows user to fill out the form', () => {
    render(<BuildAbsence />)
    
    const studentSelect = document.querySelector('[data-testid="buildabsence-student"]') as HTMLSelectElement
    const dateInput = document.querySelector('[data-testid="buildabsence-date"]') as HTMLInputElement
    const reasonSelect = document.querySelector('[data-testid="buildabsence-reason"]') as HTMLSelectElement
    const notesTextarea = document.querySelector('[data-testid="buildabsence-notes"]') as HTMLTextAreaElement
    
    expect(studentSelect).toBeTruthy()
    expect(dateInput).toBeTruthy()
    expect(reasonSelect).toBeTruthy()
    expect(notesTextarea).toBeTruthy()
    
    // Simulate filling the form
    fireEvent.change(studentSelect, { target: { value: 's1' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-25' } })
    fireEvent.change(reasonSelect, { target: { value: 'r1' } })
    fireEvent.change(notesTextarea, { target: { value: 'Test notes' } })
    
    expect(studentSelect.value).toBe('s1')
    expect(dateInput.value).toBe('2026-08-25')
    expect(reasonSelect.value).toBe('r1')
    expect(notesTextarea.value).toBe('Test notes')
  })

  it('resets form when reset button is clicked', () => {
    render(<BuildAbsence />)
    
    const studentSelect = document.querySelector('[data-testid="buildabsence-student"]') as HTMLSelectElement
    const dateInput = document.querySelector('[data-testid="buildabsence-date"]') as HTMLInputElement
    const resetButton = document.querySelector('[data-testid="buildabsence-reset"]') as HTMLButtonElement
    
    // Fill some fields
    fireEvent.change(studentSelect, { target: { value: 's1' } })
    fireEvent.change(dateInput, { target: { value: '2026-08-25' } })
    
    // Click reset
    fireEvent.click(resetButton)
    
    expect(studentSelect.value).toBe('')
    expect(dateInput.value).toBe('')
  })
})
