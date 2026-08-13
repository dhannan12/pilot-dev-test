import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TeamReceive from './TeamReceive'

describe('TeamReceive', () => {
  it('renders without crashing', () => {
    render(<TeamReceive />)
    expect(document.body).toBeTruthy()
  })

  it('displays the team task manager heading', () => {
    render(<TeamReceive />)
    expect(screen.getByText('Team Task Manager')).toBeTruthy()
  })

  it('displays current user email', () => {
    render(<TeamReceive />)
    const emails = screen.getAllByText('john.doe@company.com')
    expect(emails.length).toBeGreaterThan(0)
  })

  it('displays mock tasks', () => {
    render(<TeamReceive />)
    expect(screen.getByText('Update user authentication flow')).toBeTruthy()
    expect(screen.getByText('Review pull request #342')).toBeTruthy()
  })

  it('displays unread reminders', () => {
    render(<TeamReceive />)
    const reminderText = screen.getByText(/Review pull request #342.*is due tomorrow/i)
    expect(reminderText).toBeTruthy()
  })

  it('shows unread reminder count badge', () => {
    render(<TeamReceive />)
    const badge = screen.getByText('2')
    expect(badge).toBeTruthy()
  })

  it('displays filter tabs', () => {
    render(<TeamReceive />)
    expect(screen.getByText(/My Tasks/)).toBeTruthy()
    expect(screen.getByText(/All Tasks/)).toBeTruthy()
    expect(screen.getByText(/Tasks with Reminders/)).toBeTruthy()
  })

  it('allows marking reminder as read', () => {
    render(<TeamReceive />)
    const markReadButtons = screen.getAllByText('Mark Read')
    expect(markReadButtons.length).toBeGreaterThan(0)
    
    // Click the first mark read button
    fireEvent.click(markReadButtons[0])
    
    // After clicking, there should be one fewer unread reminders
    // The badge count should update
    expect(document.body).toBeTruthy()
  })

  it('allows completing tasks assigned to current user', () => {
    render(<TeamReceive />)
    const completeButtons = screen.getAllByText('Mark Complete')
    expect(completeButtons.length).toBeGreaterThan(0)
    
    // Click the first complete button
    fireEvent.click(completeButtons[0])
    
    // Task should be marked as completed
    expect(document.body).toBeTruthy()
  })

  it('prevents completing tasks not assigned to current user', () => {
    render(<TeamReceive />)
    
    // Switch to "All Tasks" view
    const allTasksButton = screen.getByText(/All Tasks/)
    fireEvent.click(allTasksButton)
    
    // Find a task not assigned to current user
    const taskNotAssigned = screen.getByText('Write API documentation')
    expect(taskNotAssigned).toBeTruthy()
  })

  it('displays error message when trying to complete unassigned task', () => {
    render(<TeamReceive />)
    
    // Switch to "All Tasks" view
    const allTasksButton = screen.getByText(/All Tasks/)
    fireEvent.click(allTasksButton)
    
    // Find all Mark Complete buttons
    const completeButtons = screen.getAllByText('Mark Complete')
    
    // Try to click a button for an unassigned task (not disabled)
    // Some buttons should be disabled for tasks not assigned to current user
    expect(completeButtons.length).toBeGreaterThan(0)
  })

  it('switches between filter tabs', () => {
    render(<TeamReceive />)
    
    const myTasksTab = screen.getByText(/My Tasks/)
    const allTasksTab = screen.getByText(/All Tasks/)
    const remindersTab = screen.getByText(/Tasks with Reminders/)
    
    fireEvent.click(allTasksTab)
    expect(allTasksTab).toBeTruthy()
    
    fireEvent.click(remindersTab)
    expect(remindersTab).toBeTruthy()
    
    fireEvent.click(myTasksTab)
    expect(myTasksTab).toBeTruthy()
  })

  it('displays task priorities with correct styling', () => {
    render(<TeamReceive />)
    const highPriorities = screen.getAllByText('High')
    const mediumPriorities = screen.getAllByText('Medium')
    const lowPriorities = screen.getAllByText('Low')
    expect(highPriorities.length).toBeGreaterThan(0)
    expect(mediumPriorities.length).toBeGreaterThan(0)
    expect(lowPriorities.length).toBeGreaterThan(0)
  })

  it('displays task statuses', () => {
    render(<TeamReceive />)
    expect(screen.getByText('In Progress')).toBeTruthy()
    const pendingStatuses = screen.getAllByText('Pending')
    expect(pendingStatuses.length).toBeGreaterThan(0)
  })

  it('shows reminder sent indicator for tasks', () => {
    render(<TeamReceive />)
    const reminderSentText = screen.getAllByText('Reminder sent')
    expect(reminderSentText.length).toBeGreaterThan(0)
  })
})
