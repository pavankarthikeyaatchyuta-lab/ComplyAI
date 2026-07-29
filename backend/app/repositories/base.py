"""Base repository abstractions."""

from typing import Protocol, TypeVar

T = TypeVar("T")


class Repository(Protocol[T]):
    """Minimal repository protocol for future SQLite implementations."""

    def get(self, item_id: str) -> T:
        """Return an item by ID."""
        ...

    def save(self, item: T) -> T:
        """Persist an item and return it."""
        ...
