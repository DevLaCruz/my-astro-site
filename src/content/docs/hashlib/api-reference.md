---
title: "API Reference"
description: "Complete reference for all devlacruz-hashlib functions."
order: 2
section: "Reference"
---

## `hash_value`

The primary function. Hashes any string using SHA-256 and returns a hex digest.

```python
from devlacruz_hashlib import hash_value

hash_value(value: str) -> str
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `str` | The string to hash. Must not be empty. |

**Returns**

A lowercase hexadecimal SHA-256 digest (`str`).

**Raises**

- `ValueError` — if `value` is an empty string.
- `TypeError` — if `value` is not a string.

**Example**

```python
from devlacruz_hashlib import hash_value

# Hash an email
digest = hash_value("alejandro@example.com")
print(digest)  # → "a8f5f167f44f4964e6c998dee827110c..."

# Same input always returns the same hash
assert hash_value("test") == hash_value("test")

# Empty string raises
hash_value("")  # raises ValueError
```

---

> **Note:** This reference reflects `devlacruz-hashlib >= 0.1.8`.  
> Always check the [PyPI page](https://pypi.org/project/devlacruz-hashlib/) for the latest version details.
