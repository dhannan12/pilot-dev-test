import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SubmitAn from './SubmitAn'

describe('SubmitAn', () => {
  it('renders without crashing', () => {
    render(<SubmitAn />)
    expect(document.body).toBeTruthy()
  })

  it('displays the form title and description', () => {
    render(<SubmitAn />)
    expect(screen.getByText('Submit Absence Report')).toBeTruthy()
    expect(screen.getByText(/Complete this form to notify the school/)).toBeTruthy()
  })

  it('displays mock children in the select dropdown', () => {
    render(<SubmitAn />)
    const childSelect = document.querySelector('[data-testid="submitan-child"]')
    expect(childSelect).toBeTruthy()
    expect(childSelect?.textContent).toContain('Emma Johnson')
    expect(childSelect?.textContent).toContain('Liam Smith')
    expect(childSelect?.textContent).toContain('Olivia Williams')
  })

  it('displays absence reasons in the select dropdown', () => {
    render(<SubmitAn />)
    const reasonSelect = document.querySelector('[data-testid="submitan-reason"]')
    expect(reasonSelect).toBeTruthy()
    expect(reasonSelect?.textContent).toContain('Illness')
    expect(reasonSelect?.textContent).toContain('Medical Appointment')
    expect(reasonSelect?.textContent).toContain('Family Emergency')
  })

  it('displays recent submissions list with at least 5 items', () => {
    render(<SubmitAn />)
    const items = document.querySelectorAll('[data-testid="submitan-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes', () => {
    render(<SubmitAn />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="submitan"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="submitan-child"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submitan-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submitan-reason"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submitan-notes"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="submitan-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submitan-cancel"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="submitan-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="submitan-item"]')).toBeTruthy()
  })
})
