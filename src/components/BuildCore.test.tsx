import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildCore from './BuildCore'

describe('BuildCore', () => {
  it('renders without crashing', () => {
    render(<BuildCore />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock health metrics data', () => {
    render(<BuildCore />)
    // Check for header
    expect(screen.getByText('Health Metrics API Dashboard')).toBeTruthy()
    
    // Check for endpoint paths (they appear multiple times in select and list)
    expect(screen.getAllByText('/api/v1/health/check').length).toBeGreaterThan(0)
    expect(screen.getAllByText('/api/v1/metrics/heart-rate').length).toBeGreaterThan(0)
    expect(screen.getAllByText('/api/v1/metrics/blood-pressure').length).toBeGreaterThan(0)
    
    // Check for status labels
    expect(screen.getByText('Total Endpoints')).toBeTruthy()
    expect(screen.getAllByText('Healthy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Degraded').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Down').length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<BuildCore />)
    
    // Main wrapper
    const wrapper = document.querySelector('[data-testid="buildcore"]')
    expect(wrapper).toBeTruthy()
    
    // List container
    const list = document.querySelector('[data-testid="buildcore-list"]')
    expect(list).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="buildcore-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Select inputs
    const endpointSelect = document.querySelector('[data-testid="buildcore-endpoint"]')
    expect(endpointSelect).toBeTruthy()
    
    const statusFilter = document.querySelector('[data-testid="buildcore-status-filter"]')
    expect(statusFilter).toBeTruthy()
    
    // Buttons
    const refreshButton = document.querySelector('[data-testid="buildcore-refresh"]')
    expect(refreshButton).toBeTruthy()
    
    const configureButton = document.querySelector('[data-testid="buildcore-configure"]')
    expect(configureButton).toBeTruthy()
    
    const exportButton = document.querySelector('[data-testid="buildcore-export"]')
    expect(exportButton).toBeTruthy()
    
    const addEndpointButton = document.querySelector('[data-testid="buildcore-add-endpoint"]')
    expect(addEndpointButton).toBeTruthy()
    
    const viewDetailsButtons = document.querySelectorAll('[data-testid="buildcore-view-details"]')
    expect(viewDetailsButtons.length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<BuildCore />)
    
    // Check for performance metrics section
    expect(screen.getByText('Performance Metrics')).toBeTruthy()
    expect(screen.getByText('Avg Response Time')).toBeTruthy()
    expect(screen.getByText('Total Errors (24h)')).toBeTruthy()
    expect(screen.getByText('Uptime')).toBeTruthy()
  })

  it('renders all endpoint items', () => {
    render(<BuildCore />)
    
    // Should display all 7 mock endpoints
    const items = document.querySelectorAll('[data-testid="buildcore-item"]')
    expect(items.length).toBe(7)
  })
})
