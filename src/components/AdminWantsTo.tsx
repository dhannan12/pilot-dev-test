/**
 * AdminWantsTo — Displays total count of messages in admin inbox
 *
 * Features: message count badge, inbox summary, mock message data, clean admin UI, real-time total display
 *
 * Ticket: SCRUM-837 | Branch: proto/SCRUM-828
 */

import React from 'react';

interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  timestamp: string;
  isRead: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    sender: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Question about pricing',
    timestamp: '2026-08-14T10:30:00',
    isRead: false
  },
  {
    id: 2,
    sender: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    subject: 'Support request',
    timestamp: '2026-08-14T09:15:00',
    isRead: true
  },
  {
    id: 3,
    sender: 'Michael Brown',
    email: 'mbrown@email.com',
    subject: 'Feature inquiry',
    timestamp: '2026-08-13T16:45:00',
    isRead: false
  },
  {
    id: 4,
    sender: 'Emily Davis',
    email: 'emily.davis@domain.com',
    subject: 'Partnership opportunity',
    timestamp: '2026-08-13T14:20:00',
    isRead: true
  },
  {
    id: 5,
    sender: 'Robert Wilson',
    email: 'rwilson@mail.com',
    subject: 'Billing question',
    timestamp: '2026-08-12T11:00:00',
    isRead: false
  },
  {
    id: 6,
    sender: 'Lisa Martinez',
    email: 'lisa.m@example.org',
    subject: 'Technical issue',
    timestamp: '2026-08-12T08:30:00',
    isRead: true
  },
  {
    id: 7,
    sender: 'David Anderson',
    email: 'david.anderson@company.net',
    subject: 'General feedback',
    timestamp: '2026-08-11T15:10:00',
    isRead: false
  }
];

export default function AdminWantsTo() {
  const totalMessages = MOCK_MESSAGES.length;
  const unreadMessages = MOCK_MESSAGES.filter(msg => !msg.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Inbox</h1>
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-lg text-center">
                <div className="text-3xl font-bold">{totalMessages}</div>
                <div className="text-sm font-medium">Total Messages</div>
              </div>
              <div className="bg-orange-100 text-orange-800 px-6 py-3 rounded-lg text-center">
                <div className="text-3xl font-bold">{unreadMessages}</div>
                <div className="text-sm font-medium">Unread</div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
            <div className="space-y-3">
              {MOCK_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border ${
                    message.isRead
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {message.sender}
                        </h3>
                        {!message.isRead && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {message.email}
                      </p>
                      <p className="text-gray-800">{message.subject}</p>
                    </div>
                    <div className="text-sm text-gray-500 ml-4">
                      {new Date(message.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Inbox Statistics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {totalMessages}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {MOCK_MESSAGES.filter(msg => msg.isRead).length}
              </div>
              <div className="text-sm text-gray-600">Read</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">
                {unreadMessages}
              </div>
              <div className="text-sm text-gray-600">Unread</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
