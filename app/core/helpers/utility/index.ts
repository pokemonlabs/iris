import { v4 as uuidv4 } from 'uuid'

export namespace Utility {
  export function sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, milliseconds)
    })
  }

  export function isNull(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value === '')
    )
  }

  export function getUUID(): string {
    return uuidv4()
  }

  export function isDefined(value: any): boolean {
    const isEmptyString = typeof value === 'string' && value === ''
    return value !== null && value !== undefined && !isEmptyString
  }

  export function openInNewTab(window: Window, url: string): void {
    window.open(url, '_blank')
  }

  export function sortByString<Type>(items: Type[], key: keyof Type): Type[] {
    return items.sort((a: Type, b: Type) =>
      (a[key] as string).localeCompare(b[key] as string),
    )
  }

  export function removeTrailingSlash(content: string): string {
    const REGEX_SLASH = /\/$/g

    return content.replace(REGEX_SLASH, '')
  }

  export function stringToInitials(content: string): string {
    if (isNull(content)) {
      return ''
    }

    const words = content.trim().split(' ')

    const isOneWord = words.length === 1

    if (isOneWord) {
      return words[0].slice(0, 2)?.toUpperCase()
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }

  export function debounce<FunctionType extends (...args: any[]) => void>(
    func: FunctionType,
    delay: number,
  ): FunctionType {
    let timeoutId: ReturnType<typeof setTimeout>

    return function (...args: Parameters<FunctionType>) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        func(...args)
      }, delay)
    } as FunctionType
  }
}
