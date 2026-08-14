import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWantsTo from './UserWantsTo'

describe('UserWantsTo', () => {
  it('renders without crashing', () => {
    render(<UserWantsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<UserWantsTo />)
    expect(screen.getByText('Message Status Tracker')).toBeTruthy()
    expect(screen.getByText('Track the status of your submitted messages and inquiries')).toBeTruthy()
  })

  it('displays mock message data', () => {
    render(<UserWantsTo />)
    // Check for specific message subjects from mock data
    expect(screen.getByText('Issue with login authentication')).toBeTruthy()
    expect(screen.getByText('Billing inquiry for invoice #12345')).toBeTruthy()
    expect(screen.getByText('Feature request: Dark mode support')).toBeTruthy()
  })

  it('displays all status filter buttons with counts', () => {
    render(<UserWantsTo />)
    expect(screen.getByText(/All \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Pending \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Received \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/In Progress \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Resolved \(\d+\)/)).toBeTruthy()
    expect(screen.getByText(/Closed \(\d+\)/)).toBeTruthy()
  })

  it('filters messages when status button is clicked', () => {
    render(<UserWantsTo />)
    
    // Initially all messages should be visible
    expect(screen.getByText('Issue with login authentication')).toBeTruthy()
    expect(screen.getByText('Billing inquiry for invoice #12345')).toBeTruthy()
    
    // Click on "Pending" filter
    const pendingButton = screen.getByText(/Pending \(\d+\)/)
    fireEvent.click(pendingButton)
    
    // Pending message should be visible
    expect(screen.getByText('Password reset not working')).toBeTruthy()
  })

  it('displays message IDs and priorities', () => {
    render(<UserWantsTo />)
    expect(screen.getByText('MSG-001')).toBeTruthy()
    expect(screen.getByText('MSG-002')).toBeTruthy()
    // Check for priority badges
    expect(screen.getAllByText('HIGH').length).toBeGreaterThan(0)
    expect(screen.getAllByText('MEDIUM').length).toBeGreaterThan(0)
  })

  it('displays category and assignment information', () => {
    render(<UserWantsTo />)
    expect(screen.getAllByText('Technical Support').length).toBeGreaterThan(0)
    expect(screen.getByText('Billing')).toBeTruthy()
    expect(screen.getAllByText(/Assigned to Sarah Johnson/).length).toBeGreaterThan(0)
  })

  it('shows summary statistics in footer', () => {
    render(<UserWantsTo />)
    expect(screen.getByText('Awaiting Response')).toBeTruthy()
    expect(screen.getByText('Being Processed')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
  })

  it('displays status badges with proper formatting', () => {
    render(<UserWantsTo />)
    expect(screen.getAllByText('IN PROGRESS').length).toBeGreaterThan(0)
    expect(screen.getAllByText('RESOLVED').length).toBeGreaterThan(0)
    expect(screen.getByText('PENDING')).toBeTruthy()
  })
})
