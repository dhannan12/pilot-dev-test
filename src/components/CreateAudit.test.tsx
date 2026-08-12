import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateAudit from './CreateAudit'

describe('CreateAudit', () => {
  it('renders without crashing', () => {
    render(<CreateAudit />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CreateAudit />)
    expect(screen.getByText('Audit & Approval Management')).toBeTruthy()
  })

  it('displays audit logs tab by default', () => {
    render(<CreateAudit />)
    expect(screen.getByText('Audit Logs')).toBeTruthy()
  })

  it('displays approval workflows tab', () => {
    render(<CreateAudit />)
    expect(screen.getByText('Approval Workflows')).toBeTruthy()
  })

  it('displays mock audit entries', () => {
    render(<CreateAudit />)
    expect(screen.getByText('Document Created')).toBeTruthy()
    expect(screen.getByText('Document Modified')).toBeTruthy()
    expect(screen.getByText('User Access Granted')).toBeTruthy()
  })

  it('switches to approval tab when clicked', () => {
    render(<CreateAudit />)
    const approvalTab = screen.getByText('Approval Workflows')
    fireEvent.click(approvalTab)
    expect(screen.getByText('Non-Disclosure Agreement')).toBeTruthy()
  })

  it('displays filter dropdown', () => {
    render(<CreateAudit />)
    expect(screen.getByText('Filter by Status:')).toBeTruthy()
  })

  it('displays create new button', () => {
    render(<CreateAudit />)
    expect(screen.getByText(/Create New/)).toBeTruthy()
  })

  it('displays summary stats', () => {
    render(<CreateAudit />)
    expect(screen.getByText('Total Audits')).toBeTruthy()
    expect(screen.getByText('Pending Approvals')).toBeTruthy()
    expect(screen.getByText('Approved Today')).toBeTruthy()
    expect(screen.getByText('Critical Priority')).toBeTruthy()
  })

  it('shows detail panel message when no item selected', () => {
    render(<CreateAudit />)
    expect(screen.getByText('Select an audit entry to view details')).toBeTruthy()
  })

  it('displays audit details when an entry is clicked', () => {
    render(<CreateAudit />)
    const firstAudit = screen.getByText('Document Created')
    fireEvent.click(firstAudit)
    expect(screen.getByText('Audit ID')).toBeTruthy()
  })

  it('filters audits by status', () => {
    render(<CreateAudit />)
    const filterSelect = screen.getByRole('combobox')
    fireEvent.change(filterSelect, { target: { value: 'approved' } })
    expect(screen.getByText('Document Created')).toBeTruthy()
  })

  it('displays approval workflow details in approval tab', () => {
    render(<CreateAudit />)
    const approvalTab = screen.getByText('Approval Workflows')
    fireEvent.click(approvalTab)
    const approval = screen.getByText('Non-Disclosure Agreement')
    fireEvent.click(approval)
    expect(screen.getByText('Approval ID')).toBeTruthy()
  })

  it('displays priority badges in approval workflows', () => {
    render(<CreateAudit />)
    const approvalTab = screen.getByText('Approval Workflows')
    fireEvent.click(approvalTab)
    const priorities = screen.getAllByText(/high|medium|low|critical/)
    expect(priorities.length).toBeGreaterThan(0)
  })

  it('displays approver names in approval details', () => {
    render(<CreateAudit />)
    const approvalTab = screen.getByText('Approval Workflows')
    fireEvent.click(approvalTab)
    const approval = screen.getByText('Non-Disclosure Agreement')
    fireEvent.click(approval)
    expect(screen.getByText('Approvers')).toBeTruthy()
  })
})
