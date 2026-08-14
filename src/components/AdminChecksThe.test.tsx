import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminChecksThe from './AdminChecksThe'

describe('AdminChecksThe', () => {
  it('renders without crashing', () => {
    render(<AdminChecksThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the admin inbox heading', () => {
    render(<AdminChecksThe />)
    expect(screen.getByText('Admin Inbox')).toBeTruthy()
    expect(screen.getByText('Review and manage submitted contact form messages')).toBeTruthy()
  })

  it('displays mock messages', () => {
    render(<AdminChecksThe />)
    expect(screen.getByText(/Sarah Johnson/)).toBeTruthy()
    expect(screen.getByText(/Michael Chen/)).toBeTruthy()
    expect(screen.getByText(/Emily Rodriguez/)).toBeTruthy()
    expect(screen.getByText(/David Thompson/)).toBeTruthy()
    expect(screen.getByText(/Jessica Martinez/)).toBeTruthy()
  })

  it('displays filter tabs with counts', () => {
    render(<AdminChecksThe />)
    expect(screen.getByText(/All Messages \(7\)/)).toBeTruthy()
    expect(screen.getByText(/New \(2\)/)).toBeTruthy()
    expect(screen.getByText(/Read \(3\)/)).toBeTruthy()
    expect(screen.getByText(/Archived \(2\)/)).toBeTruthy()
  })

  it('filters messages when clicking filter tabs', () => {
    render(<AdminChecksThe />)
    
    // Click on "New" filter
    const newButton = screen.getByText(/New \(2\)/)
    fireEvent.click(newButton)
    
    // Should still show new messages
    expect(screen.getByText(/Sarah Johnson/)).toBeTruthy()
    expect(screen.getByText(/Jessica Martinez/)).toBeTruthy()
  })

  it('displays message details when clicking a message', () => {
    render(<AdminChecksThe />)
    
    // Initially shows the placeholder
    expect(screen.getByText('Select a message to view details')).toBeTruthy()
    
    // Click on a message
    const messageSubject = screen.getByText('Question about product pricing')
    fireEvent.click(messageSubject.closest('div')!)
    
    // Should show the action buttons which only appear in detail view
    expect(screen.getByText('Reply')).toBeTruthy()
    expect(screen.getByText('Mark as Read')).toBeTruthy()
  })

  it('displays status and priority badges', () => {
    render(<AdminChecksThe />)
    expect(screen.getAllByText(/New/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/High Priority/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Medium Priority/i).length).toBeGreaterThan(0)
  })

  it('displays action buttons when message is selected', () => {
    render(<AdminChecksThe />)
    
    // Click on a message
    const messageSubject = screen.getByText('Question about product pricing')
    fireEvent.click(messageSubject.closest('div')!)
    
    // Should show action buttons
    expect(screen.getByText('Reply')).toBeTruthy()
    expect(screen.getByText('Archive')).toBeTruthy()
    expect(screen.getByText('Mark as Read')).toBeTruthy()
  })

  it('closes message detail when clicking close button', () => {
    render(<AdminChecksThe />)
    
    // Click on a message
    const messageSubject = screen.getByText('Question about product pricing')
    fireEvent.click(messageSubject.closest('div')!)
    
    // Should show message details
    expect(screen.getByText('Reply')).toBeTruthy()
    
    // Click close button
    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)
    
    // Should show placeholder again
    expect(screen.getByText('Select a message to view details')).toBeTruthy()
  })
})
