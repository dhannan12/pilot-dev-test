import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupEmail from './SetupEmail'

describe('SetupEmail', () => {
  it('renders without crashing', () => {
    render(<SetupEmail />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Email Notification Service')).toBeTruthy()
  })

  it('displays email templates by default', () => {
    render(<SetupEmail />)
    expect(screen.getAllByText('Email Templates').length).toBeGreaterThan(0)
    expect(screen.getByText('Welcome Email')).toBeTruthy()
    expect(screen.getByText('Class Reminder')).toBeTruthy()
  })

  it('displays multiple mock email templates', () => {
    render(<SetupEmail />)
    // Should have at least 5 templates (SCRUM-1040 requires min 5 items)
    const templates = screen.getAllByTestId('setupemail-item')
    expect(templates.length).toBeGreaterThanOrEqual(5)
  })

  it('switches to SMTP settings tab', () => {
    render(<SetupEmail />)
    const smtpTab = screen.getByTestId('setupemail-tab-smtp')
    fireEvent.click(smtpTab)
    expect(screen.getByText('SMTP Configuration')).toBeTruthy()
    expect(screen.getByTestId('setupemail-host')).toBeTruthy()
  })

  it('switches to test email tab', () => {
    render(<SetupEmail />)
    const testTab = screen.getByTestId('setupemail-tab-test')
    fireEvent.click(testTab)
    expect(screen.getByText('Test Email Delivery')).toBeTruthy()
    expect(screen.getByTestId('setupemail-recipient')).toBeTruthy()
  })

  it('displays SMTP configuration form fields', () => {
    render(<SetupEmail />)
    const smtpTab = screen.getByTestId('setupemail-tab-smtp')
    fireEvent.click(smtpTab)
    
    expect(screen.getByTestId('setupemail-host')).toBeTruthy()
    expect(screen.getByTestId('setupemail-port')).toBeTruthy()
    expect(screen.getByTestId('setupemail-secure')).toBeTruthy()
    expect(screen.getByTestId('setupemail-username')).toBeTruthy()
    expect(screen.getByTestId('setupemail-fromemail')).toBeTruthy()
    expect(screen.getByTestId('setupemail-fromname')).toBeTruthy()
  })

  it('allows updating SMTP host field', () => {
    render(<SetupEmail />)
    const smtpTab = screen.getByTestId('setupemail-tab-smtp')
    fireEvent.click(smtpTab)
    
    const hostInput = screen.getByTestId('setupemail-host') as HTMLInputElement
    fireEvent.change(hostInput, { target: { value: 'smtp.newhost.com' } })
    expect(hostInput.value).toBe('smtp.newhost.com')
  })

  it('allows entering test email recipient', () => {
    render(<SetupEmail />)
    const testTab = screen.getByTestId('setupemail-tab-test')
    fireEvent.click(testTab)
    
    const recipientInput = screen.getByTestId('setupemail-recipient') as HTMLInputElement
    fireEvent.change(recipientInput, { target: { value: 'test@example.com' } })
    expect(recipientInput.value).toBe('test@example.com')
  })

  it('shows success message after sending test email', () => {
    render(<SetupEmail />)
    const testTab = screen.getByTestId('setupemail-tab-test')
    fireEvent.click(testTab)
    
    const recipientInput = screen.getByTestId('setupemail-recipient')
    fireEvent.change(recipientInput, { target: { value: 'test@example.com' } })
    
    const sendButton = screen.getByTestId('setupemail-send')
    fireEvent.click(sendButton)
    
    expect(screen.getByTestId('setupemail-success')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupEmail />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupemail"]')).toBeTruthy()
    
    // Tab navigation
    expect(screen.getByTestId('setupemail-tab-templates')).toBeTruthy()
    expect(screen.getByTestId('setupemail-tab-smtp')).toBeTruthy()
    expect(screen.getByTestId('setupemail-tab-test')).toBeTruthy()
    
    // Templates list
    expect(screen.getByTestId('setupemail-list')).toBeTruthy()
    
    // Template items and actions
    const items = screen.getAllByTestId('setupemail-item')
    expect(items.length).toBeGreaterThan(0)
    
    const previewButtons = screen.getAllByTestId('setupemail-preview')
    expect(previewButtons.length).toBeGreaterThan(0)
    
    const toggleButtons = screen.getAllByTestId('setupemail-toggle')
    expect(toggleButtons.length).toBeGreaterThan(0)
  })

  it('has all SMTP form data-testid attributes', () => {
    render(<SetupEmail />)
    const smtpTab = screen.getByTestId('setupemail-tab-smtp')
    fireEvent.click(smtpTab)
    
    expect(screen.getByTestId('setupemail-host')).toBeTruthy()
    expect(screen.getByTestId('setupemail-port')).toBeTruthy()
    expect(screen.getByTestId('setupemail-secure')).toBeTruthy()
    expect(screen.getByTestId('setupemail-username')).toBeTruthy()
    expect(screen.getByTestId('setupemail-fromemail')).toBeTruthy()
    expect(screen.getByTestId('setupemail-fromname')).toBeTruthy()
    expect(screen.getByTestId('setupemail-save')).toBeTruthy()
  })

  it('has all test email form data-testid attributes', () => {
    render(<SetupEmail />)
    const testTab = screen.getByTestId('setupemail-tab-test')
    fireEvent.click(testTab)
    
    expect(screen.getByTestId('setupemail-template')).toBeTruthy()
    expect(screen.getByTestId('setupemail-recipient')).toBeTruthy()
    expect(screen.getByTestId('setupemail-send')).toBeTruthy()
  })

  it('toggles template enabled status', () => {
    render(<SetupEmail />)
    
    // Get first toggle button
    const toggleButtons = screen.getAllByTestId('setupemail-toggle')
    const firstToggle = toggleButtons[0]
    
    // Click toggle
    fireEvent.click(firstToggle)
    
    // Component should still render without errors
    expect(document.querySelector('[data-testid="setupemail"]')).toBeTruthy()
  })

  it('displays template type badges', () => {
    render(<SetupEmail />)
    
    expect(screen.getByText('welcome')).toBeTruthy()
    expect(screen.getByText('reminder')).toBeTruthy()
    expect(screen.getAllByText('confirmation').length).toBeGreaterThan(0)
    expect(screen.getAllByText('alert').length).toBeGreaterThan(0)
  })

  it('displays template statistics', () => {
    render(<SetupEmail />)
    
    // Check for last sent and send count information
    const items = screen.getAllByTestId('setupemail-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
    
    // At least one item should show statistics
    expect(screen.getAllByText(/Last sent:/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Total sent:/).length).toBeGreaterThan(0)
  })
})
