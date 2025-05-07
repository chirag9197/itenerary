import { sampleItinerary } from "./sample-itinerary"

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

export function generateFallbackItinerary(formData: TravelFormData) {
  // Create a deep copy of the sample itinerary
  const fallbackItinerary = JSON.parse(JSON.stringify(sampleItinerary))

  // Customize the fallback itinerary based on user input
  fallbackItinerary.destination = formData.destination

  // Add a note about using fallback data
  fallbackItinerary.overview = `${fallbackItinerary.overview.split("(Note:")[0]} (Note: This is sample data as we encountered an issue generating a custom itinerary. Please try again later.)`

  // Adjust budget mentions in the itinerary based on user's budget
  const budgetLevel = formData.budget < 10000 ? "budget" : formData.budget < 30000 ? "mid-range" : "luxury"

  // Adjust accommodation suggestions based on stay preference
  fallbackItinerary.days.forEach((day) => {
    if (formData.stayPreference === "hostel") {
      day.accommodation = day.accommodation
        .replace(/hotel|resort/gi, "hostel")
        .replace(/₹3000-4000|₹2000-3000/g, "₹800-1500")
    } else if (formData.stayPreference === "luxury") {
      day.accommodation = day.accommodation
        .replace(/budget|hostel/gi, "luxury resort")
        .replace(/₹3000-4000|₹2000-3000/g, "₹8000-15000")
    }

    // Adjust food recommendations based on food preference
    if (formData.foodPreference === "vegetarian") {
      day.meals.breakfast = day.meals.breakfast.replace(/non-veg|chicken|fish|meat|seafood/gi, "vegetarian")
      day.meals.lunch = day.meals.lunch.replace(/fish|prawn|crab|chicken|meat|seafood/gi, "vegetable")
      day.meals.dinner = day.meals.dinner.replace(/fish|prawn|crab|chicken|meat|seafood/gi, "vegetable")
    }
  })

  // Add interests-based activities
  if (formData.interests.includes("adventure")) {
    fallbackItinerary.days[1].morning.activity = "Adventure sports at Grande Island"
    fallbackItinerary.days[1].morning.location = "Grande Island, off the coast of Goa"
    fallbackItinerary.days[1].morning.notes =
      "Try scuba diving (₹3500-4500) or snorkeling (₹1500-2000). Includes boat transfer and basic equipment."
  }

  if (formData.interests.includes("culture")) {
    fallbackItinerary.days[2].afternoon.activity = "Visit the Goa State Museum and art galleries in Panjim"
    fallbackItinerary.days[2].afternoon.location = "Panjim"
    fallbackItinerary.days[2].afternoon.notes =
      "Explore Goan heritage, art, and culture. Entry fee to museum: ₹100. Art galleries are typically free to visit."
  }

  return fallbackItinerary
}
