from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import utils
import logging

logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your Next.js app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomInput(BaseModel):
    symptoms: List[str]

class DiseaseResponse(BaseModel):
    disease: str
    description: str
    precautions: List[str]
    medications: List[str]
    diet: List[str]
    workout: List[str]

@app.get("/")
async def root():
    return {"message": "Health Care API is running"}

@app.get("/api/symptoms")
async def get_symptoms():
    return {"symptoms": list(utils.symptoms_dict.keys())}

@app.post("/api/predict", response_model=DiseaseResponse)
async def predict_disease(input_data: SymptomInput):
    try:
        if not input_data.symptoms:
            raise HTTPException(status_code=400, detail="Please enter symptoms")
        
        logger.info(f"Received symptoms: {input_data.symptoms}")

        # Validate that all symptoms exist in our dictionary
        unknown_symptoms = [s for s in input_data.symptoms if s not in utils.symptoms_dict]
        if unknown_symptoms:
            raise HTTPException(
                status_code=400, 
                detail=f"Unknown symptoms: {', '.join(unknown_symptoms)}"
            )

        predicted_disease = utils.get_predicted_value(input_data.symptoms)
        desc, prec, medi, diet, work = utils.helper(predicted_disease)

        # Ensure proper formatting of response data
        formatted_prec = prec[0] if prec and len(prec) > 0 else []
        formatted_medi = [str(m).strip("[]'") for m in medi] if medi else []
        formatted_diet = [str(d).strip("[]'") for d in diet] if diet else []

        return {
            "disease": predicted_disease,
            "description": desc,
            "precautions": formatted_prec,
            "medications": formatted_medi,
            "diet": formatted_diet,
            "workout": work
        }

    except KeyError as e:
        logger.error(f"KeyError: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")
    except Exception as e:
        logger.error(f"Exception: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)