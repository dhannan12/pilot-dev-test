import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserCompletesA from './UserCompletesA'

describe('UserCompletesA', () => {
  it('renders without crashing', () => {
    render(<UserCompletesA />)
    expect(document.body).toBeTruthy()
  })

  it('displays purchase confirmation details', () => {
    render(<UserCompletesA />)
    
    // Check for confirmation message
    expect(screen.getByText(/Purchase Complete!/i)).toBeTruthy()
    
    // Check for confirmation number
    expect(screen.getByText(/MUS-2026-08-001234/i)).toBeTruthy()
    
    // Check for customer name
    expect(screen.getByText(/Sarah O'Connor/i)).toBeTruthy()
  })

  it('displays ticket items with prices', () => {
    render(<UserCompletesA />)
    
    // Check for ticket types
    expect(screen.getByText(/Adult General Admission/i)).toBeTruthy()
    expect(screen.getByText(/Child \(5-12 years\)/i)).toBeTruthy()
    
    // Check for total
    expect(screen.getByText(/€42.56/)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserCompletesA />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="usercompletesa"]')
    expect(mainWrapper).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="usercompletesa-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items
    const listItems = document.querySelectorAll('[data-testid="usercompletesa-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(document.querySelector('[data-testid="usercompletesa-download"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercompletesa-print"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercompletesa-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercompletesa-home"]')).toBeTruthy()
  })

  it('handles download receipt action', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<UserCompletesA />)
    
    const downloadButton = screen.getByTestId('usercompletesa-download')
    fireEvent.click(downloadButton)
    
    expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('MUS-2026-08-001234'))
    alertSpy.mockRestore()
  })

  it('handles email receipt action', () => {
    render(<UserCompletesA />)
    
    const emailButton = screen.getByTestId('usercompletesa-email')
    fireEvent.click(emailButton)
    
    // Check for success message
    expect(screen.getByText(/Email Sent!/i)).toBeTruthy()
  })

  it('displays payment summary correctly', () => {
    render(<UserCompletesA />)
    
    // Check for subtotal
    expect(screen.getByText(/€38.00/)).toBeTruthy()
    
    // Check for tax
    expect(screen.getByText(/€4.56/)).toBeTruthy()
    
    // Check for payment method
    expect(screen.getByText(/Visa ending in 4242/i)).toBeTruthy()
  })

  it('displays visit date information', () => {
    render(<UserCompletesA />)
    
    const dates = screen.getAllByText(/2026-09-05/)
    expect(dates.length).toBeGreaterThan(0)
  })
})
