'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { generateRankingByEvent } from '@/http/api'
import medalCooper from '../../../assets/medal-cooper.svg'
import medalGold from '../../../assets/medal-gold.svg'
import medalSilver from '../../../assets/medal-silver.svg'

interface RankingProps {
  eventPrettyName: string
}

interface Ranking {
  name: string
  subscribers: number
  userId: number
}

export function Ranking({ eventPrettyName }: RankingProps) {
  const [ranking, setRanking] = useState<Ranking[]>()

  useEffect(() => {
    generateRankingByEvent(eventPrettyName).then(res => {
      if (res.message) console.error(res.message)
      else setRanking(res as unknown as Ranking[])
    })
  }, [eventPrettyName])

  return (
    ranking && (
      <div className="w-full max-w-[440px] space-y-5">
        <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
          Ranking de indicações
        </h2>

        <div className="space-y-4">
          {ranking.slice(0, 3).map((position, index) => {
            const rankingPosition = index + 1

            const medalsRanking = {
              1: medalGold,
              2: medalSilver,
              3: medalCooper,
            }

            return (
              <div
                key={position.userId}
                className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3"
              >
                <span className="text-sm text-gray-300 leading-none">
                  <span className="font-semibold">{rankingPosition}º</span> |{' '}
                  {position.name}
                </span>

                <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
                  {position.subscribers}
                </span>

                <Image
                  src={
                    medalsRanking[rankingPosition as keyof typeof medalsRanking]
                  }
                  alt="gold_medal"
                  className="absolute top-0 right-8"
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  )
}
