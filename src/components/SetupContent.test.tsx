import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupContent from './SetupContent'

describe('SetupContent', () => {
  it('renders without crashing', () => {
    render(<SetupContent />)
    expect(document.body).toBeTruthy()
  })

  it('displays the content moderation workflow title', () => {
    render(<SetupContent />)
    expect(screen.getByText('Content Moderation Workflow')).toBeTruthy()
  })

  it('displays mock content items', () => {
    render(<SetupContent />)
    expect(screen.getByText('Amazing Experience at Cliffs of Moher')).toBeTruthy()
    expect(screen.getByText('Best Fish & Chips in Galway')).toBeTruthy()
    expect(screen.getByText('Aran Islands Day Trip Guide')).toBeTruthy()
  })

  it('displays statistics for pending, approved, and rejected content', () => {
    render(<SetupContent />)
    expect(screen.getByText('Pending Review')).toBeTruthy()
    expect(screen.getAllByText('Approved').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rejected').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<SetupContent />)
    // Main wrapper
    expect(document.querySelector('[data-testid="setupcontent"]')).toBeTruthy()
    // Filter select
    expect(document.querySelector('[data-testid="setupcontent-filter"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="setupcontent-list"]')).toBeTruthy()
    // List items
    expect(document.querySelectorAll('[data-testid="setupcontent-item"]').length).toBeGreaterThan(0)
    // Action buttons (approve, reject, view)
    expect(document.querySelectorAll('[data-testid="setupcontent-approve"]').length).toBeGreaterThan(0)
    expect(document.querySelectorAll('[data-testid="setupcontent-reject"]').length).toBeGreaterThan(0)
  })

  it('filters content by status', () => {
    render(<SetupContent />)
    const filterSelect = screen.getByTestId('setupcontent-filter') as HTMLSelectElement
    
    // Filter to pending only
    fireEvent.change(filterSelect, { target: { value: 'pending' } })
    expect(filterSelect.value).toBe('pending')
  })

  it('approves content when approve button is clicked', () => {
    render(<SetupContent />)
    const approveButtons = screen.getAllByTestId('setupcontent-approve')
    const initialApprovedCount = screen.getAllByText('Content approved and published').length
    
    // Click first approve button
    fireEvent.click(approveButtons[0])
    
    // Check that the approved status count increased
    expect(screen.getAllByText('Content approved and published').length).toBe(initialApprovedCount + 1)
  })

  it('rejects content when reject button is clicked', () => {
    render(<SetupContent />)
    const rejectButtons = screen.getAllByTestId('setupcontent-reject')
    
    // Click first reject button
    fireEvent.click(rejectButtons[0])
    
    // Check that at least one rejected status is shown
    expect(document.body.textContent).toContain('Content rejected')
  })

  it('displays author and submission date for each item', () => {
    render(<SetupContent />)
    expect(screen.getByText(/Sarah O'Connor/)).toBeTruthy()
    expect(screen.getByText(/2026-08-20/)).toBeTruthy()
  })

  it('displays content type badges', () => {
    render(<SetupContent />)
    expect(screen.getAllByText('review').length).toBeGreaterThan(0)
    expect(screen.getAllByText('blog').length).toBeGreaterThan(0)
  })
})
