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

export type ProjectStatus = 'Production' | 'Prototype' | 'In Development' | 'Ongoing'
export type ProjectDomain = 'Cloud' | 'Infrastructure' | 'Data' | 'Analytics' | 'AI' | 'Product'
export type DiagramKind = 'request-pipeline' | 'infra-pipeline' | 'lakehouse' | 'web-delivery'

export type CaseStudySection = { title: string; body: string }

type ProjectBase = {
  slug: string
  title: string
  subtitle: string
  status: ProjectStatus
  domains: ProjectDomain[]
  /** One-sentence summary used on cards and in list views. */
  summary: string
  featured: boolean
  /** Omitted while unconfirmed - the card renders without a date rather than a placeholder. */
  year?: string
  /** Omitted while unconfirmed - no technology chips are rendered. */
  stack?: string[]
}

/**
 * A project with a full case study at /projects/<slug>. Every detail field is
 * required here, so an incomplete case study is a compile error, not a gap in
 * the page.
 */
export type CaseStudyProject = ProjectBase & {
  caseStudy: true
  year: string
  stack: string[]
  /** Overrides the generic prototype disclaimer. Only read when status is Prototype. */
  prototypeNote?: string
  /** Overrides the generic one-line intro above the architecture diagram. */
  architectureIntro?: string
  /** Understated footnote at the end of the case study, for work that cannot be shown in full. */
  confidentialityNote?: string
  /** Overrides the "Approach" section heading. */
  approachHeading?: string
  /** Overrides the "Outcomes" section heading, e.g. for work still in progress. */
  outcomesHeading?: string
  /** Longer intro used at the top of the case study. */
  intro: string
  role: string
  diagram: DiagramKind
  /** Labelled stages rendered by the animated architecture diagram. */
  flow: { label: string; detail: string; phase?: string }[]
  problem: string[]
  approach: CaseStudySection[]
  decisions: CaseStudySection[]
  outcomes: string[]
  nextSteps: string[]
}

/** A project shown as a card only - no detail page is generated for it. */
export type CardOnlyProject = ProjectBase & { caseStudy: false }

export type Project = CaseStudyProject | CardOnlyProject

export const projects: Project[] = [
  {
    slug: 'social-intelligence-platform',
    caseStudy: true,
    title: 'Social Intelligence Platform',
    subtitle: 'Collection, AI enrichment and analysis of social data',
    year: '2025',
    status: 'Prototype',
    domains: ['Product', 'Data', 'AI'],
    summary:
      'Social data analysis, AI-powered enrichment and actionable insights.',
    intro:
      'I’m building a platform that transforms social media data into structured intelligence. It combines data collection, AI-driven analysis and an interactive dashboard to help make online conversations, audience sentiment and emerging topics easier to understand.',
    role: 'Sole engineer — architecture, backend, data model, frontend and deployment.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Redis'],
    featured: true,
    diagram: 'request-pipeline',
    prototypeNote:
      'This is an independently built prototype exploring the architecture and technical feasibility of a social intelligence system. It is not a production product with customers.',
    architectureIntro:
      'From social data to intelligence: the system separates data collection, AI enrichment, persistence and analytical access into distinct stages.',
    flow: [
      {
        label: 'Collect',
        detail: 'Scheduled collectors retrieve source data and normalise incoming records into a shared structure.',
      },
      {
        label: 'Queue',
        detail: 'Redis separates collection from enrichment, allowing processing work to be handled independently.',
      },
      {
        label: 'Enrich',
        detail:
          'Python workers process records using language models to extract structured signals such as sentiment, topics, summaries and entities.',
      },
      {
        label: 'Store',
        detail:
          'PostgreSQL stores source records and their enrichment outputs, allowing analytical data to be queried independently from the original content.',
      },
      {
        label: 'Serve',
        detail: 'FastAPI provides the data access layer for the analyst interface, built with Next.js.',
      },
    ],
    problem: [
      'Social media data is valuable, but difficult to turn into consistent, actionable insight.',
      'Data collected from different sources arrives in inconsistent formats, with varying field structures, collection limits and unpredictable volumes. Before it can be analysed, it needs to be normalised into a consistent data model.',
      'The challenge extends beyond collection. Extracting sentiment, topics, entities and other contextual signals using language models introduces processing latency, failure handling and the need to manage model-generated data independently from the original source.',
      'And even when those insights are generated, they need to be accessible. Analysts should be able to filter, explore and compare results without relying on raw payloads or running expensive processing every time they open a dashboard.',
      'I built this prototype to explore how a collection, enrichment and analytics pipeline could bring those pieces together.',
    ],
    approach: [
      {
        title: 'Separate collection from enrichment',
        body: 'Collection and model processing have different execution characteristics. Collection is constrained by source availability and rate limits, while enrichment introduces processing latency and model failures. I separated these stages so collection does not depend on enrichment completing synchronously — records can be collected and persisted first, with enrichment handled independently through queued work. This separation also creates a path to retry processing and scale the enrichment workload without coupling it to collection.',
      },
      {
        title: 'Treat enrichment as a separate data layer',
        body: 'Model-generated insights are not the source data itself. They are derived outputs that can change as models, prompts and analysis methods evolve. I designed enrichment as a separate layer linked to the original record, making it possible to retain generated results alongside their metadata and explore how analysis evolves over time.',
      },
      {
        title: 'Design for changing data sources',
        body: 'Social data is not uniform across sources. A rigid schema that assumes every source has identical fields can make integrations unnecessarily expensive to maintain. The data model combines shared fields with flexible source-specific attributes, so source-specific data is retained while a common structure remains available for downstream analysis.',
      },
      {
        title: 'Build for analytical access',
        body: 'The dashboard needs to explore enriched records through filters, pagination and analytical queries rather than simply displaying collected data. The backend provides a dedicated API layer for the frontend, keeping data access and processing logic separate from presentation and interaction.',
      },
    ],
    decisions: [
      {
        title: 'Redis before introducing another messaging system',
        body: 'The prototype’s processing workload did not initially justify introducing a dedicated messaging infrastructure. Redis was already part of the stack, so using it for queued work reduced the number of moving parts while allowing collection and enrichment to remain separate. The queue abstraction also leaves room to introduce a more durable messaging system as the workload and reliability requirements evolve.',
      },
      {
        title: 'FastAPI for the Python processing layer',
        body: 'Collection, enrichment and model integrations are Python-oriented workloads. Rather than coupling those capabilities to the Next.js application, I used FastAPI as a separate service. This keeps the web application focused on presentation and interaction while giving the processing layer its own runtime and deployment boundary.',
      },
      {
        title: 'Separate source records from model-generated insights',
        body: 'Source data and model output have different lifecycles. Source records represent collected information, while enrichment represents an interpretation that may change with prompts, models or analysis methods. Keeping them logically separate provides a foundation for evolving the analytical layer without treating every new model output as a replacement for the original data.',
      },
      {
        title: 'Normalisation without losing source-specific data',
        body: 'A shared data model makes downstream processing and analysis easier, but source-specific fields can evolve independently. The design balances a common structure for analytical queries with flexibility for source-specific attributes, reducing the need to redesign the data model whenever an integration changes.',
      },
    ],
    outcomes: [
      'Built a prototype spanning collection, queued processing, AI enrichment, persistence and an analyst-facing interface.',
      'Established a separation between source records and derived analytical outputs.',
      'Designed a common data model intended to accommodate multiple data sources.',
      'Created an architecture with distinct backend, processing and frontend responsibilities.',
    ],
    nextSteps: [
      'Introduce more durable queue processing — evaluate a broker with durable delivery, consumer groups and recovery mechanisms as processing volume and reliability requirements increase.',
      'Build an evaluation pipeline for AI enrichment — create a labelled dataset and evaluation harness to measure the quality of sentiment, topic and entity extraction before changing models or prompts.',
      'Expand analytical capabilities — introduce deeper trend analysis, topic clustering, audience insights and temporal comparisons to move beyond individual enriched records.',
      'Improve observability and operational resilience — add processing metrics, structured failure tracking, retry visibility and monitoring across collection and enrichment.',
      'Validate the product with real users — use the prototype to explore analytical workflows and validate whether the insights generated are useful for creators, marketers and businesses.',
    ],
  },
  {
    slug: 'aws-infrastructure-automation',
    caseStudy: true,
    title: 'AWS Infrastructure Automation',
    subtitle: 'Terraform-provisioned infrastructure and container deployment',
    year: '2025',
    status: 'Production',
    domains: ['Cloud', 'Infrastructure'],
    summary:
      'Automated AWS infrastructure and container deployment with Terraform.',
    intro:
      'I implemented infrastructure provisioning and container deployment workflows using Terraform and AWS container services. By integrating infrastructure configuration, container builds and deployment automation, the workflow made cloud environments more reproducible and application delivery more consistent.',
    role: 'Platform Engineering — Terraform infrastructure, container build workflows and deployment automation.',
    stack: ['AWS', 'Terraform', 'Docker', 'Amazon ECS', 'Amazon ECR', 'GitHub Actions'],
    featured: true,
    diagram: 'infra-pipeline',
    architectureIntro:
      'The delivery workflow, from a change in the development environment through controlled integration to production across a multi-cloud environment.',
    confidentialityNote:
      'Due to internal company confidentiality, source code, repository access and certain implementation details are not publicly disclosed. This case study presents a sanitized overview of the engineering work.',
    flow: [
      {
        label: 'Development',
        phase: 'Develop',
        detail:
          'Changes are introduced and validated within the development environment / prefix before progressing through the integration workflow.',
      },
      {
        label: 'Feature Branch',
        phase: 'Develop',
        detail: 'Changes are pushed to a feature branch, establishing an isolated path for integration and review.',
      },
      {
        label: 'CI Validation',
        phase: 'Integrate',
        detail:
          'Opening a Pull Request triggers CI checks to validate the proposed changes before they can be merged.',
      },
      {
        label: 'Review & Merge',
        phase: 'Integrate',
        detail:
          'Successful CI validation and required PR approval gate the merge, providing a controlled integration process.',
      },
      {
        label: 'Continuous Delivery',
        phase: 'Deliver',
        detail: 'The merge triggers the CD workflow, initiating the production delivery process.',
      },
      {
        label: 'Production',
        phase: 'Deliver',
        detail:
          'Changes are deployed through the production delivery pipeline across the relevant services and infrastructure within the multi-cloud environment.',
      },
    ],
    problem: [
      'Infrastructure managed through manual changes becomes difficult to reproduce and maintain consistently across environments. Changes made directly through the console can introduce configuration drift and leave infrastructure decisions outside version control.',
      'Mutable container tags make it difficult to reliably identify the image running in a service or associate a deployment with a specific source revision.',
      'Unstructured permission changes can also make access policies harder to audit, maintain and consistently enforce.',
    ],
    approach: [
      {
        title: 'Composable Terraform modules with explicit interfaces',
        body: 'Infrastructure components are separated into reusable Terraform modules with defined inputs and outputs. Environment-level configurations compose these modules, allowing infrastructure to be managed through a consistent configuration rather than duplicated definitions.',
      },
      {
        title: 'Remote state and concurrency control',
        body: 'Terraform state is maintained remotely, with locking to prevent concurrent infrastructure operations from conflicting. This provides a centralized state reference for infrastructure management.',
      },
      {
        title: 'Immutable, commit-addressed container images',
        body: 'Container images are versioned using commit identifiers, enabling deployments to reference specific build artifacts instead of relying on mutable tags. This improves deployment traceability and supports version-based rollback workflows.',
      },
      {
        title: 'Workload-specific IAM permissions',
        body: 'IAM roles and policies are scoped to individual workloads where applicable, separating application permissions from infrastructure execution permissions. Infrastructure-managed policies make permission changes easier to review and track.',
      },
      {
        title: 'Health-validated deployments',
        body: 'Deployment health checks validate service readiness during rollout. Where deployment rollback mechanisms are configured, unsuccessful deployments can be prevented from replacing healthy service revisions.',
      },
    ],
    decisions: [
      {
        title: 'ECS over Kubernetes',
        body: 'ECS provides container orchestration through AWS-native services without introducing the additional operational complexity of maintaining a Kubernetes control plane and its surrounding ecosystem. For the workloads and operational requirements involved, it offered a simpler deployment model.',
      },
      {
        title: 'Terraform over CloudFormation or CDK',
        body: 'Terraform provides declarative infrastructure definitions, reusable modules and plan-based visibility into infrastructure changes. This supports reviewable infrastructure changes and a consistent provisioning workflow.',
      },
      {
        title: 'Multi-stage Docker builds',
        body: 'Multi-stage builds separate build-time dependencies from the runtime image, helping reduce the size and unnecessary contents of deployment artifacts.',
      },
    ],
    outcomes: [
      'Reproducible infrastructure — infrastructure configuration provides a version-controlled foundation for provisioning and managing cloud environments.',
      'Deployment traceability — versioned container artifacts make it easier to associate running workloads with specific builds and source revisions.',
      'Reviewable infrastructure changes — infrastructure and configuration changes can be managed through version control and reviewed as part of the engineering workflow.',
    ],
    nextSteps: [
      'Policy-as-code enforcement — integrate policy checks into the Terraform pipeline to automatically detect non-compliant infrastructure configurations before deployment.',
      'Infrastructure-level observability — extend Terraform modules to provision standardized service dashboards, metrics and alarms, making observability part of the infrastructure definition.',
    ],
  },
  {
    slug: 'data-engineering-analytics',
    caseStudy: true,
    title: 'Data Engineering & Analytics',
    subtitle: 'Iceberg tables on S3 with serverless SQL and dashboard consumption',
    year: '2024 - 2025',
    status: 'Production',
    domains: ['Data', 'Analytics'],
    summary:
      'Building analytical datasets on an open lakehouse architecture.',
    intro:
      'I built data pipelines and analytical data layers using Apache Iceberg on Amazon S3, enabling SQL-based analysis through Athena and dashboard consumption through QuickSight. The architecture combines open table formats, scalable storage and serverless querying to support structured analytical workflows.',
    role: 'Data Engineering — ingestion, data modelling, table design, query layer and analytical consumption.',
    stack: [
      'Python',
      'SQL',
      'Apache Iceberg',
      'Amazon S3',
      'Amazon Athena',
      'AWS Glue Data Catalog',
      'Amazon QuickSight',
    ],
    featured: true,
    diagram: 'lakehouse',
    flow: [
      {
        label: 'Ingest',
        detail:
          'Data ingestion processes collect source data and land it in Amazon S3, establishing the foundation for downstream processing and analytics.',
      },
      {
        label: 'Model',
        detail:
          'Transformation workflows organize the data into structured Apache Iceberg tables, creating analytical datasets suited to downstream consumption.',
      },
      {
        label: 'Catalog',
        detail:
          'AWS Glue Data Catalog manages table metadata, enabling supported analytical services to discover and access the datasets.',
      },
      {
        label: 'Query',
        detail:
          'Amazon Athena enables SQL-based analysis directly against the data stored in Amazon S3 through the table and catalog integration.',
      },
      {
        label: 'Present',
        detail:
          'Amazon QuickSight consumes prepared analytical datasets to power dashboards and reporting, separating analytical presentation from the underlying ingestion workflows.',
      },
    ],
    problem: [
      'Data stored as files in object storage does not inherently provide the transactional and table-management capabilities required for reliable analytical workloads. Managing data directly through file-based layouts introduces challenges around consistency, metadata, concurrent operations and table evolution.',
      'As analytical datasets evolve, schema changes need to be managed without unnecessarily rewriting historical data or compromising downstream consumption.',
      'Query performance and cost also depend on how datasets are organized and how analytical workloads access the underlying data. Poor data layout and inefficient query patterns can increase scan volume and processing costs.',
    ],
    approach: [
      {
        title: 'Apache Iceberg as the table layer',
        body: 'Apache Iceberg provides table-level capabilities such as atomic commits, schema evolution and snapshot-based data management. It enables analytical datasets to evolve while maintaining a structured and consistent table abstraction over object storage.',
      },
      {
        title: 'Layered data architecture',
        body: 'Data processing is organized into distinct layers to separate ingestion, transformation and analytical consumption. This separation improves maintainability and makes datasets easier to manage for downstream workloads.',
      },
      {
        title: 'Query-aware table design',
        body: 'Table organization and partitioning strategies are designed around analytical access patterns to improve query efficiency and reduce unnecessary data scanning.',
      },
      {
        title: 'Reliable data processing',
        body: 'Ingestion and transformation workflows are designed to support repeatable processing and the management of evolving datasets, including corrections and data updates where applicable.',
      },
      {
        title: 'Table maintenance and lifecycle',
        body: 'Table maintenance considers the lifecycle of data files, metadata and snapshots to help sustain query efficiency and manage the operational overhead of analytical tables.',
      },
    ],
    decisions: [
      {
        title: 'Athena rather than a provisioned warehouse',
        body: 'Athena enables SQL-based analytical querying directly against data stored in Amazon S3 without requiring a continuously running query cluster. This provides a serverless query model suited to analytical workloads and integrates with the broader AWS data ecosystem.',
      },
      {
        title: 'Apache Iceberg over conventional file-based tables',
        body: 'Iceberg introduces a table abstraction with capabilities such as transactional commits, schema evolution and snapshot management. These capabilities improve the manageability and reliability of analytical datasets as they evolve.',
      },
      {
        title: 'Curated datasets for dashboard consumption',
        body: 'Separating data preparation from dashboard consumption provides a structured analytical layer. This reduces coupling between source ingestion and presentation and gives dashboards a more consistent dataset to consume.',
      },
    ],
    outcomes: [
      'Accessible analytical datasets — analytical data is accessible through SQL-based querying without requiring a traditional provisioned warehouse.',
      'Evolving data structures — the table architecture supports structured schema evolution and the management of analytical datasets over time.',
      'Separated analytical consumption — dashboards consume prepared datasets through a dedicated analytical layer, separating data preparation from presentation.',
    ],
    nextSteps: [
      'AI-ready analytical datasets — extend the curated data layer into ML-ready datasets with structured features, enriched signals and reusable data representations that support machine learning workflows and AI-driven insights.',
      'Data quality and observability — introduce automated data-quality checks and dataset freshness signals to establish greater confidence in the data consumed by downstream analytics and ML workloads.',
    ],
  },
  /**
   * REVIEW BEFORE PUBLISHING
   * Added from a partial brief. Still missing and deliberately not invented:
   *  - the full description (the source text ended mid-sentence)
   *  - technology tags  -> `stack` omitted, so no chips render
   *  - a confirmed date  -> `year` omitted, so no date renders
   * `caseStudy: false` means this renders as a card only: no /projects page,
   * no OG image and no sitemap entry. Fill the fields in and flip it to
   * `caseStudy: true` to promote it, which the type will then enforce.
   */
  {
    slug: 'wiz-remediation-bot',
    caseStudy: false,
    title: 'Wiz Remediation Bot',
    subtitle: 'Agentic AI · Security Automation',
    status: 'Prototype',
    domains: ['AI'],
    summary: 'An autonomous agent built to automate vulnerability remediation workflows using Wiz.',
    featured: true,
  },
  {
    slug: 'high-on-fitness',
    caseStudy: true,
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
  {
    slug: 'ai-augmented-software-development-platform',
    caseStudy: true,
    title: 'AI-Augmented Software Development Platform',
    subtitle: 'Jira-led planning, queued AI agents and shared repository intelligence.',
    year: '2026',
    status: 'In Development',
    domains: ['AI', 'Cloud'],
    summary:
      'A collaborative engineering platform designed to turn approved Jira stories into tested, reviewed software changes through coordinated AI agents and versioned repository knowledge.',
    intro:
      'A collaborative engineering platform designed to turn approved Jira stories into tested, reviewed software changes through coordinated AI agents and versioned repository knowledge. It is a team initiative at BMW TechWorks India and is currently being built; the description below separates what the architecture defines from what remains proposed.',
    role: 'Contributing engineer — backend workflows, agent orchestration and cloud infrastructure, as part of a wider team initiative.',
    stack: ['Python', 'AWS Lambda', 'Amazon SQS', 'DynamoDB', 'Amazon S3', 'GitHub', 'LLM Integration'],
    featured: false,
    diagram: 'request-pipeline',
    approachHeading: 'Platform breakdown',
    outcomesHeading: 'Design properties',
    prototypeNote:
      'This platform is under active development as a collaborative team initiative. It is described at the level of architecture and operating model only, and no claim is made about production adoption.',
    architectureIntro:
      'The delivery path, from an approved Jira story through queued agent work to a reviewed change. Human approval gates the start and the end.',
    confidentialityNote:
      'Due to internal company confidentiality, source code, repository access and certain implementation details are not publicly disclosed. This case study presents a sanitized overview of a collaborative engineering initiative, and does not represent work independently designed or owned by one person.',
    flow: [
      {
        label: 'Plan',
        phase: 'Human-led',
        detail:
          'Developers refine and approve stories in Jira. A scheduled intake picks up approved work rather than reacting to every change.',
      },
      {
        label: 'Specify',
        phase: 'Human-led',
        detail:
          'LLM-assisted refinement produces a specification revision. The revision is frozen and requires explicit human approval before anything downstream can act on it.',
      },
      {
        label: 'Dispatch',
        phase: 'Orchestrated',
        detail:
          'Amazon SQS routes approved work to role-specific queues - coding, testing, quality, review, dashboard generation and repository indexing.',
      },
      {
        label: 'Execute',
        phase: 'Orchestrated',
        detail:
          'Lambda-based orchestration and agent workers pick up tasks, consult repository knowledge and produce their expected outputs.',
      },
      {
        label: 'Verify',
        phase: 'Gated',
        detail:
          'Testing, quality checks and review run over the result. Repair attempts are bounded, and work that cannot be resolved escalates to a person.',
      },
      {
        label: 'Promote',
        phase: 'Gated',
        detail:
          'A change reaches controlled CI/CD promotion only after human approval. Nothing merges on an agent decision alone.',
      },
    ],
    problem: [
      'A story that has been approved by a team is still a long way from a reviewed change. The work in between - reading the right part of the codebase, writing the change, testing it, checking quality and getting it reviewed - is coordination work, and it is where most of the elapsed time goes.',
      'Handing that coordination to language models introduces its own problems. Model work is slow and occasionally wrong, so it cannot sit on the critical path of a developer waiting at a keyboard. It also needs an accurate view of the repository, because a confident change written against a stale understanding of the code is worse than no change at all.',
      'The platform exists to make that coordination explicit: a specification a human approved, queues that carry work between specialised agents, repository knowledge that knows which commit it describes, and approval gates at both ends.',
    ],
    approach: [
      {
        title: 'Architecture Overview',
        body: 'Planning and approval stay with developers in Jira, with LLM-assisted requirement refinement producing the specification that downstream work reads. Orchestration is centred on Amazon SQS: a Lambda-based orchestrator dispatches to role-specific queues for coding, testing, quality, review, dashboard generation and repository indexing, with agent workers consuming from them. DynamoDB holds operational state - what a task is, where it is and what happened to it - while Amazon S3 holds artifacts and versioned repository snapshots.',
      },
      {
        title: 'Operating Model',
        body: 'Specification refinement is developer-led: a revision is frozen and requires explicit human approval before any agent acts on it. Jira intake runs on a schedule rather than continuously, and approved work is dispatched through queues, with results handled the same way. Each agent has a defined responsibility and an expected output - a change, a test run, a quality result, a review. Testing, quality checks and review precede a final human approval. Repair attempts are bounded: an agent gets a limited number of passes at a failure, after which the task escalates to a person rather than looping.',
      },
      {
        title: 'Repository Intelligence',
        body: 'Agents read the codebase through a shared retrieval API rather than each holding their own view. A GitHub repository is indexed in three modes - an initial full pass, incremental updates as commits land, and periodic reconciliation to correct drift. Knowledge is commit-scoped, so a consumer can tell which revision its view describes, and a freshness check runs before coding begins. Retrieval covers semantic code and document search alongside a relationship graph and repository metadata. Indexing resolves to an explicit IndexReady or IndexFailed outcome, so downstream work never has to guess whether the index behind it is usable.',
      },
      {
        title: 'Implementation Boundaries',
        body: 'Operational state and repository knowledge are kept apart on purpose: DynamoDB owns task and workflow state, S3 owns artifacts and versioned snapshots, and rebuilding an index never disturbs in-flight work. Graph storage and semantic search are treated as implementation choices rather than fixed commitments, and are evaluated separately. Dashboard generation is standardised so reporting does not fork per team. Promotion through CI/CD stays controlled and human-approved. Repository permissions are scoped, secrets are excluded from anything indexed, and the rollout is phased rather than switched on wholesale.',
      },
    ],
    decisions: [
      {
        title: 'Semantic search backend (proposed)',
        body: 'Semantic code and document retrieval needs a vector store. S3 Vectors is under evaluation for this, which would keep retrieval close to the artifact and snapshot storage already in use. It is a proposed choice, not a settled one, and the retrieval API is defined so the backend can change without the agents noticing.',
      },
      {
        title: 'Relationship graph storage (proposed)',
        body: 'The relationship graph between code entities is a distinct access pattern from semantic search, and a graph store suits it better than either DynamoDB or a vector index. Amazon Neptune is the candidate under consideration. This remains proposed, and the graph is consumed through the same shared retrieval API.',
      },
      {
        title: 'Long-running orchestration (conditional)',
        body: 'Lambda covers dispatch and most agent work, but some sequences exceed what a single function invocation should carry. AWS Step Functions is the conditional answer for those paths - adopted where a workflow genuinely needs durable, long-running coordination rather than applied across the board.',
      },
      {
        title: 'Heavier execution environments (conditional)',
        body: 'Some agent work, particularly builds and test execution, can outgrow the Lambda execution model. CodeBuild or ECS execution is held as a conditional option for those workloads. Keeping it conditional avoids paying for a heavier runtime on tasks that do not need one.',
      },
    ],
    outcomes: [
      'Human approval gates both ends: no specification reaches an agent queue, and no change reaches promotion, without an explicit human decision.',
      'Operational state and repository knowledge sit in separate stores, so an index can be rebuilt or reconciled without touching in-flight task state.',
      'Repository knowledge is commit-scoped and freshness-checked, so an agent can establish whether its view of the code is current before writing against it.',
      'Failure is bounded rather than retried indefinitely - repair attempts are capped, and unresolved work escalates to a person.',
    ],
    nextSteps: [
      'Phased rollout — extend the platform one capability at a time rather than enabling the full agent set at once, so each queue and agent role can be assessed on its own.',
      'Settle the proposed components — evaluate the semantic search and relationship graph backends against real repository scale before committing to either.',
      'Evaluation for agent output — establish how coding, testing and review results are judged, so quality is measured rather than assumed.',
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

/** Only these generate a /projects/<slug> page, an OG image and a sitemap entry. */
export const caseStudies = projects.filter((p): p is CaseStudyProject => p.caseStudy)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getCaseStudy(slug: string): CaseStudyProject | undefined {
  return caseStudies.find((p) => p.slug === slug)
}

export const projectSlugs = caseStudies.map((p) => p.slug)
