import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<UserAttemptsTo />)
    expect(screen.getAllByText('Manchester United').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Liverpool').length).toBeGreaterThan(0)
    expect(screen.getByText('Barcelona')).toBeInTheDocument()
    expect(screen.getByText('Real Madrid')).toBeInTheDocument()
    expect(screen.getByText('Bayern Munich')).toBeInTheDocument()
  })

  it('displays guest mode warning', () => {
    render(<UserAttemptsTo />)
    expect(
      screen.getByText(/You are browsing as a guest/i)
    ).toBeInTheDocument()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Main wrapper
    expect(screen.getByTestId('userattemptsto')).toBeInTheDocument()
    
    // List container
    expect(screen.getByTestId('userattemptsto-list')).toBeInTheDocument()
    
    // List items
    const items = screen.getAllByTestId('userattemptsto-item')
    expect(items).toHaveLength(5)
    
    // Access button
    expect(screen.getByTestId('userattemptsto-access')).toBeInTheDocument()
  })

  it('shows login prompt when attempting to access match details', () => {
    render(<UserAttemptsTo />)
    
    const accessButton = screen.getByTestId('userattemptsto-access')
    fireEvent.click(accessButton)
    
    expect(screen.getByTestId('userattemptsto-modal')).toBeInTheDocument()
    expect(screen.getByText(/Authentication Required/i)).toBeInTheDocument()
  })

  it('displays login and signup buttons in modal', () => {
    render(<UserAttemptsTo />)
    
    const accessButton = screen.getByTestId('userattemptsto-access')
    fireEvent.click(accessButton)
    
    expect(screen.getByTestId('userattemptsto-login')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-signup')).toBeInTheDocument()
    expect(screen.getByTestId('userattemptsto-cancel')).toBeInTheDocument()
  })

  it('handles cancel action and closes modal', () => {
    render(<UserAttemptsTo />)
    
    const accessButton = screen.getByTestId('userattemptsto-access')
    fireEvent.click(accessButton)
    
    expect(screen.getByTestId('userattemptsto-modal')).toBeInTheDocument()
    
    const cancelButton = screen.getByTestId('userattemptsto-cancel')
    fireEvent.click(cancelButton)
    
    expect(screen.queryByTestId('userattemptsto-modal')).not.toBeInTheDocument()
  })

  it('handles login button click', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<UserAttemptsTo />)
    
    const accessButton = screen.getByTestId('userattemptsto-access')
    fireEvent.click(accessButton)
    
    const loginButton = screen.getByTestId('userattemptsto-login')
    fireEvent.click(loginButton)
    
    expect(alertSpy).toHaveBeenCalledWith('Redirecting to login page...')
    alertSpy.mockRestore()
  })

  it('handles signup button click', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<UserAttemptsTo />)
    
    const accessButton = screen.getByTestId('userattemptsto-access')
    fireEvent.click(accessButton)
    
    const signupButton = screen.getByTestId('userattemptsto-signup')
    fireEvent.click(signupButton)
    
    expect(alertSpy).toHaveBeenCalledWith('Redirecting to signup page...')
    alertSpy.mockRestore()
  })

  it('allows selecting different matches', () => {
    render(<UserAttemptsTo />)
    
    const items = screen.getAllByTestId('userattemptsto-item')
    fireEvent.click(items[1]) // Click second match
    
    // The component should still render properly after selection
    expect(screen.getByTestId('userattemptsto')).toBeInTheDocument()
  })

  it('displays locked content indicators', () => {
    render(<UserAttemptsTo />)
    
    const lockIcons = screen.getAllByText('🔒')
    expect(lockIcons.length).toBeGreaterThan(0)
    
    const loginMessages = screen.getAllByText(/Login to view details/i)
    expect(loginMessages.length).toBeGreaterThan(0)
  })
})
