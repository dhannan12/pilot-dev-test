import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildTenantApplication from './BuildTenantApplication'

describe('BuildTenantApplication', () => {
  it('renders without crashing', () => {
    render(<BuildTenantApplication />)
    expect(document.body).toBeTruthy()
  })

  it('displays the tenant application form title', () => {
    render(<BuildTenantApplication />)
    expect(screen.getByText('Tenant Application Form')).toBeTruthy()
  })

  it('displays all form sections', () => {
    render(<BuildTenantApplication />)
    expect(screen.getByText('Personal Information')).toBeTruthy()
    expect(screen.getByText('Employment Information')).toBeTruthy()
    expect(screen.getByText('Rental History')).toBeTruthy()
    expect(screen.getByText('Emergency Contact')).toBeTruthy()
    expect(screen.getByText('Pet Information')).toBeTruthy()
  })

  it('shows sample applications when view applications button is clicked', () => {
    render(<BuildTenantApplication />)
    const viewButton = screen.getByText('View Applications')
    fireEvent.click(viewButton)
    expect(screen.getByText('Sample Applications')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('David Martinez')).toBeTruthy()
  })

  it('displays mock data applications with correct details', () => {
    render(<BuildTenantApplication />)
    fireEvent.click(screen.getByText('View Applications'))
    expect(screen.getByText('sarah.johnson@email.com')).toBeTruthy()
    expect(screen.getByText('Tech Solutions Inc.')).toBeTruthy()
    expect(screen.getByText('Martinez Consulting LLC')).toBeTruthy()
  })

  it('loads application data when clicking on a sample application', () => {
    render(<BuildTenantApplication />)
    fireEvent.click(screen.getByText('View Applications'))
    fireEvent.click(screen.getByText('Sarah Johnson'))
    
    // Check that application was loaded by verifying Application Status section appears
    expect(screen.getByText('Application Status')).toBeTruthy()
    expect(screen.getByText(/Application ID:/)).toBeTruthy()
  })

  it('toggles pet details field when pets checkbox is checked', () => {
    render(<BuildTenantApplication />)
    const petsCheckbox = screen.getByLabelText('I have pets') as HTMLInputElement
    
    expect(screen.queryByPlaceholderText('Describe your pets (type, breed, age, size)')).toBeFalsy()
    
    fireEvent.click(petsCheckbox)
    expect(screen.getByPlaceholderText('Describe your pets (type, breed, age, size)')).toBeTruthy()
  })

  it('has submit and save as draft buttons', () => {
    render(<BuildTenantApplication />)
    expect(screen.getByText('Submit Application')).toBeTruthy()
    expect(screen.getByText('Save as Draft')).toBeTruthy()
  })

  it('renders all form input fields', () => {
    render(<BuildTenantApplication />)
    expect(screen.getByText('First Name')).toBeTruthy()
    expect(screen.getByText('Last Name')).toBeTruthy()
    expect(screen.getByText('Email')).toBeTruthy()
    expect(screen.getByText('Phone')).toBeTruthy()
    expect(screen.getByText('Current Address')).toBeTruthy()
    expect(screen.getByText('Employment Status')).toBeTruthy()
    expect(screen.getByText('Employer Name')).toBeTruthy()
    expect(screen.getByText('Monthly Income')).toBeTruthy()
  })

  it('displays application status when an application is selected', () => {
    render(<BuildTenantApplication />)
    fireEvent.click(screen.getByText('View Applications'))
    fireEvent.click(screen.getByText('Sarah Johnson'))
    
    expect(screen.getByText('Application Status')).toBeTruthy()
    expect(screen.getByText(/Application ID:/)).toBeTruthy()
  })
})
