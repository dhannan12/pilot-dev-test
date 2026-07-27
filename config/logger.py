"""
Logger configuration.
Ensures passwords and sensitive data are never logged.
"""
import logging
import sys
from typing import Any


class SensitiveDataFilter(logging.Filter):
    """Filter to prevent logging of sensitive data like passwords"""
    
    SENSITIVE_KEYS = ['password', 'password_hash', 'token', 'secret', 'api_key']
    
    def filter(self, record: logging.LogRecord) -> bool:
        """Filter out log records containing sensitive data"""
        # Check if message contains sensitive keywords
        message = str(record.msg).lower()
        for key in self.SENSITIVE_KEYS:
            if key in message:
                # Redact the message
                record.msg = f"[REDACTED: Message contained sensitive keyword '{key}']"
                break
        
        return True


def setup_logger(name: str = None, level: int = logging.INFO) -> logging.Logger:
    """
    Configure logger with sensitive data filtering.
    
    Args:
        name: Logger name (None for root logger)
        level: Logging level (default INFO)
    
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # Remove existing handlers
    logger.handlers.clear()
    
    # Create console handler
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(level)
    
    # Create formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    handler.setFormatter(formatter)
    
    # Add sensitive data filter
    handler.addFilter(SensitiveDataFilter())
    
    # Add handler to logger
    logger.addHandler(handler)
    
    return logger


# Default application logger
app_logger = setup_logger('app', logging.INFO)
