import type { LocalTime } from '@/http/api'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function convertDateToBr(date: string): string {
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

export function formatDisplayDate(startDate: string, endDate: string): string {
  return 'De '.concat(
    format(startDate, "d' de 'LLLL' de 'R", {
      locale: ptBR,
    })
      .concat(' até ')
      .concat(
        format(endDate, "d' de 'LLLL' de 'R", {
          locale: ptBR,
        })
      )
  )
}

export function concatTime(startTime: LocalTime, endTime: LocalTime): string {
  return `Das ${startTime.toString().slice(0, 5)} às ${endTime.toString().slice(0, 5)}`
}
