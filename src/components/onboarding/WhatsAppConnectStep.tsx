"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, ExternalLink, ShieldCheck, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Organization, OrganizationsService } from '@/lib/api'
import { toast } from 'sonner'

interface WhatsAppConnectStepProps {
  organization: Organization
  onComplete: (state: string) => void
}

export const WhatsAppConnectStep: React.FC<WhatsAppConnectStepProps> = ({ organization, onComplete }) => {
  const [ isLoading, setIsLoading ] = useState(false)


  const handleConnect = async () => {
    setIsLoading(true)
    try {

      // @ts-ignore
      const response = await OrganizationsService.getApiV1OrganizationsWhatsappInitOauth(organization._id)

      if (response.authUrl) {
        // In a real production app, you might want to use a popup or a dedicated redirect
        // For now, we'll redirect the current window
        window.location.href = response.authUrl
      } else {
        toast.error('Failed to get authorization URL')
      }
    } catch (error) {
      console.error('Failed to initiate WhatsApp OAuth:', error)
      toast.error('Connection failed. Please check your organization settings.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/10 blur-[100px]" />

      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-primary">
          <Zap className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Step 2 of 3</span>
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Connect WhatsApp Business
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Link your Meta Business Account to start sending AI-powered messages.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-200">Secure Integration</h4>
              <p className="text-xs text-zinc-500">We use official Meta APIs to ensure your data is always safe and compliant.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-200">Official Business API</h4>
              <p className="text-xs text-zinc-500">Access advanced features like message templates, automation, and analytics.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-primary-foreground/80 leading-relaxed font-medium">
                You will be redirected to Meta to authorize <span className="text-primary font-bold">{organization.name}</span>.
                Please ensure you have administrative access to your Meta Business Manager.
            </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleConnect}
          className="w-full bg-[#0668E1] hover:bg-[#0559C1] text-white font-semibold py-6 shadow-lg shadow-blue-500/30 transition-all duration-300 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Redirecting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Continue to Facebook
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
