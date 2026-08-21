import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BuildSubmission from './BuildSubmission'

describe('BuildSubmission', () => {
  it('renders without crashing', () => {
    render(<BuildSubmission />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main submission confirmation wrapper', () => {
    render(<BuildSubmission />)
    const wrapper = screen.getByTestId('buildsubmission')
    expect(wrapper).toBeTruthy()
  })

  it('displays mock submission data', () => {
    render(<BuildSubmission />)
    // Check for reference number (use getAllByText since it appears multiple times)
    const refNumbers = screen.getAllByText(/ABS-2026-001234/i)
    expect(refNumbers.length).toBeGreaterThan(0)
    // Check for student name (also appears multiple times)
    const studentNames = screen.getAllByText(/Emma Thompson/i)
    expect(studentNames.length).toBeGreaterThan(0)
    // Check for confirmation message
    expect(screen.getByRole('heading', { name: /Submission Confirmed/i })).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<BuildSubmission />)
    
    // Main wrapper
    expect(screen.getByTestId('buildsubmission')).toBeTruthy()
    
    // Action buttons
    expect(screen.getByTestId('buildsubmission-print')).toBeTruthy()
    expect(screen.getByTestId('buildsubmission-new')).toBeTruthy()
    expect(screen.getByTestId('buildsubmission-home')).toBeTruthy()
    expect(screen.getByTestId('buildsubmission-contact')).toBeTruthy()
    expect(screen.getByTestId('buildsubmission-copy-email')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('buildsubmission-list')).toBeTruthy()
    const items = screen.getAllByTestId('buildsubmission-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays recent submissions list', () => {
    render(<BuildSubmission />)
    const list = screen.getByTestId('buildsubmission-list')
    const items = screen.getAllByTestId('buildsubmission-item')
    expect(list).toBeTruthy()
    expect(items.length).toBe(5)
  })

  it('renders action buttons', () => {
    render(<BuildSubmission />)
    expect(screen.getByTestId('buildsubmission-print')).toBeTruthy()
    expect(screen.getByTestId('buildsubmission-new')).toBeTruthy()
    expect(screen.getByTestId('buildsubmission-home')).toBeTruthy()
  })

  it('displays submission status with appropriate styling', () => {
    render(<BuildSubmission />)
    // Check that status is displayed (using getAllByText since 'Confirmed' appears multiple times)
    const statusElements = screen.getAllByText(/^Confirmed$/i)
    expect(statusElements.length).toBeGreaterThan(0)
  })

  it('allows selecting different submissions from the list', () => {
    render(<BuildSubmission />)
    const items = screen.getAllByTestId('buildsubmission-item')
    
    // Click on a different submission
    fireEvent.click(items[1])
    
    // The component should still be functional
    expect(screen.getByTestId('buildsubmission')).toBeTruthy()
  })

  it('displays what happens next section', () => {
    render(<BuildSubmission />)
    expect(screen.getByText(/What Happens Next?/i)).toBeTruthy()
  })

  it('displays help section with contact button', () => {
    render(<BuildSubmission />)
    expect(screen.getByText(/Need Help?/i)).toBeTruthy()
    expect(screen.getByTestId('buildsubmission-contact')).toBeTruthy()
  })
})
