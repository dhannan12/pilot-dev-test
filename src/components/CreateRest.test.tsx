import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreateRest from './CreateRest'

describe('CreateRest', () => {
  it('renders without crashing', () => {
    render(<CreateRest />)
    expect(document.body).toBeTruthy()
  })

  it('displays REST API endpoint management interface', () => {
    render(<CreateRest />)
    expect(screen.getByText(/REST API Endpoints/i)).toBeTruthy()
    expect(screen.getByText(/Manage endpoints for job discovery/i)).toBeTruthy()
  })

  it('displays mock endpoint data', () => {
    render(<CreateRest />)
    // Check for specific endpoint names
    expect(screen.getByText(/List Job Postings/i)).toBeTruthy()
    expect(screen.getByText(/Submit Application/i)).toBeTruthy()
    expect(screen.getByText(/Get Application Status/i)).toBeTruthy()
  })

  it('displays HTTP methods for endpoints', () => {
    render(<CreateRest />)
    // Multiple GET, POST endpoints should be visible
    const getElements = screen.getAllByText('GET')
    const postElements = screen.getAllByText('POST')
    expect(getElements.length).toBeGreaterThan(0)
    expect(postElements.length).toBeGreaterThan(0)
  })

  it('displays endpoint paths', () => {
    render(<CreateRest />)
    expect(screen.getByText('/api/v1/jobs')).toBeTruthy()
    expect(screen.getByText('/api/v1/applications')).toBeTruthy()
  })

  it('displays category filters', () => {
    render(<CreateRest />)
    expect(screen.getByTestId('createrest-filter-all')).toBeTruthy()
    expect(screen.getByTestId('createrest-filter-jobs')).toBeTruthy()
    expect(screen.getByTestId('createrest-filter-applications')).toBeTruthy()
    expect(screen.getByTestId('createrest-filter-status')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CreateRest />)
    
    // Main wrapper
    expect(screen.getByTestId('createrest')).toBeTruthy()
    
    // Filter buttons
    expect(screen.getByTestId('createrest-filter-all')).toBeTruthy()
    expect(screen.getByTestId('createrest-filter-jobs')).toBeTruthy()
    expect(screen.getByTestId('createrest-filter-applications')).toBeTruthy()
    expect(screen.getByTestId('createrest-filter-status')).toBeTruthy()
    
    // Create button
    expect(screen.getByTestId('createrest-create')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('createrest-list')).toBeTruthy()
    
    // List items (should have multiple)
    const items = screen.getAllByTestId('createrest-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons on items
    const testButtons = screen.getAllByTestId('createrest-test')
    expect(testButtons.length).toBeGreaterThan(0)
    
    const editButtons = screen.getAllByTestId('createrest-edit')
    expect(editButtons.length).toBeGreaterThan(0)
    
    const deleteButtons = screen.getAllByTestId('createrest-delete')
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('displays request and response schemas', () => {
    render(<CreateRest />)
    expect(screen.getAllByText(/REQUEST SCHEMA/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/RESPONSE SCHEMA/i).length).toBeGreaterThan(0)
  })

  it('displays endpoint status badges', () => {
    render(<CreateRest />)
    expect(screen.getAllByText('Active').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Testing').length).toBeGreaterThan(0)
  })

  it('displays endpoint categories', () => {
    render(<CreateRest />)
    expect(screen.getAllByText('Jobs').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Applications').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Status').length).toBeGreaterThan(0)
  })
})
