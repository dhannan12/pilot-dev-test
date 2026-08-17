import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkforcePlanningTeam from './WorkforcePlanningTeam'

describe('WorkforcePlanningTeam', () => {
  it('renders without crashing', () => {
    render(<WorkforcePlanningTeam />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Workforce Planning Dashboard')).toBeTruthy()
    expect(screen.getByText(/Monitor application trends in real-time/i)).toBeTruthy()
  })

  it('displays mock department metrics', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getAllByText('Customer Service').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Software Engineering').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sales').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Marketing').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Operations').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Finance').length).toBeGreaterThan(0)
  })

  it('displays summary cards with totals', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText('Total Applications')).toBeTruthy()
    expect(screen.getAllByText('Forecasted Need').length).toBeGreaterThan(0)
    expect(screen.getByText('Gap Analysis')).toBeTruthy()
  })

  it('displays trend alerts', () => {
    render(<WorkforcePlanningTeam />)
    expect(screen.getByText(/Applications up 48%/i)).toBeTruthy()
    expect(screen.getByText(/Forecast shows 8% increase/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<WorkforcePlanningTeam />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="workforce-planning-team"]')).toBeTruthy()
    
    // Filters
    expect(document.querySelector('[data-testid="workforce-planning-team-department-filter"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="workforce-planning-team-time-range"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="workforce-planning-team-refresh"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="workforce-planning-team-metrics-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="workforce-planning-team-alerts-list"]')).toBeTruthy()
    
    // Items
    const metricItems = document.querySelectorAll('[data-testid="workforce-planning-team-metric-item"]')
    expect(metricItems.length).toBeGreaterThan(0)
    
    const alertItems = document.querySelectorAll('[data-testid="workforce-planning-team-alert-item"]')
    expect(alertItems.length).toBeGreaterThan(0)
    
    // Export button
    expect(document.querySelector('[data-testid="workforce-planning-team-export"]')).toBeTruthy()
  })

  it('renders summary cards with data-testid', () => {
    render(<WorkforcePlanningTeam />)
    const summaryCards = document.querySelectorAll('[data-testid="workforce-planning-team-summary-card"]')
    expect(summaryCards.length).toBe(3)
  })

  it('renders status badges for each metric', () => {
    render(<WorkforcePlanningTeam />)
    const statusBadges = document.querySelectorAll('[data-testid="workforce-planning-team-status-badge"]')
    expect(statusBadges.length).toBeGreaterThan(0)
  })
})
