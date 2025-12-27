"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Building2, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { OrganizationsService, Organization } from '@/lib/api'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  description: z.string().optional(),
  industry: z.string().min(2, 'Industry is required'),
})

interface OrgCreationStepProps {
  onComplete: (org: Organization) => void
}

export const OrgCreationStep: React.FC<OrgCreationStepProps> = ({ onComplete }) => {
  const { data: session } = useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      industry: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user?.id) return

    try {
      const response = await OrganizationsService.postApiV1Organizations({
        name: values.name,
        description: values.description,
        industry: values.industry,
        ownerId: session.user.id,
      })

      if (response.data) {
        toast.success('Organization created successfully!')
        onComplete(response.data)
      }
    } catch (error) {
      console.error('Failed to create organization:', error)
      toast.error('Failed to create organization. Please try again.')
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900 shadow-2xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Step 1 of 3</span>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Welcome to Aetheris
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Let's start by creating your organization profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Corp"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Industry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Technology, Healthcare, etc."
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about your business..."
                      className="resize-none bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-primary min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-lg shadow-primary/20"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create Organization
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
