import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserCancelsA from './UserCancelsA'

describe('UserCancelsA', () => {
  it('renders without crashing', () => {
    render(<UserCancelsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock booking data', () => {
    render(<UserCancelsA />)
    expect(screen.getByText('My Class Bookings')).toBeTruthy()
    expect(screen.getAllByText(/Yoga Flow/).length).toBeGreaterThan(0)
    expect(screen.getByText('HIIT Training')).toBeTruthy()
    expect(screen.getByText(/Cancellation Policy/)).toBeTruthy()
  })

  it('shows cancellation policy warning', () => {
    render(<UserCancelsA />)
    expect(screen.getByText(/24 hours in advance/)).toBeTruthy()
    expect(screen.getByText(/cancellation fees/)).toBeTruthy()
  })

  it('displays upcoming and cancelled bookings separately', () => {
    render(<UserCancelsA />)
    expect(screen.getByText('Upcoming Classes')).toBeTruthy()
    expect(screen.getByText('Cancellation History')).toBeTruthy()
  })

  it('opens cancellation modal when cancel button is clicked', () => {
    render(<UserCancelsA />)
    const cancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    fireEvent.click(cancelButtons[0])
    
    expect(screen.getByTestId('usercancelsa-modal')).toBeTruthy()
    expect(screen.getByText('Confirm Cancellation')).toBeTruthy()
  })

  it('shows policy violation warning for late cancellations', () => {
    render(<UserCancelsA />)
    const cancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    fireEvent.click(cancelButtons[0])
    
    expect(screen.getByText(/Policy Violation Warning/)).toBeTruthy()
    expect(screen.getByText(/Cancellation Fee/)).toBeTruthy()
  })

  it('requires acknowledgement checkbox before confirming', () => {
    render(<UserCancelsA />)
    const cancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    fireEvent.click(cancelButtons[0])
    
    const confirmButton = screen.getByTestId('usercancelsa-confirm')
    expect(confirmButton.hasAttribute('disabled')).toBe(true)
    
    const checkbox = screen.getByTestId('usercancelsa-acknowledge')
    fireEvent.click(checkbox)
    
    expect(confirmButton.hasAttribute('disabled')).toBe(false)
  })

  it('closes modal when close button is clicked', () => {
    render(<UserCancelsA />)
    const cancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    fireEvent.click(cancelButtons[0])
    
    expect(screen.getByTestId('usercancelsa-modal')).toBeTruthy()
    
    const closeButton = screen.getByTestId('usercancelsa-close')
    fireEvent.click(closeButton)
    
    expect(screen.queryByTestId('usercancelsa-modal')).toBeNull()
  })

  it('has required data-testid attributes', () => {
    render(<UserCancelsA />)
    
    // Main wrapper
    expect(screen.getByTestId('usercancelsa')).toBeTruthy()
    
    // Lists
    expect(screen.getByTestId('usercancelsa-list')).toBeTruthy()
    expect(screen.getAllByTestId('usercancelsa-item').length).toBeGreaterThan(0)
    
    // Buttons
    expect(screen.getAllByTestId('usercancelsa-cancel').length).toBeGreaterThan(0)
    
    // Open modal to check modal elements
    const cancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    fireEvent.click(cancelButtons[0])
    
    expect(screen.getByTestId('usercancelsa-modal')).toBeTruthy()
    expect(screen.getByTestId('usercancelsa-reason')).toBeTruthy()
    expect(screen.getByTestId('usercancelsa-acknowledge')).toBeTruthy()
    expect(screen.getByTestId('usercancelsa-confirm')).toBeTruthy()
    expect(screen.getByTestId('usercancelsa-close')).toBeTruthy()
  })

  it('processes cancellation and moves booking to history', () => {
    render(<UserCancelsA />)
    
    const initialCancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    const initialCount = initialCancelButtons.length
    
    fireEvent.click(initialCancelButtons[0])
    
    const checkbox = screen.getByTestId('usercancelsa-acknowledge')
    fireEvent.click(checkbox)
    
    const confirmButton = screen.getByTestId('usercancelsa-confirm')
    fireEvent.click(confirmButton)
    
    // Modal should be closed
    expect(screen.queryByTestId('usercancelsa-modal')).toBeNull()
    
    // One less upcoming booking
    const remainingCancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    expect(remainingCancelButtons.length).toBe(initialCount - 1)
  })

  it('allows entering cancellation reason', () => {
    render(<UserCancelsA />)
    const cancelButtons = screen.getAllByTestId('usercancelsa-cancel')
    fireEvent.click(cancelButtons[0])
    
    const reasonTextarea = screen.getByTestId('usercancelsa-reason') as HTMLTextAreaElement
    fireEvent.change(reasonTextarea, { target: { value: 'Emergency came up' } })
    
    expect(reasonTextarea.value).toBe('Emergency came up')
  })
})
