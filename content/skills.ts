import type { LucideIcon } from 'lucide-react'
import { Cloud, Database, Brain, Server, Boxes, LineChart } from 'lucide-react'

/**
 * Skills are grouped by engineering domain rather than scored out of ten.
 * A proficiency bar invites invention; a grouped, honest inventory does not.
 * `focus` marks the tools I reach for first and is the only emphasis used.
 */

export type Skill = { name: string; focus?: boolean }

export type SkillGroup = {
  id: string
  title: string
  icon: LucideIcon
  description: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'cloud',
    title: 'Cloud',
    icon: Cloud,
    description:
      'Designing and running workloads on AWS - compute, storage, identity and the glue between them.',
    skills: [
      { name: 'AWS', focus: true },
      { name: 'Amazon ECS', focus: true },
      { name: 'Amazon ECR' },
      { name: 'Amazon S3', focus: true },
      { name: 'IAM & least privilege', focus: true },
      { name: 'CloudWatch' },
      { name: 'AWS Amplify' },
      { name: 'VPC & networking' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    icon: Boxes,
    description:
      'Infrastructure as code, containers and delivery pipelines - environments that can be recreated rather than repaired.',
    skills: [
      { name: 'Terraform', focus: true },
      { name: 'Docker', focus: true },
      { name: 'CI/CD pipelines', focus: true },
      { name: 'GitHub Actions' },
      { name: 'Remote state & locking' },
      { name: 'Immutable image builds' },
      { name: 'Linux' },
      { name: 'Git' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    icon: Database,
    description:
      'Ingestion, modelling and query layers built on open formats, with reruns and schema change treated as normal.',
    skills: [
      { name: 'SQL', focus: true },
      { name: 'Apache Iceberg', focus: true },
      { name: 'Amazon Athena', focus: true },
      { name: 'PostgreSQL', focus: true },
      { name: 'AWS Glue Data Catalog' },
      { name: 'Parquet' },
      { name: 'Idempotent pipelines' },
      { name: 'Partition design' },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    icon: Brain,
    description:
      'Putting models into products - treating model output as versioned data and building around latency and failure.',
    skills: [
      { name: 'LLM API integration', focus: true },
      { name: 'Prompt versioning', focus: true },
      { name: 'Asynchronous enrichment', focus: true },
      { name: 'Structured output handling' },
      { name: 'Retrieval over own data' },
      { name: 'Evaluation harnesses' },
      { name: 'Cost & latency budgeting' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    description:
      'Typed services with explicit contracts, built around the access patterns they actually serve.',
    skills: [
      { name: 'Python', focus: true },
      { name: 'FastAPI', focus: true },
      { name: 'TypeScript', focus: true },
      { name: 'Node.js' },
      { name: 'REST API design' },
      { name: 'Redis' },
      { name: 'Background workers & queues', focus: true },
      { name: 'Caching strategy' },
    ],
  },
  {
    id: 'product',
    title: 'Product engineering',
    icon: LineChart,
    description:
      'The surface users meet - rendered fast, accessible by construction, and measurable once it ships.',
    skills: [
      { name: 'Next.js App Router', focus: true },
      { name: 'React' },
      { name: 'Tailwind CSS', focus: true },
      { name: 'Accessibility (WCAG)', focus: true },
      { name: 'Core Web Vitals' },
      { name: 'Data visualisation' },
      { name: 'QuickSight' },
    ],
  },
]

/** Domains shown on the home page - the three the positioning rests on. */
export const domains = [
  {
    id: 'cloud',
    index: '01',
    title: 'Cloud Platform',
    statement: 'Environments defined as code, recreated on demand, with permissions you can review.',
    detail:
      'Terraform-defined AWS infrastructure, containerised workloads on ECS, commit-addressed images and deployment paths that roll back on their own when a health check fails.',
    keywords: ['Terraform', 'AWS', 'ECS', 'Docker', 'CI/CD'],
    icon: Cloud,
  },
  {
    id: 'data',
    index: '02',
    title: 'Data Engineering',
    statement: 'Tables you can trust - atomic commits, schema evolution and reruns that are safe by default.',
    detail:
      'Python and SQL pipelines landing into Apache Iceberg on S3, partitioned for how people actually query, served through Athena and curated tables rather than raw extracts.',
    keywords: ['Iceberg', 'Athena', 'Python', 'SQL', 'S3'],
    icon: Database,
  },
  {
    id: 'ai',
    index: '03',
    title: 'Applied AI',
    statement: 'Model output as versioned data, enriched asynchronously, never blocking the critical path.',
    detail:
      'Language models integrated into real pipelines - queued enrichment workers, prompt versions recorded alongside their output, and structured results that stay queryable.',
    keywords: ['LLM APIs', 'Redis queues', 'FastAPI', 'Evaluation'],
    icon: Brain,
  },
]
