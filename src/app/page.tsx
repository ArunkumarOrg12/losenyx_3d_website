"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScrollSequence } from "@/components/hero-scroll-sequence";
import { AboutScrollSequence } from "@/components/about-scroll-sequence";

gsap.registerPlugin(ScrollTrigger);

const railLinks = [
  { id: "hero-scroll-container", number: "01", label: "Home" },
  { id: "about", number: "02", label: "About" },
  { id: "team", number: "03", label: "Team" },
  { id: "services", number: "04", label: "Services" },
  { id: "certifications", number: "05", label: "Certs" },
  { id: "contact", number: "06", label: "Contact" },
];

const badges = ["Problem Solver", "Systems Thinker", "Security Focused"];

const team = [
  {
    name: "Arun Kumar",
    role: "Founder / Security Engineer",
    expertise: "Threat detection, secure systems design, full-stack delivery.",
    initials: "AK",
  },
  {
    name: "Nisha Rao",
    role: "Automation Specialist",
    expertise: "Python pipelines, internal tooling, process hardening.",
    initials: "NR",
  },
  {
    name: "Rahul Sen",
    role: "Cloud Infrastructure Lead",
    expertise: "Container orchestration, CI/CD, observability, cloud resilience.",
    initials: "RS",
  },
];

const services = [
  {
    title: "Network Security",
    desc: "Segmentation, firewall strategy, monitoring, and traffic defense for modern environments.",
    glyph: "NS",
  },
  {
    title: "Ethical Hacking",
    desc: "Practical assessments, attack-surface reviews, and exploit-driven validation.",
    glyph: "EH",
  },
  {
    title: "Automation Solutions",
    desc: "Scripts and systems that remove repetitive work and tighten operational control.",
    glyph: "AS",
  },
  {
    title: "Full Stack Development",
    desc: "Secure products and dashboards built with performance, reliability, and clarity in mind.",
    glyph: "FS",
  },
  {
    title: "DevOps & Cloud",
    desc: "Release pipelines, infrastructure workflows, and resilient deployment foundations.",
    glyph: "DC",
  },
];

const certifications = [
  {
    title: "Certified Ethical Hacker",
    org: "EC-Council",
    year: "2024",
  },
  {
    title: "CompTIA Security+",
    org: "CompTIA",
    year: "2023",
  },
  {
    title: "AWS Cloud Practitioner",
    org: "Amazon Web Services",
    year: "2024",
  },
  {
    title: "Google Cybersecurity",
    org: "Google",
    year: "2025",
  },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#services", label: "Services" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
      <path d="M9 19c-4 1.2-4-2-6-2m12 4v-3.1a2.7 2.7 0 0 0-.8-2.1c2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C6.6 3.5 5.6 3.8 5.6 3.8a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 4.3 10c0 4.5 2.7 5.5 5.3 5.8a2.7 2.7 0 0 0-.8 2.1V21" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
      <path d="M4 4l16 16" />
      <path d="M19 4l-6.2 7.1L9 4H5l5.9 8.3L5 20h4l4.2-4.9L17 20h4l-6.1-8.6L23 4z" />
    </svg>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRailId, setActiveRailId] = useState(railLinks[0].id);
  const activeRailIndex = railLinks.findIndex((link) => link.id === activeRailId);

  // ── Hero text scroll animation (GSAP) ───────────────────
  useEffect(() => {
    const heroContainer = document.getElementById("hero-scroll-container");
    const heroPinned = document.getElementById("hero-pinned-content");
    if (!heroContainer || !heroPinned) return;

    const ctx = gsap.context(() => {
      // Create a timeline that spans the 350vh container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Small scrub for smooth text changes
        },
      });

      // text-1: label
      // text-2: "SECURING SYSTEMS."
      // text-3: "TRACKING THREATS."
      // text-4: last line + paragraph
      // text-5: CTA button

      // Texts animate IN sequentially as user scrolls — they stay visible once shown.
      tl.to("[data-hero-text-1], [data-hero-text-2]", { opacity: 1, y: 0, duration: 0.12, stagger: 0.06 }, 0)
        .to("[data-hero-text-3]",                     { opacity: 1, y: 0, duration: 0.18 },               0.35)
        .to("[data-hero-text-4], [data-hero-text-5]", { opacity: 1, y: 0, duration: 0.18, stagger: 0.1 }, 0.65);
    });

    return () => ctx.revert();
  }, []);

  // ── About section scroll pin + text animation (GSAP) ─────────────────────────
  useEffect(() => {
    const aboutContainer = document.getElementById("about");
    const aboutPinned = document.getElementById("about-pinned-content");
    if (!aboutContainer || !aboutPinned) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
        },
      });

      tl.to("[data-about-text-1]", { opacity: 1, y: 0, duration: 0.12 }, 0)
        .to("[data-about-text-2]", { opacity: 1, y: 0, duration: 0.18 }, 0.2)
        .to("[data-about-text-3]", { opacity: 1, y: 0, duration: 0.18 }, 0.38)
        .to("[data-about-text-4]", { opacity: 1, y: 0, duration: 0.18 }, 0.56)
        .to("[data-about-text-5]", { opacity: 1, y: 0, duration: 0.18 }, 0.74)
        .to("[data-about-text-6]", { opacity: 1, y: 0, duration: 0.14 }, 0.9);
    });

    return () => ctx.revert();
  }, []);

  // ── Reveal animations for sections below hero ────────────────────────────────
  useEffect(() => {
    const scope = pageRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: index * 0.02,
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
          },
        );
      });

      gsap.to("[data-scroll-dot]", {
        y: 42,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
      });
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const updateActiveRail = () => {
      const viewportAnchor = window.scrollY + window.innerHeight * 0.42;
      let nextActiveId = railLinks[0].id;

      for (const link of railLinks) {
        const section = document.getElementById(link.id);
        if (!section) continue;

        if (section.offsetTop <= viewportAnchor) {
          nextActiveId = link.id;
        }
      }

      setActiveRailId((current) => (current === nextActiveId ? current : nextActiveId));
    };

    updateActiveRail();
    window.addEventListener("scroll", updateActiveRail, { passive: true });
    window.addEventListener("resize", updateActiveRail);

    return () => {
      window.removeEventListener("scroll", updateActiveRail);
      window.removeEventListener("resize", updateActiveRail);
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-x-clip bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,58,50,0.16),transparent_22%),linear-gradient(180deg,#05080d_0%,#05070b_52%,#040609_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,57,45,0.08),transparent_35%)]" />
      </div>

      <div className="fixed left-0 right-0 top-0 z-[70] border-b border-white/8 bg-[rgba(3,7,11,0.86)] backdrop-blur md:hidden h-20">
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <a href="#hero-scroll-container" className="pointer-events-auto flex items-center" aria-label="Go to home section">
            <div className="relative h-12 w-[84px] overflow-hidden">
              <Image
                src="/icon/losenyx vector white.svg"
                alt="Losenyx logo"
                width={1500}
                height={1500}
                className="absolute left-[-6px] top-[-15px] h-[68px] w-auto max-w-none opacity-95"
                priority
              />
            </div>
          </a>
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--color-line)] bg-black/50 text-white transition hover:border-[rgba(255,58,50,0.5)]"
          >
            <span className="sr-only">Toggle navigation menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={`block h-px w-5 bg-current transition ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-current transition ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-current transition ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`overflow-hidden border-t border-[var(--color-line)] bg-[rgba(3,7,11,0.96)] px-4 pb-4 transition-[max-height,opacity] duration-300 ${
            mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="grid gap-2 pt-4 text-[11px] uppercase tracking-[0.22em] text-white/70">
            <a
              href="#hero-scroll-container"
              onClick={() => setMobileMenuOpen(false)}
              className={`border border-white/8 bg-white/[0.03] px-4 py-3 transition hover:border-[rgba(255,58,50,0.35)] hover:text-white ${
                activeRailId === "hero-scroll-container" ? "text-[var(--color-accent)]" : ""
              }`}
            >
              Home
            </a>
            {navLinks.map((item) => {
              const sectionId = item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border border-white/8 bg-white/[0.03] px-4 py-3 transition hover:border-[rgba(255,58,50,0.35)] hover:text-white ${
                    activeRailId === sectionId ? "text-[var(--color-accent)]" : ""
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center border border-[var(--color-accent)] px-4 text-[10px] tracking-[0.22em] text-white transition hover:bg-[rgba(255,58,50,0.12)]"
            >
              Let&apos;s Connect
            </a>
          </nav>
        </div>
      </div>

      <div className="fixed inset-y-0 left-0 z-30 hidden w-[148px] xl:block">
        <div className="relative flex h-full flex-col overflow-hidden border-r border-white/8 bg-[linear-gradient(180deg,rgba(4,8,13,0.985),rgba(3,7,11,0.96))] shadow-[18px_0_40px_rgba(0,0,0,0.22)]">
          <div className="border-b border-white/6 px-8 pb-7 pt-9">
            <div className="flex justify-start">
              <div className="relative h-12 w-[84px] overflow-hidden">
                <Image
                  src="/icon/losenyx vector white.svg"
                  alt="Losenyx logo"
                  width={1500}
                  height={1500}
                  className="absolute left-[-6px] top-[-15px] h-[76px] w-auto max-w-none opacity-95"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="pointer-events-auto relative flex-1 px-8 py-9">
            <div className="space-y-8">
              {railLinks.map((item, index) => {
                const isActive = item.id === activeRailId;
                const isComplete = activeRailIndex > index;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative block min-h-[74px] pl-9"
                  >
                    {index < railLinks.length - 1 ? (
                      <>
                        <div className="absolute left-[11px] top-[22px] h-[calc(100%+1.9rem)] w-px bg-white/10" />
                        <div
                          className={`absolute left-[11px] top-[22px] h-[calc(100%+1.9rem)] w-px transition-colors duration-300 ${
                            isActive || isComplete ? "bg-[var(--color-accent)]" : "bg-transparent"
                          }`}
                        />
                      </>
                    ) : null}
                    <div
                      className={`absolute left-[6px] top-[12px] h-[11px] w-[11px] rounded-full border bg-[var(--color-bg)] transition-all duration-300 ${
                        isActive
                          ? "border-[var(--color-accent)] shadow-[0_0_0_3px_rgba(255,58,50,0.08),0_0_14px_rgba(255,58,50,0.45)]"
                          : isComplete
                            ? "border-[rgba(255,58,50,0.4)]"
                            : "border-white/25"
                      }`}
                    />
                    <p
                      className={`font-[family:var(--font-display)] text-[2.15rem] leading-none tracking-[0.04em] transition-colors duration-300 ${
                        isActive ? "text-[var(--color-accent)]" : "text-white/38 group-hover:text-white/70"
                      }`}
                    >
                      {item.number}
                    </p>
                    <p
                      className={`mt-2 text-[10px] uppercase tracking-[0.34em] transition-colors duration-300 ${
                        isActive ? "text-white/90" : "text-white/46 group-hover:text-white/72"
                      }`}
                    >
                      {item.label}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <main className="relative z-10 xl:ml-[148px]">
        <section id="hero-scroll-container" className="relative h-[350vh] border-b border-[var(--color-line)] bg-black">
          <div id="hero-pinned-content" className="sticky top-0 h-screen w-full overflow-hidden">
            <HeroScrollSequence triggerSelector="#hero-scroll-container" />
            
            <header className="pointer-events-none absolute left-0 right-0 top-0 z-50 mx-auto hidden w-full max-w-[1460px] flex-wrap items-center justify-between gap-4 px-4 py-5 md:flex md:flex-nowrap md:px-8 lg:px-1 h-[14vh]">

              <nav className="pointer-events-auto order-3 hidden w-full gap-8 text-xs uppercase tracking-[0.24em] text-white/70 md:flex md:w-auto">
                <a
                  href="#hero-scroll-container"
                  className={`transition hover:text-white ${activeRailId === "hero-scroll-container" ? "text-[var(--color-accent)]" : ""}`}
                >
                  Home
                </a>
                {navLinks.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`transition hover:text-white ${activeRailId === sectionId ? "text-[var(--color-accent)]" : ""}`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
              <a
                href="#contact"
                className="pointer-events-auto order-2 hidden min-h-11 items-center justify-center border border-[var(--color-accent)] bg-black/30 px-4 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur transition hover:bg-[rgba(255,58,50,0.12)] sm:px-5 sm:text-[11px] md:order-3 md:inline-flex"
              >
                Let&apos;s Connect
              </a>
            </header>

            <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-center px-4 pt-20 sm:px-6 md:px-8 md:pt-0 lg:px-12">
              <div className="mx-auto w-full max-w-[1460px]">
                <p
                  data-hero-text-1
                  className="pointer-events-auto translate-y-10 opacity-0 text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)] sm:text-xs sm:tracking-[0.28em]"
                >
                  Securing the digital future
                </p>
                <h1 className="pointer-events-auto mt-5 max-w-[20ch] font-[family:var(--font-display)] text-[clamp(2.35rem,8vw,5.5rem)] leading-[0.92] tracking-[0.02em] text-white sm:mt-6">
                  <div data-hero-text-2 className="translate-y-10 opacity-0">SECURING SYSTEMS.</div>
                  <div data-hero-text-3 className="translate-y-10 opacity-0">
                    TRACKING <span className="text-[var(--color-accent)]">THREATS.</span>
                  </div>
                  <div data-hero-text-4 className="translate-y-10 opacity-0 font-[family:var(--font-display)]">BUILDING RESILIENT INFRASTRUCTURE.</div>
                </h1>
                <p
                  data-hero-text-4
                  className="pointer-events-auto mt-5 max-w-md translate-y-10 opacity-0 font-[family:var(--font-display)] text-sm leading-7 text-white/70 sm:mt-6 sm:text-base sm:leading-8"
                >
                  Cybersecurity enthusiast & developer focused on building secure, scalable and intelligent systems.
                </p>

                <div
                  data-hero-text-5
                  className="pointer-events-auto mt-8 flex translate-y-10 flex-col gap-3 opacity-0 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
                >
                  <a
                    href="#about"
                    className="inline-flex min-h-12 w-full items-center justify-center bg-[linear-gradient(135deg,#ff5f4f,#b81510)] px-6 text-[11px] uppercase tracking-[0.24em] text-white shadow-[0_0_24px_rgba(255,58,50,0.28)] transition hover:scale-[1.02] sm:w-auto"
                  >
                    Explore Journey
                  </a>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-7 left-0 right-0 z-40 mx-auto flex w-full max-w-[1460px] items-end justify-between px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="pointer-events-auto hidden items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-white/42 lg:flex">
                <span>Scroll</span>
                <div className="relative h-14 w-px bg-white/12">
                  <div
                    data-scroll-dot
                    className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_14px_rgba(255,58,50,0.7)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About section: full-screen pinned scroll sequence (frames2) ─────── */}
        <section id="about" className="relative h-[350vh] border-b border-[var(--color-line)] bg-black">
          <div id="about-pinned-content" className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Full-screen canvas playing frames2 */}
            <AboutScrollSequence triggerSelector="#about" />

            {/* Section label badge — top-left */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-50 mx-auto flex w-full max-w-[1460px] items-start px-4 pt-6 sm:px-6 md:px-8 lg:px-12">
              <span className="inline-flex items-center gap-2 border border-[rgba(255,58,50,0.45)] bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_rgba(255,58,50,0.8)]" />
                02 — Identity
              </span>
            </div>

            {/* Overlay text content — reveals as user scrolls */}
            <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="mx-auto w-full max-w-[1460px]">
                <p
                  data-about-text-1
                  className="translate-y-10 opacity-0 text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)] sm:text-xs sm:tracking-[0.32em]"
                >
                  Who am I?
                </p>

                <h2
                  className="mt-5 max-w-[18ch] font-[family:var(--font-display)] text-[clamp(2.4rem,7.5vw,5.2rem)] leading-[0.93] tracking-[0.02em] text-white sm:mt-6"
                >
                  <div data-about-text-2 className="translate-y-10 opacity-0">Cybersecurity specialist</div>
                  <div data-about-text-3 className="translate-y-10 opacity-0">
                    <span className="text-[var(--color-accent)]">and systems</span> builder.
                  </div>
                </h2>

                <p
                  data-about-text-4
                  className="mt-6 max-w-lg translate-y-10 opacity-0 text-sm leading-7 text-white/72 sm:mt-7 sm:text-base sm:leading-8"
                >
                  I build secure platforms, automate operations, and develop full-stack
                  systems that solve real infrastructure problems without adding noise or fragility.
                </p>

                {/* Badges */}
                <div
                  data-about-text-5
                  className="mt-7 flex translate-y-10 flex-wrap gap-3 opacity-0"
                >
                  {badges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex min-h-10 items-center border border-white/14 bg-black/40 px-4 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Info cards */}
                <div
                  data-about-text-6
                  className="mt-7 grid max-w-lg translate-y-10 gap-4 opacity-0 sm:grid-cols-2"
                >
                  <div className="border border-[var(--color-line)] bg-black/50 px-4 py-4 backdrop-blur">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Focus</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">Security architecture, automation, full-stack systems.</p>
                  </div>
                  <div className="border border-[var(--color-line)] bg-black/50 px-4 py-4 backdrop-blur">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Approach</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">Defensive by default, practical in execution, clear in delivery.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator — bottom */}
            <div className="pointer-events-none absolute bottom-7 left-0 right-0 z-40 mx-auto flex w-full max-w-[1460px] items-end justify-start px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.26em] text-white/40 lg:flex">
                <span>Scroll</span>
                <div className="relative h-14 w-px bg-white/12">
                  <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 animate-bounce rounded-full bg-[var(--color-accent)] shadow-[0_0_14px_rgba(255,58,50,0.7)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="border-b border-[var(--color-line)]">
          <div className="mx-auto w-full max-w-[1460px] px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:px-12">
            <div data-reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">Our Team</p>
                <h2 className="mt-4 font-[family:var(--font-display)] text-[clamp(2.3rem,4.5vw,4.5rem)] leading-[0.95] text-white">
                  Tight team. Clear responsibilities. Strong delivery.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/58">
                Minimal cards, consistent lighting, and restrained motion so the expertise feels direct.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {team.map((member) => (
                <article
                  key={member.name}
                  data-reveal
                  className="group border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(10,14,20,0.96),rgba(6,10,14,0.86))] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(255,58,50,0.44)] hover:shadow-[0_0_34px_rgba(255,58,50,0.12)]"
                >
                  <div className="relative flex h-56 items-end overflow-hidden border border-white/8 bg-[radial-gradient(circle_at_50%_30%,rgba(255,58,50,0.22),transparent_24%),linear-gradient(180deg,#0a1018,#090d14)] p-6">
                    <div className="absolute left-1/2 top-7 h-24 w-24 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#ff5346_0%,rgba(255,83,70,0.18)_35%,transparent_70%)] blur-xl" />
                    <div className="absolute left-1/2 top-9 flex h-28 w-28 -translate-x-1/2 items-center justify-center rounded-full border border-[rgba(255,58,50,0.28)] bg-[linear-gradient(180deg,#151d27,#0c1017)] font-[family:var(--font-display)] text-3xl tracking-[0.18em] text-white shadow-[0_0_26px_rgba(255,58,50,0.18)]">
                      {member.initials}
                    </div>
                    <div className="relative z-10 mt-auto text-[10px] uppercase tracking-[0.24em] text-white/52">
                      Consistent low-key profile lighting
                    </div>
                  </div>
                  <h3 className="mt-5 font-[family:var(--font-display)] text-3xl text-white">{member.name}</h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                    {member.role}
                  </p>
                  <p className="mt-4 text-base leading-7 text-white/65">{member.expertise}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="border-b border-[var(--color-line)]">
          <div className="mx-auto w-full max-w-[1460px] px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:px-12">
            <div data-reveal className="mb-10">
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">Services</p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-[clamp(2.5rem,4.8vw,4.8rem)] leading-[0.95] text-white">
                Modular capabilities built for secure delivery.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {services.map((service) => (
                <article
                  key={service.title}
                  data-reveal
                  className="group border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(8,12,18,0.98),rgba(6,8,12,0.88))] p-5 transition duration-300 hover:scale-[1.02] hover:border-[rgba(255,58,50,0.42)] hover:shadow-[0_0_30px_rgba(255,58,50,0.14)]"
                >
                  <div className="flex h-24 items-center justify-center border border-white/8 bg-[radial-gradient(circle,rgba(255,58,50,0.18),transparent_58%)]">
                    <div className="flex h-14 w-14 items-center justify-center border border-[rgba(255,58,50,0.36)] bg-[rgba(255,58,50,0.08)] font-[family:var(--font-display)] text-xl tracking-[0.14em] text-white">
                      {service.glyph}
                    </div>
                  </div>
                  <h3 className="mt-5 font-[family:var(--font-display)] text-2xl text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{service.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="border-b border-[var(--color-line)]">
          <div className="mx-auto w-full max-w-[1460px] px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:px-12">
            <div data-reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">Certifications</p>
                <h2 className="mt-4 font-[family:var(--font-display)] text-[clamp(2.4rem,4.7vw,4.6rem)] leading-[0.95] text-white">
                  Structured proof of capability.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/58">
                Clean grid, restrained labels, and timeline year markers to keep it credible rather than noisy.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {certifications.map((item) => (
                <article
                  key={item.title}
                  data-reveal
                  className="border border-[var(--color-line)] bg-black/22 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center border border-[rgba(255,58,50,0.4)] bg-[rgba(255,58,50,0.09)] font-[family:var(--font-display)] text-xl text-white">
                      {item.org.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="mt-5 font-[family:var(--font-display)] text-2xl text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/62">{item.org}</p>
                  <div className="mt-6 h-px bg-white/10">
                    <div className="h-px w-3/4 bg-[var(--color-accent)]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-b border-[var(--color-line)]">
          <div className="mx-auto grid w-full max-w-[1460px] gap-8 px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div data-reveal className="flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">Contact</p>
                <h2 className="mt-4 max-w-xl font-[family:var(--font-display)] text-[clamp(2.7rem,5.2vw,5.3rem)] leading-[0.95] text-white">
                  Let&apos;s build something secure.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-8 text-white/66">
                  The contact area is styled like a control console: minimal, clear, and designed to feel
                  operational rather than decorative.
                </p>
              </div>
              <div className="mt-8 grid gap-4 text-sm text-white/68 sm:grid-cols-2">
                <div className="border border-[var(--color-line)] bg-black/22 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Email</p>
                  <p className="mt-2 break-words">hello@losenyx.com</p>
                </div>
                <div className="border border-[var(--color-line)] bg-black/22 p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Location</p>
                  <p className="mt-2">India</p>
                </div>
                <div className="border border-[var(--color-line)] bg-black/22 p-4 sm:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Phone</p>
                  <p className="mt-2">+91 12345 67890</p>
                </div>
              </div>
            </div>

            <div
              data-reveal
              className="border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(8,12,18,0.96),rgba(5,8,12,0.9))] p-5 sm:p-7"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[var(--color-line)] pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Control Panel</p>
                  <p className="mt-2 font-[family:var(--font-display)] text-3xl text-white">Transmit Message</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_rgba(255,58,50,0.7)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
              </div>

              <form className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/48">Name</span>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(255,58,50,0.6)] focus:shadow-[0_0_0_1px_rgba(255,58,50,0.24),0_0_22px_rgba(255,58,50,0.1)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/48">Email</span>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(255,58,50,0.6)] focus:shadow-[0_0_0_1px_rgba(255,58,50,0.24),0_0_22px_rgba(255,58,50,0.1)]"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-white/48">Message</span>
                  <textarea
                    placeholder="Your Message"
                    rows={6}
                    className="w-full resize-none border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[rgba(255,58,50,0.6)] focus:shadow-[0_0_0_1px_rgba(255,58,50,0.24),0_0_22px_rgba(255,58,50,0.1)]"
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex min-h-12 w-full items-center justify-center bg-[linear-gradient(135deg,#ff5b4c,#b81712)] px-6 text-[11px] uppercase tracking-[0.24em] text-white shadow-[0_0_24px_rgba(255,58,50,0.24)] transition hover:scale-[1.01] sm:w-auto"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <footer className="mx-auto w-full max-w-[1460px] px-4 py-8 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col gap-6 border-t border-[var(--color-line)] pt-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Image
                src="/icon/Logo white full 1.png"
                alt="Losenyx"
                  width={500}
                  height={500}
                className="h-18 md:h-28 w-auto object-cover"
              />
              
              <p className="mt-3 max-w-sm text-sm leading-7 text-white/56">
                Securing systems, tracking threats, and building resilient infrastructure.
              </p>
            </div>
            <div className="flex flex-col gap-5 text-sm text-white/62">
              <div className="flex flex-wrap gap-5 uppercase tracking-[0.18em]">
                {navLinks.map((item) => (
                  <a key={item.href} href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] text-white/70 transition hover:border-[rgba(255,58,50,0.5)] hover:text-white"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] text-white/70 transition hover:border-[rgba(255,58,50,0.5)] hover:text-white"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://instagram.com"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] text-white/70 transition hover:border-[rgba(255,58,50,0.5)] hover:text-white"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://x.com"
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/12 bg-white/[0.03] text-white/70 transition hover:border-[rgba(255,58,50,0.5)] hover:text-white"
                  aria-label="X"
                >
                  <XIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 border-t border-[var(--color-line)] pt-5 text-xs uppercase tracking-[0.18em] text-white/42 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 Losenyx. All rights reserved.</p>
            <p>Built with security and precision.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
