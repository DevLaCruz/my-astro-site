---
title: "Getting Started"
description: "Install devlacruz-hashlib and hash your first value in under 2 minutes."
order: 1
section: "Introduction"
---

## Installation

Install from PyPI:

```bash
pip install devlacruz-hashlib
```

Pin a minimum version for production (recommended):

```bash
pip install "devlacruz-hashlib>=0.1.8"
```

**Requirements:** Python 3.8+ · No external dependencies.

## Your first hash

```python
from devlacruz_hashlib import hash_value

result = hash_value("user@example.com")
print(result)
# e.g. "5d41402abc4b2a76b9719d911017c592..."
```

The function returns a hex-encoded SHA-256 digest. Same input → same output, always.

## Why hash before sending to LLMs?

Sending raw email addresses, user IDs or any PII to external AI APIs violates Zero-Trust privacy principles: you lose control the moment data leaves your perimeter.

```python
from devlacruz_hashlib import hash_value

def build_safe_context(user_email: str, query: str) -> dict:
    """Replace PII with a stable anonymous identifier before calling an LLM."""
    return {
        "user_ref": hash_value(user_email),  # anonymized but still unique
        "query": query,
    }

# The LLM receives a hash, never the email
safe_ctx = build_safe_context("alice@company.com", "Summarize my documents")
```

## Next steps

- [API Reference](/projects/hashlib/docs/api-reference/) — full function signatures and options
- [Examples](/projects/hashlib/docs/examples/) — real-world patterns including Django and CirIAco integration
