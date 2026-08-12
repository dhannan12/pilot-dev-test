import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildHomeScreen from './BuildHomeScreen'

describe('BuildHomeScreen', () => {
  it('renders without crashing', () => {
    render(<BuildHomeScreen />)
    expect(document.body).toBeTruthy()
  })

  it('displays the CraftBev header', () => {
    render(<BuildHomeScreen />)
    const craftBevElements = screen.getAllByText('CraftBev')
    expect(craftBevElements.length).toBeGreaterThan(0)
  })

  it('displays the hero section with title', () => {
    render(<BuildHomeScreen />)
    expect(screen.getByText('Discover Your Perfect Craft Beverage')).toBeTruthy()
  })

  it('displays all category buttons', () => {
    render(<BuildHomeScreen />)
    const ipaElements = screen.getAllByText('IPA')
    const stoutElements = screen.getAllByText('Stout')
    const wheatElements = screen.getAllByText('Wheat')
    const sourElements = screen.getAllByText('Sour')
    const lagerElements = screen.getAllByText('Lager')
    expect(ipaElements.length).toBeGreaterThan(0)
    expect(stoutElements.length).toBeGreaterThan(0)
    expect(wheatElements.length).toBeGreaterThan(0)
    expect(sourElements.length).toBeGreaterThan(0)
    expect(lagerElements.length).toBeGreaterThan(0)
  })

  it('displays featured beverages', () => {
    render(<BuildHomeScreen />)
    expect(screen.getByText('Mountain Sunrise IPA')).toBeTruthy()
    expect(screen.getByText('Dark Forest Stout')).toBeTruthy()
    expect(screen.getByText('Golden Wheat Ale')).toBeTruthy()
    expect(screen.getByText('Crimson Berry Sour')).toBeTruthy()
    expect(screen.getByText('Sunset Amber Lager')).toBeTruthy()
  })

  it('displays beverage prices', () => {
    render(<BuildHomeScreen />)
    expect(screen.getByText('$8.99')).toBeTruthy()
    expect(screen.getByText('$9.49')).toBeTruthy()
  })

  it('displays beverage ratings', () => {
    render(<BuildHomeScreen />)
    const ratings = screen.getAllByText(/4\.\d/)
    expect(ratings.length).toBeGreaterThan(0)
  })

  it('filters beverages when category is clicked', () => {
    render(<BuildHomeScreen />)
    
    // Click on IPA category - get the first one (category button)
    const ipaElements = screen.getAllByText('IPA')
    fireEvent.click(ipaElements[0])
    
    // Should now show "IPA Beverages" heading
    expect(screen.getByText('IPA Beverages')).toBeTruthy()
  })

  it('shows clear filter button when category is selected', () => {
    render(<BuildHomeScreen />)
    
    // Click on Stout category - get the first one (category button)
    const stoutElements = screen.getAllByText('Stout')
    fireEvent.click(stoutElements[0])
    
    // Clear filter button should appear
    expect(screen.getByText('Clear filter')).toBeTruthy()
  })

  it('clears filter when clear button is clicked', () => {
    render(<BuildHomeScreen />)
    
    // Select a category - get the first one (category button)
    const lagerElements = screen.getAllByText('Lager')
    fireEvent.click(lagerElements[0])
    
    // Click clear filter
    const clearButton = screen.getByText('Clear filter')
    fireEvent.click(clearButton)
    
    // Should show "Featured Selection" again
    expect(screen.getByText('Featured Selection')).toBeTruthy()
  })

  it('displays Add to Cart buttons', () => {
    render(<BuildHomeScreen />)
    const addToCartButtons = screen.getAllByText('Add to Cart')
    expect(addToCartButtons.length).toBeGreaterThan(0)
  })

  it('displays category counts', () => {
    render(<BuildHomeScreen />)
    expect(screen.getByText('24 items')).toBeTruthy()
    expect(screen.getByText('18 items')).toBeTruthy()
  })

  it('displays footer content', () => {
    render(<BuildHomeScreen />)
    expect(screen.getByText(/Your source for premium craft beverages/)).toBeTruthy()
    expect(screen.getByText('© 2026 CraftBev. All rights reserved.')).toBeTruthy()
  })
})
