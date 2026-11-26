import json
from pathlib import Path

import aiofiles

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


async def read_json(filename: str):
    async with aiofiles.open(DATA_DIR / filename, mode="r", encoding="utf-8") as file:
        return json.loads(await file.read())
