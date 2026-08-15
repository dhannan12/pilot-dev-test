import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PendingClaimsRequire from './PendingClaimsRequire'

describe('PendingClaimsRequire', () => {
  it('renders without crashing', () => {
    render(<PendingClaimsRequire />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<PendingClaimsRequire />)
    expect(screen.getByText('Pending Claims - Documentation Required')).toBeTruthy()
  })

  it('displays mock claims data', () => {
    render(<PendingClaimsRequire />)
    expect(screen.getByText('CLM-2026-0891')).toBeTruthy()
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('Auto Accident')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<PendingClaimsRequire />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="pendingclaimsrequire"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="pendingclaimsrequire-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="pendingclaimsrequire-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Filter select
    expect(document.querySelector('[data-testid="pendingclaimsrequire-priority"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="pendingclaimsrequire-request"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="pendingclaimsrequire-details"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="pendingclaimsrequire-contact"]')).toBeTruthy()
  })

  it('displays all priority levels', () => {
    render(<PendingClaimsRequire />)
    const highPriority = screen.getAllByText(/HIGH PRIORITY/i)
    expect(highPriority.length).toBeGreaterThan(0)
    const mediumPriority = screen.getAllByText(/MEDIUM PRIORITY/i)
    expect(mediumPriority.length).toBeGreaterThan(0)
    const lowPriority = screen.getAllByText(/LOW PRIORITY/i)
    expect(lowPriority.length).toBeGreaterThan(0)
  })

  it('displays document requirements', () => {
    render(<PendingClaimsRequire />)
    expect(screen.getByText('Police Report')).toBeTruthy()
    expect(screen.getByText('Medical Records')).toBeTruthy()
  })

  it('shows summary statistics', () => {
    render(<PendingClaimsRequire />)
    expect(screen.getByText('Summary')).toBeTruthy()
    const highPriority = screen.getAllByText('High Priority')
    expect(highPriority.length).toBeGreaterThan(0)
    const mediumPriority = screen.getAllByText('Medium Priority')
    expect(mediumPriority.length).toBeGreaterThan(0)
    const lowPriority = screen.getAllByText('Low Priority')
    expect(lowPriority.length).toBeGreaterThan(0)
  })
})
