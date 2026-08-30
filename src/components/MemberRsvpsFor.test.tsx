import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MemberRsvpsFor from './MemberRsvpsFor'

describe('MemberRsvpsFor', () => {
  it('renders without crashing', () => {
    render(<MemberRsvpsFor />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<MemberRsvpsFor />)
    expect(screen.getByText(/Riverside Tigers/i)).toBeTruthy()
    expect(screen.getByText(/Mountain Lions FC/i)).toBeTruthy()
    expect(screen.getByText(/City United/i)).toBeTruthy()
    expect(screen.getByText(/Lakeside Rangers/i)).toBeTruthy()
    expect(screen.getByText(/Coastal Warriors/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<MemberRsvpsFor />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="memberrsvpsfor"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="memberrsvpsfor-list"]')).toBeTruthy()
    
    // List items (should have at least 5 matches)
    const items = document.querySelectorAll('[data-testid="memberrsvpsfor-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
    
    // RSVP buttons
    expect(document.querySelector('[data-testid="memberrsvpsfor-rsvp-yes"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="memberrsvpsfor-rsvp-no"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="memberrsvpsfor-rsvp-maybe"]')).toBeTruthy()
  })

  it('allows user to RSVP yes to a match', () => {
    render(<MemberRsvpsFor />)
    
    const yesButtons = document.querySelectorAll('[data-testid="memberrsvpsfor-rsvp-yes"]')
    const firstYesButton = yesButtons[0] as HTMLElement
    
    fireEvent.click(firstYesButton)
    
    // Check that the button styling changed (active state)
    expect(firstYesButton.className).toContain('bg-green-600')
  })

  it('allows user to RSVP no to a match', () => {
    render(<MemberRsvpsFor />)
    
    const noButtons = document.querySelectorAll('[data-testid="memberrsvpsfor-rsvp-no"]')
    const firstNoButton = noButtons[0] as HTMLElement
    
    fireEvent.click(firstNoButton)
    
    // Check that the button styling changed (active state)
    expect(firstNoButton.className).toContain('bg-red-600')
  })

  it('allows user to RSVP maybe to a match', () => {
    render(<MemberRsvpsFor />)
    
    const maybeButtons = document.querySelectorAll('[data-testid="memberrsvpsfor-rsvp-maybe"]')
    const firstMaybeButton = maybeButtons[0] as HTMLElement
    
    fireEvent.click(firstMaybeButton)
    
    // Check that the button styling changed (active state)
    expect(firstMaybeButton.className).toContain('bg-yellow-600')
  })

  it('displays match details including date, location, and attendee count', () => {
    render(<MemberRsvpsFor />)
    
    // Check for location (may appear multiple times)
    const locationElements = screen.getAllByText(/Central Sports Complex/i)
    expect(locationElements.length).toBeGreaterThan(0)
    
    // Check for attendee counts
    expect(screen.getByText(/12 attending/i)).toBeTruthy()
    expect(screen.getByText(/18 attending/i)).toBeTruthy()
  })

  it('displays home and away indicators', () => {
    render(<MemberRsvpsFor />)
    
    // Check for HOME and AWAY badges
    const badges = screen.getAllByText(/HOME|AWAY/i)
    expect(badges.length).toBeGreaterThan(0)
  })
})
