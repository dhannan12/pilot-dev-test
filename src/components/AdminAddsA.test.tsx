import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminAddsA from './AdminAddsA'

describe('AdminAddsA', () => {
  it('renders without crashing', () => {
    render(<AdminAddsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock accommodations data', () => {
    render(<AdminAddsA />)
    // Check for mock data content
    expect(screen.getByText(/Seaside B&B/i)).toBeTruthy()
    expect(screen.getByText(/Castle View Hotel/i)).toBeTruthy()
    expect(screen.getByText(/Cozy Cottage Retreat/i)).toBeTruthy()
    expect(screen.getByText(/Harbor Inn/i)).toBeTruthy()
    expect(screen.getByText(/Mountain Lodge/i)).toBeTruthy()
  })

  it('displays the add accommodation form', () => {
    render(<AdminAddsA />)
    expect(screen.getByText(/Add New Accommodation/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/e.g., Seaside B&B/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminAddsA />)
    // Main wrapper
    expect(document.querySelector('[data-testid="adminaddsa"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="adminaddsa-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-type"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-description"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-price"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-location"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-amenities"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-capacity"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminaddsa-imageurl"]')).toBeTruthy()
    
    // Submit button
    expect(document.querySelector('[data-testid="adminaddsa-submit"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="adminaddsa-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="adminaddsa-item"]').length).toBeGreaterThan(0)
    
    // Delete buttons
    expect(document.querySelectorAll('[data-testid="adminaddsa-delete"]').length).toBeGreaterThan(0)
  })

  it('displays current accommodations count', () => {
    render(<AdminAddsA />)
    // Should show the count of accommodations
    expect(screen.getByText(/Current Accommodations/i)).toBeTruthy()
  })

  it('shows accommodation management header', () => {
    render(<AdminAddsA />)
    expect(screen.getByText(/Accommodation Management/i)).toBeTruthy()
  })
})
