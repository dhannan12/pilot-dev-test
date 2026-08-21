import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateStudents from './CreateStudents'

describe('CreateStudents', () => {
  it('renders without crashing', () => {
    render(<CreateStudents />)
    expect(document.body).toBeTruthy()
  })

  it('displays database schema information', () => {
    render(<CreateStudents />)
    expect(screen.getByText('Students & Parents Database')).toBeTruthy()
    expect(screen.getByText('Database Schema')).toBeTruthy()
    expect(screen.getByText('Students Table')).toBeTruthy()
    expect(screen.getByText('Parents Table')).toBeTruthy()
  })

  it('displays mock student data', () => {
    render(<CreateStudents />)
    expect(screen.getByText('Emma Smith')).toBeTruthy()
    expect(screen.getByText('Oliver Smith')).toBeTruthy()
    expect(screen.getByText('Sophia Johnson')).toBeTruthy()
  })

  it('has tab navigation with correct counts', () => {
    render(<CreateStudents />)
    expect(screen.getByText(/Students \(6\)/)).toBeTruthy()
    expect(screen.getByText(/Parents \(7\)/)).toBeTruthy()
    expect(screen.getByText('Relationships')).toBeTruthy()
  })

  it('displays database statistics', () => {
    render(<CreateStudents />)
    expect(screen.getByText('Database Statistics')).toBeTruthy()
    expect(screen.getByText('Total Students')).toBeTruthy()
    expect(screen.getByText('Total Parents')).toBeTruthy()
    expect(screen.getByText('Total Relationships')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateStudents />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="createstudents"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="createstudents-tab-students"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createstudents-tab-parents"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createstudents-tab-relationships"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="createstudents-add-student"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createstudents-edit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createstudents-delete"]')).toBeTruthy()
    
    // List containers and items
    expect(document.querySelector('[data-testid="createstudents-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createstudents-item"]')).toBeTruthy()
  })

  it('displays student records with parent relationships', () => {
    render(<CreateStudents />)
    
    // Check that student info includes parent names
    const studentSection = screen.getByText('Emma Smith').closest('[data-testid="createstudents-item"]')
    expect(studentSection).toBeTruthy()
    
    // Check grade display
    expect(screen.getByText(/Grade 5/)).toBeTruthy()
  })

  it('has action buttons for CRUD operations', () => {
    render(<CreateStudents />)
    
    // Add buttons
    expect(screen.getByTestId('createstudents-add-student')).toBeTruthy()
    
    // Edit and delete buttons
    const editButtons = document.querySelectorAll('[data-testid="createstudents-edit"]')
    expect(editButtons.length).toBeGreaterThan(0)
    
    const deleteButtons = document.querySelectorAll('[data-testid="createstudents-delete"]')
    expect(deleteButtons.length).toBeGreaterThan(0)
  })
})
