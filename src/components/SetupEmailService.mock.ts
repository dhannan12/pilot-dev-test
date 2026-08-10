export const mockEmailProviders = [
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Industry-leading email delivery platform with excellent deliverability',
    configured: true,
  },
  {
    id: 'mailgun',
    name: 'Mailgun',
    description: 'Powerful email API for developers with detailed analytics',
    configured: false,
  },
  {
    id: 'aws-ses',
    name: 'AWS SES',
    description: 'Amazon Simple Email Service for reliable email sending',
    configured: false,
  },
  {
    id: 'smtp',
    name: 'Custom SMTP',
    description: 'Configure your own SMTP server',
    configured: false,
  },
];

export const mockEmailTemplates = [
  {
    id: 'confirmation',
    name: 'Reservation Confirmation',
    subject: 'Your reservation has been confirmed',
    type: 'confirmation' as const,
    enabled: true,
  },
  {
    id: 'reminder',
    name: 'Reservation Reminder',
    subject: 'Reminder: Your reservation is coming up',
    type: 'reminder' as const,
    enabled: true,
  },
  {
    id: 'cancellation',
    name: 'Cancellation Notice',
    subject: 'Your reservation has been cancelled',
    type: 'cancellation' as const,
    enabled: true,
  },
];

export const mockReservationSettings = [
  {
    id: 'send-confirmation',
    setting: 'Send Confirmation Email',
    value: 'Enabled - Sent immediately after booking',
    description: 'Automatically send confirmation email to customers',
  },
  {
    id: 'reminder-hours',
    setting: 'Reminder Email Timing',
    value: '24 hours before reservation',
    description: 'When to send reminder emails to customers',
  },
  {
    id: 'reply-to',
    setting: 'Reply-To Address',
    value: 'support@reservations.com',
    description: 'Email address for customer replies',
  },
  {
    id: 'bcc-address',
    setting: 'BCC Address',
    value: 'archive@reservations.com',
    description: 'Archive copy of all reservation emails',
  },
];