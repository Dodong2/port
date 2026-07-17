# Gumamit ng slim base image para mas mabilis mag-build
FROM python:3.11-slim

WORKDIR /app

# I-install muna ang dependencies (hiwalay na step para ma-cache ni
# Docker - hindi na ulit i-i-install kung hindi nagbago ang
# requirements.txt sa susunod na build)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# I-download ang embedding model DURING BUILD TIME - mabilis ang
# internet ng build servers, kaya dito na natin gagawin 'to, hindi sa
# runtime. Mabe-bake ito sa loob mismo ng image.
RUN python -c "from fastembed import TextEmbedding; TextEmbedding(model_name='sentence-transformers/all-MiniLM-L6-v2')"

# Ngayon i-kopya ang natitirang code
COPY . .

# Runtime: gamitin na ang naka-bake nang model, huwag nang mag-check
# online pa
ENV HF_HUB_OFFLINE=1
ENV TRANSFORMERS_OFFLINE=1

# HF Spaces (Docker SDK) ay umaasang naka-expose sa port 7860
EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]