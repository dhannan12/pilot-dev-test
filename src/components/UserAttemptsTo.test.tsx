import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the task manager heading', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Task Manager')).toBeTruthy()
  })

  it('displays mock tasks', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Review quarterly budget report')).toBeTruthy()
    expect(screen.getByText('Update team documentation')).toBeTruthy()
    expect(screen.getByText('Schedule client meeting')).toBeTruthy()
    expect(screen.getByText('Fix production bug #547')).toBeTruthy()
    expect(screen.getByText('Onboard new team members')).toBeTruthy()
  })

  it('shows error when attempting to create task without title', () => {
    render(<UserAttemptsTo />)
    
    const submitButton = screen.getByText('Create Task')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Title is required/i)).toBeTruthy()
  })

  it('allows creating a task with a valid title', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByPlaceholderText('Enter task title')
    const descriptionInput = screen.getByPlaceholderText('Enter task description (optional)')
    const submitButton = screen.getByText('Create Task')
    
    fireEvent.change(titleInput, { target: { value: 'New test task' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('New test task')).toBeTruthy()
  })

  it('clears error when user starts typing after failed submission', () => {
    render(<UserAttemptsTo />)
    
    const submitButton = screen.getByText('Create Task')
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Title is required/i)).toBeTruthy()
    
    const titleInput = screen.getByPlaceholderText('Enter task title')
    fireEvent.change(titleInput, { target: { value: 'Some title' } })
    
    expect(screen.queryByText(/Title is required/i)).toBeFalsy()
  })

  it('displays task count correctly', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Tasks (5)')).toBeTruthy()
  })

  it('clears form after successful submission', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByPlaceholderText('Enter task title') as HTMLInputElement
    const descriptionInput = screen.getByPlaceholderText('Enter task description (optional)') as HTMLTextAreaElement
    const submitButton = screen.getByText('Create Task')
    
    fireEvent.change(titleInput, { target: { value: 'Test task' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } })
    fireEvent.click(submitButton)
    
    expect(titleInput.value).toBe('')
    expect(descriptionInput.value).toBe('')
  })
})
