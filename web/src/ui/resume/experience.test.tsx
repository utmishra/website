import { render, screen } from '@testing-library/react'
import Experience from './experience'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockedImage(props: any) {
    return <img {...props} />
  }
})

const mockExperienceData = {
  title: 'Senior Full Stack Developer',
  company: {
    logo: 'test-logo.png',
    name: 'Test Company',
    url: 'https://test-company.com',
  },
  start: {
    month: 'January',
    year: '2020',
  },
  end: {
    month: 'December',
    year: '2023',
  },
  location: 'Test Location',
  description: [
    'First achievement',
    'Second achievement',
    'Third achievement',
  ],
}

describe('Experience Component', () => {
  it('renders experience data correctly', () => {
    render(<Experience {...mockExperienceData} />)

    // Check if title is rendered
    expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument()
    
    // Check if company name is rendered
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    
    // Check if location is rendered
    expect(screen.getByText('Test Location')).toBeInTheDocument()
    
    // Check if date range is rendered
    expect(screen.getByText('January 2020 - December 2023')).toBeInTheDocument()
    
    // Check if descriptions are rendered
    expect(screen.getByText('First achievement')).toBeInTheDocument()
    expect(screen.getByText('Second achievement')).toBeInTheDocument()
    expect(screen.getByText('Third achievement')).toBeInTheDocument()
  })

  it('renders company logo with correct alt text', () => {
    render(<Experience {...mockExperienceData} />)
    
    const logo = screen.getByAltText('Test Company')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/test-logo.png')
  })

  it('renders company link with correct URL', () => {
    render(<Experience {...mockExperienceData} />)
    
    const companyLink = screen.getByRole('link', { name: 'Test Company' })
    expect(companyLink).toBeInTheDocument()
    expect(companyLink).toHaveAttribute('href', 'https://test-company.com')
  })
})