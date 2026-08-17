import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemFlagsExpired from './SystemFlagsExpired'

describe('SystemFlagsExpired', () => {
  it('renders without crashing', () => {
    render(<SystemFlagsExpired />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data with expired memberships', () => {
    render(<SystemFlagsExpired />)
    // Check for member names
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Mike Davis')).toBeTruthy()
    expect(screen.getByText('Emily Brown')).toBeTruthy()
    expect(screen.getByText('David Wilson')).toBeTruthy()
  })

  it('displays statistics cards', () => {
    render(<SystemFlagsExpired />)
    expect(screen.getByText('Total Expired')).toBeTruthy()
    expect(screen.getByText('Flagged')).toBeTruthy()
    expect(screen.getByText('Unflagged')).toBeTruthy()
    expect(screen.getByText('Critical (30+ days)')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SystemFlagsExpired />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="systemflagsexpired"]')
    expect(mainWrapper).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="systemflagsexpired-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items
    const listItems = document.querySelectorAll('[data-testid="systemflagsexpired-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Filter select
    const filterSelect = document.querySelector('[data-testid="systemflagsexpired-filter"]')
    expect(filterSelect).toBeTruthy()
    
    // Sort select
    const sortSelect = document.querySelector('[data-testid="systemflagsexpired-sort"]')
    expect(sortSelect).toBeTruthy()
    
    // Flag all button
    const flagAllButton = document.querySelector('[data-testid="systemflagsexpired-flag-all"]')
    expect(flagAllButton).toBeTruthy()
    
    // Toggle flag buttons
    const toggleFlagButtons = document.querySelectorAll('[data-testid="systemflagsexpired-toggle-flag"]')
    expect(toggleFlagButtons.length).toBeGreaterThan(0)
    
    // Send reminder buttons
    const reminderButtons = document.querySelectorAll('[data-testid="systemflagsexpired-send-reminder"]')
    expect(reminderButtons.length).toBeGreaterThan(0)
  })

  it('shows flagged status badges', () => {
    render(<SystemFlagsExpired />)
    const flaggedBadges = screen.getAllByText('FLAGGED')
    expect(flaggedBadges.length).toBeGreaterThan(0)
  })

  it('displays critical alerts for memberships expired over 30 days', () => {
    render(<SystemFlagsExpired />)
    const criticalAlerts = document.querySelectorAll('.bg-red-50')
    expect(criticalAlerts.length).toBeGreaterThan(0)
  })

  it('renders control buttons for each membership', () => {
    render(<SystemFlagsExpired />)
    const sendReminderButtons = screen.getAllByText('Send Reminder')
    expect(sendReminderButtons.length).toBeGreaterThan(0)
  })
})
