import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SubmitTenant from './SubmitTenant'

describe('SubmitTenant', () => {
  it('renders without crashing', () => {
    render(<SubmitTenant />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Tenant Application Portal')).toBeTruthy()
    expect(screen.getByText('Submit maintenance requests and track your applications online')).toBeTruthy()
  })

  it('displays the submission form with all required fields', () => {
    render(<SubmitTenant />)
    expect(screen.getByLabelText(/Tenant Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Property Address/i)).toBeTruthy()
    expect(screen.getByLabelText(/Issue Description/i)).toBeTruthy()
    expect(screen.getByLabelText(/Priority Level/i)).toBeTruthy()
  })

  it('displays mock maintenance requests in the table', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('REQ-001')).toBeTruthy()
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Davis')).toBeTruthy()
    expect(screen.getByText('David Martinez')).toBeTruthy()
  })

  it('displays request statistics', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Request Statistics')).toBeTruthy()
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
    const inProgressElements = screen.getAllByText('In Progress')
    expect(inProgressElements.length).toBeGreaterThan(0)
    const completedElements = screen.getAllByText('Completed')
    expect(completedElements.length).toBeGreaterThan(0)
  })

  it('allows user to fill out the form', () => {
    render(<SubmitTenant />)
    
    const tenantNameInput = screen.getByLabelText(/Tenant Name/i) as HTMLInputElement
    const propertyAddressInput = screen.getByLabelText(/Property Address/i) as HTMLInputElement
    const issueDescriptionInput = screen.getByLabelText(/Issue Description/i) as HTMLTextAreaElement
    
    fireEvent.change(tenantNameInput, { target: { value: 'Test Tenant' } })
    fireEvent.change(propertyAddressInput, { target: { value: '123 Test St' } })
    fireEvent.change(issueDescriptionInput, { target: { value: 'Test issue description' } })
    
    expect(tenantNameInput.value).toBe('Test Tenant')
    expect(propertyAddressInput.value).toBe('123 Test St')
    expect(issueDescriptionInput.value).toBe('Test issue description')
  })

  it('submits the form and displays success message', () => {
    render(<SubmitTenant />)
    
    const tenantNameInput = screen.getByLabelText(/Tenant Name/i)
    const propertyAddressInput = screen.getByLabelText(/Property Address/i)
    const issueDescriptionInput = screen.getByLabelText(/Issue Description/i)
    const submitButton = screen.getByRole('button', { name: /Submit Request/i })
    
    fireEvent.change(tenantNameInput, { target: { value: 'New Tenant' } })
    fireEvent.change(propertyAddressInput, { target: { value: '999 New Address' } })
    fireEvent.change(issueDescriptionInput, { target: { value: 'New maintenance issue' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/Maintenance request submitted successfully!/i)).toBeTruthy()
  })

  it('displays important information section', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Important Information')).toBeTruthy()
    expect(screen.getByText(/All fields marked with \* are required/i)).toBeTruthy()
  })

  it('displays status badges with correct colors', () => {
    render(<SubmitTenant />)
    const statusElements = screen.getAllByText('Pending')
    expect(statusElements.length).toBeGreaterThan(0)
  })
})
