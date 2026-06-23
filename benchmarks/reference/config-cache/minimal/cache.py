"""Flockion answer: the stdlib already caches (ladder rung 3)."""
from functools import lru_cache

from .settings import Settings, load_settings


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return load_settings()
