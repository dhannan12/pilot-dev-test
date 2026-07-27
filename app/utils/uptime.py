"""
Application uptime tracking utility.

This module captures the application start time and provides a function
to calculate the uptime in seconds.
"""
import time

# Capture application start time when module is imported
_start_time = time.time()


def get_uptime_seconds() -> int:
    """
    Calculate application uptime in seconds.
    
    Returns:
        int: Number of seconds since application start
    """
    return int(time.time() - _start_time)


def get_start_time() -> float:
    """
    Get the application start timestamp.
    
    Returns:
        float: Unix timestamp when application started
    """
    return _start_time
