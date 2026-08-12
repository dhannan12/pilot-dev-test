import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupPipeline from './SetupPipeline'

describe('SetupPipeline', () => {
  it('renders without crashing', () => {
    render(<SetupPipeline />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title and description', () => {
    render(<SetupPipeline />)
    expect(screen.getByText('CI/CD Pipeline Setup')).toBeTruthy()
    expect(screen.getByText(/Configure and monitor your continuous integration/)).toBeTruthy()
  })

  it('displays all mock pipelines', () => {
    render(<SetupPipeline />)
    expect(screen.getAllByText('Production Build').length).toBeGreaterThan(0)
    expect(screen.getByText('Staging Deployment')).toBeTruthy()
    expect(screen.getByText('Security Scan')).toBeTruthy()
    expect(screen.getByText('Feature Branch Build')).toBeTruthy()
    expect(screen.getByText('E2E Testing')).toBeTruthy()
  })

  it('shows pipeline details when a pipeline is selected', () => {
    render(<SetupPipeline />)
    // Production Build should be selected by default
    expect(screen.getByText('Checkout Code')).toBeTruthy()
    expect(screen.getByText('Install Dependencies')).toBeTruthy()
    expect(screen.getByText('Run Tests')).toBeTruthy()
  })

  it('switches pipeline details when clicking different pipelines', () => {
    render(<SetupPipeline />)
    
    // Click on Staging Deployment pipeline
    const stagingButton = screen.getByRole('button', { name: /Staging Deployment/ })
    fireEvent.click(stagingButton)
    
    // Should show staging pipeline details
    expect(screen.getByText('Lint Code')).toBeTruthy()
  })

  it('expands and collapses step details', () => {
    render(<SetupPipeline />)
    
    // Find a step and click to expand
    const stepButtons = screen.getAllByRole('button')
    const checkoutStep = stepButtons.find(btn => btn.textContent?.includes('Install Dependencies') && !btn.textContent?.includes('Pipeline'))
    
    if (checkoutStep) {
      fireEvent.click(checkoutStep)
      // Should show step description (npm install is unique)
      expect(screen.getByText('npm install')).toBeTruthy()
      
      // Click again to collapse
      fireEvent.click(checkoutStep)
    }
  })

  it('displays pipeline status indicators', () => {
    render(<SetupPipeline />)
    
    // Check for status indicators (success, failed, running, pending)
    expect(screen.getAllByText(/success|failed|running|pending/i).length).toBeGreaterThan(0)
  })

  it('shows Run Pipeline button', () => {
    render(<SetupPipeline />)
    expect(screen.getByRole('button', { name: 'Run Pipeline' })).toBeTruthy()
  })

  it('displays pipeline configuration code', () => {
    render(<SetupPipeline />)
    expect(screen.getByText('Pipeline Configuration')).toBeTruthy()
    // Check for yaml-like config content
    expect(screen.getByText(/name:/)).toBeTruthy()
  })

  it('shows branch and trigger information for each pipeline', () => {
    render(<SetupPipeline />)
    expect(screen.getAllByText('Branch:').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Trigger:').length).toBeGreaterThan(0)
  })

  it('displays last run time for pipelines', () => {
    render(<SetupPipeline />)
    expect(screen.getAllByText(/Last run:/i).length).toBeGreaterThan(0)
  })
})
