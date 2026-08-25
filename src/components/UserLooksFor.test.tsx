import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserLooksFor from './UserLooksFor'

describe('UserLooksFor', () => {
  it('renders without crashing', () => {
    render(<UserLooksFor />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<UserLooksFor />)
    expect(screen.getByText('Community Engagement Activities')).toBeTruthy()
  })

  it('displays mock activity data', () => {
    render(<UserLooksFor />)
    // Check for specific activities from mock data
    expect(screen.getByText('Heritage Storytelling Workshop')).toBeTruthy()
    expect(screen.getByText('Museum Volunteer Program')).toBeTruthy()
    expect(screen.getByText('Family History Research Day')).toBeTruthy()
    expect(screen.getByText('Young Curators Club')).toBeTruthy()
    expect(screen.getByText('Community Museum Membership')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserLooksFor />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="userlooksfor"]')
    expect(mainWrapper).toBeTruthy()
    
    // Category filter
    const categorySelect = document.querySelector('[data-testid="userlooksfor-category"]')
    expect(categorySelect).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="userlooksfor-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items (should have at least 5)
    const listItems = document.querySelectorAll('[data-testid="userlooksfor-item"]')
    expect(listItems.length).toBeGreaterThanOrEqual(5)
    
    // Buttons
    const learnMoreButtons = document.querySelectorAll('[data-testid="userlooksfor-learn-more"]')
    expect(learnMoreButtons.length).toBeGreaterThan(0)
    
    const registerButtons = document.querySelectorAll('[data-testid="userlooksfor-register"]')
    expect(registerButtons.length).toBeGreaterThan(0)
    
    const contactButton = document.querySelector('[data-testid="userlooksfor-contact"]')
    expect(contactButton).toBeTruthy()
  })

  it('filters activities by category', () => {
    render(<UserLooksFor />)
    
    const categorySelect = screen.getByTestId('userlooksfor-category') as HTMLSelectElement
    
    // Initially should show all activities
    let items = document.querySelectorAll('[data-testid="userlooksfor-item"]')
    const initialCount = items.length
    expect(initialCount).toBeGreaterThanOrEqual(5)
    
    // Filter by workshop
    fireEvent.change(categorySelect, { target: { value: 'workshop' } })
    items = document.querySelectorAll('[data-testid="userlooksfor-item"]')
    expect(items.length).toBeLessThanOrEqual(initialCount)
    
    // Filter by volunteer
    fireEvent.change(categorySelect, { target: { value: 'volunteer' } })
    items = document.querySelectorAll('[data-testid="userlooksfor-item"]')
    expect(items.length).toBeGreaterThanOrEqual(1)
    
    // Back to all
    fireEvent.change(categorySelect, { target: { value: 'all' } })
    items = document.querySelectorAll('[data-testid="userlooksfor-item"]')
    expect(items.length).toBe(initialCount)
  })

  it('opens modal when Learn More is clicked', () => {
    render(<UserLooksFor />)
    
    // Modal should not exist initially
    let modal = document.querySelector('[data-testid="userlooksfor-modal"]')
    expect(modal).toBeNull()
    
    // Click first Learn More button
    const learnMoreButtons = document.querySelectorAll('[data-testid="userlooksfor-learn-more"]')
    fireEvent.click(learnMoreButtons[0])
    
    // Modal should now exist
    modal = document.querySelector('[data-testid="userlooksfor-modal"]')
    expect(modal).toBeTruthy()
    
    // Close button should exist
    const closeButton = document.querySelector('[data-testid="userlooksfor-close"]')
    expect(closeButton).toBeTruthy()
  })

  it('closes modal when close button is clicked', () => {
    render(<UserLooksFor />)
    
    // Open modal
    const learnMoreButtons = document.querySelectorAll('[data-testid="userlooksfor-learn-more"]')
    fireEvent.click(learnMoreButtons[0])
    
    // Verify modal is open
    let modal = document.querySelector('[data-testid="userlooksfor-modal"]')
    expect(modal).toBeTruthy()
    
    // Click close button
    const closeButton = document.querySelector('[data-testid="userlooksfor-close"]')
    if (closeButton) {
      fireEvent.click(closeButton)
    }
    
    // Modal should be closed
    modal = document.querySelector('[data-testid="userlooksfor-modal"]')
    expect(modal).toBeNull()
  })

  it('handles register button click', () => {
    // Mock alert
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
    
    render(<UserLooksFor />)
    
    // Click first register button
    const registerButtons = document.querySelectorAll('[data-testid="userlooksfor-register"]')
    if (registerButtons.length > 0) {
      fireEvent.click(registerButtons[0])
      expect(alertMock).toHaveBeenCalled()
    }
    
    alertMock.mockRestore()
  })

  it('displays activity details correctly', () => {
    render(<UserLooksFor />)
    
    // Check for schedule information
    expect(screen.getByText(/Every Saturday/i)).toBeTruthy()
    
    // Check for fee information
    expect(screen.getByText(/€5 per session/i)).toBeTruthy()
    // Multiple activities have "Free" in their fee, so use getAllByText
    const freeElements = screen.getAllByText(/Free/i)
    expect(freeElements.length).toBeGreaterThan(0)
  })

  it('shows availability indicators for activities with capacity', () => {
    render(<UserLooksFor />)
    
    // Should show availability text (multiple activities have spots)
    const spotsElements = screen.getAllByText(/spots/i)
    expect(spotsElements.length).toBeGreaterThan(0)
  })

  it('displays contact section', () => {
    render(<UserLooksFor />)
    
    expect(screen.getByText('Have Questions?')).toBeTruthy()
    
    const contactButton = screen.getByTestId('userlooksfor-contact')
    expect(contactButton).toBeTruthy()
    expect(contactButton.textContent).toContain('Contact Community Team')
  })
})
