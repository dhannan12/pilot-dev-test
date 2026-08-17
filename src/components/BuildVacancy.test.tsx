import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import BuildVacancy from './BuildVacancy'

describe('BuildVacancy', () => {
  it('renders without crashing', () => {
    render(<BuildVacancy />)
    expect(document.body).toBeTruthy()
  })

  it('displays the vacancy management heading', () => {
    render(<BuildVacancy />)
    expect(screen.getByText('Vacancy Management')).toBeTruthy()
    expect(screen.getByText(/Create and manage job postings/i)).toBeTruthy()
  })

  it('displays all three navigation tabs', () => {
    render(<BuildVacancy />)
    expect(screen.getByText('Create Vacancy')).toBeTruthy()
    expect(screen.getByText('Preview')).toBeTruthy()
    expect(screen.getByText('All Vacancies')).toBeTruthy()
  })

  it('displays the vacancy form by default', () => {
    render(<BuildVacancy />)
    expect(screen.getByText('Vacancy Details')).toBeTruthy()
    expect(screen.getByLabelText(/Job Title/i)).toBeTruthy()
    expect(screen.getByLabelText(/Department/i)).toBeTruthy()
    expect(screen.getByLabelText(/Closing Date/i)).toBeTruthy()
  })

  it('displays mock vacancy data in the list view', async () => {
    const user = userEvent.setup()
    render(<BuildVacancy />)
    // Switch to list tab
    const listTab = screen.getByTestId('build-vacancy-tab-list')
    await user.click(listTab)
    
    // Check for mock vacancies
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Product Manager')).toBeTruthy()
    expect(screen.getByText('UX Designer')).toBeTruthy()
    expect(screen.getByText('Data Scientist')).toBeTruthy()
    expect(screen.getByText('HR Business Partner')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<BuildVacancy />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="build-vacancy"]')).toBeTruthy()
    
    // Tabs
    expect(document.querySelector('[data-testid="build-vacancy-tabs"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-tab-form"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-tab-preview"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-tab-list"]')).toBeTruthy()
    
    // Form elements
    expect(document.querySelector('[data-testid="build-vacancy-form"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-title"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-department"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-location"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-employment-type"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-level"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-closing-date"]')).toBeTruthy()
    
    // Action buttons
    expect(document.querySelector('[data-testid="build-vacancy-save-draft"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-publish"]')).toBeTruthy()
    
    // List management buttons
    expect(document.querySelector('[data-testid="build-vacancy-add-requirement"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-add-responsibility"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-add-qualification"]')).toBeTruthy()
  })

  it('displays form validation requirements', () => {
    render(<BuildVacancy />)
    
    // Check for required field markers (*)
    const titleLabel = screen.getByText(/Job Title \*/i)
    const departmentLabel = screen.getByText(/Department \*/i)
    const closingDateLabel = screen.getByText(/Closing Date \*/i)
    const requirementsLabel = screen.getByText(/Requirements \*/i)
    
    expect(titleLabel).toBeTruthy()
    expect(departmentLabel).toBeTruthy()
    expect(closingDateLabel).toBeTruthy()
    expect(requirementsLabel).toBeTruthy()
  })

  it('has list containers with data-testid', () => {
    render(<BuildVacancy />)
    
    expect(document.querySelector('[data-testid="build-vacancy-requirements-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-responsibilities-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="build-vacancy-qualifications-list"]')).toBeTruthy()
  })

  it('displays vacancy list items when on list tab', async () => {
    const user = userEvent.setup()
    render(<BuildVacancy />)
    
    // Switch to list tab
    const listTab = screen.getByTestId('build-vacancy-tab-list')
    await user.click(listTab)
    
    // Check for list container and items
    expect(document.querySelector('[data-testid="build-vacancy-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="build-vacancy-item"]')
    expect(items.length).toBeGreaterThan(0)
  })
})
