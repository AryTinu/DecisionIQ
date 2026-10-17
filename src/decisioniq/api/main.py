
from fastapi import FastAPI

app = FastAPI(
    title="DecisionIQ API",
    description="Inventory intelligence, demand forecasting, risk detection, and optimization.",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "Welcome to DecisionIQ",
        "status": "running",
        "version": "0.1.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "decisioniq-api",
    }
