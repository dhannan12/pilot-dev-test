import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectRack from './ProjectRack'

describe('ProjectRack', () => {
  it('renders without crashing', () => {
    render(<ProjectRack />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<ProjectRack />)
    expect(screen.getByText('Project Rack')).toBeTruthy()
  })

  it('displays mock projects', () => {
    render(<ProjectRack />)
    const redesignElements = screen.getAllByText('Website Redesign')
    expect(redesignElements.length).toBeGreaterThan(0)
    expect(screen.getByText('Mobile App Launch')).toBeTruthy()
  })

  it('displays team assignments for selected project', () => {
    render(<ProjectRack />)
    expect(screen.getByText('Team Assignments')).toBeTruthy()
    expect(screen.getByText('Frontend Development')).toBeTruthy()
  })

  it('displays project milestones', () => {
    render(<ProjectRack />)
    expect(screen.getByText('Project Milestones')).toBeTruthy()
    expect(screen.getByText('Design Completion')).toBeTruthy()
  })

  it('shows Project Manager role by default', () => {
    render(<ProjectRack />)
    expect(screen.getByText('Project Manager')).toBeTruthy()
  })

  it('toggles between Project Manager and Team Member roles', () => {
    render(<ProjectRack />)
    const roleButton = screen.getByText('Project Manager')
    
    fireEvent.click(roleButton)
    expect(screen.getByText('Team Member')).toBeTruthy()
    
    fireEvent.click(screen.getByText('Team Member'))
    expect(screen.getByText('Project Manager')).toBeTruthy()
  })

  it('shows add milestone button for Project Manager', () => {
    render(<ProjectRack />)
    expect(screen.getByText('+ Add')).toBeTruthy()
  })

  it('shows permission notice for Team Members', () => {
    render(<ProjectRack />)
    const roleButton = screen.getByText('Project Manager')
    
    fireEvent.click(roleButton)
    expect(screen.getByText(/Only Project Managers can create or edit milestones/i)).toBeTruthy()
  })

  it('allows project selection', () => {
    render(<ProjectRack />)
    const mobileAppButton = screen.getByText('Mobile App Launch')
    
    fireEvent.click(mobileAppButton)
    expect(screen.getByText('Launch iOS and Android applications')).toBeTruthy()
  })

  it('displays project details', () => {
    render(<ProjectRack />)
    expect(screen.getByText('Complete overhaul of company website')).toBeTruthy()
  })

  it('shows milestone status badges', () => {
    render(<ProjectRack />)
    // Status is shown in a select dropdown with different values
    const select = document.querySelector('select')
    expect(select).toBeTruthy()
  })

  it('displays team member avatars', () => {
    render(<ProjectRack />)
    expect(screen.getByText('Alice Johnson')).toBeTruthy()
    expect(screen.getByText('Senior Developer')).toBeTruthy()
  })
})
