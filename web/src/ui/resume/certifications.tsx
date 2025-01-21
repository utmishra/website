import { Grid } from '@radix-ui/themes'
import CredentialCard from '@components/ui/resume/credential-card'

export default function Certifications() {
  return (
    <Grid
      columns={{
        initial: '1',
        lg: '2',
        xl: '2',
        md: '2',
      }}
      gap="2"
      align="center"
      justify="center"
    >
      <CredentialCard
        title="Javascript"
        description="Object Oriented Programming in Javascript"
        date="July, 2024"
        link="https://www.educative.io/verify-certificate/k5m3gAC4MZ5q9Vx1Yi0GAy5WjMxGhn"
      />
    </Grid>
  )
}
