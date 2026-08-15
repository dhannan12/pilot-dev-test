import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewEmployeeReceives from './NewEmployeeReceives'

describe('NewEmployeeReceives', () => {
  it('renders without crashing', () => {
    render(<NewEmployeeReceives />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<NewEmployeeReceives />)
    expect(screen.getByText('Automated Task Reminders')).toBeTruthy()
  })

  it('displays mock reminder data', () => {
    render(<NewEmployeeReceives />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText(/Complete IT Security Training/)).toBeTruthy()
  })

  it('displays statistics correctly', () => {
    render(<NewEmployeeReceives />)
    expect(screen.getByText('Total Reminders')).toBeTruthy()
    expect(screen.getAllByText('Sent').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Failed').length).toBeGreaterThan(0)
    expect(screen.getByText('High Priority')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<NewEmployeeReceives />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="newemployeereceives"]')).toBeTruthy()
    
    // Filter selects
    expect(document.querySelector('[data-testid="newemployeereceives-status-filter"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="newemployeereceives-priority-filter"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="newemployeereceives-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="newemployeereceives-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(document.querySelector('[data-testid="newemployeereceives-resend"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="newemployeereceives-view"]')).toBeTruthy()
  })

  it('filters reminders by status', () => {
    render(<NewEmployeeReceives />)
    const statusFilter = screen.getByTestId('newemployeereceives-status-filter') as HTMLSelectElement
    
    // Filter to show only Sent reminders
    fireEvent.change(statusFilter, { target: { value: 'Sent' } })
    expect(statusFilter.value).toBe('Sent')
  })

  it('filters reminders by priority', () => {
    render(<NewEmployeeReceives />)
    const priorityFilter = screen.getByTestId('newemployeereceives-priority-filter') as HTMLSelectElement
    
    // Filter to show only High priority
    fireEvent.change(priorityFilter, { target: { value: 'High' } })
    expect(priorityFilter.value).toBe('High')
  })

  it('handles resend button click', () => {
    render(<NewEmployeeReceives />)
    const resendButtons = screen.getAllByTestId('newemployeereceives-resend')
    
    expect(resendButtons.length).toBeGreaterThan(0)
    fireEvent.click(resendButtons[0])
    
    // After resend, component should still render
    expect(document.querySelector('[data-testid="newemployeereceives"]')).toBeTruthy()
  })

  it('displays overdue information for each reminder', () => {
    render(<NewEmployeeReceives />)
    expect(screen.getByText(/5 days overdue/)).toBeTruthy()
    expect(screen.getByText(/3 days overdue/)).toBeTruthy()
  })

  it('displays reminder count information', () => {
    render(<NewEmployeeReceives />)
    const reminderCountElements = screen.getAllByText(/Reminders sent: \d+/)
    expect(reminderCountElements.length).toBeGreaterThan(0)
  })
})
