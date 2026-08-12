import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ApprovalWorkflow from './ApprovalWorkflow'

describe('ApprovalWorkflow', () => {
  it('renders without crashing', () => {
    render(<ApprovalWorkflow />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<ApprovalWorkflow />)
    expect(screen.getByText('Approval Workflow Management')).toBeTruthy()
    expect(screen.getByText('Track and manage document approval processes')).toBeTruthy()
  })

  it('displays workflow list sidebar', () => {
    render(<ApprovalWorkflow />)
    expect(screen.getByText('Active Workflows')).toBeTruthy()
  })

  it('displays mock workflow data', () => {
    render(<ApprovalWorkflow />)
    expect(screen.getAllByText('Corporate Merger Agreement').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Vendor Service Agreement').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Employee NDA Template Update').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Data Processing Agreement').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Partnership Agreement Amendment').length).toBeGreaterThan(0)
  })

  it('displays workflow details for selected workflow', () => {
    render(<ApprovalWorkflow />)
    expect(screen.getByText('Document ID: DOC-2024-001')).toBeTruthy()
  })

  it('displays tabs for navigation', () => {
    render(<ApprovalWorkflow />)
    expect(screen.getByText('overview')).toBeTruthy()
    expect(screen.getByText('stages')).toBeTruthy()
    expect(screen.getByText('history')).toBeTruthy()
  })

  it('displays workflow progress information', () => {
    render(<ApprovalWorkflow />)
    expect(screen.getByText('Workflow Progress')).toBeTruthy()
    expect(screen.getByText('Overall Progress')).toBeTruthy()
  })

  it('displays stage summary statistics', () => {
    render(<ApprovalWorkflow />)
    expect(screen.getByText('Stage Summary')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('Pending')).toBeTruthy()
  })
})
