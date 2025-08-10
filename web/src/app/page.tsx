import IdCard from '@components/ui/homepage/id-card'
import Links from '@components/ui/homepage/links'
import { Card } from '@components/ui/shadcn/card'

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-40px)] w-screen flex-col items-center justify-center gap-2 p-2">
      <Card className="w-full max-w-xl">
        <IdCard />
        <Links />
      </Card>
    </div>
  )
}
