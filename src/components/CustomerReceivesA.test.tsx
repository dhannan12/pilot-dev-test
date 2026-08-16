import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CustomerReceivesA from './CustomerReceivesA'

describe('CustomerReceivesA', () => {
  it('renders without crashing', () => {
    render(<CustomerReceivesA />)
    expect(document.body).toBeTruthy()
  })

  it('displays confirmation email preview with mock data', () => {
    render(<CustomerReceivesA />)
    
    // Check for confirmation email header
    expect(screen.getByText('Equipment Rental Platform')).toBeTruthy()
    expect(screen.getByText('Your rental request has been received')).toBeTruthy()
    
    // Check for customer greeting
    expect(screen.getByText(/Dear/)).toBeTruthy()
    
    // Check for confirmation number
    expect(screen.getByText('Confirmation Number')).toBeTruthy()
    expect(screen.getAllByText(/RR-2026-08-/).length).toBeGreaterThan(0)
    
    // Check for rental details section
    expect(screen.getByText('Rental Request Details')).toBeTruthy()
    expect(screen.getByText('Equipment Type')).toBeTruthy()
    expect(screen.getByText('Quantity')).toBeTruthy()
    
    // Check for next steps
    expect(screen.getByText('Next Steps')).toBeTruthy()
    
    // Check for contact information
    expect(screen.getByText('Need Help?')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CustomerReceivesA />)
    
    // Verify main wrapper
    const mainWrapper = document.querySelector('[data-testid="customerreceivesa"]')
    expect(mainWrapper).toBeTruthy()
    
    // Verify confirmation selector
    const confirmationSelect = document.querySelector('[data-testid="customerreceivesa-confirmation-select"]')
    expect(confirmationSelect).toBeTruthy()
    
    // Verify list container
    const listContainer = document.querySelector('[data-testid="customerreceivesa-list"]')
    expect(listContainer).toBeTruthy()
    
    // Verify list items (next steps)
    const listItems = document.querySelectorAll('[data-testid="customerreceivesa-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Verify action buttons
    const viewDetailsButton = document.querySelector('[data-testid="customerreceivesa-view-details"]')
    expect(viewDetailsButton).toBeTruthy()
    
    const printButton = document.querySelector('[data-testid="customerreceivesa-print"]')
    expect(printButton).toBeTruthy()
  })

  it('displays at least 5 confirmation emails in selector', () => {
    render(<CustomerReceivesA />)
    
    const select = document.querySelector('[data-testid="customerreceivesa-confirmation-select"]') as HTMLSelectElement
    expect(select).toBeTruthy()
    expect(select.options.length).toBeGreaterThanOrEqual(5)
  })

  it('displays rental details correctly', () => {
    render(<CustomerReceivesA />)
    
    // Check that all required rental detail fields are present
    expect(screen.getByText('Start Date')).toBeTruthy()
    expect(screen.getByText('End Date')).toBeTruthy()
    expect(screen.getByText('Rental Period')).toBeTruthy()
    expect(screen.getByText('Estimated Total')).toBeTruthy()
    expect(screen.getByText('Current Status')).toBeTruthy()
  })

  it('displays contact information', () => {
    render(<CustomerReceivesA />)
    
    // Check for email
    expect(screen.getByText(/support@equipmentrental.com/)).toBeTruthy()
    
    // Check for phone number
    expect(screen.getByText(/1-800-RENTAL-1/)).toBeTruthy()
    
    // Check for business hours
    expect(screen.getByText(/Monday - Friday/)).toBeTruthy()
  })
})
