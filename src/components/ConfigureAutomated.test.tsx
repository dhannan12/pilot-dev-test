import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ConfigureAutomated from './ConfigureAutomated'

describe('ConfigureAutomated', () => {
  it('renders without crashing', () => {
    render(<ConfigureAutomated />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<ConfigureAutomated />)
    expect(screen.getByText(/Configure Automated Email Notifications/i)).toBeTruthy()
  })

  it('displays mock email templates', () => {
    render(<ConfigureAutomated />)
    const welcomeEmails = screen.getAllByText(/Welcome Email/i)
    expect(welcomeEmails.length).toBeGreaterThan(0)
    const taskAssignments = screen.getAllByText(/Task Assignment/i)
    expect(taskAssignments.length).toBeGreaterThan(0)
  })

  it('displays mock triggers', () => {
    render(<ConfigureAutomated />)
    const newEmployeeTexts = screen.getAllByText(/New Employee Added/i)
    expect(newEmployeeTexts.length).toBeGreaterThan(0)
    const deadlineTexts = screen.getAllByText(/Deadline Approaching/i)
    expect(deadlineTexts.length).toBeGreaterThan(0)
  })

  it('displays mock recipients', () => {
    render(<ConfigureAutomated />)
    expect(screen.getByText(/All Employees/i)).toBeTruthy()
    expect(screen.getByText(/Department Managers/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<ConfigureAutomated />)
    
    // Main wrapper
    expect(screen.getByTestId('configureautomated')).toBeTruthy()
    
    // Select fields
    expect(screen.getByTestId('configureautomated-trigger')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-template')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-sendtime')).toBeTruthy()
    
    // Lists
    expect(screen.getByTestId('configureautomated-trigger-list')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-recipient-list')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-history-list')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('configureautomated-save')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-preview')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-test')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-cancel')).toBeTruthy()
    
    // List items
    const triggerItems = screen.getAllByTestId('configureautomated-trigger-item')
    expect(triggerItems.length).toBeGreaterThan(0)
    
    const recipientItems = screen.getAllByTestId('configureautomated-recipient-item')
    expect(recipientItems.length).toBeGreaterThan(0)
    
    const historyItems = screen.getAllByTestId('configureautomated-history-item')
    expect(historyItems.length).toBeGreaterThan(0)
  })

  it('displays action buttons', () => {
    render(<ConfigureAutomated />)
    expect(screen.getByTestId('configureautomated-save')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-preview')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-test')).toBeTruthy()
    expect(screen.getByTestId('configureautomated-cancel')).toBeTruthy()
  })

  it('displays configuration history', () => {
    render(<ConfigureAutomated />)
    expect(screen.getByText(/Recent Configurations/i)).toBeTruthy()
    const completionNotices = screen.getAllByText(/Completion Notice/i)
    expect(completionNotices.length).toBeGreaterThan(0)
  })
})
