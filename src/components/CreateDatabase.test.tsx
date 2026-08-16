import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title and description', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Database Schema & Migrations/i)).toBeTruthy()
    expect(screen.getByText(/Manage database schema, create migrations, and monitor table status/i)).toBeTruthy()
  })

  it('displays statistics', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Total Tables/i)).toBeTruthy()
    expect(screen.getByText(/Applied Migrations/i)).toBeTruthy()
    const pendingElements = screen.getAllByText(/Pending Migrations/i)
    expect(pendingElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/Total Size/i)).toBeTruthy()
  })

  it('displays migration form inputs', () => {
    render(<CreateDatabase />)
    expect(screen.getByPlaceholderText(/add_user_roles_table/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Describe what this migration does/i)).toBeTruthy()
  })

  it('displays mock migrations data', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/create_students_table/i)).toBeTruthy()
    expect(screen.getByText(/create_absences_table/i)).toBeTruthy()
    expect(screen.getByText(/create_teachers_table/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="createdatabase-tab-migrations"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-tab-tables"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="createdatabase-migration-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-migration-description"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="createdatabase-create-migration"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-run-pending"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-backup"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-export-schema"]')).toBeTruthy()
    
    // Lists
    expect(document.querySelector('[data-testid="createdatabase-migrations-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-migration-item"]')).toBeTruthy()
  })

  it('displays migration items with correct status badges', () => {
    render(<CreateDatabase />)
    const appliedBadges = screen.getAllByText('applied')
    const pendingBadges = screen.getAllByText('pending')
    expect(appliedBadges.length).toBeGreaterThan(0)
    expect(pendingBadges.length).toBeGreaterThan(0)
  })

  it('displays quick action buttons', () => {
    render(<CreateDatabase />)
    expect(screen.getByText(/Run All Pending Migrations/i)).toBeTruthy()
    expect(screen.getByText(/Backup Database/i)).toBeTruthy()
    expect(screen.getByText(/Export Schema/i)).toBeTruthy()
  })
})
