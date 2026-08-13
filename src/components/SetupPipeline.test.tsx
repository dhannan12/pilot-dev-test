import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupPipeline from './SetupPipeline'

describe('SetupPipeline', () => {
  it('renders without crashing', () => {
    render(<SetupPipeline />)
    expect(document.body).toBeTruthy()
  })

  it('displays the dashboard title', () => {
    render(<SetupPipeline />)
    expect(screen.getByText('CI/CD Pipeline Dashboard')).toBeTruthy()
    expect(screen.getByText('Monitor build pipelines, deployments, and test results')).toBeTruthy()
  })

  it('displays pipeline statistics', () => {
    render(<SetupPipeline />)
    expect(screen.getByText('Total Pipelines')).toBeTruthy()
    expect(screen.getByText('Successful')).toBeTruthy()
    expect(screen.getByText('Running')).toBeTruthy()
    expect(screen.getByText('Failed')).toBeTruthy()
  })

  it('displays mock pipeline data', () => {
    render(<SetupPipeline />)
    expect(screen.getByText('Build & Test - Main')).toBeTruthy()
    expect(screen.getByText('Build & Test - Feature')).toBeTruthy()
    expect(screen.getByText('Deploy - Staging')).toBeTruthy()
    expect(screen.getByText('Build & Test - Hotfix')).toBeTruthy()
    expect(screen.getByText('Build & Test - Release')).toBeTruthy()
  })

  it('displays pipeline details with branch and commit info', () => {
    render(<SetupPipeline />)
    expect(screen.getByText('main')).toBeTruthy()
    expect(screen.getByText('a3f2c1d')).toBeTruthy()
    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  it('switches between tabs', () => {
    render(<SetupPipeline />)
    
    // Initially on pipelines tab
    expect(screen.getByText('Build & Test - Main')).toBeTruthy()
    
    // Click deployments tab
    const deploymentsTab = screen.getByText('Deployments')
    fireEvent.click(deploymentsTab)
    
    // Check deployments are displayed
    expect(screen.getByText('v2.0.5')).toBeTruthy()
    expect(screen.getByText('v2.1.0-rc.3')).toBeTruthy()
  })

  it('displays deployment data in table format', () => {
    render(<SetupPipeline />)
    
    // Switch to deployments tab
    const deploymentsTab = screen.getByText('Deployments')
    fireEvent.click(deploymentsTab)
    
    // Check table headers
    expect(screen.getByText('Environment')).toBeTruthy()
    expect(screen.getByText('Version')).toBeTruthy()
    expect(screen.getByText('Status')).toBeTruthy()
    expect(screen.getByText('Deployed At')).toBeTruthy()
    expect(screen.getByText('Deployed By')).toBeTruthy()
  })

  it('opens pipeline details modal when clicking on a pipeline', () => {
    render(<SetupPipeline />)
    
    const pipelineItem = screen.getByText('Build & Test - Main')
    fireEvent.click(pipelineItem.closest('div[class*="cursor-pointer"]') as Element)
    
    // Check modal appears with build log
    expect(screen.getByText('Build Log')).toBeTruthy()
  })

  it('displays test results for pipelines', () => {
    render(<SetupPipeline />)
    
    const passedTexts = screen.getAllByText(/passed/)
    expect(passedTexts.length).toBeGreaterThan(0)
  })

  it('displays action buttons in deployments', () => {
    render(<SetupPipeline />)
    
    // Switch to deployments tab
    const deploymentsTab = screen.getByText('Deployments')
    fireEvent.click(deploymentsTab)
    
    // Check for action buttons
    const viewLogsButtons = screen.getAllByText('View Logs')
    expect(viewLogsButtons.length).toBeGreaterThan(0)
  })
})
