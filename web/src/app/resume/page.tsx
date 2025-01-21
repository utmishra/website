import IdCard from '@components/ui/homepage/id-card'
import Block from '@components/ui/resume/block'
import Dropdown from '@components/ui/resume/categories'
import Experience from '@components/ui/resume/experience'
import { generateId } from '@components/utils/component'
import { Box, Flex, Grid, Section } from '@radix-ui/themes'
import { experiences } from '@components/data/experiences'
import { skills } from '@components/data/skills'
import Skill from '@components/ui/resume/skill'
import { AboutMe } from '@components/data/about-me'
import { responsiveWidth } from '@components/ui/common/styles'

export default function Resume() {
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
          <Dropdown />
        </Box>
      </Box>
      <Section p="0">
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
        </Flex>
      </Section>
    </Grid>
  )
}
