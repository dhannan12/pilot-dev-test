import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildLandlordDashboard from './BuildLandlordDashboard'

describe('BuildLandlordDashboard', () => {
  it('renders without crashing', () => {
    render(<BuildLandlordDashboard />)
    expect(document.body).toBeTruthy()
  })

  it('displays the dashboard header', () => {
    render(<BuildLandlordDashboard />)
    expect(screen.getByText('Landlord Dashboard')).toBeTruthy()
    expect(screen.getByText('Manage your property portfolio')).toBeTruthy()
  })

  it('displays all navigation tabs', () => {
    render(<BuildLandlordDashboard />)
    expect(screen.getByText('Overview')).toBeTruthy()
    expect(screen.getByText('Properties')).toBeTruthy()
    expect(screen.getByText('Maintenance')).toBeTruthy()
    expect(screen.getByText('Tenants')).toBeTruthy()
  })

  it('displays overview statistics', () => {
    render(<BuildLandlordDashboard />)
    expect(screen.getByText('Total Properties')).toBeTruthy()
    expect(screen.getByText('Occupancy Rate')).toBeTruthy()
    expect(screen.getByText('Monthly Revenue')).toBeTruthy()
    expect(screen.getByText('Pending Issues')).toBeTruthy()
  })

  it('displays mock property data', () => {
    render(<BuildLandlordDashboard />)
    expect(screen.getByText('Sunset Apartments')).toBeTruthy()
    expect(screen.getByText('Downtown Lofts')).toBeTruthy()
  })

  it('displays mock maintenance requests', () => {
    render(<BuildLandlordDashboard />)
    expect(screen.getByText('Recent Maintenance')).toBeTruthy()
    expect(screen.getByText(/Leaking faucet in kitchen/)).toBeTruthy()
  })

  it('displays mock tenant data', () => {
    render(<BuildLandlordDashboard />)
    expect(screen.getByText('Rent Status')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
  })
})
