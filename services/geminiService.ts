export const generatePFP = async (base64Image: string, modifiers: string[]): Promise<string> => {
  try {
    // The prompt is constructed in the backend based on the modifiers.
    // We send the image and the selected modifiers.

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: base64Image,
        modifiers: modifiers,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate image');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
