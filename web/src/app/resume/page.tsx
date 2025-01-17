import IdCard from '@components/ui/homepage/id-card'
import Block from '@components/ui/resume/block'
import Dropdown from '@components/ui/resume/categories'
import Experience, {
  type ExperienceProps,
} from '@components/ui/resume/experience'
import { generateId } from '@components/utils/component'
import { Box, Flex, Grid } from '@radix-ui/themes'

const experiences: ExperienceProps[] = [
  {
    title: 'Cloud Engineer',
    company: {
      logo: 'sunflower.png',
      name: 'Sunflower Labs',
      url: 'https://sunflower-labs.com/',
    },
    start: {
      month: 'September',
      year: '2024',
    },
    end: {
      month: 'December',
      year: '2024',
    },
    location: 'Zurich, Switzerland',
    description: [
      'Improved user authentication user flow by handling vulnerabilities and edge cases',
      'Implemented monitoring for sockets, endpoints & requests in the Hive (docking station) middleware',
      'Designated Release Testing Engineer for the October release, ensuring successful end-to-end feature & regression tests',
    ],
  },
]

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
        <Box p="20px">
          {experiences.map((experience) => (
            <Block key={generateId(experience.title)} title="Experience">
              <Experience {...experience} />
            </Block>
          ))}
        </Box>
      </Grid>
    </Flex>
  )
}
