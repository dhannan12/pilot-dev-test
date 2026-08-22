import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksTheir from './UserChecksTheir'

describe('UserChecksTheir', () => {
  it('renders without crashing', () => {
    render(<UserChecksTheir />)
    expect(document.body).toBeTruthy()
  })

  it('displays engagement score and stats', () => {
    render(<UserChecksTheir />)
    
    // Check for main heading
    expect(screen.getByText('My Health Engagement')).toBeInTheDocument()
    
    // Check for engagement score display
    expect(screen.getByText('Engagement Score')).toBeInTheDocument()
    
    // Check for stats sections
    expect(screen.getByText('Current Streak')).toBeInTheDocument()
    expect(screen.getByText('Longest Streak')).toBeInTheDocument()
    expect(screen.getAllByText('This Week').length).toBeGreaterThan(0)
    expect(screen.getByText('Total Logs')).toBeInTheDocument()
  })

  it('displays mock health logs', () => {
    render(<UserChecksTheir />)
    
    // Check for recent activity section
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    
    // Check that at least some mock data is rendered
    const listItems = document.querySelectorAll('[data-testid="usercheckstheir-item"]')
    expect(listItems.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksTheir />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="usercheckstheir"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercheckstheir-period"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercheckstheir-metric"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercheckstheir-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercheckstheir-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercheckstheir-logmetric"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercheckstheir-viewtrends"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercheckstheir-export"]')).toBeTruthy()
  })

  it('has filter dropdowns', () => {
    render(<UserChecksTheir />)
    
    // Check for period filter
    const periodFilter = screen.getByTestId('usercheckstheir-period')
    expect(periodFilter).toBeInTheDocument()
    
    // Check for metric filter
    const metricFilter = screen.getByTestId('usercheckstheir-metric')
    expect(metricFilter).toBeInTheDocument()
  })

  it('displays action buttons', () => {
    render(<UserChecksTheir />)
    
    // Check for action buttons
    expect(screen.getByTestId('usercheckstheir-logmetric')).toBeInTheDocument()
    expect(screen.getByTestId('usercheckstheir-viewtrends')).toBeInTheDocument()
    expect(screen.getByTestId('usercheckstheir-export')).toBeInTheDocument()
  })
})
