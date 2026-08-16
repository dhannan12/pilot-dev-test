import { render, screen, act } from '@testing-library/react'
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

  it('displays all three tabs', () => {
    render(<SetupEmail />)
    expect(screen.getByText('SMTP Configuration')).toBeTruthy()
    expect(screen.getByText('Email Templates')).toBeTruthy()
    expect(screen.getByText('Notification Settings')).toBeTruthy()
  })

  it('displays email providers', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Custom SMTP')).toBeTruthy()
    expect(screen.getByText('Gmail')).toBeTruthy()
    expect(screen.getByText('SendGrid')).toBeTruthy()
    expect(screen.getByText('Mailgun')).toBeTruthy()
    expect(screen.getByText('Amazon SES')).toBeTruthy()
  })

  it('displays SMTP configuration form fields', () => {
    render(<SetupEmail />)
    expect(screen.getByText('SMTP Host')).toBeTruthy()
    expect(screen.getByText('SMTP Port')).toBeTruthy()
    expect(screen.getByText('Username')).toBeTruthy()
    expect(screen.getByText('Password')).toBeTruthy()
    expect(screen.getByText('From Email')).toBeTruthy()
    expect(screen.getByText('From Name')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupEmail />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupemail"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="setupemail-tab-config"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-tab-templates"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-tab-notifications"]')).toBeTruthy()
    
    // SMTP form inputs
    expect(document.querySelector('[data-testid="setupemail-smtp-host"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-smtp-port"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-smtp-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-smtp-password"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-from-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-from-name"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="setupemail-test-connection"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-test-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-send-test"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-save-config"]')).toBeTruthy()
    
    // Provider buttons
    expect(document.querySelector('[data-testid="setupemail-provider-smtp"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-provider-gmail"]')).toBeTruthy()
  })

  it('displays all email templates with data-testid', () => {
    render(<SetupEmail />)
    
    // Click templates tab
    const templatesTab = document.querySelector('[data-testid="setupemail-tab-templates"]') as HTMLButtonElement
    act(() => {
      templatesTab?.click()
    })
    
    // Check templates list exists
    expect(document.querySelector('[data-testid="setupemail-templates-list"]')).toBeTruthy()
    
    // Check template items exist
    const templateItems = document.querySelectorAll('[data-testid="setupemail-template-item"]')
    expect(templateItems.length).toBeGreaterThan(0)
  })

  it('displays notification settings with toggles', () => {
    render(<SetupEmail />)
    
    // Click notifications tab
    const notificationsTab = document.querySelector('[data-testid="setupemail-tab-notifications"]') as HTMLButtonElement
    act(() => {
      notificationsTab?.click()
    })
    
    // Check notifications list exists
    expect(document.querySelector('[data-testid="setupemail-notifications-list"]')).toBeTruthy()
    
    // Check notification items exist
    const notificationItems = document.querySelectorAll('[data-testid="setupemail-notification-item"]')
    expect(notificationItems.length).toBeGreaterThan(0)
  })
})
