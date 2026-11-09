---
title: "Examples"
description: "Real-world patterns: Django middleware, FastAPI, and CirIAco integration."
order: 3
section: "Reference"
---

## Protecting PII before an LLM call

```python
from devlacruz_hashlib import hash_value

def anonymize_payload(payload: dict, pii_keys: list[str]) -> dict:
    """Replace PII fields with their SHA-256 hashes."""
    return {
        k: hash_value(v) if k in pii_keys and isinstance(v, str) else v
        for k, v in payload.items()
    }

raw = {"email": "alice@company.com", "message": "Please summarize this."}
safe = anonymize_payload(raw, pii_keys=["email"])
# → {"email": "a8f5f...", "message": "Please summarize this."}
```

## Django middleware

```python
# your_project/middleware.py
from devlacruz_hashlib import hash_value
import logging

logger = logging.getLogger(__name__)

class AnonymizeLogsMiddleware:
    """Logs requests without exposing user emails."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            user_ref = hash_value(request.user.email)
            logger.info("Request from user_ref=%s path=%s", user_ref, request.path)
        return response
```

Register in `settings.py`:

```python
MIDDLEWARE = [
    # ...
    "your_project.middleware.AnonymizeLogsMiddleware",
]
```

## FastAPI dependency

```python
from fastapi import Depends, HTTPException
from devlacruz_hashlib import hash_value

def get_safe_user_ref(email: str) -> str:
    """Convert a user email to its anonymous hash for downstream services."""
    return hash_value(email)

@app.post("/analyze")
async def analyze(email: str, user_ref: str = Depends(get_safe_user_ref)):
    # user_ref is now a hash — safe to log, send to external APIs, etc.
    result = await call_llm_api(user_ref=user_ref)
    return result
```

## Usage in CirIAco

`devlacruz-hashlib` is used throughout [CirIAco](https://github.com/alejandrodelacruzmora/CirIAco) to hash user identifiers before any interaction with LLM services, following Zero-Trust Privacy principles:

```python
# Simplified from CirIAco's knowledge app
from devlacruz_hashlib import hash_value

class KnowledgeService:
    def prepare_rag_context(self, user, node_content: str) -> dict:
        return {
            "user_ref": hash_value(user.email),   # never expose raw email
            "content": node_content,               # knowledge is not PII
        }
```
