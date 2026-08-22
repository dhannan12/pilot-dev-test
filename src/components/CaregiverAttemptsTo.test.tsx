import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CaregiverAttemptsTo from './CaregiverAttemptsTo'

describe('CaregiverAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<CaregiverAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays health metrics with access denied status', () => {
    render(<CaregiverAttemptsTo />)
    expect(screen.getByText('Health Metrics Monitor')).toBeInTheDocument()
    expect(screen.getAllByText('Margaret Thompson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Robert Chen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Linda Martinez').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Access Denied')).toHaveLength(5)
  })

  it('displays access attempt log', () => {
    render(<CaregiverAttemptsTo />)
    expect(screen.getByText('Access Attempt Log')).toBeInTheDocument()
    expect(screen.getByText(/No active permission granted by user/)).toBeInTheDocument()
    expect(screen.getByText(/Permission expired on 2026-08-15/)).toBeInTheDocument()
  })

  it('shows privacy protection information', () => {
    render(<CaregiverAttemptsTo />)
    expect(screen.getByText('Privacy Protection Active')).toBeInTheDocument()
    expect(screen.getByText(/All health metrics are protected by user privacy settings/)).toBeInTheDocument()
  })

  it('opens request modal when request access button is clicked', () => {
    render(<CaregiverAttemptsTo />)
    const requestButtons = screen.getAllByTestId('caregiverattemptsto-request')
    fireEvent.click(requestButtons[0])
    
    expect(screen.getAllByText('Request Access Permission').length).toBeGreaterThan(0)
    expect(screen.getByTestId('caregiverattemptsto-modal')).toBeInTheDocument()
  })

  it('closes modal when cancel button is clicked', () => {
    render(<CaregiverAttemptsTo />)
    const requestButtons = screen.getAllByTestId('caregiverattemptsto-request')
    fireEvent.click(requestButtons[0])
    
    const cancelButton = screen.getByTestId('caregiverattemptsto-cancel')
    fireEvent.click(cancelButton)
    
    expect(screen.queryByTestId('caregiverattemptsto-modal')).not.toBeInTheDocument()
  })

  it('adds new access attempt when request is submitted', () => {
    render(<CaregiverAttemptsTo />)
    
    // Count initial attempts
    const initialAttempts = screen.getAllByTestId('caregiverattemptsto-attempt-item')
    const initialCount = initialAttempts.length
    
    // Open modal and submit request
    const requestButtons = screen.getAllByTestId('caregiverattemptsto-request')
    fireEvent.click(requestButtons[0])
    
    const submitButton = screen.getByTestId('caregiverattemptsto-submit')
    fireEvent.click(submitButton)
    
    // Check that a new attempt was added
    const updatedAttempts = screen.getAllByTestId('caregiverattemptsto-attempt-item')
    expect(updatedAttempts.length).toBe(initialCount + 1)
  })

  it('has required data-testid attributes', () => {
    render(<CaregiverAttemptsTo />)
    
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('caregiverattemptsto')).toBeInTheDocument()
    expect(screen.getByTestId('caregiverattemptsto-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('caregiverattemptsto-item').length).toBeGreaterThan(0)
    expect(screen.getByTestId('caregiverattemptsto-attempts-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('caregiverattemptsto-attempt-item').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('caregiverattemptsto-request').length).toBeGreaterThan(0)
  })

  it('displays limited access mode indicator', () => {
    render(<CaregiverAttemptsTo />)
    expect(screen.getByText('Limited Access Mode')).toBeInTheDocument()
  })

  it('shows masked health metric values', () => {
    render(<CaregiverAttemptsTo />)
    expect(screen.getByText('***/**')).toBeInTheDocument() // Blood pressure
    expect(screen.getByText('*** BPM')).toBeInTheDocument() // Heart rate
    expect(screen.getByText('*** mg/dL')).toBeInTheDocument() // Blood glucose
  })
})
