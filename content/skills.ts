import type { LucideIcon } from 'lucide-react'
import { Cloud, Database, Brain, Server, Boxes, LineChart, Workflow } from 'lucide-react'

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
      'Designing and operating AWS workloads across compute, storage, data, identity and observability services.',
    skills: [
      { name: 'AWS', focus: true },
      { name: 'Amazon CloudWatch', focus: true },
      { name: 'AWS Lambda', focus: true },
      { name: 'AWS Glue', focus: true },
      { name: 'Amazon S3', focus: true },
      { name: 'Amazon DynamoDB', focus: true },
      { name: 'Amazon Data Firehose', focus: true },
      { name: 'Amazon ECS', focus: true },
      { name: 'Amazon ECR', focus: true },
      { name: 'AWS IAM', focus: true },
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    icon: Boxes,
    description:
      'Building reproducible cloud infrastructure and automated delivery workflows through Infrastructure as Code, containers and CI/CD.',
    skills: [
      { name: 'Terraform', focus: true },
      { name: 'Docker', focus: true },
      { name: 'CI/CD', focus: true },
      { name: 'Git', focus: true },
      { name: 'Linux', focus: true },
      { name: 'GitHub Actions', focus: true },
      { name: 'Remote State & Locking' },
      { name: 'Infrastructure as Code' },
      { name: 'Container Deployment' },
    ],
  },
  {
    id: 'data',
    title: 'Data Engineering & Lakehouse',
    icon: Database,
    description:
      'Building data pipelines, lakehouse architectures and analytical datasets using open table formats, distributed processing and SQL.',
    skills: [
      { name: 'SQL', focus: true },
      { name: 'ETL Pipelines', focus: true },
      { name: 'Apache Iceberg', focus: true },
      { name: 'Amazon Athena', focus: true },
      { name: 'PostgreSQL', focus: true },
      { name: 'AWS Glue Data Catalog', focus: true },
      { name: 'Lakehouse', focus: true },
      { name: 'Amazon QuickSight', focus: true },
      { name: 'Data Visualisation', focus: true },
      { name: 'Apache Parquet' },
      { name: 'Idempotent Pipelines' },
      { name: 'Partition Design' },
      { name: 'PySpark' },
      { name: 'Pandas' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    icon: Brain,
    description:
      'Building AI-powered applications and agentic systems through model integration, retrieval, orchestration and tool connectivity.',
    skills: [
      { name: 'MCP (Model Context Protocol)', focus: true },
      { name: 'RAG (Retrieval-Augmented Generation)', focus: true },
      { name: 'Agent Engineering', focus: true },
      { name: 'Prompt Engineering', focus: true },
      { name: 'LLM API Integration', focus: true },
      { name: 'Structured Outputs' },
      { name: 'Asynchronous Enrichment' },
      { name: 'Agent Orchestration' },
      { name: 'Tool Integration' },
      { name: 'Context Management' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: Server,
    description:
      'Building API-driven services, backend workflows and data-access layers with explicit contracts and reliable processing.',
    skills: [
      { name: 'Python', focus: true },
      { name: 'FastAPI', focus: true },
      { name: 'REST API Design', focus: true },
      { name: 'PostgreSQL', focus: true },
      { name: 'Redis' },
      { name: 'Background Workers & Queues' },
      { name: 'SQLAlchemy' },
      { name: 'Asynchronous Processing' },
    ],
  },
  {
    id: 'product',
    title: 'Product Engineering',
    icon: LineChart,
    description:
      'Building accessible product experiences through frontend engineering, iterative development and reliable delivery practices.',
    skills: [
      { name: 'Next.js App Router', focus: true },
      { name: 'React', focus: true },
      { name: 'TypeScript', focus: true },
      { name: 'Tailwind CSS', focus: true },
      { name: 'Accessibility (WCAG)', focus: true },
      { name: 'Core Web Vitals' },
      { name: 'Agile Practices' },
      { name: 'DevOps Practices' },
    ],
  },
]

/** Domains shown on the home page - the three the positioning rests on. */
export const domains = [
  {
    id: 'cloud',
    index: '01',
    title: 'Cloud & Platform Engineering',
    statement: 'Building infrastructure that is reproducible, reliable and ready to run applications.',
    detail:
      'I use AWS, Terraform and container technologies to provision infrastructure, automate deployments and build environments that are easier to maintain.',
    keywords: ['AWS', 'Terraform', 'Docker', 'ECS', 'CI/CD'],
    icon: Cloud,
  },
  {
    id: 'data',
    index: '02',
    title: 'Data Engineering',
    statement: 'Building pipelines and analytical systems that make data easier to work with.',
    detail:
      'I work with Python, SQL and cloud data services to process data, build analytical datasets and explore scalable data architectures.',
    keywords: ['Python', 'SQL', 'S3', 'Athena', 'Apache Iceberg'],
    icon: Database,
  },
  {
    id: 'ai',
    index: '03',
    title: 'AI Engineering',
    statement: 'Integrating AI into applications and workflows beyond simple model calls.',
    detail:
      'I build AI-powered applications using LLMs, backend services and structured workflows, focusing on how AI capabilities can solve practical problems.',
    keywords: ['LLMs', 'Python', 'FastAPI', 'AI APIs'],
    icon: Brain,
  },
  {
    id: 'agentic',
    index: '04',
    title: 'Agentic Engineering',
    statement: 'Building agents that can reason through tasks, use tools and interact with systems.',
    detail:
      'I work with agent workflows, MCP servers and reusable agent skills to connect AI models with tools, services and structured tasks.',
    keywords: ['AI Agents', 'MCP', 'Agent Skills', 'Tool Integration'],
    icon: Workflow,
  },
]
