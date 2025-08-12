'use client'

import IdCard from '@components/ui/homepage/id-card'
import Block from '@components/ui/resume/block'
import Dropdown from '@components/ui/resume/categories'
import Experience from '@components/ui/resume/experience'
import { generateId } from '@components/lib/component'
import { Box, Flex, Grid, Section } from '@radix-ui/themes'
import { experiences } from '@components/data/experiences'
import { skills } from '@components/data/skills'
import Skill from '@components/ui/resume/skill'
import AboutMe from '@components/data/about-me'
import { responsiveWidth } from '@components/ui/common/styles'
import { UIEventHandler, useEffect, useState } from 'react'
import { BlockId } from '@components/ui/resume/types'
import Qualifications from '@components/ui/homepage/qualifications'

export default function Resume() {
  const [activeSection, setActiveSection] = useState(BlockId.ABOUT_ME)
  const sectionHeights: number[] = []
  let sections: Element[]

  useEffect(() => {
    const section = document.querySelector('#sections')
    if (section) {
      // Each section's height: 300, 300, 1300, 300
      let previousHeight = 0
      sections = [...section.children]

      for (const element of sections) {
        const currentHeight = element.clientHeight
        sectionHeights.push(previousHeight + currentHeight)
        previousHeight += currentHeight
      }
    }
  }, [sectionHeights])

  const updateActiveSection: UIEventHandler<HTMLDivElement> = (event) => {
    console.log('Scrolling')
    const scrolledHeight = event.currentTarget.scrollTop
    for (let i = 0; i < sectionHeights.length - 1; i++) {
      const currentHeight = sectionHeights[i]
      if (scrolledHeight >= currentHeight * 0.7) {
        setActiveSection(sections[i + 1].id as BlockId)
      }
    }
  }

  return (
    <Grid
      columns={{
        xl: '200px 1fr',
        md: '200px 1fr',
        sm: '1fr',
        xs: '1fr',
        initial: '1fr',
      }}
      gap="2"
      display="grid"
      width="100%"
    >
      <Box>
        <Box
          p="20px"
          display={{
            xl: 'block',
            md: 'block',
            initial: 'none',
            sm: 'none',
            xs: 'none',
          }}
        >
          <Dropdown activeClass={activeSection} />
        </Box>
      </Box>
      <Section
        p="0"
        height="calc(100vh - 64px)"
        style={{
          overflowY: 'scroll',
        }}
        onScroll={updateActiveSection}
      >
        <Flex
          align={{
            xl: 'start',
            md: 'start',
            initial: 'center',
            sm: 'center',
            xs: 'center',
          }}
          direction="column"
          justify="center"
          gap="2"
          p="2"
          width={{
            initial: '100vw',
            sm: '100vw',
            xs: '100vw',
            md: 'calc(100vw - 200px)',
            xl: 'calc(100vw - 200px)',
            lg: 'calc(100vw - 200px)',
          }}
        >
          <IdCard />
        </Flex>
        <Flex
          id="sections"
          align={{
            xl: 'start',
            md: 'start',
            initial: 'start',
            sm: 'center',
            xs: 'center',
          }}
          direction="column"
          justify="start"
          gap="2"
          p="2"
          width={responsiveWidth}
        >
          <Block id="about-me" title="About Me">
            <AboutMe />
          </Block>
          <Block id="skills" title="Skills">
            <Grid
              columns={{
                xl: '2',
                md: '2',
                sm: '1',
                xs: '1',
                initial: '1',
              }}
              gap="2"
            >
              {skills.map((skill) => (
                <Skill
                  key={generateId(skill.name)}
                  name={skill.name}
                  value={skill.rating * 20}
                />
              ))}
            </Grid>
          </Block>

          <Block id="experience" title="Experience">
            {experiences.map((experience) => (
              <Experience key={generateId(experience.title)} {...experience} />
            ))}
          </Block>
          <Block id="qualifications" title="Qualifications">
            <Qualifications />
          </Block>
        </Flex>
      </Section>
    </Grid>
  )
}
