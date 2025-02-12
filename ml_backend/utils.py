import numpy as np
import pandas as pd
import pickle
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# load datasets
try:
    precautions_df = pd.read_csv("datasets/precautions_df.csv")
    workout_df = pd.read_csv("datasets/workout_df.csv")
    description_df = pd.read_csv("datasets/description.csv")
    medications_df = pd.read_csv("datasets/medications.csv")
    diets_df = pd.read_csv("datasets/diets.csv")
    
    # Load the symptom-severity for reference of symptoms
    symptoms_df = pd.read_csv("datasets/Symptom-severity.csv")
    symptoms_dict = symptoms_df['Symptom'].tolist()
    
    # Load new model and vectorizer
    best_model = pickle.load(open("./assets/best_model.pkl", "rb"))
    vectorizer = pickle.load(open("./assets/vectorizer.pkl", "rb"))
    
    logger.info("All datasets and new model loaded successfully")
except Exception as e:
    logger.error(f"Error loading data: {str(e)}")

def get_predicted_value(patient_symptoms):
    logger.info(f"Predicting disease for symptoms: {patient_symptoms}")
    
    # Filter valid symptoms
    valid_symptoms = [s for s in patient_symptoms if s in symptoms_dict]
    if not valid_symptoms:
        logger.warning("No valid symptoms provided")
        return "No prediction possible - invalid symptoms"
    
    # Join symptoms into a single string
    symptoms_text = ' '.join(valid_symptoms)
    
    # Transform using the vectorizer
    X_new = vectorizer.transform([symptoms_text])
    
    # Predict using the best model
    predicted_disease = best_model.predict(X_new)[0]
    logger.info(f"Predicted disease: {predicted_disease}")
    
    return predicted_disease

def helper(disease):
    logger.info(f"Getting details for disease: {disease}")
    # get description from description_df
    desc = description_df[description_df['Disease'] == disease]['Description']
    desc = " ".join(w for w in desc)

    # get precautions from precaution_df
    prec = precautions_df[precautions_df['Disease'] == disease][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']]
    prec = [w for w in prec.values]

    # get medication from medications_df
    medi = medications_df[medications_df['Disease'] == disease]['Medication']
    medi = [w for w in medi.values]

    # get diets from diets_df
    diet = diets_df[diets_df['Disease'] == disease]['Diet']
    diet = [w for w in diet.values]

    # get workouts from workouts_df
    work = workout_df[workout_df['disease'] == disease]['workout'].tolist()

    return desc, prec, medi, diet, work