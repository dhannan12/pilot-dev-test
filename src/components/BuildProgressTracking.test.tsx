import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildProgressTracking from './BuildProgressTracking'

describe('BuildProgressTracking', () => {
  it('renders without crashing', () => {
    render(<BuildProgressTracking />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<BuildProgressTracking />)
    expect(screen.getByText('Progress Tracking')).toBeTruthy()
  })

  it('displays overall progress summary', () => {
    render(<BuildProgressTracking />)
    expect(screen.getByText('Overall Progress')).toBeTruthy()
    expect(screen.getByText('Treatment Progress')).toBeTruthy()
    expect(screen.getByText('Exercise Adherence')).toBeTruthy()
    expect(screen.getByText('Goals Achieved')).toBeTruthy()
  })

  it('displays tab navigation', () => {
    render(<BuildProgressTracking />)
    expect(screen.getByText('Progress Metrics')).toBeTruthy()
    expect(screen.getByText('Milestones')).toBeTruthy()
    expect(screen.getByText('Exercise Progress')).toBeTruthy()
  })

  it('displays progress metrics by default', () => {
    render(<BuildProgressTracking />)
    expect(screen.getByText('Performance Metrics')).toBeTruthy()
    expect(screen.getByText('Range of Motion')).toBeTruthy()
    expect(screen.getByText('Strength Level')).toBeTruthy()
  })

  it('switches to milestones tab when clicked', () => {
    render(<BuildProgressTracking />)
    const milestonesTab = screen.getByText('Milestones')
    fireEvent.click(milestonesTab)
    expect(screen.getByText('Treatment Milestones')).toBeTruthy()
    expect(screen.getByText('Initial Assessment')).toBeTruthy()
  })

  it('switches to exercises tab when clicked', () => {
    render(<BuildProgressTracking />)
    const exercisesTab = screen.getByText('Exercise Progress')
    fireEvent.click(exercisesTab)
    expect(screen.getByText('Exercise Completion')).toBeTruthy()
    expect(screen.getByText('Shoulder Rotations')).toBeTruthy()
  })

  it('displays mock progress metrics data', () => {
    render(<BuildProgressTracking />)
    expect(screen.getByText('Range of Motion')).toBeTruthy()
    expect(screen.getByText('Strength Level')).toBeTruthy()
    expect(screen.getByText('Pain Level')).toBeTruthy()
    expect(screen.getByText('Mobility Score')).toBeTruthy()
    expect(screen.getByText('Balance Score')).toBeTruthy()
  })

  it('displays mock milestones data', () => {
    render(<BuildProgressTracking />)
    const milestonesTab = screen.getByText('Milestones')
    fireEvent.click(milestonesTab)
    expect(screen.getByText('Initial Assessment')).toBeTruthy()
    expect(screen.getByText('Pain Reduction Phase')).toBeTruthy()
    expect(screen.getByText('Mobility Restoration')).toBeTruthy()
    expect(screen.getByText('Strength Building')).toBeTruthy()
    expect(screen.getByText('Full Recovery')).toBeTruthy()
  })

  it('displays mock exercise progress data', () => {
    render(<BuildProgressTracking />)
    const exercisesTab = screen.getByText('Exercise Progress')
    fireEvent.click(exercisesTab)
    expect(screen.getByText('Shoulder Rotations')).toBeTruthy()
    expect(screen.getByText('Wall Push-ups')).toBeTruthy()
    expect(screen.getByText('Resistance Band Pulls')).toBeTruthy()
    expect(screen.getByText('Balance Exercises')).toBeTruthy()
    expect(screen.getByText('Core Strengthening')).toBeTruthy()
  })
})
