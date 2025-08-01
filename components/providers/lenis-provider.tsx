"use client"

import { useSmoothScroll } from "@/hooks/useSmoothScroll"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll()
  return <>{children}</>
}