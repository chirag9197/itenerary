import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

interface TravelFormData {
  destination: string
  startDate?: Date
  endDate?: Date
  numPeople: string
  budget: number
  foodPreference: string
  stayPreference: string
  weatherPreference: string
  interests: string[]
}

export async function generateItinerary(formData: TravelFormData) {
  // Check if GROQ_API_KEY is available
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing. Please add it to your environment variables.")
  }

  const numDays =
    formData.startDate && formData.endDate
      ? Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 3 // Default to 3 days if no dates provided

  const prompt = `
    Create a detailed ${numDays}-day travel itinerary for ${formData.destination} in India for ${formData.numPeople} people.
    
    Details:
    - Budget: ₹${formData.budget} (total for the trip)
    - Food preference: ${formData.foodPreference}
    - Stay preference: ${formData.stayPreference}
    - Weather preference: ${formData.weatherPreference}
    - Interests: ${formData.interests.join(", ")}
    ${formData.startDate ? `- Travel dates: ${formData.startDate.toLocaleDateString()} to ${formData.endDate?.toLocaleDateString()}` : ""}
    
    Please provide a structured itinerary with the following:
    1. A brief overview of the destination
    2. Day-by-day breakdown with:
       - Morning activities with specific locations and approximate costs
       - Afternoon activities with specific locations and approximate costs
       - Evening activities with specific locations and approximate costs
       - Recommended meals (breakfast, lunch, dinner) with restaurant names and price ranges
       - Detailed accommodation suggestions with names, locations, and price ranges
       - Practical tips for the day
    3. General travel tips for the destination
    
    Format the response as a JSON object with this structure:
    {
      "destination": "Destination Name",
      "overview": "Brief overview of the destination",
      "days": [
        {
          "day": 1,
          "date": "Date if provided",
          "morning": {
            "activity": "Description",
            "location": "Location name",
            "notes": "Additional notes including costs"
          },
          "afternoon": {
            "activity": "Description",
            "location": "Location name",
            "notes": "Additional notes including costs"
          },
          "evening": {
            "activity": "Description",
            "location": "Location name",
            "notes": "Additional notes including costs"
          },
          "meals": {
            "breakfast": "Breakfast suggestion with restaurant name and price range",
            "lunch": "Lunch suggestion with restaurant name and price range",
            "dinner": "Dinner suggestion with restaurant name and price range"
          },
          "accommodation": "Detailed accommodation suggestion with name, location, and price range",
          "tips": ["Tip 1", "Tip 2"]
        }
        // Repeat for each day
      ],
      "tips": ["General tip 1", "General tip 2", "General tip 3"]
    }
    
    Make sure all suggestions are specific to ${formData.destination} and align with the budget of ₹${formData.budget}. Include authentic local experiences, street food recommendations, hidden gems, and must-visit attractions. All prices should be in INR (₹).
  `

  try {
    // Create a custom Groq provider instance with the API key from environment variables
    const customGroq = createGroq({
      apiKey: process.env.GROQ_API_KEY,
    })

    const { text } = await generateText({
      model: customGroq("llama3-70b-8192"),
      prompt,
      system:
        "You are an expert Indian travel planner with deep knowledge of destinations, accommodations, food, and activities across India. Provide detailed, authentic, and budget-conscious recommendations. Include specific names of places, restaurants, and accommodations with realistic price ranges.",
      temperature: 0.7,
      maxTokens: 4000,
    })

    // Parse the JSON response
    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating itinerary:", error)
    throw new Error("Failed to generate itinerary. Please try again.")
  }
}
