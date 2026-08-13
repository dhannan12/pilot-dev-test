import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SubmitTenant from './SubmitTenant'

describe('SubmitTenant', () => {
  it('renders without crashing', () => {
    render(<SubmitTenant />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Tenant Application Portal')).toBeTruthy()
    expect(screen.getByText(/Submit your rental application online/i)).toBeTruthy()
  })

  it('displays tab navigation', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('New Application')).toBeTruthy()
    expect(screen.getByText('My Applications')).toBeTruthy()
  })

  it('shows new application form by default', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Submit New Application')).toBeTruthy()
    expect(screen.getByLabelText(/Select Property/i)).toBeTruthy()
  })

  it('displays mock properties in dropdown', () => {
    render(<SubmitTenant />)
    const propertySelect = screen.getByLabelText(/Select Property/i) as HTMLSelectElement
    expect(propertySelect.options.length).toBeGreaterThan(5)
  })

  it('displays personal information fields', () => {
    render(<SubmitTenant />)
    expect(screen.getByLabelText(/Full Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Email Address/i)).toBeTruthy()
    expect(screen.getByLabelText(/Phone Number/i)).toBeTruthy()
    expect(screen.getByLabelText(/Desired Move-in Date/i)).toBeTruthy()
  })

  it('displays employment information fields', () => {
    render(<SubmitTenant />)
    expect(screen.getByLabelText(/Employment Status/i)).toBeTruthy()
    expect(screen.getByLabelText(/Monthly Income/i)).toBeTruthy()
  })

  it('switches to applications tab when clicked', () => {
    render(<SubmitTenant />)
    const applicationsTab = screen.getAllByText('My Applications')[0]
    fireEvent.click(applicationsTab)
    expect(screen.getAllByText('My Applications').length).toBeGreaterThan(1)
  })

  it('displays mock applications in the applications tab', () => {
    render(<SubmitTenant />)
    const applicationsTab = screen.getAllByText('My Applications')[0]
    fireEvent.click(applicationsTab)
    
    expect(screen.getByText('123 Main St, Apt 4B')).toBeTruthy()
    expect(screen.getByText('456 Oak Ave, Unit 12')).toBeTruthy()
    expect(screen.getByText('789 Pine Rd, Suite 3A')).toBeTruthy()
    expect(screen.getByText('321 Elm Street, Apt 201')).toBeTruthy()
    expect(screen.getByText('555 Maple Dr, Townhouse 8')).toBeTruthy()
  })

  it('displays application status badges', () => {
    render(<SubmitTenant />)
    const applicationsTab = screen.getAllByText('My Applications')[0]
    fireEvent.click(applicationsTab)
    
    expect(screen.getAllByText('Submitted').length).toBeGreaterThan(0)
    expect(screen.getByText('Under Review')).toBeTruthy()
    expect(screen.getByText('Approved')).toBeTruthy()
    expect(screen.getByText('Draft')).toBeTruthy()
  })

  it('displays form action buttons', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Clear Form')).toBeTruthy()
    expect(screen.getByText('Submit Application')).toBeTruthy()
  })

  it('clears form when Clear Form button is clicked', () => {
    render(<SubmitTenant />)
    
    const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    expect(nameInput.value).toBe('Test User')
    
    const clearButton = screen.getByText('Clear Form')
    fireEvent.click(clearButton)
    
    expect(nameInput.value).toBe('')
  })
})
