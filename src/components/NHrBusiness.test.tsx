import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NHrBusiness from './NHrBusiness'

describe('NHrBusiness', () => {
  it('renders without crashing', () => {
    render(<NHrBusiness />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title and description', () => {
    render(<NHrBusiness />)
    expect(screen.getByText(/Workforce Trends & Recruitment Analytics/i)).toBeTruthy()
    expect(screen.getByText(/HR Business Partner Dashboard/i)).toBeTruthy()
  })

  it('displays summary cards with metrics', () => {
    render(<NHrBusiness />)
    // Check summary cards exist using data-testid
    expect(document.querySelector('[data-testid="n-hr-business-card-applications"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-card-hires"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-card-conversion"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-card-time-to-hire"]')).toBeTruthy()
  })

  it('displays department metrics table', () => {
    render(<NHrBusiness />)
    expect(screen.getByText(/Department Application Metrics/i)).toBeTruthy()
    // Check that metrics table exists with data
    const metricItems = document.querySelectorAll('[data-testid="n-hr-business-metric-item"]')
    expect(metricItems.length).toBeGreaterThan(0)
  })

  it('displays quarterly growth trends section', () => {
    render(<NHrBusiness />)
    expect(screen.getByText(/Quarterly Growth Trends/i)).toBeTruthy()
  })

  it('displays strategic insights and recommendations', () => {
    render(<NHrBusiness />)
    expect(screen.getByText(/Strategic Insights & Recommendations/i)).toBeTruthy()
    // Check for at least one insight - use getAllByText to avoid ambiguity
    const insights = document.querySelectorAll('[data-testid="n-hr-business-insight-item"]')
    expect(insights.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<NHrBusiness />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="n-hr-business"]')).toBeTruthy()
    
    // Title
    expect(document.querySelector('[data-testid="n-hr-business-title"]')).toBeTruthy()
    
    // Filters
    expect(document.querySelector('[data-testid="n-hr-business-filters"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-department-filter"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-time-range"]')).toBeTruthy()
    
    // Summary cards
    expect(document.querySelector('[data-testid="n-hr-business-summary-cards"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-card-applications"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-card-hires"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-card-conversion"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-card-time-to-hire"]')).toBeTruthy()
    
    // Metrics section
    expect(document.querySelector('[data-testid="n-hr-business-metrics-section"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-metrics-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-metric-item"]')).toBeTruthy()
    
    // Trends section
    expect(document.querySelector('[data-testid="n-hr-business-trends-section"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-trends-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-trend-item"]')).toBeTruthy()
    
    // Insights section
    expect(document.querySelector('[data-testid="n-hr-business-insights-section"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-insights-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-insight-item"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="n-hr-business-actions"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-export"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-schedule"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="n-hr-business-share"]')).toBeTruthy()
  })

  it('displays mock data with at least 5 items', () => {
    render(<NHrBusiness />)
    const metricItems = document.querySelectorAll('[data-testid="n-hr-business-metric-item"]')
    expect(metricItems.length).toBeGreaterThanOrEqual(5)
  })
})
