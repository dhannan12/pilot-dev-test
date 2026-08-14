import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupAuthentication from './SetupAuthentication'

describe('SetupAuthentication', () => {
  it('renders without crashing', () => {
    render(<SetupAuthentication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Authentication & Permissions')).toBeTruthy()
  })

  it('displays mock users for login when not logged in', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Select User to Login')).toBeTruthy()
    expect(screen.getAllByText('admin_user').length).toBeGreaterThan(0)
    expect(screen.getAllByText('editor_john').length).toBeGreaterThan(0)
    expect(screen.getAllByText('viewer_mike').length).toBeGreaterThan(0)
  })

  it('displays active tasks', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Design authentication system')).toBeTruthy()
    expect(screen.getByText('Implement user login')).toBeTruthy()
  })

  it('allows user to login', () => {
    render(<SetupAuthentication />)
    const adminButtons = screen.getAllByText('admin_user')
    fireEvent.click(adminButtons[0])
    expect(screen.getByText(/Successfully logged in as admin_user/)).toBeTruthy()
  })

  it('shows current user information after login', () => {
    render(<SetupAuthentication />)
    const editorButtons = screen.getAllByText('editor_john')
    fireEvent.click(editorButtons[0])
    expect(screen.getByText('john@example.com')).toBeTruthy()
    expect(screen.getByText('EDITOR')).toBeTruthy()
  })

  it('displays user permissions after login', () => {
    render(<SetupAuthentication />)
    const adminButtons = screen.getAllByText('admin_user')
    fireEvent.click(adminButtons[0])
    expect(screen.getByText('Permissions:')).toBeTruthy()
  })

  it('allows admin to delete tasks', () => {
    render(<SetupAuthentication />)
    // Login as admin
    const adminButtons = screen.getAllByText('admin_user')
    fireEvent.click(adminButtons[0])
    
    // Click first delete button
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    
    expect(screen.getByText(/Task deleted successfully/)).toBeTruthy()
  })

  it('prevents viewer from deleting tasks', () => {
    render(<SetupAuthentication />)
    // Login as viewer
    const viewerButtons = screen.getAllByText('viewer_mike')
    fireEvent.click(viewerButtons[0])
    
    // Try to delete a task - button should be disabled
    const deleteButtons = screen.getAllByText('Delete') as HTMLButtonElement[]
    expect(deleteButtons[0].disabled).toBe(true)
  })

  it('allows logout functionality', () => {
    render(<SetupAuthentication />)
    // Login first
    const adminButtons = screen.getAllByText('admin_user')
    fireEvent.click(adminButtons[0])
    
    // Logout
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    
    expect(screen.getByText(/Logged out successfully/)).toBeTruthy()
    expect(screen.getByText('No user logged in')).toBeTruthy()
  })

  it('displays permission rules legend', () => {
    render(<SetupAuthentication />)
    expect(screen.getByText('Permission Rules')).toBeTruthy()
    expect(screen.getByText(/Admin:/)).toBeTruthy()
    expect(screen.getByText(/Editor:/)).toBeTruthy()
    expect(screen.getByText(/Viewer:/)).toBeTruthy()
  })

  it('shows deleted tasks section after deletion', () => {
    render(<SetupAuthentication />)
    // Login as admin
    const adminButtons = screen.getAllByText('admin_user')
    fireEvent.click(adminButtons[0])
    
    // Delete a task
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    
    // Check for deleted tasks section
    expect(screen.getByText(/Deleted Tasks/)).toBeTruthy()
  })

  it('disables delete buttons when not logged in', () => {
    render(<SetupAuthentication />)
    const deleteButtons = screen.getAllByText('Delete') as HTMLButtonElement[]
    deleteButtons.forEach(button => {
      expect(button.disabled).toBe(true)
    })
  })

  it('editor can only delete own tasks', () => {
    render(<SetupAuthentication />)
    // Login as editor_john (id: '2')
    const editorButtons = screen.getAllByText('editor_john')
    fireEvent.click(editorButtons[0])
    
    // Try to delete first task (created by admin, id: '1') - button should be disabled
    const deleteButtons = screen.getAllByText('Delete') as HTMLButtonElement[]
    expect(deleteButtons[0].disabled).toBe(true)
  })

  it('displays role badges with appropriate styling', () => {
    render(<SetupAuthentication />)
    expect(screen.getAllByText('admin_user').length).toBeGreaterThan(0)
    expect(screen.getAllByText('editor_john').length).toBeGreaterThan(0)
    expect(screen.getAllByText('viewer_mike').length).toBeGreaterThan(0)
  })
})
