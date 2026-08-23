import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserNavigates from './UserNavigates'

describe('UserNavigates', () => {
  it('renders without crashing', () => {
    render(<UserNavigates />)
    expect(document.body).toBeTruthy()
  })

  it('displays user profile information', () => {
    render(<UserNavigates />)
    expect(screen.getByText(/Sarah Johnson/i)).toBeTruthy()
    expect(screen.getByText(/sarah.johnson@email.com/i)).toBeTruthy()
    expect(screen.getByText('Reward Points')).toBeTruthy()
  })

  it('displays navigation menu items', () => {
    render(<UserNavigates />)
    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Menu')).toBeTruthy()
    expect(screen.getByText('My Rewards')).toBeTruthy()
    expect(screen.getByText('Order History')).toBeTruthy()
    expect(screen.getByText('Settings')).toBeTruthy()
  })

  it('displays quick actions', () => {
    render(<UserNavigates />)
    expect(screen.getByText('Order Now')).toBeTruthy()
    expect(screen.getByText('Redeem Rewards')).toBeTruthy()
    expect(screen.getByText('Find Store')).toBeTruthy()
    expect(screen.getByText('Special Offers')).toBeTruthy()
    expect(screen.getByText('Refer Friends')).toBeTruthy()
  })

  it('displays recent activity section', () => {
    render(<UserNavigates />)
    expect(screen.getByText('Recent Activity')).toBeTruthy()
    expect(screen.getByText('Caramel Macchiato')).toBeTruthy()
    expect(screen.getByText('Croissant & Latte')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserNavigates />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="usernavigates"]')).toBeTruthy()
    
    // Navigation elements
    expect(document.querySelector('[data-testid="usernavigates-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usernavigates-item"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="usernavigates-profile"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usernavigates-view-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usernavigates-support"]')).toBeTruthy()
    
    // Navigation items
    expect(document.querySelector('[data-testid="usernavigates-nav-1"]')).toBeTruthy()
    
    // Quick actions
    expect(document.querySelector('[data-testid="usernavigates-actions-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usernavigates-action-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usernavigates-action-1"]')).toBeTruthy()
  })
})
