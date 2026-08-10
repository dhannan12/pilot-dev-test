export const mockEmailProviders = [
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Cloud-based email service',
    configured: false,
  },
  {
    id: 'mailgun',
    name: 'Mailgun',
    description: 'Email API for developers',
    configured: false,
  },
  {
    id: 'aws-ses',
    name: 'AWS SES',
    description: 'Amazon Simple Email Service',
    configured: false,
  },
];

export const mockEmailTemplates = [
  {
    id: 'confirmation',
    name: 'Confirmation Email',
    subject: 'Your reservation has been confirmed',
    type: 'confirmation' as const,
    enabled: true,
  },
  {
    id: 'cancellation',
    name: 'Cancellation Email',
    subject: 'Your reservation has been cancelled',
    type: 'cancellation' as const,
    enabled: true,
  },
  {
    id: 'reminder',
    name: 'Reminder Email',
    subject: 'Reminder: Your reservation is coming up',
    type: 'reminder' as const,
    enabled: true,
  },
];

export const mockReservationSettings = {
  id: 'settings-001',
  sendConfirmation: true,
  sendReminder: true,
  reminderHoursBefore: 24,
  fromEmail: 'noreply@reservations.com',
  replyToEmail: 'support@reservations.com',
};