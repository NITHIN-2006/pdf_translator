import uuid
import os

def generate_file_id() -> str:
    return str(uuid.uuid4())

def build_file_path(base: str, file_id: str, ext: str) -> str:
    return os.path.join(base, f"{file_id}{ext}")

def ensure_dir(path: str) -> None:
    if not os.path.exists(path):
        os.makedirs(path)
