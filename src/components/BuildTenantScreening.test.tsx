import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildTenantScreening from './BuildTenantScreening'

describe('BuildTenantScreening', () => {
  it('renders without crashing', () => {
    render(<BuildTenantScreening />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<BuildTenantScreening />)
    expect(screen.getByText('Tenant Screening Process')).toBeTruthy()
  })

  it('displays mock application data', () => {
    render(<BuildTenantScreening />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
  })

  it('displays statistics cards', () => {
    render(<BuildTenantScreening />)
    expect(screen.getByText('Total Applications')).toBeTruthy()
    expect(screen.getAllByText('Approved').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Under Review').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
  })

  it('displays filter buttons', () => {
    render(<BuildTenantScreening />)
    expect(screen.getByText('All Applications')).toBeTruthy()
    const approvedElements = screen.getAllByText('Approved')
    expect(approvedElements.length).toBeGreaterThan(0)
    const pendingElements = screen.getAllByText('Pending')
    expect(pendingElements.length).toBeGreaterThan(0)
    const rejectedElements = screen.getAllByText('Rejected')
    expect(rejectedElements.length).toBeGreaterThan(0)
  })

  it('displays application details section', () => {
    render(<BuildTenantScreening />)
    expect(screen.getByText('Application Details')).toBeTruthy()
  })
})
