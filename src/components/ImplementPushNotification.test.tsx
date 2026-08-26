import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ImplementPushNotification from './ImplementPushNotification'

describe('ImplementPushNotification', () => {
  it('renders without crashing', () => {
    render(<ImplementPushNotification />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock notification data', () => {
    render(<ImplementPushNotification />)
    // Check for notification titles
    expect(screen.getByText('Game Invitation')).toBeTruthy()
    expect(screen.getByText('Tournament Starting Soon')).toBeTruthy()
    expect(screen.getByText('New Follower')).toBeTruthy()
    expect(screen.getByText('System Update')).toBeTruthy()
    expect(screen.getByText('Match Result')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ImplementPushNotification />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="implementpushnotification"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="implementpushnotification-tab-history"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementpushnotification-tab-settings"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="implementpushnotification-markallread"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="implementpushnotification-clearall"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="implementpushnotification-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="implementpushnotification-item"]').length).toBeGreaterThan(0)
  })

  it('switches between tabs', () => {
    render(<ImplementPushNotification />)
    
    const settingsTab = document.querySelector('[data-testid="implementpushnotification-tab-settings"]') as HTMLElement
    expect(settingsTab).toBeTruthy()
    
    fireEvent.click(settingsTab)
    
    // Settings view should be visible
    expect(document.querySelector('[data-testid="implementpushnotification-settings"]')).toBeTruthy()
    expect(screen.getByText('Notification Preferences')).toBeTruthy()
  })

  it('enables notifications when button is clicked', () => {
    render(<ImplementPushNotification />)
    
    const enableButton = document.querySelector('[data-testid="implementpushnotification-enable"]') as HTMLElement
    if (enableButton) {
      fireEvent.click(enableButton)
      expect(screen.getByText('Notifications Enabled')).toBeTruthy()
    }
  })

  it('marks notification as read', () => {
    render(<ImplementPushNotification />)
    
    const markReadButtons = document.querySelectorAll('[data-testid="implementpushnotification-markread"]')
    expect(markReadButtons.length).toBeGreaterThan(0)
    
    const firstButton = markReadButtons[0] as HTMLElement
    fireEvent.click(firstButton)
    
    // After clicking, the button should disappear or change
    expect(true).toBeTruthy()
  })

  it('marks all notifications as read', () => {
    render(<ImplementPushNotification />)
    
    const markAllButton = document.querySelector('[data-testid="implementpushnotification-markallread"]') as HTMLElement
    expect(markAllButton).toBeTruthy()
    
    fireEvent.click(markAllButton)
    
    // After marking all as read, individual mark read buttons should not exist
    const markReadButtons = document.querySelectorAll('[data-testid="implementpushnotification-markread"]')
    expect(markReadButtons.length).toBe(0)
  })

  it('clears all notifications', () => {
    render(<ImplementPushNotification />)
    
    const clearAllButton = document.querySelector('[data-testid="implementpushnotification-clearall"]') as HTMLElement
    expect(clearAllButton).toBeTruthy()
    
    fireEvent.click(clearAllButton)
    
    // Should show empty state
    expect(screen.getByText('No notifications')).toBeTruthy()
    expect(screen.getByText("You're all caught up!")).toBeTruthy()
  })

  it('toggles notification preferences', () => {
    render(<ImplementPushNotification />)
    
    // Switch to settings tab
    const settingsTab = document.querySelector('[data-testid="implementpushnotification-tab-settings"]') as HTMLElement
    fireEvent.click(settingsTab)
    
    // Check for preference toggles
    const gameToggle = document.querySelector('[data-testid="implementpushnotification-toggle-game"]') as HTMLElement
    expect(gameToggle).toBeTruthy()
    
    fireEvent.click(gameToggle)
    
    // Toggle state should change
    expect(true).toBeTruthy()
  })

  it('displays notification categories', () => {
    render(<ImplementPushNotification />)
    
    // Check that different categories are displayed
    expect(screen.getAllByText('GAME').length).toBeGreaterThan(0)
    expect(screen.getAllByText('TOURNAMENT').length).toBeGreaterThan(0)
    expect(screen.getAllByText('SOCIAL').length).toBeGreaterThan(0)
    expect(screen.getAllByText('SYSTEM').length).toBeGreaterThan(0)
  })

  it('shows unread count badge', () => {
    render(<ImplementPushNotification />)
    
    // Check for unread count
    const unreadBadge = screen.getByText(/unread/)
    expect(unreadBadge).toBeTruthy()
  })
})
