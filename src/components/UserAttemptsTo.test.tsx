import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the task creation form', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Task Manager - Priority Validation')).toBeInTheDocument()
    expect(screen.getByLabelText('Task Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Priority')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument()
  })

  it('displays mock tasks', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Review project documentation')).toBeInTheDocument()
    expect(screen.getByText('Update dependencies')).toBeInTheDocument()
    expect(screen.getByText('Fix navigation bug')).toBeInTheDocument()
    expect(screen.getByText('Write unit tests')).toBeInTheDocument()
    expect(screen.getByText('Clean up code comments')).toBeInTheDocument()
  })

  it('shows error message for invalid priority', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByLabelText('Task Title')
    const priorityInput = screen.getByLabelText('Priority')
    const submitButton = screen.getByRole('button', { name: /create task/i })

    fireEvent.change(titleInput, { target: { value: 'Test Task' } })
    fireEvent.change(priorityInput, { target: { value: 'critical' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/Invalid priority level: "critical"/i)).toBeInTheDocument()
  })

  it('shows error message when priority is missing', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByLabelText('Task Title')
    const submitButton = screen.getByRole('button', { name: /create task/i })

    fireEvent.change(titleInput, { target: { value: 'Test Task' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('Priority is required')).toBeInTheDocument()
  })

  it('shows error message when task title is missing', () => {
    render(<UserAttemptsTo />)
    
    const priorityInput = screen.getByLabelText('Priority')
    const submitButton = screen.getByRole('button', { name: /create task/i })

    fireEvent.change(priorityInput, { target: { value: 'high' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('Task title is required')).toBeInTheDocument()
  })

  it('creates task successfully with valid priority', () => {
    render(<UserAttemptsTo />)
    
    const titleInput = screen.getByLabelText('Task Title')
    const priorityInput = screen.getByLabelText('Priority')
    const submitButton = screen.getByRole('button', { name: /create task/i })

    fireEvent.change(titleInput, { target: { value: 'New Test Task' } })
    fireEvent.change(priorityInput, { target: { value: 'high' } })
    fireEvent.click(submitButton)

    expect(screen.getByText(/Task "New Test Task" created successfully/i)).toBeInTheDocument()
    expect(screen.getByText('New Test Task')).toBeInTheDocument()
  })

  it('displays valid priority options', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Valid priorities: low, medium, high, urgent/i)).toBeInTheDocument()
  })

  it('shows task count', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Tasks \(5\)/i)).toBeInTheDocument()
  })
})
