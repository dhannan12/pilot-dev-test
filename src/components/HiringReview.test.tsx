import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HiringReview from './HiringReview'

describe('HiringReview', () => {
  it('renders without crashing', () => {
    render(<HiringReview />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<HiringReview />)
    expect(screen.getByText('Application Review')).toBeTruthy()
    expect(screen.getByText('Review candidate applications and manage hiring decisions')).toBeTruthy()
  })

  it('displays mock applications in the list', () => {
    render(<HiringReview />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Park')).toBeTruthy()
    expect(screen.getByText('Jennifer Williams')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<HiringReview />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="hiringreview"]')).toBeTruthy()
    
    // Filter selects
    expect(document.querySelector('[data-testid="hiringreview-filter-status"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiringreview-filter-department"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="hiringreview-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="hiringreview-item"]').length).toBeGreaterThan(0)
  })

  it('filters applications by status', () => {
    render(<HiringReview />)
    
    const statusFilter = screen.getByTestId('hiringreview-filter-status') as HTMLSelectElement
    
    // Filter by 'reviewing'
    fireEvent.change(statusFilter, { target: { value: 'reviewing' } })
    
    // Should show Sarah Johnson and Robert Taylor (both have 'reviewing' status)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Robert Taylor')).toBeTruthy()
  })

  it('filters applications by department', () => {
    render(<HiringReview />)
    
    const departmentFilter = screen.getByTestId('hiringreview-filter-department') as HTMLSelectElement
    
    // Filter by 'Engineering'
    fireEvent.change(departmentFilter, { target: { value: 'Engineering' } })
    
    // Should show engineering applications
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('David Park')).toBeTruthy()
  })

  it('displays application details when selected', () => {
    render(<HiringReview />)
    
    // Click on the first application
    const firstApplication = screen.getAllByTestId('hiringreview-item')[0]
    fireEvent.click(firstApplication)
    
    // Should display candidate details
    expect(screen.getByText('sarah.johnson@email.com')).toBeTruthy()
    expect(screen.getByText('+1 (555) 123-4567')).toBeTruthy()
  })

  it('allows updating application status', () => {
    render(<HiringReview />)
    
    // Select an application
    const firstApplication = screen.getAllByTestId('hiringreview-item')[0]
    fireEvent.click(firstApplication)
    
    // Click on a status button
    const interviewButton = screen.getByTestId('hiringreview-status-interview')
    fireEvent.click(interviewButton)
    
    // Status should be updated (verify button has active styling)
    expect(interviewButton.className).toContain('purple')
  })

  it('allows adding notes to applications', () => {
    render(<HiringReview />)
    
    // Select an application
    const firstApplication = screen.getAllByTestId('hiringreview-item')[0]
    fireEvent.click(firstApplication)
    
    // Add a note
    const noteInput = screen.getByTestId('hiringreview-note-input') as HTMLTextAreaElement
    const addNoteButton = screen.getByTestId('hiringreview-add-note')
    
    fireEvent.change(noteInput, { target: { value: 'Great candidate, schedule interview' } })
    fireEvent.click(addNoteButton)
    
    // Note should be added
    expect(screen.getByText(/Great candidate, schedule interview/)).toBeTruthy()
  })

  it('displays empty state when no application is selected', () => {
    render(<HiringReview />)
    
    expect(screen.getByText('No Application Selected')).toBeTruthy()
    expect(screen.getByText('Select an application from the list to view details and update status')).toBeTruthy()
  })

  it('shows correct application count', () => {
    render(<HiringReview />)
    
    // Should show total count
    expect(screen.getByText(/7/)).toBeTruthy()
    expect(screen.getByText(/applications found/)).toBeTruthy()
  })

  it('has all required status update buttons', () => {
    render(<HiringReview />)
    
    // Select an application first
    const firstApplication = screen.getAllByTestId('hiringreview-item')[0]
    fireEvent.click(firstApplication)
    
    // Check all status buttons exist
    expect(screen.getByTestId('hiringreview-status-pending')).toBeTruthy()
    expect(screen.getByTestId('hiringreview-status-reviewing')).toBeTruthy()
    expect(screen.getByTestId('hiringreview-status-interview')).toBeTruthy()
    expect(screen.getByTestId('hiringreview-status-offer')).toBeTruthy()
    expect(screen.getByTestId('hiringreview-status-rejected')).toBeTruthy()
    expect(screen.getByTestId('hiringreview-status-accepted')).toBeTruthy()
  })

  it('disables add note button when input is empty', () => {
    render(<HiringReview />)
    
    // Select an application
    const firstApplication = screen.getAllByTestId('hiringreview-item')[0]
    fireEvent.click(firstApplication)
    
    const addNoteButton = screen.getByTestId('hiringreview-add-note') as HTMLButtonElement
    
    // Button should be disabled initially
    expect(addNoteButton.disabled).toBe(true)
  })
})
