import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TestingAnd from './TestingAnd'

describe('TestingAnd', () => {
  it('renders without crashing', () => {
    render(<TestingAnd />)
    expect(document.body).toBeTruthy()
  })

  it('displays main heading and description', () => {
    render(<TestingAnd />)
    expect(screen.getByText('Testing & Deployment Setup')).toBeTruthy()
    expect(screen.getByText('Manage test configurations and deployment pipelines')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<TestingAnd />)
    expect(screen.getByText('Average Coverage')).toBeTruthy()
    expect(screen.getByText('Passing Tests')).toBeTruthy()
    expect(screen.getByText('Failing Tests')).toBeTruthy()
    expect(screen.getByText('Active Environments')).toBeTruthy()
  })

  it('displays tab navigation', () => {
    render(<TestingAnd />)
    expect(screen.getByTestId('testingand-tab-tests')).toBeTruthy()
    expect(screen.getByTestId('testingand-tab-deployments')).toBeTruthy()
  })

  it('displays test suites by default', () => {
    render(<TestingAnd />)
    const listContainer = screen.getByTestId('testingand-list')
    expect(listContainer).toBeTruthy()
    expect(listContainer.textContent).toContain('Unit Tests')
    expect(listContainer.textContent).toContain('Integration Tests')
    expect(listContainer.textContent).toContain('E2E Tests')
  })

  it('displays mock test suite data', () => {
    render(<TestingAnd />)
    expect(screen.getByText('API Tests')).toBeTruthy()
    expect(screen.getByText('Component Tests')).toBeTruthy()
  })

  it('has test type filter dropdown', () => {
    render(<TestingAnd />)
    const filterSelect = screen.getByTestId('testingand-test-type')
    expect(filterSelect).toBeTruthy()
  })

  it('has run all tests button', () => {
    render(<TestingAnd />)
    const runAllButton = screen.getByTestId('testingand-run-all')
    expect(runAllButton).toBeTruthy()
    expect(runAllButton.textContent).toBe('Run All Tests')
  })

  it('has required data-testid attributes', () => {
    render(<TestingAnd />)
    // Main wrapper
    expect(screen.getByTestId('testingand')).toBeTruthy()
    
    // Tab buttons
    expect(screen.getByTestId('testingand-tab-tests')).toBeTruthy()
    expect(screen.getByTestId('testingand-tab-deployments')).toBeTruthy()
    
    // Filter select (visible on tests tab)
    expect(screen.getByTestId('testingand-test-type')).toBeTruthy()
    
    // Action buttons on tests tab
    expect(screen.getByTestId('testingand-run-all')).toBeTruthy()
    
    // Quick action buttons (always visible)
    expect(screen.getByTestId('testingand-generate-report')).toBeTruthy()
    expect(screen.getByTestId('testingand-rollback')).toBeTruthy()
    expect(screen.getByTestId('testingand-view-logs')).toBeTruthy()
    
    // List containers
    expect(screen.getByTestId('testingand-list')).toBeTruthy()
    
    // List items
    const testItems = screen.getAllByTestId('testingand-item')
    expect(testItems.length).toBeGreaterThan(0)
    
    // Individual action buttons on tests tab
    const runButtons = screen.getAllByTestId('testingand-run')
    expect(runButtons.length).toBeGreaterThan(0)
    
    const configureButtons = screen.getAllByTestId('testingand-configure')
    expect(configureButtons.length).toBeGreaterThan(0)
  })

  it('displays quick action buttons', () => {
    render(<TestingAnd />)
    expect(screen.getByText('Quick Actions')).toBeTruthy()
    expect(screen.getByTestId('testingand-generate-report')).toBeTruthy()
    expect(screen.getByTestId('testingand-rollback')).toBeTruthy()
    expect(screen.getByTestId('testingand-view-logs')).toBeTruthy()
  })

  it('displays test suite list with coverage bars', () => {
    render(<TestingAnd />)
    const listContainer = screen.getByTestId('testingand-list')
    expect(listContainer).toBeTruthy()
    
    const items = screen.getAllByTestId('testingand-item')
    expect(items.length).toBe(5) // 5 mock test suites
  })

  it('has deployment tab data-testid attributes', () => {
    render(<TestingAnd />)
    
    // Click deployments tab
    const deploymentsTab = screen.getByTestId('testingand-tab-deployments')
    fireEvent.click(deploymentsTab)
    
    // Check deployment-specific buttons
    expect(screen.getByTestId('testingand-add-environment')).toBeTruthy()
    expect(screen.getByTestId('testingand-environment-list')).toBeTruthy()
    
    // Check environment items
    const envItems = screen.getAllByTestId('testingand-environment-item')
    expect(envItems.length).toBe(5) // 5 mock environments
    
    // Check deploy and settings buttons
    const deployButtons = screen.getAllByTestId('testingand-deploy')
    expect(deployButtons.length).toBeGreaterThan(0)
    
    const settingsButtons = screen.getAllByTestId('testingand-settings')
    expect(settingsButtons.length).toBeGreaterThan(0)
  })
})
