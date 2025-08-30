"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const ONBOARDING_STEPS = [
  { id: 1, title: "Basic Information", description: "Tell us about yourself" },
  { id: 2, title: "Professional Details", description: "Your experience and skills" },
  { id: 3, title: "Preferences", description: "What you're looking for" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    skills: [] as string[],
    experience: "",
    salary: "",
    availability: "",
  })
  const [skillInput, setSkillInput] = useState("")

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const handleSkillRemove = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleComplete = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error completing onboarding:", error)
    }
  }

  const progress = (currentStep / ONBOARDING_STEPS.length) * 100

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome to the Platform!</h1>
          <p className="text-muted-foreground text-center mb-6">Let's set up your profile to get you started</p>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>
              Step {currentStep} of {ONBOARDING_STEPS.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{ONBOARDING_STEPS[currentStep - 1].title}</CardTitle>
            <CardDescription>{ONBOARDING_STEPS[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      placeholder="Add a skill..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleSkillAdd())}
                    />
                    <Button type="button" onClick={handleSkillAdd}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleSkillRemove(skill)} />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    placeholder="e.g., 3-5 years"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="salary">Expected Salary Range</Label>
                  <Input
                    id="salary"
                    placeholder="e.g., $80,000 - $120,000"
                    value={formData.salary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    placeholder="e.g., Available immediately, 2 weeks notice"
                    value={formData.availability}
                    onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                  />
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Previous
              </Button>
              {currentStep === ONBOARDING_STEPS.length ? (
                <Button onClick={handleComplete}>Complete Setup</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
