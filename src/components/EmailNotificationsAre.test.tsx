import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EmailNotificationsAre from './EmailNotificationsAre'

describe('EmailNotificationsAre', () => {
  it('renders without crashing', () => {
    render(<EmailNotificationsAre />)
    expect(document.body).toBeTruthy()
  })

  it('displays the email notification center title', () => {
    render(<EmailNotificationsAre />)
    expect(screen.getByText('Email Notification Center')).toBeTruthy()
  })

  it('displays mock email notifications', () => {
    render(<EmailNotificationsAre />)
    // Check for at least one email notification
    expect(screen.getByText(/Your claim has been approved/i)).toBeTruthy()
    expect(screen.getByText(/john.smith@email.com/i)).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<EmailNotificationsAre />)
    expect(screen.getByText('Total Notifications')).toBeTruthy()
    expect(screen.getByText('Delivered')).toBeTruthy()
    expect(screen.getByText('Failed')).toBeTruthy()
  })

  it('displays status change information', () => {
    render(<EmailNotificationsAre />)
    const underReviewElements = screen.getAllByText('Under Review')
    expect(underReviewElements.length).toBeGreaterThan(0)
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<EmailNotificationsAre />)
    // Verify main wrapper
    expect(document.querySelector('[data-testid="emailnotificationsare"]')).toBeTruthy()
    // Verify list container
    expect(document.querySelector('[data-testid="emailnotificationsare-list"]')).toBeTruthy()
    // Verify list items
    expect(document.querySelector('[data-testid="emailnotificationsare-item"]')).toBeTruthy()
    // Verify filter select
    expect(document.querySelector('[data-testid="emailnotificationsare-status-filter"]')).toBeTruthy()
    // Verify buttons
    expect(document.querySelector('[data-testid="emailnotificationsare-refresh"]')).toBeTruthy()
  })

  it('displays multiple notification items', () => {
    render(<EmailNotificationsAre />)
    const items = document.querySelectorAll('[data-testid="emailnotificationsare-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })

  it('shows filter controls', () => {
    render(<EmailNotificationsAre />)
    expect(screen.getByText(/Filter by status:/i)).toBeTruthy()
    const filterSelect = document.querySelector('[data-testid="emailnotificationsare-status-filter"]')
    expect(filterSelect).toBeTruthy()
  })

  it('displays claim IDs in notifications', () => {
    render(<EmailNotificationsAre />)
    expect(screen.getByText(/CLM-2024-1001/i)).toBeTruthy()
  })
})
