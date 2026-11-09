---
title: "Architecture & DAG Traversal"
description: "Directed Acyclic Graph structures for deterministic token budgeting and multi-hop reasoning."
order: 2
section: "Architecture"
---

## Deterministic Subgraph Traversal

When an LLM agent requires external context, CirIAco does not execute a naive cosine similarity search across isolated chunks. Instead, it extracts **causally complete subgraphs**.

```text
       [ Atmo A: Foundational Theorem ]
                  ▲
                  │  (Cryptographic Lineage)
       [ Atmo B: Algorithmic Variant ]
                  ▲
                  │
       [ Atmo C: Empirical Benchmark ]
```

### Context Packing Algorithm

1. **Seed Identification:** Identify entry `Atmo` nodes via dense vector similarity over propositions.
2. **Upward Traversal:** Walk parent hashes to gather all necessary axiomatic foundations until the token budget is reached.
3. **Downward Expansion:** Include immediate validated corollaries if context window space permits.
4. **Serialization:** Emit a compact machine-readable serialization (YAML/JSON) directly into the model's context window.

## Zero-Trust Privacy Boundary

CirIAco enforces strict boundaries when operating with third-party LLMs:
- Proprietary entities and PII are obfuscated via deterministic SHA-256 hashes (`devlacruz-hashlib`).
- The model reasons over opaque symbols (`<NODE_7f8a9...>`), preserving intellectual property and privacy while keeping relational semantics intact.
