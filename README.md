# CAR-T Therapy Response Prediction

**Predicting patient response to CAR-T cell therapy using machine learning models trained on genomic and cytokine profile data.**

## 📌 Overview

This project builds an explainable machine learning pipeline to predict the effectiveness of CAR-T cell therapy based on patient-specific cytokine release and genomic mutation profiles. By integrating multi-omics data and model interpretability techniques, it aims to support precision medicine decisions in immunotherapy.

---

## 🧬 Data Sources

- **Genomic Data**: VCF files from CAR-T clinical trial datasets (e.g., TCGA, GEO)
- **Cytokine Profiles**: Time-series measurements of key cytokines (IL-6, TNF-α, IFN-γ)
- **Clinical Labels**: Patient response (responder vs. non-responder)

---

## ⚙️ Methodology

### 1. Data Preprocessing
- Standardized cytokine data across time points
- Parsed mutation burden from genomic data
- Cleaned and merged datasets for modeling

### 2. Feature Engineering
- Peak cytokine level extraction
- Binary encoding of mutations in relevant genes (e.g., CD19, BTK)
- Combined multi-omics features into unified samples

### 3. Modeling & Evaluation
- Trained an XGBoost classifier with hyperparameter tuning
- Evaluated using F1-score, ROC-AUC, and confusion matrix
- Achieved AUC score of **0.91** and F1-score of **0.83**

### 4. Model Interpretability
- Applied SHAP to extract global and local feature attributions
- Identified IL-6 spikes and CD19 mutation burden as top predictors

---

## 🧪 Technologies Used

- **Languages**: Python
- **Libraries**: Pandas, NumPy, scikit-learn, XGBoost, SHAP, Matplotlib, Seaborn, BioPython
- **Development**: Jupyter Notebooks

---

## 📂 Project Structure

