import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SubmittingAnEvent from './SubmittingAnEvent'

describe('SubmittingAnEvent', () => {
  it('renders without crashing', () => {
    render(<SubmittingAnEvent />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and form', () => {
    render(<SubmittingAnEvent />)
    expect(screen.getByText('Submit an Event')).toBeTruthy()
    expect(screen.getByText('Event Details')).toBeTruthy()
    expect(screen.getByText('Submitted Events')).toBeTruthy()
  })

  it('displays mock events data', () => {
    render(<SubmittingAnEvent />)
    expect(screen.getByText('Community Meetup')).toBeTruthy()
    expect(screen.getByText('Open Mic Night')).toBeTruthy()
    expect(screen.getByText('Tech Workshop')).toBeTruthy()
  })

  it('shows events with and without dates', () => {
    render(<SubmittingAnEvent />)
    // Check for events with dates
    expect(screen.getByText(/2026-09-15/)).toBeTruthy()
    // Check for events without dates
    const noDateElements = screen.getAllByText(/No specific date/)
    expect(noDateElements.length).toBeGreaterThan(0)
  })

  it('has all required data-testid attributes', () => {
    render(<SubmittingAnEvent />)
    
    // Main wrapper
    expect(screen.getByTestId('submittinganevent')).toBeTruthy()
    
    // Form inputs
    expect(screen.getByTestId('submittinganevent-name')).toBeTruthy()
    expect(screen.getByTestId('submittinganevent-description')).toBeTruthy()
    expect(screen.getByTestId('submittinganevent-location')).toBeTruthy()
    expect(screen.getByTestId('submittinganevent-date')).toBeTruthy()
    expect(screen.getByTestId('submittinganevent-time')).toBeTruthy()
    expect(screen.getByTestId('submittinganevent-category')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('submittinganevent-submit')).toBeTruthy()
    expect(screen.getByTestId('submittinganevent-reset')).toBeTruthy()
    
    // List container and items
    expect(screen.getByTestId('submittinganevent-list')).toBeTruthy()
    const items = screen.getAllByTestId('submittinganevent-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays all form fields with correct labels', () => {
    render(<SubmittingAnEvent />)
    expect(screen.getByLabelText(/Event Name/)).toBeTruthy()
    expect(screen.getByLabelText(/Description/)).toBeTruthy()
    expect(screen.getByLabelText(/Location/)).toBeTruthy()
    expect(screen.getByLabelText(/Date/)).toBeTruthy()
    expect(screen.getByLabelText(/Time/)).toBeTruthy()
    expect(screen.getByLabelText(/Category/)).toBeTruthy()
  })

  it('shows optional indicator for date field', () => {
    render(<SubmittingAnEvent />)
    expect(screen.getByText(/Optional/)).toBeTruthy()
    expect(screen.getByText(/Leave blank for recurring or date-flexible events/)).toBeTruthy()
  })
})
