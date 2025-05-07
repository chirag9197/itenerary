"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, MapPin, Calendar, Users, DollarSign, Utensils, Home, Cloud, Heart } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/date-picker"
import { generateItinerary } from "@/lib/generate-itinerary"
import { ItineraryDisplay } from "@/components/itinerary-display"
import { StatusMessage } from "@/components/status-message"
import { getDestinationItinerary } from "@/lib/destination-itineraries"

const formSchema = z.object({
  destination: z.string().min(2, { message: "Please enter a valid destination" }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  numPeople: z.string().min(1, { message: "Please enter number of people" }),
  budget: z.number().min(1000, { message: "Budget must be at least ₹1,000" }),
  foodPreference: z.string(),
  stayPreference: z.string(),
  weatherPreference: z.string(),
  interests: z.array(z.string()).min(1, { message: "Select at least one interest" }),
})

const interestOptions = [
  { id: "culture", label: "Culture" },
  { id: "nature", label: "Nature" },
  { id: "adventure", label: "Adventure" },
  { id: "shopping", label: "Shopping" },
  { id: "history", label: "History" },
  { id: "food", label: "Food" },
  { id: "relaxation", label: "Relaxation" },
]

export function TravelPlannerForm() {
  const [itinerary, setItinerary] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [status, setStatus] = useState<{ type: "loading" | "error" | "success"; message: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      numPeople: "1",
      budget: 10000,
      foodPreference: "any",
      stayPreference: "budget",
      weatherPreference: "any",
      interests: ["culture"],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true)
    setStatus({ type: "loading", message: "Generating your personalized itinerary. This may take a minute..." })

    try {
      // First try to generate with the API
      const generatedItinerary = await generateItinerary(values)
      setItinerary(generatedItinerary)
      setStatus({ type: "success", message: "Your itinerary has been successfully generated!" })
    } catch (error) {
      console.error("Failed to generate itinerary:", error)

      // Check if the error is related to the API key
      if (error.message && error.message.includes("API key")) {
        setStatus({
          type: "error",
          message:
            "We're using pre-generated itineraries as the API key is not available. Enjoy your sample itinerary!",
        })
      } else {
        setStatus({
          type: "error",
          message: "We encountered an issue with the AI service. Using a pre-generated itinerary instead.",
        })
      }

      // Use our destination-based itinerary generator
      const fallbackItinerary = getDestinationItinerary(values.destination)

      // Add budget and duration information
      fallbackItinerary.budget = values.budget.toLocaleString()
      fallbackItinerary.duration =
        values.startDate && values.endDate
          ? Math.ceil((values.endDate.getTime() - values.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 + " days"
          : "3 days"

      setItinerary(fallbackItinerary)
    } finally {
      setIsGenerating(false)
    }
  }

  if (itinerary) {
    return (
      <div className="space-y-6">
        {status && status.type === "error" && <StatusMessage type={status.type} message={status.message} />}
        <ItineraryDisplay itinerary={itinerary} />
        <button
          onClick={() => {
            setItinerary(null)
            setStatus(null)
          }}
          className="rounded-md border-2 border-black bg-blue-500 px-6 py-3 font-bold text-white shadow-retro hover:translate-y-0.5 hover:shadow-sm transition-all w-full md:w-auto"
        >
          Plan Another Trip
        </button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center font-bold">
                  <MapPin className="h-4 w-4 mr-2" />
                  Destination
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="e.g. Goa, Kerala, Rajasthan"
                      {...field}
                      className="border-2 border-black rounded-md px-3 py-2 shadow-retro focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numPeople"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center font-bold">
                  <Users className="h-4 w-4 mr-2" />
                  Number of People
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    className="border-2 border-black rounded-md px-3 py-2 shadow-retro focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center font-bold">
                  <Calendar className="h-4 w-4 mr-2" />
                  Start Date (Optional)
                </FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center font-bold">
                  <Calendar className="h-4 w-4 mr-2" />
                  End Date (Optional)
                </FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foodPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center font-bold">
                  <Utensils className="h-4 w-4 mr-2" />
                  Food Preference
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-black rounded-md shadow-retro focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <SelectValue placeholder="Select food preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-2 border-black">
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="local">Local Cuisine</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center font-bold">
                  <Home className="h-4 w-4 mr-2" />
                  Stay Preference
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-black rounded-md shadow-retro focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <SelectValue placeholder="Select stay preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-2 border-black">
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="mid-range">Mid-Range</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="homestay">Homestay</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weatherPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center font-bold">
                  <Cloud className="h-4 w-4 mr-2" />
                  Weather Preference
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-black rounded-md shadow-retro focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <SelectValue placeholder="Select weather preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="border-2 border-black">
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="cool">Cool</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="monsoon">Monsoon</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel className="flex items-center font-bold">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Budget (₹)
                </FormLabel>
                <FormControl>
                  <div className="space-y-2 border-2 border-black rounded-md p-4 shadow-retro">
                    <Slider
                      min={1000}
                      max={200000}
                      step={1000}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="font-bold">₹{field.value.toLocaleString()}</span>
                      <span className="font-bold">
                        {field.value < 20000 ? "Budget" : field.value < 50000 ? "Mid-Range" : "Luxury"}
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={() => (
              <FormItem className="col-span-1 md:col-span-2">
                <div className="mb-2">
                  <FormLabel className="flex items-center font-bold">
                    <Heart className="h-4 w-4 mr-2" />
                    Interests
                  </FormLabel>
                  <FormDescription>Select all that apply</FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 border-2 border-black rounded-md p-4 shadow-retro">
                  {interestOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem key={option.id} className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, option.id])
                                    : field.onChange(field.value?.filter((value) => value !== option.id))
                                }}
                                className="border-2 border-black h-5 w-5 rounded-sm data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                            <FormLabel className="font-bold">{option.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {status && <StatusMessage type={status.type} message={status.message} />}

        <button
          type="submit"
          className="w-full rounded-md border-2 border-black bg-blue-500 px-6 py-3 font-bold text-white shadow-retro hover:translate-y-0.5 hover:shadow-sm transition-all"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin inline" />
              Generating your itinerary...
            </>
          ) : (
            "Generate Itinerary"
          )}
        </button>
      </form>
    </Form>
  )
}
