import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data for tables and migrations', () => {
    render(<CreateDatabase />)
    // Check for component title
    expect(screen.getByText('Database Schema Manager')).toBeTruthy()
    
    // Check for mock tables
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('products')).toBeTruthy()
    expect(screen.getByText('orders')).toBeTruthy()
    expect(screen.getByText('rewards')).toBeTruthy()
    expect(screen.getByText('inventory')).toBeTruthy()
    
    // Check for migration history
    expect(screen.getByText('Migration History')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="createdatabase-tables-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-migrations-list"]')).toBeTruthy()
    
    // List items
    expect(document.querySelector('[data-testid="createdatabase-table-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-migration-item"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="createdatabase-create-table"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-run-migrations"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-rollback"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-export"]')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<CreateDatabase />)
    
    // Check for summary cards
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Completed Migrations')).toBeTruthy()
    expect(screen.getByText('Pending Migrations')).toBeTruthy()
    
    // Check for counts (using getAllByText for numbers that might appear multiple times)
    expect(screen.getByText('5')).toBeTruthy() // 5 tables
    expect(screen.getByText('4')).toBeTruthy() // 4 completed migrations
    const oneElements = screen.getAllByText('1')
    expect(oneElements.length).toBeGreaterThan(0) // 1 appears in pending migrations count
  })

  it('displays migration statuses correctly', () => {
    render(<CreateDatabase />)
    
    // Check for completed status
    const completedElements = screen.getAllByText('completed')
    expect(completedElements.length).toBe(4)
    
    // Check for pending status
    expect(screen.getByText('pending')).toBeTruthy()
  })
})
