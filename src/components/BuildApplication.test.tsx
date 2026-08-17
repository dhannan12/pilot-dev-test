import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildApplication from './BuildApplication'

describe('BuildApplication', () => {
  it('renders without crashing', () => {
    render(<BuildApplication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<BuildApplication />)
    const title = screen.getByTestId('build-application-title')
    expect(title).toBeInTheDocument()
    expect(title.textContent).toBe('Application Status Tracking')
  })

  it('displays mock application data', () => {
    render(<BuildApplication />)
    // Check for at least one applicant name
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument()
    expect(screen.getByText('David Martinez')).toBeInTheDocument()
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<BuildApplication />)
    // Verify key testids exist — Playwright QA depends on these
    
    // Main wrapper
    expect(screen.getByTestId('build-application')).toBeInTheDocument()
    
    // Title
    expect(screen.getByTestId('build-application-title')).toBeInTheDocument()
    
    // Filter dropdown
    expect(screen.getByTestId('build-application-filter')).toBeInTheDocument()
    
    // Audit button
    expect(screen.getByTestId('build-application-audit-btn')).toBeInTheDocument()
    
    // Application list
    expect(screen.getByTestId('build-application-list')).toBeInTheDocument()
    
    // Application items
    const items = screen.getAllByTestId('build-application-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Update buttons
    const updateButtons = screen.getAllByTestId('build-application-item-update')
    expect(updateButtons.length).toBeGreaterThan(0)
  })

  it('filters applications by status', () => {
    render(<BuildApplication />)
    const filter = screen.getByTestId('build-application-filter') as HTMLSelectElement
    
    // Initially shows all applications
    let items = screen.getAllByTestId('build-application-item')
    expect(items.length).toBe(6)
    
    // Filter by 'accepted'
    fireEvent.change(filter, { target: { value: 'accepted' } })
    items = screen.getAllByTestId('build-application-item')
    expect(items.length).toBe(1)
    expect(screen.getByText('Jennifer Lee')).toBeInTheDocument()
  })

  it('opens update status modal when clicking update button', () => {
    render(<BuildApplication />)
    const updateButtons = screen.getAllByTestId('build-application-item-update')
    
    // Click first update button
    fireEvent.click(updateButtons[0])
    
    // Modal should be visible
    expect(screen.getByTestId('build-application-modal')).toBeInTheDocument()
    expect(screen.getByTestId('build-application-modal-title')).toBeInTheDocument()
  })

  it('can update application status', () => {
    render(<BuildApplication />)
    const updateButtons = screen.getAllByTestId('build-application-item-update')
    
    // Click first update button
    fireEvent.click(updateButtons[0])
    
    // Click on a status option
    const acceptedButton = screen.getByTestId('build-application-status-accepted')
    fireEvent.click(acceptedButton)
    
    // Modal should close
    expect(screen.queryByTestId('build-application-modal')).not.toBeInTheDocument()
  })

  it('opens and closes audit trail modal', () => {
    render(<BuildApplication />)
    
    // Open audit modal
    const auditButton = screen.getByTestId('build-application-audit-btn')
    fireEvent.click(auditButton)
    
    // Modal should be visible
    expect(screen.getByTestId('build-application-audit-modal')).toBeInTheDocument()
    expect(screen.getByTestId('build-application-audit-title')).toBeInTheDocument()
    expect(screen.getByTestId('build-application-audit-list')).toBeInTheDocument()
    
    // Close audit modal
    const closeButton = screen.getByTestId('build-application-audit-close')
    fireEvent.click(closeButton)
    
    // Modal should be closed
    expect(screen.queryByTestId('build-application-audit-modal')).not.toBeInTheDocument()
  })

  it('displays audit trail entries', () => {
    render(<BuildApplication />)
    
    // Open audit modal
    const auditButton = screen.getByTestId('build-application-audit-btn')
    fireEvent.click(auditButton)
    
    // Check for audit items
    const auditItems = screen.getAllByTestId('build-application-audit-item')
    expect(auditItems.length).toBeGreaterThan(0)
  })

  it('closes modal when clicking cancel', () => {
    render(<BuildApplication />)
    const updateButtons = screen.getAllByTestId('build-application-item-update')
    
    // Click first update button
    fireEvent.click(updateButtons[0])
    
    // Click cancel
    const cancelButton = screen.getByTestId('build-application-modal-cancel')
    fireEvent.click(cancelButton)
    
    // Modal should close
    expect(screen.queryByTestId('build-application-modal')).not.toBeInTheDocument()
  })
})
