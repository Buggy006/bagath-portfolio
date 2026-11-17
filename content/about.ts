/** Narrative content for the About page. */

export const aboutIntro = [
  'I am an engineer who works across the three layers most teams keep separate: the infrastructure a system runs on, the data it accumulates, and the models that make that data useful. I find the interesting problems live in the seams between them.',
  'Most of what I build starts the same way - something works on a laptop, and the real work is making it survive being run twice, deployed by someone else, and queried a year later by a person who was not there when it was written.',
]

export const journey: { period: string; title: string; body: string }[] = [
  {
    period: 'Starting out',
    title: 'Building things end to end',
    body: 'I learned by shipping whole applications rather than slices of them - front end, API, database, deployment. Owning every layer taught me early that most production problems are not in any one of them, they are at the boundaries: a schema that assumed one writer, a deploy that assumed one environment, a cache that assumed data never changed.',
  },
  {
    period: 'Cloud & platform',
    title: 'Making environments reproducible',
    body: 'Hand-built infrastructure is the fastest way to a system nobody fully understands. Moving to Terraform changed how I think about operations: every change becomes a reviewable diff, every environment becomes recreatable, and the question "why is staging different" becomes answerable. Containers and commit-addressed images finished the picture - a running service can always be traced back to a specific line of source.',
  },
  {
    period: 'Data engineering',
    title: 'Treating tables as a contract',
    body: 'Analytics work pushed me toward open table formats. Apache Iceberg on S3 gives atomic commits, schema evolution and snapshot reads - which means a pipeline can be re-run, a column can be added, and a reader never sees a half-written partition. Once the storage layer is trustworthy, the rest of analytics becomes ordinary SQL.',
  },
  {
    period: 'Applied AI',
    title: 'Models as components, not magic',
    body: 'Language models are slow, occasionally wrong and priced per call, which makes them an engineering problem before they are a product one. I build around that: enrichment runs asynchronously off a queue, output is written as versioned data linked to the prompt that produced it, and a bad response degrades one record instead of stalling a pipeline.',
  },
]

export const philosophy: { title: string; body: string }[] = [
  {
    title: 'Reproducible beats clever',
    body: 'If an environment cannot be destroyed and rebuilt from the repository, it is not understood - it is remembered. I would rather have infrastructure that is boring and recreatable than elegant and load-bearing on someone’s memory.',
  },
  {
    title: 'Make failure local',
    body: 'Most resilience comes from decomposition rather than redundancy. Separating collection from enrichment, or ingestion from transformation, means a failure damages one stage. Retry becomes cheap and recovery stops needing coordination.',
  },
  {
    title: 'Write data you can go back to',
    body: 'Raw input is written once and never edited. Derived output records how it was derived. That single habit turns a bug from a data-loss event into a replay, and makes it possible to compare a new approach against the old one instead of overwriting it.',
  },
  {
    title: 'Design for the query, not the diagram',
    body: 'Partition strategies, indexes and API shapes should follow observed access patterns. An architecture that looks balanced on a whiteboard and scans an entire table on every request is the wrong architecture.',
  },
  {
    title: 'The interface is part of the system',
    body: 'A pipeline nobody can query and a dashboard nobody trusts are both failures. I care about the last mile - fast rendering, accessible markup, honest labelling of what is a prototype and what is in production.',
  },
]

export const workingWith = [
  'I prefer small, reviewable changes and a plan written down before code.',
  'I document the decision, not just the outcome - the reason a trade-off was made outlives the code that implemented it.',
  'I would rather raise a disagreement early in a pull request than inherit it later as a production incident.',
  'I am comfortable owning something end to end, and equally comfortable being the person who makes someone else’s work deployable.',
]
