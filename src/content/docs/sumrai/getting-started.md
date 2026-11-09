---
title: "Architecture & FastMCP Tooling"
description: "Dual-Ring agentic execution runtime and Model Context Protocol implementation."
order: 1
section: "Architecture"
---

## Dual-Ring Architecture

SumrAI decouples long-horizon deliberation from real-time interactive response:

```text
 ┌────────────────────────────────────────────────────────┐
 │                    INGESTION CHANNELS                  │
 │      Web Chat (SSE HTTP)    /    Telegram Polling      │
 └──────────────┬─────────────────────────┬───────────────┘
                │                         │
                ▼                         ▼
 ┌──────────────────────────────┐ ┌──────────────────────────────┐
 │   RING 1: OpenFang (Rust)    │ │  RING 2: Django Ninja        │
 │   - Autonomous ReAct loop    │ │  - Token-to-token streaming  │
 │   - Proactive scheduler      │ │  - Granian ASGI (<500ms)     │
 │   - MCP Client over SSE      │ │  - FastMCP Tool execution    │
 └──────────────┬───────────────┘ └──────────────┬───────────────┘
                │                                │
                └───────────────┬────────────────┘
                                │ Typed Tool Invocations (MCP)
                                ▼
 ┌────────────────────────────────────────────────────────┐
 │               FastMCP Server (Backend Engine)          │
 │   - Deterministic Vault Tokenization (Rust FFI)        │
 │   - Hybrid Vector Search (PostgreSQL 16 + pgvector)    │
 └────────────────────────────────────────────────────────┘
```

## FastMCP Server Integration

Tools are exposed via FastMCP using strict type signatures:

```python
from mcp.server.fastmcp import FastMCP
from devlacruz_hashlib import hash_value

mcp = FastMCP("sumrai-core")

@mcp.tool()
def search_knowledge_subgraph(query_embedding: list[float], limit: int = 5) -> list[dict]:
    """Retrieve verified proposition nodes matching query semantics."""
    # Queries pgvector with HNSW index under strict token constraints
    return fetch_nearest_atoms(query_embedding, limit=limit)
```
