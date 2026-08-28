import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWithLow from './UserWithLow'

describe('UserWithLow', () => {
  it('renders without crashing', () => {
    render(<UserWithLow />)
    expect(document.body).toBeTruthy()
  })

  it('displays user profile information', () => {
    render(<UserWithLow />)
    expect(screen.getByText(/Welcome, Jane Smith/i)).toBeTruthy()
    expect(screen.getByText(/Basic Member/i)).toBeTruthy()
    expect(screen.getByText(/Tech Comfort: Low/i)).toBeTruthy()
  })

  it('displays mock content items', () => {
    render(<UserWithLow />)
    expect(screen.getByText('Getting Started Guide')).toBeTruthy()
    expect(screen.getByText('Premium Winter Collection')).toBeTruthy()
    expect(screen.getByText('Basic Style Tips')).toBeTruthy()
    expect(screen.getByText('VIP Designer Showcase')).toBeTruthy()
    expect(screen.getByText('Community Forum')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserWithLow />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userwithlow"]')).toBeTruthy()
    
    // Navigation buttons
    expect(document.querySelector('[data-testid="userwithlow-nav-home"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithlow-nav-browse"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithlow-nav-help"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithlow-nav-upgrade"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="userwithlow-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="userwithlow-item"]').length).toBeGreaterThan(0)
    
    // Access buttons
    expect(document.querySelectorAll('[data-testid="userwithlow-access"]').length).toBeGreaterThan(0)
  })

  it('shows upgrade modal when clicking exclusive content', () => {
    render(<UserWithLow />)
    
    // Find and click an access button for exclusive content
    const accessButtons = document.querySelectorAll('[data-testid="userwithlow-access"]')
    // Click the second item which should be exclusive (Premium Winter Collection)
    fireEvent.click(accessButtons[1])
    
    // Check modal appears
    expect(document.querySelector('[data-testid="userwithlow-modal"]')).toBeTruthy()
    expect(screen.getByText('Premium Content Locked')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithlow-close"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithlow-cancel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithlow-upgrade"]')).toBeTruthy()
  })

  it('closes modal when clicking close button', () => {
    render(<UserWithLow />)
    
    // Open modal
    const accessButtons = document.querySelectorAll('[data-testid="userwithlow-access"]')
    fireEvent.click(accessButtons[1])
    
    // Verify modal is open
    expect(document.querySelector('[data-testid="userwithlow-modal"]')).toBeTruthy()
    
    // Close modal
    const closeButton = document.querySelector('[data-testid="userwithlow-close"]') as HTMLElement
    fireEvent.click(closeButton)
    
    // Verify modal is closed
    expect(document.querySelector('[data-testid="userwithlow-modal"]')).toBeFalsy()
  })

  it('displays premium and regular content differently', () => {
    render(<UserWithLow />)
    
    // Check for premium badges
    expect(screen.getAllByText('Premium').length).toBeGreaterThan(0)
    
    // Check for different button texts
    expect(screen.getAllByText('Access Now').length).toBeGreaterThan(0)
    expect(screen.getAllByText('View Details').length).toBeGreaterThan(0)
  })
})
