# Tushar Singh Portfolio

A modern personal portfolio built with React, Vite, Framer Motion, and handcrafted CSS. The site is designed to present Tushar Singh as a frontend-focused, product-minded developer with strong attention to UI quality, responsiveness, and polished interaction design.

Live Project - https://my-portfolio-nici.vercel.app/

## Overview

This portfolio is a single-page React application with a premium editorial layout, smooth motion, dark/light theme support, interactive project previews, embedded resume viewing, and a contact form that sends messages directly to the configured email inbox.

The site is intentionally data-driven. Most profile, project, resume, and contact content lives in one place:

- `src/data/portfolioData.js`

That makes it easy to update content without constantly editing layout code.

## What The Portfolio Includes

- Bold hero section with animated entrance, floating visual cards, portrait, and CTA buttons
- About section with concise positioning, recruiter-friendly bullet points, and skill cards
- Project showcase with responsive cards, hover interactions, and modal-based quick previews
- Resume section with in-page PDF preview, enlarge option, and direct download
- Contact section with direct links plus a working message form with attachment support
- Light and dark theme toggle with persisted theme state
- Custom cursor glow and magnetic hover effects on supported devices
- Smooth scrolling and section-aware navigation
- Mobile, tablet, and desktop responsive layouts

## Tech Stack

### Core Stack

| Technology | Used For | Why It Was Chosen |
| --- | --- | --- |
| React 18 | UI architecture | React is a strong fit for a portfolio like this because the site is component-driven, interactive, and benefits from reusable UI blocks. |
| Vite | Development server and production build | Vite gives fast local development, clean bundling, and a very lightweight setup for a small-to-medium React project. |
| Framer Motion | Motion and interaction system | Framer Motion is used for staggered entrances, hover lift, modal transitions, theme-friendly motion, and scroll-based reveal behavior. |
| Plain CSS (`src/styles.css`) | Design system and responsive styling | Custom CSS keeps the site visually unique without depending on a UI framework. It also gives fine control over spacing, shadows, layout rhythm, and theme variables. |

### UI / Interaction Utilities

| Component / System | Purpose | Why It Matters |
| --- | --- | --- |
| `Reveal` | Section and card reveal animations | Keeps scroll-based entrance animations consistent across the site. |
| `Magnetic` | Cursor-reactive hover motion | Adds a premium interaction layer to buttons, cards, links, and social icons. |
| `CustomCursor` | Glow cursor on fine-pointer devices | Makes the experience feel more interactive without affecting touch devices. |
| `ProjectCard` | Project card rendering and quick-look modal | Centralizes project previews, hover behavior, and modal actions in one reusable component. |

### Contact / Content Delivery

| Service / Asset | Used For | Why It Was Chosen |
| --- | --- | --- |
| FormSubmit AJAX endpoint | Contact form delivery | It lets the portfolio send contact form submissions directly to the configured email inbox without adding a custom backend. |
| Static assets in `public/` | Resume, avatar, and project visuals | Static asset delivery is simple, fast, and works cleanly with Vite. |
| PDF embed via `<object>` | Resume preview | Gives recruiters an immediate in-site preview while still preserving download access. |

## Why This Stack Fits This Portfolio

This project is not just a static landing page. It includes:

- animated transitions
- theme switching
- modal previews
- stateful contact form behavior
- reusable data-driven sections
- responsive interaction design

React + Vite keeps the codebase lightweight but structured. Framer Motion gives smooth animation without forcing complex custom animation logic. Plain CSS preserves visual originality and keeps the design system tightly controlled.

## Design System

The portfolio uses a shared visual system defined in `src/styles.css`.

### Key Design Decisions

- Warm neutral base palette for a premium and minimal feel
- Accent brown tones for highlights and calls to action
- Consistent content width using an `1100px` max container
- Shared spacing scale using CSS variables
- Shared card styling across hero, about, resume, contact, and project blocks
- Smooth 12px-style rounded geometry for a modern 2026 UI direction
- Inter typography across headings and body for consistency and readability

### Theme System

The site starts in light mode by default and supports dark mode through:

- `data-theme` on `document.documentElement`
- CSS variables for both themes
- persisted theme state in `localStorage`

This means theme colors transition globally instead of requiring per-component rewrites.

## Project Structure

```text
.
├── public/
│   ├── Tushar_s_Resume.pdf
│   ├── tushar-avatar.png
│   └── visuals/
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx
│   │   ├── Icons.jsx
│   │   ├── Magnetic.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Reveal.jsx
│   │   ├── SectionTitle.jsx
│   │   └── TypingText.jsx
│   ├── data/
│   │   └── portfolioData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── scripts/
│   └── generate_resume.py
├── index.html
├── package.json
└── vite.config.js
```

## Section-by-Section Breakdown

### 1. Hero Section

The hero is built to create immediate visual impact while keeping the message professional.

It includes:

- greeting and personal identity
- “Open to work” badge
- strong product-oriented headline
- concise supporting copy
- primary and secondary CTAs
- profile portrait inside a layered visual composition
- floating context chips and mini content cards
- subtle parallax and motion behavior

### Why It Is Built This Way

The hero needs to communicate three things quickly:

1. who Tushar is
2. what kind of work he does
3. what a recruiter or visitor should do next

That is why the left side focuses on message clarity and the right side focuses on personality and visual memory.

### 2. About Section

The About section is intentionally recruiter-friendly and easy to scan.

It contains:

- a compact positioning statement
- one concise summary paragraph
- bullet points for real-world capability and experience
- a right-side skill card grid

### Why It Is Built This Way

Long paragraphs make portfolios harder to scan. Converting background and capability into short bullets makes the section more effective for hiring managers who spend only a few seconds on first review.

### 3. Projects Section

The projects section is designed as a product showcase rather than a plain list of cards.

Each project card includes:

- product preview image
- title and category/meta line
- short one-line description
- key metrics
- stack line
- hover overlay with `Quick Look`

When a user clicks `Quick Look`, a modal opens with:

- larger project preview
- project summary
- metric chips
- `Live Project` link
- `GitHub` link

### Why It Is Built This Way

This gives the best balance between visual polish and information density:

- cards stay compact in the grid
- details are still accessible
- the page avoids becoming too text-heavy

The quick-look modal is rendered with a portal to `document.body`, which prevents it from sitting underneath transformed or sticky layout layers.

### Current Featured Projects

#### TrackAura

- Live: [https://track-aura-jet.vercel.app/](https://track-aura-jet.vercel.app/)
- GitHub: [https://github.com/tushar24s/TrackAura](https://github.com/tushar24s/TrackAura)
- Stack shown in portfolio: React, Vite, Framer Motion

#### Zen Finance

- Live: [https://zen-finance-flax.vercel.app/login](https://zen-finance-flax.vercel.app/login)
- GitHub: [https://github.com/tushar24s/ZenFinance](https://github.com/tushar24s/ZenFinance)

#### Velora

- Live: [https://veloraec.vercel.app/](https://veloraec.vercel.app/)
- GitHub: [https://github.com/tushar24s/Velora](https://github.com/tushar24s/Velora)

### 4. Resume Section

The resume section uses a dual-approach UX:

- quick PDF download
- embedded preview directly on the page

It also includes an enlarge action that opens a larger in-site preview modal for easier reading.

### Why It Is Built This Way

Recruiters do not always want to download a file immediately. Giving both preview and download options reduces friction.

### 5. Contact Section

The contact section has two parts:

- direct contact cards
- a message form

The form supports:

- name
- email
- subject
- message
- optional file attachment

Supported attachments include PDF, images, docs, spreadsheets, slides, text files, and ZIP files up to 10MB.

### Why It Is Built This Way

This makes the portfolio more useful for hiring workflows. Recruiters can send:

- job details
- interview follow-ups
- assignment briefs
- supporting documents

without leaving the page.

## Motion and Interaction Design

Motion is a major part of the portfolio experience.

### Where Framer Motion Is Used

- page-load animation in the hero
- staggered content entrances
- hover lift on cards and buttons
- theme toggle icon transitions
- floating motion in the hero visual area
- quick-look modal entrance and exit
- resume modal entrance and exit
- section reveal on scroll

### Interaction Patterns

- magnetic hover movement for buttons and cards
- custom cursor glow on desktop/fine-pointer devices
- quick-look modal for deeper project inspection
- smooth section scrolling for navigation links
- active section indicator in the navigation bar

### Accessibility / Motion Considerations

The code respects reduced-motion preferences by checking `useReducedMotion()` and disabling or simplifying motion where appropriate.

## Data-Driven Content Model

Most editable content is centralized in:

- `src/data/portfolioData.js`

This includes:

- navigation items
- hero content
- about content
- skills
- project data
- resume file path
- contact details

### Why This Matters

This structure makes the portfolio easier to maintain because:

- content changes do not require layout rewrites
- projects can be reordered quickly
- links and assets can be swapped with minimal risk

## Responsive Design Notes

The portfolio is built to adapt across:

- desktop
- tablet
- mobile

Responsive behavior is handled with handcrafted CSS rather than a component library. Key areas that were explicitly designed and tuned for responsiveness include:

- hero layout
- project grid
- resume preview area
- contact section
- modal actions
- navigation behavior

There was also a hardening pass for common layout risks such as:

- modal stacking over sticky navigation
- narrow-screen action wrapping
- grid item overflow
- uneven contact card height

## Development Setup

### Requirements

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will print a local development URL, usually:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Customization Guide

### Update Portfolio Content

Edit:

- `src/data/portfolioData.js`

You can change:

- text content
- project order
- project links
- skill cards
- resume file path
- contact details

### Replace The Resume

Replace:

- `public/Tushar_s_Resume.pdf`

The site’s preview and download actions already point to that path.

### Replace The Avatar

Update the image in:

- `public/tushar-avatar.png`

and keep `portfolioData.hero.avatar` pointed to it.

### Replace Project Visuals

Project visuals live in:

- `public/visuals/`

Each project card reads its image path from `src/data/portfolioData.js`.

## Contact Form Delivery

The form currently posts to:

- `https://formsubmit.co/ajax/<email>`

where the email is pulled from `portfolioData.contact.email`.

### Important Note

FormSubmit usually requires one-time inbox activation before submissions begin forwarding consistently. If the form is not delivering messages after deployment, confirm the inbox activation email from FormSubmit first.

## Extra Script

This repo includes:

- `scripts/generate_resume.py`

This script can generate a portfolio-style PDF resume using Python and ReportLab. It is not required for the live site to work, because the site already uses the static PDF in `public/Tushar_s_Resume.pdf`.

## Strengths of This Project

- Strong visual identity without relying on a generic template
- Clean separation between data, components, and styling
- Motion-rich but still professional
- Recruiter-friendly structure
- Real project links and previews
- Theme support and polished interactions

## Future Improvements

Possible next upgrades for the portfolio:

- add analytics tracking for portfolio visits
- add real case-study pages for each project
- add a blog or writing section
- improve SEO metadata and social preview tags
- add automated screenshot generation for project previews
- add a proper backend or serverless endpoint for contact submissions

## Author

Tushar Singh  
Frontend and Full-Stack Developer  
[LinkedIn](https://www.linkedin.com/in/tushar-singh-8a2b21226/)  
[GitHub](https://github.com/tushar24s)
