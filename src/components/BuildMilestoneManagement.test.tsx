import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildMilestoneManagement from './BuildMilestoneManagement'

describe('BuildMilestoneManagement', () => {
  it('renders without crashing', () => {
    render(<BuildMilestoneManagement />)
    expect(document.body).toBeTruthy()
  })

  it('displays the page title', () => {
    render(<BuildMilestoneManagement />)
    expect(screen.getByText('Milestone Management')).toBeTruthy()
    expect(screen.getByText('Track project milestones and their progress')).toBeTruthy()
  })

  it('displays milestone statistics', () => {
    render(<BuildMilestoneManagement />)
    expect(screen.getByText('Total Milestones')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('Overdue')).toBeTruthy()
    expect(screen.getByText('Avg Progress')).toBeTruthy()
  })

  it('displays mock milestones', () => {
    render(<BuildMilestoneManagement />)
    expect(screen.getByText('MVP Launch')).toBeTruthy()
    expect(screen.getByText('Beta Testing Phase')).toBeTruthy()
    expect(screen.getByText('Performance Optimization')).toBeTruthy()
    expect(screen.getByText('API v2 Development')).toBeTruthy()
    expect(screen.getByText('Mobile App Release')).toBeTruthy()
    expect(screen.getByText('Security Audit')).toBeTruthy()
  })

  it('displays milestone owners', () => {
    render(<BuildMilestoneManagement />)
    expect(screen.getByText('Sarah Chen')).toBeTruthy()
    expect(screen.getByText('Mike Johnson')).toBeTruthy()
    expect(screen.getByText('Alex Rivera')).toBeTruthy()
  })

  it('displays milestone progress percentages', () => {
    render(<BuildMilestoneManagement />)
    expect(screen.getByText('65%')).toBeTruthy()
    expect(screen.getByText('0%')).toBeTruthy()
    expect(screen.getByText('100%')).toBeTruthy()
  })

  it('displays status badges', () => {
    render(<BuildMilestoneManagement />)
    const inProgressBadges = screen.getAllByText('IN-PROGRESS')
    expect(inProgressBadges.length).toBeGreaterThan(0)
    expect(screen.getByText('PLANNED')).toBeTruthy()
    expect(screen.getByText('COMPLETED')).toBeTruthy()
    expect(screen.getByText('OVERDUE')).toBeTruthy()
  })

  it('renders filter buttons', () => {
    render(<BuildMilestoneManagement />)
    expect(screen.getByText(/All \(/)).toBeTruthy()
    expect(screen.getByText(/In Progress \(/)).toBeTruthy()
    expect(screen.getByText('Planned')).toBeTruthy()
    expect(screen.getByText(/Completed \(/)).toBeTruthy()
    expect(screen.getByText(/Overdue \(/)).toBeTruthy()
  })

  it('filters milestones by status', () => {
    render(<BuildMilestoneManagement />)
    
    // Click on "Completed" filter
    const completedButton = screen.getByRole('button', { name: /Completed \(/ })
    fireEvent.click(completedButton)
    
    // Should only show completed milestone
    expect(screen.getByText('Performance Optimization')).toBeTruthy()
    expect(screen.queryByText('MVP Launch')).toBeFalsy()
  })

  it('expands milestone to show tasks', () => {
    render(<BuildMilestoneManagement />)
    
    // Initially tasks should not be visible
    expect(screen.queryByText('User authentication')).toBeFalsy()
    
    // Click on milestone to expand
    const milestoneHeader = screen.getByText('MVP Launch')
    fireEvent.click(milestoneHeader)
    
    // Now tasks should be visible
    expect(screen.getByText('User authentication')).toBeTruthy()
    expect(screen.getByText('Core features')).toBeTruthy()
    expect(screen.getByText('UI polish')).toBeTruthy()
    expect(screen.getByText('Testing')).toBeTruthy()
  })

  it('collapses milestone when clicked again', () => {
    render(<BuildMilestoneManagement />)
    
    // Expand milestone
    const milestoneHeader = screen.getByText('MVP Launch')
    fireEvent.click(milestoneHeader)
    expect(screen.getByText('User authentication')).toBeTruthy()
    
    // Collapse milestone
    fireEvent.click(milestoneHeader)
    expect(screen.queryByText('User authentication')).toBeFalsy()
  })

  it('displays task completion checkmarks', () => {
    render(<BuildMilestoneManagement />)
    
    // Expand a milestone
    const milestoneHeader = screen.getByText('Performance Optimization')
    fireEvent.click(milestoneHeader)
    
    // Check that tasks are displayed
    expect(screen.getByText('Database indexing')).toBeTruthy()
    expect(screen.getByText('Code splitting')).toBeTruthy()
  })

  it('shows correct task counts', () => {
    render(<BuildMilestoneManagement />)
    
    // Check for task count indicators
    expect(screen.getByText('2 / 4 tasks')).toBeTruthy() // MVP Launch
    expect(screen.getByText('0 / 3 tasks')).toBeTruthy() // Beta Testing Phase
    expect(screen.getByText('4 / 4 tasks')).toBeTruthy() // Performance Optimization
  })

  it('displays milestone dates', () => {
    render(<BuildMilestoneManagement />)
    
    // Dates should be formatted and visible
    expect(screen.getByText('7/1/2026')).toBeTruthy()
    expect(screen.getByText('9/15/2026')).toBeTruthy()
  })
})
