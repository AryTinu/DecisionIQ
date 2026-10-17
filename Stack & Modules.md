# DecisionIQ — Technology Stack

DecisionIQ combines machine learning, mathematical optimization, and AI orchestration to transform inventory and sales data into actionable business recommendations.

## 🏗️ System Architecture

### 1. Application Layer

| Component | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js + TypeScript | Interactive dashboard, data uploads, visualizations, and recommendations |
| **Backend API** | Python + FastAPI | REST APIs, request validation, and business logic |

### 2. Data Management Layer

| Component | Technology | Purpose |
|---|---|---|
| **Database** | PostgreSQL | Inventory, sales history, forecasts, and analysis results |
| **ORM** | SQLAlchemy | Database operations and query management |
| **Migrations** | Alembic | Versioned database schema changes |
| **Data Processing** | Pandas + NumPy | Data cleaning, transformation, and feature engineering |

### 3. Machine Learning Layer

| Component | Technology | Purpose |
|---|---|---|
| **Demand Forecasting** | XGBoost Regressor | Predict future product demand using historical and engineered features |
| **Baseline Model** | Linear Regression | Establish a benchmark to evaluate forecasting performance |
| **Risk Detection** | Random Forest Classifier | Classify inventory and stockout risk using labeled data |

### 4. Optimization Layer

| Component | Technology | Purpose |
|---|---|---|
| **Inventory Optimization** | Google OR-Tools | Determine reorder quantities subject to budget, capacity, and inventory constraints |

### 5. AI and Orchestration Layer

| Component | Technology | Purpose |
|---|---|---|
| **Workflow Orchestration** | LangGraph | Coordinate multi-step analysis and decision workflows |
| **LLM Integration** | LangChain | Integrate language models, prompts, tools, and document retrieval |

### 6. Development and Collaboration

| Component | Technology | Purpose |
|---|---|---|
| **Version Control** | Git | Track code changes and manage feature branches |
| **Repository Hosting** | GitHub | Host source code, manage collaboration, and review changes |

---

## 🔄 DecisionIQ Workflow

1. **Ingest** — Import and validate inventory and sales data.
2. **Process** — Clean the data and generate model-ready features.
3. **Forecast** — Predict future demand using XGBoost and compare against Linear Regression.
4. **Detect Risk** — Identify potential stockouts and inventory risks using Random Forest.
5. **Optimize** — Calculate reorder recommendations using Google OR-Tools.
6. **Orchestrate** — Coordinate analysis steps with LangGraph and use LangChain for LLM-powered tools and explanations where appropriate.
7. **Visualize** — Present forecasts, risk alerts, and recommended actions in the dashboard.

---

## 🎯 Core Objective

**Convert raw inventory data into explainable, data-driven decisions** by combining predictive analytics, constrained optimization, and AI-assisted workflows.
