"use client"

'use client'

import { SaasProvider } from '@saas-ui/react'

export function SassUiProvider({ children }: { children: React.ReactNode }) {
  return <SaasProvider>{children}</SaasProvider>
}