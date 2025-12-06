import logging
import sys

logger = logging.getLogger("translation_backend")
logger.setLevel(logging.INFO)

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter("%(asctime)s | %(levelname)s | %(message)s"))

if not logger.handlers:
    logger.addHandler(handler)

def get_logger():
    return logger
