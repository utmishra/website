import { MessageCircle, FileText, Person } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@components/ui/common/button'

export default function Links() {
  return (
    <section className="mt-4">
      <div className="flex flex-row items-center justify-center gap-6">
        {/* <Button>Search</Button> */}
        <Link href="/resume">
          <Button aria-label="View Resume">
            <Person />
            <span className="font-bold">About Me</span>
          </Button>
        </Link>
        <Link
          href="https://rdkwr3shxcvpilqn.public.blob.vercel-storage.com/documents/Utkarsh%20Mishra%20-%20Senior%20Full%20Stack%20Developer%20Resume-wwNjOr6X5BkykUtNIZAawEFP5q16fS.pdf"
          rel="noopener noreferrer"
          download
          target="_blank"
        >
          <Button aria-label="Download Resume">
            <FileText />
            <span className="font-bold">Resume</span>
          </Button>
        </Link>
        <Link href="/chat" rel="noopener noreferrer">
          <Button aria-label="Chat with me">
            <MessageCircle />
            <span className="font-bold">Chat with me</span>
          </Button>
        </Link>
      </div>
    </section>
  )
}
