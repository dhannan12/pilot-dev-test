import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import UserCreatesA from './UserCreatesA'

describe('UserCreatesA', () => {
  beforeEach(() => {
    // Clear any existing renders
    document.body.innerHTML = ''
  })

  it('renders without crashing', () => {
    render(<UserCreatesA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<UserCreatesA />)
    expect(screen.getByText('Task Manager')).toBeTruthy()
    expect(screen.getByText('Create and organize your tasks efficiently')).toBeTruthy()
  })

  it('displays mock tasks', () => {
    render(<UserCreatesA />)
    expect(screen.getByText('Design new landing page')).toBeTruthy()
    expect(screen.getByText('Set up CI/CD pipeline')).toBeTruthy()
    expect(screen.getByText('Update API documentation')).toBeTruthy()
    expect(screen.getByText('Refactor authentication module')).toBeTruthy()
    expect(screen.getByText('Optimize database queries')).toBeTruthy()
  })

  it('displays task count', () => {
    render(<UserCreatesA />)
    expect(screen.getByText('5 Tasks')).toBeTruthy()
  })

  it('has a form with title input', () => {
    render(<UserCreatesA />)
    const titleInput = screen.getByLabelText('Task Title *') as HTMLInputElement
    expect(titleInput).toBeTruthy()
    expect(titleInput.type).toBe('text')
  })

  it('has a form with description textarea', () => {
    render(<UserCreatesA />)
    const descriptionInput = screen.getByLabelText('Description') as HTMLTextAreaElement
    expect(descriptionInput).toBeTruthy()
    expect(descriptionInput.tagName.toLowerCase()).toBe('textarea')
  })

  it('has a priority select dropdown', () => {
    render(<UserCreatesA />)
    const prioritySelect = screen.getByLabelText('Priority Level') as HTMLSelectElement
    expect(prioritySelect).toBeTruthy()
    expect(prioritySelect.tagName.toLowerCase()).toBe('select')
  })

  it('has a submit button', () => {
    render(<UserCreatesA />)
    const submitButton = screen.getByText('Create Task') as HTMLButtonElement
    expect(submitButton).toBeTruthy()
    expect(submitButton.type).toBe('submit')
  })

  it('creates a new task when form is submitted', () => {
    render(<UserCreatesA />)
    
    const titleInput = screen.getByLabelText('Task Title *') as HTMLInputElement
    const descriptionInput = screen.getByLabelText('Description') as HTMLTextAreaElement
    const submitButton = screen.getByText('Create Task') as HTMLButtonElement

    // Fill in the form
    fireEvent.change(titleInput, { target: { value: 'New Test Task' } })
    fireEvent.change(descriptionInput, { target: { value: 'This is a test description' } })

    // Submit the form
    fireEvent.click(submitButton)

    // Check if the new task appears
    expect(screen.getByText('New Test Task')).toBeTruthy()
    expect(screen.getByText('This is a test description')).toBeTruthy()
  })

  it('shows success message after creating a task', () => {
    render(<UserCreatesA />)
    
    const titleInput = screen.getByLabelText('Task Title *') as HTMLInputElement
    const submitButton = screen.getByText('Create Task') as HTMLButtonElement

    fireEvent.change(titleInput, { target: { value: 'Success Test Task' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('Task Created Successfully!')).toBeTruthy()
  })

  it('clears form after successful submission', () => {
    render(<UserCreatesA />)
    
    const titleInput = screen.getByLabelText('Task Title *') as HTMLInputElement
    const descriptionInput = screen.getByLabelText('Description') as HTMLTextAreaElement

    fireEvent.change(titleInput, { target: { value: 'Clear Test Task' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } })

    const submitButton = screen.getByText('Create Task') as HTMLButtonElement
    fireEvent.click(submitButton)

    expect(titleInput.value).toBe('')
    expect(descriptionInput.value).toBe('')
  })

  it('updates task count when new task is created', () => {
    render(<UserCreatesA />)
    
    // Initial count is 5
    expect(screen.getByText('5 Tasks')).toBeTruthy()

    const titleInput = screen.getByLabelText('Task Title *') as HTMLInputElement
    const submitButton = screen.getByText('Create Task') as HTMLButtonElement

    fireEvent.change(titleInput, { target: { value: 'Count Test Task' } })
    fireEvent.click(submitButton)

    // Count should increase to 6
    expect(screen.getByText('6 Tasks')).toBeTruthy()
  })

  it('displays priority badges for tasks', () => {
    render(<UserCreatesA />)
    const highBadges = screen.getAllByText('HIGH')
    expect(highBadges.length).toBeGreaterThan(0)
    expect(screen.getByText('URGENT')).toBeTruthy()
    expect(screen.getByText('MEDIUM')).toBeTruthy()
    expect(screen.getByText('LOW')).toBeTruthy()
  })

  it('displays task status information', () => {
    render(<UserCreatesA />)
    // Status text appears multiple times, just verify the component renders
    const statusElements = screen.getAllByText(/pending|in progress|completed/i)
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<UserCreatesA />)
    expect(screen.getByText('Total Tasks')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
  })
})
