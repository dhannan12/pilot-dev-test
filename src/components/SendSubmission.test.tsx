import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SendSubmission from './SendSubmission'

describe('SendSubmission', () => {
  it('renders without crashing', () => {
    render(<SendSubmission />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<SendSubmission />)
    expect(screen.getByText('Send Submission Confirmation Emails')).toBeTruthy()
    expect(screen.getByText(/Send confirmation emails to parents/i)).toBeTruthy()
  })

  it('displays mock recipients in the dropdown', () => {
    render(<SendSubmission />)
    const recipientSelect = screen.getByTestId('sendsubmission-recipient')
    expect(recipientSelect).toBeTruthy()
    expect(screen.getByText(/Sarah Johnson/)).toBeTruthy()
  })

  it('displays email templates in the dropdown', () => {
    render(<SendSubmission />)
    const templateSelect = screen.getByTestId('sendsubmission-template')
    expect(templateSelect).toBeTruthy()
    expect(screen.getByText(/Standard Confirmation/)).toBeTruthy()
  })

  it('displays sent email history', () => {
    render(<SendSubmission />)
    expect(screen.getByText('Email History')).toBeTruthy()
    const sentEmails = document.querySelectorAll('[data-testid="sendsubmission-item"]')
    expect(sentEmails.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes', () => {
    render(<SendSubmission />)
    // Main wrapper
    expect(document.querySelector('[data-testid="sendsubmission"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="sendsubmission-recipient"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="sendsubmission-template"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="sendsubmission-subject"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="sendsubmission-body"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="sendsubmission-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="sendsubmission-clear"]')).toBeTruthy()
    
    // List containers and items
    expect(document.querySelector('[data-testid="sendsubmission-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="sendsubmission-item"]')).toBeTruthy()
  })

  it('displays submit and clear buttons', () => {
    render(<SendSubmission />)
    const submitButton = screen.getByTestId('sendsubmission-submit')
    const clearButton = screen.getByTestId('sendsubmission-clear')
    expect(submitButton).toBeTruthy()
    expect(clearButton).toBeTruthy()
    expect(submitButton.textContent).toBe('Send Email')
    expect(clearButton.textContent).toBe('Clear')
  })
})
