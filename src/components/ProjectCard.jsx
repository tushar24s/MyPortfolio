import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, GithubIcon } from "./Icons";
import Magnetic from "./Magnetic";

function getLinkProps(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noreferrer",
  };
}

function WindowChrome({ label }) {
  return (
    <div className="project-ui-toolbar">
      <div className="project-ui-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="project-ui-label">{label}</span>
    </div>
  );
}

function TrackAuraPreview({ image }) {
  return (
    <div className="project-ui project-ui-trackaura">
      <WindowChrome label="TrackAura" />

      <div className="project-ui-body project-ui-body-commerce">
        <div className="project-commerce-shot">
          <img
            className="project-commerce-shot-image"
            src={image}
            alt="TrackAura analytics dashboard preview"
          />
        </div>
      </div>
    </div>
  );
}

function ZenFinancePreview({ image }) {
  return (
    <div className="project-ui project-ui-finance">
      <WindowChrome label="Zen Finance" />

      <div className="project-ui-body project-ui-body-finance">
        <div className="project-commerce-shot">
          <img
            className="project-commerce-shot-image"
            src={image}
            alt="Zen Finance dashboard preview"
          />
        </div>
      </div>
    </div>
  );
}

function CommercePreview({ image }) {
  return (
    <div className="project-ui project-ui-commerce">
      <WindowChrome label="Velora" />

      <div className="project-ui-body project-ui-body-commerce">
        <div className="project-commerce-shot">
          <img
            className="project-commerce-shot-image"
            src={image}
            alt="Velora commerce storefront preview"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  if (project.slug === "track-aura") {
    return <TrackAuraPreview image={project.image} />;
  }

  if (project.slug === "zen-finance") {
    return <ZenFinancePreview image={project.image} />;
  }

  return <CommercePreview image={project.image} />;
}

export default function ProjectCard({ project, index }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const liveHref = project.live || project.github;

  useEffect(() => {
    if (!isPreviewOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPreviewOpen]);

  return (
    <>
      <Magnetic
        as={motion.article}
        className={`project-card${project.featured ? " project-card-featured" : ""}`}
        strength={14}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        transition={{
          duration: 0.75,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -6,
          scale: 1.01,
          transition: {
            type: "spring",
            stiffness: 240,
            damping: 18,
          },
        }}
      >
        <div className="project-media">
          <div className="project-media-glow" aria-hidden="true" />
          <div className="project-media-gradient" aria-hidden="true" />
          <ProjectPreview project={project} />

          <div className="project-media-overlay">
            <button
              className="project-overlay-button"
              type="button"
              onClick={() => setIsPreviewOpen(true)}
            >
              Quick Look
              <ArrowUpRightIcon />
            </button>
          </div>
        </div>

        <div className="project-body">
          <div className="project-topline">
            {project.featured ? (
              <span className="project-featured-badge">Featured</span>
            ) : null}

            <div className="project-meta">
              <span>{`${project.type} • ${project.meta}`}</span>
            </div>
          </div>

          <div className="project-copy">
            <h3>{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>

          <div className="project-metrics" aria-label={`${project.title} metrics`}>
            {project.metrics?.map((metric) => (
              <motion.span
                key={metric}
                className="project-metric"
                whileHover={{ y: -1, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {metric}
              </motion.span>
            ))}
          </div>

          <p className="project-stack-line">{project.stack.join(" · ")}</p>
        </div>
      </Magnetic>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isPreviewOpen ? (
                <motion.div
                  className="project-modal-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setIsPreviewOpen(false)}
                >
                  <motion.div
                    className="project-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${project.title} preview`}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="project-modal-top">
                      <div className="project-modal-copy">
                        <span className="project-modal-meta">{`${project.type} • ${project.meta}`}</span>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                      </div>

                      <button
                        className="project-modal-close"
                        type="button"
                        onClick={() => setIsPreviewOpen(false)}
                      >
                        Close
                      </button>
                    </div>

                    <div className="project-modal-preview">
                      <ProjectPreview project={project} />
                    </div>

                    <div className="project-modal-footer">
                      <div className="project-modal-metrics">
                        {project.metrics?.map((metric) => (
                          <span key={metric} className="project-metric">
                            {metric}
                          </span>
                        ))}
                      </div>

                      <div className="project-modal-actions">
                        <a
                          className="project-overlay-button project-overlay-button-secondary project-modal-code"
                          href={liveHref}
                          {...getLinkProps(liveHref)}
                        >
                          Live Project
                          <ArrowUpRightIcon />
                        </a>

                        <a
                          className="project-overlay-button project-overlay-button-tertiary project-modal-code"
                          href={project.github}
                          {...getLinkProps(project.github)}
                        >
                          <GithubIcon />
                          GitHub
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
