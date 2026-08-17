import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HiringPost from './HiringPost'

describe('HiringPost', () => {
  it('renders without crashing', () => {
    render(<HiringPost />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading and description', () => {
    render(<HiringPost />)
    expect(screen.getByText('Post Job Vacancy')).toBeTruthy()
    expect(screen.getByText('Create and manage internal job postings')).toBeTruthy()
  })

  it('displays mock posted job vacancies', () => {
    render(<HiringPost />)
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    expect(screen.getByText('Product Manager')).toBeTruthy()
    expect(screen.getByText('UX Designer')).toBeTruthy()
    expect(screen.getByText('Data Analyst')).toBeTruthy()
    expect(screen.getByText('Marketing Specialist')).toBeTruthy()
  })

  it('shows the new vacancy form when clicking the create button', () => {
    render(<HiringPost />)
    const createButton = screen.getByTestId('hiringpost-create')
    fireEvent.click(createButton)
    expect(screen.getByText('Create New Vacancy')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-title')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-department')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-requirements')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-closingdate')).toBeTruthy()
  })

  it('allows filling out the form fields', () => {
    render(<HiringPost />)
    fireEvent.click(screen.getByTestId('hiringpost-create'))

    const titleInput = screen.getByTestId('hiringpost-title') as HTMLInputElement
    const deptSelect = screen.getByTestId('hiringpost-department') as HTMLSelectElement
    const reqTextarea = screen.getByTestId('hiringpost-requirements') as HTMLTextAreaElement
    const dateInput = screen.getByTestId('hiringpost-closingdate') as HTMLInputElement

    fireEvent.change(titleInput, { target: { value: 'Test Engineer' } })
    fireEvent.change(deptSelect, { target: { value: 'Engineering' } })
    fireEvent.change(reqTextarea, { target: { value: 'Test requirements' } })
    fireEvent.change(dateInput, { target: { value: '2026-10-01' } })

    expect(titleInput.value).toBe('Test Engineer')
    expect(deptSelect.value).toBe('Engineering')
    expect(reqTextarea.value).toBe('Test requirements')
    expect(dateInput.value).toBe('2026-10-01')
  })

  it('can cancel form entry', () => {
    render(<HiringPost />)
    fireEvent.click(screen.getByTestId('hiringpost-create'))
    expect(screen.getByText('Create New Vacancy')).toBeTruthy()
    
    fireEvent.click(screen.getByTestId('hiringpost-cancel'))
    expect(screen.queryByText('Create New Vacancy')).toBeFalsy()
  })

  it('can delete a job posting', () => {
    render(<HiringPost />)
    expect(screen.getByText('Senior Software Engineer')).toBeTruthy()
    
    const deleteButtons = screen.getAllByTestId('hiringpost-delete')
    fireEvent.click(deleteButtons[0])
    
    // The first job should be removed
    expect(screen.queryByText('Senior Software Engineer')).toBeFalsy()
  })

  it('has required data-testid attributes', () => {
    render(<HiringPost />)
    
    // Main wrapper
    expect(screen.getByTestId('hiringpost')).toBeTruthy()
    
    // Create button
    expect(screen.getByTestId('hiringpost-create')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('hiringpost-list')).toBeTruthy()
    const items = screen.getAllByTestId('hiringpost-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Open form to check form elements
    fireEvent.click(screen.getByTestId('hiringpost-create'))
    expect(screen.getByTestId('hiringpost-title')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-department')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-requirements')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-closingdate')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-submit')).toBeTruthy()
    expect(screen.getByTestId('hiringpost-cancel')).toBeTruthy()
  })

  it('displays department information for each job', () => {
    render(<HiringPost />)
    expect(screen.getByText('Engineering')).toBeTruthy()
    expect(screen.getByText('Product')).toBeTruthy()
    expect(screen.getByText('Design')).toBeTruthy()
  })

  it('displays closing dates for posted jobs', () => {
    render(<HiringPost />)
    expect(screen.getByText('2026-09-15')).toBeTruthy()
    expect(screen.getByText('2026-09-20')).toBeTruthy()
  })
})
