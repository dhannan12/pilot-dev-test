import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserViews from './UserViews'

describe('UserViews', () => {
  it('renders without crashing', () => {
    render(<UserViews />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<UserViews />)
    expect(screen.getByText('Family-Friendly Events')).toBeTruthy()
    expect(screen.getByText(/Discover exciting activities for children and families/i)).toBeTruthy()
  })

  it('displays mock event data', () => {
    render(<UserViews />)
    // Check for some of the mock events (using getAllByText since titles appear multiple times)
    expect(screen.getAllByText('Pirate Adventure Workshop').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Fairy Tale Story Time').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Ancient Ireland Explorer Day').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserViews />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userviews"]')).toBeTruthy()
    // Category filter
    expect(document.querySelector('[data-testid="userviews-category"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="userviews-list"]')).toBeTruthy()
    // List items (should have at least 5)
    const items = document.querySelectorAll('[data-testid="userviews-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
    // Buttons
    expect(document.querySelector('[data-testid="userviews-book"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userviews-info"]')).toBeTruthy()
  })

  it('displays event details including age range and price', () => {
    render(<UserViews />)
    expect(screen.getByText('5-10 years')).toBeTruthy()
    expect(screen.getByText('€8')).toBeTruthy()
  })

  it('renders category filter dropdown', () => {
    render(<UserViews />)
    const select = screen.getByTestId('userviews-category')
    expect(select).toBeTruthy()
    expect(select.tagName).toBe('SELECT')
  })

  it('displays multiple events with book buttons', () => {
    render(<UserViews />)
    const bookButtons = document.querySelectorAll('[data-testid="userviews-book"]')
    expect(bookButtons.length).toBeGreaterThanOrEqual(5)
  })
})
