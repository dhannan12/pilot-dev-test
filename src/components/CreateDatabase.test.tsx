import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema title', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Database Schema/i)).toBeTruthy()
    expect(screen.getByText(/West Ireland Tourist Platform/i)).toBeTruthy()
  })

  it('displays mock table data', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('attractions')).toBeTruthy()
    expect(screen.getByText('accommodations')).toBeTruthy()
    expect(screen.getByText('restaurants')).toBeTruthy()
    expect(screen.getByText('events')).toBeTruthy()
    expect(screen.getByText('reviews')).toBeTruthy()
  })

  it('shows statistics for tables and fields', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Fields')).toBeTruthy()
    expect(screen.getByText('PostgreSQL')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    
    // View mode buttons
    expect(document.querySelector('[data-testid="createdatabase-view-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-view-visual"]')).toBeTruthy()
    
    // Table list
    expect(document.querySelector('[data-testid="createdatabase-list"]')).toBeTruthy()
    
    // Table items
    const items = document.querySelectorAll('[data-testid="createdatabase-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(document.querySelector('[data-testid="createdatabase-export"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-migrate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-validate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-reset"]')).toBeTruthy()
  })

  it('displays action buttons for schema operations', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Export SQL')).toBeTruthy()
    expect(screen.getByText('Run Migrations')).toBeTruthy()
    expect(screen.getByText('Validate Schema')).toBeTruthy()
    expect(screen.getByText('Reset Database')).toBeTruthy()
  })
})
