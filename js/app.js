/* ==========================================================================
   app.js — shared project data + small utilities used across every page.
   Figures below are pulled directly from the trained pipeline's
   outputs/ (model_comparison, feature_importance, district_risk_scores).
   ========================================================================== */

const PROJECT = {
  name: "CropSense AI",
  fullTitle: "AI-Driven Crop Yield & Climate Risk Prediction for Indian Districts",
  districts: 50,
  crops: 10,
  records: 8000,
  yearStart: 2005,
  yearEnd: 2023,
  bestModel: "XGBoost",
  bestR2: 0.931,
  github: "https://github.com/your-username/crop-yield-ai-project",
};

const MODEL_STATS = [
  { model: "Linear Regression", rmse: 0.548, mae: 0.423, r2: 0.713 },
  { model: "Gradient Boosting", rmse: 0.312, mae: 0.231, r2: 0.893 },
  { model: "Random Forest",     rmse: 0.278, mae: 0.209, r2: 0.912 },
  { model: "XGBoost",           rmse: 0.251, mae: 0.188, r2: 0.931, best: true },
  { model: "Bi-LSTM (Rice, time-series)", rmse: 0.192, mae: 0.147, r2: 0.945 },
];

const FEATURE_IMPORTANCE = [
  { name: "NDVI", value: 0.241 },
  { name: "Rainfall", value: 0.198 },
  { name: "Soil Moisture", value: 0.163 },
  { name: "Water Index", value: 0.121 },
  { name: "Temperature", value: 0.098 },
  { name: "Crop Type", value: 0.081 },
  { name: "Humidity", value: 0.058 },
  { name: "District", value: 0.040 },
];

const PIPELINE_STEPS = [
  { title: "Data Ingestion", desc: "8,000 district-crop-year records (2005–2023) across 50 districts and 10 crops." },
  { title: "Preprocessing", desc: "Missing-value imputation, encoding, feature engineering, train/test split." },
  { title: "EDA", desc: "Rainfall trends, yield distributions, correlation heatmaps, NDVI–yield relationships." },
  { title: "Model Training", desc: "Linear Regression, Random Forest, Gradient Boosting, XGBoost, Bi-LSTM." },
  { title: "Evaluation", desc: "RMSE, MAE, R² comparison — XGBoost selected as production model." },
  { title: "Risk Scoring", desc: "Composite Climate Risk Index from rainfall variability, NDVI stress, temp anomaly." },
  { title: "Deployment", desc: "Flask REST API on AWS EC2 / Lambda + API Gateway, served to this frontend." },
];

/* ---------------- utilities ---------------- */
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $all(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("failed to load " + path);
    return await res.json();
  } catch (e) {
    console.warn("loadJSON fallback:", e.message);
    return null;
  }
}

function setFooterYear() {
  $all("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
}

document.addEventListener("DOMContentLoaded", setFooterYear);
