'use client'

import { type Event, getEventByPrettyName } from '@/http/api'
import { formatNumberToBrlCurrency } from '@/utils/CurrencyUtils'
import { concatTime, formatDisplayDate } from '@/utils/DateUtils'
import { Radio } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubscriptionForm } from './subscription-form'

export default function HomeContent() {
  const searchParams = useSearchParams()
  const eventPrettyName = searchParams.get('event')
  const referrer = searchParams.get('referrer')
  const [event, setEvent] = useState<Event>()

  useEffect(() => {
    if (eventPrettyName) {
      getEventByPrettyName(eventPrettyName).then(res => {
        setEvent(res)
      })
    }
  }, [eventPrettyName])

  function getFirstWord(text: string) {
    const firstSpaceIndex = text.trim().indexOf(' ')
    return firstSpaceIndex === -1
      ? text.trim()
      : text.trim().substring(0, firstSpaceIndex)
  }

  function getRemainingText(text: string) {
    const firstSpaceIndex = text.trim().indexOf(' ')
    return firstSpaceIndex === -1
      ? ''
      : text
          .trim()
          .substring(firstSpaceIndex + 1)
          .trim()
  }

  return (
    event?.title && (
      <div className="min-h-dvh flex flex-col justify-center gap-16">
        <div className="flex flex-col gap-8 items-center md:items-start">
          <Image src="/logo.svg" alt="devstage" width={108.5} height={30} />

          <h1 className="text-4xl text-center leading-none font-heading font-medium flex flex-col md:text-7xl md:text-left">
            <span className="text-blue">{getFirstWord(event.title!)}</span>
            {getRemainingText(event.title!)}
          </h1>
        </div>

        <div className="flex gap-5 items-stretch flex-col md:flex-row">
          <div className="flex-1 bg-gray-700 border-gray-600 rounded-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-gray-200 text-xl">
                Sobre o evento
              </h2>
              <span className="text-purple font-semibold text-xs flex items-center gap-2">
                <Radio className="size-5" />
                {event.location}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {event.description}
              <br />
              <br />
              Datas: {formatDisplayDate(event.startDate!, event.endDate!)}
              <br />
              Horário: {concatTime(event.startTime!, event.endTime!)}
              <br />
              Preço: {formatNumberToBrlCurrency(event.price!)}
            </p>
          </div>

          <SubscriptionForm />
        </div>
      </div>
    )
  )
}
