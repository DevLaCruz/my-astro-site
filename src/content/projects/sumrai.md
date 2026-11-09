---
name: "SumrAI"
tagline: "Zero-Trust Dual-Ring AI Gateway & FastMCP Runtime"
description: "A production agentic infrastructure combining an autonomous ReAct loop (OpenFang/Rust) with a sub-500ms token-streaming tool-execution pipeline leveraging Anthropic's Model Context Protocol (FastMCP) and pgvector."
status: "active"
tech: ["Python", "Rust", "FastMCP", "Django Ninja", "Granian", "PostgreSQL", "pgvector"]
github: "https://github.com/devlacruz"
featured: true
order: 2
hasDocs: true
---

## Overview

**SumrAI** is an AI Gateway and agentic execution runtime engineered around Zero-Trust principles and low-latency tool execution.

Rather than coupling autonomous agent reasoning with web serving, SumrAI introduces a **Dual-Ring Architecture**:

1. **Ring 1 — Autonomous Reasoning Loop (OpenFang / Rust):**
   - Background execution daemon handling long-running ReAct loops, multi-step planning, and proactive scheduling.
   - Connected as an MCP client via Server-Sent Events (SSE).

2. **Ring 2 — High-Frequency Web Gateway (Django Ninja + Granian ASGI):**
   - High-throughput streaming endpoint (`/api/brain/chat`) with sub-500ms latency.
   - Executes typed **Model Context Protocol (FastMCP)** tools synchronously and asynchronously against PostgreSQL 16 + `pgvector`.

## Zero-Trust Vault

To protect sensitive entities (financial amounts, identity tokens, internal identifiers), SumrAI intercepts context payloads using `devlacruz-hashlib` (Rust FFI). Sensitive records are tokenized into opaque identifiers (`<VAULT_ENTITY_...>`). The frontier model reasons purely over relationships and tool interfaces without exposing raw private data to external providers.
