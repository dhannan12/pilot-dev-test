import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import VisitorAccesses from './VisitorAccesses'

describe('VisitorAccesses', () => {
  it('renders without crashing', () => {
    render(<VisitorAccesses />)
    expect(document.body).toBeTruthy()
  })

  it('displays welcome message and hero content', () => {
    render(<VisitorAccesses />)
    expect(screen.getByText(/Welcome to Our Coffee Shop/i)).toBeTruthy()
    expect(screen.getByText(/Your perfect cup of coffee awaits/i)).toBeTruthy()
  })

  it('displays featured drinks with mock data', () => {
    render(<VisitorAccesses />)
    expect(screen.getByText('Caramel Macchiato')).toBeTruthy()
    expect(screen.getByText('Iced Mocha')).toBeTruthy()
    expect(screen.getByText('Vanilla Latte')).toBeTruthy()
    expect(screen.getByText('Cappuccino')).toBeTruthy()
    expect(screen.getByText('Cold Brew')).toBeTruthy()
  })

  it('displays rewards program benefits', () => {
    render(<VisitorAccesses />)
    expect(screen.getByText('Earn Rewards')).toBeTruthy()
    expect(screen.getByText('Free Birthday Drink')).toBeTruthy()
    expect(screen.getByText('Mobile Ordering')).toBeTruthy()
    expect(screen.getByText('Exclusive Deals')).toBeTruthy()
    expect(screen.getByText('Free Refills')).toBeTruthy()
  })

  it('displays location information', () => {
    render(<VisitorAccesses />)
    expect(screen.getByText('Downtown')).toBeTruthy()
    expect(screen.getByText('Westside')).toBeTruthy()
    expect(screen.getByText('University District')).toBeTruthy()
    expect(screen.getByText('Eastgate')).toBeTruthy()
    expect(screen.getByText('Airport')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<VisitorAccesses />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="visitoraccesses"]')).toBeTruthy()
    
    // Primary action buttons
    expect(document.querySelector('[data-testid="visitoraccesses-join"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-menu"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-signup"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-subscribe"]')).toBeTruthy()
    
    // List containers
    expect(document.querySelector('[data-testid="visitoraccesses-drinks-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-benefits-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-locations-list"]')).toBeTruthy()
    
    // List items
    const drinkItems = document.querySelectorAll('[data-testid="visitoraccesses-drinks-item"]')
    expect(drinkItems.length).toBe(5)
    
    const benefitItems = document.querySelectorAll('[data-testid="visitoraccesses-benefits-item"]')
    expect(benefitItems.length).toBe(5)
    
    const locationItems = document.querySelectorAll('[data-testid="visitoraccesses-locations-item"]')
    expect(locationItems.length).toBe(5)
    
    // Input field
    expect(document.querySelector('[data-testid="visitoraccesses-email"]')).toBeTruthy()
    
    // Order buttons within drink cards
    const orderButtons = document.querySelectorAll('[data-testid="visitoraccesses-order"]')
    expect(orderButtons.length).toBe(5)
  })

  it('renders newsletter subscription section', () => {
    render(<VisitorAccesses />)
    expect(screen.getByText(/Stay Connected/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeTruthy()
  })
})
