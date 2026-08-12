import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EventRegistration from './EventRegistration'

describe('EventRegistration', () => {
  it('renders without crashing', () => {
    render(<EventRegistration />)
    expect(document.body).toBeTruthy()
  })

  it('displays the title and description', () => {
    render(<EventRegistration />)
    expect(screen.getByText('Event Registration')).toBeTruthy()
    expect(screen.getByText(/Only members with active membership status/i)).toBeTruthy()
  })

  it('displays member and event selection dropdowns', () => {
    render(<EventRegistration />)
    expect(screen.getByLabelText('Select Member')).toBeTruthy()
    expect(screen.getByLabelText('Select Event')).toBeTruthy()
  })

  it('displays membership statistics', () => {
    render(<EventRegistration />)
    expect(screen.getByText('Membership Statistics')).toBeTruthy()
    expect(screen.getByText('Active Members')).toBeTruthy()
    expect(screen.getByText('Inactive')).toBeTruthy()
    expect(screen.getByText('Expired')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
  })

  it('shows member details when a member is selected', () => {
    render(<EventRegistration />)
    const memberSelect = screen.getByLabelText('Select Member') as HTMLSelectElement
    
    fireEvent.change(memberSelect, { target: { value: 'M001' } })
    
    expect(screen.getByText('Alice Johnson')).toBeTruthy()
    expect(screen.getByText(/alice@example.com/i)).toBeTruthy()
  })

  it('shows event details when an event is selected', () => {
    render(<EventRegistration />)
    const eventSelect = screen.getByLabelText('Select Event') as HTMLSelectElement
    
    fireEvent.change(eventSelect, { target: { value: 'E001' } })
    
    expect(screen.getByText('Annual Gala Dinner')).toBeTruthy()
    expect(screen.getByText(/Grand Hotel Ballroom/i)).toBeTruthy()
  })

  it('prevents registration for inactive members', () => {
    render(<EventRegistration />)
    const memberSelect = screen.getByLabelText('Select Member') as HTMLSelectElement
    const eventSelect = screen.getByLabelText('Select Event') as HTMLSelectElement
    
    // Select inactive member (Bob Smith)
    fireEvent.change(memberSelect, { target: { value: 'M002' } })
    fireEvent.change(eventSelect, { target: { value: 'E001' } })
    
    const registerButton = screen.getByRole('button', { name: /Register for Event/i })
    fireEvent.click(registerButton)
    
    expect(screen.getByText(/does not have an active membership/i)).toBeTruthy()
  })

  it('allows registration for active members', () => {
    render(<EventRegistration />)
    const memberSelect = screen.getByLabelText('Select Member') as HTMLSelectElement
    const eventSelect = screen.getByLabelText('Select Event') as HTMLSelectElement
    
    // Select active member (Alice Johnson)
    fireEvent.change(memberSelect, { target: { value: 'M001' } })
    fireEvent.change(eventSelect, { target: { value: 'E001' } })
    
    const registerButton = screen.getByRole('button', { name: /Register for Event/i })
    fireEvent.click(registerButton)
    
    expect(screen.getByText(/Success!/i)).toBeTruthy()
    expect(screen.getByText(/has been registered/i)).toBeTruthy()
  })

  it('shows warning for non-active members', () => {
    render(<EventRegistration />)
    const memberSelect = screen.getByLabelText('Select Member') as HTMLSelectElement
    
    // Select expired member
    fireEvent.change(memberSelect, { target: { value: 'M004' } })
    
    expect(screen.getByText(/This member cannot register for events/i)).toBeTruthy()
  })

  it('disables register button when no selections are made', () => {
    render(<EventRegistration />)
    const registerButton = screen.getByRole('button', { name: /Register for Event/i })
    
    expect(registerButton).toHaveProperty('disabled', true)
  })
})
