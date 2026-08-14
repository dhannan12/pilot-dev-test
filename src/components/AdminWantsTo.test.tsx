import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminWantsTo from './AdminWantsTo';

describe('AdminWantsTo', () => {
  it('renders without crashing', () => {
    render(<AdminWantsTo />);
    expect(document.body).toBeTruthy();
  });

  it('displays the admin inbox heading', () => {
    render(<AdminWantsTo />);
    expect(screen.getByText('Admin Inbox')).toBeInTheDocument();
  });

  it('displays total message count', () => {
    render(<AdminWantsTo />);
    const totalElements = screen.getAllByText(/Total/i);
    expect(totalElements.length).toBeGreaterThan(0);
  });

  it('displays unread message count', () => {
    render(<AdminWantsTo />);
    const unreadElements = screen.getAllByText('Unread');
    expect(unreadElements.length).toBeGreaterThan(0);
  });

  it('displays mock message data', () => {
    render(<AdminWantsTo />);
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Michael Brown')).toBeInTheDocument();
    expect(screen.getByText('Emily Davis')).toBeInTheDocument();
    expect(screen.getByText('Robert Wilson')).toBeInTheDocument();
  });

  it('displays inbox statistics section', () => {
    render(<AdminWantsTo />);
    expect(screen.getByText('Inbox Statistics')).toBeInTheDocument();
  });

  it('shows read and unread labels', () => {
    render(<AdminWantsTo />);
    const readElements = screen.getAllByText('Read');
    expect(readElements.length).toBeGreaterThan(0);
  });
});
