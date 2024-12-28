import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export namespace DesignSystemUtility {
  export function buildClassNames(...values: ClassValue[]) {
    return twMerge(clsx(values))
  }
}
