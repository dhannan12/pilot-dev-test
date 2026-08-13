import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildTaskDetails from './BuildTaskDetails'

describe('BuildTaskDetails', () => {
  it('renders without crashing', () => {
    render(<BuildTaskDetails />)
    expect(document.body).toBeTruthy()
  })

  it('displays task title and ID', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText('TSK-1001')).toBeTruthy()
    expect(screen.getByText('Implement user authentication system')).toBeTruthy()
  })

  it('displays task status and priority badges', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText('IN PROGRESS')).toBeTruthy()
    expect(screen.getByText('HIGH')).toBeTruthy()
  })

  it('displays assignee information', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('sarah.j@company.com')).toBeTruthy()
  })

  it('displays reporter information', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('michael.c@company.com')).toBeTruthy()
  })

  it('displays task tags', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText('backend')).toBeTruthy()
    expect(screen.getByText('security')).toBeTruthy()
    expect(screen.getByText('authentication')).toBeTruthy()
  })

  it('displays task description', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText(/Create a secure authentication system/i)).toBeTruthy()
  })

  it('displays time tracking information', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText('16h')).toBeTruthy()
    expect(screen.getByText('10h')).toBeTruthy()
    expect(screen.getByText('6h')).toBeTruthy()
  })

  it('renders tabs for details and activity', () => {
    render(<BuildTaskDetails />)
    expect(screen.getByText('Details')).toBeTruthy()
    expect(screen.getByText('Activity')).toBeTruthy()
  })

  it('displays activity timeline when activity tab is clicked', () => {
    render(<BuildTaskDetails />)
    const activityTab = screen.getByText('Activity')
    fireEvent.click(activityTab)
    expect(screen.getByText('Status changed')).toBeTruthy()
    expect(screen.getByText('Comment added')).toBeTruthy()
    expect(screen.getByText('Task created')).toBeTruthy()
  })
})
