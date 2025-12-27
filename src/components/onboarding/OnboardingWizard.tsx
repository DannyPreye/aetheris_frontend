"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Organization, OrganizationsService, UserDependenciesOrganization } from '@/lib/api'
import { OrgCreationStep } from './OrgCreationStep'
import { WhatsAppConnectStep } from './WhatsAppConnectStep'
import { WhatsAppSelectionStep } from './WhatsAppSelectionStep'
import { useSearchParams, useRouter } from 'next/navigation'
import { useUserDeps } from '../contexts/UserDeps'

type OnboardingStep = 'ORG_CREATION' | 'WHATSAPP_CONNECT' | 'WHATSAPP_SELECT'

interface OnboardingWizardProps {
  initialStep: OnboardingStep
  organization?: Organization
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  initialStep,
  organization: initialOrg
}) =>
{


    console.log("initial org",initialOrg)
  const [step, setStep] = useState<OnboardingStep>(initialStep)
  const [organization, setOrganization] = useState<Organization | undefined>(initialOrg)
  const [oauthState, setOauthState] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { refetch } = useUserDeps()

  // Handle OAuth callback from search params
  useEffect(() => {
    const stateToken = searchParams.get('state')
    const oauthSuccess = searchParams.get('whatsapp_success')

    if (stateToken && oauthSuccess === 'true') {
      setOauthState(stateToken)
      setStep('WHATSAPP_SELECT')
      // Clear query params without refreshing
      router.replace('/dashboard', { scroll: false })
    }
  }, [searchParams, router])

  const handleOrgCreated = (org: Organization) => {
    setOrganization(org)
    setStep('WHATSAPP_CONNECT')
    refetch() // Refresh deps to acknowledge the new org
  }

  const handleWhatsAppConnected = (state: string) => {
    setOauthState(state)
    setStep('WHATSAPP_SELECT')
  }

  const handleConfigSaved = () => {
    refetch() // Final refresh to unlock the dashboard
    }

  useEffect(() => {
    setStep(initialStep)
    setOrganization(initialOrg)
  }, [initialOrg, initialStep])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl px-4">
        <AnimatePresence mode="wait">
          {step === 'ORG_CREATION' && (
            <motion.div
              key="org-creation"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <OrgCreationStep onComplete={handleOrgCreated} />
            </motion.div>
          )}

          {step === 'WHATSAPP_CONNECT' && organization && (
            <motion.div
              key="whatsapp-connect"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <WhatsAppConnectStep
                organization={organization}
                onComplete={handleWhatsAppConnected}
              />
            </motion.div>
          )}

          {step === 'WHATSAPP_SELECT' && organization && oauthState && (
            <motion.div
              key="whatsapp-select"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <WhatsAppSelectionStep
                organization={organization}
                state={oauthState}
                onComplete={handleConfigSaved}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
