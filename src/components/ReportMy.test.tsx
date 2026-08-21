import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ReportMy from './ReportMy'

describe('ReportMy', () => {
  it('renders without crashing', () => {
    render(<ReportMy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<ReportMy />)
    expect(screen.getByText('Report My Absence')).toBeTruthy()
  })

  it('displays mock absence records', () => {
    render(<ReportMy />)
    expect(screen.getByText('My Absence History')).toBeTruthy()
    expect(screen.getByText('2026-08-18')).toBeTruthy()
    const illnessElements = screen.getAllByText('Illness')
    expect(illnessElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<ReportMy />)
    
    // Main wrapper
    expect(screen.getByTestId('reportmy')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('reportmy-date')).toBeTruthy()
    expect(screen.getByTestId('reportmy-reason')).toBeTruthy()
    expect(screen.getByTestId('reportmy-notes')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('reportmy-submit')).toBeTruthy()
    expect(screen.getByTestId('reportmy-clear')).toBeTruthy()
    
    // List elements
    expect(screen.getByTestId('reportmy-list')).toBeTruthy()
    const items = screen.getAllByTestId('reportmy-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays all absence reasons in the dropdown', () => {
    render(<ReportMy />)
    const select = screen.getByTestId('reportmy-reason') as HTMLSelectElement
    const options = select.querySelectorAll('option')
    
    // Should have placeholder + 6 reasons
    expect(options.length).toBeGreaterThanOrEqual(6)
  })

  it('displays status badges for absence records', () => {
    render(<ReportMy />)
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Pending')).toBeTruthy()
  })
})
