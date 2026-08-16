import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import IncidentDateMust from './IncidentDateMust'

describe('IncidentDateMust', () => {
  it('renders without crashing', () => {
    render(<IncidentDateMust />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock claim data', () => {
    render(<IncidentDateMust />)
    expect(screen.getByText(/CLM-2024-001/i)).toBeTruthy()
    expect(screen.getByText(/CLM-2024-002/i)).toBeTruthy()
    expect(screen.getByText(/Vehicle collision at intersection/i)).toBeTruthy()
    expect(screen.getByText(/Rear-end accident on highway/i)).toBeTruthy()
  })

  it('displays form fields', () => {
    render(<IncidentDateMust />)
    expect(screen.getByLabelText(/Claim Number/i)).toBeTruthy()
    expect(screen.getByLabelText(/Incident Date/i)).toBeTruthy()
    expect(screen.getByLabelText(/Incident Description/i)).toBeTruthy()
  })

  it('shows error when submitting without incident date', () => {
    render(<IncidentDateMust />)
    
    const claimNumberInput = screen.getByTestId('incidentdatemust-claim-number')
    const descriptionInput = screen.getByTestId('incidentdatemust-description')
    const submitButton = screen.getByTestId('incidentdatemust-submit')

    fireEvent.change(claimNumberInput, { target: { value: 'CLM-2024-999' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test incident' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/Incident date must be provided in claim submission/i)).toBeTruthy()
  })

  it('shows error when submitting without claim number', () => {
    render(<IncidentDateMust />)
    
    const submitButton = screen.getByTestId('incidentdatemust-submit')
    fireEvent.click(submitButton)

    expect(screen.getByText(/Claim number is required/i)).toBeTruthy()
  })

  it('shows success message when all fields are filled', () => {
    render(<IncidentDateMust />)
    
    const claimNumberInput = screen.getByTestId('incidentdatemust-claim-number')
    const incidentDateInput = screen.getByTestId('incidentdatemust-incident-date')
    const descriptionInput = screen.getByTestId('incidentdatemust-description')
    const submitButton = screen.getByTestId('incidentdatemust-submit')

    fireEvent.change(claimNumberInput, { target: { value: 'CLM-2024-999' } })
    fireEvent.change(incidentDateInput, { target: { value: '2024-01-15' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test incident description' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/submitted successfully/i)).toBeTruthy()
  })

  it('resets form when reset button is clicked', () => {
    render(<IncidentDateMust />)
    
    const claimNumberInput = screen.getByTestId('incidentdatemust-claim-number') as HTMLInputElement
    const resetButton = screen.getByTestId('incidentdatemust-reset')

    fireEvent.change(claimNumberInput, { target: { value: 'CLM-2024-999' } })
    expect(claimNumberInput.value).toBe('CLM-2024-999')

    fireEvent.click(resetButton)
    expect(claimNumberInput.value).toBe('')
  })

  it('displays claims with and without incident dates', () => {
    render(<IncidentDateMust />)
    
    expect(screen.getByText(/2024-01-15/i)).toBeTruthy()
    const notProvidedElements = screen.getAllByText(/NOT PROVIDED/i)
    expect(notProvidedElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<IncidentDateMust />)
    
    // Main wrapper
    expect(screen.getByTestId('incidentdatemust')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('incidentdatemust-claim-number')).toBeTruthy()
    expect(screen.getByTestId('incidentdatemust-incident-date')).toBeTruthy()
    expect(screen.getByTestId('incidentdatemust-description')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('incidentdatemust-submit')).toBeTruthy()
    expect(screen.getByTestId('incidentdatemust-reset')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('incidentdatemust-list')).toBeTruthy()
    expect(screen.getAllByTestId('incidentdatemust-item').length).toBeGreaterThan(0)
  })
})
