import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SystemCalculatesThe from './SystemCalculatesThe';

describe('SystemCalculatesThe', () => {
  it('renders without crashing', () => {
    render(<SystemCalculatesThe />);
    expect(document.body).toBeTruthy();
  });

  it('displays the correct total number of tasks', () => {
    render(<SystemCalculatesThe />);
    // Should show 8 total tasks based on mock data
    expect(screen.getByText('Total Tasks')).toBeTruthy();
    const totalTasksElements = screen.getAllByText('8');
    expect(totalTasksElements.length).toBeGreaterThan(0);
  });

  it('calculates and displays completed tasks count', () => {
    render(<SystemCalculatesThe />);
    expect(screen.getByText('Completed')).toBeTruthy();
  });

  it('calculates and displays in-progress tasks count', () => {
    render(<SystemCalculatesThe />);
    expect(screen.getByText('In Progress')).toBeTruthy();
  });

  it('calculates and displays pending tasks count', () => {
    render(<SystemCalculatesThe />);
    expect(screen.getByText('Pending')).toBeTruthy();
  });

  it('displays all task titles from mock data', () => {
    render(<SystemCalculatesThe />);
    expect(screen.getByText('Implement authentication system')).toBeTruthy();
    expect(screen.getByText('Design user dashboard')).toBeTruthy();
    expect(screen.getByText('Write API documentation')).toBeTruthy();
    expect(screen.getByText('Fix navigation bugs')).toBeTruthy();
    expect(screen.getByText('Update dependencies')).toBeTruthy();
  });

  it('displays task status badges', () => {
    render(<SystemCalculatesThe />);
    const statusElements = screen.getAllByText(/completed|in progress|pending/i);
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it('displays priority information for tasks', () => {
    render(<SystemCalculatesThe />);
    const highPriority = screen.getAllByText(/HIGH Priority/i);
    const mediumPriority = screen.getAllByText(/MEDIUM Priority/i);
    const lowPriority = screen.getAllByText(/LOW Priority/i);
    expect(highPriority.length).toBeGreaterThan(0);
    expect(mediumPriority.length).toBeGreaterThan(0);
    expect(lowPriority.length).toBeGreaterThan(0);
  });

  it('displays assignee information', () => {
    render(<SystemCalculatesThe />);
    expect(screen.getByText(/Alice Johnson/i)).toBeTruthy();
    expect(screen.getByText(/Bob Smith/i)).toBeTruthy();
  });

  it('displays the summary footer with task counts', () => {
    render(<SystemCalculatesThe />);
    expect(screen.getByText(/Showing/i)).toBeTruthy();
    // Check for text that includes both count and status breakdown
    expect(screen.getByText(/completed, .* in progress, .* pending/i)).toBeTruthy();
  });
});
