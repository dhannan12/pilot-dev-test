import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsA from './UserSubmitsA'

describe('UserSubmitsA', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the claim submission form with all sections', () => {
    render(<UserSubmitsA />)
    
    // Check main heading
    expect(screen.getByText('Submit Insurance Claim')).toBeTruthy()
    
    // Check section headings
    expect(screen.getByText('Claimant Information')).toBeTruthy()
    expect(screen.getByText('Vehicle Information')).toBeTruthy()
    expect(screen.getByText('Incident Details')).toBeTruthy()
    expect(screen.getByText('Submitted Claims')).toBeTruthy()
  })

  it('displays mock submitted claims', () => {
    render(<UserSubmitsA />)
    
    // Check that mock claims are displayed
    expect(screen.getByText('CLM-001')).toBeTruthy()
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Brown')).toBeTruthy()
    expect(screen.getByText('Emily Davis')).toBeTruthy()
    expect(screen.getByText('David Wilson')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserSubmitsA />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid]')).toBeTruthy()
    
    // Main wrapper
    expect(document.querySelector('[data-testid="usersubmitsa"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="usersubmitsa-claimantname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-vehiclemodel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-vehicleyear"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-licensenumber"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-incidentdate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-incidentlocation"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-incidentdescription"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-damagetype"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="usersubmitsa-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-reset"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="usersubmitsa-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsa-item"]')).toBeTruthy()
  })

  it('displays all form input fields', () => {
    render(<UserSubmitsA />)
    
    // Check that all required input fields exist
    expect(screen.getByLabelText(/Full Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Email Address/i)).toBeTruthy()
    expect(screen.getByLabelText(/Phone Number/i)).toBeTruthy()
    expect(screen.getByLabelText(/Vehicle Make\/Model/i)).toBeTruthy()
    expect(screen.getByLabelText(/Year/i)).toBeTruthy()
    expect(screen.getByLabelText(/License Plate/i)).toBeTruthy()
    expect(screen.getByLabelText(/Incident Date/i)).toBeTruthy()
    expect(screen.getByLabelText(/Damage Type/i)).toBeTruthy()
    expect(screen.getByLabelText(/Incident Location/i)).toBeTruthy()
    expect(screen.getByLabelText(/Incident Description/i)).toBeTruthy()
  })

  it('displays submit and reset buttons', () => {
    render(<UserSubmitsA />)
    
    expect(screen.getByText('Submit Claim')).toBeTruthy()
    expect(screen.getByText('Reset')).toBeTruthy()
  })
})
