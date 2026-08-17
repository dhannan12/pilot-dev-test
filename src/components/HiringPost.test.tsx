import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HiringPost from './HiringPost'

describe('HiringPost', () => {
  it('renders without crashing', () => {
    render(<HiringPost />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and form', () => {
    render(<HiringPost />)
    expect(screen.getByText('Post New Vacancy')).toBeTruthy()
    expect(screen.getByText('Create a detailed job posting to attract qualified candidates')).toBeTruthy()
  })

  it('displays mock recently posted jobs', () => {
    render(<HiringPost />)
    expect(screen.getByText('Recently Posted')).toBeTruthy()
    expect(screen.getByText('Senior Frontend Engineer')).toBeTruthy()
    expect(screen.getByText('Product Manager')).toBeTruthy()
    expect(screen.getByText('UX Designer')).toBeTruthy()
    expect(screen.getByText('Marketing Coordinator')).toBeTruthy()
    expect(screen.getByText('DevOps Engineer')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<HiringPost />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="hiring-post"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="hiring-post-title"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-department"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-employment-type"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-location"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-closing-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-description"]')).toBeTruthy()
    
    // Requirements section
    expect(document.querySelector('[data-testid="hiring-post-requirement-input"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-add-requirement"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="hiring-post-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-cancel"]')).toBeTruthy()
    
    // Recent jobs list
    expect(document.querySelector('[data-testid="hiring-post-recent-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="hiring-post-recent-item"]').length).toBe(5)
  })

  it('allows adding requirements', () => {
    render(<HiringPost />)
    
    const requirementInput = document.querySelector('[data-testid="hiring-post-requirement-input"]') as HTMLInputElement
    const addButton = document.querySelector('[data-testid="hiring-post-add-requirement"]') as HTMLButtonElement
    
    // Add a requirement
    fireEvent.change(requirementInput, { target: { value: '5+ years experience' } })
    fireEvent.click(addButton)
    
    // Check that requirements list appears
    expect(document.querySelector('[data-testid="hiring-post-requirements-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="hiring-post-requirement-item"]')).toBeTruthy()
    expect(screen.getByText('5+ years experience')).toBeTruthy()
  })

  it('disables submit button when form is incomplete', () => {
    render(<HiringPost />)
    
    const submitButton = document.querySelector('[data-testid="hiring-post-submit"]') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('allows clearing the form', () => {
    render(<HiringPost />)
    
    const titleInput = document.querySelector('[data-testid="hiring-post-title"]') as HTMLInputElement
    const clearButton = document.querySelector('[data-testid="hiring-post-cancel"]') as HTMLButtonElement
    
    // Fill in title
    fireEvent.change(titleInput, { target: { value: 'Test Job' } })
    expect(titleInput.value).toBe('Test Job')
    
    // Clear form
    fireEvent.click(clearButton)
    expect(titleInput.value).toBe('')
  })

  it('shows all department options', () => {
    render(<HiringPost />)
    
    const departmentSelect = document.querySelector('[data-testid="hiring-post-department"]') as HTMLSelectElement
    const options = Array.from(departmentSelect.options).map(opt => opt.value).filter(v => v !== '')
    
    expect(options.length).toBeGreaterThanOrEqual(5)
    expect(options).toContain('Engineering')
    expect(options).toContain('Product')
    expect(options).toContain('Design')
  })

  it('shows all employment type options', () => {
    render(<HiringPost />)
    
    const employmentTypeSelect = document.querySelector('[data-testid="hiring-post-employment-type"]') as HTMLSelectElement
    const options = Array.from(employmentTypeSelect.options).map(opt => opt.value).filter(v => v !== '')
    
    expect(options.length).toBeGreaterThanOrEqual(3)
    expect(options).toContain('Full-time')
    expect(options).toContain('Part-time')
    expect(options).toContain('Contract')
  })

  it('displays applicant counts for recently posted jobs', () => {
    render(<HiringPost />)
    
    expect(screen.getByText('42 applicants')).toBeTruthy()
    expect(screen.getByText('28 applicants')).toBeTruthy()
    expect(screen.getByText('35 applicants')).toBeTruthy()
  })
})
