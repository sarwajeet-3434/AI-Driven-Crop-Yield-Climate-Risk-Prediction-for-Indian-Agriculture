<div align="center">

# 🌾 SmartHarvest AI

### AI-Powered Crop Yield Prediction & Climate Risk Assessment for Indian Agriculture

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Website-success?style=for-the-badge)](https://smart-harvest-ai.vercel.app/)
[![Python](https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python)]
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML-orange?style=for-the-badge&logo=scikitlearn)]
[![Streamlit](https://img.shields.io/badge/Frontend-Streamlit-red?style=for-the-badge&logo=streamlit)]
[![AWS](https://img.shields.io/badge/Cloud-AWS-yellow?style=for-the-badge&logo=amazonaws)]

<img src="images/banner.png" width="900" alt="SmartHarvest AI Banner">

### 🌐 Live Demo

**https://smart-harvest-ai.vercel.app/**

</div>

---

# 🌾 SmartHarvest AI

**SmartHarvest AI** is an AI-powered agricultural intelligence platform designed to predict crop yields and assess climate risks across Indian districts. By integrating climate analytics with machine learning, the platform helps farmers, researchers, and policymakers make informed agricultural decisions that improve productivity and reduce climate-related risks.

The system analyzes rainfall, temperature, humidity, soil moisture, vegetation indices (NDVI), and historical crop production data to generate accurate yield predictions and climate risk assessments through an interactive dashboard.

---

# 📖 Table of Contents

- Overview
- Features
- Live Demo
- Live Website Preview
- System Architecture
- Machine Learning Workflow
- Dataset Pipeline
- Prediction Workflow
- AWS Deployment Architecture
- Technologies Used
- Machine Learning Models
- Project Structure
- Installation
- Usage
- Deployment
- Future Scope
- Performance
- Author
- Contributing
- License

---

# 🚀 Live Demo

🌐 **Website**

https://smart-harvest-ai.vercel.app/

---

# ✨ Features

- 🌾 AI-based Crop Yield Prediction
- 🌦 Climate Risk Assessment
- 📊 Interactive Dashboard
- 📈 Real-time Prediction Visualization
- 🤖 Multiple Machine Learning Models
- 📉 Feature Importance Analysis
- 🗺 District-wise Crop Prediction
- 📊 Model Performance Comparison
- ☁ Cloud Deployment Ready
- 📱 Fully Responsive Interface

---

# 🖥 Live Website Preview

A look at the actual SmartHarvest AI web application in action.

### Landing Page

<p align="center">
<img src="images/hero-landing.png" width="900" alt="SmartHarvest AI Landing Page">
</p>

### About the Project

<p align="center">
<img src="images/about-section.png" width="900" alt="About the Project Section">
</p>

### What the System Does

<p align="center">
<img src="images/capabilities.png" width="900" alt="Capabilities Section">
</p>

### Prediction Demo

<p align="center">
<img src="images/prediction-demo.png" width="900" alt="Prediction Demo Page">
</p>

### Model Comparison

<p align="center">
<img src="images/model-comparison-charts.png" width="900" alt="Model Comparison Charts">
</p>

### District Climate-Risk Heatmap

<p align="center">
<img src="images/district-heatmap.png" width="900" alt="District Risk Heatmap">
</p>

### Future Scope

<p align="center">
<img src="images/future-scope.png" width="900" alt="Future Scope Section">
</p>

---

# 🏗 System Architecture

The end-to-end system spans data ingestion, ML processing, application services, and the user-facing dashboard, all running on AWS.

<p align="center">
<img src="images/system-architecture.png" width="900" alt="System Architecture">
</p>

---

# 🤖 Machine Learning Workflow

From problem definition through deployment and monitoring, the ML pipeline follows nine structured stages.

<p align="center">
<img src="images/ml-workflow.png" width="900" alt="Machine Learning Workflow">
</p>

---

# 🌾 Dataset Pipeline

Agricultural and climate data is sourced, ingested, validated, cleaned, and engineered into a model-ready dataset.

<p align="center">
<img src="images/dataset-pipeline.png" width="900" alt="Dataset Pipeline">
</p>

## Dataset Features

- Crop Name
- State
- District
- Rainfall
- Temperature
- Humidity
- Soil Moisture
- NDVI
- Crop Production
- Crop Yield

## Dataset Statistics

- 📊 8,000+ Records
- 🌾 Multiple Crop Types
- 🗺 30+ Indian Districts
- 🌦 Historical Climate Data
- 📈 Agricultural Statistics

---

# 🔮 Prediction Workflow

User inputs (district, crop, sowing date, irrigation type, soil type) flow through real-time data fetching, preprocessing, model prediction, and yield/risk calculation to deliver actionable insights.

<p align="center">
<img src="images/prediction-workflow.png" width="900" alt="Prediction Workflow">
</p>

---

# ☁ AWS Deployment Architecture

SmartHarvest AI is deployed on a fully managed AWS cloud stack covering frontend hosting, serverless application logic, ML inference, data storage, CI/CD, and security.

<p align="center">
<img src="images/aws-deployment.png" width="900" alt="AWS Deployment Architecture">
</p>

---

# 🛠 Technologies Used

| Category | Technology |
|-----------|------------|
| Programming | Python |
| Machine Learning | Scikit-Learn, XGBoost |
| Data Processing | Pandas, NumPy |
| Data Visualization | Matplotlib, Seaborn |
| Frontend | Streamlit |
| Cloud | AWS |
| Deployment | Vercel |
| Version Control | Git, GitHub |

---

# 🤖 Machine Learning Models

The following regression algorithms were evaluated:

- Linear Regression
- Random Forest Regressor
- Gradient Boosting Regressor
- XGBoost Regressor

The best-performing model was selected based on prediction accuracy and evaluation metrics.

---

# 📂 Project Structure

```
SmartHarvest-AI/
│
├── app/
│   ├── app.py
│   └── pages/
│
├── data/
│
├── models/
│
├── notebooks/
│
├── outputs/
│
├── src/
│
├── images/
│   ├── banner.png
│   ├── hero-landing.png
│   ├── about-section.png
│   ├── capabilities.png
│   ├── prediction-demo.png
│   ├── model-comparison-charts.png
│   ├── district-heatmap.png
│   ├── future-scope.png
│   ├── system-architecture.png
│   ├── ml-workflow.png
│   ├── dataset-pipeline.png
│   ├── prediction-workflow.png
│   └── aws-deployment.png
│
├── requirements.txt
│
├── README.md
│
└── LICENSE
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/SmartHarvest-AI.git
```

## Navigate to Project

```bash
cd SmartHarvest-AI
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# ▶ Run Locally

```bash
streamlit run app.py
```

The application will start at

```
http://localhost:8501
```

---

# ☁ Deployment

SmartHarvest AI supports deployment on:

- AWS EC2
- AWS S3
- AWS Lambda
- Amazon SageMaker
- Vercel

### Live Website

https://ai-driven-crop-yield-climate-risk-p-lilac.vercel.app/

---

# 📈 Performance

| Metric | Value |
|---------|-------|
| Prediction Accuracy | **92%+** |
| Dataset Records | **8,000+** |
| District Coverage | **30+** |
| Machine Learning Models | **4** |
| Prediction Time | **<2 seconds** |

---

# 🔮 Future Scope

- 🌦 Live Weather API Integration
- 🛰 Satellite Image Processing
- 📱 Android & iOS Mobile Application
- 🌱 Fertilizer Recommendation System
- 🐛 Pest Prediction
- 🍃 Crop Disease Detection
- 🤖 AI Chatbot for Farmers
- 🌍 Multi-language Support
- 🏛 Government Scheme Recommendation
- 📡 IoT Sensor Integration
- 🌾 Smart Irrigation Recommendation

---

# 👨‍💻 Author

## Sarwajeet Singh

**B.Tech Computer Science Engineering**

**Artificial Intelligence | Machine Learning | Data Science | AWS Cloud**

### 🌐 Portfolio

Add your portfolio link here

### 💼 LinkedIn

🔗 LinkedIn: [Sarwajeet Pratap Singh](https://www.linkedin.com/in/sarwajeet-p-singh)

### 📧 Email

sarwajeetpsingh3434@gmail.com

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Added new feature"
```

4. Push your changes.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# ⭐ Support

If you found this project helpful,

## ⭐ Please Star this Repository

It motivates me to build more AI-powered solutions for agriculture.

---


<div align="center">

## 🌱 SmartHarvest AI

### Empowering Agriculture Through Artificial Intelligence

Made with ❤️ by **Sarwajeet Pratap Singh**

</div>
