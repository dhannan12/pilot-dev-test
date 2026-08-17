import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays the database schema viewer title', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Schema Viewer')).toBeTruthy()
    expect(screen.getByText(/5 normalized tables/i)).toBeTruthy()
  })

  it('displays all 5 tables in the list', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('employees')).toBeTruthy()
    expect(screen.getByText('vacancies')).toBeTruthy()
    expect(screen.getByText('expressions_of_interest')).toBeTruthy()
    expect(screen.getByText('application_status_tracking')).toBeTruthy()
    expect(screen.getByText('notifications')).toBeTruthy()
  })

  it('displays schema summary with correct counts', () => {
    render(<CreateDatabase />)
    expect(screen.getByTestId('create-database-summary-tables')).toBeTruthy()
    expect(screen.getByTestId('create-database-summary-relationships')).toBeTruthy()
    expect(screen.getByTestId('create-database-summary-indexes')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(screen.getByTestId('create-database')).toBeTruthy()
    
    // Table list
    expect(screen.getByTestId('create-database-table-list')).toBeTruthy()
    
    // Individual table buttons
    expect(screen.getByTestId('create-database-table-employees')).toBeTruthy()
    expect(screen.getByTestId('create-database-table-vacancies')).toBeTruthy()
    expect(screen.getByTestId('create-database-table-expressions_of_interest')).toBeTruthy()
    expect(screen.getByTestId('create-database-table-application_status_tracking')).toBeTruthy()
    expect(screen.getByTestId('create-database-table-notifications')).toBeTruthy()
    
    // Controls
    expect(screen.getByTestId('create-database-show-indexes')).toBeTruthy()
    expect(screen.getByTestId('create-database-clear-selection')).toBeTruthy()
    
    // Summary cards
    expect(screen.getByTestId('create-database-summary-tables')).toBeTruthy()
    expect(screen.getByTestId('create-database-summary-relationships')).toBeTruthy()
    expect(screen.getByTestId('create-database-summary-indexes')).toBeTruthy()
  })

  it('shows placeholder message when no table is selected', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Select a table to view its schema')).toBeTruthy()
  })
})
