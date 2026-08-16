import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SubmitAnAbsence from './SubmitAnAbsence'

describe('SubmitAnAbsence', () => {
  it('renders without crashing', () => {
    render(<SubmitAnAbsence />)
    expect(document.body).toBeTruthy()
  })

  it('displays the absence report form', () => {
    render(<SubmitAnAbsence />)
    expect(screen.getAllByText('Submit Absence Report')[0]).toBeTruthy()
    expect(screen.getByText('Select Student *')).toBeTruthy()
    expect(screen.getByText('Reason for Absence *')).toBeTruthy()
  })

  it('displays mock students in select dropdown', () => {
    render(<SubmitAnAbsence />)
    const studentSelect = screen.getByTestId('submitanabsence-student') as HTMLSelectElement
    expect(studentSelect).toBeTruthy()
    expect(studentSelect.options.length).toBeGreaterThan(5) // At least 5 students + 1 placeholder
    const optionsText = Array.from(studentSelect.options).map(o => o.text).join(' ')
    expect(optionsText).toContain('Emma Johnson')
    expect(optionsText).toContain('Liam Smith')
  })

  it('displays recent absence reports section', () => {
    render(<SubmitAnAbsence />)
    expect(screen.getByText('Recent Absence Reports')).toBeTruthy()
    const viewButtons = screen.getAllByTestId('submitanabsence-view')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SubmitAnAbsence />)
    
    // Main wrapper
    expect(screen.getByTestId('submitanabsence')).toBeTruthy()
    
    // Form fields
    expect(screen.getByTestId('submitanabsence-student')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-startdate')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-enddate')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-reason')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-notes')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('submitanabsence-submit')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-cancel')).toBeTruthy()
  })

  it('shows routing status after submission', () => {
    render(<SubmitAnAbsence />)
    
    // Fill in the form
    const studentSelect = screen.getByTestId('submitanabsence-student') as HTMLSelectElement
    fireEvent.change(studentSelect, { target: { value: '1' } })
    
    const startDate = screen.getByTestId('submitanabsence-startdate') as HTMLInputElement
    fireEvent.change(startDate, { target: { value: '2026-08-16' } })
    
    const endDate = screen.getByTestId('submitanabsence-enddate') as HTMLInputElement
    fireEvent.change(endDate, { target: { value: '2026-08-17' } })
    
    const reasonSelect = screen.getByTestId('submitanabsence-reason') as HTMLSelectElement
    fireEvent.change(reasonSelect, { target: { value: 'Illness' } })
    
    // Submit the form
    const submitButton = screen.getByTestId('submitanabsence-submit')
    fireEvent.click(submitButton)
    
    // Check routing status is displayed
    expect(screen.getByText('Absence Report Submitted')).toBeTruthy()
    expect(screen.getByText('Routing Status')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-list')).toBeTruthy()
    
    // Check routing items exist
    const routingItems = screen.getAllByTestId('submitanabsence-item')
    expect(routingItems.length).toBeGreaterThan(0)
  })

  it('has data-testid on routing list and items after submission', () => {
    render(<SubmitAnAbsence />)
    
    // Fill and submit form
    const studentSelect = screen.getByTestId('submitanabsence-student') as HTMLSelectElement
    fireEvent.change(studentSelect, { target: { value: '1' } })
    
    const startDate = screen.getByTestId('submitanabsence-startdate') as HTMLInputElement
    fireEvent.change(startDate, { target: { value: '2026-08-16' } })
    
    const endDate = screen.getByTestId('submitanabsence-enddate') as HTMLInputElement
    fireEvent.change(endDate, { target: { value: '2026-08-17' } })
    
    const reasonSelect = screen.getByTestId('submitanabsence-reason') as HTMLSelectElement
    fireEvent.change(reasonSelect, { target: { value: 'Illness' } })
    
    fireEvent.click(screen.getByTestId('submitanabsence-submit'))
    
    // Verify routing list and items have testids
    expect(screen.getByTestId('submitanabsence-list')).toBeTruthy()
    const items = screen.getAllByTestId('submitanabsence-item')
    expect(items.length).toBe(4) // 4 routing steps
    
    // Check for new and print buttons
    expect(screen.getByTestId('submitanabsence-new')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-print')).toBeTruthy()
  })

  it('resets form when new absence button is clicked', () => {
    render(<SubmitAnAbsence />)
    
    // Submit form
    const studentSelect = screen.getByTestId('submitanabsence-student') as HTMLSelectElement
    fireEvent.change(studentSelect, { target: { value: '1' } })
    
    const startDate = screen.getByTestId('submitanabsence-startdate') as HTMLInputElement
    fireEvent.change(startDate, { target: { value: '2026-08-16' } })
    
    const endDate = screen.getByTestId('submitanabsence-enddate') as HTMLInputElement
    fireEvent.change(endDate, { target: { value: '2026-08-17' } })
    
    const reasonSelect = screen.getByTestId('submitanabsence-reason') as HTMLSelectElement
    fireEvent.change(reasonSelect, { target: { value: 'Illness' } })
    
    fireEvent.click(screen.getByTestId('submitanabsence-submit'))
    
    // Click new absence button
    const newButton = screen.getByTestId('submitanabsence-new')
    fireEvent.click(newButton)
    
    // Form should be visible again
    expect(screen.getByTestId('submitanabsence-submit')).toBeTruthy()
    expect(screen.getByTestId('submitanabsence-student')).toBeTruthy()
  })
})
