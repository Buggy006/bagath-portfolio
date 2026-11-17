/**
 * Professional timeline.
 *
 * ---------------------------------------------------------------------------
 * REVIEW BEFORE PUBLISHING
 * ---------------------------------------------------------------------------
 * The BMW TechWorks India entry below is written from publicly describable
 * technologies and engineering practices only. It deliberately contains:
 *   - no internal project or product names
 *   - no dataset, dashboard or service names
 *   - no architecture specifics, topologies or vendor arrangements
 *   - no performance, cost or volume figures
 *
 * Replace the bullets with your own approved wording if you have it, and set
 * `period` once you are happy publishing dates. Any entry with `period` unset
 * simply renders without a date range rather than showing a placeholder.
 * ---------------------------------------------------------------------------
 */

export type ExperienceItem = {
  id: string
  company: string
  role: string
  /** Optional. Omitted from the UI entirely when undefined - never a placeholder. */
  period?: string
  location?: string
  /** Short framing sentence shown under the role. */
  summary: string
  highlights: string[]
  stack: string[]
  /** `true` renders the entry as the current position. */
  current?: boolean
}

export const experience: ExperienceItem[] = [
  {
    id: 'bmw-techworks-india',
    company: 'BMW TechWorks India',
    role: 'Software Engineer - Cloud & Data',
    location: 'India',
    current: true,
    summary:
      'Engineering work across cloud infrastructure and data platform practice in an enterprise environment.',
    highlights: [
      'Build and maintain cloud infrastructure defined as code, with changes reviewed as pull requests rather than applied by hand.',
      'Work with containerised services and automated build-and-deploy pipelines so releases are repeatable and traceable to a commit.',
      'Develop data processing in Python and SQL, with attention to idempotent jobs, schema change and safe reprocessing.',
      'Collaborate across engineering teams on code review, documentation and operational readiness for the services I contribute to.',
    ],
    stack: ['AWS', 'Terraform', 'Docker', 'Python', 'SQL', 'CI/CD', 'Git'],
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
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Terraform', 'Iceberg', 'Athena'],
  },
]

/** Compact figures for the home page summary - all derived, none invented. */
export const experienceSummary = [
  { label: 'Current focus', value: 'Cloud platform, data infrastructure & applied AI' },
  { label: 'Primary cloud', value: 'Amazon Web Services' },
  { label: 'Working languages', value: 'TypeScript, Python, SQL' },
]
