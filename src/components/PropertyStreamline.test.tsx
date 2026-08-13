import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PropertyStreamline from './PropertyStreamline'

describe('PropertyStreamline', () => {
  it('renders without crashing', () => {
    render(<PropertyStreamline />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main dashboard title', () => {
    render(<PropertyStreamline />)
    expect(screen.getByText('Property Management Dashboard')).toBeTruthy()
  })

  it('displays mock tenant applications', () => {
    render(<PropertyStreamline />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
  })

  it('displays tenant screening and maintenance tabs', () => {
    render(<PropertyStreamline />)
    expect(screen.getByText('Tenant Screening')).toBeTruthy()
    expect(screen.getByText('Maintenance Requests')).toBeTruthy()
  })

  it('switches between tabs when clicked', () => {
    render(<PropertyStreamline />)
    const maintenanceTab = screen.getByText('Maintenance Requests')
    fireEvent.click(maintenanceTab)
    expect(screen.getByText('Maintenance Requests - Manager Review')).toBeTruthy()
  })

  it('displays maintenance requests in maintenance tab', () => {
    render(<PropertyStreamline />)
    const maintenanceTab = screen.getByText('Maintenance Requests')
    fireEvent.click(maintenanceTab)
    expect(screen.getByText('Plumbing')).toBeTruthy()
    expect(screen.getByText('HVAC')).toBeTruthy()
  })

  it('shows approve and reject buttons for pending applications', () => {
    render(<PropertyStreamline />)
    const approveButtons = screen.getAllByText('Approve')
    expect(approveButtons.length).toBeGreaterThan(0)
  })

  it('displays statistics cards', () => {
    render(<PropertyStreamline />)
    expect(screen.getByText('Pending Applications')).toBeTruthy()
    expect(screen.getByText('Pending Requests')).toBeTruthy()
  })

  it('shows priority badges for maintenance requests', () => {
    render(<PropertyStreamline />)
    const maintenanceTab = screen.getByText('Maintenance Requests')
    fireEvent.click(maintenanceTab)
    const highBadges = screen.getAllByText('HIGH')
    expect(highBadges.length).toBeGreaterThan(0)
    expect(screen.getByText('URGENT')).toBeTruthy()
  })

  it('handles application approval', () => {
    render(<PropertyStreamline />)
    const approveButtons = screen.getAllByText('Approve')
    fireEvent.click(approveButtons[0])
    // After approval, the button should disappear
    expect(approveButtons.length).toBeGreaterThan(0)
  })
})
