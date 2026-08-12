import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotifyMembers from './NotifyMembers'

describe('NotifyMembers', () => {
  it('renders without crashing', () => {
    render(<NotifyMembers />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<NotifyMembers />)
    expect(screen.getByText('Notify Members')).toBeTruthy()
  })

  it('displays mock registration data', () => {
    render(<NotifyMembers />)
    expect(screen.getByText('Alice Johnson')).toBeTruthy()
    expect(screen.getByText('Bob Smith')).toBeTruthy()
    expect(screen.getByText('Carol Williams')).toBeTruthy()
  })

  it('displays event names in the registrations list', () => {
    render(<NotifyMembers />)
    const annualConf = screen.getAllByText('Annual Tech Conference 2026')
    expect(annualConf.length).toBeGreaterThan(0)
    expect(screen.getByText('Web Development Workshop')).toBeTruthy()
    expect(screen.getByText('Community Networking Event')).toBeTruthy()
  })

  it('shows notification statistics', () => {
    render(<NotifyMembers />)
    expect(screen.getByText('Total Registrations')).toBeTruthy()
    expect(screen.getByText('Notifications Sent')).toBeTruthy()
    expect(screen.getByText('Pending Notifications')).toBeTruthy()
  })

  it('displays notification template section', () => {
    render(<NotifyMembers />)
    expect(screen.getByText('Notification Template')).toBeTruthy()
    expect(screen.getByText('Select Template')).toBeTruthy()
  })

  it('allows filtering registrations by status', () => {
    render(<NotifyMembers />)
    const allButton = screen.getByRole('button', { name: /All/i })
    const sentButton = screen.getByRole('button', { name: /Sent/i })
    const pendingButton = screen.getByRole('button', { name: /Pending/i })
    
    expect(allButton).toBeTruthy()
    expect(sentButton).toBeTruthy()
    expect(pendingButton).toBeTruthy()
  })

  it('displays sent and pending status badges', () => {
    render(<NotifyMembers />)
    const sentBadges = screen.getAllByText('Sent')
    const pendingBadges = screen.getAllByText('Pending')
    
    expect(sentBadges.length).toBeGreaterThan(0)
    expect(pendingBadges.length).toBeGreaterThan(0)
  })

  it('allows selecting registrations with checkboxes', () => {
    render(<NotifyMembers />)
    const checkboxes = screen.getAllByRole('checkbox')
    
    expect(checkboxes.length).toBeGreaterThan(0)
    
    // Click the first checkbox
    fireEvent.click(checkboxes[1]) // Index 0 is "Select All", so use index 1
    expect((checkboxes[1] as HTMLInputElement).checked).toBe(true)
  })

  it('has a send notifications button', () => {
    render(<NotifyMembers />)
    const sendButton = screen.getByRole('button', { name: /Send to/i })
    expect(sendButton).toBeTruthy()
  })

  it('displays template preview', () => {
    render(<NotifyMembers />)
    expect(screen.getByText('Preview')).toBeTruthy()
  })

  it('shows select all pending checkbox', () => {
    render(<NotifyMembers />)
    const selectAllText = screen.getByText(/Select All Pending/i)
    expect(selectAllText).toBeTruthy()
  })

  it('enables send button when registrations are selected', () => {
    render(<NotifyMembers />)
    const checkboxes = screen.getAllByRole('checkbox')
    
    // Select a registration
    fireEvent.click(checkboxes[1])
    
    const sendButton = screen.getByRole('button', { name: /Send to 1 Member/i })
    expect(sendButton).toBeTruthy()
    expect(sendButton.className).not.toContain('cursor-not-allowed')
  })

  it('updates notification status when send button is clicked', () => {
    render(<NotifyMembers />)
    const checkboxes = screen.getAllByRole('checkbox')
    
    // Select a registration
    fireEvent.click(checkboxes[1])
    
    // Click send button
    const sendButton = screen.getByRole('button', { name: /Send to 1 Member/i })
    fireEvent.click(sendButton)
    
    // Button should revert to disabled state after sending
    const disabledButton = screen.getByRole('button', { name: /Send to 0 Members/i })
    expect(disabledButton).toBeTruthy()
  })

  it('displays member email addresses', () => {
    render(<NotifyMembers />)
    expect(screen.getByText('alice.johnson@example.com')).toBeTruthy()
    expect(screen.getByText('bob.smith@example.com')).toBeTruthy()
  })
})
