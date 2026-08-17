import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DailyMenuDisplay from './DailyMenuDisplay'

describe('DailyMenuDisplay', () => {
  it('renders without crashing', () => {
    render(<DailyMenuDisplay />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock menu items', () => {
    render(<DailyMenuDisplay />)
    
    // Check for some menu items
    expect(screen.getByText('Scrambled Eggs & Toast')).toBeTruthy()
    expect(screen.getByText('Chicken Caesar Wrap')).toBeTruthy()
    expect(screen.getByText('Vegetarian Pizza Slice')).toBeTruthy()
    expect(screen.getByText('Fruit Salad Cup')).toBeTruthy()
  })

  it('displays today\'s date and time information', () => {
    render(<DailyMenuDisplay />)
    expect(screen.getByText("Today's Menu")).toBeTruthy()
  })

  it('shows category filters', () => {
    render(<DailyMenuDisplay />)
    expect(screen.getByText('All')).toBeTruthy()
    expect(screen.getByText('Breakfast')).toBeTruthy()
    expect(screen.getByText('Lunch')).toBeTruthy()
    expect(screen.getByText('Snack')).toBeTruthy()
    expect(screen.getByText('Drink')).toBeTruthy()
  })

  it('displays pricing information', () => {
    render(<DailyMenuDisplay />)
    // Check for price format
    expect(screen.getByText('$4.50')).toBeTruthy()
    expect(screen.getByText('$6.75')).toBeTruthy()
  })

  it('shows availability status', () => {
    render(<DailyMenuDisplay />)
    const availableItems = screen.getAllByText('✓ Available')
    expect(availableItems.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<DailyMenuDisplay />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="daily-menu-display"]')).toBeTruthy()
    
    // Category filter
    expect(document.querySelector('[data-testid="daily-menu-display-category-filter"]')).toBeTruthy()
    
    // Category buttons
    expect(document.querySelector('[data-testid="daily-menu-display-category-all"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="daily-menu-display-category-breakfast"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="daily-menu-display-category-lunch"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="daily-menu-display-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="daily-menu-display-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Order buttons
    const orderButtons = document.querySelectorAll('[data-testid^="daily-menu-display-order-"]')
    expect(orderButtons.length).toBeGreaterThan(0)
  })

  it('displays dietary information', () => {
    render(<DailyMenuDisplay />)
    const vegetarianTags = screen.getAllByText('vegetarian')
    expect(vegetarianTags.length).toBeGreaterThan(0)
    const veganTags = screen.getAllByText('vegan')
    expect(veganTags.length).toBeGreaterThan(0)
  })

  it('shows serving times for each item', () => {
    render(<DailyMenuDisplay />)
    expect(screen.getByText('7:00 AM - 9:00 AM')).toBeTruthy()
    const lunchTimes = screen.getAllByText('11:30 AM - 1:30 PM')
    expect(lunchTimes.length).toBeGreaterThan(0)
  })
})
