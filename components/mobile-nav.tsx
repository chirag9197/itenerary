"use client"

import { useState } from "react"
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
              {/* Navigation links removed */}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
