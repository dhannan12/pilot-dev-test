import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MarketingAnalyze from './MarketingAnalyze'

describe('MarketingAnalyze', () => {
  it('renders without crashing', () => {
    render(<MarketingAnalyze />)
    expect(document.body).toBeTruthy()
  })

  it('displays the marketing analysis dashboard header', () => {
    render(<MarketingAnalyze />)
    expect(screen.getByText('Marketing Analysis Dashboard')).toBeTruthy()
    expect(screen.getByText('Analyze customer feedback and create promotional campaigns')).toBeTruthy()
  })

  it('displays customer feedback data', () => {
    render(<MarketingAnalyze />)
    expect(screen.getByText('Customer Feedback')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Hoppy IPA')).toBeTruthy()
    expect(screen.getByText('Mike Chen')).toBeTruthy()
  })

  it('displays sentiment statistics', () => {
    render(<MarketingAnalyze />)
    expect(screen.getAllByText('Positive').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Neutral').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Negative').length).toBeGreaterThan(0)
  })

  it('displays promotional campaigns', () => {
    render(<MarketingAnalyze />)
    expect(screen.getByText('Promotional Campaigns')).toBeTruthy()
    expect(screen.getByText('Summer Beer Festival Promotion')).toBeTruthy()
    expect(screen.getByText('Premium Craft Collection Launch')).toBeTruthy()
  })

  it('shows create campaign button', () => {
    render(<MarketingAnalyze />)
    expect(screen.getByText('Create Campaign')).toBeTruthy()
  })

  it('displays user role as marketing specialist', () => {
    render(<MarketingAnalyze />)
    expect(screen.getByText(/MARKETING SPECIALIST/i)).toBeTruthy()
  })

  it('filters feedback by category', () => {
    render(<MarketingAnalyze />)
    const categorySelect = screen.getByLabelText('Category')
    
    // Initially should show all feedback
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    
    // Filter by product
    fireEvent.change(categorySelect, { target: { value: 'product' } })
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
  })

  it('filters feedback by sentiment', () => {
    render(<MarketingAnalyze />)
    const sentimentSelect = screen.getByLabelText('Sentiment')
    
    // Filter by positive sentiment
    fireEvent.change(sentimentSelect, { target: { value: 'positive' } })
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
  })

  it('displays average rating', () => {
    render(<MarketingAnalyze />)
    expect(screen.getByText('Average Rating')).toBeTruthy()
    expect(screen.getByText('out of 5.0')).toBeTruthy()
  })

  it('shows campaign form when create campaign is clicked', () => {
    render(<MarketingAnalyze />)
    const createButton = screen.getByText('Create Campaign')
    
    fireEvent.click(createButton)
    
    expect(screen.getByText('New Campaign')).toBeTruthy()
    expect(screen.getByPlaceholderText('Campaign Title')).toBeTruthy()
  })

  it('displays campaign statuses', () => {
    render(<MarketingAnalyze />)
    expect(screen.getByText('draft')).toBeTruthy()
    expect(screen.getByText('active')).toBeTruthy()
    expect(screen.getByText('completed')).toBeTruthy()
  })
})
