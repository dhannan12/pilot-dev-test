import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays the database schema manager title', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Schema Manager')).toBeTruthy()
  })

  it('displays mock tables', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('memberships')).toBeTruthy()
    expect(screen.getByText('payments')).toBeTruthy()
    expect(screen.getByText('classes')).toBeTruthy()
    expect(screen.getByText('bookings')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    
    // Primary button - create table
    expect(document.querySelector('[data-testid="createdatabase-create-table"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="createdatabase-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="createdatabase-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Delete buttons
    expect(document.querySelector('[data-testid="createdatabase-delete-table"]')).toBeTruthy()
  })

  it('has all required form input testids', () => {
    render(<CreateDatabase />)
    
    // Verify data-testid exists on interactive elements
    const testIds = [
      'createdatabase',
      'createdatabase-create-table',
      'createdatabase-list',
      'createdatabase-item',
      'createdatabase-delete-table'
    ]
    
    testIds.forEach(testId => {
      expect(document.querySelector(`[data-testid="${testId}"]`)).toBeTruthy()
    })
  })
})
