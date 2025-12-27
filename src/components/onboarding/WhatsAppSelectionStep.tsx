"use client"

import React, { useState, useEffect } from 'react'
import { Check, Settings2, Phone, Building, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Organization, OrganizationsService } from '@/lib/api'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface WhatsAppSelectionStepProps {
  organization: Organization
  state: string
  onComplete: () => void
}

export const WhatsAppSelectionStep: React.FC<WhatsAppSelectionStepProps> = ({ organization, state, onComplete }) => {
  const [wabas, setWabas] = useState<any[]>([])
  const [phones, setPhones] = useState<any[]>([])
  const [selectedWaba, setSelectedWaba] = useState<string>('')
  const [selectedPhone, setSelectedPhone] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch WABAs on mount
  useEffect(() => {
    const fetchWabas = async () => {
      try {
        const response = await OrganizationsService.getApiV1OrganizationsWhatsappAccounts(state)
        if (response.wabaOptions) {
          setWabas(response.wabaOptions)
        }
      } catch (error) {
        console.error('Failed to fetch WABAs:', error)
        toast.error('Failed to load WhatsApp accounts. The link might have expired.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchWabas()
  }, [state])

  // Fetch phones when WABA changes
  useEffect(() => {
    if (!selectedWaba) return

    const fetchPhones = async () => {
      try {
        const response = await OrganizationsService.getApiV1OrganizationsWhatsappPhoneNumbers(state, selectedWaba)
        if (response.phoneOptions) {
          setPhones(response.phoneOptions)
        }
      } catch (error) {
        console.error('Failed to fetch phones:', error)
        toast.error('Failed to load phone numbers for this account.')
      }
    }
    fetchPhones()
  }, [selectedWaba, state])

  const handleSave = async () => {
    if (!selectedWaba || !selectedPhone) return

    setIsSaving(true)
    try {
      const response = await OrganizationsService.postApiV1OrganizationsWhatsappSaveConfig(organization.id, {
        state,
        wabaId: selectedWaba,
        phoneNumberId: selectedPhone,
      })

      if (response.success) {
        toast.success('Configuration saved successfully!')
        onComplete()
      } else {
        toast.error(response.message || 'Failed to save configuration')
      }
    } catch (error) {
      console.error('Failed to save config:', error)
      toast.error('An error occurred while saving. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-zinc-800 bg-zinc-900 shadow-2xl h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-zinc-400 font-medium">Fetching your WhatsApp accounts...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900 shadow-2xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Step 3 of 3</span>
        </div>
        <CardTitle className="text-2xl font-bold text-white">
          Finalize Setup
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Select the specific WhatsApp account and phone number you want to use.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
            <Building className="h-4 w-4" />
            WhatsApp Business Account
          </label>
          <Select onValueChange={setSelectedWaba} value={selectedWaba}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:ring-primary h-12">
              <SelectValue placeholder="Select a WABA" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              {wabas.map((waba) => (
                <SelectItem key={waba.id} value={waba.id as string}>
                  {waba.name} <span className="text-xs text-zinc-500 ml-2">({waba.id})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          {selectedWaba && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <Select onValueChange={setSelectedPhone} value={selectedPhone}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:ring-primary h-12">
                  <SelectValue placeholder="Select a phone number" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                  {phones.map((phone) => (
                    <SelectItem key={phone.id} value={phone.id as string}>
                      {phone.displayPhoneNumber} <span className="text-xs text-zinc-500 ml-2">({phone.verifiedName})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </AnimatePresence>

        {(!wabas || wabas.length === 0) && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            No WhatsApp Business Accounts found. Please ensure you have created one in the Meta Business Manager.
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-3">
        <Button
          onClick={handleSave}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-lg shadow-primary/20 transition-all"
          disabled={!selectedPhone || isSaving}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Configuration...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Complete Onboarding
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
