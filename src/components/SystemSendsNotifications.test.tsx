import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemSendsNotifications from './SystemSendsNotifications'

describe('SystemSendsNotifications', () => {
  it('renders without crashing', () => {
    render(<SystemSendsNotifications />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SystemSendsNotifications />)
    expect(screen.getByText('Court Date Notifications')).toBeTruthy()
  })

  it('displays mock notifications data', () => {
    render(<SystemSendsNotifications />)
    // Check for case names from mock data
    expect(screen.getByText('Smith v. Johnson Construction')).toBeTruthy()
    expect(screen.getByText('Estate of Williams v. County Tax Board')).toBeTruthy()
    expect(screen.getByText('Rodriguez v. Metropolitan Transit Authority')).toBeTruthy()
  })

  it('displays statistics dashboard', () => {
    render(<SystemSendsNotifications />)
    expect(screen.getByText('Total Notifications')).toBeTruthy()
    // Check for statistics section labels (these appear once in the stats section)
    const sentLabels = screen.getAllByText('Sent')
    expect(sentLabels.length).toBeGreaterThan(0)
    const scheduledLabels = screen.getAllByText('Scheduled')
    expect(scheduledLabels.length).toBeGreaterThan(0)
    const pendingLabels = screen.getAllByText('Pending')
    expect(pendingLabels.length).toBeGreaterThan(0)
    const failedLabels = screen.getAllByText('Failed')
    expect(failedLabels.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SystemSendsNotifications />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="systemsendsnotifications"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="systemsendsnotifications-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="systemsendsnotifications-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Filter selects
    expect(document.querySelector('[data-testid="systemsendsnotifications-status-filter"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="systemsendsnotifications-priority-filter"]')).toBeTruthy()
    
    // Action buttons (at least one should exist)
    const actionButtons = document.querySelectorAll(
      '[data-testid="systemsendsnotifications-resend"], [data-testid="systemsendsnotifications-cancel"], [data-testid="systemsendsnotifications-schedule"]'
    )
    expect(actionButtons.length).toBeGreaterThan(0)
  })

  it('displays notification details correctly', () => {
    render(<SystemSendsNotifications />)
    
    // Check for case numbers
    expect(screen.getByText(/CASE-2024-001/)).toBeTruthy()
    
    // Check for recipient names
    expect(screen.getByText(/John Smith/)).toBeTruthy()
    
    // Check for court dates
    expect(screen.getByText(/2026-08-20/)).toBeTruthy()
  })

  it('shows filter options', () => {
    render(<SystemSendsNotifications />)
    expect(screen.getByText('Filter by Status')).toBeTruthy()
    expect(screen.getByText('Filter by Priority')).toBeTruthy()
  })

  it('displays notification status badges', () => {
    render(<SystemSendsNotifications />)
    const statusBadges = document.querySelectorAll('.border-green-300, .border-blue-300, .border-yellow-300, .border-red-300')
    expect(statusBadges.length).toBeGreaterThan(0)
  })
})
