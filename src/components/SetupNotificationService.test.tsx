import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupNotificationService from './SetupNotificationService'

describe('SetupNotificationService', () => {
  it('renders without crashing', () => {
    render(<SetupNotificationService />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SetupNotificationService />)
    expect(screen.getByText('Notification Service Setup')).toBeTruthy()
    expect(screen.getByText('Configure appointment reminders and confirmations')).toBeTruthy()
  })

  it('displays all four tabs', () => {
    render(<SetupNotificationService />)
    expect(screen.getByText('📝 Templates')).toBeTruthy()
    expect(screen.getByText('📡 Channels')).toBeTruthy()
    expect(screen.getByText('📅 Schedules')).toBeTruthy()
    expect(screen.getByText('🔔 Reminders')).toBeTruthy()
  })

  it('displays notification templates by default', () => {
    render(<SetupNotificationService />)
    expect(screen.getByText('Notification Templates')).toBeTruthy()
    expect(screen.getByText('24-Hour Reminder')).toBeTruthy()
    expect(screen.getByText('Appointment Confirmation')).toBeTruthy()
    expect(screen.getByText('2-Hour Reminder')).toBeTruthy()
    expect(screen.getByText('Cancellation Notice')).toBeTruthy()
    expect(screen.getByText('Reschedule Confirmation')).toBeTruthy()
  })

  it('displays statistics cards', () => {
    render(<SetupNotificationService />)
    expect(screen.getByText('Total Reminders')).toBeTruthy()
    expect(screen.getByText('127')).toBeTruthy()
    expect(screen.getByText('Delivered')).toBeTruthy()
    expect(screen.getByText('98.4%')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
    expect(screen.getByText('Failed')).toBeTruthy()
  })

  it('displays action buttons', () => {
    render(<SetupNotificationService />)
    expect(screen.getByText('⚙️ Settings')).toBeTruthy()
    expect(screen.getByText('➕ New Template')).toBeTruthy()
  })
})
