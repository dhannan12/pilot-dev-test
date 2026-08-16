import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWithAn from './UserWithAn'

describe('UserWithAn', () => {
  it('renders without crashing', () => {
    render(<UserWithAn />)
    expect(document.body).toBeTruthy()
  })

  it('displays expired member information', () => {
    render(<UserWithAn />)
    // Check for member name (appears multiple times)
    const memberNames = screen.getAllByText('Sarah Johnson')
    expect(memberNames.length).toBeGreaterThan(0)
    // Check for expired status
    expect(screen.getByText('EXPIRED')).toBeTruthy()
    // Check for membership type
    expect(screen.getByText('Premium Membership')).toBeTruthy()
  })

  it('displays multiple expired members in the list', () => {
    render(<UserWithAn />)
    // Check that multiple members are displayed
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Thompson')).toBeTruthy()
    expect(screen.getByText('Jessica Williams')).toBeTruthy()
  })

  it('shows check-in button initially', () => {
    render(<UserWithAn />)
    const checkInButton = screen.getByTestId('userwithan-checkin')
    expect(checkInButton).toBeTruthy()
    expect(checkInButton.textContent).toContain('Attempt Check-In')
  })

  it('has required data-testid attributes', () => {
    render(<UserWithAn />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="userwithan"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithan-checkin"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithan-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithan-item"]')).toBeTruthy()
  })

  it('displays expiry date and days expired', () => {
    render(<UserWithAn />)
    // Check for expiry information
    expect(screen.getByText('2026-07-15')).toBeTruthy()
    expect(screen.getByText('32 days')).toBeTruthy()
  })

  it('shows member selection list with all members', () => {
    render(<UserWithAn />)
    const memberList = screen.getByTestId('userwithan-list')
    expect(memberList).toBeTruthy()
    
    // Verify all member items are present
    const memberItems = document.querySelectorAll('[data-testid="userwithan-item"]')
    expect(memberItems.length).toBe(5)
  })

  it('displays member details grid', () => {
    render(<UserWithAn />)
    // Check for various member detail labels
    expect(screen.getByText('Membership Type')).toBeTruthy()
    expect(screen.getByText('Expiry Date')).toBeTruthy()
    expect(screen.getByText('Days Expired')).toBeTruthy()
    expect(screen.getByText('Last Check-In')).toBeTruthy()
    expect(screen.getByText('Member Since')).toBeTruthy()
  })

  it('has data-testid on all interactive elements', () => {
    render(<UserWithAn />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userwithan"]')).toBeTruthy()
    
    // Check-in button
    expect(document.querySelector('[data-testid="userwithan-checkin"]')).toBeTruthy()
    
    // Member list
    expect(document.querySelector('[data-testid="userwithan-list"]')).toBeTruthy()
    
    // Member items
    const items = document.querySelectorAll('[data-testid="userwithan-item"]')
    expect(items.length).toBeGreaterThan(0)
  })
})
