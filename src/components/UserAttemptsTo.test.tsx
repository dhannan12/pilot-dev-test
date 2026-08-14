import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock tasks', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Review project documentation')).toBeInTheDocument()
    expect(screen.getByText('Update dependencies')).toBeInTheDocument()
    expect(screen.getByText('Fix navigation bug')).toBeInTheDocument()
    expect(screen.getByText('Write unit tests')).toBeInTheDocument()
    expect(screen.getByText('Clean up code comments')).toBeInTheDocument()
    expect(screen.getByText('Refactor authentication module')).toBeInTheDocument()
    expect(screen.getByText('Update API documentation')).toBeInTheDocument()
  })

  it('shows delete button for each task', () => {
    render(<UserAttemptsTo />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('shows warning message when delete is attempted', () => {
    render(<UserAttemptsTo />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    
    fireEvent.click(deleteButtons[0])
    
    expect(screen.getByText(/Please confirm deletion by clicking the Confirm Delete button/i)).toBeInTheDocument()
  })

  it('shows confirmation modal when delete button is clicked', () => {
    render(<UserAttemptsTo />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    
    fireEvent.click(deleteButtons[0])
    
    expect(screen.getByRole('heading', { name: 'Confirm Delete' })).toBeInTheDocument()
    expect(screen.getByText(/Are you sure you want to delete this task/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('displays task details in confirmation modal', () => {
    render(<UserAttemptsTo />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    
    fireEvent.click(deleteButtons[0])
    
    // The modal should show task details
    expect(screen.getByText(/Priority: high/i)).toBeInTheDocument()
    expect(screen.getAllByText('Review project documentation').length).toBeGreaterThan(0)
  })

  it('shows warning in confirmation modal', () => {
    render(<UserAttemptsTo />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    
    fireEvent.click(deleteButtons[0])
    
    expect(screen.getByText(/This action cannot be undone/i)).toBeInTheDocument()
  })

  it('closes modal when cancel is clicked', () => {
    render(<UserAttemptsTo />)
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    
    fireEvent.click(deleteButtons[0])
    expect(screen.getByRole('heading', { name: 'Confirm Delete' })).toBeInTheDocument()
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)
    
    expect(screen.queryByRole('heading', { name: 'Confirm Delete' })).not.toBeInTheDocument()
  })

  it('removes task when confirmed', () => {
    render(<UserAttemptsTo />)
    
    // Get initial task count
    expect(screen.getByText(/Tasks \(7\)/i)).toBeInTheDocument()
    expect(screen.getByText('Review project documentation')).toBeInTheDocument()
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    fireEvent.click(deleteButtons[0])
    
    const confirmButton = screen.getByRole('button', { name: /confirm delete/i })
    fireEvent.click(confirmButton)
    
    // Task should be removed
    expect(screen.queryByText('Review project documentation')).not.toBeInTheDocument()
    expect(screen.getByText(/Tasks \(6\)/i)).toBeInTheDocument()
  })

  it('displays task count', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Tasks \(7\)/i)).toBeInTheDocument()
  })

  it('displays information about delete feature', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Delete Task Feature:/i)).toBeInTheDocument()
    expect(screen.getByText(/prevents accidental task deletion/i)).toBeInTheDocument()
  })
})
