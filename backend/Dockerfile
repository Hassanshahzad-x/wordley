FROM --platform=linux/amd64 python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1
ENV PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    git \
    curl \
    python3-dev \
    libffi-dev \
    libssl-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Create and activate virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Upgrade pip in the virtual environment
RUN pip install --upgrade pip

# Install numpy and cython first as they're common build dependencies
RUN pip install numpy==2.3.2 cython

# Install PyTorch with CPU support
RUN pip install torch==2.1.0+cpu torchvision==0.16.0+cpu torchaudio==2.1.0+cpu \
    -f https://download.pytorch.org/whl/torch_stable.html

# Handle requirements with problematic packages filtered out
COPY requirements.txt original_requirements.txt
RUN grep -v -E "(causal_conv1d|flash_attn|mamba_ssm|apex|xformers|torch_npu|triton)" original_requirements.txt > requirements_filtered.txt

# Install filtered requirements
RUN pip install --no-cache-dir -r requirements_filtered.txt || \
    (echo "Some packages failed, continuing..." && exit 0)

# Verify Flask is installed correctly
RUN python -c "import flask; print(f'Flask {flask.__version__} installed successfully')"

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt'); nltk.download('punkt_tab'); nltk.download('stopwords')" || \
    echo "NLTK download failed, continuing..."

COPY . .

EXPOSE 8080

CMD ["python", "server.py"]