/**
 * @provider Dayjs
 * @description A library to transform the date from the models into other format
 * @usage `dayjs(date).format(format)`
 * @import import dayjs from 'dayjs'
 */

export namespace DateHelper {
  export function getNow(): Date {
    return new Date()
  }

  export function addMinutes(date: Date, minutes: number): Date {
    const dateUpdated = new Date(date.getTime())
    const seconds = minutes * 60
    const milliseconds = seconds * 1000

    dateUpdated.setTime(dateUpdated.getTime() + milliseconds)

    return dateUpdated
  }

  export function isBefore(dateBefore: Date, dateAfter: Date): boolean {
    return dateBefore < dateAfter
  }
}
