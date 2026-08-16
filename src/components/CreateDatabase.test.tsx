import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema manager header', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Schema Manager')).toBeTruthy()
    expect(screen.getByText(/Volunteer Management System/)).toBeTruthy()
  })

  it('displays all mock database tables', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('volunteers')).toBeTruthy()
    expect(screen.getByText('shifts')).toBeTruthy()
    expect(screen.getByText('attendance')).toBeTruthy()
    expect(screen.getByText('reports')).toBeTruthy()
    expect(screen.getByText('audit_log')).toBeTruthy()
  })

  it('shows table statistics', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Records')).toBeTruthy()
    expect(screen.getByText('Foreign Keys')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="createdatabase-refresh"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-export"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-migrate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-toggle-sql"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="createdatabase-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="createdatabase-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays table column information', () => {
    render(<CreateDatabase />)
    // Check for column-related text using getAllByText for multiple matches
    const columnElements = screen.getAllByText(/columns/)
    expect(columnElements.length).toBeGreaterThan(0)
    const recordElements = screen.getAllByText(/records/)
    expect(recordElements.length).toBeGreaterThan(0)
  })
})
