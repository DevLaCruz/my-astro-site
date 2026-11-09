---
name: "devlacruz-hashlib"
tagline: "Zero-Trust cryptographic hashing for Python"
description: "A Python library providing simple, consistent SHA-256 hashing utilities with Zero-Trust Privacy principles. Designed to protect PII before it reaches LLM agents, external APIs, or application logs."
status: "stable"
tech: ["Python", "SHA-256", "Privacy", "Cryptography"]
github: "https://github.com/alejandrodelacruzmora/devlacruz-hashlib"
pypi: "https://pypi.org/project/devlacruz-hashlib/"
featured: true
order: 1
hasDocs: true
---

## About

`devlacruz-hashlib` was built from a real need: before sending user data to any LLM agent or external API, PII must be anonymized deterministically. The library provides a thin, opinionated layer over Python's standard `hashlib` focused on **Zero-Trust Privacy by default**.

Used in production in [CirIAco](/projects/ciriaco) — a knowledge management platform — to anonymize user identifiers before any AI inference call.

## Design principles

- **Deterministic** — same input always produces the same hash, enabling consistent pseudonymization across services
- **Simple API** — a minimal surface area with no surprising behavior
- **Privacy boundary** — designed to sit at the boundary between your data and external services

## Why not just use `hashlib` directly?

Python's built-in `hashlib` is excellent. `devlacruz-hashlib` adds a consistent high-level interface, sane defaults (SHA-256 hex digest), and helper utilities for common patterns — making it easy to do the right thing without boilerplate.
