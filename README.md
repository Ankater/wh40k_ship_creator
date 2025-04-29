## Prerequisites

* Docker ⩾ 24.x
* Docker Compose (comes with recent Docker Desktop / docker-cli)

---

## Quick start

```bash
# 1. Build the PHP image (once)
docker compose build

# 2. Install PHP dependencies (creates ./vendor on the host)
docker compose run --rm app composer install \
  --no-interaction --prefer-dist --optimize-autoloader

# 3. Prepare environment & key (first run only)
docker compose run --rm app cp .env.example .env
docker compose run --rm app php artisan key:generate

# 4. Launch the stack
docker compose up
