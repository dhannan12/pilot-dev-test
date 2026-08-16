import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OrganizationManagerAccesses from './OrganizationManagerAccesses'

describe('OrganizationManagerAccesses', () => {
  it('renders without crashing', () => {
    render(<OrganizationManagerAccesses />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title and description', () => {
    render(<OrganizationManagerAccesses />)
    expect(screen.getByText('Organization Manager Reporting Portal')).toBeTruthy()
    expect(screen.getByText('Access reports, view analytics, and monitor report usage')).toBeTruthy()
  })

  it('displays mock reports data', () => {
    render(<OrganizationManagerAccesses />)
    // Check for report titles
    expect(screen.getByText('Volunteer Hours Summary')).toBeTruthy()
    expect(screen.getByText('Monthly Activity Report')).toBeTruthy()
  })

  it('displays filter controls', () => {
    render(<OrganizationManagerAccesses />)
    expect(screen.getByText('Report Type')).toBeTruthy()
    expect(screen.getByText('All Report Types')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<OrganizationManagerAccesses />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="organizationmanageraccesses"]')
    expect(mainWrapper).toBeTruthy()
    
    // View mode buttons
    const viewReportsBtn = document.querySelector('[data-testid="organizationmanageraccesses-view-reports"]')
    expect(viewReportsBtn).toBeTruthy()
    
    const viewLogsBtn = document.querySelector('[data-testid="organizationmanageraccesses-view-logs"]')
    expect(viewLogsBtn).toBeTruthy()
    
    // Filter selects
    const reportTypeSelect = document.querySelector('[data-testid="organizationmanageraccesses-report-type"]')
    expect(reportTypeSelect).toBeTruthy()
    
    // Report list
    const reportList = document.querySelector('[data-testid="organizationmanageraccesses-report-list"]')
    expect(reportList).toBeTruthy()
    
    // Report items
    const reportItems = document.querySelectorAll('[data-testid="organizationmanageraccesses-report-item"]')
    expect(reportItems.length).toBeGreaterThan(0)
    
    // Action buttons on reports
    const viewBtn = document.querySelector('[data-testid="organizationmanageraccesses-view"]')
    expect(viewBtn).toBeTruthy()
    
    const downloadBtn = document.querySelector('[data-testid="organizationmanageraccesses-download"]')
    expect(downloadBtn).toBeTruthy()
    
    const shareBtn = document.querySelector('[data-testid="organizationmanageraccesses-share"]')
    expect(shareBtn).toBeTruthy()
    
    // Main action buttons
    const refreshBtn = document.querySelector('[data-testid="organizationmanageraccesses-refresh"]')
    expect(refreshBtn).toBeTruthy()
    
    const exportBtn = document.querySelector('[data-testid="organizationmanageraccesses-export"]')
    expect(exportBtn).toBeTruthy()
    
    const generateBtn = document.querySelector('[data-testid="organizationmanageraccesses-generate-report"]')
    expect(generateBtn).toBeTruthy()
  })

  it('switches between reports and logs view modes', () => {
    render(<OrganizationManagerAccesses />)
    
    // Initially should show reports view (button in header)
    const reportViewHeader = screen.getAllByText('Available Reports')
    expect(reportViewHeader.length).toBeGreaterThan(0)
    
    // Click logs view button
    const logsBtn = document.querySelector('[data-testid="organizationmanageraccesses-view-logs"]') as HTMLButtonElement
    fireEvent.click(logsBtn)
    
    // Should now show logs view
    expect(screen.getByText('Recent Access Logs')).toBeTruthy()
  })

  it('displays statistics in logs view', () => {
    const { container } = render(<OrganizationManagerAccesses />)
    
    // Switch to logs view
    const logsBtn = container.querySelector('[data-testid="organizationmanageraccesses-view-logs"]') as HTMLButtonElement
    fireEvent.click(logsBtn)
    
    // Check for statistics cards
    expect(screen.getByText('Total Accesses')).toBeTruthy()
    expect(screen.getByText('Total Duration')).toBeTruthy()
    expect(screen.getByText('Avg Duration')).toBeTruthy()
  })

  it('displays access logs in logs view', () => {
    const { container } = render(<OrganizationManagerAccesses />)
    
    // Switch to logs view
    const logsBtn = container.querySelector('[data-testid="organizationmanageraccesses-view-logs"]') as HTMLButtonElement
    fireEvent.click(logsBtn)
    
    // Check for log list and items
    const logList = container.querySelector('[data-testid="organizationmanageraccesses-log-list"]')
    expect(logList).toBeTruthy()
    
    const logItems = container.querySelectorAll('[data-testid="organizationmanageraccesses-log-item"]')
    expect(logItems.length).toBeGreaterThan(0)
  })

  it('displays manager filter in logs view', () => {
    const { container } = render(<OrganizationManagerAccesses />)
    
    // Switch to logs view
    const logsBtn = container.querySelector('[data-testid="organizationmanageraccesses-view-logs"]') as HTMLButtonElement
    fireEvent.click(logsBtn)
    
    // Check for manager filter
    const managerSelect = container.querySelector('[data-testid="organizationmanageraccesses-manager"]')
    expect(managerSelect).toBeTruthy()
  })

  it('filters reports by type', () => {
    const { container } = render(<OrganizationManagerAccesses />)
    
    const reportTypeSelect = container.querySelector('[data-testid="organizationmanageraccesses-report-type"]') as HTMLSelectElement
    
    // Change to financial reports only
    fireEvent.change(reportTypeSelect, { target: { value: 'financial' } })
    
    // Should show filtered results
    expect(screen.getByText('Financial Overview Q3 2026')).toBeTruthy()
  })
})
