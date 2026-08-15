import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HrManagerAssigns from './HrManagerAssigns'

describe('HrManagerAssigns', () => {
  it('renders without crashing', () => {
    render(<HrManagerAssigns />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<HrManagerAssigns />)
    expect(screen.getByText('Task Assignment')).toBeTruthy()
    expect(screen.getByText('Assign tasks to employees for onboarding')).toBeTruthy()
  })

  it('displays mock tasks list', () => {
    render(<HrManagerAssigns />)
    expect(screen.getByText('Complete employee handbook review')).toBeTruthy()
    expect(screen.getByText('Set up workstation')).toBeTruthy()
    expect(screen.getByText('Schedule orientation meeting')).toBeTruthy()
    expect(screen.getByText('Complete safety training')).toBeTruthy()
    expect(screen.getByText('Submit tax documents')).toBeTruthy()
  })

  it('shows task assignment form when create button is clicked', () => {
    render(<HrManagerAssigns />)
    const createButton = screen.getByTestId('hrmanagerassigns-create')
    fireEvent.click(createButton)
    expect(screen.getByText('Create New Task Assignment')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<HrManagerAssigns />)
    
    // Main wrapper
    expect(screen.getByTestId('hrmanagerassigns')).toBeTruthy()
    
    // Create button
    expect(screen.getByTestId('hrmanagerassigns-create')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('hrmanagerassigns-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('hrmanagerassigns-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('has form input data-testid attributes when form is shown', () => {
    render(<HrManagerAssigns />)
    const createButton = screen.getByTestId('hrmanagerassigns-create')
    fireEvent.click(createButton)
    
    // Form inputs
    expect(screen.getByTestId('hrmanagerassigns-title')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-description')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-assignee')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-priority')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-duedate')).toBeTruthy()
    
    // Form buttons
    expect(screen.getByTestId('hrmanagerassigns-submit')).toBeTruthy()
    expect(screen.getByTestId('hrmanagerassigns-cancel')).toBeTruthy()
  })

  it('displays tasks without due dates', () => {
    render(<HrManagerAssigns />)
    // Check that tasks without due dates show "No due date set"
    const noDueDateTexts = screen.getAllByText('No due date set')
    expect(noDueDateTexts.length).toBeGreaterThan(0)
  })

  it('displays tasks with due dates', () => {
    render(<HrManagerAssigns />)
    // Check that some tasks have due dates
    const dueLabels = screen.getAllByText(/Due:/)
    expect(dueLabels.length).toBeGreaterThan(0)
  })

  it('can submit a new task without a due date', () => {
    render(<HrManagerAssigns />)
    
    // Open form
    fireEvent.click(screen.getByTestId('hrmanagerassigns-create'))
    
    // Fill in required fields only (no due date)
    const titleInput = screen.getByTestId('hrmanagerassigns-title')
    const assigneeSelect = screen.getByTestId('hrmanagerassigns-assignee')
    
    fireEvent.change(titleInput, { target: { value: 'New Task Without Due Date' } })
    fireEvent.change(assigneeSelect, { target: { value: 'John Smith' } })
    
    // Submit form
    fireEvent.click(screen.getByTestId('hrmanagerassigns-submit'))
    
    // Check that new task appears in the list
    expect(screen.getByText('New Task Without Due Date')).toBeTruthy()
  })
})
