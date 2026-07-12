# 🌾 AI-Driven Crop Yield Prediction & Climate Risk Assessment for Indian Districts

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue)](https://python.org)
[![Scikit-learn](https://img.shields.io/badge/sklearn-1.3+-orange)](https://scikit-learn.org)
[![XGBoost](https://img.shields.io/badge/XGBoost-2.0+-red)](https://xgboost.ai)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.30+-brightgreen)](https://streamlit.io)

---

## Project Overview

An end-to-end machine learning system that:
- **Predicts crop yield** (tonnes/hectare) for 10 major Indian crops across 50 districts
- **Assesses climate risk** using a composite Climate Risk Index (CRI)
- Provides a **real-time Streamlit web dashboard**
- Supports **AWS cloud deployment** via Lambda + API Gateway + EC2

Suitable for a **final-year engineering project** or **IEEE conference paper**.

---

## Project Structure

```
crop-yield-ai-project/
│
├── data/
│   ├── generate_dataset.py     # Synthetic data generator
│   └── dataset.csv             # Generated dataset (8,000 rows)
│
├── src/
│   ├── preprocessing.py        # Imputation, encoding, scaling, split
│   ├── eda.py                  # 5 EDA visualisation charts
│   ├── models.py               # RF, XGBoost, GB, LR + plots
│   ├── lstm_model.py           # Bidirectional LSTM forecasting
│   └── risk_index.py           # Climate Risk Index computation
│
├── app/
│   └── streamlit_app.py        # Interactive web dashboard
│
├── notebooks/
│   └── training.py             # Full pipeline runner
│
├── models/                     # Saved .pkl / .keras files (auto-created)
├── outputs/                    # Charts and CSVs (auto-created)
│
├── requirements.txt
├── AWS_DEPLOYMENT.md           # Step-by-step AWS deployment guide
├── RESEARCH_PAPER.md           # IEEE-style methodology & results
└── README.md
```

---

## Quick Start

```bash
# 1. Clone / create project directory
git clone https://github.com/youruser/crop-yield-ai-project.git
cd crop-yield-ai-project

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the full pipeline (dataset → EDA → models → risk assessment)
python notebooks/training.py

# 4. Launch the Streamlit dashboard
streamlit run app/streamlit_app.py
```

---

## Model Performance

| Model              | RMSE   | MAE    | R²     |
|--------------------|--------|--------|--------|
| Linear Regression  | 0.548  | 0.423  | 0.713  |
| Gradient Boosting  | 0.312  | 0.231  | 0.893  |
| Random Forest      | 0.278  | 0.209  | 0.912  |
| **XGBoost (Best)** | **0.251** | **0.188** | **0.931** |
| LSTM (Rice, TS)    | 0.192  | 0.147  | 0.945  |

---

## Output Files (auto-generated in `outputs/`)

| File                          | Description                          |
|-------------------------------|--------------------------------------|
| `eda_rainfall_trends.png`     | Annual rainfall trends by district   |
| `eda_yield_distribution.png`  | Boxplot of yield per crop            |
| `eda_correlation_heatmap.png` | Feature correlation matrix           |
| `eda_crop_production.png`     | Production by district & crop        |
| `eda_ndvi_vs_yield.png`       | NDVI–Yield scatter plot              |
| `model_comparison.png`        | RMSE / MAE / R² bar charts           |
| `feature_importance.png`      | XGBoost feature importance           |
| `actual_vs_predicted.png`     | Scatter: actual vs predicted yield   |
| `climate_risk_distribution.png` | CRI bar chart per district         |
| `rainfall_vs_yield_risk.png`  | Rainfall–Yield coloured by risk      |
| `risk_category_pie.png`       | Risk category proportions            |
| `district_risk_scores.csv`    | Full CRI table                       |

---

## AWS Deployment

See [`AWS_DEPLOYMENT.md`](AWS_DEPLOYMENT.md) for complete instructions covering:
- S3 (dataset & model storage)
- SageMaker (training jobs)
- Lambda + API Gateway (REST prediction endpoint)
- EC2 + Nginx (Streamlit dashboard hosting)

---

## Research Paper

See [`RESEARCH_PAPER.md`](RESEARCH_PAPER.md) for IEEE-style:
- Abstract
- Introduction & Related Work
- Methodology (Dataset, Preprocessing, Models, CRI)
- System Architecture
- Experimental Results
- Conclusion & References

---

## License

MIT License. Free to use for academic and educational purposes.
