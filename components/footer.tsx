import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} {site.name}
        </p>
        <a
          href="https://github.com/Buggy006/bagath-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-neutral-400 transition-colors hover:text-neutral-600"
        >
          Next.js · S3 + CloudFront · Terraform
        </a>
      </div>
    </footer>
  );
}
