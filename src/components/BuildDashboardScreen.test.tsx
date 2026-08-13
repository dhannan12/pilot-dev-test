import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildDashboardScreen from './BuildDashboardScreen'

describe('BuildDashboardScreen', () => {
  it('renders without crashing', () => {
    render(<BuildDashboardScreen />)
    expect(document.body).toBeTruthy()
  })

  it('displays dashboard title', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getByText('Dashboard')).toBeTruthy()
    expect(screen.getByText(/Welcome back/)).toBeTruthy()
  })

  it('displays metric cards', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getByText('Total Tasks')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
    expect(screen.getByText('In Progress')).toBeTruthy()
    expect(screen.getByText('To Do')).toBeTruthy()
  })

  it('displays priority breakdown section', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getByText('Priority Breakdown')).toBeTruthy()
    expect(screen.getByText('High Priority')).toBeTruthy()
    expect(screen.getByText('Medium Priority')).toBeTruthy()
    expect(screen.getByText('Low Priority')).toBeTruthy()
  })

  it('displays upcoming deadlines section', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getByText('Upcoming Deadlines')).toBeTruthy()
  })

  it('displays recent activity section', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getByText('Recent Activity')).toBeTruthy()
  })

  it('displays all tasks table', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getByText('All Tasks')).toBeTruthy()
    expect(screen.getByText('Assignee')).toBeTruthy()
    expect(screen.getByText('Priority')).toBeTruthy()
    expect(screen.getByText('Status')).toBeTruthy()
  })

  it('displays mock task data', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getAllByText('Implement user authentication').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Design new landing page').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Fix payment gateway bug').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Update documentation').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Optimize database queries').length).toBeGreaterThan(0)
  })

  it('displays mock activity data', () => {
    render(<BuildDashboardScreen />)
    expect(screen.getAllByText('Sarah Chen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mike Johnson').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Emily Rodriguez').length).toBeGreaterThan(0)
    expect(screen.getAllByText('David Lee').length).toBeGreaterThan(0)
  })
})
