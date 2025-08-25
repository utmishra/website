.PHONY: dev up down fmt lint mypy test migrate upgrade seed

dev:
uvicorn app.main:app --reload

up:
docker-compose up -d

down:
docker-compose down

fmt:
black .
ruff --fix .

lint:
ruff .

mypy:
mypy .

test:
pytest

migrate:
alembic revision --autogenerate -m "migration"

upgrade:
alembic upgrade head

seed:
python scripts/seed.py
