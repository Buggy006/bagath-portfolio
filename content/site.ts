/**
 * ─────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for everything shown on the site.
 *
 *  Every value marked [PLACEHOLDER] is sample content — replace it
 *  with your real details. No other file needs to change.
 * ─────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Bagath Singh",
  nickname: "Buggy", // used for the nav wordmark
  role: "Software Engineer",

  // [PLACEHOLDER] one-line positioning statement (hero + meta description)
  tagline:
    "I build reliable data platforms and cloud infrastructure — Python, AWS, Terraform, and the pipelines in between.",

  // [PLACEHOLDER] contact email shown on the site (kept out of mailto scrapers where possible)
  email: "you@example.com",

  location: "India", // [PLACEHOLDER]

  social: {
    github: "https://github.com/Buggy006",
    linkedin: "https://www.linkedin.com/in/your-handle", // [PLACEHOLDER]
    instagram: "", // [PLACEHOLDER] optional — empty string hides the icon
  },
};

export const about = {
  heading: "About",
  // [PLACEHOLDER] 2–3 short paragraphs. Keep it human, not a resume dump.
  paragraphs: [
    "I'm a software engineer focused on the layer where data meets infrastructure: designing pipelines that don't wake anyone up at night, and cloud platforms that teams can build on without thinking about them.",
    "My day-to-day toolkit is Python, AWS, and Terraform — used to ship everything from serverless data workflows to hardened production environments. I care about systems that are observable, reproducible, and boring in the best way.",
    "Outside of work I train seriously, and I'm building toward coaching others — bringing the same systems thinking to fitness that I bring to engineering.",
  ],
  // Quick facts rendered beside the paragraphs
  facts: [
    { label: "Experience", value: "X+ years" }, // [PLACEHOLDER]
    { label: "Focus", value: "Data, Cloud & Gen-AI" },
    { label: "Based in", value: "India" }, // [PLACEHOLDER]
    { label: "Open to", value: "Interesting problems" },
  ],
};

export const skills = {
  heading: "What I work with",
  groups: [
    {
      title: "Languages & Data",
      icon: "code" as const,
      items: ["Python", "SQL", "Pandas", "PySpark", "Bash"],
    },
    {
      title: "AWS & Cloud",
      icon: "cloud" as const,
      items: ["Lambda", "S3", "Glue", "ECS", "CloudFront", "IAM", "CloudWatch"],
    },
    {
      title: "Infrastructure as Code",
      icon: "layers" as const,
      items: ["Terraform", "Docker", "GitHub Actions", "CI/CD", "Linux"],
    },
    {
      title: "Data Engineering",
      icon: "database" as const,
      items: ["Airflow", "ETL / ELT", "Data Lakes", "Warehousing", "Streaming"],
    },
    {
      title: "Generative AI",
      icon: "sparkles" as const,
      items: ["LLM APIs", "RAG Pipelines", "AI Agents", "Amazon Bedrock", "Prompt Engineering"],
    },
  ],
};

export const experience = {
  heading: "Experience",
  // [PLACEHOLDER] most recent first
  roles: [
    {
      company: "Company Name",
      title: "Software Engineer — Data & Platform",
      period: "2023 — Present",
      points: [
        "Built and operated Python/AWS data pipelines processing X records per day.",
        "Provisioned production infrastructure with Terraform across multiple environments.",
        "Cut pipeline failure rate / cloud spend / build time by X% — pick a real win.",
      ],
    },
    {
      company: "Previous Company",
      title: "DevOps / Cloud Engineer",
      period: "2021 — 2023",
      points: [
        "Automated deployments with CI/CD, taking releases from hours to minutes.",
        "Hardened Linux servers and web infrastructure (SSL, firewalld, security headers).",
      ],
    },
  ],
};

export const projects = {
  heading: "Selected work",
  // [PLACEHOLDER] 3–4 projects with real links. Delete or add entries freely.
  items: [
    {
      title: "Serverless Infrastructure Setup",
      description:
        "Event-driven serverless architecture on AWS — Lambda, S3, and IAM provisioned end-to-end as code.",
      tags: ["AWS", "Terraform", "Serverless"],
      link: "https://github.com/Buggy006/Serveless-Infrastructure-Setup",
    },
    {
      title: "Data Pipeline Project",
      description:
        "A production-style ETL pipeline: ingestion, validation, transformation, and warehouse loading with full observability.",
      tags: ["Python", "Airflow", "Data Engineering"],
      link: "https://github.com/Buggy006", // [PLACEHOLDER]
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
  heading: "Engineering meets fitness",
  // [PLACEHOLDER] your actual fitness story — lifting? running? transformation?
  body: "Training is the other system I build. The same principles that make software reliable — consistency, measurement, iteration — are what make training work. I'm putting together a coaching practice to help other engineers and busy professionals get strong without guesswork.",
  status: "Coaching — coming soon",
  cta: {
    text: "Join the waitlist",
    // Waitlist is a pre-filled email for now; swap for a form/service later.
    subject: "Fitness coaching waitlist",
  },
};

export const contact = {
  heading: "Let's talk",
  body: "Whether it's a role, a project, or just comparing notes on data platforms — my inbox is open.",
};
