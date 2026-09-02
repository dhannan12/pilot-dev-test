import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabase from './CreateDatabase'

describe('CreateDatabase', () => {
  it('renders without crashing', () => {
    render(<CreateDatabase />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component heading', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Database Management')).toBeTruthy()
  })

  it('displays mock migration data', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('001_create_users_table')).toBeTruthy()
    expect(screen.getByText('002_create_appointments_table')).toBeTruthy()
    expect(screen.getByText('003_add_user_roles')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateDatabase />)
    // Main wrapper
    expect(document.querySelector('[data-testid="createdatabase"]')).toBeTruthy()
    // Tab navigation
    expect(document.querySelector('[data-testid="createdatabase-migrations-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-schema-tab"]')).toBeTruthy()
    // Form inputs
    expect(document.querySelector('[data-testid="createdatabase-migration-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-migration-description"]')).toBeTruthy()
    // Buttons
    expect(document.querySelector('[data-testid="createdatabase-create-migration"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-run"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-rollback"]')).toBeTruthy()
    // Lists
    expect(document.querySelector('[data-testid="createdatabase-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createdatabase-item"]')).toBeTruthy()
  })

  it('renders migration list items', () => {
    render(<CreateDatabase />)
    const items = document.querySelectorAll('[data-testid="createdatabase-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays migration status badges', () => {
    render(<CreateDatabase />)
    const appliedBadges = screen.getAllByText('applied')
    const pendingBadges = screen.getAllByText('pending')
    expect(appliedBadges.length).toBeGreaterThan(0)
    expect(pendingBadges.length).toBeGreaterThan(0)
  })

  it('shows stats summary', () => {
    render(<CreateDatabase />)
    expect(screen.getByText('Total Migrations')).toBeTruthy()
    expect(screen.getByText('Applied')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
  })
})
