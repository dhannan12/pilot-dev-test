import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWithoutActive from './UserWithoutActive'

describe('UserWithoutActive', () => {
  it('renders without crashing', () => {
    render(<UserWithoutActive />)
    expect(document.body).toBeTruthy()
  })

  it('displays access denied message', () => {
    render(<UserWithoutActive />)
    expect(screen.getByText(/Access Denied/i)).toBeTruthy()
    expect(screen.getByText(/don't have an active membership/i)).toBeTruthy()
  })

  it('displays user account information', () => {
    render(<UserWithoutActive />)
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('john.smith@example.com')).toBeTruthy()
    expect(screen.getByText('Inactive')).toBeTruthy()
  })

  it('displays membership plans', () => {
    render(<UserWithoutActive />)
    expect(screen.getByText('Basic Monthly')).toBeTruthy()
    expect(screen.getByText('Premium Monthly')).toBeTruthy()
    expect(screen.getByText('Basic Annual')).toBeTruthy()
    expect(screen.getByText('Premium Annual')).toBeTruthy()
    expect(screen.getByText('Student Monthly')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserWithoutActive />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userwithoutactive"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="userwithoutactive-purchase"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithoutactive-compare"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithoutactive-contact"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithoutactive-faq"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithoutactive-callback"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userwithoutactive-home"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="userwithoutactive-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="userwithoutactive-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays contact support section', () => {
    render(<UserWithoutActive />)
    expect(screen.getByText('Need Help?')).toBeTruthy()
    expect(screen.getByText(/support team is here to help/i)).toBeTruthy()
  })
})
