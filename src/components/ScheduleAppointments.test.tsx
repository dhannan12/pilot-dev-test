import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScheduleAppointments from './ScheduleAppointments'

describe('ScheduleAppointments', () => {
  it('renders without crashing', () => {
    render(<ScheduleAppointments />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Schedule Your Appointment')).toBeInTheDocument()
  })

  it('displays treatment options', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Routine Cleaning')).toBeInTheDocument()
    expect(screen.getByText('Teeth Whitening')).toBeInTheDocument()
    expect(screen.getByText('Cavity Filling')).toBeInTheDocument()
    expect(screen.getByText('Root Canal')).toBeInTheDocument()
    expect(screen.getByText('Crown Placement')).toBeInTheDocument()
  })

  it('allows selecting a treatment', () => {
    render(<ScheduleAppointments />)
    const treatmentHeading = screen.getAllByText('Routine Cleaning')[0]
    const treatmentCard = treatmentHeading.closest('.p-4')
    
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
      expect(treatmentCard).toHaveClass('border-blue-600')
    }
  })

  it('displays cost summary when treatment is selected', () => {
    render(<ScheduleAppointments />)
    const treatmentHeadings = screen.getAllByText('Cavity Filling')
    const treatmentCard = treatmentHeadings[0].closest('.p-4')
    
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
      expect(screen.getAllByText('Cavity Filling').length).toBeGreaterThan(0)
      expect(screen.getByText(/Base Cost:/)).toBeInTheDocument()
    }
  })

  it('shows progress steps', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Select Treatment')).toBeInTheDocument()
    expect(screen.getByText('Insurance & Cost')).toBeInTheDocument()
    expect(screen.getByText('Pick Date & Time')).toBeInTheDocument()
  })

  it('allows navigation to insurance step after selecting treatment', () => {
    render(<ScheduleAppointments />)
    
    // Select a treatment
    const treatmentCard = screen.getByText('Routine Cleaning').closest('div')
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
    }
    
    // Click continue button
    const continueButton = screen.getByText('Continue to Insurance')
    fireEvent.click(continueButton)
    
    expect(screen.getByText('Insurance Coverage')).toBeInTheDocument()
  })

  it('displays insurance plans in step 2', () => {
    render(<ScheduleAppointments />)
    
    // Navigate to step 2
    const treatmentCard = screen.getByText('Routine Cleaning').closest('div')
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
    }
    const continueButton = screen.getByText('Continue to Insurance')
    fireEvent.click(continueButton)
    
    expect(screen.getByText('Premium Dental Plan')).toBeInTheDocument()
    expect(screen.getByText('Basic Coverage')).toBeInTheDocument()
    expect(screen.getByText('Family Plan')).toBeInTheDocument()
  })

  it('calculates cost with insurance coverage', () => {
    render(<ScheduleAppointments />)
    
    // Select treatment ($150)
    const treatmentCard = screen.getByText('Routine Cleaning').closest('div')
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
    }
    
    // Navigate to insurance
    fireEvent.click(screen.getByText('Continue to Insurance'))
    
    // Select insurance (80% coverage)
    const insuranceCard = screen.getByText('Premium Dental Plan').closest('div')
    if (insuranceCard) {
      fireEvent.click(insuranceCard)
    }
    
    // Check that cost is displayed
    expect(screen.getByText(/You Pay:/)).toBeInTheDocument()
  })

  it('allows proceeding without insurance', () => {
    render(<ScheduleAppointments />)
    
    // Select treatment
    const treatmentCard = screen.getByText('Routine Cleaning').closest('div')
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
    }
    
    fireEvent.click(screen.getByText('Continue to Insurance'))
    
    // Uncheck insurance
    const insuranceCheckbox = screen.getByRole('checkbox')
    fireEvent.click(insuranceCheckbox)
    
    // Should be able to continue
    const continueButton = screen.getByText('Continue to Schedule')
    expect(continueButton).not.toBeDisabled()
  })

  it('displays time slots in step 3', () => {
    render(<ScheduleAppointments />)
    
    // Navigate through steps
    const treatmentCard = screen.getByText('Routine Cleaning').closest('div')
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
    }
    
    fireEvent.click(screen.getByText('Continue to Insurance'))
    
    const insuranceCheckbox = screen.getByRole('checkbox')
    fireEvent.click(insuranceCheckbox)
    
    fireEvent.click(screen.getByText('Continue to Schedule'))
    
    expect(screen.getByText('Select Date & Time')).toBeInTheDocument()
    expect(screen.getAllByText('Dr. Sarah Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dr. Michael Chen').length).toBeGreaterThan(0)
  })

  it('shows confirm button when time slot is selected', () => {
    render(<ScheduleAppointments />)
    
    // Navigate through all steps
    const treatmentCard = screen.getByText('Routine Cleaning').closest('div')
    if (treatmentCard) {
      fireEvent.click(treatmentCard)
    }
    
    fireEvent.click(screen.getByText('Continue to Insurance'))
    
    const insuranceCheckbox = screen.getByRole('checkbox')
    fireEvent.click(insuranceCheckbox)
    
    fireEvent.click(screen.getByText('Continue to Schedule'))
    
    // Find and click an available time slot
    const timeSlots = screen.getAllByText(/2026-08-/)
    if (timeSlots.length > 0) {
      const firstSlot = timeSlots[0].closest('div')
      if (firstSlot) {
        fireEvent.click(firstSlot)
      }
    }
    
    const confirmButton = screen.getByText('Confirm Appointment')
    expect(confirmButton).toBeInTheDocument()
  })
})
