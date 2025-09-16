"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, MessageCircle, User, Settings, LogOut, Briefcase, FileText } from "lucide-react"

interface CompanyHeaderProps {
  company: string;
}

export function CompanyHeader({ company }: CompanyHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex ml-50 items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
             <span className="text-xs"> featured company ~  </span>
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold">
                {company}
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-xs font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/learn" className="text-xs font-medium hover:text-primary transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="text-xs font-medium hover:text-primary transition-colors">
                Story
              </Link>
              <Link href="/jobs" className="text-xs font-medium hover:text-primary transition-colors">
                Recruitment
              </Link>
              
              {/* <Link href="/companylogin" className="text-sm font-medium hover:text-primary transition-colors">
                Login
              </Link> */}
            </nav>
          </div>

          {/* Search Bar */}
        </div>
      </div>
    </header>
   
  )
}
