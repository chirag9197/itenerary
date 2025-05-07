import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"
import { getDestinationItinerary } from "./destination-itineraries"

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
  const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing. Please add it to your environment variables.")
  }

  const numDays =
    formData.startDate && formData.endDate
      ? Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 3 // Default to 3 days if no dates provided

  const prompt = `
    You are an expert Indian travel planner. Create a detailed ${numDays}-day travel itinerary for ${formData.destination} in India for ${formData.numPeople} people.
    
    Details:
    - Budget: ₹${formData.budget} (total for the trip)
    - Food preference: ${formData.foodPreference}
    - Stay preference: ${formData.stayPreference}
    - Weather preference: ${formData.weatherPreference}
    - Interests: ${formData.interests.join(", ")}
    ${formData.startDate ? `- Travel dates: ${formData.startDate.toLocaleDateString()} to ${formData.endDate?.toLocaleDateString()}` : ""}
    
    IMPORTANT: You must respond with ONLY a valid JSON object in the following format, with no additional text or explanation:
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
      ],
      "tips": ["General tip 1", "General tip 2", "General tip 3"]
    }
    
    Make sure all suggestions are specific to ${formData.destination} and align with the budget of ₹${formData.budget}. Include authentic local experiences, street food recommendations, hidden gems, and must-visit attractions. All prices should be in INR (₹).
  `

  try {
    // Create a custom Groq provider instance with the API key from environment variables
    const customGroq = createGroq({
      apiKey: apiKey,
    })

    const { text } = await generateText({
      model: customGroq("llama3-70b-8192"),
      prompt,
      system:
        "You are an expert Indian travel planner. You must respond with ONLY a valid JSON object, with no additional text or explanation. The response must be parseable by JSON.parse().",
      temperature: 0.7,
      maxTokens: 4000,
    })

    try {
      // Try to parse the response as JSON
      const parsedResponse = JSON.parse(text)
      
      // Validate the response structure
      if (!parsedResponse.destination || !parsedResponse.days || !Array.isArray(parsedResponse.days)) {
        throw new Error("Invalid response structure")
      }

      return parsedResponse
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError)
      console.error("Raw response:", text)
      
      // If parsing fails, return a fallback itinerary
      return getDestinationItinerary(formData.destination)
    }
  } catch (error) {
    console.error("Error generating itinerary:", error)
    // Return a fallback itinerary if the AI generation fails
    return getDestinationItinerary(formData.destination)
  }
}
