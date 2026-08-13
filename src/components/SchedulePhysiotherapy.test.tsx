import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SchedulePhysiotherapy from './SchedulePhysiotherapy'

describe('SchedulePhysiotherapy', () => {
  it('renders without crashing', () => {
    render(<SchedulePhysiotherapy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Schedule Physiotherapy Appointment')).toBeTruthy()
  })

  it('displays mock therapists', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Dr. James Williams')).toBeTruthy()
    expect(screen.getByText('Dr. Lisa Anderson')).toBeTruthy()
  })

  it('displays mock session types', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Initial Assessment')).toBeTruthy()
    expect(screen.getByText('Standard Session')).toBeTruthy()
    expect(screen.getByText('Follow-up Session')).toBeTruthy()
    expect(screen.getByText('Extended Therapy')).toBeTruthy()
    expect(screen.getByText('Group Session')).toBeTruthy()
  })

  it('allows selecting a therapist', () => {
    render(<SchedulePhysiotherapy />)
    const therapistCard = screen.getByText('Dr. Sarah Johnson').closest('div')
    if (therapistCard) {
      fireEvent.click(therapistCard)
      expect(therapistCard.className).toContain('border-blue-500')
    }
  })

  it('allows selecting a session type', () => {
    render(<SchedulePhysiotherapy />)
    const sessionText = screen.getByText('Standard Session')
    const sessionCard = sessionText.closest('div[class*="border"]')
    if (sessionCard) {
      fireEvent.click(sessionCard)
      expect(sessionCard.className).toContain('border-blue-500')
    }
  })

  it('shows date selection after therapist is selected', () => {
    render(<SchedulePhysiotherapy />)
    const therapistCard = screen.getByText('Dr. Sarah Johnson').closest('div')
    if (therapistCard) {
      fireEvent.click(therapistCard)
      expect(screen.getByText('Select Date')).toBeTruthy()
    }
  })

  it('disables confirm button when form is incomplete', () => {
    render(<SchedulePhysiotherapy />)
    const confirmButton = screen.getByRole('button', { name: /Please complete all selections/i })
    expect(confirmButton).toBeTruthy()
    expect(confirmButton.hasAttribute('disabled')).toBeTruthy()
  })

  it('displays confirmation notification after booking', () => {
    render(<SchedulePhysiotherapy />)
    
    // Select therapist
    const therapistCard = screen.getByText('Dr. Sarah Johnson').closest('div')
    if (therapistCard) fireEvent.click(therapistCard)
    
    // Select session type
    const sessionCard = screen.getByText('Standard Session').closest('div')
    if (sessionCard) fireEvent.click(sessionCard)
    
    // Select date (wait for it to appear)
    const dateCards = screen.getAllByText(/Aug|Sep/i)
    if (dateCards.length > 0) fireEvent.click(dateCards[0].closest('div')!)
    
    // Select time
    const timeButton = screen.getByRole('button', { name: /09:00 AM/i })
    if (timeButton) fireEvent.click(timeButton)
    
    // Click confirm
    const confirmButton = screen.getByRole('button', { name: /Confirm Appointment/i })
    if (confirmButton) fireEvent.click(confirmButton)
    
    // Check for confirmation message
    expect(screen.getByText('Appointment Confirmed!')).toBeTruthy()
  })
})
