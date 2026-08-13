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
    const heading = screen.getByText('Physiotherapy Appointment Scheduler')
    expect(heading).toBeTruthy()
  })

  it('displays all therapists in schedule tab', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Dr. James Wilson')).toBeTruthy()
    expect(screen.getByText('Dr. Lisa Anderson')).toBeTruthy()
  })

  it('shows available time slots when therapist is selected', () => {
    render(<SchedulePhysiotherapy />)
    const therapistButton = screen.getByText('Dr. Sarah Johnson').closest('button')
    if (therapistButton) {
      fireEvent.click(therapistButton)
      expect(screen.getByText('09:00 AM')).toBeTruthy()
      expect(screen.getByText('11:00 AM')).toBeTruthy()
    }
  })

  it('switches to history tab when clicked', () => {
    render(<SchedulePhysiotherapy />)
    const historyTab = screen.getByText('Appointment History')
    fireEvent.click(historyTab)
    expect(screen.getByText('Your Appointments')).toBeTruthy()
  })

  it('switches to resources tab when clicked', () => {
    render(<SchedulePhysiotherapy />)
    const resourcesTab = screen.getByText('Rehabilitation Resources')
    fireEvent.click(resourcesTab)
    expect(screen.getByText('Lower Back Strengthening Exercises')).toBeTruthy()
    expect(screen.getByText('Post-Operative Care Guidelines')).toBeTruthy()
  })

  it('displays appointment history', () => {
    render(<SchedulePhysiotherapy />)
    const historyTab = screen.getByText('Appointment History')
    fireEvent.click(historyTab)
    expect(screen.getByText(/Dr. Sarah Johnson/)).toBeTruthy()
    expect(screen.getByText(/Dr. Michael Chen/)).toBeTruthy()
  })

  it('displays rehabilitation resources with correct types', () => {
    render(<SchedulePhysiotherapy />)
    const resourcesTab = screen.getByText('Rehabilitation Resources')
    fireEvent.click(resourcesTab)
    expect(screen.getByText('Lower Back Strengthening Exercises')).toBeTruthy()
    expect(screen.getByText('Home Exercise Program Guide')).toBeTruthy()
    expect(screen.getByText('Knee Rehabilitation Protocol')).toBeTruthy()
  })

  it('has a schedule appointment button', () => {
    render(<SchedulePhysiotherapy />)
    const buttons = screen.getAllByRole('button')
    const submitButton = buttons.find(btn => 
      btn.textContent === 'Schedule Appointment' && 
      btn.classList.contains('w-full')
    )
    expect(submitButton).toBeTruthy()
  })

  it('displays date input field', () => {
    render(<SchedulePhysiotherapy />)
    const dateInput = screen.getByLabelText('Select Date') as HTMLInputElement
    expect(dateInput).toBeTruthy()
    expect(dateInput.type).toBe('date')
  })
})
