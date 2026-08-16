import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GenerateAMonthly from './GenerateAMonthly'

describe('GenerateAMonthly', () => {
  it('renders without crashing', () => {
    render(<GenerateAMonthly />)
    expect(document.body).toBeTruthy()
  })

  it('displays the monthly absence report heading', () => {
    render(<GenerateAMonthly />)
    expect(screen.getByText('Monthly Absence Report')).toBeTruthy()
  })

  it('displays student selection dropdown with mock students', () => {
    render(<GenerateAMonthly />)
    expect(screen.getByText('Emma Johnson (10th Grade)')).toBeTruthy()
    expect(screen.getByText('Liam Smith (9th Grade)')).toBeTruthy()
    expect(screen.getByText('Olivia Brown (11th Grade)')).toBeTruthy()
  })

  it('displays month and year selectors', () => {
    render(<GenerateAMonthly />)
    expect(screen.getByLabelText('Month')).toBeTruthy()
    expect(screen.getByLabelText('Year')).toBeTruthy()
  })

  it('has generate report button', () => {
    render(<GenerateAMonthly />)
    const button = screen.getByText('Generate Report')
    expect(button).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<GenerateAMonthly />)
    // verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="generateamonthly"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="generateamonthly-student"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="generateamonthly-month"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="generateamonthly-year"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="generateamonthly-generate"]')).toBeTruthy()
  })
})
