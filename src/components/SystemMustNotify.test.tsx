import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemMustNotify from './SystemMustNotify'

describe('SystemMustNotify', () => {
  it('renders without crashing', () => {
    render(<SystemMustNotify />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<SystemMustNotify />)
    expect(screen.getByText('Cancellation Email Notifications')).toBeTruthy()
    expect(screen.getByText(/System automatically notifies customers/i)).toBeTruthy()
  })

  it('displays statistics for notification counts', () => {
    render(<SystemMustNotify />)
    expect(screen.getByText('Total Notifications')).toBeTruthy()
    expect(screen.getAllByText('Sent').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Failed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Retrying').length).toBeGreaterThan(0)
  })

  it('displays mock notification data', () => {
    render(<SystemMustNotify />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Thompson')).toBeTruthy()
    expect(screen.getByText('Jessica Williams')).toBeTruthy()
  })

  it('displays customer emails and booking details', () => {
    render(<SystemMustNotify />)
    expect(screen.getByText('sarah.johnson@email.com')).toBeTruthy()
    expect(screen.getByText('BK-2026-1045')).toBeTruthy()
    expect(screen.getByText('Haircut & Style')).toBeTruthy()
  })

  it('displays notification status badges', () => {
    render(<SystemMustNotify />)
    const statusElements = document.querySelectorAll('.bg-green-100, .bg-yellow-100, .bg-red-100, .bg-blue-100')
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SystemMustNotify />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="systemmustnotify"]')).toBeTruthy()
    
    // Filter select
    expect(document.querySelector('[data-testid="systemmustnotify-status-filter"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="systemmustnotify-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="systemmustnotify-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(document.querySelector('[data-testid="systemmustnotify-view"]')).toBeTruthy()
  })

  it('displays action buttons based on notification status', () => {
    render(<SystemMustNotify />)
    
    // View buttons should be present for all notifications
    const viewButtons = document.querySelectorAll('[data-testid="systemmustnotify-view"]')
    expect(viewButtons.length).toBeGreaterThan(0)
    
    // Check for status-specific buttons
    const allButtons = Array.from(document.querySelectorAll('button'))
    const buttonTexts = allButtons.map(btn => btn.textContent)
    
    // Should have at least one of each action type based on mock data
    expect(buttonTexts.some(text => text?.includes('Retry'))).toBeTruthy()
    expect(buttonTexts.some(text => text?.includes('Send Now'))).toBeTruthy()
  })

  it('displays cancelled by information', () => {
    render(<SystemMustNotify />)
    const allText = document.body.textContent || ''
    expect(allText.includes('Customer')).toBeTruthy()
    expect(allText.includes('Salon')).toBeTruthy()
  })

  it('shows appointment dates and times', () => {
    render(<SystemMustNotify />)
    expect(screen.getByText(/2026-09-15/)).toBeTruthy()
    expect(screen.getByText(/10:00 AM/)).toBeTruthy()
  })

  it('displays failure reasons for failed notifications', () => {
    render(<SystemMustNotify />)
    expect(screen.getByText(/Invalid email address/)).toBeTruthy()
    expect(screen.getByText(/SMTP timeout/)).toBeTruthy()
  })

  it('shows sent timestamps for successful notifications', () => {
    render(<SystemMustNotify />)
    const sentMessages = Array.from(document.querySelectorAll('.text-green-600'))
    const hasSentTimestamp = sentMessages.some(el => el.textContent?.includes('Email sent at'))
    expect(hasSentTimestamp).toBeTruthy()
  })

  it('renders the filter dropdown with all options', () => {
    render(<SystemMustNotify />)
    const select = document.querySelector('[data-testid="systemmustnotify-status-filter"]') as HTMLSelectElement
    expect(select).toBeTruthy()
    
    const options = Array.from(select.querySelectorAll('option'))
    const optionTexts = options.map(opt => opt.textContent)
    
    expect(optionTexts).toContain('All Notifications')
    expect(optionTexts).toContain('Sent')
    expect(optionTexts).toContain('Pending')
    expect(optionTexts).toContain('Retrying')
    expect(optionTexts).toContain('Failed')
  })

  it('displays retry count for failed/retrying notifications', () => {
    render(<SystemMustNotify />)
    const allText = document.body.textContent || ''
    expect(allText.includes('Retry count:')).toBeTruthy()
    expect(allText.includes('Attempt')).toBeTruthy()
  })
})
