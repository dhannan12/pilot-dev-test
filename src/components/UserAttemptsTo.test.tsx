import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays membership status as expired', () => {
    render(<UserAttemptsTo />)
    const expiredElements = screen.getAllByText(/Membership Expired/i)
    expect(expiredElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/● Expired/i)).toBeTruthy()
  })

  it('displays mock classes', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/High-Intensity Interval Training/i)).toBeTruthy()
    expect(screen.getByText(/Yoga Flow/i)).toBeTruthy()
    expect(screen.getByText(/Spin Class/i)).toBeTruthy()
    expect(screen.getByText(/Boxing Fundamentals/i)).toBeTruthy()
    expect(screen.getByText(/Power Pilates/i)).toBeTruthy()
  })

  it('shows class details when a class is selected', () => {
    render(<UserAttemptsTo />)
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    fireEvent.click(items[0])
    
    // Check if booking panel shows the selected class details
    const instructorElements = screen.getAllByText(/Sarah Martinez/i)
    expect(instructorElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Verify main wrapper
    expect(document.querySelector('[data-testid="userattemptsto"]')).toBeTruthy()
    
    // Verify list container
    expect(document.querySelector('[data-testid="userattemptsto-list"]')).toBeTruthy()
    
    // Verify list items
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Select a class to make booking buttons appear
    fireEvent.click(items[0])
    
    // Verify buttons appear after selecting a class
    expect(document.querySelector('[data-testid="userattemptsto-book"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-cancel"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userattemptsto-renew-header"]')).toBeTruthy()
  })

  it('displays expired membership warning', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Renew your membership to continue booking classes/i)).toBeTruthy()
  })

  it('disables booking button when membership is expired', () => {
    render(<UserAttemptsTo />)
    
    // Select a class first
    const items = document.querySelectorAll('[data-testid="userattemptsto-item"]')
    fireEvent.click(items[0])
    
    const bookButton = document.querySelector('[data-testid="userattemptsto-book"]') as HTMLButtonElement
    expect(bookButton).toBeTruthy()
    expect(bookButton.disabled).toBe(true)
  })

  it('shows membership details in booking panel', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/John Doe/i)).toBeTruthy()
    const goldAnnualElements = screen.getAllByText(/Gold Annual/i)
    expect(goldAnnualElements.length).toBeGreaterThan(0)
  })
})
