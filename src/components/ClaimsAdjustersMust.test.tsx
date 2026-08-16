import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ClaimsAdjustersMust from './ClaimsAdjustersMust'

describe('ClaimsAdjustersMust', () => {
  it('renders without crashing', () => {
    render(<ClaimsAdjustersMust />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<ClaimsAdjustersMust />)
    expect(screen.getByText('Claims Adjuster Evaluation')).toBeTruthy()
  })

  it('displays mock claims data', () => {
    render(<ClaimsAdjustersMust />)
    // Check for claim numbers from mock data
    expect(screen.getAllByText(/CLM-2024-001/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/CLM-2024-002/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/CLM-2024-003/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/CLM-2024-004/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/CLM-2024-005/).length).toBeGreaterThan(0)
  })

  it('displays claimant names', () => {
    render(<ClaimsAdjustersMust />)
    expect(screen.getAllByText(/John Smith/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Emily Davis/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Michael Brown/).length).toBeGreaterThan(0)
  })

  it('shows adjuster notes for evaluated claims', () => {
    render(<ClaimsAdjustersMust />)
    expect(screen.getByText(/Reviewed all documentation/)).toBeTruthy()
    expect(screen.getByText(/Minor damage confirmed/)).toBeTruthy()
  })

  it('shows message for claims without notes', () => {
    render(<ClaimsAdjustersMust />)
    expect(screen.getAllByText(/No notes provided - evaluation incomplete/).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<ClaimsAdjustersMust />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="claimsadjustersmust"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="claimsadjustersmust-claim-select"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimsadjustersmust-adjuster-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimsadjustersmust-evaluation-status"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimsadjustersmust-notes"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="claimsadjustersmust-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="claimsadjustersmust-reset"]')).toBeTruthy()
    
    // List
    expect(document.querySelector('[data-testid="claimsadjustersmust-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="claimsadjustersmust-item"]').length).toBe(5)
  })

  it('renders form fields correctly', () => {
    render(<ClaimsAdjustersMust />)
    
    // Check for form labels
    expect(screen.getByText(/Select Claim to Evaluate/)).toBeTruthy()
    expect(screen.getAllByText(/Adjuster Name/).length).toBeGreaterThan(0)
    expect(screen.getByText(/Evaluation Decision/)).toBeTruthy()
    expect(screen.getAllByText(/Adjuster Notes/).length).toBeGreaterThan(0)
  })

  it('displays mandatory notes requirement message', () => {
    render(<ClaimsAdjustersMust />)
    expect(screen.getByText(/All evaluated claims must include adjuster notes/)).toBeTruthy()
    expect(screen.getByText(/Required - min 20 characters/)).toBeTruthy()
  })

  it('displays claim statuses correctly', () => {
    render(<ClaimsAdjustersMust />)
    expect(screen.getAllByText('PENDING').length).toBeGreaterThan(0)
    expect(screen.getAllByText('UNDER-REVIEW').length).toBeGreaterThan(0)
    expect(screen.getAllByText('EVALUATED').length).toBeGreaterThan(0)
  })
})
