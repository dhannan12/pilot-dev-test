import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CreateTasks from './CreateTasks';

describe('CreateTasks', () => {
  it('renders without crashing', () => {
    render(<CreateTasks />);
    expect(document.body).toBeTruthy();
  });

  it('displays the table name', () => {
    render(<CreateTasks />);
    expect(screen.getByText('tasks')).toBeInTheDocument();
  });

  it('displays all task schema fields', () => {
    render(<CreateTasks />);
    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('priority')).toBeInTheDocument();
    expect(screen.getByText('assigned_to')).toBeInTheDocument();
    expect(screen.getByText('due_date')).toBeInTheDocument();
    expect(screen.getByText('created_at')).toBeInTheDocument();
    expect(screen.getByText('updated_at')).toBeInTheDocument();
  });

  it('displays field types', () => {
    render(<CreateTasks />);
    expect(screen.getAllByText('INTEGER').length).toBeGreaterThan(0);
    expect(screen.getByText('VARCHAR(255)')).toBeInTheDocument();
    expect(screen.getByText('TEXT')).toBeInTheDocument();
  });

  it('displays primary key indicator', () => {
    render(<CreateTasks />);
    expect(screen.getByText('PK')).toBeInTheDocument();
  });

  it('displays indexes section', () => {
    render(<CreateTasks />);
    expect(screen.getByText('Indexes & Constraints')).toBeInTheDocument();
  });

  it('has SQL preview toggle button', () => {
    render(<CreateTasks />);
    expect(screen.getByText('Show SQL')).toBeInTheDocument();
  });

  it('displays schema statistics', () => {
    render(<CreateTasks />);
    expect(screen.getByText('Total Fields')).toBeInTheDocument();
    expect(screen.getByText('Indexes')).toBeInTheDocument();
  });
});
