export const experiences = [
  {
    title: 'Cloud Engineer',
    company: {
      logo: 'sunflower.png',
      name: 'Sunflower Labs GmbH',
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
      'Improved user authentication user flow by handling vulnerabilities and edge cases.',
      'Implemented monitoring for sockets, endpoints & requests in the Hive (docking station) middleware.',
      'Designated Release Testing Engineer for the October release, ensuring successful end-to-end feature & regression tests.',
    ],
  },
  {
    title: 'Senior Full Stack Developer',
    company: {
      logo: 'frontify.jpeg',
      name: 'Frontify',
      url: 'https://frontify.com/',
    },
    start: {
      month: 'June',
      year: '2022',
    },
    end: {
      month: 'June',
      year: '2024',
    },
    location: 'St. Gallen',
    description: [
      'Member of the team winning Best of Swiss Web 2024 for Marketplace and Brand SDK.',
      "Led the architectural planning and development of (Typescript-based) Brand SDK's Command pattern with 100% code coverage.",
      'Directed the transition of legacy APIs to GraphQL & REST, reducing the affected code base by 40% and 20% reduction in reported bugs via a test-driven approach and Github action-based quality gates.',
      'Integrated Domain-Driven-Design based Translation Service module to support multi-lingual Guideline assets.',
      'Led the migration of Vanilla JS/doT.js front-end content blocks to React components with backward compatibility.',
    ],
  },
  {
    title: 'Senior Backend Lead',
    company: {
      logo: 'arcab.png',
      name: 'arcab Inc.',
      url: 'https://arcab.ae/',
    },
    start: {
      month: 'September',
      year: '2021',
    },
    end: {
      month: 'April',
      year: '2022',
    },
    location: 'Remote (U.A.E.)',
    description: [
      'Designed and provisioned backend Node.js modules to support route planning, live tracking, monitoring, asset management and comprehensive telematics-backed analytics for all data points.',
      'Developed a flexible processing layer to ingest data from various Telematics IoT providers, capable of transforming millions of documented raw metrics into insightful reports and visualizations.',
      'Introduced a scheduled caching layer to avoid excessive throughput to telematics API and pre-generate requested reports without throttling the back-end, reducing endpoint SLA from a few seconds to less than 100 milliseconds.',
      'Added telematics and backend services & associated pods, while maintaining the overall Kubernetes architecture to ensure a failsafe, load-tested and load-balanced cluster.',
    ],
  },
  {
    title: 'Technology Lead',
    company: {
      logo: 'culturemonkey.png',
      name: 'effy / CultureMonkey',
      url: 'https://www.culturemonkey.io/',
    },
    start: {
      month: 'February',
      year: '2018',
    },
    end: {
      month: 'August',
      year: '2021',
    },
    location: 'Chennai, India',
    description: [
      'End-to-end delivery of Integrations and Business Solutions via Customer Requirement gathering, feasibility & scoping of Software Architecture design, development approach and resource allocation, formulation of estimates and Statement of Work.',
      'Managed/delivered 20+ NodeJS-based SaaS Integration projects to support data transformation and business automation between platforms.',
      "Delivered fault-tolerant and highly-available Customer Support Intelligence and business automation enhancement for India's leading OTT platform (~500+ agents handling 15-20k tickets/hour and ~40k tickets during major sports events) with zero incidents.",
      'Founding member of CultureMonkey, leading the development of Employee Engagement analytics, visualizations, and web presence.',
    ],
  },
  {
    title: 'Software Engineer II',
    company: {
      logo: 'snapdeal.png',
      name: 'Snapdeal',
      url: 'https://snapdeal.com/',
    },
    start: {
      month: 'April',
      year: '2015',
    },
    end: {
      month: 'April',
      year: '2017',
    },
    location: 'Gurgaon, India',
    description: [
      'Developed and maintained Shopo Search (Elasticsearch via Spring Boot MVC endpoints), capable of searching through billions of records and supporting logic-based relevance.',
      'Ensured zero downtime and max ~40ms latency throughout the Search app endpoints using tried and tested node configurations and optimized indices.',
      'Improved search and indexing cluster reliability through the application of performance-optimized configuration, automated scheduled backups, failsafe measures, and near-instance recovery process.',
    ],
  },
]
