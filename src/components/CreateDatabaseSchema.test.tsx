import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabaseSchema from './CreateDatabaseSchema'

describe('CreateDatabaseSchema', () => {
  it('renders without crashing', () => {
    render(<CreateDatabaseSchema />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('TaskApp Database Schema')).toBeTruthy()
  })

  it('displays schema overview statistics', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Fields')).toBeTruthy()
    expect(screen.getByText('Relationships')).toBeTruthy()
    expect(screen.getByText('Primary Keys')).toBeTruthy()
  })

  it('displays all mock tables', () => {
    render(<CreateDatabaseSchema />)
    // Tables appear multiple times (in list and in relationships)
    const usersElements = screen.getAllByText('users')
    const tasksElements = screen.getAllByText('tasks')
    const teamsElements = screen.getAllByText('teams')
    expect(usersElements.length).toBeGreaterThan(0)
    expect(tasksElements.length).toBeGreaterThan(0)
    expect(teamsElements.length).toBeGreaterThan(0)
  })

  it('displays table descriptions', () => {
    render(<CreateDatabaseSchema />)
    const descriptions = screen.getAllByText(/User accounts and authentication|Task management and tracking/)
    expect(descriptions.length).toBeGreaterThan(0)
  })

  it('displays field information for the selected table', () => {
    render(<CreateDatabaseSchema />)
    // First table (users) should be selected by default
    expect(screen.getByText('Field Name')).toBeTruthy()
    expect(screen.getByText('Type')).toBeTruthy()
    expect(screen.getByText('Constraints')).toBeTruthy()
  })

  it('displays table relationships section', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Table Relationships')).toBeTruthy()
  })
})
