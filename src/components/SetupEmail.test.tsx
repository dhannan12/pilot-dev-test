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
    expect(screen.getByText('Email Notification Setup')).toBeTruthy()
  })

  it('renders SMTP configuration tab by default', () => {
    render(<SetupEmail />)
    expect(screen.getByText('SMTP Server Settings')).toBeTruthy()
    expect(screen.getByDisplayValue('smtp.gmail.com')).toBeTruthy()
  })

  it('switches to templates tab when clicked', () => {
    render(<SetupEmail />)
    const templatesTab = screen.getByTestId('setupemail-tab-templates')
    fireEvent.click(templatesTab)
    expect(screen.getByTestId('setupemail-templates-section')).toBeTruthy()
  })

  it('switches to logs tab when clicked', () => {
    render(<SetupEmail />)
    const logsTab = screen.getByTestId('setupemail-tab-logs')
    fireEvent.click(logsTab)
    expect(screen.getByText('Email Notification History')).toBeTruthy()
  })

  it('displays mock email templates', () => {
    render(<SetupEmail />)
    fireEvent.click(screen.getByTestId('setupemail-tab-templates'))
    expect(screen.getByText('Volunteer Registration Confirmation')).toBeTruthy()
    expect(screen.getByText('Shift Assignment Notification')).toBeTruthy()
    expect(screen.getByText('Weekly Schedule Summary')).toBeTruthy()
  })

  it('displays mock email logs', () => {
    render(<SetupEmail />)
    fireEvent.click(screen.getByTestId('setupemail-tab-logs'))
    expect(screen.getByText('john.smith@example.com')).toBeTruthy()
    expect(screen.getByText('sarah.johnson@example.com')).toBeTruthy()
  })

  it('allows toggling template enabled status', () => {
    render(<SetupEmail />)
    fireEvent.click(screen.getByTestId('setupemail-tab-templates'))
    const toggleButtons = screen.getAllByTestId('setupemail-toggle-template')
    const firstButton = toggleButtons[0]
    const initialText = firstButton.textContent
    fireEvent.click(firstButton)
    expect(firstButton.textContent).not.toBe(initialText)
  })

  it('has required data-testid attributes', () => {
    render(<SetupEmail />)
    
    // Main wrapper
    expect(screen.getByTestId('setupemail')).toBeTruthy()
    
    // Tab buttons
    expect(screen.getByTestId('setupemail-tab-smtp')).toBeTruthy()
    expect(screen.getByTestId('setupemail-tab-templates')).toBeTruthy()
    expect(screen.getByTestId('setupemail-tab-logs')).toBeTruthy()
    
    // SMTP inputs
    expect(screen.getByTestId('setupemail-smtp-host')).toBeTruthy()
    expect(screen.getByTestId('setupemail-smtp-port')).toBeTruthy()
    expect(screen.getByTestId('setupemail-smtp-user')).toBeTruthy()
    expect(screen.getByTestId('setupemail-smtp-password')).toBeTruthy()
    expect(screen.getByTestId('setupemail-from-email')).toBeTruthy()
    expect(screen.getByTestId('setupemail-from-name')).toBeTruthy()
    
    // Test email
    expect(screen.getByTestId('setupemail-test-email')).toBeTruthy()
    expect(screen.getByTestId('setupemail-send-test')).toBeTruthy()
    
    // Action buttons
    expect(screen.getByTestId('setupemail-save-smtp')).toBeTruthy()
    expect(screen.getByTestId('setupemail-cancel')).toBeTruthy()
  })

  it('has data-testid on template list items', () => {
    render(<SetupEmail />)
    fireEvent.click(screen.getByTestId('setupemail-tab-templates'))
    
    expect(screen.getByTestId('setupemail-list')).toBeTruthy()
    const items = screen.getAllByTestId('setupemail-item')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('has data-testid on log list items', () => {
    render(<SetupEmail />)
    fireEvent.click(screen.getByTestId('setupemail-tab-logs'))
    
    expect(screen.getByTestId('setupemail-logs-list')).toBeTruthy()
    const logItems = screen.getAllByTestId('setupemail-log-item')
    expect(logItems.length).toBeGreaterThanOrEqual(5)
  })

  it('allows input in SMTP fields', () => {
    render(<SetupEmail />)
    const hostInput = screen.getByTestId('setupemail-smtp-host') as HTMLInputElement
    fireEvent.change(hostInput, { target: { value: 'smtp.sendgrid.net' } })
    expect(hostInput.value).toBe('smtp.sendgrid.net')
  })

  it('allows input in test email field', () => {
    render(<SetupEmail />)
    const testEmailInput = screen.getByTestId('setupemail-test-email') as HTMLInputElement
    fireEvent.change(testEmailInput, { target: { value: 'test@example.com' } })
    expect(testEmailInput.value).toBe('test@example.com')
  })
})
