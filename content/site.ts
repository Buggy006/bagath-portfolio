/**
 * ─────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for everything shown on the site.
 *
 *  Remaining [PLACEHOLDER]s: contact email, current-role start year.
 * ─────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Bagath Singh",
  nickname: "Buggy", // used for the nav wordmark
  role: "Software Engineer",

  tagline:
    "I build reliable data platforms and cloud infrastructure — Python, AWS, Terraform, and the pipelines in between.",

  // [PLACEHOLDER] contact email shown on the site
  email: "you@example.com",

  location: "Chennai, Tamil Nadu, India",

  social: {
    github: "https://github.com/Buggy006",
    linkedin: "https://www.linkedin.com/in/bagath-singh-40aba0216/",
    instagram: "https://www.instagram.com/_buggy.so_/",
  },
};

export const about = {
  heading: "About",
  paragraphs: [
    "I'm a software engineer at BMW TechWorks India, based in Chennai. Most recently I've been the founding engineer of an enterprise analytics platform — on it from the repository's very first commit, building the CI/CD, infrastructure, and conventions the whole team now ships on.",
    "My work spans the full platform: PySpark and Glue pipelines, Lambda automation, Step Function orchestration, and the Terraform + GitHub Actions foundations underneath — all on AWS, all as code. Four years in, I care most about systems that are observable, reproducible, and boring in the best way.",
    "Outside of work I train for an athletic, strong physique the same way I engineer: with a system. I'm building toward coaching others who want structure instead of guesswork.",
  ],
  facts: [
    { label: "Experience", value: "4+ years" },
    { label: "Focus", value: "Data Platforms & Cloud" },
    { label: "Based in", value: "Chennai, India" },
    { label: "Open to", value: "Interesting problems" },
  ],
};

export const skills = {
  heading: "What I work with",
  groups: [
    {
      title: "Languages & Data",
      icon: "code" as const,
      level: { label: "Intermediate", value: 0.6 },
      items: ["Python", "SQL", "PySpark", "Pandas", "Bash"],
    },
    {
      title: "AWS & Cloud",
      icon: "cloud" as const,
      level: { label: "Intermediate", value: 0.6 },
      items: ["Lambda", "Glue", "EMR", "Step Functions", "S3", "DynamoDB", "CloudWatch"],
    },
    {
      title: "Infrastructure as Code",
      icon: "layers" as const,
      level: { label: "Intermediate", value: 0.6 },
      items: ["Terraform", "GitHub Actions", "OIDC Deployments", "Docker", "Poetry", "Linux"],
    },
    {
      title: "Data Engineering",
      icon: "database" as const,
      level: { label: "Intermediate", value: 0.6 },
      items: ["ETL / ELT", "Apache Iceberg", "Spark Window Functions", "Data Lakes", "Pipeline Orchestration"],
    },
    {
      title: "Generative AI",
      icon: "sparkles" as const,
      level: { label: "Getting started", value: 0.25 },
      items: ["LLM APIs", "RAG Pipelines", "AI Agents", "Amazon Bedrock", "Prompt Engineering"],
    },
  ],
};

export const experience = {
  heading: "Experience",
  roles: [
    {
      company: "BMW TechWorks India",
      title: "Software Engineer — Data Platform",
      period: "2024 — Present", // [PLACEHOLDER] confirm start year
      points: [
        "Founding engineer of an enterprise analytics platform — first commit to production, owning the multi-environment CI/CD (GitHub Actions + OIDC) and Terraform standards the team builds on.",
        "Built PySpark Glue jobs delivering five Agile engineering metrics, orchestrated with AWS Step Functions.",
        "Automated Jira epic, story, and release workflows with a suite of four Lambdas.",
        "Resolved a production DLQ incident with incremental Apache Iceberg writes and measured memory tuning.",
      ],
    },
    {
      company: "BMW Group India",
      title: "Apprentice Trainee — IT Hub",
      period: "2022 — 2024",
      points: [
        "Supported IT hub operations end to end — employee data, internal tooling, and day-to-day management.",
        "Built early understanding of enterprise products and services.",
      ],
    },
  ],
};

export const projects = {
  heading: "Selected work",
  items: [
    {
      title: "Enterprise Analytics Platform",
      description:
        "Founding engineer on a BMW data platform: multi-environment CI/CD with OIDC, a PySpark metrics suite, Jira automation Lambdas, and Step Function orchestration. Private codebase — happy to talk through the architecture.",
      tags: ["PySpark", "Glue", "Lambda", "Terraform"],
      link: "", // private — renders without an external link
    },
    {
      title: "Serverless Infrastructure Setup",
      description:
        "Event-driven serverless architecture on AWS — Lambda, S3, and IAM provisioned end-to-end as code.",
      tags: ["AWS", "Terraform", "Serverless"],
      link: "https://github.com/Buggy006/Serveless-Infrastructure-Setup",
    },
    {
      title: "This Website",
      description:
        "Next.js static site served from S3 behind CloudFront — infrastructure written in Terraform, deployed by GitHub Actions.",
      tags: ["Next.js", "AWS", "Terraform", "CI/CD"],
      link: "https://github.com/Buggy006/bagath-portfolio",
    },
  ],
};

export const fitness = {
  label: "Beyond code",
  construction: "Under construction",
  heading: "Engineering meets fitness",
  body: "I'm training for an athletic, strong physique the way I build software: with a system — progressive overload, tracked metrics, honest iteration. Coaching is on the way, for engineers and busy professionals who want structure instead of guesswork.",
  status: "Coaching — coming soon",
  cta: {
    text: "Join the waitlist",
    subject: "Fitness coaching waitlist",
  },
};

export const contact = {
  heading: "Let's talk",
  body: "Whether it's a role, a project, or just comparing notes on data platforms — my inbox is open.",
};

/* ─────────────────────────────────────────────────────────────────
 *  PERSONA SWITCH
 *  The hero toggle flips the site between the two profiles below.
 *  Athlete copy marked [PLACEHOLDER] is drafted — replace with your
 *  real story, numbers, and photos when ready.
 * ───────────────────────────────────────────────────────────────── */

export const personaHero = {
  engineer: {
    roleLine: "Software Engineer · Data & Cloud",
    tagline: site.tagline,
    strip: ["python", "aws", "terraform", "data-eng", "devops", "gen-ai"],
    primaryCta: { label: "See my work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    socials: ["github", "linkedin"] as const,
  },
  athlete: {
    roleLine: "Athlete · Strength & Systems",
    // [PLACEHOLDER] athlete positioning line
    tagline:
      "I'm building an athletic, strong physique with the discipline of an engineer — programmed, tracked, iterated. Coaching coming soon.",
    strip: ["strength", "conditioning", "nutrition", "recovery", "consistency"],
    primaryCta: { label: "See the system", href: "#system" },
    secondaryCta: { label: "Join the waitlist", href: "#coaching" },
    socials: ["instagram", "linkedin"] as const,
  },
};

export const navLinks = {
  engineer: [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#fitness", label: "Fitness" },
    { href: "#contact", label: "Contact" },
  ],
  athlete: [
    { href: "#story", label: "Story" },
    { href: "#system", label: "System" },
    { href: "#coaching", label: "Coaching" },
    { href: "#engineering", label: "Engineering" },
    { href: "#contact", label: "Contact" },
  ],
};

export const athleteStory = {
  heading: "My story",
  // [PLACEHOLDER] your real training story
  paragraphs: [
    "I stopped training on motivation a while ago. What replaced it is the same thing that runs my engineering: a program, a log, and progress I can measure instead of argue with.",
    "The goal is an athletic, strong physique — strength work at the core, conditioning that keeps me moving like an athlete, and nutrition that's tracked without being obsessive.",
    "The next chapter is coaching: putting the system that changed my own training into the hands of people who want results without guesswork.",
  ],
  facts: [
    { label: "Training for", value: "Athletic strength" },
    { label: "Approach", value: "Systems over motivation" },
    { label: "Based in", value: "Chennai, India" },
    { label: "Coaching", value: "Waitlist open" },
  ],
};

export const trainingSystem = {
  heading: "The system",
  pillars: [
    {
      title: "Strength",
      icon: "dumbbell" as const,
      items: ["Progressive overload", "Compound-first programming", "Every session logged"],
    },
    {
      title: "Conditioning",
      icon: "heart" as const,
      items: ["Athletic carryover", "Zone 2 base + intervals", "Work capacity blocks"],
    },
    {
      title: "Nutrition",
      icon: "utensils" as const,
      items: ["Protein-anchored meals", "Calorie phases, not fads", "80/20 whole foods"],
    },
    {
      title: "Recovery",
      icon: "moon" as const,
      items: ["Sleep treated like training", "Planned deloads", "Mobility that earns its minutes"],
    },
  ],
};

export const coaching = {
  heading: "Work with me",
  status: "Coaching — coming soon",
  // [PLACEHOLDER] refine the offer as it takes shape
  body: "When coaching launches, it will bring the same structure to your training that I bring to production systems: an honest assessment, a program built around your life, and weekly iteration until it works.",
  offers: [
    {
      title: "Personalized programming",
      description: "A plan built for your body, schedule, and equipment — not a template.",
    },
    {
      title: "Nutrition frameworks",
      description: "Simple, protein-anchored structure that survives a busy work week.",
    },
    {
      title: "Weekly check-ins",
      description: "Reviewed logs, honest course corrections, and accountability that sticks.",
    },
  ],
  cta: {
    text: "Join the waitlist",
    subject: "Fitness coaching waitlist",
  },
};

export const engineerTeaser = {
  label: "The other system",
  heading: "I also build data platforms",
  body: "By day I'm a software engineer at BMW TechWorks India — Python, AWS, Terraform, and pipelines that don't wake anyone up at night.",
  cta: "See the engineering side",
};
