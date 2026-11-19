/**
 * Professional timeline.
 *
 * ---------------------------------------------------------------------------
 * CONFIDENTIALITY
 * ---------------------------------------------------------------------------
 * BMW entries use wording supplied and approved by Bagath. They name the
 * platform area worked in and the technologies used, but deliberately contain:
 *   - no internal dataset, dashboard, service or repository names
 *   - no architecture specifics, topologies or vendor arrangements
 *   - no performance, cost, volume or headcount figures
 *   - no claim of sole ownership over team or platform initiatives
 *
 * Entries without a `period`, `summary`, `highlights` or `stack` render without
 * those elements rather than showing a placeholder.
 * ---------------------------------------------------------------------------
 */

export type ExperienceItem = {
  id: string
  company: string
  role: string
  /** Optional. Omitted from the UI entirely when undefined - never a placeholder. */
  period?: string
  location?: string
  /** Short framing sentence shown under the role. Omitted when not supplied. */
  summary?: string
  /** Omitted entirely rather than inventing responsibilities for a role. */
  highlights?: string[]
  stack?: string[]
  /** `true` renders the entry as the current position. */
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    id: 'bmw-techworks-india',
    company: 'BMW TechWorks India',
    role: 'Software Engineer - Cloud Data Hub',
    period: 'July 2025 – Present',
    location: 'India',
    current: true,
    summary:
      'Engineering cloud infrastructure, data pipelines and analytics capabilities within BMW’s enterprise data platform ecosystem.',
    highlights: [
      'Build and maintain end-to-end data pipelines integrating Jira, GitHub and AWS data sources into the CDH analytics platform.',
      'Develop data processing and analytical datasets using Python, SQL and AWS data services, enabling downstream Athena queries and QuickSight dashboards.',
      'Engineer semantic datasets and data models supporting engineering productivity, DORA metrics and team-level analytics.',
      'Implement and maintain cloud infrastructure and deployment workflows using Terraform, contributing to reproducible infrastructure and automated delivery.',
      'Integrate engineering data across source systems and analytics layers, aligning team attribution, metadata and reporting requirements.',
      'Collaborate across engineering teams on technical design, reviews, documentation, platform integration and operational improvements.',
      'Contribute to the development of an autonomous software development platform, working across backend workflows, AI agent orchestration, MCP integrations and cloud infrastructure.',
      'Explore and implement AI-agent workflows across software development activities, including planning, implementation, testing, code review and engineering tool integration.',
      'Develop agent integrations with enterprise engineering systems, including GitHub, Jira and testing workflows, through MCP-based tool interfaces.',
    ],
    stack: ['Python', 'SQL', 'APIs', 'AWS', 'Terraform', 'Athena', 'QuickSight', 'Iceberg'],
  },
  {
    id: 'bmw-group-india-it-hub',
    company: 'BMW Group India IT Hub',
    role: 'Apprentice / IT Engineering',
    period: 'December 2022 – July 2025',
    location: 'India',
  },
  {
    id: 'independent-engineering',
    company: 'Independent engineering work',
    role: 'Full-stack & platform projects',
    summary:
      'Self-directed projects where I own the whole surface - infrastructure, data model, services and interface.',
    highlights: [
      'Designed and built a social intelligence platform spanning collection, queued model enrichment, PostgreSQL storage and an analyst interface.',
      'Defined reproducible AWS environments in Terraform with container workloads on ECS and commit-addressed images in ECR.',
      'Built analytics on an open lakehouse - Python ingestion into Apache Iceberg tables on S3, queried with Athena and surfaced in QuickSight.',
      'Shipped and maintained production web front ends on managed AWS deployment pipelines.',
    ],
    stack: ['TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Terraform', 'Athena'],
  },
]

/** Compact figures for the home page summary - all derived, none invented. */
export const experienceSummary = [
  { label: 'Current focus', value: 'Cloud platform, data infrastructure & applied AI' },
  { label: 'Primary cloud', value: 'Amazon Web Services' },
  { label: 'Working languages', value: 'Python, SQL' },
]
