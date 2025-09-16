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
import Image from "next/image"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Image src='arcvizsmall.png' alt='arcvizsmall' width={45} height={120} />    
            <Link href="/" className="flex items-center space-x-2">   
          <span className="text-xl font-bold">arcviz</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/projects" className="text-sm font-medium hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/companies" className="text-sm font-medium hover:text-primary transition-colors">
                Company
              </Link>
              <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                Story
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus:bg-background"
              />
            </form>
           </div>
           <div className="flex items-center space-x-8">
            <Link href="/investor" className="text-sm font-medium hover:text-primary transition-colors">
                Investor Relations
              </Link>
              </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>

              <Button asChild>
                <Link href="/onboarding">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}