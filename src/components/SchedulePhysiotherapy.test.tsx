import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SchedulePhysiotherapy from './SchedulePhysiotherapy'

describe('SchedulePhysiotherapy', () => {
  it('renders without crashing', () => {
    render(<SchedulePhysiotherapy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and intro text', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Schedule Physiotherapy Appointment')).toBeDefined()
    expect(screen.getByText('Book your appointment in under 5 minutes')).toBeDefined()
  })

  it('displays therapist list with at least 5 therapists', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Dr. Sarah Mitchell')).toBeDefined()
    expect(screen.getByText('Dr. James Chen')).toBeDefined()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeDefined()
    expect(screen.getByText('Dr. Michael Johnson')).toBeDefined()
    expect(screen.getByText('Dr. Aisha Patel')).toBeDefined()
  })

  it('displays service types with at least 5 services', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Manual Therapy')).toBeDefined()
    expect(screen.getByText('Exercise Therapy')).toBeDefined()
    expect(screen.getByText('Sports Rehabilitation')).toBeDefined()
    expect(screen.getByText('Post-Surgery Recovery')).toBeDefined()
    expect(screen.getByText('Pain Management')).toBeDefined()
  })

  it('allows selecting a therapist', () => {
    render(<SchedulePhysiotherapy />)
    const therapistCard = screen.getByText('Dr. Sarah Mitchell').closest('div')
    fireEvent.click(therapistCard!)
    expect(therapistCard?.className).toContain('border-blue-600')
  })

  it('allows selecting a service', () => {
    render(<SchedulePhysiotherapy />)
    const serviceCard = screen.getByText('Manual Therapy').closest('div')
    fireEvent.click(serviceCard!)
    expect(serviceCard?.className).toContain('border-blue-600')
  })

  it('next button is disabled until therapist and service are selected', () => {
    render(<SchedulePhysiotherapy />)
    const nextButton = screen.getByText('Next') as HTMLButtonElement
    expect(nextButton.disabled).toBe(true)

    // Select therapist
    const therapistCard = screen.getByText('Dr. Sarah Mitchell').closest('div')
    fireEvent.click(therapistCard!)

    // Still disabled without service
    expect(nextButton.disabled).toBe(true)

    // Select service
    const serviceCard = screen.getByText('Manual Therapy').closest('div')
    fireEvent.click(serviceCard!)

    // Now enabled
    expect(nextButton.disabled).toBe(false)
  })

  it('progresses to step 2 when next is clicked', () => {
    render(<SchedulePhysiotherapy />)
    
    // Select therapist and service
    fireEvent.click(screen.getByText('Dr. Sarah Mitchell').closest('div')!)
    fireEvent.click(screen.getByText('Manual Therapy').closest('div')!)
    
    // Click next
    fireEvent.click(screen.getByText('Next'))
    
    // Should show date selection
    expect(screen.getByText('Select Date')).toBeDefined()
  })

  it('displays time slots when date is selected', () => {
    render(<SchedulePhysiotherapy />)
    
    // Navigate to step 2
    fireEvent.click(screen.getByText('Dr. Sarah Mitchell').closest('div')!)
    fireEvent.click(screen.getByText('Manual Therapy').closest('div')!)
    fireEvent.click(screen.getByText('Next'))
    
    // Select a date
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    
    // Time slots should appear
    expect(screen.getByText('Select Time Slot')).toBeDefined()
    expect(screen.getByText('09:00 AM')).toBeDefined()
  })

  it('progresses through all steps to confirmation', () => {
    render(<SchedulePhysiotherapy />)
    
    // Step 1: Select therapist and service
    fireEvent.click(screen.getByText('Dr. Sarah Mitchell').closest('div')!)
    fireEvent.click(screen.getByText('Manual Therapy').closest('div')!)
    fireEvent.click(screen.getByText('Next'))
    
    // Step 2: Select date and time
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    fireEvent.click(screen.getByText('09:00 AM'))
    fireEvent.click(screen.getByText('Next'))
    
    // Step 3: Fill patient details
    const nameInput = screen.getByPlaceholderText('Enter your full name')
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    const phoneInput = screen.getByPlaceholderText('+1 (555) 123-4567')
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '555-123-4567' } })
    fireEvent.click(screen.getByText('Next'))
    
    // Step 4: Review and confirm
    expect(screen.getByText('Review Your Appointment')).toBeDefined()
    expect(screen.getByText('Confirm Booking')).toBeDefined()
  })

  it('shows confirmation screen after booking', () => {
    render(<SchedulePhysiotherapy />)
    
    // Complete all steps
    fireEvent.click(screen.getByText('Dr. Sarah Mitchell').closest('div')!)
    fireEvent.click(screen.getByText('Manual Therapy').closest('div')!)
    fireEvent.click(screen.getByText('Next'))
    
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-08-20' } })
    fireEvent.click(screen.getByText('09:00 AM'))
    fireEvent.click(screen.getByText('Next'))
    
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('your.email@example.com'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('+1 (555) 123-4567'), { target: { value: '555-123-4567' } })
    fireEvent.click(screen.getByText('Next'))
    
    // Confirm booking
    fireEvent.click(screen.getByText('Confirm Booking'))
    
    // Should show confirmation
    expect(screen.getByText('Appointment Confirmed!')).toBeDefined()
    expect(screen.getByText('Your physiotherapy session has been successfully scheduled.')).toBeDefined()
  })
})
