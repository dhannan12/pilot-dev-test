import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UnauthorizedUserAttempts from './UnauthorizedUserAttempts'

describe('UnauthorizedUserAttempts', () => {
  it('renders without crashing', () => {
    render(<UnauthorizedUserAttempts />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<UnauthorizedUserAttempts />)
    expect(screen.getByText('Unauthorized Access Attempts')).toBeTruthy()
  })

  it('displays mock unauthorized attempts data', () => {
    render(<UnauthorizedUserAttempts />)
    expect(screen.getByText(/John Doe/)).toBeTruthy()
    expect(screen.getByText(/Jane Smith/)).toBeTruthy()
    expect(screen.getByText(/Bob Johnson/)).toBeTruthy()
    expect(screen.getByText(/Alice Williams/)).toBeTruthy()
    expect(screen.getByText(/Charlie Brown/)).toBeTruthy()
  })

  it('displays attempt details including reasons', () => {
    render(<UnauthorizedUserAttempts />)
    expect(screen.getByText(/Not a parent\/guardian of this student/)).toBeTruthy()
    expect(screen.getByText(/Account not verified/)).toBeTruthy()
    expect(screen.getByText(/Insufficient permissions/)).toBeTruthy()
  })

  it('displays statistics', () => {
    render(<UnauthorizedUserAttempts />)
    expect(screen.getByText('Total Attempts')).toBeTruthy()
    expect(screen.getByText('Last 24 Hours')).toBeTruthy()
    expect(screen.getByText('Unique Users')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UnauthorizedUserAttempts />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="unauthorizeduserattempts"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="unauthorizeduserattempts-student-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="unauthorizeduserattempts-absence-reason"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="unauthorizeduserattempts-submit"]')).toBeTruthy()
    
    // List elements
    expect(document.querySelector('[data-testid="unauthorizeduserattempts-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="unauthorizeduserattempts-item"]')).toBeTruthy()
  })

  it('displays the demo form for unauthorized submission', () => {
    render(<UnauthorizedUserAttempts />)
    expect(screen.getByText('Try Submitting as Unauthorized User (Demo)')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter student name')).toBeTruthy()
    expect(screen.getByPlaceholderText('Enter absence reason')).toBeTruthy()
  })

  it('shows access denied modal when demo form is submitted', () => {
    render(<UnauthorizedUserAttempts />)
    
    const studentInput = screen.getByTestId('unauthorizeduserattempts-student-name')
    const reasonInput = screen.getByTestId('unauthorizeduserattempts-absence-reason')
    const submitButton = screen.getByTestId('unauthorizeduserattempts-submit')
    
    fireEvent.change(studentInput, { target: { value: 'Test Student' } })
    fireEvent.change(reasonInput, { target: { value: 'Sick' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Access Denied')).toBeTruthy()
    expect(screen.getByText(/Unauthorized Submission Attempt Blocked/)).toBeTruthy()
  })

  it('closes the modal when close button is clicked', () => {
    render(<UnauthorizedUserAttempts />)
    
    const studentInput = screen.getByTestId('unauthorizeduserattempts-student-name')
    const reasonInput = screen.getByTestId('unauthorizeduserattempts-absence-reason')
    const submitButton = screen.getByTestId('unauthorizeduserattempts-submit')
    
    fireEvent.change(studentInput, { target: { value: 'Test Student' } })
    fireEvent.change(reasonInput, { target: { value: 'Sick' } })
    fireEvent.click(submitButton)
    
    const closeButton = screen.getByTestId('unauthorizeduserattempts-close')
    fireEvent.click(closeButton)
    
    expect(screen.queryByText('Access Denied')).toBeFalsy()
  })

  it('displays BLOCKED badges for all attempts', () => {
    render(<UnauthorizedUserAttempts />)
    const blockedBadges = screen.getAllByText('BLOCKED')
    expect(blockedBadges.length).toBeGreaterThan(0)
  })
})
