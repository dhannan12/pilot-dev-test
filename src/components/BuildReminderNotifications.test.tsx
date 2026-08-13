import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildReminderNotifications from './BuildReminderNotifications'

describe('BuildReminderNotifications', () => {
  it('renders without crashing', () => {
    render(<BuildReminderNotifications />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<BuildReminderNotifications />)
    expect(screen.getByText('Reminder Notifications')).toBeInTheDocument()
    expect(screen.getByText('Manage and monitor appointment reminder notifications')).toBeInTheDocument()
  })

  it('displays mock reminder data', () => {
    render(<BuildReminderNotifications />)
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('Michael Chen')).toBeInTheDocument()
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument()
    expect(screen.getByText('David Thompson')).toBeInTheDocument()
    expect(screen.getByText('Jessica Martinez')).toBeInTheDocument()
  })

  it('displays reminder statistics cards', () => {
    render(<BuildReminderNotifications />)
    expect(screen.getByText('Total Reminders')).toBeInTheDocument()
    expect(screen.getAllByText('Scheduled').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sent').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Failed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Cancelled').length).toBeGreaterThan(0)
  })

  it('displays filter controls', () => {
    render(<BuildReminderNotifications />)
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Filter by Status')).toBeInTheDocument()
    expect(screen.getByText('Filter by Type')).toBeInTheDocument()
  })

  it('displays table headers', () => {
    render(<BuildReminderNotifications />)
    expect(screen.getByText('Patient')).toBeInTheDocument()
    expect(screen.getByText('Appointment')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Send Before')).toBeInTheDocument()
    expect(screen.getByText('Scheduled For')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('displays appointment types', () => {
    render(<BuildReminderNotifications />)
    expect(screen.getByText('Regular Checkup')).toBeInTheDocument()
    expect(screen.getByText('Teeth Cleaning')).toBeInTheDocument()
    expect(screen.getByText('Root Canal')).toBeInTheDocument()
  })
})
