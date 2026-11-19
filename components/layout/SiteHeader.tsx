'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems, siteConfig } from '@/content/site'
import { cn } from '@/lib/utils'
import { DURATION, EASE_EDITORIAL } from '@/lib/motion'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()

  // Close the mobile sheet on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-editorial',
        scrolled ? 'border-b border-hairline bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="shell flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-display text-lg tracking-tight"
          aria-label={`${siteConfig.name} - home`}
        >
          <span className="text-bone">{siteConfig.name}</span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal transition-transform duration-200 group-hover:scale-150" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm transition-colors duration-200',
                    isActive(item.href) ? 'text-bone' : 'text-muted hover:text-bone',
                  )}
                >
                  {isActive(item.href) ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-bone/[0.07]"
                      transition={reduced ? { duration: 0 } : { duration: DURATION.nav, ease: EASE_EDITORIAL }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-bone transition-colors hover:text-signal md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? DURATION.reduced : 0.28, ease: EASE_EDITORIAL }}
            className="border-t border-hairline bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="shell py-6">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: reduced ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.03 * i, duration: DURATION.nav, ease: EASE_EDITORIAL }}
                    className="border-b border-hairline last:border-0"
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between py-4 font-display text-xl tracking-tight',
                        isActive(item.href) ? 'text-signal' : 'text-bone',
                      )}
                    >
                      {item.label}
                      <span className="label text-[0.625rem]">{String(i + 1).padStart(2, '0')}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
