export interface WaterSchedule {
  time: string
  amount: number
  label: string
}

export interface GlassProps {
  schedule: WaterSchedule
  isActive: boolean
  onClick: () => void
}

