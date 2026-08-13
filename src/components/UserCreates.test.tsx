import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserCreates from './UserCreates'

describe('UserCreates', () => {
  it('renders without crashing', () => {
    render(<UserCreates />)
    expect(document.body).toBeTruthy()
  })

  it('displays the task creation form', () => {
    render(<UserCreates />)
    expect(screen.getByText(/Task Management/i)).toBeTruthy()
    expect(screen.getByLabelText(/Task Title/i)).toBeTruthy()
    expect(screen.getByLabelText(/Deadline/i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /Create Task/i })).toBeTruthy()
  })

  it('displays mock existing tasks', () => {
    render(<UserCreates />)
    expect(screen.getByText(/Complete project documentation/i)).toBeTruthy()
    expect(screen.getByText(/Review pull requests/i)).toBeTruthy()
    expect(screen.getByText(/Update dependencies/i)).toBeTruthy()
    expect(screen.getByText(/Fix critical bug in authentication/i)).toBeTruthy()
    expect(screen.getByText(/Prepare sprint demo/i)).toBeTruthy()
  })

  it('shows error when trying to create task without deadline', () => {
    render(<UserCreates />)
    
    const titleInput = screen.getByLabelText(/Task Title/i)
    const submitButton = screen.getByRole('button', { name: /Create Task/i })
    
    fireEvent.change(titleInput, { target: { value: 'New Task' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Deadline is required/i)).toBeTruthy()
  })

  it('shows error when trying to create task without title', () => {
    render(<UserCreates />)
    
    const submitButton = screen.getByRole('button', { name: /Create Task/i })
    
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Task title is required/i)).toBeTruthy()
  })

  it('displays the mandatory deadline message', () => {
    render(<UserCreates />)
    expect(screen.getByText(/Each task must have a defined deadline to ensure timely completion/i)).toBeTruthy()
  })

  it('shows task count', () => {
    render(<UserCreates />)
    expect(screen.getByText(/Your Tasks \(5\)/i)).toBeTruthy()
  })

  it('displays task status badges', () => {
    render(<UserCreates />)
    const statusElements = screen.getAllByText(/pending|in-progress|completed/i)
    expect(statusElements.length).toBeGreaterThan(0)
  })
})
