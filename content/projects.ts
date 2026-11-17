/**
 * Project case studies.
 *
 * Content rules applied here deliberately:
 *  - No invented metrics, user counts, revenue figures or testimonials.
 *  - Anything not running in production is labelled `Prototype` and the status
 *    is surfaced in the UI, not buried.
 *  - Outcomes describe engineering results that are observable from the work
 *    itself (what was built, what it makes possible), not business claims.
 */

export type ProjectStatus = 'Production' | 'Prototype' | 'Ongoing'
export type ProjectDomain = 'Cloud' | 'Data' | 'AI' | 'Product'
export type DiagramKind = 'request-pipeline' | 'infra-pipeline' | 'lakehouse' | 'web-delivery'

export type CaseStudySection = { title: string; body: string }

export type Project = {
  slug: string
  title: string
  subtitle: string
  year: string
  status: ProjectStatus
  domains: ProjectDomain[]
  /** One-sentence summary used on cards and in list views. */
  summary: string
  /** Longer intro used at the top of the case study. */
  intro: string
  role: string
  stack: string[]
  featured: boolean
  diagram: DiagramKind
  /** Labelled stages rendered by the animated architecture diagram. */
  flow: { label: string; detail: string }[]
  problem: string[]
  approach: CaseStudySection[]
  decisions: CaseStudySection[]
  outcomes: string[]
  nextSteps: string[]
}

export const projects: Project[] = [
  {
    slug: 'social-intelligence-platform',
    title: 'Social Intelligence Platform',
    subtitle: 'Ingestion, enrichment and analysis of public social data',
    year: '2025',
    status: 'Prototype',
    domains: ['Product', 'Data', 'AI'],
    summary:
      'A full-stack platform that collects public social data, enriches it with language models, and makes the result queryable through an analyst-facing interface.',
    intro:
      'Social Intelligence Platform is a prototype I built end to end to answer a specific question: what does it take to turn a noisy stream of public social posts into something an analyst can actually reason about? It spans a Next.js front end, a FastAPI service layer, PostgreSQL for durable state, Redis for queueing and caching, and model calls for enrichment.',
    role: 'Sole engineer - architecture, backend, data model, front end and deployment.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'LLM APIs', 'Docker'],
    featured: true,
    diagram: 'request-pipeline',
    flow: [
      { label: 'Collect', detail: 'Scheduled collectors pull public posts and normalise them into one schema.' },
      { label: 'Queue', detail: 'Redis holds work items so enrichment never blocks collection.' },
      { label: 'Enrich', detail: 'Workers call language models for classification, summarisation and entity extraction.' },
      { label: 'Store', detail: 'PostgreSQL keeps raw records, enrichment output and their lineage separately.' },
      { label: 'Serve', detail: 'FastAPI exposes filtered, paginated reads to the Next.js analyst UI.' },
    ],
    problem: [
      'Public social data arrives unstructured, rate-limited and inconsistent in shape. Each source names the same fields differently, and volume is bursty rather than steady.',
      'Model enrichment is slow and occasionally fails. Running it inline with collection means one bad response stalls the whole pipeline, and retrying re-pays for work that already succeeded.',
      'Analysts need to slice the result along dimensions that did not exist in the raw payload - topic, sentiment, named entities - which means enrichment has to be queryable, not just stored.',
    ],
    approach: [
      {
        title: 'Separate collection from enrichment',
        body: 'Collectors do one job: fetch, normalise, persist the raw record, push an identifier onto a Redis queue. Enrichment workers consume that queue independently. A failure on either side degrades one stage instead of the pipeline, and enrichment can be scaled or replayed without re-fetching anything.',
      },
      {
        title: 'Model output as data, not as a side effect',
        body: 'Every enrichment is written as its own row carrying the model used, the prompt version and a timestamp, linked back to the source record. That makes it possible to re-run an improved prompt over historical data and compare the two generations side by side rather than silently overwriting the old answer.',
      },
      {
        title: 'A schema that assumes the shape will change',
        body: 'Source-specific fields live in a JSONB column while the fields every source shares are promoted to real typed columns with indexes. Adding a new source means writing a normaliser, not migrating the table.',
      },
      {
        title: 'A read API built for the actual access pattern',
        body: 'The analyst view is filter-heavy and paginated. The API exposes keyset pagination and pushes filtering into indexed columns rather than loading rows into Python, and Redis caches the handful of aggregate queries that the dashboard repeats on every load.',
      },
    ],
    decisions: [
      {
        title: 'Redis as a queue before reaching for a broker',
        body: 'The workload is a single-consumer-group job queue with modest durability requirements. Redis was already in the stack for caching, and adding a dedicated broker would have introduced an operational surface the prototype does not need. The queue interface is isolated behind one module so swapping it later is a contained change.',
      },
      {
        title: 'FastAPI rather than putting Python work in route handlers of the Next.js app',
        body: 'Enrichment, collection and the model clients are Python. Keeping that in a typed Python service with its own lifecycle meant the web tier stayed a rendering and interaction concern, and the heavy work could be scaled and deployed on its own schedule.',
      },
      {
        title: 'Idempotent writes keyed on source identity',
        body: 'Collectors re-fetch overlapping windows by design. Upserting on a composite source key makes repeated collection safe and removes the need for exactly-once delivery guarantees anywhere in the pipeline.',
      },
    ],
    outcomes: [
      'A working end-to-end system: collection, queued enrichment, persistence and an analyst UI that queries it.',
      'Enrichment can be re-run over historical records with a new prompt without re-fetching source data, because model output is versioned and stored separately from the source.',
      'Adding a new data source is a normaliser module plus a config entry - no schema migration and no change to the enrichment workers.',
    ],
    nextSteps: [
      'Move the enrichment queue onto a broker with durable consumer groups if throughput requirements grow past a single worker pool.',
      'Add an evaluation harness so prompt revisions can be scored against a labelled sample before being promoted.',
    ],
  },
  {
    slug: 'aws-infrastructure-automation',
    title: 'AWS Infrastructure Automation',
    subtitle: 'Reproducible container platform defined entirely in Terraform',
    year: '2025',
    status: 'Production',
    domains: ['Cloud'],
    summary:
      'Terraform-defined AWS environments with containerised workloads on ECS, images in ECR, and a CI/CD path that takes a commit to a running task without manual steps.',
    intro:
      'This is the infrastructure work I keep returning to: describing an AWS environment precisely enough that it can be destroyed and recreated without a runbook. Networking, compute, image storage, roles and deployment are all code, and a push to the default branch is the only trigger a release needs.',
    role: 'Platform engineering - Terraform modules, container build pipeline, deployment automation.',
    stack: ['AWS', 'Terraform', 'Docker', 'Amazon ECS', 'Amazon ECR', 'GitHub Actions', 'IAM', 'CloudWatch'],
    featured: true,
    diagram: 'infra-pipeline',
    flow: [
      { label: 'Commit', detail: 'A push to the default branch starts the pipeline - no manual release step.' },
      { label: 'Build', detail: 'A multi-stage Docker build produces one immutable image tagged with the commit SHA.' },
      { label: 'Push', detail: 'The image lands in ECR, where lifecycle policies bound how long old tags are retained.' },
      { label: 'Plan', detail: 'Terraform plans against remote state with locking, so concurrent runs cannot diverge.' },
      { label: 'Deploy', detail: 'ECS rolls the service forward behind health checks and rolls back on failure.' },
    ],
    problem: [
      'Environments built by hand drift. The console lets you fix something quickly and leaves no record that you did, so staging and production slowly stop resembling each other.',
      '"Latest" tags make deployments unreproducible: the image a service runs cannot be traced back to the commit that produced it.',
      'Permissions granted interactively tend to be broader than necessary and nobody revisits them once something works.',
    ],
    approach: [
      {
        title: 'Composable Terraform modules with explicit interfaces',
        body: 'Networking, cluster, service and observability are separate modules with narrow inputs and outputs. An environment is a thin root module that wires them together with its own variables, so staging and production are the same code with different numbers rather than two diverging copies.',
      },
      {
        title: 'Remote state with locking from day one',
        body: 'State lives in S3 with DynamoDB-based locking. It costs almost nothing and removes the entire class of failure where two applies run at once and leave resources half-owned.',
      },
      {
        title: 'Immutable, commit-addressed images',
        body: 'Every build tags the image with the commit SHA and pushes it to ECR. Task definitions reference that exact tag. Any running task can be traced back to the source that produced it, and a rollback is a redeploy of a previous definition rather than a rebuild.',
      },
      {
        title: 'Roles scoped per task, not per account',
        body: 'Each ECS service gets a task role carrying only the permissions that workload needs, separate from the execution role used to pull images and write logs. Policies are written in Terraform, which makes a permission change reviewable in a pull request.',
      },
      {
        title: 'Health checks that gate the rollout',
        body: 'The service defines a container health check and a deployment circuit breaker. A task that starts but never becomes healthy stops the rollout and reverts instead of quietly replacing a working revision.',
      },
    ],
    decisions: [
      {
        title: 'ECS over a managed Kubernetes control plane',
        body: 'The workloads are a small number of long-running HTTP services and scheduled tasks. ECS covers that with far less operational surface - no cluster upgrades, no add-on compatibility matrix - and the deployment primitives map cleanly onto Terraform. Kubernetes would have been infrastructure to maintain rather than infrastructure to use.',
      },
      {
        title: 'Terraform rather than CloudFormation or CDK',
        body: 'Terraform keeps infrastructure declarative and legible to anyone reading the repository, and the plan output is a genuine review artefact. CDK is pleasant to write but makes diffs harder to reason about, which matters more than authoring ergonomics for infrastructure that changes rarely and must be understood quickly.',
      },
      {
        title: 'Multi-stage Docker builds with pinned base images',
        body: 'Build tooling never reaches the runtime image, which keeps it small and reduces what is exposed. Base images are pinned by digest so a rebuild of an old commit produces the same artefact.',
      },
    ],
    outcomes: [
      'An environment can be torn down and recreated from the repository alone - there is no step that exists only in someone’s memory.',
      'Every running container maps to a specific commit, so debugging starts from a known artefact instead of a guess.',
      'Infrastructure and permission changes go through pull request review with a Terraform plan attached, rather than being applied in the console.',
    ],
    nextSteps: [
      'Add policy-as-code checks to the plan stage so disallowed resource shapes fail in CI rather than in review.',
      'Publish per-service dashboards and alarms from the same modules that define the services.',
    ],
  },
  {
    slug: 'data-engineering-analytics',
    title: 'Data Engineering & Analytics',
    subtitle: 'An open lakehouse on S3 with Iceberg tables and SQL-first access',
    year: '2024 - 2025',
    status: 'Production',
    domains: ['Data'],
    summary:
      'Python ingestion into Apache Iceberg tables on S3, queried with Athena and surfaced through QuickSight - schema evolution and time travel without a warehouse migration.',
    intro:
      'Analytics work where the hard part is rarely the chart. It is making the underlying tables trustworthy: ingestion that can be re-run safely, a table format that tolerates schema change, partitioning that matches how people actually query, and a serving layer that does not require every analyst to learn the pipeline.',
    role: 'Data engineering - ingestion, table design, partitioning strategy, query layer and dashboards.',
    stack: ['Python', 'SQL', 'Apache Iceberg', 'Amazon Athena', 'Amazon S3', 'AWS Glue Data Catalog', 'QuickSight'],
    featured: true,
    diagram: 'lakehouse',
    flow: [
      { label: 'Ingest', detail: 'Python jobs land raw extracts in S3, partitioned by ingestion date.' },
      { label: 'Model', detail: 'Transformations write typed Iceberg tables with explicit partition specs.' },
      { label: 'Catalog', detail: 'Glue holds table metadata so every engine sees the same schema.' },
      { label: 'Query', detail: 'Athena runs SQL directly against Iceberg - no cluster to keep warm.' },
      { label: 'Present', detail: 'QuickSight reads curated tables, never raw landing data.' },
    ],
    problem: [
      'Plain Parquet on S3 gives you files, not tables. There is no atomic commit, so a reader can observe a half-written partition, and a rename-based overwrite is not safe under concurrency.',
      'Schemas change. Adding or reordering a column in a directory-of-files layout tends to mean rewriting history or accepting that old partitions read back wrong.',
      'Scan cost is a direct function of partition design. Partitioning on the wrong column means every query reads the whole table and the bill reflects it.',
    ],
    approach: [
      {
        title: 'Iceberg for the table layer',
        body: 'Iceberg adds atomic snapshot commits, schema evolution by column ID rather than by position, and hidden partitioning. Readers always see a consistent snapshot, a column can be added or renamed without rewriting data, and queries do not have to know the physical partition layout to benefit from pruning.',
      },
      {
        title: 'A layered model: landing, curated, serving',
        body: 'Raw extracts are written once and never edited, so a bug in a transformation is always recoverable by replay. Curated tables hold typed, deduplicated entities. Serving tables are shaped for the questions dashboards ask. Each layer has one job and one owner.',
      },
      {
        title: 'Partition on the column people filter by',
        body: 'Partition specs follow observed query patterns - usually an event date - rather than whatever key happened to be convenient at ingestion. Iceberg’s hidden partitioning means an analyst filtering on a timestamp gets pruning without writing a partition predicate by hand.',
      },
      {
        title: 'Idempotent ingestion with merge semantics',
        body: 'Jobs are written so that re-running them for a window produces the same table state. Merge-on-read handles late-arriving and corrected records without a full rewrite, which makes backfills routine rather than risky.',
      },
      {
        title: 'Maintenance treated as part of the pipeline',
        body: 'Small-file compaction and snapshot expiry run on a schedule. Without them an Iceberg table accumulates metadata and tiny files until planning time dominates query time - the failure mode is gradual, so it has to be automated rather than noticed.',
      },
    ],
    decisions: [
      {
        title: 'Athena rather than a provisioned warehouse',
        body: 'Query volume is analytical and bursty. Paying per scanned byte against data that already lives in S3 avoids keeping a cluster warm for a workload that is idle most of the day, and keeps the storage layer open to other engines.',
      },
      {
        title: 'Iceberg over Hive-style tables',
        body: 'The decisive features were atomic commits and schema evolution. Both are things you only miss once a reader has seen a partially written partition or a reordered column has silently corrupted a report.',
      },
      {
        title: 'Dashboards read serving tables only',
        body: 'QuickSight never points at landing data. It makes dashboard performance predictable, and it means a change to how data is ingested cannot break a dashboard without first breaking a table that has a test.',
      },
    ],
    outcomes: [
      'Analysts query current data with plain SQL and no knowledge of the ingestion pipeline.',
      'Schema changes ship without rewriting historical partitions or breaking existing queries.',
      'Pipeline reruns and backfills are safe operations rather than events that need coordination.',
    ],
    nextSteps: [
      'Add data-quality assertions between layers so a failed expectation blocks promotion to the serving layer.',
      'Expose table-level freshness as a first-class signal in the dashboards that depend on it.',
    ],
  },
  {
    slug: 'high-on-fitness',
    title: 'High On Fitness',
    subtitle: 'A fast, accessible fitness site deployed on AWS Amplify',
    year: '2024',
    status: 'Production',
    domains: ['Product', 'Cloud'],
    summary:
      'A Next.js site with a managed CI/CD and CDN path on AWS Amplify - built for load performance on mobile connections and for content that changes without a developer.',
    intro:
      'A smaller, sharper brief than the platform work: a marketing and information site where the engineering goal is almost entirely delivery. It has to be quick on a mid-range phone, legible, accessible, and deployable by pushing to a branch.',
    role: 'Design and build - front end, content structure, deployment pipeline.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AWS Amplify', 'CloudFront'],
    featured: false,
    diagram: 'web-delivery',
    flow: [
      { label: 'Push', detail: 'A branch push triggers an Amplify build - preview branches get their own URL.' },
      { label: 'Build', detail: 'Next.js prerenders static routes and optimises images at build time.' },
      { label: 'Distribute', detail: 'Assets are served from the CDN edge with long-lived immutable caching.' },
      { label: 'Render', detail: 'Static HTML arrives first; interactivity hydrates only where it is needed.' },
    ],
    problem: [
      'Most visitors arrive on mobile, often on a slow connection. Anything that delays first paint costs attention immediately.',
      'Content needs to be editable without touching layout code, or it stops being updated at all.',
      'A hand-rolled deployment pipeline is disproportionate effort for a site of this size.',
    ],
    approach: [
      {
        title: 'Static-first rendering',
        body: 'Pages that do not depend on request state are prerendered at build time and served as HTML from the edge. The client only hydrates the components that genuinely need interactivity, which keeps the JavaScript payload proportional to the interaction on the page.',
      },
      {
        title: 'Content separated from layout',
        body: 'Copy and section data live in typed content modules rather than inside JSX. Updating the site is editing a structured object, and TypeScript catches a missing field before it reaches a build.',
      },
      {
        title: 'Images optimised at build, not at request',
        body: 'Next.js image handling emits modern formats at the sizes the layout actually uses, with explicit dimensions so nothing shifts as images arrive.',
      },
      {
        title: 'Managed CI/CD via Amplify',
        body: 'Amplify builds every branch, gives pull requests a preview URL and handles TLS and CDN invalidation. For a site this size the managed path is the correct trade: zero pipeline maintenance for a small loss of control.',
      },
    ],
    decisions: [
      {
        title: 'Amplify rather than a self-managed S3 and CloudFront stack',
        body: 'The Terraform-defined alternative is strictly more flexible and strictly more work. The deciding factor was branch previews and automatic certificate management arriving for free, against a site whose infrastructure requirements are not going to grow.',
      },
      {
        title: 'Accessibility as a build constraint',
        body: 'Semantic landmarks, visible focus states and colour contrast were handled while building rather than audited afterwards, which is both cheaper and produces a better result than retrofitting ARIA onto finished markup.',
      },
    ],
    outcomes: [
      'Static delivery from the edge, with client JavaScript limited to genuinely interactive components.',
      'Every branch builds and gets a preview URL, so changes are reviewed as a running site.',
      'Content updates are type-checked edits to structured data rather than layout surgery.',
    ],
    nextSteps: [
      'Track Core Web Vitals from real traffic rather than relying on synthetic lab runs alone.',
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const projectSlugs = projects.map((p) => p.slug)
