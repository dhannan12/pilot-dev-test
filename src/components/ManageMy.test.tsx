import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ManageMy from './ManageMy'

describe('ManageMy', () => {
  it('renders without crashing', () => {
    render(<ManageMy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the landlord dashboard header', () => {
    render(<ManageMy />)
    expect(screen.getByText('Landlord Dashboard')).toBeTruthy()
    expect(screen.getByText('Manage your properties and tenant applications')).toBeTruthy()
  })

  it('displays statistics cards', () => {
    render(<ManageMy />)
    expect(screen.getByText('Total Properties')).toBeTruthy()
    const occupiedElements = screen.getAllByText('Occupied')
    expect(occupiedElements.length).toBeGreaterThan(0)
    const vacantElements = screen.getAllByText('Vacant')
    expect(vacantElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Pending Applications')).toBeTruthy()
  })

  it('displays mock properties', () => {
    render(<ManageMy />)
    expect(screen.getByText(/123 Maple Street/)).toBeTruthy()
    expect(screen.getByText(/456 Oak Avenue/)).toBeTruthy()
    expect(screen.getByText(/789 Pine Road/)).toBeTruthy()
  })

  it('switches between properties and applications tabs', () => {
    render(<ManageMy />)
    
    const applicationsTab = screen.getByText(/Tenant Applications/)
    fireEvent.click(applicationsTab)
    
    expect(screen.getByText(/Emily Davis/)).toBeTruthy()
    expect(screen.getByText(/Michael Brown/)).toBeTruthy()
  })

  it('displays tenant information for occupied properties', () => {
    render(<ManageMy />)
    expect(screen.getByText(/John Smith/)).toBeTruthy()
    expect(screen.getByText(/Sarah Johnson/)).toBeTruthy()
  })

  it('shows property status badges', () => {
    render(<ManageMy />)
    const occupiedBadges = screen.getAllByText('Occupied')
    const vacantBadges = screen.getAllByText('Vacant')
    expect(occupiedBadges.length).toBeGreaterThan(0)
    expect(vacantBadges.length).toBeGreaterThan(0)
  })

  it('displays application details in applications tab', () => {
    render(<ManageMy />)
    
    const applicationsTab = screen.getByText(/Tenant Applications/)
    fireEvent.click(applicationsTab)
    
    expect(screen.getByText(/emily.davis@email.com/)).toBeTruthy()
    expect(screen.getByText(/michael.brown@email.com/)).toBeTruthy()
  })
})
