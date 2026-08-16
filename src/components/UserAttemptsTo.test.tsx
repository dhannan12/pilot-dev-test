import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock class data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('High-Intensity Interval Training')).toBeTruthy()
    expect(screen.getByText('Yoga Flow')).toBeTruthy()
    expect(screen.getByText('Spin Class')).toBeTruthy()
    expect(screen.getByText('Boxing Fundamentals')).toBeTruthy()
    expect(screen.getByText('Power Pilates')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    // Main wrapper
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    // List container
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    // List items
    const items = screen.getAllByTestId('userattemptsto-item')
    expect(items.length).toBeGreaterThan(0)
    // Cancel button
    const cancelButton = screen.queryByTestId('userattemptsto-cancel')
    // Book button will appear after selecting a class
    expect(cancelButton).toBeFalsy() // Not visible until a class is selected
  })

  it('shows booking details when a class is selected', () => {
    render(<UserAttemptsTo />)
    const firstClass = screen.getAllByTestId('userattemptsto-item')[0]
    fireEvent.click(firstClass)
    
    // Booking panel should now show buttons
    expect(screen.getByTestId('userattemptsto-book')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-cancel')).toBeTruthy()
  })

  it('displays error message when attempting to book a full class', async () => {
    render(<UserAttemptsTo />)
    
    // Select first class (which is full)
    const firstClass = screen.getAllByTestId('userattemptsto-item')[0]
    fireEvent.click(firstClass)
    
    // Click book button
    const bookButton = screen.getByTestId('userattemptsto-book')
    fireEvent.click(bookButton)
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByTestId('userattemptsto-error')).toBeTruthy()
    })
    
    expect(screen.getByText(/Unable to book/)).toBeTruthy()
    expect(screen.getByText(/reached its maximum capacity/)).toBeTruthy()
  })

  it('shows waitlist button after booking fails', async () => {
    render(<UserAttemptsTo />)
    
    // Select first class
    const firstClass = screen.getAllByTestId('userattemptsto-item')[0]
    fireEvent.click(firstClass)
    
    // Click book button
    const bookButton = screen.getByTestId('userattemptsto-book')
    fireEvent.click(bookButton)
    
    // Wait for waitlist button to appear
    await waitFor(() => {
      expect(screen.getByTestId('userattemptsto-waitlist')).toBeTruthy()
    })
  })

  it('allows user to join waitlist after failed booking', async () => {
    render(<UserAttemptsTo />)
    
    // Select first class
    const firstClass = screen.getAllByTestId('userattemptsto-item')[0]
    fireEvent.click(firstClass)
    
    // Click book button
    const bookButton = screen.getByTestId('userattemptsto-book')
    fireEvent.click(bookButton)
    
    // Wait for waitlist button and click it
    await waitFor(() => {
      const waitlistButton = screen.getByTestId('userattemptsto-waitlist')
      fireEvent.click(waitlistButton)
    })
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByTestId('userattemptsto-success')).toBeTruthy()
    })
    
    expect(screen.getByText(/Added to Waitlist/)).toBeTruthy()
  })

  it('shows FULL badge for classes at capacity', () => {
    render(<UserAttemptsTo />)
    const fullBadges = screen.getAllByText('FULL')
    expect(fullBadges.length).toBeGreaterThan(0)
  })

  it('clears selection when cancel button is clicked', () => {
    render(<UserAttemptsTo />)
    
    // Select a class
    const firstClass = screen.getAllByTestId('userattemptsto-item')[0]
    fireEvent.click(firstClass)
    
    // Cancel button should be visible
    const cancelButton = screen.getByTestId('userattemptsto-cancel')
    expect(cancelButton).toBeTruthy()
    
    // Click cancel
    fireEvent.click(cancelButton)
    
    // Book button should no longer be visible
    expect(screen.queryByTestId('userattemptsto-book')).toBeFalsy()
  })
})
