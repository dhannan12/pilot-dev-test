import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema manager heading', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Schema Manager')).toBeTruthy()
    expect(screen.getByText('Gym Membership Portal - Database Design')).toBeTruthy()
  })

  it('displays mock database tables', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('members')).toBeTruthy()
    expect(screen.getByText('memberships')).toBeTruthy()
    expect(screen.getByText('classes')).toBeTruthy()
    expect(screen.getByText('bookings')).toBeTruthy()
    expect(screen.getByText('payments')).toBeTruthy()
  })

  it('displays stats overview', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Records')).toBeTruthy()
    expect(screen.getByText('Total Fields')).toBeTruthy()
    expect(screen.getByText('Schema Status')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    
    // Input fields (table-name is always visible)
    expect(document.querySelector('[data-testid="createdatabase-table-name"]')).toBeTruthy()
    
    // Buttons (add-table is always visible)
    expect(document.querySelector('[data-testid="createdatabase-add-table"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="createdatabase-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-item"]')).toBeTruthy()
  })

  it('displays table list with descriptions', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Gym member profiles and contact information')).toBeTruthy()
    expect(screen.getByText('Membership plans and subscription tiers')).toBeTruthy()
  })

  it('shows no table selected message initially', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('No Table Selected')).toBeTruthy()
    expect(screen.getByText('Select a table from the list to view and edit its schema')).toBeTruthy()
  })
})
