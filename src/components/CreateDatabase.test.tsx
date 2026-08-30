import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema manager header', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Database Schema Manager/i)).toBeTruthy()
  })

  it('displays mock tables in the list', () => {
    render(<CreateDatabase />)
    // Use getAllByText because table names appear both in list and detail view
    expect(screen.getAllByText('users').length).toBeGreaterThan(0)
    expect(screen.getByText('members')).toBeTruthy()
    expect(screen.getByText('bookings')).toBeTruthy()
    expect(screen.getByText('facilities')).toBeTruthy()
    expect(screen.getByText('payments')).toBeTruthy()
    expect(screen.getByText('coaches')).toBeTruthy()
  })

  it('displays table columns when a table is selected', () => {
    render(<CreateDatabase />)
    // users table should be selected by default
    expect(screen.getByText('id')).toBeTruthy()
    expect(screen.getByText('email')).toBeTruthy()
    expect(screen.getByText('username')).toBeTruthy()
  })

  it('switches between tables and migrations tabs', () => {
    render(<CreateDatabase />)
    
    const migrationsTab = screen.getByTestId('createdatabase-tab-migrations')
    fireEvent.click(migrationsTab)
    
    expect(screen.getByText(/Migration History/i)).toBeTruthy()
    expect(screen.getByText('Create users table')).toBeTruthy()
  })

  it('displays migration status badges', () => {
    render(<CreateDatabase />)
    
    const migrationsTab = screen.getByTestId('createdatabase-tab-migrations')
    fireEvent.click(migrationsTab)
    
    const statusBadges = screen.getAllByText(/APPLIED|PENDING/i)
    expect(statusBadges.length).toBeGreaterThan(0)
  })

  it('allows selecting different tables', () => {
    render(<CreateDatabase />)
    
    const membersButton = screen.getByTestId('createdatabase-select-members')
    fireEvent.click(membersButton)
    
    // Check that members table columns are displayed
    expect(screen.getByText('user_id')).toBeTruthy()
    expect(screen.getByText('membership_type')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(screen.getByTestId('createdatabase')).toBeTruthy()
    
    // Tab buttons
    expect(screen.getByTestId('createdatabase-tab-tables')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-tab-migrations')).toBeTruthy()
    
    // List containers
    expect(screen.getByTestId('createdatabase-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('createdatabase-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Switch to migrations tab to check migration-specific testids
    const migrationsTab = screen.getByTestId('createdatabase-tab-migrations')
    fireEvent.click(migrationsTab)
    
    expect(screen.getByTestId('createdatabase-create-migration')).toBeTruthy()
    expect(screen.getByTestId('createdatabase-migrations-list')).toBeTruthy()
    
    const migrationItems = screen.getAllByTestId('createdatabase-migration-item')
    expect(migrationItems.length).toBeGreaterThan(0)
  })

  it('displays column constraints and badges', () => {
    render(<CreateDatabase />)
    
    // Check for constraint badges (NOT NULL, UNIQUE, PK)
    expect(screen.getByText('PK')).toBeTruthy()
    expect(screen.getAllByText('NOT NULL').length).toBeGreaterThan(0)
    expect(screen.getAllByText('UNIQUE').length).toBeGreaterThan(0)
  })

  it('shows at least 5 database tables', () => {
    render(<CreateDatabase />)
    const items = screen.getAllByTestId('createdatabase-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
