import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserAttempts from './UserAttempts';

describe('UserAttempts', () => {
  it('renders without crashing', () => {
    render(<UserAttempts />);
    expect(document.body).toBeTruthy();
  });

  it('displays the main heading', () => {
    render(<UserAttempts />);
    expect(screen.getByText('Unauthorized Access Attempts')).toBeInTheDocument();
  });

  it('displays security log description', () => {
    render(<UserAttempts />);
    expect(screen.getByText(/Security log of non-admin users/i)).toBeInTheDocument();
  });

  it('displays mock data for users', () => {
    render(<UserAttempts />);
    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('jane_smith')).toBeInTheDocument();
    expect(screen.getByText('mike_wilson')).toBeInTheDocument();
    expect(screen.getByText('sarah_jones')).toBeInTheDocument();
    expect(screen.getByText('robert_brown')).toBeInTheDocument();
  });

  it('displays user emails', () => {
    render(<UserAttempts />);
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
  });

  it('displays attempted resource paths', () => {
    render(<UserAttempts />);
    const adminInboxElements = screen.getAllByText('/admin/inbox');
    expect(adminInboxElements.length).toBeGreaterThan(0);
  });

  it('displays user roles with badges', () => {
    render(<UserAttempts />);
    const userBadges = screen.getAllByText('user');
    const guestBadges = screen.getAllByText('guest');
    expect(userBadges.length).toBeGreaterThan(0);
    expect(guestBadges.length).toBeGreaterThan(0);
  });

  it('displays insufficient permissions reason', () => {
    render(<UserAttempts />);
    const reasonElements = screen.getAllByText('Insufficient permissions');
    expect(reasonElements.length).toBeGreaterThan(0);
  });

  it('displays total attempts count', () => {
    render(<UserAttempts />);
    expect(screen.getByText('Total Attempts')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('displays security notice', () => {
    render(<UserAttempts />);
    expect(screen.getByText('Security Notice')).toBeInTheDocument();
    expect(screen.getByText(/All unauthorized access attempts are logged/i)).toBeInTheDocument();
  });

  it('displays table headers', () => {
    render(<UserAttempts />);
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Attempted Resource')).toBeInTheDocument();
    expect(screen.getByText('Timestamp')).toBeInTheDocument();
    expect(screen.getByText('IP Address')).toBeInTheDocument();
    expect(screen.getByText('Reason')).toBeInTheDocument();
  });
});
