import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TotalClaimsSubmitted from './TotalClaimsSubmitted'

describe('TotalClaimsSubmitted', () => {
  it('renders without crashing', () => {
    render(<TotalClaimsSubmitted />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<TotalClaimsSubmitted />)
    expect(screen.getByText('Total Claims Submitted')).toBeTruthy()
  })

  it('displays mock claims data', () => {
    render(<TotalClaimsSubmitted />)
    // Check for claim numbers
    expect(screen.getByText('CLM-2024-001')).toBeTruthy()
    expect(screen.getByText('CLM-2024-002')).toBeTruthy()
    // Check for policyholder names (multiple instances expected)
    expect(screen.getAllByText('John Smith').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<TotalClaimsSubmitted />)
    expect(screen.getByText('Total Claims')).toBeTruthy()
    expect(screen.getByText('Total Amount')).toBeTruthy()
    // 'Approved' appears in multiple places (dropdown and stats)
    expect(screen.getAllByText('Approved').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<TotalClaimsSubmitted />)
    // Main wrapper
    expect(document.querySelector('[data-testid="total-claims-submitted"]')).toBeTruthy()
    // Filters
    expect(document.querySelector('[data-testid="total-claims-submitted-policyholder"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="total-claims-submitted-status"]')).toBeTruthy()
    // Reset button
    expect(document.querySelector('[data-testid="total-claims-submitted-reset"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="total-claims-submitted-list"]')).toBeTruthy()
    // List items
    expect(document.querySelectorAll('[data-testid="total-claims-submitted-item"]').length).toBeGreaterThan(0)
  })

  it('displays filter controls', () => {
    render(<TotalClaimsSubmitted />)
    expect(screen.getByText('Select Policyholder')).toBeTruthy()
    expect(screen.getByText('Claim Status')).toBeTruthy()
    expect(screen.getByText('All Policyholders')).toBeTruthy()
    expect(screen.getByText('All Statuses')).toBeTruthy()
  })

  it('displays claims in a table format', () => {
    render(<TotalClaimsSubmitted />)
    const table = document.querySelector('table')
    expect(table).toBeTruthy()
    // Check for table headers
    expect(screen.getByText('Claim #')).toBeTruthy()
    expect(screen.getByText('Type')).toBeTruthy()
    expect(screen.getByText('Amount')).toBeTruthy()
  })
})
