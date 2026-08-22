import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminAddsA from './AdminAddsA'

describe('AdminAddsA', () => {
  it('renders without crashing', () => {
    render(<AdminAddsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the admin accommodation form', () => {
    render(<AdminAddsA />)
    const addElements = screen.getAllByText(/Add New Accommodation/i)
    expect(addElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/Accommodation Management/i)).toBeTruthy()
  })

  it('displays mock accommodation data', () => {
    render(<AdminAddsA />)
    expect(screen.getByText(/Cliffside B&B/i)).toBeTruthy()
    expect(screen.getByText(/Connemara Castle Hotel/i)).toBeTruthy()
    expect(screen.getByText(/Seaside Cottage/i)).toBeTruthy()
    expect(screen.getByText(/Mountain View Hostel/i)).toBeTruthy()
    expect(screen.getByText(/Harbour House Apartment/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminAddsA />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="adminaddsa"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="adminaddsa-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-type"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-address"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-description"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-price"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-imageurl"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="adminaddsa-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-edit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-delete"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="adminaddsa-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="adminaddsa-item"]').length).toBeGreaterThan(0)
    
    // Amenity checkboxes
    expect(document.querySelector('[data-testid="adminaddsa-amenity-wifi"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-amenity-parking"]')).toBeTruthy()
  })

  it('displays existing accommodations with correct count', () => {
    render(<AdminAddsA />)
    expect(screen.getByText(/Existing Accommodations \(6\)/i)).toBeTruthy()
  })

  it('displays form fields with correct labels', () => {
    render(<AdminAddsA />)
    expect(screen.getByLabelText(/Name \*/i)).toBeTruthy()
    expect(screen.getByLabelText(/Type \*/i)).toBeTruthy()
    expect(screen.getByLabelText(/Address \*/i)).toBeTruthy()
    expect(screen.getByLabelText(/Description \*/i)).toBeTruthy()
    expect(screen.getByLabelText(/Price per Night \(€\) \*/i)).toBeTruthy()
  })
})
