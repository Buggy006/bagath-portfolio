import Image from "next/image";
import {
  Apple,
  Dumbbell,
  Flame,
  HeartPulse,
  Moon,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { Persona } from "./persona";

/**
 * Floating hero cluster (desktop only). Engineer mode uses the real
 * 2D brand logos (devicon SVGs committed under public/logos/); the
 * two AI concepts keep colored glyphs — no official marks exist.
 * Athlete mode keeps colored concept icons (fitness has no logos).
 * Presentation data lives here, not in content/site.ts.
 */

type Floater = {
  img?: { src: string; alt: string };
  lucide?: LucideIcon;
  color?: string;
  size: number;
  top: string;
  left: string;
  dur: string;
  delay: string;
  rot: string;
};

const floaters: Record<Persona, Floater[]> = {
  engineer: [
    // Python is the anchor element — largest, mid-cluster
    { img: { src: "/logos/python.svg", alt: "Python" }, size: 88, top: "24%", left: "77%", dur: "7s", delay: "0s", rot: "-6deg" },
    { img: { src: "/logos/aws.svg", alt: "AWS" }, size: 76, top: "12%", left: "60%", dur: "8s", delay: "1.2s", rot: "5deg" },
    { img: { src: "/logos/agile.svg", alt: "Agile" }, size: 42, top: "10%", left: "71%", dur: "7.6s", delay: "2.4s", rot: "8deg" },
    { img: { src: "/logos/terraform.svg", alt: "Terraform" }, size: 44, top: "15%", left: "87%", dur: "6.4s", delay: "0.7s", rot: "-12deg" },
    { img: { src: "/logos/ubuntu.svg", alt: "Ubuntu" }, size: 44, top: "33%", left: "90%", dur: "6.6s", delay: "1.7s", rot: "-9deg" },
    { img: { src: "/logos/genai.svg", alt: "Generative AI" }, size: 96, top: "40%", left: "55%", dur: "8.8s", delay: "0.5s", rot: "-7deg" },
    { img: { src: "/logos/git.svg", alt: "Git" }, size: 46, top: "52%", left: "91%", dur: "6.8s", delay: "0.3s", rot: "10deg" },
    { img: { src: "/logos/lambda.svg", alt: "AWS Lambda" }, size: 50, top: "58%", left: "72%", dur: "7.2s", delay: "1.0s", rot: "7deg" },
    { img: { src: "/logos/docker.svg", alt: "Docker" }, size: 56, top: "64%", left: "61%", dur: "7.4s", delay: "1.8s", rot: "-8deg" },
    { img: { src: "/logos/glue.svg", alt: "AWS Glue" }, size: 46, top: "78%", left: "68%", dur: "7.8s", delay: "1.4s", rot: "6deg" },
    { img: { src: "/logos/devops.svg", alt: "DevOps" }, size: 60, top: "84%", left: "82%", dur: "8.2s", delay: "0.9s", rot: "5deg" },
  ],
  athlete: [
    { lucide: Dumbbell, color: "#B45309", size: 88, top: "22%", left: "74%", dur: "7s", delay: "0s", rot: "-10deg" },
    { lucide: HeartPulse, color: "#EF4444", size: 48, top: "38%", left: "88%", dur: "6s", delay: "0.9s", rot: "8deg" },
    { lucide: Apple, color: "#22C55E", size: 40, top: "8%", left: "59%", dur: "8s", delay: "1.5s", rot: "12deg" },
    { lucide: Timer, color: "#0284C7", size: 42, top: "56%", left: "62%", dur: "6.4s", delay: "0.5s", rot: "-8deg" },
    { lucide: Flame, color: "#F97316", size: 46, top: "76%", left: "78%", dur: "7.6s", delay: "2.2s", rot: "6deg" },
    { lucide: Trophy, color: "#EAB308", size: 44, top: "12%", left: "86%", dur: "8.4s", delay: "1.1s", rot: "-12deg" },
    { lucide: Moon, color: "#6366F1", size: 36, top: "66%", left: "92%", dur: "5.8s", delay: "0.3s", rot: "10deg" },
  ],
};

export function Floaters({ persona }: { persona: Persona }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      {floaters[persona].map((f, i) => {
        const style = {
          top: f.top,
          left: f.left,
          "--dur": f.dur,
          "--delay": f.delay,
          "--rot": f.rot,
        } as React.CSSProperties;

        return (
          <span key={i} className="floater absolute" style={style}>
            {f.img ? (
              <Image
                src={f.img.src}
                alt={f.img.alt}
                width={f.size}
                height={f.size}
                className="drop-shadow-sm"
              />
            ) : f.lucide ? (
              <f.lucide
                size={f.size}
                color={f.color}
                strokeWidth={2}
                className="drop-shadow-sm"
              />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}
