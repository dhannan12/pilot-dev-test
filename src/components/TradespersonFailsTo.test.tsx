import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TradespersonFailsTo from './TradespersonFailsTo'

describe('TradespersonFailsTo', () => {
  it('renders without crashing', () => {
    render(<TradespersonFailsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<TradespersonFailsTo />)
    expect(screen.getByText('Overdue Quote Requests')).toBeTruthy()
  })

  it('displays mock overdue quotes', () => {
    render(<TradespersonFailsTo />)
    expect(screen.getByText('Kitchen Renovation')).toBeTruthy()
    expect(screen.getByText('Mike Johnson')).toBeTruthy()
    expect(screen.getByText('Carpenter')).toBeTruthy()
    expect(screen.getByText('Bathroom Plumbing Repair')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<TradespersonFailsTo />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="tradespersonfailsto"]')).toBeTruthy()
    
    // Filter select
    expect(document.querySelector('[data-testid="tradespersonfailsto-urgency-filter"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="tradespersonfailsto-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="tradespersonfailsto-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(document.querySelector('[data-testid="tradespersonfailsto-send-reminder"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="tradespersonfailsto-find-alternative"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="tradespersonfailsto-cancel-request"]')).toBeTruthy()
  })

  it('displays at least 5 mock data items', () => {
    render(<TradespersonFailsTo />)
    const items = document.querySelectorAll('[data-testid="tradespersonfailsto-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('filters quotes by urgency', () => {
    render(<TradespersonFailsTo />)
    
    const filterSelect = screen.getByTestId('tradespersonfailsto-urgency-filter') as HTMLSelectElement
    
    // Filter by high urgency
    fireEvent.change(filterSelect, { target: { value: 'high' } })
    expect(filterSelect.value).toBe('high')
    
    // Filter by medium urgency
    fireEvent.change(filterSelect, { target: { value: 'medium' } })
    expect(filterSelect.value).toBe('medium')
    
    // Filter by low urgency
    fireEvent.change(filterSelect, { target: { value: 'low' } })
    expect(filterSelect.value).toBe('low')
    
    // Back to all
    fireEvent.change(filterSelect, { target: { value: 'all' } })
    expect(filterSelect.value).toBe('all')
  })

  it('shows urgency badges for each quote', () => {
    render(<TradespersonFailsTo />)
    expect(screen.getAllByText('HIGH').length).toBeGreaterThan(0)
  })

  it('displays hours elapsed information', () => {
    render(<TradespersonFailsTo />)
    expect(screen.getByText(/30 hours ago/)).toBeTruthy()
  })

  it('handles send reminder button click', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<TradespersonFailsTo />)
    
    const reminderButtons = screen.getAllByTestId('tradespersonfailsto-send-reminder')
    fireEvent.click(reminderButtons[0])
    
    expect(alertMock).toHaveBeenCalled()
    alertMock.mockRestore()
  })

  it('handles find alternative button click', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<TradespersonFailsTo />)
    
    const alternativeButtons = screen.getAllByTestId('tradespersonfailsto-find-alternative')
    fireEvent.click(alternativeButtons[0])
    
    expect(alertMock).toHaveBeenCalled()
    alertMock.mockRestore()
  })

  it('handles cancel request button click', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<TradespersonFailsTo />)
    
    const cancelButtons = screen.getAllByTestId('tradespersonfailsto-cancel-request')
    fireEvent.click(cancelButtons[0])
    
    expect(alertMock).toHaveBeenCalled()
    alertMock.mockRestore()
  })

  it('displays summary statistics', () => {
    render(<TradespersonFailsTo />)
    expect(screen.getByText('High Urgency')).toBeTruthy()
    expect(screen.getByText('Medium Urgency')).toBeTruthy()
    expect(screen.getByText('Low Urgency')).toBeTruthy()
  })
})
