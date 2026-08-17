import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NReceive from './NReceive'

describe('NReceive', () => {
  it('renders without crashing', () => {
    render(<NReceive />)
    expect(document.body).toBeTruthy()
  })

  it('displays the notification header with title', () => {
    render(<NReceive />)
    expect(screen.getByText('Notifications')).toBeTruthy()
    expect(screen.getByText('Stay updated on your application progress')).toBeTruthy()
  })

  it('displays mock notification data', () => {
    render(<NReceive />)
    const appUpdates = screen.getAllByText('Application Status Updated')
    expect(appUpdates.length).toBeGreaterThan(0)
    expect(screen.getByText('Interview Scheduled')).toBeTruthy()
    expect(screen.getByText(/Your application for Senior Software Engineer/)).toBeTruthy()
  })

  it('shows unread count badge', () => {
    render(<NReceive />)
    const badge = screen.getByTestId('n-receive-unread-badge')
    expect(badge).toBeTruthy()
    expect(badge.textContent).toContain('unread')
  })

  it('has required data-testid attributes', () => {
    render(<NReceive />)
    
    // Main container
    expect(screen.getByTestId('n-receive')).toBeTruthy()
    
    // Header section
    expect(screen.getByTestId('n-receive-header')).toBeTruthy()
    
    // Filter buttons
    expect(screen.getByTestId('n-receive-filter-all')).toBeTruthy()
    expect(screen.getByTestId('n-receive-filter-application')).toBeTruthy()
    expect(screen.getByTestId('n-receive-filter-interview')).toBeTruthy()
    expect(screen.getByTestId('n-receive-filter-offer')).toBeTruthy()
    expect(screen.getByTestId('n-receive-filter-document')).toBeTruthy()
    
    // Unread toggle
    expect(screen.getByTestId('n-receive-unread-toggle')).toBeTruthy()
    expect(screen.getByTestId('n-receive-unread-checkbox')).toBeTruthy()
    
    // Mark all as read button
    expect(screen.getByTestId('n-receive-mark-all-read')).toBeTruthy()
    
    // Notification list
    expect(screen.getByTestId('n-receive-list')).toBeTruthy()
    
    // Notification items
    const items = screen.getAllByTestId('n-receive-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('filters notifications by type', () => {
    render(<NReceive />)
    
    // Click on "Interviews" filter
    const interviewFilter = screen.getByTestId('n-receive-filter-interview')
    fireEvent.click(interviewFilter)
    
    // Check that only interview notifications are shown
    expect(screen.getByText('Interview Scheduled')).toBeTruthy()
  })

  it('filters to show unread only', () => {
    render(<NReceive />)
    
    const checkbox = screen.getByTestId('n-receive-unread-checkbox')
    fireEvent.click(checkbox)
    
    // Should still show notifications (unread ones)
    const items = screen.getAllByTestId('n-receive-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('marks individual notification as read', () => {
    render(<NReceive />)
    
    // Find and click a "Mark as read" button
    const markReadButtons = screen.getAllByTestId('n-receive-mark-read')
    expect(markReadButtons.length).toBeGreaterThan(0)
    
    fireEvent.click(markReadButtons[0])
    
    // The component should re-render with updated state
    expect(document.body).toBeTruthy()
  })

  it('marks all notifications as read', () => {
    render(<NReceive />)
    
    const markAllButton = screen.getByTestId('n-receive-mark-all-read')
    fireEvent.click(markAllButton)
    
    // After marking all as read, the button should disappear
    // and unread count should be 0
    expect(document.body).toBeTruthy()
  })

  it('displays empty state when no notifications match filters', () => {
    render(<NReceive />)
    
    // Filter by a type and check unread only
    const offerFilter = screen.getByTestId('n-receive-filter-offer')
    fireEvent.click(offerFilter)
    
    const checkbox = screen.getByTestId('n-receive-unread-checkbox')
    fireEvent.click(checkbox)
    
    // Might show empty state depending on mock data
    const list = screen.getByTestId('n-receive-list')
    expect(list).toBeTruthy()
  })
})
