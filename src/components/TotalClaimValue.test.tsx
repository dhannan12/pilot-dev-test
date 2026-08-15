import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TotalClaimValue from './TotalClaimValue'

describe('TotalClaimValue', () => {
  it('renders without crashing', () => {
    render(<TotalClaimValue />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<TotalClaimValue />)
    expect(screen.getByText('Total Claim Value Dashboard')).toBeTruthy()
  })

  it('calculates and displays total claim value', () => {
    render(<TotalClaimValue />)
    const totalElement = screen.getByTestId('totalclaimvalue-total')
    expect(totalElement).toBeTruthy()
    // Verify it displays a currency value
    expect(totalElement.textContent).toMatch(/\$/)
  })

  it('displays individual claims in the list', () => {
    render(<TotalClaimValue />)
    const claimItems = document.querySelectorAll('[data-testid="totalclaimvalue-item"]')
    // Should have at least 5 mock claims
    expect(claimItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays category breakdown', () => {
    render(<TotalClaimValue />)
    const categoryItems = document.querySelectorAll('[data-testid="totalclaimvalue-category-item"]')
    // Should have at least one category
    expect(categoryItems.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<TotalClaimValue />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="totalclaimvalue"]')).toBeTruthy()
    
    // Total display
    expect(document.querySelector('[data-testid="totalclaimvalue-total"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="totalclaimvalue-list"]')).toBeTruthy()
    
    // List items
    expect(document.querySelector('[data-testid="totalclaimvalue-item"]')).toBeTruthy()
    
    // Filter buttons
    expect(document.querySelector('[data-testid="totalclaimvalue-filter-all"]')).toBeTruthy()
    
    // Category items
    expect(document.querySelector('[data-testid="totalclaimvalue-category-item"]')).toBeTruthy()
  })

  it('displays filter buttons for different statuses', () => {
    render(<TotalClaimValue />)
    expect(screen.getByTestId('totalclaimvalue-filter-all')).toBeTruthy()
    expect(screen.getByTestId('totalclaimvalue-filter-approved')).toBeTruthy()
    expect(screen.getByTestId('totalclaimvalue-filter-pending')).toBeTruthy()
    expect(screen.getByTestId('totalclaimvalue-filter-rejected')).toBeTruthy()
  })

  it('displays claim numbers and amounts', () => {
    render(<TotalClaimValue />)
    // Check for claim number pattern
    const claimNumbers = screen.getAllByText(/CLM-2024-\d+/)
    expect(claimNumbers.length).toBeGreaterThan(0)
    // Check for currency formatting in the table
    const table = screen.getByTestId('totalclaimvalue-list')
    expect(table.textContent).toMatch(/\$[\d,]+\.\d{2}/)
  })
})
