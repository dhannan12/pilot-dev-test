import { render, screen } from '@testing-library/react'
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
  })

  it('displays the application form', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Submit New Application')).toBeTruthy()
    expect(screen.getByPlaceholderText('John Doe')).toBeTruthy()
    expect(screen.getByPlaceholderText('john.doe@email.com')).toBeTruthy()
  })

  it('displays mock tenant applications', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Thompson')).toBeTruthy()
    expect(screen.getByText('Jessica Martinez')).toBeTruthy()
  })

  it('displays credit score information', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Credit Score Verification')).toBeTruthy()
  })

  it('displays rental history verification section', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Rental History Verification')).toBeTruthy()
  })

  it('displays screening process information', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Screening Process')).toBeTruthy()
    expect(screen.getByText('✓ Credit score verification (automated)')).toBeTruthy()
    expect(screen.getByText('✓ Rental history verification (landlord contact)')).toBeTruthy()
  })

  it('displays employment status field', () => {
    render(<SubmitTenant />)
    expect(screen.getByText('Full-time')).toBeTruthy()
  })

  it('displays monthly income field', () => {
    render(<SubmitTenant />)
    expect(screen.getByPlaceholderText('5000')).toBeTruthy()
  })

  it('displays submit button', () => {
    render(<SubmitTenant />)
    expect(screen.getByRole('button', { name: /Submit Application/i })).toBeTruthy()
  })
})
