"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-black bg-white shadow-retro"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-grid-pattern pt-16">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="rounded-md border-2 border-black bg-white p-4 font-bold shadow-retro"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-md border-2 border-black bg-white p-4 font-bold shadow-retro"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="rounded-md border-2 border-black bg-white p-4 font-bold shadow-retro"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="rounded-md border-2 border-black bg-white p-4 font-bold shadow-retro"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="rounded-md border-2 border-black bg-white p-4 font-bold shadow-retro"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
