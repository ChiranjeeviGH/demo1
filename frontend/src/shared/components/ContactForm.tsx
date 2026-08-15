import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

import { Button } from '@/shared/components/ui/Button'
import { fadeSide } from '@/shared/motion'

type ContactFormProps = {
  submitLabel?: string
  nameLabel?: string
  showPhone?: boolean
  showSubject?: boolean
}

const SUBJECT_OPTIONS = [
  'General inquiry',
  'Collaboration',
  'Press / Media',
  'Casting',
  'Other',
] as const

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm({
  submitLabel = 'Send Message',
  nameLabel = 'Your Name',
  showPhone = false,
  showSubject = true,
}: ContactFormProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone') || null,
          subject: data.get('subject') || null,
          message: data.get('message'),
        }),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const label =
    status === 'sending'
      ? 'Sending…'
      : status === 'sent'
        ? 'Message Sent ✓'
        : status === 'error'
          ? 'Something went wrong — try again'
          : submitLabel

  return (
    <motion.form
      className="contact-form"
      onSubmit={onSubmit}
      {...fadeSide(20, 0.12, 0.8)}
      data-testid="contact-form"
    >
      <div className="contact-form__row">
        <label className="field">
          <span>{nameLabel}</span>
          <input
            name="name"
            placeholder="Full name"
            autoComplete="name"
            required
            data-testid="contact-name-input"
          />
        </label>
        <label className="field">
          <span>Email Address</span>
          <input
            name="email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            required
            data-testid="contact-email-input"
          />
        </label>
      </div>
      {showPhone ? (
        <label className="field">
          <span>Phone</span>
          <input
            name="phone"
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            data-testid="contact-phone-input"
          />
        </label>
      ) : null}
      {showSubject ? (
        <label className="field">
          <span>Subject</span>
          <select name="subject" defaultValue="" required data-testid="contact-subject-select">
            <option value="" disabled>
              Select a topic
            </option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="field">
        <span>Your Message</span>
        <textarea
          name="message"
          placeholder="Tell us your story or idea..."
          rows={5}
          required
          data-testid="contact-message-input"
        />
      </label>
      <Button type="submit" disabled={status === 'sending'} data-testid="contact-submit-btn">
        {label}
      </Button>
    </motion.form>
  )
}
