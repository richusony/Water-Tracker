'use client'

import { motion } from "framer-motion"
import { GlassProps } from "@/types/water"

export function Glass({ schedule, isActive, onClick }: GlassProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        className="relative w-20 h-24 cursor-pointer group"
        aria-label={`${schedule.amount}ml water glass for ${schedule.time}`}
      >
        {/* Main glass container */}
        <div className="absolute inset-x-4 inset-y-0">
          {/* Glass outline */}
          <div className="absolute inset-0 border-2 border-sky-200 rounded-sm">
            {/* Measurement lines */}
            <div className="absolute inset-y-2 left-2 w-2 flex flex-col justify-between">
              <div className="h-[1px] w-full bg-sky-200" />
              <div className="h-[1px] w-full bg-sky-200" />
              <div className="h-[1px] w-full bg-sky-200" />
            </div>

            {/* Water fill animation */}
            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: isActive ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute bottom-0 left-0 right-0 bg-sky-300"
            >
              {/* Water surface reflection */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-sky-100" />
            </motion.div>
          </div>

          {/* Glass shadow */}
          <div className="absolute -bottom-2 left-1/2 w-16 h-1 bg-black/10 rounded-full blur-sm -translate-x-1/2" />
        </div>
      </button>
      <div className="text-center">
        <div className="font-medium">{schedule.time}</div>
        <div className="text-sm text-muted-foreground">{schedule.amount}ml</div>
      </div>
    </div>
  )
}

