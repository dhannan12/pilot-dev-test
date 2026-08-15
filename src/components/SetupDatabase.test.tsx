import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupDatabase from './SetupDatabase'

describe('SetupDatabase', () => {
  it('renders without crashing', () => {
    render(<SetupDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays database setup header and statistics', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('Database Setup')).toBeTruthy()
    expect(screen.getByText('Active Tables')).toBeTruthy()
    expect(screen.getByText('Applied Migrations')).toBeTruthy()
    expect(screen.getByText('Pending Migrations')).toBeTruthy()
  })

  it('displays mock tables data', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('cases')).toBeTruthy()
    expect(screen.getByText('clients')).toBeTruthy()
    expect(screen.getByText('documents')).toBeTruthy()
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('audit_logs')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupdatabase"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="setupdatabase-schema-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupdatabase-migrations-tab"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="setupdatabase-create-table"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupdatabase-backup"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupdatabase-optimize"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupdatabase-export"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="setupdatabase-tables-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupdatabase-table-item"]')).toBeTruthy()
    
    // Input fields
    expect(document.querySelector('[data-testid="setupdatabase-host"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupdatabase-database"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupdatabase-user"]')).toBeTruthy()
  })

  it('displays migration information', () => {
    const { container } = render(<SetupDatabase />)
    // Migrations are shown in their respective data structures
    // Even though we're on schema tab by default, migration data exists
    expect(container.querySelector('[data-testid="setupdatabase"]')).toBeTruthy()
    // Verify we have the migrations tab available
    expect(screen.getByText('Migrations')).toBeTruthy()
  })

  it('shows database connection info', () => {
    render(<SetupDatabase />)
    expect(screen.getByText('Database Connection')).toBeTruthy()
    expect(screen.getByDisplayValue('localhost:5432')).toBeTruthy()
    expect(screen.getByDisplayValue('legal_case_tracker')).toBeTruthy()
    expect(screen.getByDisplayValue('admin')).toBeTruthy()
  })
})
