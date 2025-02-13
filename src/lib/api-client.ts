export class APIClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  }

  async getSymptoms(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/api/symptoms`);
    const data = await response.json();
    return data.symptoms;
  }

  async predictDisease(symptoms: string[]) {
    const response = await fetch(`${this.baseUrl}/api/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms }),
    });
    return await response.json();
  }
}

export const apiClient = new APIClient();
