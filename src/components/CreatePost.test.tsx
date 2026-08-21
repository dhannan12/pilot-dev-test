import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CreatePost from './CreatePost'

describe('CreatePost', () => {
  it('renders without crashing', () => {
    render(<CreatePost />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CreatePost />)
    const heading = screen.getByText(/Post Absence Report/i)
    expect(heading).toBeTruthy()
  })

  it('displays mock student data in dropdown', () => {
    render(<CreatePost />)
    const studentSelect = document.querySelector('[data-testid="createpost-student"]')
    expect(studentSelect).toBeTruthy()
    expect(studentSelect?.textContent).toContain('Olivia Martinez')
    expect(studentSelect?.textContent).toContain('Ethan Thompson')
    expect(studentSelect?.textContent).toContain('Sophia Anderson')
    expect(studentSelect?.textContent).toContain('Liam Foster')
    expect(studentSelect?.textContent).toContain('Isabella Kim')
  })

  it('displays absence type options', () => {
    render(<CreatePost />)
    const absenceTypeSelect = document.querySelector('[data-testid="createpost-absence-type"]')
    expect(absenceTypeSelect).toBeTruthy()
    expect(absenceTypeSelect?.textContent).toContain('Illness')
    expect(absenceTypeSelect?.textContent).toContain('Medical Appointment')
    expect(absenceTypeSelect?.textContent).toContain('Family Emergency')
    expect(absenceTypeSelect?.textContent).toContain('Religious Observance')
  })

  it('displays submitted reports', () => {
    render(<CreatePost />)
    expect(screen.getByText(/Recent Submissions/i)).toBeTruthy()
    const reports = document.querySelectorAll('[data-testid="createpost-item"]')
    expect(reports.length).toBeGreaterThanOrEqual(5)
  })

  it('has required data-testid attributes on main wrapper', () => {
    render(<CreatePost />)
    const mainWrapper = document.querySelector('[data-testid="createpost"]')
    expect(mainWrapper).toBeTruthy()
  })

  it('has required data-testid attributes on form elements', () => {
    render(<CreatePost />)
    
    // Check all form inputs
    expect(document.querySelector('[data-testid="createpost-student"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createpost-start-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createpost-end-date"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createpost-absence-type"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createpost-reason"]')).toBeTruthy()
  })

  it('has required data-testid attributes on buttons', () => {
    render(<CreatePost />)
    
    expect(document.querySelector('[data-testid="createpost-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createpost-clear"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="createpost-view"]')).toBeTruthy()
  })

  it('has required data-testid attributes on list containers and items', () => {
    render(<CreatePost />)
    
    // List container
    expect(document.querySelector('[data-testid="createpost-list"]')).toBeTruthy()
    
    // List items
    const listItems = document.querySelectorAll('[data-testid="createpost-item"]')
    expect(listItems.length).toBeGreaterThanOrEqual(5)
  })

  it('displays form validation elements', () => {
    render(<CreatePost />)
    
    // Check for required field indicators
    const form = document.querySelector('form')
    expect(form).toBeTruthy()
    expect(form?.textContent).toContain('*')
  })

  it('displays all interactive elements with data-testid', () => {
    render(<CreatePost />)
    
    // Verify all interactive elements have testids
    const testidElements = document.querySelectorAll('[data-testid]')
    expect(testidElements.length).toBeGreaterThan(10)
    
    // Check that main interactive elements are present
    const testids = Array.from(testidElements).map(el => el.getAttribute('data-testid'))
    expect(testids).toContain('createpost')
    expect(testids).toContain('createpost-student')
    expect(testids).toContain('createpost-submit')
    expect(testids).toContain('createpost-list')
    expect(testids).toContain('createpost-item')
  })

  it('renders report details correctly', () => {
    render(<CreatePost />)
    
    const reportItems = document.querySelectorAll('[data-testid="createpost-item"]')
    expect(reportItems.length).toBeGreaterThanOrEqual(5)
    
    // Check first report contains expected data
    const firstReport = reportItems[0]
    expect(firstReport.textContent).toContain('Olivia Martinez')
  })
})
