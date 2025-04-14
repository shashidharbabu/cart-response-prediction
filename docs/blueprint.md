# **App Name**: CAR-T Predict

## Core Features:

- Data Import: Data ingestion from GEO and TCGA.
- Feature Engineering: Feature engineering based on cytokine levels and genomic variants.
- Model Training: XGBoost model training with Hyperopt for hyperparameter tuning.
- SHAP Analysis & Visualization: SHAP analysis for feature importance and model explainability. Display top biomarkers and individual-level force plots.
- Prediction Display: Display of patient CAR-T therapy response prediction (responder vs non-responder).

## Style Guidelines:

- Primary color: White or light grey for a clean, clinical feel.
- Secondary color: A calming blue (#3498db) to represent trust and reliability.
- Accent: A teal color (#008080) to highlight key information and interactive elements.
- Clear and readable typography, optimized for scientific data display.
- Structured layout with clear sections for data input, prediction results, and SHAP explanations.
- Use of scientific and medical icons to represent different data types and features.

## Original User Request:
.

🔬 CAR-T Therapy Response Prediction: AI-Powered Outcome Modeling for Cell Therapy
📌 Project Overview
Objective:
This project aims to predict patient response to CAR-T cell therapy using a machine learning model trained on genomic and cytokine profile data. Leveraging explainable AI (XAI) techniques, we identify key biological markers that influence therapy success, enabling better patient stratification and more informed clinical decisions.

🚀 Key Features
✅ Predicts CAR-T therapy response (responder vs non-responder)

✅ Integrates multi-omics: cytokine levels + genomic variants

✅ Uses SHAP for biological insight & model interpretability

✅ Built with scalable, reproducible, and explainable ML pipeline

✅ Designed for translational use in immunotherapy research

🧪 Dataset & Sources
GEO (Gene Expression Omnibus): Cytokine release patterns pre-/post-infusion

TCGA: Exome sequencing and mutation data

200+ patient samples from publicly available CAR-T therapy trials

Response labels derived from trial metadata: complete remission vs relapse

🛠 Tech Stack
Layer	Tools Used
Data Handling	Python, Pandas, BioPython, NumPy
Modeling	scikit-learn, XGBoost, Hyperopt
Explainability	SHAP (force plots, feature ranking), Seaborn, Matplotlib
Validation	SciPy (Mann-Whitney U, Levene’s test), Statsmodels
Dashboard (optional)	Plotly Dash or Streamlit (for visual exploration by clinicians)
⚙️ End-to-End Workflow
1. Data Collection & Cleaning
Downloaded cytokine time-series and VCF mutation data from GEO & TCGA

Standardized cytokine levels (IL-6, TNF-α, IFN-γ, etc.) across patients

Parsed genomic variants and mapped mutations to known CAR-T response pathways (e.g., CD19, BTK)

2. Feature Engineering
Generated time-based features from cytokine spike rates post-infusion

Counted variant burden in key immune genes using BioPython

One-hot encoded categorical trial metadata (e.g., cancer subtype, conditioning regimen)

3. Model Training
Split data 80/20 with stratified sampling

Trained an XGBoost classifier with Hyperopt for tuning

Evaluated using F1-score, ROC-AUC, and precision-recall

4. Interpretability with SHAP
Applied SHAP to extract top influential biomarkers per patient

Visualized global feature importance and individual-level force plots

Highlighted interpretable relationships such as elevated IL-6 + CD19 mutations → likely non-response

5. Statistical Validation
Performed Mann-Whitney U test on top SHAP-ranked features to confirm significance (p < 0.05)

Used Levene’s test to ensure homogeneity of variance before group comparison

6. Optional: Clinical Exploration Dashboard
Built a Streamlit app to enable clinical researchers to explore individual predictions, see SHAP explanations, and filter by mutation/cytokine profiles.

📊 Key Results
Metric	Value
AUC-ROC	0.91
F1 Score	0.83
Precision (Non-responders)	0.87
Top Features	IL-6 spike, CD19 variant load, IFN-γ baseline, BTK mutation presence
🧠 Insights & Contributions
IL-6 and TNF-α spikes within 24h of infusion are strong indicators of cytokine storm and likely poor outcomes

CD19 and BTK mutation burden correlated with treatment resistance

SHAP allowed model transparency, enabling clinicians to trust the predictions and focus on patient-specific risks

📂 Repo Structure (Optional)
bash
Copy
Edit
📁 car-t-response-prediction/
├── data/                        # Contains processed cytokine & genomic data
├── notebooks/                  # Jupyter notebooks for EDA, modeling, SHAP
├── models/                     # Serialized XGBoost models
├── dashboard/                  # Streamlit or Dash visualization app
├── scripts/                    # ETL, feature engineering, training scripts
├── requirements.txt
└── README.md
✅ Future Work
Integrate clinical lab values (e.g., LDH, CRP) for even richer modeling

Extend to time-series models (RNN, TCN) for dynamic prediction

Collaborate with oncology experts for hypothesis-driven feature refinement
  