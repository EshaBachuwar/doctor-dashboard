import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle

# Load the symptom data
symptoms_df = pd.read_csv("datasets/symtoms_df.csv")

# Create a better feature representation - convert symptom columns to a single list
def combine_symptoms(row):
    symptoms = []
    for i in range(1, 5):  # Assuming Symptom_1 to Symptom_4
        col = f'Symptom_{i}'
        if col in row and pd.notna(row[col]) and row[col] != '':
            symptoms.append(row[col])
    return ' '.join(symptoms)

symptoms_df['all_symptoms'] = symptoms_df.apply(combine_symptoms, axis=1)

# Use TF-IDF to convert text symptoms to numerical features
vectorizer = TfidfVectorizer(max_features=1000)
X = vectorizer.fit_transform(symptoms_df['all_symptoms'])
y = symptoms_df['Disease']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Try multiple models to find the best one
models = {
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'Neural Network': MLPClassifier(hidden_layer_sizes=(100,), max_iter=500, random_state=42)
}

best_model = None
best_accuracy = 0

for name, model in models.items():
    # Train model
    model.fit(X_train, y_train)
    
    # Predict and evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"{name} Accuracy: {accuracy:.4f}")
    print(classification_report(y_test, y_pred))
    
    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model

# Save the best model and vectorizer
pickle.dump(best_model, open("assets/best_model.pkl", "wb"))
pickle.dump(vectorizer, open("assets/vectorizer.pkl", "wb"))

# Create a prediction function for the new model
def predict_disease(symptoms_list):
    # Join symptoms into a single string
    symptoms_text = ' '.join(symptoms_list)
    
    # Transform using the same vectorizer
    X_new = vectorizer.transform([symptoms_text])
    
    # Predict using the best model
    predicted_disease = best_model.predict(X_new)[0]
    
    return predicted_disease