"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#fitness", label: "Fitness" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur transition-shadow ${
        scrolled ? "border-b border-neutral-200" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          {site.nickname.toLowerCase()}
          <span className="text-blue-600">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-950"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="space-y-1 border-b border-neutral-200 bg-white px-6 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-neutral-600 hover:text-neutral-950"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
