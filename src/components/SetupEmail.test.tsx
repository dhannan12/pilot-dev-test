import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupEmail from './SetupEmail'

describe('SetupEmail', () => {
  it('renders without crashing', () => {
    render(<SetupEmail />)
    expect(document.body).toBeTruthy()
  })

  it('displays the email service setup header', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Email Service Setup')).toBeTruthy()
    expect(screen.getByText(/Configure email notifications for application status changes/i)).toBeTruthy()
  })

  it('shows active service status banner', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Email service is active')).toBeTruthy()
    expect(screen.getByText(/Nodemailer \+ Bull queue configured/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupEmail />)
    
    // Main component wrapper
    expect(document.querySelector('[data-testid="setup-email"]')).toBeTruthy()
    
    // Tab navigation
    expect(document.querySelector('[data-testid="setup-email-tabs"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-tab-smtp"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-tab-templates"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-tab-preferences"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-tab-queue"]')).toBeTruthy()
    
    // SMTP panel elements (default tab)
    expect(document.querySelector('[data-testid="setup-email-smtp-panel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-smtp-host"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-smtp-port"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-save-smtp"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setup-email-test-connection"]')).toBeTruthy()
  })

  it('displays SMTP configuration panel by default', () => {
    render(<SetupEmail />)
    expect(screen.getByTestId('setup-email-smtp-panel')).toBeTruthy()
    expect(screen.getByText('SMTP Server Settings')).toBeTruthy()
  })

  it('switches to email templates tab', () => {
    render(<SetupEmail />)
    const templatesTab = screen.getByTestId('setup-email-tab-templates')
    fireEvent.click(templatesTab)
    
    expect(screen.getByTestId('setup-email-templates-panel')).toBeTruthy()
    expect(screen.getByTestId('setup-email-templates-list')).toBeTruthy()
  })

  it('displays email template list', () => {
    render(<SetupEmail />)
    const templatesTab = screen.getByTestId('setup-email-tab-templates')
    fireEvent.click(templatesTab)
    
    expect(screen.getByTestId('setup-email-templates-list')).toBeTruthy()
    const templateItems = document.querySelectorAll('[data-testid="setup-email-template-item"]')
    expect(templateItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays notification preferences when tab is clicked', () => {
    render(<SetupEmail />)
    const preferencesTab = screen.getByTestId('setup-email-tab-preferences')
    fireEvent.click(preferencesTab)
    
    expect(screen.getByTestId('setup-email-preferences-panel')).toBeTruthy()
    expect(screen.getByTestId('setup-email-preferences-list')).toBeTruthy()
  })

  it('displays preference items with toggles', () => {
    render(<SetupEmail />)
    const preferencesTab = screen.getByTestId('setup-email-tab-preferences')
    fireEvent.click(preferencesTab)
    
    expect(screen.getByTestId('setup-email-preferences-list')).toBeTruthy()
    const preferenceItems = document.querySelectorAll('[data-testid="setup-email-preference-item"]')
    expect(preferenceItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays queue status when tab is clicked', () => {
    render(<SetupEmail />)
    const queueTab = screen.getByTestId('setup-email-tab-queue')
    fireEvent.click(queueTab)
    
    expect(screen.getByTestId('setup-email-queue-panel')).toBeTruthy()
    expect(screen.getByText('Email Queue Status')).toBeTruthy()
  })

  it('displays queue statistics', () => {
    render(<SetupEmail />)
    const queueTab = screen.getByTestId('setup-email-tab-queue')
    fireEvent.click(queueTab)
    
    expect(screen.getByTestId('setup-email-queue-pending')).toBeTruthy()
    expect(screen.getByTestId('setup-email-queue-processing')).toBeTruthy()
    expect(screen.getByTestId('setup-email-queue-completed')).toBeTruthy()
    expect(screen.getByTestId('setup-email-queue-failed')).toBeTruthy()
  })

  it('displays recent queue jobs', () => {
    render(<SetupEmail />)
    const queueTab = screen.getByTestId('setup-email-tab-queue')
    fireEvent.click(queueTab)
    
    expect(screen.getByTestId('setup-email-queue-jobs')).toBeTruthy()
    const jobItems = document.querySelectorAll('[data-testid="setup-email-queue-job"]')
    expect(jobItems.length).toBeGreaterThanOrEqual(5)
  })

  it('handles test email button click', () => {
    render(<SetupEmail />)
    const testButton = screen.getByTestId('setup-email-test-connection')
    
    expect(testButton.textContent).toContain('Send Test Email')
    fireEvent.click(testButton)
    expect(testButton.textContent).toContain('Test Email Sent!')
  })

  it('allows SMTP configuration input changes', () => {
    render(<SetupEmail />)
    const hostInput = screen.getByTestId('setup-email-smtp-host') as HTMLInputElement
    
    fireEvent.change(hostInput, { target: { value: 'smtp.example.com' } })
    expect(hostInput.value).toBe('smtp.example.com')
  })
})
