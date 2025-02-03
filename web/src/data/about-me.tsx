import { Button, Dialog, Strong, Text } from '@radix-ui/themes'
import Link from 'next/link'

export const AboutMe = () => (
  <section>
    <p>
      👋 Hi there! I&apos;m <strong>Utkarsh Mishra</strong>, a computer nerd and
      a Senior Full Stack Developer 🌐. I started programming in 2005 on a{' '}
      <Link
        href="https://www.reddit.com/r/retrobattlestations/comments/r41pp9/portable_week_vtech_pre_computer_power_pad_from/"
        target="_blank"
      >
        🤖 V Tech Pre Computer Power Pad
      </Link>
      . Clearly, I could not be be found AFK since then 😉.
    </p>

    <p>
      I love building for the heck of it and I strive to inculcate the best
      programming practices as I go 🚀
    </p>

    <p>
      I have both failed and succeeded in shipping products and features for{' '}
      <Link
        href="https://www.rockemetric.com"
        target="_blank"
        rel="Rockmetric Analytics"
      >
        Analytics
      </Link>
      ,{' '}
      <Link
        href="https://retail.economictimes.indiatimes.com/news/e-commerce/e-tailing/shopo-gets-1-million-listings-in-3-months/49536211"
        target="_blank"
        rel="shopo eCommerce"
      >
        eCommerce
      </Link>
      ,{' '}
      <Link
        href="https://www.culturemonkey.io"
        target="_blank"
        rel="CultureMonkey Employee Engagement"
      >
        Employee Engagement
      </Link>{' '}
      &{' '}
      <Link
        href="https://www.frontify.com"
        target="_blank"
        rel="Frontify Brand Management"
      >
        Brand Management
      </Link>{' '}
      SaaS products.
    </p>
    <p>
      I hope to be a part of more meaningful and impactful codebases as I go ☘️.
    </p>
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">Read more...</Button>
      </Dialog.Trigger>

      <Dialog.Content size="4" width="70vw" height="90vh">
        <Dialog.Title>About me 👨‍💻</Dialog.Title>
        <Dialog.Description size="4" mb="4">
          <Text>
            👋 Hey there! I&apos;m <Strong>Utkarsh Mishra</Strong>, a passionate{' '}
            <Strong>Full Stack Developer</Strong> and self-proclaimed{' '}
            <Strong>computer nerd</Strong> 🤓. My programming journey began in
            the early 2000s, tinkering with whatever tech I could get my hands
            on. Fast forward to today, and I’m still just as obsessed with{' '}
            <Strong>building things that matter</Strong> 🚀.
          </Text>

          <Text>
            I’ve had the privilege of working on{' '}
            <Strong>high-impact projects across various domains</Strong>—from{' '}
            <Strong>Fleet Management & Telematics</Strong> 🚗 to{' '}
            <Strong>Employee Engagement Analytics</Strong> 📊,{' '}
            <Strong>eCommerce Search Optimization</Strong> 🛍️, and{' '}
            <Strong>Brand Management SaaS</Strong> 🎨. Whether it’s{' '}
            <Strong>optimizing a high-traffic Elasticsearch cluster</Strong>,{' '}
            <Strong>
              building an Employee Engagement product from scratch 🧱
            </Strong>
            , or{' '}
            <Strong>migrating legacy systems to modern architectures</Strong>, I
            love tackling <Strong>complex engineering challenges</Strong>{' '}
            head-on.
          </Text>

          <Text>
            <Strong>💡 Principles I (try) to live on..</Strong>
          </Text>
          <ul>
            <li>
              <Strong>Architecting scalable backend systems</Strong> – Whether
              it&apos;s <Strong>Microservices</Strong>,{' '}
              <Strong>Modular Monoliths</Strong>, or{' '}
              <Strong>Event-Driven Systems</Strong>, I design for{' '}
              <Strong>performance & maintainability</Strong>.
            </li>
            <li>
              <Strong>API & Search Optimization</Strong> – I&apos;ve{' '}
              <Strong>tuned Elasticsearch clusters</Strong>, optimized{' '}
              <Strong>PostgreSQL queries</Strong>, and built{' '}
              <Strong>GraphQL-driven data models</Strong> for snappy responses.
            </li>
            <li>
              <Strong>Cloud & DevOps</Strong> – Deploying robust services with{' '}
              <Strong>Docker, Kubernetes, GCP/AWS</Strong>, and setting up{' '}
              <Strong>monitoring & logging</Strong> (because{' '}
              <Strong>silent failures are scary</Strong> 👻).
            </li>
            <li>
              <Strong>Code Quality & Best Practices</Strong> – I’m a strong
              advocate for{' '}
              <Strong>TDD, Clean Code, SOLID principles, and DDD</Strong>,
              ensuring everything I build is{' '}
              <Strong>robust, testable, and future-proof</Strong>.
            </li>
            <li>
              <Strong>Mentorship & Team Collaboration</Strong> – I enjoy sharing
              knowledge, debugging together, and making{' '}
              <Strong>technical decisions that scale</Strong>.
            </li>
          </ul>

          <Text>
            <Strong>🎯 What I Love Working On</Strong>
          </Text>
          <ul>
            <li>
              <Strong>Cutting-edge tech & scalable architectures</Strong> –
              Whether it&apos;s <Strong>GraphQL over REST</Strong>,{' '}
              <Strong>serverless computing</Strong>, or{' '}
              <Strong>event-driven microservices</Strong>, I love{' '}
              <Strong>exploring and applying the best patterns</Strong>.
            </li>
            <li>
              <Strong>Real-time systems & high-performance computing</Strong> –
              If it involves <Strong>low-latency data processing</Strong>,{' '}
              <Strong>live updates</Strong>, or{' '}
              <Strong>real-time analytics</Strong>, count me in!
            </li>
            <li>
              <Strong>Refactoring legacy codebases</Strong> – It’s oddly
              satisfying to <Strong>untangle spaghetti code</Strong>, modernize
              APIs, and{' '}
              <Strong>leave the codebase cleaner than I found it</Strong> 🧹.
            </li>
            <li>
              <Strong>Building developer-friendly SDKs & APIs</Strong> – I
              thrive on <Strong>creating tools</Strong> that make
              developers&apos; lives easier, just like I did with{' '}
              <Strong>Brand SDK</Strong> at Frontify.
            </li>
          </ul>

          <Text>
            I’ve had my fair share of{' '}
            <Strong>failed & successful launches</Strong>, but every project has
            been a learning experience. At the end of the day, I want to{' '}
            <Strong>build meaningful and impactful software</Strong> that stands
            the test of time.
          </Text>

          <Text>
            <Strong>Let’s build something awesome together!</Strong> ☘️🚀
          </Text>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  </section>
)
