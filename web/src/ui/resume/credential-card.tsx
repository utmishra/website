import { Card, Flex, Box, Text } from '@radix-ui/themes'
import Link from 'next/link'

type CertificateDetail = {
  title: string
  description: string
  date: string
  link: string
}
const CredentialCard = (certificateDetail: CertificateDetail) => (
  <Link
    href={certificateDetail.link}
    style={{
      verticalAlign: 'middle',
      textDecoration: 'none',
    }}
    target="_blank"
    className="consistentColor"
  >
    <Card size="1">
      <Flex direction="column" align="start" justify="start">
        <Box m="0">
          <Text size="4">{certificateDetail.title}</Text>
        </Box>
        <Text size="2">
          <i>{certificateDetail.description}</i>
        </Text>
        <Text size="1">{certificateDetail.date}</Text>
      </Flex>
    </Card>
  </Link>
)
export default CredentialCard
