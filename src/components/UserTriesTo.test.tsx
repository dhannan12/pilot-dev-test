import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import UserTriesTo from './UserTriesTo'

describe('UserTriesTo', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = ''
  })

  it('renders without crashing', () => {
    render(<UserTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<UserTriesTo />)
    expect(screen.getByText('Book a Class')).toBeTruthy()
    expect(screen.getByText(/Select a class to book/i)).toBeTruthy()
  })

  it('displays mock class data', () => {
    render(<UserTriesTo />)
    
    // Check for class names
    expect(screen.getByText('High-Intensity Interval Training')).toBeTruthy()
    expect(screen.getByText('Yoga Flow')).toBeTruthy()
    expect(screen.getByText('Spin Class')).toBeTruthy()
    expect(screen.getByText('CrossFit Fundamentals')).toBeTruthy()
    expect(screen.getByText('Pilates Core')).toBeTruthy()
  })

  it('shows capacity information for each class', () => {
    render(<UserTriesTo />)
    
    // Check for capacity display (enrolled/capacity format)
    expect(screen.getByText('20/20')).toBeTruthy() // HIIT class is full
    expect(screen.getByText('15/15')).toBeTruthy() // Yoga Flow is full
    expect(screen.getByText('18/25')).toBeTruthy() // Spin Class has spots
  })

  it('has required data-testid attributes', () => {
    render(<UserTriesTo />)
    
    // Main wrapper
    expect(screen.getByTestId('usertriesto')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('usertriesto-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('usertriesto-item')
    expect(items.length).toBeGreaterThan(4) // At least 5 classes
    
    // Book buttons
    const bookButtons = screen.getAllByTestId('usertriesto-book')
    expect(bookButtons.length).toBeGreaterThan(4)
  })

  it('allows booking a class with available capacity', async () => {
    render(<UserTriesTo />)
    
    // Find Spin Class which has capacity (18/25)
    const spinClassCard = screen.getByText('Spin Class').closest('[data-testid="usertriesto-item"]')
    expect(spinClassCard).toBeTruthy()
    
    const bookButton = spinClassCard?.querySelector('[data-testid="usertriesto-book"]')
    expect(bookButton).toBeTruthy()
    
    // Click book button
    fireEvent.click(bookButton!)
    
    // Should show success alert
    await waitFor(() => {
      const alert = screen.getByTestId('usertriesto-alert')
      expect(alert).toBeTruthy()
      expect(alert.textContent).toContain('Successfully booked')
      expect(alert.textContent).toContain('Spin Class')
    })
    
    // Should add to booking history
    const historyItems = screen.getAllByTestId('usertriesto-history-item')
    expect(historyItems.length).toBe(1)
  })

  it('prevents booking a full class', async () => {
    render(<UserTriesTo />)
    
    // Find HIIT class which is full (20/20)
    const hiitCard = screen.getByText('High-Intensity Interval Training').closest('[data-testid="usertriesto-item"]')
    expect(hiitCard).toBeTruthy()
    
    const bookButton = hiitCard?.querySelector('[data-testid="usertriesto-book"]')
    expect(bookButton).toBeTruthy()
    
    // Click book button
    fireEvent.click(bookButton!)
    
    // Should show error alert
    await waitFor(() => {
      const alert = screen.getByTestId('usertriesto-alert')
      expect(alert).toBeTruthy()
      expect(alert.textContent).toContain('Cannot book')
      expect(alert.textContent).toContain('full')
    })
    
    // Should add failed attempt to history
    const historyItems = screen.getAllByTestId('usertriesto-history-item')
    expect(historyItems.length).toBe(1)
    
    // History item should show failure
    expect(historyItems[0].textContent).toContain('maximum capacity')
  })

  it('displays capacity status labels correctly', () => {
    render(<UserTriesTo />)
    
    // Should show FULL status for classes at capacity
    const fullLabels = screen.getAllByText('FULL')
    expect(fullLabels.length).toBeGreaterThan(0)
    
    // Should show status labels (could be Available, Almost Full, Filling Up)
    // At least one class should have capacity information
    expect(screen.getByText('7 spots left')).toBeTruthy() // Spin Class
  })

  it('shows spots remaining for non-full classes', () => {
    render(<UserTriesTo />)
    
    // Spin Class has 7 spots left (25 capacity - 18 enrolled)
    expect(screen.getByText('7 spots left')).toBeTruthy()
    
    // Pilates Core has 4 spots left (18 capacity - 14 enrolled)
    expect(screen.getByText('4 spots left')).toBeTruthy()
  })

  it('displays booking history', async () => {
    render(<UserTriesTo />)
    
    // Initially no history
    expect(screen.getByText('No booking attempts yet')).toBeTruthy()
    
    // Book a class
    const spinClassCard = screen.getByText('Spin Class').closest('[data-testid="usertriesto-item"]')
    const bookButton = spinClassCard?.querySelector('[data-testid="usertriesto-book"]')
    fireEvent.click(bookButton!)
    
    // History should appear
    await waitFor(() => {
      const historyList = screen.getByTestId('usertriesto-history-list')
      expect(historyList).toBeTruthy()
      
      const historyItems = screen.getAllByTestId('usertriesto-history-item')
      expect(historyItems.length).toBe(1)
      expect(historyItems[0].textContent).toContain('Spin Class')
    })
  })

  it('allows clearing booking history', async () => {
    render(<UserTriesTo />)
    
    // Book a class first
    const spinClassCard = screen.getByText('Spin Class').closest('[data-testid="usertriesto-item"]')
    const bookButton = spinClassCard?.querySelector('[data-testid="usertriesto-book"]')
    fireEvent.click(bookButton!)
    
    // Wait for history to appear
    await waitFor(() => {
      expect(screen.getByTestId('usertriesto-history-list')).toBeTruthy()
    })
    
    // Click clear button
    const clearButton = screen.getByTestId('usertriesto-clear-history')
    fireEvent.click(clearButton)
    
    // History should be empty
    await waitFor(() => {
      expect(screen.getByText('No booking attempts yet')).toBeTruthy()
    })
  })

  it('shows instructor information for each class', () => {
    render(<UserTriesTo />)
    
    expect(screen.getByText(/Sarah Johnson/)).toBeTruthy()
    expect(screen.getByText(/Michael Chen/)).toBeTruthy()
    expect(screen.getByText(/Jessica Martinez/)).toBeTruthy()
  })

  it('displays class schedule details', () => {
    render(<UserTriesTo />)
    
    // Check for time slots
    expect(screen.getByText(/6:00 AM/)).toBeTruthy()
    expect(screen.getByText(/9:00 AM/)).toBeTruthy()
    
    // Check for dates (multiple classes have same date, use getAllByText)
    const dates = screen.getAllByText(/2026-08-18/)
    expect(dates.length).toBeGreaterThan(0)
    
    // Check for duration (multiple classes have same duration)
    const fortyFiveMin = screen.getAllByText(/45 min/)
    expect(fortyFiveMin.length).toBeGreaterThan(0)
    const sixtyMin = screen.getAllByText(/60 min/)
    expect(sixtyMin.length).toBeGreaterThan(0)
  })

  it('shows capacity legend', () => {
    render(<UserTriesTo />)
    
    expect(screen.getByText('Capacity Legend')).toBeTruthy()
    expect(screen.getByText(/Available.*0-69%/)).toBeTruthy()
    expect(screen.getByText(/Filling Up.*70-89%/)).toBeTruthy()
    expect(screen.getByText(/Almost Full.*90-99%/)).toBeTruthy()
    expect(screen.getByText(/Full.*100%/)).toBeTruthy()
  })

  it('records multiple booking attempts', async () => {
    render(<UserTriesTo />)
    
    // Book first class (Spin Class - should succeed)
    const spinCard = screen.getByText('Spin Class').closest('[data-testid="usertriesto-item"]')
    const spinButton = spinCard?.querySelector('[data-testid="usertriesto-book"]')
    fireEvent.click(spinButton!)
    
    await waitFor(() => {
      expect(screen.getByTestId('usertriesto-alert')).toBeTruthy()
    })
    
    // Try to book full class (HIIT - should fail)
    const hiitCard = screen.getByText('High-Intensity Interval Training').closest('[data-testid="usertriesto-item"]')
    const hiitButton = hiitCard?.querySelector('[data-testid="usertriesto-book"]')
    fireEvent.click(hiitButton!)
    
    await waitFor(() => {
      const historyItems = screen.getAllByTestId('usertriesto-history-item')
      expect(historyItems.length).toBe(2)
    })
  })
})
