"""Entry point for reports-api.

Renders customer reports on demand and serves cached renders from disk.
"""

import logging
import logging.handlers
import os
import pathlib

from reports_api import render, storage
from reports_api.http import Application

CACHE_DIR = pathlib.Path(os.environ.get("REPORT_CACHE_DIR", "/var/cache/reports"))
LOG_FILE = os.environ.get("LOG_FILE", "/var/log/reports/reports-api.log")

# Rotate our own logs: 50MB per file, keep 10.
_handler = logging.handlers.RotatingFileHandler(
    LOG_FILE, maxBytes=50 * 1024 * 1024, backupCount=10
)
_handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s %(name)s %(message)s"))
logging.getLogger().addHandler(_handler)
logging.getLogger().setLevel(logging.INFO)

log = logging.getLogger(__name__)


def build_app() -> Application:
    app = Application()

    @app.get("/reports/<report_id>")
    def get_report(report_id: str):
        cached = CACHE_DIR / f"{report_id}.pdf"
        if cached.exists():
            log.info("cache hit for %s", report_id)
            return cached.read_bytes()

        log.info("cache miss for %s, rendering", report_id)
        rendered = render.report(report_id, storage.load(report_id))
        cached.write_bytes(rendered)
        return rendered

    return app


if __name__ == "__main__":
    build_app().serve(host="0.0.0.0", port=8080)
