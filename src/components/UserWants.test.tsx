import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserWants from './UserWants';

describe('UserWants', () => {
  it('renders without crashing', () => {
    render(<UserWants />);
    expect(document.body).toBeTruthy();
  });

  it('displays the component title', () => {
    render(<UserWants />);
    const title = screen.getByText('Milestone Progress Tracker');
    expect(title).toBeTruthy();
    const subtitle = screen.getByText('Track completion percentage of milestones based on completed tasks');
    expect(subtitle).toBeTruthy();
  });

  it('displays all mock milestones', () => {
    render(<UserWants />);
    expect(screen.getByText('Q1 Product Launch')).toBeTruthy();
    expect(screen.getByText('Backend Infrastructure')).toBeTruthy();
    expect(screen.getByText('User Authentication')).toBeTruthy();
    expect(screen.getByText('Mobile Responsiveness')).toBeTruthy();
    expect(screen.getByText('Performance Optimization')).toBeTruthy();
  });

  it('displays completion percentages', () => {
    render(<UserWants />);
    // Check for percentage symbols to verify percentages are displayed
    const percentages = screen.getAllByText(/%/);
    expect(percentages.length).toBeGreaterThan(0);
  });

  it('displays milestone descriptions', () => {
    render(<UserWants />);
    expect(screen.getByText('Complete all features for Q1 product release')).toBeTruthy();
    expect(screen.getByText('Set up scalable backend infrastructure')).toBeTruthy();
  });

  it('displays task completion counts', () => {
    render(<UserWants />);
    // Check that task counts are displayed (format: "X / Y tasks")
    const taskCounts = screen.getAllByText(/\d+ \/ \d+ tasks/);
    expect(taskCounts.length).toBeGreaterThan(0);
  });

  it('displays summary statistics', () => {
    render(<UserWants />);
    expect(screen.getByText('Overall Progress Summary')).toBeTruthy();
    expect(screen.getByText('Total Milestones')).toBeTruthy();
    expect(screen.getByText('Completed Milestones')).toBeTruthy();
    expect(screen.getByText('Average Completion')).toBeTruthy();
  });

  it('displays individual tasks for milestones', () => {
    render(<UserWants />);
    expect(screen.getByText('Design landing page')).toBeTruthy();
    expect(screen.getByText('Configure database')).toBeTruthy();
    expect(screen.getByText('OAuth integration')).toBeTruthy();
  });

  it('shows at least 5 milestones with data', () => {
    render(<UserWants />);
    const milestoneCards = screen.getAllByText(/Due:/);
    expect(milestoneCards.length).toBeGreaterThanOrEqual(5);
  });
});
