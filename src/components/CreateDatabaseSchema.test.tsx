import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateDatabaseSchema from './CreateDatabaseSchema'

describe('CreateDatabaseSchema', () => {
  it('renders without crashing', () => {
    render(<CreateDatabaseSchema />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<CreateDatabaseSchema />)
    const title = screen.getByText('Database Schema Designer')
    const subtitle = screen.getByText('Rehabd Physiotherapy Management Platform')
    expect(title).toBeTruthy()
    expect(subtitle).toBeTruthy()
  })

  it('displays mock database tables', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('patients')).toBeTruthy()
    expect(screen.getByText('physiotherapists')).toBeTruthy()
    expect(screen.getByText('appointments')).toBeTruthy()
    expect(screen.getByText('treatment_plans')).toBeTruthy()
    expect(screen.getByText('exercises')).toBeTruthy()
  })

  it('shows table count in header', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText(/Tables \(6\)/i)).toBeTruthy()
  })

  it('displays table details when a table is selected', () => {
    render(<CreateDatabaseSchema />)
    const patientsTable = screen.getByText('patients')
    fireEvent.click(patientsTable)
    const descriptions = screen.getAllByText('Patient records and personal information')
    expect(descriptions.length).toBeGreaterThan(0)
  })

  it('shows create table form when button is clicked', () => {
    render(<CreateDatabaseSchema />)
    const newTableButton = screen.getByText('+ New Table')
    fireEvent.click(newTableButton)
    expect(screen.getByText('Create New Table')).toBeTruthy()
    expect(screen.getByPlaceholderText('e.g., medical_records')).toBeTruthy()
  })

  it('displays schema summary statistics', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Schema Summary')).toBeTruthy()
    expect(screen.getByText('Total Tables')).toBeTruthy()
    expect(screen.getByText('Total Fields')).toBeTruthy()
    expect(screen.getByText('Relationships')).toBeTruthy()
  })

  it('shows export schema button', () => {
    render(<CreateDatabaseSchema />)
    expect(screen.getByText('Export Schema')).toBeTruthy()
  })
})
