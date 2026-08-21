import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Create from './Create'

describe('Create', () => {
  it('renders without crashing', () => {
    render(<Create />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<Create />)
    const heading = screen.getByText(/Create Absence Report/i)
    expect(heading).toBeTruthy()
  })

  it('displays mock student data', () => {
    render(<Create />)
    const studentList = document.querySelector('[data-testid="create-student-list"]')
    expect(studentList).toBeTruthy()
    expect(studentList?.textContent).toContain('Sarah Chen')
    expect(studentList?.textContent).toContain('Marcus Johnson')
    expect(studentList?.textContent).toContain('Emily Rodriguez')
    expect(studentList?.textContent).toContain('James Wilson')
    expect(studentList?.textContent).toContain('Aisha Patel')
  })

  it('displays mock absence reports', () => {
    render(<Create />)
    expect(screen.getByText(/Recent Absence Reports/i)).toBeTruthy()
    // Check for at least some report data
    const reports = document.querySelectorAll('[data-testid="create-report-item"]')
    expect(reports.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes on main wrapper', () => {
    render(<Create />)
    const mainWrapper = document.querySelector('[data-testid="create"]')
    expect(mainWrapper).toBeTruthy()
  })

  it('has required data-testid attributes on form elements', () => {
    render(<Create />)
    
    // Check main interactive elements
    expect(document.querySelector('[data-testid="create-start-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-end-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-absence-type"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-description"]')).toBeTruthy()
  })

  it('has required data-testid attributes on buttons', () => {
    render(<Create />)
    
    expect(document.querySelector('[data-testid="create-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-preview"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-clear"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-select-all"]')).toBeTruthy()
  })

  it('has required data-testid attributes on list containers', () => {
    render(<Create />)
    
    expect(document.querySelector('[data-testid="create-student-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="create-reports-list"]')).toBeTruthy()
  })

  it('has required data-testid attributes on list items', () => {
    render(<Create />)
    
    const studentItems = document.querySelectorAll('[data-testid="create-student-item"]')
    expect(studentItems.length).toBeGreaterThanOrEqual(5)
    
    const reportItems = document.querySelectorAll('[data-testid="create-report-item"]')
    expect(reportItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays student checkboxes', () => {
    render(<Create />)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBeGreaterThanOrEqual(5)
  })

  it('displays absence type options', () => {
    render(<Create />)
    const select = document.querySelector('[data-testid="create-absence-type"]')
    expect(select).toBeTruthy()
    expect(select?.textContent).toContain('Sick Leave')
    expect(select?.textContent).toContain('Medical Appointment')
  })
})
