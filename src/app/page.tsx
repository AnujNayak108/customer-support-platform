"use client";
import { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatBubbles from './components/ChatBubbles';
import MessageInput from './components/MessageInput';
import AICopilotSidebar from './components/AICopilotSidebar';
import InboxSidebar from './components/InboxSidebar';
import type { Contact } from './components/InboxSidebar';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
};

export default function Home() {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const contacts: Contact[] = [
    {
      id: 'alice',
      name: 'Alice Johnson',
      lastMessage: 'Hey, are we still on for tomorrow?',
    },
    {
      id: 'bob',
      name: 'Bob Smith',
      lastMessage: 'Sent the files, let me know!',
    },
    {
      id: 'carol',
      name: 'Carol Lee',
      lastMessage: 'Thanks for your help 😊',
    },
    {
      id: 'david',
      name: 'David Kim',
      lastMessage: 'Can we reschedule our call?',
    },
    {
      id: 'tesla',
      name: 'Nikola Tesla',
      lastMessage: 'The future is electric!',
    },
  ];

  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id);
  const selectedContact = contacts.find(c => c.id === selectedContactId) ?? contacts[0];

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate contact response after 1 second
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for your message! This is an automated response from ${selectedContact.name}.`,
        sender: 'contact',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-50 text-gray-900 overflow-hidden">
      {/* Left Sidebar (Inbox) */}
      <InboxSidebar
        open={inboxOpen}
        setOpen={setInboxOpen}
        contacts={contacts}
        selectedContactId={selectedContactId}
        onSelectContact={setSelectedContactId}
      />
      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${copilotOpen ? 'lg:mr-80' : ''} ${inboxOpen ? 'lg:ml-80' : ''}`}>
        <ChatHeader contact={selectedContact} />
        <section className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Chat and Video Call Area */}
          <section className="flex-1 flex flex-col bg-gray-50 min-h-0">
            <div className="flex-1 overflow-y-auto">
              <ChatBubbles contact={selectedContact} messages={messages} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
          </section>
        </section>
      </main>
      {/* Right Sidebar (AI Copilot) */}
      <AICopilotSidebar open={copilotOpen} setOpen={setCopilotOpen} />
    </div>
  );
}
