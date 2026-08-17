import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NHrBusiness from './NHrBusiness'

describe('NHrBusiness', () => {
  it('renders without crashing', () => {
    render(<NHrBusiness />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<NHrBusiness />)
    expect(screen.getByText('HR Business Partner Dashboard')).toBeTruthy()
  })

  it('displays mock department data in overview mode', () => {
    render(<NHrBusiness />)
    const list = document.querySelector('[data-testid="nhrbusiness-list"]')
    expect(list?.textContent).toContain('Engineering')
    expect(list?.textContent).toContain('Sales')
    expect(list?.textContent).toContain('Marketing')
    expect(list?.textContent).toContain('Product')
    expect(list?.textContent).toContain('Customer Success')
  })

  it('displays summary metrics', () => {
    render(<NHrBusiness />)
    expect(screen.getByText('Total Applications')).toBeTruthy()
    expect(screen.getByText('Open Positions')).toBeTruthy()
    expect(screen.getByText('Total Hired')).toBeTruthy()
    expect(screen.getByText('Avg Conversion Rate')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<NHrBusiness />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="nhrbusiness"]')).toBeTruthy()
    
    // Department filter
    expect(document.querySelector('[data-testid="nhrbusiness-department"]')).toBeTruthy()
    
    // View mode buttons
    expect(document.querySelector('[data-testid="nhrbusiness-view-overview"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="nhrbusiness-view-insights"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="nhrbusiness-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="nhrbusiness-item"]').length).toBeGreaterThan(0)
    
    // Export buttons
    expect(document.querySelector('[data-testid="nhrbusiness-export-csv"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="nhrbusiness-generate-report"]')).toBeTruthy()
  })

  it('filters by department when selected', () => {
    render(<NHrBusiness />)
    
    const departmentSelect = screen.getByTestId('nhrbusiness-department') as HTMLSelectElement
    fireEvent.change(departmentSelect, { target: { value: 'Engineering' } })
    
    expect(departmentSelect.value).toBe('Engineering')
  })

  it('switches between overview and insights view modes', () => {
    render(<NHrBusiness />)
    
    const insightsButton = screen.getByTestId('nhrbusiness-view-insights')
    fireEvent.click(insightsButton)
    
    // Should show insights heading
    expect(screen.getByText('Strategic Insights & Recommendations')).toBeTruthy()
    
    const overviewButton = screen.getByTestId('nhrbusiness-view-overview')
    fireEvent.click(overviewButton)
    
    // Should show overview heading
    expect(screen.getByText('Department Hiring Metrics')).toBeTruthy()
  })

  it('displays insights in insights view mode', () => {
    render(<NHrBusiness />)
    
    const insightsButton = screen.getByTestId('nhrbusiness-view-insights')
    fireEvent.click(insightsButton)
    
    // Check for insights list
    expect(document.querySelector('[data-testid="nhrbusiness-insights-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="nhrbusiness-insight-item"]').length).toBeGreaterThan(0)
  })

  it('displays all required table columns in overview', () => {
    render(<NHrBusiness />)
    
    const table = document.querySelector('table')
    expect(table?.textContent).toContain('Positions')
    expect(table?.textContent).toContain('Applications')
    expect(table?.textContent).toContain('Interviews')
    expect(table?.textContent).toContain('Offers')
    expect(table?.textContent).toContain('Hired')
    expect(table?.textContent).toContain('Avg Days')
    expect(table?.textContent).toContain('Conversion')
  })
})
