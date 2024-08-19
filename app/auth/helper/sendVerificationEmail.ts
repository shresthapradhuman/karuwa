import { resend } from '@/lib/resend'
import VerificationEmail from '../templates/VerificationEmail'

export async function sendVerificationEmail(email: string, token: string) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    react: VerificationEmail({ validationCode: token })
  })
}
