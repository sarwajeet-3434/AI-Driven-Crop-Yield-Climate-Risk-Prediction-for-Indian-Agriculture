/* ==========================================================================
   config.js
   The ONLY file you need to touch to connect a real backend.
   Point API_URL at your deployed Flask/FastAPI service (Render, Railway,
   AWS API Gateway, etc). Everything else in the app already calls
   `${API_URL}/api/predict` via fetch() and falls back automatically to the
   in-browser demo engine (js/prediction.js) if the request fails or times out.
   ========================================================================== */

const CONFIG = {
  // Example: "https://cropyield-api.onrender.com"
  API_URL: "",

  ENDPOINTS: {
    predict:  "/api/predict",
    health:   "/api/health",
    districts:"/api/districts",
    modelStats:"/api/model-stats",
  },

  // ms to wait for the live API before silently switching to demo mode
  REQUEST_TIMEOUT: 4000,

  // shown in the UI when no backend is reachable
  DEMO_MODE_LABEL: "Demo Prediction Mode — running locally in your browser",
  LIVE_MODE_LABEL: "Live model — connected to backend",
};
