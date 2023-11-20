import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDatetime(d: Date): string {
  const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  var result = ''
  result += d.getDate()
  result += " "
  result += namaBulan[d.getMonth()]
  result += " "
  result += d.getFullYear()
  result += " "
  result += ("0" + d.getHours()).slice(-2)
  result += ":"
  result += ("0" + d.getMinutes()).slice(-2)
  return result
}
