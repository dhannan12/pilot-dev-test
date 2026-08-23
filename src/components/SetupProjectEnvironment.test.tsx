import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupProjectEnvironment from './SetupProjectEnvironment'

describe('SetupProjectEnvironment', () => {
  it('renders without crashing', () => {
    render(<SetupProjectEnvironment />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<SetupProjectEnvironment />)
    expect(screen.getByText(/Project Environment & CI\/CD/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupProjectEnvironment />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="setupprojectenvironment"]')).toBeTruthy()
    
    // Tab buttons
    expect(document.querySelector('[data-testid="setupprojectenvironment-pipeline-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-config-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-deployments-tab"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-builds-tab"]')).toBeTruthy()
    
    // Pipeline list and items (default tab)
    expect(document.querySelector('[data-testid="setupprojectenvironment-pipeline-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="setupprojectenvironment-pipeline-item"]').length).toBeGreaterThan(0)
    
    // Run pipeline button
    expect(document.querySelector('[data-testid="setupprojectenvironment-run-pipeline"]')).toBeTruthy()
  })

  it('displays pipeline steps by default', () => {
    render(<SetupProjectEnvironment />)
    expect(screen.getByText(/Current Pipeline/i)).toBeTruthy()
    expect(screen.getByText(/Install Dependencies/i)).toBeTruthy()
    expect(screen.getByText(/Run Tests/i)).toBeTruthy()
  })

  it('switches to config tab when clicked', () => {
    render(<SetupProjectEnvironment />)
    const configTab = document.querySelector('[data-testid="setupprojectenvironment-config-tab"]') as HTMLButtonElement
    expect(configTab).toBeTruthy()
    
    fireEvent.click(configTab)
    
    expect(screen.getByText(/Environment Variables/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-config-list"]')).toBeTruthy()
  })

  it('switches to deployments tab when clicked', () => {
    render(<SetupProjectEnvironment />)
    const deploymentsTab = document.querySelector('[data-testid="setupprojectenvironment-deployments-tab"]') as HTMLButtonElement
    expect(deploymentsTab).toBeTruthy()
    
    fireEvent.click(deploymentsTab)
    
    expect(screen.getByText(/Deployment Targets/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-deployments-list"]')).toBeTruthy()
  })

  it('switches to builds tab when clicked', () => {
    render(<SetupProjectEnvironment />)
    const buildsTab = document.querySelector('[data-testid="setupprojectenvironment-builds-tab"]') as HTMLButtonElement
    expect(buildsTab).toBeTruthy()
    
    fireEvent.click(buildsTab)
    
    expect(screen.getByText(/Recent Builds/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-builds-list"]')).toBeTruthy()
  })

  it('displays mock data for all tabs', () => {
    render(<SetupProjectEnvironment />)
    
    // Pipeline items
    expect(document.querySelectorAll('[data-testid="setupprojectenvironment-pipeline-item"]').length).toBeGreaterThan(4)
    
    // Switch to config tab
    const configTab = document.querySelector('[data-testid="setupprojectenvironment-config-tab"]') as HTMLButtonElement
    fireEvent.click(configTab)
    expect(document.querySelectorAll('[data-testid="setupprojectenvironment-config-item"]').length).toBeGreaterThan(4)
    
    // Switch to deployments tab
    const deploymentsTab = document.querySelector('[data-testid="setupprojectenvironment-deployments-tab"]') as HTMLButtonElement
    fireEvent.click(deploymentsTab)
    expect(document.querySelectorAll('[data-testid="setupprojectenvironment-deployment-item"]').length).toBeGreaterThan(4)
    
    // Switch to builds tab
    const buildsTab = document.querySelector('[data-testid="setupprojectenvironment-builds-tab"]') as HTMLButtonElement
    fireEvent.click(buildsTab)
    expect(document.querySelectorAll('[data-testid="setupprojectenvironment-build-item"]').length).toBeGreaterThan(4)
  })

  it('has toggle secure button in config tab', () => {
    render(<SetupProjectEnvironment />)
    const configTab = document.querySelector('[data-testid="setupprojectenvironment-config-tab"]') as HTMLButtonElement
    fireEvent.click(configTab)
    
    const toggleButton = document.querySelector('[data-testid="setupprojectenvironment-toggle-secure"]')
    expect(toggleButton).toBeTruthy()
  })

  it('displays action buttons for each item type', () => {
    render(<SetupProjectEnvironment />)
    
    // Config tab buttons
    const configTab = document.querySelector('[data-testid="setupprojectenvironment-config-tab"]') as HTMLButtonElement
    fireEvent.click(configTab)
    expect(document.querySelector('[data-testid="setupprojectenvironment-add-config"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-edit-config"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-delete-config"]')).toBeTruthy()
    
    // Deployment tab buttons
    const deploymentsTab = document.querySelector('[data-testid="setupprojectenvironment-deployments-tab"]') as HTMLButtonElement
    fireEvent.click(deploymentsTab)
    expect(document.querySelector('[data-testid="setupprojectenvironment-add-target"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-deploy-target"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="setupprojectenvironment-configure-target"]')).toBeTruthy()
  })
})
