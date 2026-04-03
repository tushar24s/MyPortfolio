import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Magnetic from "./components/Magnetic";
import ProjectCard from "./components/ProjectCard";
import Reveal from "./components/Reveal";
import SectionTitle from "./components/SectionTitle";
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  MenuIcon,
  MoonIcon,
  PhoneIcon,
  SunIcon,
} from "./components/Icons";
import { navigationItems, portfolioData } from "./data/portfolioData";

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sectionIds = navigationItems
  .filter((item) => item.href?.startsWith("#"))
  .map((item) => item.href.replace("#", ""));
const contactFormEndpoint = `https://formsubmit.co/ajax/${portfolioData.contact.email}`;

const heroParticles = [
  { top: "10%", left: "8%", size: 10, duration: 10, delay: 0 },
  { top: "24%", left: "24%", size: 6, duration: 12, delay: 1.2 },
  { top: "14%", left: "62%", size: 8, duration: 13, delay: 0.6 },
  { top: "28%", left: "82%", size: 5, duration: 11, delay: 0.4 },
  { top: "48%", left: "12%", size: 7, duration: 15, delay: 1.1 },
  { top: "55%", left: "36%", size: 9, duration: 14, delay: 0.2 },
  { top: "68%", left: "70%", size: 6, duration: 12, delay: 1.4 },
  { top: "82%", left: "18%", size: 5, duration: 13, delay: 0.8 },
  { top: "76%", left: "54%", size: 8, duration: 10, delay: 0.5 },
  { top: "86%", left: "86%", size: 10, duration: 12, delay: 1.7 },
];

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function smoothScrollToSection(id, prefersReducedMotion) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  if (prefersReducedMotion) {
    target.scrollIntoView({
      block: "start",
    });
    return;
  }

  const start = window.scrollY;
  const offset = 88;
  const targetPosition = target.getBoundingClientRect().top + start - offset;
  const duration = 900;
  let startTime;

  function step(timestamp) {
    if (startTime === undefined) {
      startTime = timestamp;
    }

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    window.scrollTo(0, start + (targetPosition - start) * easedProgress);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function ContactIcon({ type }) {
  if (type === "email") {
    return <MailIcon />;
  }

  if (type === "phone") {
    return <PhoneIcon />;
  }

  if (type === "linkedin") {
    return <LinkedInIcon />;
  }

  return <GithubIcon />;
}

function getLinkProps(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noreferrer",
  };
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("portfolio-theme");

  return storedTheme === "dark" ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [formStatus, setFormStatus] = useState({
    type: "idle",
    message: "",
  });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const fileInputRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const heroCopyY = useTransform(
    scrollY,
    [0, 540],
    [0, prefersReducedMotion ? 0 : -26],
  );
  const heroVisualY = useTransform(
    scrollY,
    [0, 540],
    [0, prefersReducedMotion ? 0 : 32],
  );
  const heroVisualRotate = useTransform(
    scrollY,
    [0, 540],
    [0, prefersReducedMotion ? 0 : 1.6],
  );
  const heroBackdropY = useTransform(
    scrollY,
    [0, 540],
    [0, prefersReducedMotion ? 0 : 72],
  );

  useMotionValueEvent(scrollY, "change", (value) => {
    setIsScrolled(value > 24);
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsResumePreviewOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isResumePreviewOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isResumePreviewOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-38% 0px -42% 0px",
        threshold: 0.15,
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const mailtoLink = `mailto:${portfolioData.contact.email}`;

  const contactLinks = [
    {
      label: "Email",
      value: portfolioData.contact.email,
      href: mailtoLink,
      type: "email",
    },
    {
      label: "Phone",
      value: portfolioData.contact.phone,
      href: `tel:${portfolioData.contact.phone.replace(/\s+/g, "")}`,
      type: "phone",
    },
    {
      label: "LinkedIn",
      value: "Connect professionally",
      href: portfolioData.contact.linkedin,
      type: "linkedin",
    },
    {
      label: "GitHub",
      value: "Browse repositories",
      href: portfolioData.contact.github,
      type: "github",
    },
  ];
  const menuContactLinks = contactLinks.filter((item) => item.type !== "phone");
  const socialLinks = [
    {
      label: "LinkedIn",
      href: portfolioData.contact.linkedin,
      icon: <LinkedInIcon />,
    },
    {
      label: "GitHub",
      href: portfolioData.contact.github,
      icon: <GithubIcon />,
    },
  ];
  const resumePreviewSrc =
    `${portfolioData.resume.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
  const resumeExpandedSrc = `${portfolioData.resume.file}#view=FitH`;

  function handleSectionLink(event, href) {
    if (!href?.startsWith("#")) {
      return;
    }

    event.preventDefault();
    setIsMenuOpen(false);
    smoothScrollToSection(href.slice(1), prefersReducedMotion);
  }

  function openResumePreview() {
    setIsMenuOpen(false);
    setIsResumePreviewOpen(true);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));

    if (formStatus.type !== "idle") {
      setFormStatus({
        type: "idle",
        message: "",
      });
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFileName("");
      return;
    }

    const maxFileSize = 10 * 1024 * 1024;

    if (file.size > maxFileSize) {
      event.target.value = "";
      setSelectedFileName("");
      setFormStatus({
        type: "error",
        message: "Attachment must be 10MB or smaller.",
      });
      return;
    }

    setSelectedFileName(file.name);

    if (formStatus.type !== "idle") {
      setFormStatus({
        type: "idle",
        message: "",
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setFormStatus({
      type: "idle",
      message: "",
    });

    const submissionSubject =
      formState.subject.trim() || `Portfolio inquiry from ${formState.name}`;

    const payload = new FormData();
    payload.append("name", formState.name);
    payload.append("email", formState.email);
    payload.append("subject", submissionSubject);
    payload.append("message", formState.message);
    payload.append("_subject", submissionSubject);
    payload.append("_template", "table");
    payload.append("_honey", "");

    const attachment = fileInputRef.current?.files?.[0];

    if (attachment) {
      payload.append("attachment", attachment);
    }

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSelectedFileName("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setFormStatus({
        type: "success",
        message: "Message sent successfully.",
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell">
      <CustomCursor />

      <header className={`site-nav${isScrolled ? " is-scrolled" : ""}`}>
        <motion.div
          className="nav-inner"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            className="brand"
            href="#home"
            aria-label="Go to home section"
            onClick={(event) => handleSectionLink(event, "#home")}
          >
            <span className="brand-mark">
              <img
                className="brand-mark-image"
                src={portfolioData.hero.avatar}
                alt="Tushar Singh"
                loading="eager"
                decoding="async"
              />
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            {navigationItems.map((item) => {
              const isSectionLink = item.href?.startsWith("#");
              const isActive = isSectionLink && activeSection === item.href.replace("#", "");

              return (
                <a
                  key={item.label}
                  className={`nav-link${isActive ? " is-active" : ""}`}
                  href={item.href}
                  onClick={(event) => handleSectionLink(event, item.href)}
                  {...getLinkProps(item.href)}
                >
                  {isActive ? (
                    <motion.span
                      className="nav-link-indicator"
                      layoutId="nav-link-indicator"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    />
                  ) : null}
                  <span className="nav-link-label">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="nav-actions">
            <div className="nav-socials" aria-label="Social links">
              {socialLinks.map((item) => (
                <Magnetic
                  key={item.label}
                  as={motion.a}
                  className="nav-social-link"
                  href={item.href}
                  strength={9}
                  whileHover={{ y: -2, scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={item.label}
                  {...getLinkProps(item.href)}
                >
                  {item.icon}
                </Magnetic>
              ))}
            </div>

            <Magnetic
              as={motion.button}
              type="button"
              className="theme-toggle"
              strength={10}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-pressed={theme === "dark"}
            >
              <motion.span
                className="theme-toggle-icon"
                animate={{ rotate: theme === "light" ? 0 : 180 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "light" ? <MoonIcon /> : <SunIcon />}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </Magnetic>

            <Magnetic
              as={motion.button}
              type="button"
              className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
              strength={10}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <MenuIcon />
            </Magnetic>

            <AnimatePresence>
              {isMenuOpen ? (
                <motion.div
                  className="menu-panel"
                  initial={{ opacity: 0, y: -12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.96 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="menu-group">
                    <span className="menu-label">Navigate</span>
                    <div className="menu-links">
                      {navigationItems.map((item) => {
                        const id = item.href?.startsWith("#")
                          ? item.href.replace("#", "")
                          : "";
                        const isActive = id ? activeSection === id : false;

                        return (
                          <a
                            key={item.label}
                            className={`menu-link${isActive ? " is-active" : ""}`}
                            href={item.href}
                            onClick={(event) => handleSectionLink(event, item.href)}
                          >
                            <span>{item.label}</span>
                            <ArrowUpRightIcon />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div className="menu-group">
                    <span className="menu-label">Connect</span>
                    <div className="menu-links">
                      {menuContactLinks.map((item) => (
                        <a
                          key={item.label}
                          className="menu-link"
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          {...getLinkProps(item.href)}
                        >
                          <span>{item.label}</span>
                          <span className="menu-link-value">{item.value}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="menu-footer">
                    <a
                      className="menu-resume-link"
                      href={portfolioData.resume.file}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <DownloadIcon />
                      <span>View Resume</span>
                    </a>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </header>

      <main>
        <section className="section hero" id="home">
          <motion.div className="hero-backdrop" style={{ y: heroBackdropY }}>
            <div className="hero-gradient hero-gradient-1" />
            <div className="hero-gradient hero-gradient-2" />
            <div className="hero-gradient hero-gradient-3" />

            <div className="hero-particle-field">
              {heroParticles.map((particle, index) => (
                <motion.span
                  key={`${particle.top}-${particle.left}`}
                  className="hero-particle"
                  style={{
                    top: particle.top,
                    left: particle.left,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                  }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: [0, -22, 0],
                          opacity: [0.35, 0.8, 0.35],
                        }
                  }
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

          </motion.div>

          <motion.div
            className="hero-copy"
            style={{ y: heroCopyY }}
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div className="hero-profile-row" variants={heroItem}>
              <p className="hero-greeting">{portfolioData.hero.greeting}</p>
              <span className="hero-status-badge">{portfolioData.hero.eyebrow}</span>
            </motion.div>

            <motion.p className="hero-role" variants={heroItem}>
              {portfolioData.hero.roleLine}
            </motion.p>

            <motion.h1 className="hero-title" variants={heroItem}>
              {portfolioData.hero.titleLines.map((line, index) => (
                <span
                  className={`hero-title-line${
                    index === portfolioData.hero.titleLines.length - 1
                      ? " hero-title-line-accent"
                      : ""
                  }`}
                  key={line}
                >
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p className="hero-summary" variants={heroItem}>
              {portfolioData.hero.summary}
            </motion.p>

            <motion.div className="hero-actions" variants={heroItem}>
              <Magnetic
                as={motion.a}
                className="button-primary magnetic-button"
                href={portfolioData.hero.primaryCta.href}
                strength={14}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={(event) => handleSectionLink(event, portfolioData.hero.primaryCta.href)}
              >
                {portfolioData.hero.primaryCta.label}
                <ArrowUpRightIcon />
              </Magnetic>

              <Magnetic
                as={motion.a}
                className="button-secondary magnetic-button"
                href={portfolioData.hero.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
                strength={12}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
              >
                {portfolioData.hero.secondaryCta.label}
                <ArrowUpRightIcon />
              </Magnetic>
            </motion.div>

          </motion.div>

          <motion.div
            className="hero-visual"
            style={{ y: heroVisualY, rotate: heroVisualRotate }}
          >
            <Reveal delay={0.2}>
              <Magnetic
                as={motion.div}
                className="hero-showcase-shell"
                strength={18}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 7.5,
                  repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  rotate: -0.4,
                }}
              >
                <div className="hero-showcase">
                  <div className="hero-showcase-glow hero-showcase-glow-primary" />
                  <div className="hero-showcase-glow hero-showcase-glow-secondary" />
                  <div className="hero-dot-pattern hero-dot-pattern-top" />
                  <div className="hero-dot-pattern hero-dot-pattern-bottom" />

                  <motion.span
                    className="hero-floating-chip hero-floating-chip-top"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: [0, -6, 0],
                          }
                    }
                    transition={{
                      duration: 6.8,
                      repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {portfolioData.hero.visualBadge}
                  </motion.span>

                  <motion.span
                    className="hero-floating-chip hero-floating-chip-bottom"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: [0, 6, 0],
                          }
                    }
                    transition={{
                      duration: 7.8,
                      repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {portfolioData.hero.visualStack}
                  </motion.span>

                  <motion.div
                    className="hero-portrait-shell"
                    initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, scale: 1 }
                        : {
                            opacity: 1,
                            scale: 1,
                            y: [0, -8, 0],
                          }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                        : {
                            opacity: {
                              duration: 0.7,
                              ease: [0.22, 1, 0.36, 1],
                            },
                            scale: {
                              duration: 0.75,
                              ease: [0.22, 1, 0.36, 1],
                            },
                            y: {
                              duration: 8.2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            },
                          }
                    }
                  >
                    <div className="hero-portrait-frame">
                      <div className="hero-portrait-inner">
                        <img
                          className="hero-portrait-image"
                          src={portfolioData.hero.avatar}
                          alt="Portrait of Tushar Singh"
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {portfolioData.hero.visualCards.map((card, index) => (
                    <motion.article
                      key={card.title}
                      className={`hero-floating-card hero-floating-card-${index + 1}`}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              y: index === 0 ? [0, -7, 0] : [0, 7, 0],
                            }
                      }
                      transition={{
                        duration: index === 0 ? 7.2 : 8.6,
                        delay: index * 0.2,
                        repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="hero-floating-label">{card.title}</span>
                      <p>{card.body}</p>
                    </motion.article>
                  ))}
                </div>
              </Magnetic>
            </Reveal>
          </motion.div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-layout">
            <Reveal
              className="about-copy"
              delay={0.06}
              hover={{ y: -4 }}
            >
              <span className="eyebrow">About Me</span>
              <h2 className="about-heading">{portfolioData.about.title}</h2>
              <p className="about-intro">{portfolioData.about.summary}</p>

              <ul className="about-points">
                {portfolioData.about.points.map((point) => (
                  <li key={point} className="about-point">
                    <span className="about-point-dot" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="about-skill-grid">
              {portfolioData.about.skills.map((skillGroup, index) => (
                <Reveal
                  key={skillGroup.label}
                  className="about-skill-card"
                  delay={0.08 + index * 0.05}
                  y={22}
                  scale={0.995}
                  hover={{ y: -4 }}
                >
                  <span className="about-skill-label">{skillGroup.label}</span>
                  <p className="about-skill-text">{skillGroup.items}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <Reveal>
            <SectionTitle
              eyebrow="Projects"
              title="Projects I've Built"
            />
          </Reveal>

          <div className="projects-grid">
            {portfolioData.projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="section" id="resume">
          <Reveal>
            <SectionTitle
              eyebrow="Resume"
              title="Resume"
              description="Download the PDF or preview it here."
            />
          </Reveal>

          <div className="resume-layout">
            <Reveal
              className="glass-card resume-card"
              delay={0.08}
              hover={{ y: -10, rotate: -0.35 }}
            >
              <Magnetic
                as={motion.a}
                className="resume-download-card"
                href={portfolioData.resume.file}
                download
                strength={14}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="card-kicker">PDF resume</span>
                <h3>Download Resume</h3>
                <p>One click. Clean PDF. Ready to send.</p>

                <span className="resume-card-action">
                  <DownloadIcon />
                  Download PDF
                </span>
              </Magnetic>
            </Reveal>

            <Reveal
              className="glass-card resume-preview"
              delay={0.16}
              hover={{ y: -10, rotate: 0.35 }}
            >
              <div className="resume-preview-top">
                <span className="card-kicker">Web preview</span>

                <Magnetic
                  as={motion.button}
                  type="button"
                  className="button-secondary resume-expand-button"
                  strength={10}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openResumePreview}
                >
                  Enlarge preview
                  <ArrowUpRightIcon />
                </Magnetic>
              </div>

              <div className="resume-preview-shell">
                <object
                  className="resume-preview-frame"
                  data={resumePreviewSrc}
                  type="application/pdf"
                  aria-label="Resume preview"
                >
                  <div className="resume-preview-fallback">
                    <p>Preview not available in this browser.</p>
                    <Magnetic
                      as={motion.a}
                      className="button-secondary magnetic-button"
                      href={portfolioData.resume.file}
                      target="_blank"
                      rel="noreferrer"
                      strength={10}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ArrowUpRightIcon />
                      Open Resume
                    </Magnetic>
                  </div>
                </object>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="contact">
          <Reveal>
            <SectionTitle
              eyebrow="Contact"
              title="Open to Frontend, Data Analyst, and Product Manager roles."
            />
          </Reveal>

          <div className="contact-layout">
            <Reveal
              className="glass-card contact-card"
              delay={0.08}
              hover={{ y: -10, rotate: -0.35 }}
            >
              <h3>Reach out directly</h3>
              <p>{portfolioData.contact.note}</p>

              <div className="contact-link-list">
                {contactLinks.map((item) => (
                  <Magnetic
                    key={item.label}
                    as={motion.a}
                    className="contact-link"
                    href={item.href}
                    strength={10}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    {...getLinkProps(item.href)}
                  >
                    <span className="contact-icon">
                      <ContactIcon type={item.type} />
                    </span>
                    <span className="contact-copy">
                      <strong>{item.label}</strong>
                      <small>{item.value}</small>
                    </span>
                    <ArrowUpRightIcon />
                  </Magnetic>
                ))}
              </div>
            </Reveal>

            <Reveal
              className="glass-card form-card"
              delay={0.16}
              hover={{ y: -10, rotate: 0.35 }}
            >
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="_honey"
                  className="form-honeypot"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="form-row">
                  <label>
                    <span>Name</span>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                    />
                  </label>

                  <label>
                    <span>Email</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>

                <label>
                  <span>Subject</span>
                  <input
                    name="subject"
                    type="text"
                    placeholder="What would you like to discuss?"
                    value={formState.subject}
                    onChange={handleInputChange}
                  />
                </label>

                <label>
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell me about the role, product, or project."
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  <span>Attachment</span>
                  <input
                    ref={fileInputRef}
                    name="attachment"
                    type="file"
                    accept=".pdf,image/*,.doc,.docx,.txt,.zip,.ppt,.pptx,.xls,.xlsx"
                    onChange={handleFileChange}
                  />
                </label>

                <p className="form-helper">
                  Supported files include PDF, images, docs, spreadsheets,
                  slides, text files, and ZIPs up to 10MB.
                </p>

                {selectedFileName ? (
                  <p className="selected-file">Selected: {selectedFileName}</p>
                ) : null}

                <Magnetic
                  as={motion.button}
                  className="button-primary submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  strength={12}
                  whileHover={isSubmitting ? undefined : { y: -3, scale: 1.01 }}
                  whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                >
                  <MailIcon />
                  {isSubmitting ? "Sending..." : "Send message"}
                </Magnetic>

                {formStatus.type !== "idle" ? (
                  <p
                    className={`form-status form-status-${formStatus.type}`}
                    aria-live="polite"
                  >
                    {formStatus.message}
                  </p>
                ) : null}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isResumePreviewOpen ? (
          <motion.div
            className="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setIsResumePreviewOpen(false)}
          >
            <motion.div
              className="resume-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Expanded resume preview"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="resume-modal-top">
                <div>
                  <span className="card-kicker">Resume preview</span>
                  <h3>Expanded preview</h3>
                </div>

                <Magnetic
                  as={motion.button}
                  type="button"
                  className="button-secondary resume-modal-close"
                  strength={10}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsResumePreviewOpen(false)}
                >
                  Close
                </Magnetic>
              </div>

              <div className="resume-modal-frame-shell">
                <object
                  className="resume-modal-frame"
                  data={resumeExpandedSrc}
                  type="application/pdf"
                  aria-label="Expanded resume preview"
                >
                  <div className="resume-preview-fallback">
                    <p>Preview not available in this browser.</p>
                    <Magnetic
                      as={motion.a}
                      className="button-secondary magnetic-button"
                      href={portfolioData.resume.file}
                      target="_blank"
                      rel="noreferrer"
                      strength={10}
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Open Resume
                      <ArrowUpRightIcon />
                    </Magnetic>
                  </div>
                </object>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>
            {portfolioData.name} | {new Date().getFullYear()}
          </p>

          <Magnetic
            as={motion.a}
            href="#home"
            strength={8}
            onClick={(event) => handleSectionLink(event, "#home")}
          >
            Back to top
          </Magnetic>
        </div>
      </footer>
    </div>
  );
}
