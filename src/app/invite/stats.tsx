'use client'

import { getUserEventStats } from '@/http/api'
import { BadgeCheck, Medal } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatsProps {
  eventPrettyName: string
  subscriberId: string
}

interface Stats {
  indications: number
  position: number
}

export function Stats({ eventPrettyName, subscriberId }: StatsProps) {
  const [stats, setStats] = useState<Stats>()

  useEffect(() => {
    getUserEventStats(eventPrettyName, Number(subscriberId)).then(res => {
      if (res.message) console.error(res.message)
      else setStats(res as unknown as Stats)
    })
  }, [eventPrettyName, subscriberId])

  return (
    stats && (
      <div className="grid gap-3 md:grid-cols-2">
        <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            {stats.indications}
          </span>
          <span className="text-sm text-gray-300 leading-none text-center">
            Inscrições feitas
          </span>
          <BadgeCheck className="size-5 text-purple absolute top-3 left-3" />
        </div>

        <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            {`${stats.position}º`}
          </span>
          <span className="text-sm text-gray-300 leading-none text-center">
            Posição no ranking
          </span>
          <Medal className="size-5 text-purple absolute top-3 left-3" />
        </div>
      </div>
    )
  )
}
