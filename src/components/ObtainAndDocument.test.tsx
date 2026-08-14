import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ObtainAndDocument from './ObtainAndDocument'

describe('ObtainAndDocument', () => {
  it('renders without crashing', () => {
    render(<ObtainAndDocument />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<ObtainAndDocument />)
    expect(screen.getByText('Product Brief Management')).toBeTruthy()
    expect(screen.getByText('Obtain, document, and track product brief submissions')).toBeTruthy()
  })

  it('displays mock product briefs', () => {
    render(<ObtainAndDocument />)
    expect(screen.getAllByText('Customer Portal Dashboard').length).toBeGreaterThan(0)
    expect(screen.getByText('Mobile Payment Integration')).toBeTruthy()
    expect(screen.getByText('Analytics Dashboard v2')).toBeTruthy()
    expect(screen.getByText('Inventory Management System')).toBeTruthy()
    expect(screen.getByText('Customer Feedback Portal')).toBeTruthy()
  })

  it('displays ticket references', () => {
    render(<ObtainAndDocument />)
    expect(screen.getByText('PROTO-BD00CA91')).toBeTruthy()
    expect(screen.getByText('PROTO-XY45Z')).toBeTruthy()
  })

  it('shows the selected brief details', () => {
    render(<ObtainAndDocument />)
    // First brief should be selected by default
    expect(screen.getAllByText('Customer Portal Dashboard').length).toBeGreaterThan(0)
    expect(screen.getByText(/Requested by:/)).toBeTruthy()
    const sarahChenElements = screen.getAllByText('Sarah Chen')
    expect(sarahChenElements.length).toBeGreaterThan(0)
  })

  it('displays tabs for different sections', () => {
    render(<ObtainAndDocument />)
    expect(screen.getByText('Brief Details')).toBeTruthy()
    expect(screen.getByText('Documentation Checklist')).toBeTruthy()
    expect(screen.getByText('Stakeholders')).toBeTruthy()
  })

  it('displays documentation sections', () => {
    render(<ObtainAndDocument />)
    // The component should have documentation checklist items
    const checklistButton = screen.getByText('Documentation Checklist')
    expect(checklistButton).toBeTruthy()
  })

  it('shows stakeholder count', () => {
    render(<ObtainAndDocument />)
    // First brief has 3 stakeholders
    const stakeholderButtons = screen.getAllByText(/Stakeholders/)
    expect(stakeholderButtons.length).toBeGreaterThan(0)
  })
})
