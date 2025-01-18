'use client'

import { useEffect, useState } from "react"
import { Glass } from "@/components/glass"
import { WaterSchedule } from "@/types/water"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, RefreshCw } from 'lucide-react'

const SCHEDULE: WaterSchedule[] = [
  { time: "7:00 AM", amount: 250, label: "Start your day hydrated" },
  { time: "9:30 AM", amount: 200, label: "Mid-morning" },
  { time: "12:00 PM", amount: 250, label: "Before lunch" },
  { time: "3:00 PM", amount: 250, label: "Afternoon" },
  { time: "5:30 PM", amount: 200, label: "Evening" },
  { time: "7:30 PM", amount: 250, label: "Before dinner" },
  { time: "9:00 PM", amount: 200, label: "Post-dinner" },
  { time: "10:30 PM", amount: 150, label: "Before bed" },
]

export default function WaterTracker() {
  const [activeGlasses, setActiveGlasses] = useState<boolean[]>([])
  const totalWater = SCHEDULE.reduce((acc, curr, i) => acc + (activeGlasses[i] ? curr.amount : 0), 0)

  useEffect(() => {
    const savedState = localStorage.getItem('waterTracker')
    const lastResetDate = localStorage.getItem('lastResetDate')
    const todayDate = new Date().toDateString()

    if (savedState && lastResetDate === todayDate) {
      setActiveGlasses(JSON.parse(savedState))
    } else {
      resetGlasses()
    }

    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const timeUntilMidnight = tomorrow.getTime() - now.getTime()

    const resetTimer = setTimeout(() => {
      resetGlasses()
    }, timeUntilMidnight)

    return () => clearTimeout(resetTimer)
  }, [])

  const toggleGlass = (index: number) => {
    const newActiveGlasses = [...activeGlasses]
    newActiveGlasses[index] = !newActiveGlasses[index]
    setActiveGlasses(newActiveGlasses)
    localStorage.setItem('waterTracker', JSON.stringify(newActiveGlasses))
    localStorage.setItem('lastResetDate', new Date().toDateString())
  }

  const resetGlasses = () => {
    const resetState = new Array(SCHEDULE.length).fill(false)
    setActiveGlasses(resetState)
    localStorage.setItem('waterTracker', JSON.stringify(resetState))
    localStorage.setItem('lastResetDate', new Date().toDateString())
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-sky-50 to-white">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daily Water Tracker</CardTitle>
              <CardDescription>Click on a glass to mark it as consumed</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={resetGlasses}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-8">
            {SCHEDULE.map((schedule, index) => (
              <Glass
                key={schedule.time}
                schedule={schedule}
                isActive={activeGlasses[index]}
                onClick={() => toggleGlass(index)}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-lg font-medium">
            <Droplets className="h-5 w-5 text-sky-500" />
            Total water consumed: {totalWater}ml
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
