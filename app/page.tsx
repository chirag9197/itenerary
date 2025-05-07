"use client"

import { TravelPlannerForm } from "@/components/travel-planner-form"
import { Globe, Sparkles, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  return (
    <div className="min-h-screen bg-grid-pattern text-black">
      {/* Decorative elements */}
      <div className="fixed top-20 left-10 -rotate-12 z-0">
        <div className="h-16 w-16 border-4 border-black bg-white shadow-retro"></div>
      </div>
      <div className="fixed bottom-20 left-10 z-0">
        <div className="h-20 w-20 rounded-full bg-red-500 shadow-retro"></div>
      </div>
      <div className="fixed top-20 right-10 z-0">
        <div className="h-24 w-24 rounded-full bg-yellow-400 shadow-retro"></div>
      </div>
      <div className="fixed bottom-20 right-10 z-0">
        <div className="h-16 w-16 rounded-md bg-emerald-400 rotate-12 shadow-retro"></div>
      </div>

      <div className="relative z-10">
        {/* Header/Navigation */}
        <header className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600 shadow-retro">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">Voyagent</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="font-bold hover:underline">
                Features
              </Link>
              <Link href="#how-it-works" className="font-bold hover:underline">
                How It Works
              </Link>
              <Link href="#pricing" className="font-bold hover:underline">
                Pricing
              </Link>
              <Link href="#testimonials" className="font-bold hover:underline">
                Testimonials
              </Link>
              <Link href="#faq" className="font-bold hover:underline">
                FAQ
              </Link>
            </div>

            <MobileNav />
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center mb-12">
            <div>
              <div className="inline-block rotate-1 mb-6">
                <div className="bg-yellow-400 border-2 border-black rounded-full py-1 px-4 font-bold flex items-center shadow-retro">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered Travel Planning
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Plan Your <span className="text-blue-500">Perfect Trip</span> in <br />
                Minutes, Not Hours
              </h1>

              <p className="text-lg mb-8 max-w-lg">
                Our AI travel assistant analyzes millions of data points to create personalized itineraries based on
                your preferences, budget, and schedule. Experience travel planning that's as enjoyable as the journey
                itself.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 border-2 border-black rounded-md px-4 py-2 bg-white shadow-retro">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold">Instant Itineraries</span>
                </div>

                <div className="flex items-center gap-2 border-2 border-black rounded-md px-4 py-2 bg-white shadow-retro">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold">Hidden Gems</span>
                </div>

                <div className="flex items-center gap-2 border-2 border-black rounded-md px-4 py-2 bg-white shadow-retro">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-bold">Global Destinations</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => document.getElementById("planner-form")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-md border-2 border-black bg-blue-900 px-6 py-3 font-bold text-white shadow-retro hover:translate-y-0.5 hover:shadow-sm transition-all flex items-center"
                >
                  Start Planning Now <span className="ml-2">→</span>
                </button>

                <Link
                  href="#how-it-works"
                  className="rounded-md border-2 border-black bg-yellow-400 px-6 py-3 font-bold shadow-retro hover:translate-y-0.5 hover:shadow-sm transition-all"
                >
                  How It Works
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-black bg-gray-200 overflow-hidden shadow-retro"
                    >
                      <Image
                        src={`https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600`}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="border-2 border-black rounded-full px-4 py-1 bg-white shadow-retro">
                  <span className="font-bold">10,000+ happy travelers ⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-yellow-400 z-0"></div>
              <div className="relative z-10 border-4 border-black rounded-lg bg-white p-3 shadow-retro rotate-1">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border-2 border-black">
                  <Image
                    src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600"
                    alt="Travel destination"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white rounded-full border-2 border-black px-3 py-1 flex items-center shadow-retro">
                    <MapPin className="h-4 w-4 mr-1 text-red-500" />
                    <span className="font-bold text-sm">Rome, Italy</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white rounded-md border-2 border-black px-3 py-1 font-bold shadow-retro">
                    $1,299
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-400 rounded-md border-2 border-black px-3 py-1 font-bold shadow-retro flex items-center">
                    <Clock className="h-4 w-4 mr-1" />7 Days
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-red-500 rounded-md border-2 border-black px-3 py-1 font-bold text-white shadow-retro flex items-center rotate-2">
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI-Powered!
                </div>
              </div>
            </div>
          </div>

          {/* Travel Planner Form Section */}
          <div id="planner-form" className="border-4 border-black rounded-lg bg-white p-6 shadow-retro mb-12">
            <h2 className="text-3xl font-black mb-6 text-center">Create Your Perfect Itinerary</h2>
            <TravelPlannerForm />
          </div>
        </main>
      </div>
    </div>
  )
}
