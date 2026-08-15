import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HrManagerViews from './HrManagerViews'

describe('HrManagerViews', () => {
  it('renders without crashing', () => {
    render(<HrManagerViews />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title', () => {
    render(<HrManagerViews />)
    expect(screen.getByText('Employee Onboarding Dashboard')).toBeTruthy()
  })

  it('displays mock employee data', () => {
    render(<HrManagerViews />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Park')).toBeTruthy()
    expect(screen.getByText('Jessica Martinez')).toBeTruthy()
    expect(screen.getByText('Robert Kim')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<HrManagerViews />)
    // Main wrapper
    expect(document.querySelector('[data-testid="hrmanagerviews"]')).toBeTruthy()
    // Filter select
    expect(document.querySelector('[data-testid="hrmanagerviews-filter"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="hrmanagerviews-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="hrmanagerviews-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays filter dropdown with all options', () => {
    render(<HrManagerViews />)
    const filter = screen.getByTestId('hrmanagerviews-filter')
    expect(filter).toBeTruthy()
    expect(screen.getByText('All Employees')).toBeTruthy()
    expect(screen.getByText('On Track')).toBeTruthy()
    expect(screen.getByText('At Risk')).toBeTruthy()
    expect(screen.getByText('Delayed')).toBeTruthy()
  })

  it('displays at least 6 employee items', () => {
    render(<HrManagerViews />)
    const items = document.querySelectorAll('[data-testid="hrmanagerviews-item"]')
    expect(items.length).toBeGreaterThanOrEqual(6)
  })

  it('shows employee details section', () => {
    render(<HrManagerViews />)
    expect(screen.getByText('Employee Details')).toBeTruthy()
  })
})
