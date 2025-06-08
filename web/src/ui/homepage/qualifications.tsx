import { Badge, Grid } from '@radix-ui/themes'
import CredentialCard from '../resume/credential-card'

export default function Qualifications() {
  const responsiveGrid = {
    initial: '1',
    lg: '2',
    xl: '2',
    md: '2',
  }

  return (
    <>
      <Badge size="2" m="1" variant="surface">
        Certifications
      </Badge>
      <Grid
        columns={responsiveGrid}
        gap="2"
        align="center"
        justify="center"
        mt="1"
      >
        <CredentialCard
          title="Javascript"
          description="Object Oriented Programming in Javascript"
          date="July, 2024"
          link="https://www.educative.io/verify-certificate/k5m3gAC4MZ5q9Vx1Yi0GAy5WjMxGhn"
        />
      </Grid>
      <Badge size="2" m="1" variant="surface">
        Education
      </Badge>
      <Grid
        columns={responsiveGrid}
        gap="2"
        align="center"
        justify="center"
        mt="1"
      >
        <CredentialCard
          link="https://drive.google.com/file/d/1FHHjcqBwdgb0TC4nqIDaCsCvARGUwCmB/view?usp=sharing"
          title="Bachelor of Engineering, Bharat Institute of Engineer"
          description="Computer Science & Engineering"
          date="2009 - 2013"
        />
      </Grid>
    </>
  )
}
