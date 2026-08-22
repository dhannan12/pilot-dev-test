import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays telehealth services header', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Telehealth Services')).toBeTruthy()
    expect(screen.getByText(/Connect with healthcare providers/i)).toBeTruthy()
  })

  it('displays mock provider data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Dr. James Wilson')).toBeTruthy()
    expect(screen.getByText('Dr. Amanda Lee')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    const { container } = render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(container.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // Specialty filter
    expect(container.querySelector('[data-testid="userattemptsto-specialty"]')).toBeTruthy()
    
    // List container
    expect(container.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    
    // List items
    const items = container.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Select buttons
    const selectButtons = container.querySelectorAll('[data-testid="userattemptsto-select"]')
    expect(selectButtons.length).toBeGreaterThan(0)
  })

  it('filters providers by specialty', () => {
    render(<UserAttemptsTo />)
    
    const specialtyFilter = screen.getByTestId('userattemptsto-specialty') as HTMLSelectElement
    
    // Change to Cardiologist
    fireEvent.change(specialtyFilter, { target: { value: 'Cardiologist' } })
    
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.queryByText('Dr. Sarah Johnson')).toBeFalsy()
  })

  it('allows selecting a provider', () => {
    render(<UserAttemptsTo />)
    
    const selectButtons = screen.getAllByTestId('userattemptsto-select')
    fireEvent.click(selectButtons[0])
    
    // Should show appointment booking section
    expect(screen.getByText(/Book Appointment with/i)).toBeTruthy()
  })

  it('shows appointment booking form when provider is selected', () => {
    const { container } = render(<UserAttemptsTo />)
    
    const selectButtons = screen.getAllByTestId('userattemptsto-select')
    fireEvent.click(selectButtons[0])
    
    // Check for booking form elements
    expect(screen.getByText('Select Time Slot')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-reason')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-submit')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-cancel')).toBeTruthy()
  })

  it('allows selecting a time slot', () => {
    render(<UserAttemptsTo />)
    
    // Select provider first
    const selectButtons = screen.getAllByTestId('userattemptsto-select')
    fireEvent.click(selectButtons[0])
    
    // Select time slot
    const slotButtons = screen.getAllByTestId('userattemptsto-slot')
    const availableSlot = slotButtons.find(btn => !btn.hasAttribute('disabled'))
    if (availableSlot) {
      fireEvent.click(availableSlot)
      expect(availableSlot.classList.contains('bg-blue-600')).toBe(true)
    }
  })

  it('allows entering reason for visit', () => {
    render(<UserAttemptsTo />)
    
    // Select provider first
    const selectButtons = screen.getAllByTestId('userattemptsto-select')
    fireEvent.click(selectButtons[0])
    
    const reasonTextarea = screen.getByTestId('userattemptsto-reason') as HTMLTextAreaElement
    fireEvent.change(reasonTextarea, { target: { value: 'Annual checkup' } })
    
    expect(reasonTextarea.value).toBe('Annual checkup')
  })

  it('enables book appointment button when all fields are filled', () => {
    render(<UserAttemptsTo />)
    
    // Select provider
    const selectButtons = screen.getAllByTestId('userattemptsto-select')
    fireEvent.click(selectButtons[0])
    
    const submitButton = screen.getByTestId('userattemptsto-submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    
    // Select time slot
    const slotButtons = screen.getAllByTestId('userattemptsto-slot')
    const availableSlot = slotButtons.find(btn => !btn.hasAttribute('disabled'))
    if (availableSlot) {
      fireEvent.click(availableSlot)
    }
    
    // Enter reason
    const reasonTextarea = screen.getByTestId('userattemptsto-reason')
    fireEvent.change(reasonTextarea, { target: { value: 'Annual checkup' } })
    
    expect(submitButton.disabled).toBe(false)
  })

  it('shows confirmation modal after booking', () => {
    render(<UserAttemptsTo />)
    
    // Select provider
    const selectButtons = screen.getAllByTestId('userattemptsto-select')
    fireEvent.click(selectButtons[0])
    
    // Select time slot
    const slotButtons = screen.getAllByTestId('userattemptsto-slot')
    const availableSlot = slotButtons.find(btn => !btn.hasAttribute('disabled'))
    if (availableSlot) {
      fireEvent.click(availableSlot)
    }
    
    // Enter reason
    const reasonTextarea = screen.getByTestId('userattemptsto-reason')
    fireEvent.change(reasonTextarea, { target: { value: 'Annual checkup' } })
    
    // Book appointment
    const submitButton = screen.getByTestId('userattemptsto-submit')
    fireEvent.click(submitButton)
    
    // Check for confirmation modal
    expect(screen.getByTestId('userattemptsto-modal')).toBeTruthy()
    expect(screen.getByText('Appointment Confirmed!')).toBeTruthy()
  })

  it('resets form when cancel is clicked', () => {
    render(<UserAttemptsTo />)
    
    // Select provider
    const selectButtons = screen.getAllByTestId('userattemptsto-select')
    fireEvent.click(selectButtons[0])
    
    // Click cancel
    const cancelButton = screen.getByTestId('userattemptsto-cancel')
    fireEvent.click(cancelButton)
    
    // Booking form should be hidden
    expect(screen.queryByText(/Book Appointment with/i)).toBeFalsy()
  })

  it('displays video call button for providers available now', () => {
    const { container } = render(<UserAttemptsTo />)
    
    const videoButtons = container.querySelectorAll('[data-testid="userattemptsto-video"]')
    expect(videoButtons.length).toBeGreaterThan(0)
  })
})
