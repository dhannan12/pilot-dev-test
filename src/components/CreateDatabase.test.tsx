import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock database tables', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Tourist Platform Database Schema/i)).toBeTruthy()
    expect(screen.getByText(/Stores tourist visitor information and profiles/i)).toBeTruthy()
    expect(screen.getByText(/Hotels, B&Bs, and lodging options/i)).toBeTruthy()
    expect(screen.getByText(/Tourist booking records/i)).toBeTruthy()
    expect(screen.getByText(/Tours, events, and activities/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-search"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-view"]')).toBeTruthy()
  })

  it('displays table count and total records', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/6 Tables/i)).toBeTruthy()
    expect(screen.getByText(/Total Records/i)).toBeTruthy()
  })

  it('shows all mock tables in the list', () => {
    render(<CreateDatabase />)
    const items = document.querySelectorAll('[data-testid="createdatabase-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('has search input field', () => {
    render(<CreateDatabase />)
    const searchInput = document.querySelector('[data-testid="createdatabase-search"]')
    expect(searchInput).toBeTruthy()
    expect(searchInput?.getAttribute('placeholder')).toContain('Search')
  })
})
