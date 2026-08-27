import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SetupProjectStructure from './SetupProjectStructure'

describe('SetupProjectStructure', () => {
  it('renders without crashing', () => {
    render(<SetupProjectStructure />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<SetupProjectStructure />)
    // Check for project structure data
    expect(screen.getByText(/Project Setup & CI\/CD Pipeline/i)).toBeTruthy()
    expect(screen.getByText(/Folder Structure/i)).toBeTruthy()
    
    // Check for specific folder/file names
    expect(screen.getByText('src')).toBeTruthy()
    expect(screen.getByText('package.json')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<SetupProjectStructure />)
    // Verify key testids exist — Playwright QA depends on these
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="setup-project-structure"]')
    expect(mainWrapper).toBeTruthy()
    
    // Tab buttons
    const structureTab = document.querySelector('[data-testid="setup-project-structure-tab-structure"]')
    expect(structureTab).toBeTruthy()
    
    const pipelineTab = document.querySelector('[data-testid="setup-project-structure-tab-pipeline"]')
    expect(pipelineTab).toBeTruthy()
    
    // Action buttons
    const refreshButton = document.querySelector('[data-testid="setup-project-structure-refresh"]')
    expect(refreshButton).toBeTruthy()
    
    const scaffoldButton = document.querySelector('[data-testid="setup-project-structure-scaffold"]')
    expect(scaffoldButton).toBeTruthy()
    
    const configureButton = document.querySelector('[data-testid="setup-project-structure-configure"]')
    expect(configureButton).toBeTruthy()
    
    const exportButton = document.querySelector('[data-testid="setup-project-structure-export"]')
    expect(exportButton).toBeTruthy()
    
    // List containers
    const structureList = document.querySelector('[data-testid="setup-project-structure-list"]')
    expect(structureList).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="setup-project-structure-item"]')
    expect(items.length).toBeGreaterThan(0)
  })
})
