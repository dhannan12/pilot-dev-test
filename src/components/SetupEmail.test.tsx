import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupEmail from './SetupEmail'

describe('SetupEmail', () => {
  it('renders without crashing', () => {
    render(<SetupEmail />)
    expect(document.body).toBeTruthy()
  })

  it('displays email notification setup heading', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Email Notification Setup')).toBeTruthy()
  })

  it('displays mock email templates when tab is clicked', () => {
    const { container } = render(<SetupEmail />)
    const templatesTab = container.querySelector('[data-testid="setupemail-tab-templates"]') as HTMLButtonElement
    fireEvent.click(templatesTab)
    expect(screen.getByText('Cancellation Alert - Customer')).toBeTruthy()
    expect(screen.getByText('Cancellation Alert - Staff')).toBeTruthy()
    expect(screen.getByText('Booking Confirmation')).toBeTruthy()
    expect(screen.getByText('Appointment Reminder')).toBeTruthy()
    expect(screen.getByText('Appointment Update')).toBeTruthy()
  })

  it('displays notification preferences when tab is clicked', () => {
    const { container } = render(<SetupEmail />)
    const preferencesTab = container.querySelector('[data-testid="setupemail-tab-preferences"]') as HTMLButtonElement
    fireEvent.click(preferencesTab)
    expect(screen.getByText('Appointment Cancelled')).toBeTruthy()
    expect(screen.getByText('Appointment Confirmed')).toBeTruthy()
    expect(screen.getByText('Payment Received')).toBeTruthy()
  })

  it('displays SMTP configuration fields', () => {
    render(<SetupEmail />)
    expect(screen.getByText('SMTP Host')).toBeTruthy()
    expect(screen.getByText('Port')).toBeTruthy()
    expect(screen.getByText('Username')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupEmail />)
    // Main wrapper
    expect(document.querySelector('[data-testid="setupemail"]')).toBeTruthy()
    // Tab buttons
    expect(document.querySelector('[data-testid="setupemail-tab-smtp"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-tab-templates"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-tab-preferences"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-tab-test"]')).toBeTruthy()
    // SMTP fields
    expect(document.querySelector('[data-testid="setupemail-host"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-port"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-username"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupemail-password"]')).toBeTruthy()
    // Primary button
    expect(document.querySelector('[data-testid="setupemail-save"]')).toBeTruthy()
    // List container (templates, shown when tab changes)
    expect(document.querySelector('[data-testid="setupemail-list"]')).toBeFalsy() // Not visible on default tab
  })

  it('displays service status indicator', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Connected')).toBeTruthy()
  })

  it('displays quick stats section', () => {
    render(<SetupEmail />)
    expect(screen.getByText('Active Templates')).toBeTruthy()
    expect(screen.getByText('Enabled Notifications')).toBeTruthy()
    expect(screen.getByText('Cancellation Alerts')).toBeTruthy()
    expect(screen.getByText('Service Status')).toBeTruthy()
  })
})
