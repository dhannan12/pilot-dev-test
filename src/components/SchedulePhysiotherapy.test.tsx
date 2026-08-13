import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SchedulePhysiotherapy from './SchedulePhysiotherapy'

describe('SchedulePhysiotherapy', () => {
  it('renders without crashing', () => {
    render(<SchedulePhysiotherapy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main header', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Physiotherapy Portal')).toBeTruthy()
    expect(screen.getByText('Schedule appointments and view your treatment history')).toBeTruthy()
  })

  it('displays tab navigation', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Schedule Appointment')).toBeTruthy()
    expect(screen.getByText('Treatment History')).toBeTruthy()
  })

  it('displays therapist list with at least 5 therapists', () => {
    render(<SchedulePhysiotherapy />)
    expect(screen.getByText('Dr. Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Dr. Michael Chen')).toBeTruthy()
    expect(screen.getByText('Dr. Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('Dr. James Wilson')).toBeTruthy()
    expect(screen.getByText('Dr. Lisa Martinez')).toBeTruthy()
  })

  it('shows date selection after selecting a therapist', () => {
    render(<SchedulePhysiotherapy />)
    const therapistCard = screen.getByText('Dr. Sarah Johnson').closest('div')
    if (therapistCard) {
      fireEvent.click(therapistCard)
      expect(screen.getByText('Select Date')).toBeTruthy()
    }
  })

  it('switches to treatment history tab', () => {
    render(<SchedulePhysiotherapy />)
    const historyTab = screen.getByText('Treatment History')
    fireEvent.click(historyTab)
    expect(screen.getByText('Your Treatment History')).toBeTruthy()
  })

  it('displays treatment history records', () => {
    render(<SchedulePhysiotherapy />)
    const historyTab = screen.getByText('Treatment History')
    fireEvent.click(historyTab)
    expect(screen.getAllByText('Lower Back Pain Treatment').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sports Injury Recovery').length).toBeGreaterThan(0)
  })

  it('displays treatment status badges', () => {
    render(<SchedulePhysiotherapy />)
    const historyTab = screen.getByText('Treatment History')
    fireEvent.click(historyTab)
    expect(screen.getAllByText('COMPLETED').length).toBeGreaterThan(0)
    expect(screen.getAllByText('SCHEDULED').length).toBeGreaterThan(0)
  })
})
