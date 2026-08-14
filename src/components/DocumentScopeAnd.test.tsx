import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DocumentScopeAnd from './DocumentScopeAnd';

describe('DocumentScopeAnd', () => {
  it('renders without crashing', () => {
    render(<DocumentScopeAnd />);
    expect(document.body).toBeTruthy();
  });

  it('displays the main heading', () => {
    render(<DocumentScopeAnd />);
    expect(screen.getByText('Project Scope & Constraints')).toBeTruthy();
  });

  it('displays scope section heading', () => {
    render(<DocumentScopeAnd />);
    expect(screen.getByText('Project Scope')).toBeTruthy();
  });

  it('displays constraints section heading', () => {
    render(<DocumentScopeAnd />);
    expect(screen.getByText('Project Constraints')).toBeTruthy();
  });

  it('displays mock scope items', () => {
    render(<DocumentScopeAnd />);
    expect(screen.getByText('User Authentication System')).toBeTruthy();
    expect(screen.getByText('Real-time Dashboard')).toBeTruthy();
    expect(screen.getByText('Mobile Native Apps')).toBeTruthy();
    expect(screen.getByText('Advanced Analytics')).toBeTruthy();
    expect(screen.getByText('API Integration Layer')).toBeTruthy();
  });

  it('displays mock constraint items', () => {
    render(<DocumentScopeAnd />);
    expect(screen.getByText('Project Delivery Deadline')).toBeTruthy();
    expect(screen.getByText('Development Budget Cap')).toBeTruthy();
    expect(screen.getByText('Legacy System Integration')).toBeTruthy();
    expect(screen.getByText('GDPR Compliance Required')).toBeTruthy();
    expect(screen.getByText('Team Size Limitation')).toBeTruthy();
  });

  it('displays summary statistics', () => {
    render(<DocumentScopeAnd />);
    expect(screen.getByText('Total Scope Items')).toBeTruthy();
    expect(screen.getByText('In Scope')).toBeTruthy();
    expect(screen.getByText('Out of Scope')).toBeTruthy();
    expect(screen.getByText('Active Constraints')).toBeTruthy();
  });

  it('displays status badges', () => {
    render(<DocumentScopeAnd />);
    const inScopeElements = screen.getAllByText(/IN.SCOPE/i);
    const outOfScopeElements = screen.getAllByText(/OUT.OF.SCOPE/i);
    expect(inScopeElements.length).toBeGreaterThan(0);
    expect(outOfScopeElements.length).toBeGreaterThan(0);
  });

  it('displays footer note', () => {
    render(<DocumentScopeAnd />);
    expect(screen.getByText(/This scope document is subject to change/i)).toBeTruthy();
  });
});
