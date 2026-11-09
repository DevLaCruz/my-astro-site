---
title: "Overview & Getting Started"
description: "Understanding machine-native knowledge representation and why human document structures fail LLMs."
order: 1
section: "Introduction"
---

## The Problem with Human Documents for LLMs

Modern information retrieval for LLMs (traditional RAG) slices human documents into arbitrary token chunks. This creates three critical failure modes:

1. **Context Fragmentation:** A chunk split across paragraphs loses its logical antecedent.
2. **Citation Hallucination:** Models fabricate sources because text lacks cryptographic truth bounds.
3. **No Verifiable Lineage:** When a model gives an answer based on 5 different documents, verifying which author contributed what fact is mathematically impossible in unstructured text.

## The CirIAco Solution: Atomic Knowledge Graphs

CirIAco redesigns knowledge representation from first principles:

```text
Traditional Docs:   [ Chunk 1 ] --- (Arbitrary Split) ---> [ Chunk 2 ]
                                         ↓
CirIAco Architecture: [ Atmo 0x1A ] ─── Parent Link ───► [ Atmo 0x2B ]
                                         ↓
                                 (SHA-256 Verified DAG)
```

Each atomic unit (`Atmo`) contains:
- **Proposition Payload:** The standalone truth claim in structured format.
- **Parent Hashes:** Pointers to the foundational proofs or predecessor blocks.
- **Cryptographic Signature:** Digital seal guaranteeing immutability.

## Quick Ingestion Pattern

```python
from ciriaco.core import Atmo, KnowledgeDAG
from devlacruz_hashlib import hash_value

# 1. Initialize verifiable DAG
dag = KnowledgeDAG()

# 2. Define an atomic proposition
atmo_root = Atmo(
    content="Transformer attention scales quadratically with sequence length O(N^2).",
    references=["doi:10.48550/arXiv.1706.03762"]
)
dag.insert(atmo_root)

# 3. Derive dependent proposition
atmo_child = Atmo(
    content="Linear attention variants approximate the softmax kernel to achieve O(N) scaling.",
    parent_hashes=[atmo_root.hash]
)
dag.insert(atmo_child)

# 4. Verify cryptographic chain before LLM context packing
assert dag.verify_lineage(atmo_child.hash) is True
```

In the next sections, we explore the formal specification of `Atmo` blocks and the traversal algorithms used for agent context packing.
