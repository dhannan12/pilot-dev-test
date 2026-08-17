import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildJob from './BuildJob'

describe('BuildJob', () => {
  it('renders without crashing', () => {
    render(<BuildJob />)
    expect(document.body).toBeTruthy()
  })

  it('displays page title and description', () => {
    render(<BuildJob />)
    expect(screen.getByText('Internal Job Postings')).toBeInTheDocument()
    expect(screen.getByText('Explore open positions across the organization')).toBeInTheDocument()
  })

  it('displays mock vacancy data', () => {
    render(<BuildJob />)
    // Check for some job titles from mock data
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Product Manager')).toBeInTheDocument()
    expect(screen.getByText('Data Scientist')).toBeInTheDocument()
  })

  it('has filter panel with department, location, and grade level filters', () => {
    render(<BuildJob />)
    expect(screen.getByLabelText('Department')).toBeInTheDocument()
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
    expect(screen.getByLabelText('Grade Level')).toBeInTheDocument()
  })

  it('displays vacancy count', () => {
    render(<BuildJob />)
    // Should show total vacancies on initial render
    expect(screen.getByText(/Showing \d+ of \d+ positions/)).toBeInTheDocument()
  })

  it('displays vacancy cards with required details', () => {
    render(<BuildJob />)
    // Check that vacancy cards contain required fields
    expect(screen.getAllByText(/Department:/)).toHaveLength(8)
    expect(screen.getAllByText(/Location:/)).toHaveLength(8)
    expect(screen.getAllByText(/Grade Level:/)).toHaveLength(8)
    expect(screen.getAllByText(/Closing Date:/)).toHaveLength(8)
    expect(screen.getAllByText(/Requirements:/)).toHaveLength(8)
  })

  it('has reset filters button', () => {
    render(<BuildJob />)
    expect(screen.getByTestId('build-job-reset')).toBeInTheDocument()
  })

  it('has apply buttons on vacancy cards', () => {
    render(<BuildJob />)
    const applyButtons = screen.getAllByTestId('build-job-apply')
    expect(applyButtons.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<BuildJob />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('build-job')).toBeInTheDocument()
    expect(screen.getByTestId('build-job-filter-panel')).toBeInTheDocument()
    expect(screen.getByTestId('build-job-department')).toBeInTheDocument()
    expect(screen.getByTestId('build-job-location')).toBeInTheDocument()
    expect(screen.getByTestId('build-job-grade-level')).toBeInTheDocument()
    expect(screen.getByTestId('build-job-reset')).toBeInTheDocument()
    expect(screen.getByTestId('build-job-list')).toBeInTheDocument()
    expect(screen.getAllByTestId('build-job-card').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('build-job-apply').length).toBeGreaterThan(0)
  })
})
