import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DashboardDisplaysActive from './DashboardDisplaysActive'

describe('DashboardDisplaysActive', () => {
  it('renders without crashing', () => {
    render(<DashboardDisplaysActive />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<DashboardDisplaysActive />)
    // Check for case numbers
    expect(screen.getByText('CASE-2024-001')).toBeTruthy()
    expect(screen.getByText('CASE-2024-007')).toBeTruthy()
    
    // Check for client names
    expect(screen.getByText('Acme Corporation')).toBeTruthy()
    expect(screen.getByText('Global Tech Industries')).toBeTruthy()
    
    // Check for header
    expect(screen.getByText('Legal Case Tracker Dashboard')).toBeTruthy()
    
    // Check for summary cards (use getAllByText since text appears multiple times)
    const activeCasesElements = screen.getAllByText('Active Cases')
    expect(activeCasesElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Total Billable Hours')).toBeTruthy()
  })

  it('displays active cases count', () => {
    render(<DashboardDisplaysActive />)
    // Should show at least some active cases
    const activeCasesElements = screen.getAllByText('Active Cases')
    expect(activeCasesElements.length).toBeGreaterThan(0)
    // Verify the count is displayed (5 active cases from mock data)
    expect(screen.getByText('5')).toBeTruthy()
  })

  it('displays total billable hours', () => {
    render(<DashboardDisplaysActive />)
    const billableHoursSection = screen.getByText('Total Billable Hours')
    expect(billableHoursSection).toBeTruthy()
    // Verify the calculated total is displayed
    expect(screen.getByText('213.5')).toBeTruthy() // Sum of all mock hours
  })

  it('has required data-testid attributes', () => {
    render(<DashboardDisplaysActive />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="dashboarddisplaysactive"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="dashboarddisplaysactive-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="dashboarddisplaysactive-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="dashboarddisplaysactive-refresh"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="dashboarddisplaysactive-view"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="dashboarddisplaysactive-edit"]')).toBeTruthy()
  })

  it('displays case status badges', () => {
    render(<DashboardDisplaysActive />)
    // Check for status text
    const statusElements = screen.getAllByText(/active|pending|on-hold/i)
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('displays solicitor names', () => {
    render(<DashboardDisplaysActive />)
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('James Patterson')).toBeTruthy()
    expect(screen.getByText('Emma Thompson')).toBeTruthy()
  })

  it('displays case types', () => {
    render(<DashboardDisplaysActive />)
    expect(screen.getByText('Corporate Litigation')).toBeTruthy()
    expect(screen.getByText('Contract Dispute')).toBeTruthy()
    expect(screen.getByText('Property Law')).toBeTruthy()
  })

  it('renders action buttons for each case', () => {
    render(<DashboardDisplaysActive />)
    const viewButtons = document.querySelectorAll('[data-testid="dashboarddisplaysactive-view"]')
    const editButtons = document.querySelectorAll('[data-testid="dashboarddisplaysactive-edit"]')
    
    // Should have view and edit buttons for each case (7 mock cases)
    expect(viewButtons.length).toBe(7)
    expect(editButtons.length).toBe(7)
  })

  it('displays statistics breakdown', () => {
    render(<DashboardDisplaysActive />)
    expect(screen.getByText('Cases by Status')).toBeTruthy()
    expect(screen.getByText('Billable Hours by Status')).toBeTruthy()
  })
})
