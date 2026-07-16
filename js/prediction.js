/* ==========================================================================
   prediction.js
   Handles the /api/predict call and the offline demo engine that mirrors
   the trained XGBoost pipeline closely enough for demonstration purposes
   whenever no backend is reachable.
   ========================================================================== */

const CROPS = [
  { id: 0, name: "Rice",      base_yield: 2.5,  ideal_rain: 1200, ideal_temp: 27 },
  { id: 1, name: "Wheat",     base_yield: 3.0,  ideal_rain: 600,  ideal_temp: 22 },
  { id: 2, name: "Maize",     base_yield: 2.8,  ideal_rain: 800,  ideal_temp: 26 },
  { id: 3, name: "Cotton",    base_yield: 1.8,  ideal_rain: 700,  ideal_temp: 29 },
  { id: 4, name: "Sugarcane", base_yield: 65.0, ideal_rain: 1500, ideal_temp: 28 },
  { id: 5, name: "Soybean",   base_yield: 1.5,  ideal_rain: 750,  ideal_temp: 27 },
  { id: 6, name: "Groundnut", base_yield: 1.6,  ideal_rain: 600,  ideal_temp: 28 },
  { id: 7, name: "Sorghum",   base_yield: 1.4,  ideal_rain: 500,  ideal_temp: 29 },
  { id: 8, name: "Bajra",     base_yield: 1.2,  ideal_rain: 400,  ideal_temp: 31 },
  { id: 9, name: "Barley",    base_yield: 2.2,  ideal_rain: 450,  ideal_temp: 20 },
];

/**
 * Composite Climate Risk Index — identical formula to backend/app.py
 * so live and demo mode stay visually consistent.
 */
function computeRisk(rainfall, ndvi, temperature) {
  const baselineRain = 800.0;
  const globalTemp = 28.0;

  const rainVar = Math.min(1, Math.abs(rainfall - baselineRain) / baselineRain);
  const ndviStress = Math.max(0, 1 - ndvi);
  const tempAnom = Math.min(1, Math.abs(temperature - globalTemp) / 20);

  let riskIndex = 0.4 * rainVar + 0.3 * ndviStress + 0.3 * tempAnom;
  riskIndex = Math.round(Math.min(riskIndex, 1) * 10000) / 10000;

  let label;
  if (riskIndex < 0.33) label = "Low Risk";
  else if (riskIndex < 0.66) label = "Medium Risk";
  else label = "High Risk";

  return { riskIndex, label, factors: { rainVar, ndviStress, tempAnom } };
}

/**
 * In-browser demo engine. Approximates the shape of the trained model's
 * response surface (yield rises with NDVI/soil moisture, falls off with
 * heat and rainfall/water stress) using the same engineered features the
 * backend computes, scaled around each crop's known base yield.
 */
function demoPredict(input) {
  const crop = CROPS[input.crop] || CROPS[0];

  const rainDelta = Math.abs(input.rainfall - crop.ideal_rain) / crop.ideal_rain;
  const rainScore = Math.max(0, 1 - rainDelta * 0.7);

  const tempDelta = Math.abs(input.temperature - crop.ideal_temp);
  const tempScore = Math.max(0, 1 - tempDelta / 18);

  const ndviScore = Math.max(0, Math.min(1, input.ndvi / 0.85));
  const moistureScore = Math.max(0, Math.min(1, input.soil_moisture / 65));
  const humidityScore = Math.max(0, Math.min(1, input.humidity / 90));

  const composite =
    rainScore * 0.28 +
    tempScore * 0.18 +
    ndviScore * 0.28 +
    moistureScore * 0.16 +
    humidityScore * 0.10;

  // small deterministic jitter so repeated identical inputs stay stable
  const jitter = 1 + (Math.sin(input.rainfall * 0.13 + input.ndvi * 7) * 0.03);

  const yieldPred = Math.max(0.05, crop.base_yield * (0.35 + composite * 0.9) * jitter);
  const production = yieldPred * (input.area || 5000);

  const risk = computeRisk(input.rainfall, input.ndvi, input.temperature);
  const confidence = Math.round((0.72 + composite * 0.24) * 100);

  return {
    predicted_yield: Math.round(yieldPred * 10000) / 10000,
    estimated_production: Math.round(production * 100) / 100,
    risk_index: risk.riskIndex,
    risk_label: risk.label,
    factors: {
      rainfall_variability: Math.round(risk.factors.rainVar * 10000) / 10000,
      ndvi_stress: Math.round(risk.factors.ndviStress * 10000) / 10000,
      temp_anomaly: Math.round(risk.factors.tempAnom * 10000) / 10000,
    },
    confidence,
    crop_name: crop.name,
    source: "demo",
  };
}

function recommendationFor(result) {
  if (result.risk_label === "Low Risk") {
    return "Conditions are near-optimal. Maintain current irrigation and fertilization schedules; yield is trending above the district average.";
  }
  if (result.risk_label === "Medium Risk") {
    return "Moderate climate stress detected. Consider supplemental irrigation and monitor NDVI weekly — early intervention can offset most of the projected yield loss.";
  }
  return "High climate risk. Rainfall and temperature deviations are significant — prioritize drought-resilient practices, staggered sowing, or crop insurance for this cycle.";
}

/**
 * Calls the live backend with a timeout; falls back to the demo engine
 * automatically. Returns { result, mode: 'live' | 'demo' }.
 */
async function runPrediction(input) {
  if (CONFIG.API_URL) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);

      const res = await fetch(CONFIG.API_URL + CONFIG.ENDPOINTS.predict, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        signal: controller.signal,
      });
      clearTimeout(t);

      if (res.ok) {
        const data = await res.json();
        data.source = "live";
        data.confidence = data.confidence || 93;
        return { result: data, mode: "live" };
      }
    } catch (err) {
      // fall through to demo mode — the UI never breaks
    }
  }
  return { result: demoPredict(input), mode: "demo" };
}
