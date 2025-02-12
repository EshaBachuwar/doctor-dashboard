'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import type { DiseaseResponse } from '../../types/disease';

export default function DiseasePredictor() {
  const [symptoms, setSymptoms] = useState<string>('');
  const [result, setResult] = useState<DiseaseResponse | null>(null);

  const handlePredict = async () => {
    try {
      const symptomList = symptoms.split(',').map((s) => s.trim());
      const prediction = await apiClient.predictDisease(symptomList);
      setResult(prediction);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  return (
    <div className="p-4 bg-white text-black">
      <h2>Disease Predictor</h2>
      <input
        type="text"
        className="bg-gray-300 text-black"
        placeholder="Enter symptoms (comma-separated)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={handlePredict} className="bg-gray-200 text-black">Predict</button>
      {result && (
        <div className='text-black'>
          <h3>Prediction Result:</h3>
          <p>{result.disease}</p>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
}
