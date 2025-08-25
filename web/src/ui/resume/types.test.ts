import { BlockId } from './types'

describe('BlockId Enum', () => {
  it('should have correct values for all block IDs', () => {
    expect(BlockId.ABOUT_ME).toBe('about-me')
    expect(BlockId.SKILLS).toBe('skills')
    expect(BlockId.EXPERIENCE).toBe('experience')
    expect(BlockId.QUALIFICATIONS).toBe('qualifications')
  })

  it('should have all required block IDs', () => {
    const expectedValues = ['about-me', 'skills', 'experience', 'qualifications']
    const actualValues = Object.values(BlockId)
    
    expect(actualValues).toHaveLength(expectedValues.length)
    expectedValues.forEach(value => {
      expect(actualValues).toContain(value)
    })
  })
})