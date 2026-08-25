import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { act } from 'react'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Schema & Migrations')).toBeTruthy()
    expect(screen.getByText('Manage your database schema and track migrations')).toBeTruthy()
  })

  it('renders tab navigation', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Schema')).toBeTruthy()
    expect(screen.getByText('Migrations')).toBeTruthy()
  })

  it('displays mock tables data', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('users')).toBeTruthy()
    expect(screen.getByText('products')).toBeTruthy()
    expect(screen.getByText('orders')).toBeTruthy()
    expect(screen.getByText('reviews')).toBeTruthy()
    expect(screen.getByText('sessions')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="create-database"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="create-database-tab-schema"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-database-tab-migrations"]')).toBeTruthy()
    
    // Input fields
    expect(document.querySelector('[data-testid="create-database-table-name"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="create-database-create-table"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="create-database-tables-list"]')).toBeTruthy()
    
    // List items
    const tableItems = document.querySelectorAll('[data-testid="create-database-table-item"]')
    expect(tableItems.length).toBeGreaterThan(0)
  })

  it('has create table form elements', () => {
    render(<CreateDatabase />)
    expect(screen.getByPlaceholderText('Table name')).toBeTruthy()
    expect(screen.getByText('Create Table')).toBeTruthy()
  })

  it('renders migrations list when migrations tab is active', () => {
    render(<CreateDatabase />)
    const migrationsTab = document.querySelector('[data-testid="create-database-tab-migrations"]') as HTMLButtonElement
    
    act(() => {
      migrationsTab.click()
    })
    
    expect(screen.getByText('Migration History')).toBeTruthy()
    expect(screen.getByText('create_users_table')).toBeTruthy()
    expect(screen.getByText('create_products_table')).toBeTruthy()
  })

  it('has migration action buttons', () => {
    render(<CreateDatabase />)
    const migrationsTab = document.querySelector('[data-testid="create-database-tab-migrations"]') as HTMLButtonElement
    
    act(() => {
      migrationsTab.click()
    })
    
    expect(document.querySelector('[data-testid="create-database-create-migration"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-database-migrations-list"]')).toBeTruthy()
    
    const migrationItems = document.querySelectorAll('[data-testid="create-database-migration-item"]')
    expect(migrationItems.length).toBeGreaterThan(0)
  })

  it('displays at least 5 mock tables', () => {
    render(<CreateDatabase />)
    const tableItems = document.querySelectorAll('[data-testid="create-database-table-item"]')
    expect(tableItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays at least 5 mock migrations', () => {
    render(<CreateDatabase />)
    const migrationsTab = document.querySelector('[data-testid="create-database-tab-migrations"]') as HTMLButtonElement
    
    act(() => {
      migrationsTab.click()
    })
    
    const migrationItems = document.querySelectorAll('[data-testid="create-database-migration-item"]')
    expect(migrationItems.length).toBeGreaterThanOrEqual(5)
  })
})
