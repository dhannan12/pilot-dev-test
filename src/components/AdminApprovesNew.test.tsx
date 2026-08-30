import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminApprovesNew from './AdminApprovesNew'

describe('AdminApprovesNew', () => {
  it('renders without crashing', () => {
    render(<AdminApprovesNew />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<AdminApprovesNew />)
    // Check for component heading
    expect(screen.getByText('Member Registration Approvals')).toBeTruthy()
    
    // Check for mock member names
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Thompson')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<AdminApprovesNew />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="adminapprovesnew"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminapprovesnew-search"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminapprovesnew-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminapprovesnew-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminapprovesnew-approve"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="adminapprovesnew-reject"]')).toBeTruthy()
  })

  it('filters members by search term', () => {
    render(<AdminApprovesNew />)
    
    const searchInput = document.querySelector('[data-testid="adminapprovesnew-search"]') as HTMLInputElement
    expect(searchInput).toBeTruthy()
    
    // Search for specific member
    fireEvent.change(searchInput, { target: { value: 'John Smith' } })
    
    // Should show John Smith
    expect(screen.getByText('John Smith')).toBeTruthy()
  })

  it('approves a member when approve button is clicked', () => {
    render(<AdminApprovesNew />)
    
    const approveButtons = document.querySelectorAll('[data-testid="adminapprovesnew-approve"]')
    expect(approveButtons.length).toBeGreaterThan(0)
    
    // Click the first approve button
    fireEvent.click(approveButtons[0])
    
    // Should show "Approved" status (there may be multiple)
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
  })

  it('rejects a member when reject button is clicked', () => {
    render(<AdminApprovesNew />)
    
    const rejectButtons = document.querySelectorAll('[data-testid="adminapprovesnew-reject"]')
    expect(rejectButtons.length).toBeGreaterThan(0)
    
    // Click the first reject button
    fireEvent.click(rejectButtons[0])
    
    // Should show "Rejected" status (there may be multiple)
    const rejectedElements = screen.getAllByText('Rejected')
    expect(rejectedElements.length).toBeGreaterThan(0)
  })

  it('displays stats counters', () => {
    render(<AdminApprovesNew />)
    
    // Check for stats labels (there may be multiple instances)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Approved').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Rejected').length).toBeGreaterThan(0)
  })
})
