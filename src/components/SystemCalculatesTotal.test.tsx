import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemCalculatesTotal from './SystemCalculatesTotal'

describe('SystemCalculatesTotal', () => {
  it('renders without crashing', () => {
    render(<SystemCalculatesTotal />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with time entries', () => {
    render(<SystemCalculatesTotal />)
    
    // Check for header
    expect(screen.getByText('Billable Hours Summary')).toBeTruthy()
    
    // Check for case names in the data (use getAllByText since they appear multiple times)
    expect(screen.getAllByText(/Smith v. Johnson Corp/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Tech Solutions LLC v. DataCorp/i).length).toBeGreaterThan(0)
  })

  it('calculates and displays total hours correctly', () => {
    render(<SystemCalculatesTotal />)
    
    // Total hours should be 4.5 + 6.0 + 3.5 + 5.5 + 8.0 + 2.5 + 4.0 = 34.0
    expect(screen.getAllByText('34.0').length).toBeGreaterThan(0)
    expect(screen.getByText('hours logged this month')).toBeTruthy()
  })

  it('calculates and displays total billable amount', () => {
    render(<SystemCalculatesTotal />)
    
    // Check that total billable is displayed
    // 4.5*350 + 6*400 + 3.5*350 + 5.5*325 + 8*400 + 2.5*300 + 4*350 = 12,337.5
    // The value is split by toLocaleString(), so we need to search more flexibly
    expect(screen.getByText('Total Billable')).toBeTruthy()
    expect(screen.getByText('in billable revenue')).toBeTruthy()
    // Check that the card exists with data-testid
    const billableCard = document.querySelector('[data-testid="systemcalculatestotal-total-billable-card"]')
    expect(billableCard).toBeTruthy()
    expect(billableCard?.textContent).toContain('12,337')
  })

  it('displays breakdown by case', () => {
    render(<SystemCalculatesTotal />)
    
    expect(screen.getByText('Breakdown by Case')).toBeTruthy()
    expect(screen.getAllByText('Estate of Williams').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rodriguez Personal Injury').length).toBeGreaterThan(0)
  })

  it('displays detailed time entries table', () => {
    render(<SystemCalculatesTotal />)
    
    expect(screen.getByText('Detailed Time Entries')).toBeTruthy()
    expect(screen.getByText('Attorney')).toBeTruthy()
    expect(screen.getByText('Description')).toBeTruthy()
    // Multiple entries for Jennifer Martinez
    expect(screen.getAllByText(/Jennifer Martinez/).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SystemCalculatesTotal />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="systemcalculatestotal"]')).toBeTruthy()
    
    // Summary cards
    expect(document.querySelector('[data-testid="systemcalculatestotal-total-hours-card"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemcalculatestotal-total-billable-card"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemcalculatestotal-avg-rate-card"]')).toBeTruthy()
    
    // Case list
    expect(document.querySelector('[data-testid="systemcalculatestotal-case-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemcalculatestotal-case-item"]')).toBeTruthy()
    
    // Time entries list
    expect(document.querySelector('[data-testid="systemcalculatestotal-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemcalculatestotal-item"]')).toBeTruthy()
  })

  it('renders correct number of time entries', () => {
    render(<SystemCalculatesTotal />)
    
    // Should have 7 time entries
    const items = document.querySelectorAll('[data-testid="systemcalculatestotal-item"]')
    expect(items.length).toBe(7)
  })

  it('displays hourly rates and calculated amounts', () => {
    render(<SystemCalculatesTotal />)
    
    // Check for hourly rates (multiple entries with same rate)
    expect(screen.getAllByText('$350').length).toBeGreaterThan(0)
    expect(screen.getAllByText('$400').length).toBeGreaterThan(0)
    
    // Check for Rate column header
    expect(screen.getByText('Rate')).toBeTruthy()
  })
})
