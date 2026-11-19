/** Narrative content for the About page. */

export const aboutIntro = [
  'I’m a software engineer interested in how infrastructure, data and intelligent systems come together to solve real problems. My work spans cloud platforms, data engineering and AI-powered applications - from building the infrastructure behind a system to designing the data pipelines and services that make it useful.',
  'I enjoy working across boundaries, understanding how the pieces connect, and turning ideas into systems that are practical, reliable and maintainable.',
]

export const journeyIntro =
  'My journey has been shaped by building, operating and improving software systems. Each stage introduced a new layer of engineering — from full-stack development to cloud infrastructure, data platforms and AI-powered applications.'

export const journey: { period: string; title: string; body: string }[] = [
  {
    period: 'Starting out',
    title: 'Building applications end to end',
    body: 'I started by building complete applications across frontend interfaces, APIs, databases and deployment. Working across the entire stack helped me understand how individual engineering decisions affect the system as a whole.',
  },
  {
    period: 'Cloud & Platform Engineering',
    title: 'Making infrastructure reproducible',
    body: 'As my work moved toward cloud infrastructure, I became interested in how systems are provisioned, deployed and operated reliably. Working with AWS, Terraform, Docker and CI/CD introduced me to Infrastructure as Code, automated delivery and the importance of reproducible environments.',
  },
  {
    period: 'Data Engineering',
    title: 'Turning data into reliable analytical systems',
    body: 'Working with Python, SQL, Apache Iceberg, Athena and QuickSight expanded my focus toward data platforms. I became interested in how data is ingested, modelled, transformed and made accessible for analytical workloads — while keeping reliability, schema evolution and downstream consumption in mind.',
  },
  {
    period: 'Applied AI',
    title: 'Building intelligent systems that work in practice',
    body: 'My current exploration extends into LLM-powered applications, agent workflows and MCP integrations. I’m interested in making AI useful within real engineering systems, where orchestration, tool integration, reliability and failure handling matter as much as the model itself.',
  },
]

export const philosophyIntro =
  'These are concepts I’ve learned through software engineering, cloud infrastructure, data platforms and building applications. They influence how I approach architecture, code quality, testing, maintainability and delivery.'

/** `category` is the small label above each principle; the number comes from order. */
export const philosophy: { category: string; title: string; body: string }[] = [
  {
    category: 'Design',
    title: 'Object-Oriented Design & SOLID',
    body: 'Model software around clear responsibilities and well-defined interfaces. I value encapsulation, abstraction and composition to make systems easier to extend, test and maintain.',
  },
  {
    category: 'Simplicity',
    title: 'YAGNI: You Aren’t Gonna Need It',
    body: 'Build for the requirements that exist today, not hypothetical future complexity. Avoid premature abstraction and unnecessary features. Let real requirements guide architectural evolution.',
  },
  {
    category: 'Maintainability',
    title: 'DRY: Don’t Repeat Yourself',
    body: 'Avoid duplicating business logic and knowledge across a system. Extract shared functionality when it represents a genuine common responsibility, without creating abstractions that make the code harder to understand.',
  },
  {
    category: 'Architecture',
    title: 'Modularity, Low Coupling & High Cohesion',
    body: 'Break systems into components with focused responsibilities and explicit interfaces. Minimize unnecessary dependencies so individual components can evolve, fail and be tested independently.',
  },
  {
    category: 'Quality engineering',
    title: 'Test-Driven Development & Automated Testing',
    body: 'Treat tests as part of the design process, not an afterthought. Writing tests around expected behavior helps establish clear contracts, catch regressions early and make refactoring safer. I value automated testing as a foundation for reliable software.',
  },
  {
    category: 'Delivery',
    title: 'DORA: Measuring Engineering Performance',
    body: 'Software engineering doesn’t end when code is merged. I value measuring delivery through deployment frequency, lead time for changes, change failure rate and failed deployment recovery time to understand how effectively teams deliver and operate software.',
  },
]

export const workingWithIntro = 'I value clear communication, thoughtful engineering and steady progress.'

export const workingWith = [
  'I prefer small, reviewable changes over large, difficult-to-understand implementations.',
  'I document the reasoning behind technical decisions, not just the final outcome.',
  'I believe disagreements are best addressed early through constructive discussion and code review.',
  'I enjoy taking ownership of problems end to end, while also helping teammates make their work easier to integrate, maintain and deploy.',
]

export const workingWithClosing = 'I value collaboration, curiosity and the willingness to keep learning.'
