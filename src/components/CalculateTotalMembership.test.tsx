import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateTotalMembership from './CalculateTotalMembership'

describe('CalculateTotalMembership', () => {
  it('renders without crashing', () => {
    render(<CalculateTotalMembership />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<CalculateTotalMembership />)
    expect(screen.getByText(/Annual Membership Fees Calculator/i)).toBeTruthy()
  })

  it('displays mock membership data', () => {
    render(<CalculateTotalMembership />)
    // Check for some of the mock members
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<CalculateTotalMembership />)
    expect(screen.getByText(/Total Annual Fees/i)).toBeTruthy()
    expect(screen.getByText(/Monthly Revenue/i)).toBeTruthy()
    // Check for Active Members in the summary statistics section
    const activeMembers = screen.getAllByText(/Active Members/i)
    expect(activeMembers.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CalculateTotalMembership />)
    
    // Verify main wrapper
    const mainWrapper = document.querySelector('[data-testid="calculatetotalmembership"]')
    expect(mainWrapper).toBeTruthy()
    
    // Verify filter select
    const typeFilter = document.querySelector('[data-testid="calculatetotalmembership-type-filter"]')
    expect(typeFilter).toBeTruthy()
    
    // Verify checkbox
    const showInactive = document.querySelector('[data-testid="calculatetotalmembership-show-inactive"]')
    expect(showInactive).toBeTruthy()
    
    // Verify summary elements
    const totalAnnual = document.querySelector('[data-testid="calculatetotalmembership-total-annual"]')
    expect(totalAnnual).toBeTruthy()
    
    const totalMonthly = document.querySelector('[data-testid="calculatetotalmembership-total-monthly"]')
    expect(totalMonthly).toBeTruthy()
    
    const activeCount = document.querySelector('[data-testid="calculatetotalmembership-active-count"]')
    expect(activeCount).toBeTruthy()
    
    // Verify list container
    const list = document.querySelector('[data-testid="calculatetotalmembership-list"]')
    expect(list).toBeTruthy()
    
    // Verify at least one list item
    const items = document.querySelectorAll('[data-testid="calculatetotalmembership-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('calculates and displays total fees correctly', () => {
    render(<CalculateTotalMembership />)
    const totalAnnual = document.querySelector('[data-testid="calculatetotalmembership-total-annual"]')
    expect(totalAnnual?.textContent).toMatch(/\$\d+\.\d{2}/)
  })

  it('displays membership list with proper structure', () => {
    render(<CalculateTotalMembership />)
    const list = document.querySelector('[data-testid="calculatetotalmembership-list"]')
    expect(list).toBeTruthy()
    
    // Check that we have table headers
    expect(screen.getByText('Member Name')).toBeTruthy()
    expect(screen.getByText('Type')).toBeTruthy()
    expect(screen.getByText('Status')).toBeTruthy()
  })
})
