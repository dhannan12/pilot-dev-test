import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OnlyTeachersCan from './OnlyTeachersCan'

describe('OnlyTeachersCan', () => {
  it('renders without crashing', () => {
    render(<OnlyTeachersCan />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock student data', () => {
    render(<OnlyTeachersCan />)
    expect(screen.getByText('Emma Thompson')).toBeTruthy()
    expect(screen.getByText('Liam Johnson')).toBeTruthy()
    expect(screen.getByText('Olivia Martinez')).toBeTruthy()
    expect(screen.getByText('Noah Williams')).toBeTruthy()
    expect(screen.getByText('Sophia Brown')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<OnlyTeachersCan />)
    
    // Main wrapper
    expect(screen.getByTestId('onlyteacherscan')).toBeTruthy()
    
    // Role buttons
    expect(screen.getByTestId('onlyteacherscan-role-teacher')).toBeTruthy()
    expect(screen.getByTestId('onlyteacherscan-role-student')).toBeTruthy()
    expect(screen.getByTestId('onlyteacherscan-role-parent')).toBeTruthy()
    
    // List and items
    expect(screen.getByTestId('onlyteacherscan-list')).toBeTruthy()
    const items = screen.getAllByTestId('onlyteacherscan-item')
    expect(items.length).toBeGreaterThan(5)
  })

  it('shows access denied message for non-teacher roles', () => {
    render(<OnlyTeachersCan />)
    
    // Default role is student
    expect(screen.getByTestId('onlyteacherscan-access-denied')).toBeTruthy()
    expect(screen.getByText(/Only teachers can access individual student progress reports/i)).toBeTruthy()
  })

  it('allows teachers to view student reports', () => {
    render(<OnlyTeachersCan />)
    
    // Switch to teacher role
    const teacherButton = screen.getByTestId('onlyteacherscan-role-teacher')
    fireEvent.click(teacherButton)
    
    // Access denied message should not be visible
    expect(screen.queryByTestId('onlyteacherscan-access-denied')).toBeFalsy()
    
    // View report button should be available
    const viewButtons = screen.getAllByTestId('onlyteacherscan-view-report')
    expect(viewButtons.length).toBeGreaterThan(0)
  })

  it('displays detailed progress report when teacher selects a student', () => {
    render(<OnlyTeachersCan />)
    
    // Switch to teacher role
    const teacherButton = screen.getByTestId('onlyteacherscan-role-teacher')
    fireEvent.click(teacherButton)
    
    // Click on first student
    const firstStudent = screen.getAllByTestId('onlyteacherscan-item')[0]
    fireEvent.click(firstStudent)
    
    // Progress report should be visible
    expect(screen.getByTestId('onlyteacherscan-report')).toBeTruthy()
    expect(screen.getByTestId('onlyteacherscan-back')).toBeTruthy()
    
    // Should show academic performance
    expect(screen.getByText(/Academic Performance/i)).toBeTruthy()
    expect(screen.getByText(/Mathematics/i)).toBeTruthy()
    expect(screen.getByText(/Reading/i)).toBeTruthy()
    expect(screen.getByText(/Science/i)).toBeTruthy()
  })

  it('allows navigation back to student list', () => {
    render(<OnlyTeachersCan />)
    
    // Switch to teacher role and view a student
    const teacherButton = screen.getByTestId('onlyteacherscan-role-teacher')
    fireEvent.click(teacherButton)
    
    const firstStudent = screen.getAllByTestId('onlyteacherscan-item')[0]
    fireEvent.click(firstStudent)
    
    // Click back button
    const backButton = screen.getByTestId('onlyteacherscan-back')
    fireEvent.click(backButton)
    
    // Should be back at student list
    expect(screen.getByTestId('onlyteacherscan-list')).toBeTruthy()
    expect(screen.queryByTestId('onlyteacherscan-report')).toBeFalsy()
  })

  it('prevents non-teachers from accessing student reports', () => {
    render(<OnlyTeachersCan />)
    
    // Default is student role
    const firstStudent = screen.getAllByTestId('onlyteacherscan-item')[0]
    fireEvent.click(firstStudent)
    
    // Should still be at list view, not report view
    expect(screen.queryByTestId('onlyteacherscan-report')).toBeFalsy()
    expect(screen.getByTestId('onlyteacherscan-list')).toBeTruthy()
  })
})
