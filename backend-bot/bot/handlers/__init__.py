"""
Bot handlers package

This package contains all bot message handlers organized by functionality.

By Bolgaro4ka / 2025
"""

from .start import register_start_handlers


def register_all_handlers(dp):
    """Register all bot handlers"""
    register_start_handlers(dp)
