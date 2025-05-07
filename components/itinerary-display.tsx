"use client"

import { useState } from "react"
import { Coffee, Sun, Moon, MapPin, Utensils, Home, Info } from "lucide-react"

interface ItineraryDay {
  day: number
  date?: string
  morning: {
    activity: string
    location?: string
    notes?: string
  }
  afternoon: {
    activity: string
    location?: string
    notes?: string
  }
  evening: {
    activity: string
    location?: string
    notes?: string
  }
  meals: {
    breakfast?: string
    lunch?: string
    dinner?: string
  }
  accommodation?: string
  accommodationDetails?: string
  accommodationBooking?: string
  tips?: string[]
}

interface ItineraryProps {
  destination: string
  days: ItineraryDay[]
  overview: string
  tips: string[]
  budget?: string
  duration?: string
}

export function ItineraryDisplay({ itinerary }: { itinerary: ItineraryProps }) {
  const [activeDay, setActiveDay] = useState("1")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black tracking-tight">Your Itinerary for {itinerary.destination}</h2>
        <p className="mt-2 text-muted-foreground">{itinerary.overview}</p>
      </div>

      <div className="mt-4 p-4 border-2 border-black rounded-md bg-yellow-100 shadow-retro">
        <p className="text-sm font-medium">
          <span className="font-bold">Note:</span> This itinerary is customized for your preferences and budget of
          approximately ₹{itinerary.budget || "10,000-20,000"} for {itinerary.duration || "3 days"}. Prices are
          estimates and may vary based on season and availability.
        </p>
      </div>

      <div className="border-2 border-black rounded-lg bg-white p-4 shadow-retro">
        <div className="mb-2 flex items-center">
          <Info className="mr-2 h-5 w-5" />
          <h3 className="font-bold text-lg">Trip Overview</h3>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">General tips for your journey</p>
        <ul className="ml-6 list-disc space-y-2">
          {itinerary.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex overflow-x-auto pb-2 gap-2">
          {itinerary.days.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day.toString())}
              className={`flex-shrink-0 border-2 border-black rounded-md px-4 py-2 font-bold shadow-retro transition-all ${
                activeDay === day.day.toString() ? "bg-yellow-400" : "bg-white hover:bg-gray-100"
              }`}
            >
              Day {day.day}
              {day.date && <span className="ml-2 hidden text-xs md:inline">({day.date})</span>}
            </button>
          ))}
        </div>

        {itinerary.days.map(
          (day) =>
            day.day.toString() === activeDay && (
              <div key={day.day} className="border-2 border-black rounded-lg bg-white p-4 shadow-retro">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Day {day.day}</h3>
                  {day.date && (
                    <span className="inline-block bg-yellow-400 border-2 border-black rounded-full px-3 py-1 text-sm font-bold shadow-retro">
                      {day.date}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 shadow-retro">
                        <Coffee className="h-5 w-5 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold">Morning</h4>
                        <p>{day.morning.activity}</p>
                        {day.morning.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {day.morning.location}
                          </div>
                        )}
                        {day.morning.notes && <p className="text-sm text-muted-foreground">{day.morning.notes}</p>}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 shadow-retro">
                        <Sun className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold">Afternoon</h4>
                        <p>{day.afternoon.activity}</p>
                        {day.afternoon.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {day.afternoon.location}
                          </div>
                        )}
                        {day.afternoon.notes && <p className="text-sm text-muted-foreground">{day.afternoon.notes}</p>}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 shadow-retro">
                        <Moon className="h-5 w-5 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold">Evening</h4>
                        <p>{day.evening.activity}</p>
                        {day.evening.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-3 w-3" />
                            {day.evening.location}
                          </div>
                        )}
                        {day.evening.notes && <p className="text-sm text-muted-foreground">{day.evening.notes}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-black rounded-md p-4 shadow-retro">
                    <div className="mb-3 flex items-center">
                      <Utensils className="mr-2 h-4 w-4" />
                      <h4 className="font-bold">Meals</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                      {day.meals.breakfast && (
                        <div>
                          <span className="text-xs font-bold text-muted-foreground">Breakfast</span>
                          <p className="text-sm">{day.meals.breakfast}</p>
                        </div>
                      )}
                      {day.meals.lunch && (
                        <div>
                          <span className="text-xs font-bold text-muted-foreground">Lunch</span>
                          <p className="text-sm">{day.meals.lunch}</p>
                        </div>
                      )}
                      {day.meals.dinner && (
                        <div>
                          <span className="text-xs font-bold text-muted-foreground">Dinner</span>
                          <p className="text-sm">{day.meals.dinner}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {day.accommodation && (
                    <div className="border-2 border-black rounded-md p-4 shadow-retro">
                      <div className="mb-2 flex items-center">
                        <Home className="mr-2 h-4 w-4" />
                        <h4 className="font-bold">Accommodation</h4>
                      </div>
                      <p className="text-sm">{day.accommodation}</p>
                      {day.accommodationDetails && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <p>
                            <span className="font-bold">Details:</span> {day.accommodationDetails}
                          </p>
                        </div>
                      )}
                      {day.accommodationBooking && (
                        <div className="mt-2 text-xs text-blue-600">
                          <p>
                            <span className="font-bold">Booking tip:</span> {day.accommodationBooking}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {day.tips && day.tips.length > 0 && (
                    <div className="border-2 border-black rounded-md p-4 shadow-retro">
                      <div className="mb-2 flex items-center">
                        <Info className="mr-2 h-4 w-4" />
                        <h4 className="font-bold">Tips for the day</h4>
                      </div>
                      <ul className="ml-5 list-disc text-sm">
                        {day.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  )
}
