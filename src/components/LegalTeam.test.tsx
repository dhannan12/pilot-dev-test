import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LegalTeam from './LegalTeam'

describe('LegalTeam', () => {
  it('renders without crashing', () => {
    render(<LegalTeam />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<LegalTeam />)
    expect(screen.getByText('Legal Team Workflow Management')).toBeTruthy()
  })

  it('displays mock documents', () => {
    render(<LegalTeam />)
    expect(screen.getByText('Enterprise Software License Agreement')).toBeTruthy()
    expect(screen.getByText('Data Processing Agreement - GDPR Compliance')).toBeTruthy()
    expect(screen.getByText('Non-Disclosure Agreement - Vendor Partnership')).toBeTruthy()
  })

  it('displays filter buttons', () => {
    render(<LegalTeam />)
    expect(screen.getByText('All Documents')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('Approved')).toBeTruthy()
    expect(screen.getByText('Rejected')).toBeTruthy()
  })

  it('filters documents by status', () => {
    render(<LegalTeam />)
    
    // Click on "Approved" filter
    const approvedButton = screen.getByText('Approved')
    fireEvent.click(approvedButton)
    
    // Should show approved document
    expect(screen.getByText('Employment Agreement - Executive Level')).toBeTruthy()
  })

  it('displays stakeholder directory', () => {
    render(<LegalTeam />)
    expect(screen.getByText('Stakeholder Directory')).toBeTruthy()
    expect(screen.getByText('Sarah Mitchell')).toBeTruthy()
    expect(screen.getByText('David Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
  })

  it('shows document details when selected', () => {
    render(<LegalTeam />)
    
    // Click on a document
    const document = screen.getByText('Enterprise Software License Agreement')
    fireEvent.click(document.closest('.bg-white.rounded-lg')!)
    
    // Should show approval workflow
    expect(screen.getByText('Approval Workflow')).toBeTruthy()
    expect(screen.getByText('Review Stages')).toBeTruthy()
  })

  it('displays approval stages with stakeholders', () => {
    render(<LegalTeam />)
    
    // Click on a document
    const document = screen.getByText('Enterprise Software License Agreement')
    fireEvent.click(document.closest('.bg-white.rounded-lg')!)
    
    // Should show stakeholder roles - using getAllByText since roles appear in multiple places
    const contractSpecialistElements = screen.getAllByText('Contract Specialist')
    const seniorLegalCounselElements = screen.getAllByText('Senior Legal Counsel')
    expect(contractSpecialistElements.length).toBeGreaterThan(0)
    expect(seniorLegalCounselElements.length).toBeGreaterThan(0)
  })

  it('shows approve and reject buttons for in-review stages', () => {
    render(<LegalTeam />)
    
    // Click on a document with in-review stage
    const document = screen.getByText('Enterprise Software License Agreement')
    fireEvent.click(document.closest('.bg-white.rounded-lg')!)
    
    // Should show action buttons
    const approveButtons = screen.getAllByText('Approve')
    const rejectButtons = screen.getAllByText('Reject')
    
    expect(approveButtons.length).toBeGreaterThan(0)
    expect(rejectButtons.length).toBeGreaterThan(0)
  })
})
