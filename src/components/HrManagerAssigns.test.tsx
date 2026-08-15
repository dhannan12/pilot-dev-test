import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HrManagerAssigns from './HrManagerAssigns'

describe('HrManagerAssigns', () => {
  it('renders without crashing', () => {
    render(<HrManagerAssigns />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<HrManagerAssigns />)
    // Check that the component title is rendered
    expect(screen.getByText('Assign Onboarding Tasks')).toBeTruthy()
    
    // Check that employee names appear in the overview section
    const sarahElements = screen.getAllByText(/Sarah Johnson/)
    expect(sarahElements.length).toBeGreaterThan(0)
    
    // Check that assigned tasks are displayed
    const taskElements = screen.getAllByText(/Complete I-9 Form/)
    expect(taskElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<HrManagerAssigns />)
    
    // Verify main wrapper
    expect(screen.getByTestId('hrmanagerassigns')).toBeTruthy()
    
    // Verify form elements
    expect(screen.getByTestId('hrmanagerassigns-employee')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-priority')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-days')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-filter')).toBeTruthy()
    
    // Verify task list
    expect(screen.getByTestId('hrmanagerassigns-tasklist')).toBeTruthy()
    
    // Verify list container
    expect(screen.getByTestId('hrmanagerassigns-list')).toBeTruthy()
    
    // Verify list items exist
    const items = screen.getAllByTestId('hrmanagerassigns-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify submit button
    expect(screen.getByTestId('hrmanagerassigns-submit')).toBeTruthy()
    
    // Verify at least one task checkbox
    expect(screen.getByTestId('hrmanagerassigns-task-1')).toBeTruthy()
  })

  it('displays assignment statistics', () => {
    render(<HrManagerAssigns />)
    
    // Check that statistics section exists
    expect(screen.getByText('Assignment Overview')).toBeTruthy()
    expect(screen.getByText('Total Assignments')).toBeTruthy()
    expect(screen.getByText('Pending Tasks')).toBeTruthy()
    expect(screen.getByText('Completed Tasks')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
  })

  it('displays available tasks for assignment', () => {
    render(<HrManagerAssigns />)
    
    // Check that multiple tasks are available
    expect(screen.getAllByText(/Complete I-9 Form/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Setup Company Email/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Review Employee Handbook/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Complete Benefits Enrollment/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Attend Security Training/).length).toBeGreaterThan(0)
  })
})
