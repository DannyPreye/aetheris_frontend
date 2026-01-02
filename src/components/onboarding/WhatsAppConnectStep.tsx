"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, ExternalLink, ShieldCheck, Zap, QrCode, Smartphone, Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Organization, OrganizationsService } from '@/lib/api'
import { toast } from 'sonner'
import { QRCodeCanvas } from 'qrcode.react'
import { useQuery } from '@tanstack/react-query'

interface WhatsAppConnectStepProps {
  organization: Organization
  onComplete: (state: string) => void
}

type ConnectionMethod = 'selection' | 'oauth' | 'qr'

export const WhatsAppConnectStep: React.FC<WhatsAppConnectStepProps> = ({ organization, onComplete }) => {
  const [method, setMethod] = useState<ConnectionMethod>('selection')
  const [isInitializing, setIsInitializing] = useState(false)
  const [baileysInit, setBaileysInit] = useState(false)

  // Polling for QR Code
  const { data: qrData, isLoading: isLoadingQr, error: qrError, refetch: refetchQr } = useQuery({
    queryKey: ['whatsapp-qr', organization.id || (organization as any)._id],
    queryFn: () => OrganizationsService.getApiV1OrganizationsWhatsappQrcode(organization.id || (organization as any)._id),
    enabled: method === 'qr' && baileysInit,
    refetchInterval: (query) => {
       // Stop refreshing if we have a QR code, unless we want to refresh it periodically?
       // Usually Baileys QR codes expire, so we might need to keep fetching or handle expiry.
       // For now, let's fetch every 5 seconds if we don't have one or if we just want to keep it fresh
       return 5000
    }
  })

  // Polling for Connection Status
  const { data: statusData } = useQuery({
    queryKey: ['whatsapp-status', organization.id || (organization as any)._id],
    queryFn: () => OrganizationsService.getApiV1OrganizationsWhatsappStatus(organization.id || (organization as any)._id),
    enabled: method === 'qr' && baileysInit,
    refetchInterval: 3000,
  })

  useEffect(() => {
    if (statusData?.isConnected) {
        toast.success("WhatsApp device connected successfully!")
        // For Baileys, we might not have a 'state' token like OAuth.
        // We can pass a dummy state or modify the parent to handle this.
        // Passing 'baileys_connected' as a distinct flag.
        onComplete('baileys_connected')
    }
  }, [statusData, onComplete])


  const handleOAuthConnect = async () => {
    setIsInitializing(true)
    try {
      // @ts-ignore
      const response = await OrganizationsService.getApiV1OrganizationsWhatsappInitOauth(organization.id || (organization as any)._id)
      if (response.authUrl) {
        window.location.href = response.authUrl
      } else {
        toast.error('Failed to get authorization URL')
      }
    } catch (error) {
      console.error('Failed to initiate WhatsApp OAuth:', error)
      toast.error('Connection failed. Please check your organization settings.')
    } finally {
      setIsInitializing(false)
    }
  }

  const handleQrConnect = async () => {
    setMethod('qr')
    setBaileysInit(false)
    try {
        await OrganizationsService.postApiV1OrganizationsWhatsappInitBaileys(organization.id || (organization as any)._id)
        setBaileysInit(true)
    } catch (error) {
        console.log("Failed to init baileys:", error)
        toast.error("Failed to initialize Linked Device connection.")
        setMethod('selection')
    }
  }

  const renderSelection = () => (
    <div className="space-y-6">
       <div className="grid gap-6 md:grid-cols-2">
           {/* Official API Option */}
           <div
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 hover:border-emerald-500/50 hover:bg-zinc-900/80 transition-all cursor-pointer"
              onClick={handleOAuthConnect}
           >
               <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
               <div className="space-y-4 relative z-10">
                   <div className="flex items-center justify-between">
                       <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                           <ShieldCheck className="h-6 w-6" />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">Recommended</span>
                   </div>
                   <div>
                       <h3 className="font-bold text-white text-lg">Official WhatsApp API</h3>
                       <p className="text-sm text-zinc-500 mt-1">Direct integration with Meta. Most stable, supports specialized features, and zero risk of disconnection.</p>
                   </div>
                   <ul className="space-y-2">
                       <li className="flex items-center text-xs text-zinc-400 gap-2">
                           <Zap className="h-3 w-3 text-emerald-500" /> High Stability
                       </li>
                       <li className="flex items-center text-xs text-zinc-400 gap-2">
                            <Zap className="h-3 w-3 text-emerald-500" /> Anti-Ban Protection
                       </li>
                   </ul>
               </div>
               <Button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold" disabled={isInitializing}>
                   {isInitializing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect via Meta"}
               </Button>
           </div>

           {/* Linked Device Option */}
           <div
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 hover:border-blue-500/50 hover:bg-zinc-900/80 transition-all cursor-pointer"
              onClick={handleQrConnect}
           >
               <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
               <div className="space-y-4 relative z-10">
                   <div className="flex items-center justify-between">
                       <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <QrCode className="h-6 w-6" />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">Alternative</span>
                   </div>
                   <div>
                       <h3 className="font-bold text-white text-lg">Linked Device</h3>
                       <p className="text-sm text-zinc-500 mt-1">Connect using a QR code like WhatsApp Web. Good for quick testing but less stable for high volume.</p>
                   </div>
                   <ul className="space-y-2">
                       <li className="flex items-center text-xs text-zinc-400 gap-2">
                           <Smartphone className="h-3 w-3 text-blue-500" /> Instant Setup
                       </li>
                       <li className="flex items-center text-xs text-amber-500/80 gap-2">
                            <Zap className="h-3 w-3" /> Requires Phone Online
                       </li>
                   </ul>
               </div>
               <Button variant="outline" className="mt-6 w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-bold">
                   Generate QR Code
               </Button>
           </div>
       </div>
    </div>
  )

  const renderQrMode = () => (
      <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Scan to Connect</h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">Open WhatsApp on your phone, go to <span className="text-white font-medium">Settings {'>'} Linked Devices</span> and scan the code below.</p>
          </div>

          <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                  {isLoadingQr || !qrData?.qrCode ? (
                      <div className="w-[256px] h-[256px] flex items-center justify-center bg-zinc-100 rounded-xl">
                          <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
                      </div>
                  ) : (
                      <QRCodeCanvas
                          value={qrData.qrCode}
                          size={256}
                          level={"H"}
                          includeMargin={true}
                      />
                  )}
              </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Waiting for device connection...
          </div>

          <Button variant="ghost" onClick={() => setMethod('selection')} className="text-zinc-500 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to methods
          </Button>
      </div>
  )

  return (
    <Card className="border-zinc-800 bg-zinc-950/80 backdrop-blur-xl shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 h-[300px] w-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <CardHeader className="space-y-1 relative z-10">
        <div className="flex items-center gap-2 text-emerald-500 mb-2">
          <Zap className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Step 2 of 3</span>
        </div>
        <CardTitle className="text-3xl font-bold text-white tracking-tight">
          Connect WhatsApp
        </CardTitle>
        <CardDescription className="text-zinc-400 text-base">
          Choose how you want to connect your business number.
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 flex-1 flex flex-col justify-center">
         <AnimatePresence mode="wait">
            {method === 'selection' ? (
                <motion.div
                    key="selection"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderSelection()}
                </motion.div>
            ) : (
                 <motion.div
                    key="qr"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderQrMode()}
                </motion.div>
            )}
         </AnimatePresence>
      </CardContent>
    </Card>
  )
}
