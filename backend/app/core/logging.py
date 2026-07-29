"""Logging configuration for the backend."""

import logging


def configure_logging(level: str) -> None:
    """Configure application-wide logging."""
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )
