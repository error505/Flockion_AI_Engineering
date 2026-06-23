"""Naive answer: a hand-rolled cache with TTL, eviction, and locking,
reinventing functools.lru_cache. Representative of what gets produced when
the stdlib option is overlooked."""
import threading
import time
from typing import Any, Callable, Optional

from .settings import Settings, load_settings


class CacheEntry:
    def __init__(self, value: Any, expires_at: Optional[float]) -> None:
        self.value = value
        self.expires_at = expires_at

    def is_expired(self) -> bool:
        return self.expires_at is not None and time.monotonic() > self.expires_at


class CacheManager:
    def __init__(self, ttl_seconds: Optional[float] = None, max_size: int = 128) -> None:
        self._ttl = ttl_seconds
        self._max_size = max_size
        self._store: dict[str, CacheEntry] = {}
        self._order: list[str] = []
        self._lock = threading.Lock()

    def get(self, key: str) -> Optional[Any]:
        with self._lock:
            entry = self._store.get(key)
            if entry is None:
                return None
            if entry.is_expired():
                self._evict(key)
                return None
            self._touch(key)
            return entry.value

    def set(self, key: str, value: Any) -> None:
        with self._lock:
            expires_at = time.monotonic() + self._ttl if self._ttl is not None else None
            self._store[key] = CacheEntry(value, expires_at)
            self._touch(key)
            while len(self._order) > self._max_size:
                self._evict(self._order[0])

    def get_or_set(self, key: str, factory: Callable[[], Any]) -> Any:
        cached = self.get(key)
        if cached is not None:
            return cached
        value = factory()
        self.set(key, value)
        return value

    def clear(self) -> None:
        with self._lock:
            self._store.clear()
            self._order.clear()

    def _touch(self, key: str) -> None:
        if key in self._order:
            self._order.remove(key)
        self._order.append(key)

    def _evict(self, key: str) -> None:
        self._store.pop(key, None)
        if key in self._order:
            self._order.remove(key)


_settings_cache = CacheManager(max_size=1)


def get_settings() -> Settings:
    return _settings_cache.get_or_set("settings", load_settings)
