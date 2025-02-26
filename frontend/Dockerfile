FROM python:3.9-slim

WORKDIR /app

COPY . .

CMD ["python3", "-m", "http.server", "8080", "--bind", "0.0.0.0"]