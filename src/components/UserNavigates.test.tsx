import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserNavigates from './UserNavigates'

describe('UserNavigates', () => {
  it('renders without crashing', () => {
    render(<UserNavigates />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock user data', () => {
    render(<UserNavigates />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText(/450 pts/)).toBeTruthy()
  })

  it('displays navigation items including home', () => {
    render(<UserNavigates />)
    // Check navigation items are present (may appear multiple times for desktop/mobile)
    const homeButtons = screen.getAllByText(/Home/)
    expect(homeButtons.length).toBeGreaterThan(0)
    
    const menuButtons = screen.getAllByText(/Menu/)
    expect(menuButtons.length).toBeGreaterThan(0)
    
    const rewardsButtons = screen.getAllByText(/Rewards/)
    expect(rewardsButtons.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserNavigates />)
    // Main wrapper
    expect(document.querySelector('[data-testid="usernavigates"]')).toBeTruthy()
    
    // Navigation list
    expect(document.querySelector('[data-testid="usernavigates-list"]')).toBeTruthy()
    
    // Navigation items
    expect(document.querySelector('[data-testid="usernavigates-item"]')).toBeTruthy()
    
    // Home navigation button (emphasized since story is about navigating to homepage)
    expect(document.querySelector('[data-testid="usernavigates-nav-home"]')).toBeTruthy()
    
    // User menu button
    const userMenuButton = document.querySelector('[data-testid="usernavigates-user-menu"]')
    expect(userMenuButton).toBeTruthy()
    
    // Open the dropdown to reveal additional buttons
    if (userMenuButton) {
      fireEvent.click(userMenuButton)
    }
    
    // Logout button (appears after opening dropdown)
    expect(document.querySelector('[data-testid="usernavigates-logout"]')).toBeTruthy()
  })

  it('displays coffee shop branding', () => {
    render(<UserNavigates />)
    expect(screen.getByText(/BeanHub/)).toBeTruthy()
  })
})
