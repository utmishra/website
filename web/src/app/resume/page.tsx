import IdCard from '@components/ui/homepage/id-card'
import Block from '@components/ui/resume/block'
import Dropdown from '@components/ui/resume/categories'
import Experience from '@components/ui/resume/experience'
import { generateId } from '@components/utils/component'
import { Badge, Box, Flex, Grid } from '@radix-ui/themes'
import { experiences } from '@components/data/experiences'
import { skills } from '@components/data/skills'
import Skill from '@components/ui/resume/skill'
import { AboutMe } from '@components/data/about-me'

export default function Resume() {
  return (
    <Flex
      align="center"
      direction="column"
      justify="center"
      gap="2"
      p="2"
      width="100%"
    >
      <IdCard />
      <Grid columns="20% 80%" gap="2" display="grid" width="100%">
        <Box p="20px">
          <Dropdown />
        </Box>
        <Box>
          <Box ml="4" mb="2">
            <Badge size="3">Skills</Badge>
          </Box>
          <Box>
            <Block title="About Me">
              <AboutMe />
            </Block>
            <Block title="Skills">
              <Grid columns="2" gap="2">
                {skills.map((skill) => (
                  <Skill
                    key={generateId(skill.name)}
                    name={skill.name}
                    value={skill.rating * 20}
                  />
                ))}
              </Grid>
            </Block>
          </Box>
          <Box ml="4" mb="2">
            <Badge size="3">Experience</Badge>
          </Box>
          <Box>
            {experiences.map((experience) => (
              <Block key={generateId(experience.title)} title="Experience">
                <Experience {...experience} />
              </Block>
            ))}
          </Box>
        </Box>
      </Grid>
    </Flex>
  )
}
