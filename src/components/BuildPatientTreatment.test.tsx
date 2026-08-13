import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildPatientTreatment from './BuildPatientTreatment'

describe('BuildPatientTreatment', () => {
  it('renders without crashing', () => {
    render(<BuildPatientTreatment />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getByText('Patient Treatment Management')).toBeTruthy()
  })

  it('displays mock patient data', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Robert Williams')).toBeTruthy()
    expect(screen.getByText('Jennifer Martinez')).toBeTruthy()
  })

  it('displays treatment procedures', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getByText('Root Canal Treatment')).toBeTruthy()
    expect(screen.getByText('Dental Implant')).toBeTruthy()
    expect(screen.getByText('Teeth Whitening')).toBeTruthy()
  })

  it('displays treatment statistics', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getByText('Total Treatments')).toBeTruthy()
    expect(screen.getAllByText('Completed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('In Progress').length).toBeGreaterThan(0)
    expect(screen.getByText('Total Revenue')).toBeTruthy()
  })

  it('displays search input', () => {
    render(<BuildPatientTreatment />)
    const searchInput = screen.getByPlaceholderText(/Search by patient name/i)
    expect(searchInput).toBeTruthy()
  })

  it('displays status filter dropdown', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getByText('Filter by Status')).toBeTruthy()
  })

  it('displays treatment IDs', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getByText('TRT-001')).toBeTruthy()
    expect(screen.getByText('TRT-002')).toBeTruthy()
  })

  it('displays dentist names', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getAllByText('Dr. Michael Chen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dr. Emily Rodriguez').length).toBeGreaterThan(0)
  })

  it('displays "No Treatment Selected" message initially', () => {
    render(<BuildPatientTreatment />)
    expect(screen.getByText('No Treatment Selected')).toBeTruthy()
  })
})
