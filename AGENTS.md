# AGENTS.md — Documentation & Context for AI Agents
> **Project:** `devlacruz.tech` (Astro Technical Dossier & Research Portfolio)  
> **Workspace Path:** `/mnt/Datos/DjangoProjects/profile/astro-site/`  
> **Repository:** `git@github.com:DevLaCruz/my-astro-site.git`  
> **Author:** Alejandro Antony De la Cruz Suárez  
> **Professional Identity:** Systems Engineer & AI Infrastructure Builder (ORCID: `0009-0009-7303-685X`)  
> **Target Alignment:** Research Engineer — LLM External Data, Agentic Systems & Information Architecture (Anthropic / Frontier AI Labs)  
> **Runtime & Tooling:** Bun (`/home/devlacruz/.bun/bin/bun`) · Astro 5 (SSG) · GitHub Pages · Custom Domain: `https://devlacruz.tech`

---

## 1. PROJECT GENESIS & ARCHITECTURAL EVOLUTION

### 1.1 The Monolithic Django Origin
This portfolio originally lived as a monolithic Django application located at:
```text
/mnt/Datos/DjangoProjects/profile/devlacruz/
├── about/
├── blog/
├── contact/
├── core/
├── cv/
├── portfolio/
├── db.sqlite3
└── manage.py
```
While Django was effective for standard dynamic CRUD operations, using a dynamic web server for an elite research portfolio introduces major operational liabilities:
- **Cold starts & downtime risks:** Free-tier or low-cost VPS instances experience cold starts, memory exhaustion, or network restarts. If an Anthropic researcher or academic committee reviewer in San Francisco or Brazil clicks the portfolio link and experiences a 15-second delay or a 502 error, the impression is fatal.
- **Attack surface & operational maintenance:** Maintaining security patches, database migrations, and SSL renewals for a read-only technical dossier is an unnecessary engineering anti-pattern.

### 1.2 The Deliberate Shift to Astro 5 (Static Site Generation - SSG)
The portfolio was intentionally decoupled and rewritten into **Astro 5**:
- **100% Uptime & Global Edge Distribution:** Output is strictly static HTML/CSS/JS (`output: "static"` in `astro.config.mjs`), hosted globally on **GitHub Pages** behind a global CDN with sub-50ms Time-to-First-Byte (TTFB).
- **Zero Running Costs & Zero Maintenance:** No backend process to crash, no database connections to drop.
- **Data-Driven Knowledge Architecture:** Leverages Astro's Content Collections (`astro:content`) to treat technical documentation, research papers, and system specifications as type-safe, version-controlled markdown schemas.

---

## 2. PROFESSIONAL POSITIONING & CORE SYSTEMS NARRATIVE

This site is **not** a generic web-developer portfolio with skill progress bars. It is an **Engineering Dossier & Research Statement** designed to convince hiring managers and researchers that Alejandro is exceptionally qualified for roles redesigning how frontier LLMs interface with external data.

### 2.1 The Core Systems Documented on the Site

1. **CirIAco — Machine-Native Knowledge Representation & DAG Engine:**
   - **Problem Addressed:** Modern RAG slices human-centric documents into arbitrary text chunks, causing context fragmentation, reference drift, and citation hallucination.
   - **Solution:** Deconstructs knowledge into self-contained atomic propositions termed **`Atmo` blocks**, sealed with SHA-256 hashes and linked in a Directed Acyclic Graph (DAG).
   - **LLM Traversal:** Language models traverse deterministic subgraphs, guaranteeing that every reasoning step has a verifiable cryptographic parent node.
   - **Docs Location:** `src/content/projects/ciriaco.md` and `src/content/docs/ciriaco/`.

2. **SumrAI — Zero-Trust Dual-Ring AI Gateway & FastMCP Execution Runtime:**
   - **Dual-Ring Architecture:** Separates autonomous long-horizon ReAct deliberation (**Ring 1: OpenFang in Rust**, port 50051) from sub-500ms token-streaming interactive pipelines (**Ring 2: Django Ninja + Granian ASGI**).
   - **Anthropic Model Context Protocol (FastMCP):** Implements typed MCP servers over HTTP SSE and JSON-RPC for secure database queries (`pgvector`), task dispatch, and financial summaries.
   - **Zero-Trust Memory Vault:** Uses `devlacruz-hashlib` (Rust FFI AES-256-GCM) to tokenize sensitive PII into opaque tokens (`<VAULT_ENTITY_...>`), allowing frontier models to reason over relationships without exposing private data.
   - **Docs Location:** `src/content/projects/sumrai.md` and `src/content/docs/sumrai/`.

3. **`devlacruz-hashlib` — Deterministic Privacy Layer (PyPI / Rust FFI):**
   - Published Python package providing zero-trust SHA-256 pseudonymization before data leaves the system perimeter for model context injection.
   - **Docs Location:** `src/content/projects/hashlib.md` and `src/content/docs/hashlib/`.

4. **Enterprise Telemetry & Mission-Critical Operations (NTT DATA):**
   - **Client BCP:** 24/7 cross-squad observability for high-throughput banking payment rails using Dynatrace, Kibana, and Grafana.
   - **Client Banco Pichincha:** Query plan profiling and refactoring across Oracle and SQL Server, eliminating deadlocks and cutting query latency by up to 60%.
   - **Client Alicorp:** Custom incident automation bots leveraging Python over long-polling architectures.

5. **Empirical ML & Medical Imaging Research (UNPRG):**
   - End-to-end multimodal brain MRI segmentation using ResNet50 + ResUNet with custom **Focal Tversky Loss** to conquer severe class imbalance (achieved **Dice >0.88, IoU >0.80**).
   - Edge AI vision inference using quantized EfficientNet on Raspberry Pi 4B (<200ms latency).
   - **NASA International Space Apps Challenge 2025 Global Nominee** (top tier of 60,000+ global participants).

---

## 3. PROJECT DIRECTORY STRUCTURE

```text
astro-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions workflow to build & publish to GitHub Pages
├── public/
│   ├── CNAME                   # Custom domain declaration (devlacruz.tech)
│   ├── Alejandro_DeLaCruz_ResearchEngineer.pdf  # The official 2-page Anthropic Research Engineer CV
│   ├── favicon.svg
│   └── css/, img/, fonts/      # Static assets
├── src/
│   ├── content/
│   │   ├── config.ts           # Zod schema definitions for 'projects' and 'docs' collections
│   │   ├── projects/           # High-level project overview markdown files
│   │   │   ├── ciriaco.md      # CirIAco project page (hasDocs: true)
│   │   │   ├── sumrai.md       # SumrAI project page (hasDocs: true)
│   │   │   └── hashlib.md      # devlacruz-hashlib project page (hasDocs: true)
│   │   └── docs/               # In-depth architectural documentation nested by project slug
│   │       ├── ciriaco/        # CirIAco formal specifications (getting-started, architecture)
│   │       ├── sumrai/         # SumrAI dual-ring & FastMCP specs
│   │       └── hashlib/        # hashlib API reference and getting started
│   ├── components/
│   │   ├── DocsSidebar.astro   # Dynamic documentation sidebar
│   │   └── ProjectCard.astro   # Card component for projects grid
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Master shell (Navbar, Footer, meta tags, CV download link)
│   │   └── DocsLayout.astro    # Documentation two-column layout with sidebar
│   ├── pages/
│   │   ├── index.astro         # Homepage (Research Engineer hero & architectural value prop)
│   │   ├── experience.astro    # Professional & research timeline
│   │   ├── about.astro         # Detailed technical breakdown, skills, and distinctions
│   │   ├── contact.astro       # Contact coordinates & links
│   │   └── projects/
│   │       ├── index.astro     # Projects list (/projects)
│   │       ├── [project].astro # Project landing page (/projects/ciriaco)
│   │       └── [project]/docs/ # Nested documentation route handlers
├── astro.config.mjs            # Astro configuration (site: 'https://devlacruz.tech')
├── package.json                # Dependencies & scripts
└── bun.lock                    # Bun package manager lockfile
```

---

## 4. COMMANDS & WORKFLOW (FOR AGENTS)

The project uses **Bun** as its primary JavaScript runtime and package manager.

```bash
# Set runtime path
export BUN_BIN="/home/devlacruz/.bun/bin/bun"

# Install dependencies
$BUN_BIN install

# Run local development server (port 4321)
$BUN_BIN run dev

# Build production static bundle to dist/
$BUN_BIN run build

# Preview production build locally
$BUN_BIN run preview
```

---

## 5. DEPLOYMENT & GITHUB PAGES INTEGRATION

- **Domain:** `https://devlacruz.tech`
- **GitHub Repository:** `DevLaCruz/my-astro-site`
- **Build Pipeline:** Handled automatically by `.github/workflows/deploy.yml` on every `git push` to `main` or `master`.
- **Custom Domain Preservation:** The file `public/CNAME` contains `devlacruz.tech`. During `bun run build`, Astro copies this to `dist/CNAME`, preventing GitHub Pages from resetting the custom domain.
- **DNS Requirements:**
  - `CNAME` record: `www` pointing to `devlacruz.github.io`.
  - `A` records for apex domain `@` (`devlacruz.tech`):
    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`

---

## 6. STRICT RULES & CONSTRAINTS FOR FUTURE AGENTS

1. **Zero Hallucination Policy:** Do not invent fake research papers, unverified awards, or non-existent metrics. All descriptions must remain grounded in Alejandro's actual systems (CirIAco, SumrAI, NTT DATA/BCP/Pichincha, Brain MRI segmentation, NASA Space Apps).
2. **Preserve Astro's Zero-JS / SSG Philosophy:** Do not add heavy client-side JavaScript frameworks or client-side dependencies unless strictly required. The site must maintain instant loading speeds (<50ms).
3. **Content Collections Schema Discipline:** Whenever adding new projects or documentation, always declare them through `src/content/projects/` and `src/content/docs/` conforming to `src/content/config.ts`.
4. **Validation Gate:** Never declare a change complete without running `bun run build` and ensuring all static routes generate with 0 errors.
