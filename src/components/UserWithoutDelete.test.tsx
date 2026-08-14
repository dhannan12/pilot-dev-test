import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserWithoutDelete from './UserWithoutDelete'

describe('UserWithoutDelete', () => {
  it('renders without crashing', () => {
    render(<UserWithoutDelete />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock tasks', () => {
    render(<UserWithoutDelete />)
    expect(screen.getByText('Design landing page mockup')).toBeInTheDocument()
    expect(screen.getByText('Implement user authentication')).toBeInTheDocument()
    expect(screen.getByText('Write API documentation')).toBeInTheDocument()
    expect(screen.getByText('Optimize database queries')).toBeInTheDocument()
    expect(screen.getByText('Set up CI/CD pipeline')).toBeInTheDocument()
  })

  it('displays user selector with different roles', () => {
    render(<UserWithoutDelete />)
    expect(screen.getByText(/John Viewer \(viewer\)/)).toBeInTheDocument()
    expect(screen.getByText(/Jane Editor \(editor\)/)).toBeInTheDocument()
    expect(screen.getByText(/Admin User \(admin\)/)).toBeInTheDocument()
  })

  it('shows delete permission denied for default user', () => {
    render(<UserWithoutDelete />)
    expect(screen.getByText(/Delete Permission:/)).toBeInTheDocument()
    expect(screen.getByText('Denied')).toBeInTheDocument()
  })

  it('displays error message when user without permission tries to delete', async () => {
    render(<UserWithoutDelete />)
    
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    
    await waitFor(() => {
      const errorText = screen.getByText(/does not have permission to delete tasks/)
      expect(errorText).toBeInTheDocument()
    })
  })

  it('allows user to switch between different user roles', () => {
    render(<UserWithoutDelete />)
    
    const adminButton = screen.getByText(/Admin User \(admin\)/)
    fireEvent.click(adminButton)
    
    expect(screen.getByText('Granted')).toBeInTheDocument()
  })

  it('allows admin user to delete tasks', async () => {
    render(<UserWithoutDelete />)
    
    // Switch to admin user
    const adminButton = screen.getByText(/Admin User \(admin\)/)
    fireEvent.click(adminButton)
    
    // Delete a task
    const deleteButtons = screen.getAllByText('Delete')
    const initialTaskCount = deleteButtons.length
    fireEvent.click(deleteButtons[0])
    
    await waitFor(() => {
      expect(screen.getByText(/Task successfully deleted/)).toBeInTheDocument()
    })
    
    // Check that task was removed
    const remainingDeleteButtons = screen.getAllByText('Delete')
    expect(remainingDeleteButtons.length).toBe(initialTaskCount - 1)
  })

  it('shows different button styles for users without permission', () => {
    render(<UserWithoutDelete />)
    
    const deleteButtons = screen.getAllByText('Delete')
    // Buttons should be enabled but show error on click
    deleteButtons.forEach(button => {
      expect(button).toBeEnabled()
    })
  })

  it('shows enabled delete buttons for users with permission', () => {
    render(<UserWithoutDelete />)
    
    // Switch to admin user
    const adminButton = screen.getByText(/Admin User \(admin\)/)
    fireEvent.click(adminButton)
    
    const deleteButtons = screen.getAllByText('Delete')
    deleteButtons.forEach(button => {
      expect(button).toBeEnabled()
    })
  })

  it('displays task status badges', () => {
    render(<UserWithoutDelete />)
    const completedBadges = screen.getAllByText('completed')
    expect(completedBadges.length).toBeGreaterThan(0)
    const inProgressBadges = screen.getAllByText('in-progress')
    expect(inProgressBadges.length).toBeGreaterThan(0)
    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  it('shows current user email', () => {
    render(<UserWithoutDelete />)
    expect(screen.getByText(/john.viewer@example.com/)).toBeInTheDocument()
  })

  it('clears error message when switching users', async () => {
    render(<UserWithoutDelete />)
    
    // Trigger error with viewer
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    
    await waitFor(() => {
      const errorText = screen.getByText(/does not have permission to delete tasks/)
      expect(errorText).toBeInTheDocument()
    })
    
    // Switch to editor
    const editorButton = screen.getByText(/Jane Editor \(editor\)/)
    fireEvent.click(editorButton)
    
    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText(/does not have permission to delete tasks/)).not.toBeInTheDocument()
    })
  })
})
