import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ManageMy from './ManageMy'

describe('ManageMy', () => {
  it('renders without crashing', () => {
    render(<ManageMy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the dashboard title', () => {
    render(<ManageMy />)
    const title = screen.getByText('Property Management Dashboard')
    expect(title).toBeTruthy()
  })

  it('displays mock property data', () => {
    render(<ManageMy />)
    const property1 = screen.getByText(/123 Maple Street/i)
    const property2 = screen.getByText(/456 Oak Avenue/i)
    expect(property1).toBeTruthy()
    expect(property2).toBeTruthy()
  })

  it('displays rental income calculations', () => {
    render(<ManageMy />)
    const income = screen.getByText('Monthly Income')
    const avgRent = screen.getByText('Average Rent')
    expect(income).toBeTruthy()
    expect(avgRent).toBeTruthy()
  })

  it('displays property status summary', () => {
    render(<ManageMy />)
    const portfolioSection = screen.getByText('Portfolio Summary')
    expect(portfolioSection).toBeTruthy()
    // Check that status labels exist (they appear multiple times, so just check existence)
    expect(document.body.textContent).toContain('Rented')
    expect(document.body.textContent).toContain('Vacant')
    expect(document.body.textContent).toContain('Maintenance')
  })

  it('displays occupancy rate', () => {
    render(<ManageMy />)
    const occupancy = screen.getByText('Occupancy Rate')
    expect(occupancy).toBeTruthy()
  })
})
