import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserTriesTo from './UserTriesTo'

describe('UserTriesTo', () => {
  it('renders without crashing', () => {
    render(<UserTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<UserTriesTo />)
    
    // Check for main heading
    expect(screen.getByText('Exclusive Museum Events')).toBeTruthy()
    
    // Check for current user name
    expect(screen.getByText("Sarah O'Connor")).toBeTruthy()
    
    // Check for at least 5 events (we have 7 in mock data)
    expect(screen.getByText('Medieval Manuscripts Private Viewing')).toBeTruthy()
    expect(screen.getByText("Curator's Evening: Viking Treasures")).toBeTruthy()
    expect(screen.getByText("Patrons' Gala: Heritage Celebration")).toBeTruthy()
    expect(screen.getByText('Children\'s Workshop: Medieval Crafts')).toBeTruthy()
    expect(screen.getByText('Restoration Lab Behind-the-Scenes')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserTriesTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="usertriesto"]')
    expect(mainWrapper).toBeTruthy()
    
    // Check for list container
    const listContainer = document.querySelector('[data-testid="usertriesto-list"]')
    expect(listContainer).toBeTruthy()
    
    // Check for list items
    const listItems = document.querySelectorAll('[data-testid="usertriesto-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Check for membership level buttons
    const membershipButton = document.querySelector('[data-testid="usertriesto-membership-standard"]')
    expect(membershipButton).toBeTruthy()
    
    // Check for access buttons (should have one for each event)
    const accessButtons = document.querySelectorAll('[data-testid^="usertriesto-access-"]')
    expect(accessButtons.length).toBeGreaterThan(0)
  })

  it('allows user to request access to an event', () => {
    render(<UserTriesTo />)
    
    // Find and click the first access button
    const accessButtons = document.querySelectorAll('[data-testid^="usertriesto-access-"]')
    expect(accessButtons.length).toBeGreaterThan(0)
    
    const firstAccessButton = accessButtons[0] as HTMLElement
    fireEvent.click(firstAccessButton)
    
    // Check that a result appears
    const results = document.querySelectorAll('[data-testid^="usertriesto-result-"]')
    expect(results.length).toBeGreaterThan(0)
  })

  it('changes membership level when button is clicked', () => {
    render(<UserTriesTo />)
    
    // Click VIP membership button
    const vipButton = screen.getByTestId('usertriesto-membership-vip')
    fireEvent.click(vipButton)
    
    // The VIP button should now have active styling
    expect(vipButton.className).toContain('bg-blue-600')
  })

  it('shows appropriate access messages based on membership level', () => {
    render(<UserTriesTo />)
    
    // Start as standard member
    const standardButton = screen.getByTestId('usertriesto-membership-standard')
    fireEvent.click(standardButton)
    
    // Try to access a VIP event (should be denied)
    const vipEventButton = screen.getByTestId('usertriesto-access-evt-002')
    fireEvent.click(vipEventButton)
    
    // Check for denied message
    expect(screen.getByText(/Access denied/)).toBeTruthy()
    
    // Change to VIP membership
    const vipButton = screen.getByTestId('usertriesto-membership-vip')
    fireEvent.click(vipButton)
    
    // Try to access standard event (should be granted if spots available)
    const standardEventButton = screen.getByTestId('usertriesto-access-evt-004')
    fireEvent.click(standardEventButton)
    
    // Check for granted message
    expect(screen.getByText(/Access granted/)).toBeTruthy()
  })
})
