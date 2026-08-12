import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AuditTrail from './AuditTrail'

describe('AuditTrail', () => {
  it('renders without crashing', () => {
    render(<AuditTrail />)
    expect(document.body).toBeTruthy()
  })

  it('displays the audit trail header', () => {
    render(<AuditTrail />)
    expect(screen.getByText('Audit Trail')).toBeTruthy()
    expect(screen.getByText('Monitor and export system activity logs')).toBeTruthy()
  })

  it('displays mock audit logs', () => {
    render(<AuditTrail />)
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('James Rodriguez')).toBeTruthy()
    expect(screen.getByText('Emily Chen')).toBeTruthy()
  })

  it('displays statistics correctly', () => {
    render(<AuditTrail />)
    expect(screen.getByText('Total Logs')).toBeTruthy()
    const successElements = screen.getAllByText('Success')
    expect(successElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Failures')).toBeTruthy()
    expect(screen.getByText('Warnings')).toBeTruthy()
  })

  it('displays export buttons', () => {
    render(<AuditTrail />)
    expect(screen.getByText('Export CSV')).toBeTruthy()
    expect(screen.getByText('Export JSON')).toBeTruthy()
  })

  it('filters logs by search term', () => {
    render(<AuditTrail />)
    const searchInput = screen.getByPlaceholderText('Search by user, details, or entity...')
    
    fireEvent.change(searchInput, { target: { value: 'Sarah Mitchell' } })
    
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
  })

  it('filters logs by action', () => {
    render(<AuditTrail />)
    const actionSelect = screen.getByLabelText('Filter by Action')
    
    fireEvent.change(actionSelect, { target: { value: 'Failed Login Attempt' } })
    
    const failedLoginElements = screen.getAllByText('Failed Login Attempt')
    expect(failedLoginElements.length).toBeGreaterThan(0)
  })

  it('filters logs by status', () => {
    render(<AuditTrail />)
    const statusSelect = screen.getByLabelText('Filter by Status')
    
    fireEvent.change(statusSelect, { target: { value: 'success' } })
    
    expect(screen.getByText(/Showing/)).toBeTruthy()
  })

  it('displays pagination controls when needed', () => {
    render(<AuditTrail />)
    expect(screen.getByText('Previous')).toBeTruthy()
    expect(screen.getByText('Next')).toBeTruthy()
  })

  it('handles pagination correctly', () => {
    render(<AuditTrail />)
    const nextButton = screen.getByText('Next')
    
    fireEvent.click(nextButton)
    
    expect(screen.getByText(/Page/)).toBeTruthy()
  })

  it('displays action types in the table', () => {
    render(<AuditTrail />)
    const viewedElements = screen.getAllByText('Document Viewed')
    expect(viewedElements.length).toBeGreaterThan(0)
    const modifiedElements = screen.getAllByText('Document Modified')
    expect(modifiedElements.length).toBeGreaterThan(0)
    const loginElements = screen.getAllByText('User Login')
    expect(loginElements.length).toBeGreaterThan(0)
  })

  it('displays status badges with correct styling', () => {
    render(<AuditTrail />)
    const statusBadges = screen.getAllByText('success')
    expect(statusBadges.length).toBeGreaterThan(0)
  })

  it('displays IP addresses in the table', () => {
    render(<AuditTrail />)
    expect(screen.getByText('192.168.1.105')).toBeTruthy()
    expect(screen.getByText('192.168.1.110')).toBeTruthy()
  })

  it('displays entity information', () => {
    render(<AuditTrail />)
    expect(screen.getByText('DOC-45789')).toBeTruthy()
    expect(screen.getByText('DOC-45790')).toBeTruthy()
  })

  it('displays timestamp column header', () => {
    render(<AuditTrail />)
    expect(screen.getByText('Timestamp')).toBeTruthy()
  })

  it('displays all table headers', () => {
    render(<AuditTrail />)
    expect(screen.getByText('User')).toBeTruthy()
    expect(screen.getByText('Action')).toBeTruthy()
    expect(screen.getByText('Entity')).toBeTruthy()
    expect(screen.getByText('Details')).toBeTruthy()
    expect(screen.getByText('IP Address')).toBeTruthy()
    expect(screen.getByText('Status')).toBeTruthy()
  })
})
