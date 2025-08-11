"use client";
import { useState, useEffect } from 'react';
import { useAuth, useUser } from "@clerk/nextjs";
import ChatHeader from './components/ChatHeader';
import ChatBubbles from './components/ChatBubbles';
import MessageInput from './components/MessageInput';
import AICopilotSidebar from './components/AICopilotSidebar';
import InboxSidebar from './components/InboxSidebar';
import AuthModal from './components/AuthModal';
import type { Contact } from './components/InboxSidebar';
import { io, Socket } from 'socket.io-client';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
};

// Backend API message shape
interface ApiMessage {
  _id: string;
  content: string;
  sender: string;
  receiver: string;
  timestamp: string | Date;
  isRead: boolean;
}

export default function Home() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

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

  const currentUserId = user?.id ?? 'guest';

  const toUiMessage = (api: ApiMessage): Message => ({
    id: api._id,
    text: api.content,
    sender: api.sender === currentUserId ? 'user' : 'contact',
    timestamp: new Date(api.timestamp),
  });

  // Socket connection and room join per conversation
  useEffect(() => {
    if (!isSignedIn) return;

    const s = io('https://customer-support-platform.onrender.com', { transports: ['websocket'] });
    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [isSignedIn]);

  useEffect(() => {
    if (!socket) return;

    const room = `${currentUserId}:${selectedContactId}`;
    socket.emit('join', room);

    const onNewMessage = (api: ApiMessage) => {
      // Guard: only append if the message belongs to this conversation
      const isForThisConversation =
        (api.sender === currentUserId && api.receiver === selectedContactId) ||
        (api.sender === selectedContactId && api.receiver === currentUserId);
      if (!isForThisConversation) return;
      setMessages(prev => {
        if (prev.some(m => m.id === api._id)) return prev; // de-duplicate
        return [...prev, toUiMessage(api)];
      });
    };

    socket.on('message:new', onNewMessage);

    return () => {
      socket.off('message:new', onNewMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, currentUserId, selectedContactId]);

  useEffect(() => {
    if (!isSignedIn) return;

    const controller = new AbortController();
    const load = async () => {
      try {
        const params = new URLSearchParams({ sender: currentUserId, receiver: selectedContactId });
        const res = await fetch(`/api/messages?${params.toString()}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to load messages: ${res.status}`);
        const data: ApiMessage[] = await res.json();
        setMessages(data.map(toUiMessage));
      } catch (err) {
        if ((err as any)?.name !== 'AbortError') {
          console.error(err);
        }
      }
    };

    load();
    return () => controller.abort();
  }, [isSignedIn, currentUserId, selectedContactId]);

  const handleSendMessage = async (text: string) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, sender: currentUserId, receiver: selectedContactId }),
      });
      if (!res.ok) throw new Error(`Failed to send message: ${res.status}`);
      const saved: ApiMessage = await res.json();
      // Optimistic update is optional; socket will also deliver it.
      setMessages(prev => [...prev, toUiMessage(saved)]);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl text-black font-semibold">EAZZCOUSTMER</h1>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome to EAZZCOUSTMER</h2>
            <p className="text-gray-600 mb-4">Please login to start chatting</p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login or Register
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-900 overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar (Inbox) */}
        <InboxSidebar
          open={inboxOpen}
          setOpen={setInboxOpen}
          contacts={contacts}
          selectedContactId={selectedContactId}
          onSelectContact={setSelectedContactId}
        />
        {/* Main Chat Area */}
        <main className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${
          copilotOpen ? 'sm:mr-80' : ''
        } ${inboxOpen ? 'sm:ml-80' : ''} ${
          (inboxOpen || copilotOpen) ? 'hidden sm:flex' : 'flex'
        }`}>
          <ChatHeader 
            contact={selectedContact} 
            user={user} 
            onLogout={() => {}} // Clerk handles logout automatically
          />
          <section className="flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Chat Area */}
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
    </div>
  );
}
