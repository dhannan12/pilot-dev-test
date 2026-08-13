import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScheduleAppointments from './ScheduleAppointments'

describe('ScheduleAppointments', () => {
  it('renders without crashing', () => {
    render(<ScheduleAppointments />)
    expect(document.body).toBeTruthy()
  })

  it('displays login screen with registered patients requirement', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('Dental Clinic')).toBeTruthy()
    expect(screen.getByText('Online Appointment System')).toBeTruthy()
    expect(screen.getByText(/Only registered patients can schedule appointments/i)).toBeTruthy()
  })

  it('displays mock patient accounts for login', () => {
    render(<ScheduleAppointments />)
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Brown')).toBeTruthy()
    expect(screen.getByText('Emily Davis')).toBeTruthy()
    expect(screen.getByText('David Wilson')).toBeTruthy()
  })

  it('allows registered patient to login and shows scheduling interface', () => {
    render(<ScheduleAppointments />)
    
    // Click on first patient to login
    const patientButton = screen.getByText('John Smith')
    fireEvent.click(patientButton)
    
    // Check if main scheduling interface is shown
    expect(screen.getByText('Schedule Appointment')).toBeTruthy()
    expect(screen.getByText(/Welcome back, John Smith/i)).toBeTruthy()
    expect(screen.getByText('1. Select a Dentist')).toBeTruthy()
  })

  it('displays mock dentists for selection', () => {
    render(<ScheduleAppointments />)
    
    // Login first
    fireEvent.click(screen.getByText('John Smith'))
    
    // Check dentists are displayed
    expect(screen.getByText('Dr. Alice Carter')).toBeTruthy()
    expect(screen.getByText('Dr. Robert Lee')).toBeTruthy()
    expect(screen.getByText('Dr. Maria Garcia')).toBeTruthy()
    expect(screen.getByText('Dr. James Wilson')).toBeTruthy()
    expect(screen.getByText('Dr. Lisa Anderson')).toBeTruthy()
  })

  it('shows time slots when dentist is selected', () => {
    render(<ScheduleAppointments />)
    
    // Login
    fireEvent.click(screen.getByText('John Smith'))
    
    // Select a dentist
    fireEvent.click(screen.getByText('Dr. Alice Carter'))
    
    // Check if time slot selection appears
    expect(screen.getByText('2. Select a Time Slot')).toBeTruthy()
    expect(screen.getByText('09:00 AM')).toBeTruthy()
  })

  it('displays booking summary when dentist and time slot are selected', () => {
    render(<ScheduleAppointments />)
    
    // Login
    fireEvent.click(screen.getByText('John Smith'))
    
    // Select dentist
    fireEvent.click(screen.getByText('Dr. Alice Carter'))
    
    // Select time slot
    const timeSlotButton = screen.getByText('09:00 AM')
    fireEvent.click(timeSlotButton)
    
    // Check booking summary
    expect(screen.getByText('Booking Summary')).toBeTruthy()
    expect(screen.getByText('Book Appointment')).toBeTruthy()
  })

  it('shows confirmation after booking appointment', () => {
    render(<ScheduleAppointments />)
    
    // Login
    fireEvent.click(screen.getByText('John Smith'))
    
    // Select dentist
    fireEvent.click(screen.getByText('Dr. Alice Carter'))
    
    // Select time slot
    fireEvent.click(screen.getByText('09:00 AM'))
    
    // Book appointment
    const bookButton = screen.getByText('Book Appointment')
    fireEvent.click(bookButton)
    
    // Check confirmation
    expect(screen.getByText('Appointment Confirmed!')).toBeTruthy()
    expect(screen.getByText(/Your appointment has been successfully scheduled/i)).toBeTruthy()
  })

  it('displays my appointments section', () => {
    render(<ScheduleAppointments />)
    
    // Login
    fireEvent.click(screen.getByText('John Smith'))
    
    // Check My Appointments section
    expect(screen.getByText('My Appointments')).toBeTruthy()
  })

  it('allows logout functionality', () => {
    render(<ScheduleAppointments />)
    
    // Login
    fireEvent.click(screen.getByText('John Smith'))
    
    // Click logout
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    
    // Should be back to login screen
    expect(screen.getByText('Online Appointment System')).toBeTruthy()
  })
})
