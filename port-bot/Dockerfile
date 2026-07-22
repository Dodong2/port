# ---------- STAGE 1: Builder ----------
FROM python:3.11-slim AS builder

WORKDIR /app

# CPU-only torch muna (sobrang laki ng CUDA version, hindi naman
# ginagamit sa laptop/VPS na walang GPU - ito ang pinakamalaking
# space-saver dito)
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# I-bake ang embedding model sa build stage, sa sarili nitong cache
# folder para ma-kopya lang sa final stage
ENV HF_HOME=/app/.cache/huggingface
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')"

# ---------- STAGE 2: Runtime (yung aactual na ipa-deploy) ----------
FROM python:3.11-slim

WORKDIR /app

# I-kopya lang ang mga naka-install na packages mula sa builder stage
# (hindi na kasama yung build tools/cache na ginamit lang habang nag-i-install)
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app/.cache/huggingface /app/.cache/huggingface

# Runtime: gamitin na lang ang naka-bake na model, offline na
ENV HF_HOME=/app/.cache/huggingface
ENV HF_HUB_OFFLINE=1
ENV TRANSFORMERS_OFFLINE=1

# Non-root user para mas secure (senior practice din 'to)
RUN useradd -m appuser
COPY --chown=appuser:appuser . .
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]