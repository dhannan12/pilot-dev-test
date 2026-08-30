import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotificationsAreSent from './NotificationsAreSent'

describe('NotificationsAreSent', () => {
  it('renders without crashing', () => {
    render(<NotificationsAreSent />)
    expect(document.body).toBeTruthy()
  })

  it('displays milestone data', () => {
    render(<NotificationsAreSent />)
    expect(screen.getAllByText(/Complete 10 Addition Problems/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Perfect Score on Subtraction Quiz/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Learn Multiplication Tables 1-5/i).length).toBeGreaterThan(0)
  })

  it('displays notification data', () => {
    render(<NotificationsAreSent />)
    expect(screen.getAllByText(/parent@example.com/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/teacher@example.com/i).length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<NotificationsAreSent />)
    
    // Main wrapper
    expect(screen.getByTestId('notificationsaresent')).toBeInTheDocument()
    
    // Filter select
    expect(screen.getByTestId('notificationsaresent-filter')).toBeInTheDocument()
    
    // Lists
    expect(screen.getByTestId('notificationsaresent-list')).toBeInTheDocument()
    expect(screen.getByTestId('notificationsaresent-notification-list')).toBeInTheDocument()
    
    // List items
    const milestoneItems = screen.getAllByTestId('notificationsaresent-item')
    expect(milestoneItems.length).toBeGreaterThan(0)
    
    const notificationItems = screen.getAllByTestId('notificationsaresent-notification-item')
    expect(notificationItems.length).toBeGreaterThan(0)
    
    // Complete button (should exist for pending milestones)
    const completeButtons = screen.getAllByTestId('notificationsaresent-complete')
    expect(completeButtons.length).toBeGreaterThan(0)
  })

  it('filters milestones by status', () => {
    render(<NotificationsAreSent />)
    
    const filterSelect = screen.getByTestId('notificationsaresent-filter')
    
    // Filter to completed only
    fireEvent.change(filterSelect, { target: { value: 'completed' } })
    const completedItems = screen.getAllByTestId('notificationsaresent-item')
    expect(completedItems.length).toBe(4) // 4 completed milestones in mock data
    
    // Filter to pending only
    fireEvent.change(filterSelect, { target: { value: 'pending' } })
    const pendingItems = screen.getAllByTestId('notificationsaresent-item')
    expect(pendingItems.length).toBe(3) // 3 pending milestones in mock data
    
    // Show all
    fireEvent.change(filterSelect, { target: { value: 'all' } })
    const allItems = screen.getAllByTestId('notificationsaresent-item')
    expect(allItems.length).toBe(7) // 7 total milestones
  })

  it('marks milestone as complete and sends notifications', () => {
    render(<NotificationsAreSent />)
    
    // Get initial notification count
    const initialNotifications = screen.getAllByTestId('notificationsaresent-notification-item')
    const initialCount = initialNotifications.length
    
    // Click first "Mark Complete" button
    const completeButtons = screen.getAllByTestId('notificationsaresent-complete')
    fireEvent.click(completeButtons[0])
    
    // Check that notifications increased (2 new notifications per completion)
    const updatedNotifications = screen.getAllByTestId('notificationsaresent-notification-item')
    expect(updatedNotifications.length).toBe(initialCount + 2)
  })
})
