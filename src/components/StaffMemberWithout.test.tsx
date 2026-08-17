import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StaffMemberWithout from './StaffMemberWithout'

describe('StaffMemberWithout', () => {
  it('renders without crashing', () => {
    render(<StaffMemberWithout />)
    expect(document.body).toBeTruthy()
  })

  it('displays access denied message', () => {
    render(<StaffMemberWithout />)
    expect(screen.getByText('Access Denied')).toBeTruthy()
    expect(screen.getByText(/You do not have permission to access the admin view/i)).toBeTruthy()
  })

  it('displays current user information', () => {
    render(<StaffMemberWithout />)
    expect(screen.getAllByText('Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Staff').length).toBeGreaterThan(0)
    expect(screen.getByText('Front Desk')).toBeTruthy()
  })

  it('displays mock access attempts', () => {
    render(<StaffMemberWithout />)
    expect(screen.getByText('Recent Access Attempts')).toBeTruthy()
    expect(screen.getByText('Admin Dashboard')).toBeTruthy()
    expect(screen.getByText('User Management')).toBeTruthy()
    expect(screen.getByText('System Settings')).toBeTruthy()
    expect(screen.getByText('Financial Reports')).toBeTruthy()
    expect(screen.getByText('Security Logs')).toBeTruthy()
  })

  it('displays help resources', () => {
    render(<StaffMemberWithout />)
    expect(screen.getByText('Help Resources')).toBeTruthy()
    expect(screen.getByText('Understanding User Roles')).toBeTruthy()
    expect(screen.getAllByText('Request Admin Access').length).toBeGreaterThan(0)
    expect(screen.getByText('Staff Portal Guide')).toBeTruthy()
    expect(screen.getByText('Contact IT Support')).toBeTruthy()
    expect(screen.getByText('Security Policies')).toBeTruthy()
  })

  it('shows contact form when Request Admin Access button is clicked', () => {
    render(<StaffMemberWithout />)
    const requestButton = screen.getByTestId('staffmemberwithout-request-access')
    fireEvent.click(requestButton)
    expect(screen.getByTestId('staffmemberwithout-contact-form')).toBeTruthy()
    expect(screen.getByPlaceholderText(/Enter your reason for requesting admin access/i)).toBeTruthy()
  })

  it('allows user to type in contact message', () => {
    render(<StaffMemberWithout />)
    const requestButton = screen.getByTestId('staffmemberwithout-request-access')
    fireEvent.click(requestButton)
    
    const textarea = screen.getByTestId('staffmemberwithout-message') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'I need admin access for reporting' } })
    expect(textarea.value).toBe('I need admin access for reporting')
  })

  it('hides contact form when cancel button is clicked', () => {
    render(<StaffMemberWithout />)
    const requestButton = screen.getByTestId('staffmemberwithout-request-access')
    fireEvent.click(requestButton)
    
    const cancelButton = screen.getByTestId('staffmemberwithout-cancel')
    fireEvent.click(cancelButton)
    
    expect(screen.queryByTestId('staffmemberwithout-contact-form')).toBeNull()
  })

  it('shows details modal when Details button is clicked', () => {
    render(<StaffMemberWithout />)
    const detailsButtons = screen.getAllByTestId('staffmemberwithout-view-details')
    fireEvent.click(detailsButtons[0])
    
    expect(screen.getByTestId('staffmemberwithout-modal')).toBeTruthy()
    expect(screen.getByText('Access Attempt Details')).toBeTruthy()
  })

  it('closes details modal when close button is clicked', () => {
    render(<StaffMemberWithout />)
    const detailsButtons = screen.getAllByTestId('staffmemberwithout-view-details')
    fireEvent.click(detailsButtons[0])
    
    const closeButton = screen.getByTestId('staffmemberwithout-close-modal')
    fireEvent.click(closeButton)
    
    expect(screen.queryByTestId('staffmemberwithout-modal')).toBeNull()
  })

  it('has required data-testid attributes', () => {
    render(<StaffMemberWithout />)
    
    // Main wrapper
    expect(screen.getByTestId('staffmemberwithout')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('staffmemberwithout-back')).toBeTruthy()
    expect(screen.getByTestId('staffmemberwithout-request-access')).toBeTruthy()
    expect(screen.getByTestId('staffmemberwithout-help')).toBeTruthy()
    
    // Lists
    expect(screen.getByTestId('staffmemberwithout-list')).toBeTruthy()
    expect(screen.getByTestId('staffmemberwithout-resources-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('staffmemberwithout-item')
    expect(items.length).toBeGreaterThan(0)
    
    const resourceItems = screen.getAllByTestId('staffmemberwithout-resource-item')
    expect(resourceItems.length).toBeGreaterThan(0)
    
    // View buttons
    const viewDetailsButtons = screen.getAllByTestId('staffmemberwithout-view-details')
    expect(viewDetailsButtons.length).toBeGreaterThan(0)
    
    const viewResourceButtons = screen.getAllByTestId('staffmemberwithout-view-resource')
    expect(viewResourceButtons.length).toBeGreaterThan(0)
  })

  it('has data-testid on form elements when contact form is shown', () => {
    render(<StaffMemberWithout />)
    const requestButton = screen.getByTestId('staffmemberwithout-request-access')
    fireEvent.click(requestButton)
    
    expect(screen.getByTestId('staffmemberwithout-message')).toBeTruthy()
    expect(screen.getByTestId('staffmemberwithout-submit')).toBeTruthy()
    expect(screen.getByTestId('staffmemberwithout-cancel')).toBeTruthy()
  })

  it('has data-testid on modal elements when modal is shown', () => {
    render(<StaffMemberWithout />)
    const detailsButtons = screen.getAllByTestId('staffmemberwithout-view-details')
    fireEvent.click(detailsButtons[0])
    
    expect(screen.getByTestId('staffmemberwithout-modal')).toBeTruthy()
    expect(screen.getByTestId('staffmemberwithout-close-modal')).toBeTruthy()
    expect(screen.getByTestId('staffmemberwithout-close')).toBeTruthy()
  })
})
