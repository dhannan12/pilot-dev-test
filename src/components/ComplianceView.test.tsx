import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ComplianceView from './ComplianceView'

describe('ComplianceView', () => {
  it('renders without crashing', () => {
    render(<ComplianceView />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<ComplianceView />)
    expect(screen.getByText('Compliance Audit Trail')).toBeTruthy()
    expect(screen.getByText(/Complete audit history of document reviews/i)).toBeTruthy()
  })

  it('displays mock audit trail data', () => {
    render(<ComplianceView />)
    // Check for specific document names from mock data
    expect(screen.getByText('Q4 Financial Disclosure Statement')).toBeTruthy()
    expect(screen.getByText('Data Processing Agreement - EU Client')).toBeTruthy()
    expect(screen.getByText('Medical Device Safety Protocol v3.2')).toBeTruthy()
    expect(screen.getByText('Anti-Money Laundering Policy Update')).toBeTruthy()
    expect(screen.getByText('Environmental Impact Assessment - Site B')).toBeTruthy()
  })

  it('displays summary statistics cards', () => {
    render(<ComplianceView />)
    // Check for the label text in summary cards
    const approvedLabels = screen.getAllByText('Approved')
    const pendingLabels = screen.getAllByText('Pending')
    const revisionLabels = screen.getAllByText('Needs Revision')
    const rejectedLabels = screen.getAllByText('Rejected')
    
    // Should have at least one of each label (in the summary cards)
    expect(approvedLabels.length).toBeGreaterThan(0)
    expect(pendingLabels.length).toBeGreaterThan(0)
    expect(revisionLabels.length).toBeGreaterThan(0)
    expect(rejectedLabels.length).toBeGreaterThan(0)
  })

  it('displays reviewer names and roles', () => {
    render(<ComplianceView />)
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
    expect(screen.getByText('Senior Compliance Officer')).toBeTruthy()
    expect(screen.getByText('Michael Rodriguez')).toBeTruthy()
    expect(screen.getByText('Privacy Compliance Lead')).toBeTruthy()
  })

  it('displays compliance frameworks', () => {
    render(<ComplianceView />)
    expect(screen.getByText('SEC Regulation S-K')).toBeTruthy()
    expect(screen.getByText('GDPR Article 28')).toBeTruthy()
    expect(screen.getByText('FDA 21 CFR Part 820')).toBeTruthy()
  })

  it('filters by status', () => {
    render(<ComplianceView />)
    const statusFilter = screen.getByLabelText(/Status Filter/i) as HTMLSelectElement
    
    // Filter by approved status
    fireEvent.change(statusFilter, { target: { value: 'approved' } })
    
    // Approved documents should be visible
    expect(screen.getByText('Q4 Financial Disclosure Statement')).toBeTruthy()
    
    // Rejected documents should not be visible
    expect(screen.queryByText('Anti-Money Laundering Policy Update')).toBeFalsy()
  })

  it('filters by risk level', () => {
    render(<ComplianceView />)
    const riskFilter = screen.getByLabelText(/Risk Level Filter/i) as HTMLSelectElement
    
    // Filter by critical risk
    fireEvent.change(riskFilter, { target: { value: 'critical' } })
    
    // Critical risk document should be visible
    expect(screen.getByText('Anti-Money Laundering Policy Update')).toBeTruthy()
    
    // Low risk documents should not be visible
    expect(screen.queryByText('Q4 Financial Disclosure Statement')).toBeFalsy()
  })

  it('searches audit entries by document name', () => {
    render(<ComplianceView />)
    const searchInput = screen.getByPlaceholderText(/Search documents, reviewers, frameworks/i) as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'Financial' } })
    
    // Matching document should be visible
    expect(screen.getByText('Q4 Financial Disclosure Statement')).toBeTruthy()
    
    // Non-matching document should not be visible
    expect(screen.queryByText('Data Processing Agreement - EU Client')).toBeFalsy()
  })

  it('searches audit entries by reviewer name', () => {
    render(<ComplianceView />)
    const searchInput = screen.getByPlaceholderText(/Search documents, reviewers, frameworks/i) as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    
    // Document reviewed by Sarah Chen should be visible
    expect(screen.getByText('Q4 Financial Disclosure Statement')).toBeTruthy()
    
    // Documents reviewed by others should not be visible
    expect(screen.queryByText('Data Processing Agreement - EU Client')).toBeFalsy()
  })

  it('displays export button', () => {
    render(<ComplianceView />)
    expect(screen.getByText('Export Compliance Report')).toBeTruthy()
  })

  it('shows entry count', () => {
    render(<ComplianceView />)
    expect(screen.getByText(/Showing \d+ of \d+ audit entries/i)).toBeTruthy()
  })

  it('displays status badges with correct text', () => {
    render(<ComplianceView />)
    const approvedBadges = screen.getAllByText('APPROVED')
    const rejectedBadges = screen.getAllByText('REJECTED')
    const pendingBadges = screen.getAllByText('PENDING')
    const revisionBadges = screen.getAllByText('REVISION')
    
    expect(approvedBadges.length).toBeGreaterThan(0)
    expect(rejectedBadges.length).toBeGreaterThan(0)
    expect(pendingBadges.length).toBeGreaterThan(0)
    expect(revisionBadges.length).toBeGreaterThan(0)
  })

  it('displays risk level badges', () => {
    render(<ComplianceView />)
    expect(screen.getAllByText('LOW RISK').length).toBeGreaterThan(0)
    expect(screen.getAllByText('MEDIUM RISK').length).toBeGreaterThan(0)
    expect(screen.getAllByText('HIGH RISK').length).toBeGreaterThan(0)
    expect(screen.getAllByText('CRITICAL RISK').length).toBeGreaterThan(0)
  })

  it('shows no results message when filters match nothing', () => {
    render(<ComplianceView />)
    const searchInput = screen.getByPlaceholderText(/Search documents, reviewers, frameworks/i) as HTMLInputElement
    
    fireEvent.change(searchInput, { target: { value: 'NonExistentDocument12345' } })
    
    expect(screen.getByText('No audit entries match your filters')).toBeTruthy()
  })
})
