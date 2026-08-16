import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateRentalDuration from './CalculateRentalDuration'

describe('CalculateRentalDuration', () => {
  it('renders without crashing', () => {
    render(<CalculateRentalDuration />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<CalculateRentalDuration />)
    // Check for rental requests (equipment names appear in multiple places)
    const excavators = screen.getAllByText(/Excavator CAT 320/)
    expect(excavators.length).toBeGreaterThan(0)
    expect(screen.getByText('Rental Requests')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CalculateRentalDuration />)
    // verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="calculaterentalduration"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculaterentalduration-equipment"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculaterentalduration-startdate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculaterentalduration-enddate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculaterentalduration-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculaterentalduration-reset"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculaterentalduration-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="calculaterentalduration-item"]')).toBeTruthy()
  })

  it('displays rental duration calculation form', () => {
    render(<CalculateRentalDuration />)
    expect(screen.getByText('Calculate Rental Duration')).toBeTruthy()
    expect(screen.getByText('New Rental Request')).toBeTruthy()
    expect(screen.getByText('Submit Request')).toBeTruthy()
  })

  it('displays rental requests list', () => {
    render(<CalculateRentalDuration />)
    expect(screen.getByText('Rental Requests')).toBeTruthy()
    // Check for durations in the list
    const durationElements = screen.getAllByText(/\d+ days/)
    expect(durationElements.length).toBeGreaterThan(0)
  })

  it('displays equipment availability', () => {
    render(<CalculateRentalDuration />)
    expect(screen.getByText('Equipment Availability')).toBeTruthy()
    const generators = screen.getAllByText(/Generator 50kW/)
    expect(generators.length).toBeGreaterThan(0)
  })
})
