"use client";
import { useState } from 'react';
import { TbSquareToggle } from 'react-icons/tb';
import { HiOutlineSparkles, HiOutlineUser, HiOutlineUserGroup, HiOutlineLink, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2';

type AICopilotSidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AICopilotSidebar({ open, setOpen }: AICopilotSidebarProps) {
  const [activeTab, setActiveTab] = useState<'copilot' | 'details'>('details');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      setMessages(prev => [...prev, { text: message.trim(), sender: 'user' }]);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I'm your AI assistant. How can I help you today?", 
          sender: 'ai' 
        }]);
      }, 1000);
      
      setMessage('');
    }
  };

  const [collapse, setCollapse] = useState({
    userData: false,
    conversation: false,
    company: false,
    salesforce: false,
    stripe: false,
    jira: false,
  });

  const toggleCollapse = (key: keyof typeof collapse) => {
    setCollapse(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Sidebar Panel */}
      <aside
        className={`hidden lg:flex fixed top-0 right-0 h-screen w-full lg:w-80 border-l bg-gradient-to-b from-white via-blue-50/10 to-purple-50/30 flex-col z-30 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ boxShadow: open ? 'rgba(0,0,0,0.08) -4px 0 24px' : 'none' }}
      >
        <header className="flex flex-col border-b min-h-[68.5px] bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              {/* Tabs */}
              <button
                className={`flex items-center px-2 py-1 rounded-l-full text-xs font-semibold focus:outline-none ${activeTab === 'copilot' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500' : 'text-gray-700'}`}
                onClick={() => setActiveTab('copilot')}
              >
                <HiOutlineSparkles className={`mr-1 text-base ${activeTab === 'copilot' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500' : 'text-gray-700'}`} />AI Copilot
              </button>
              <button
                className={`font-semibold px-2 py-1 text-xs focus:outline-none border-b-2 ${activeTab === 'details' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500' : 'border-transparent text-gray-700'}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
            </div>
            {/* Toggle Icon */}
            <button
              aria-label={open ? 'Hide AI Copilot Panel' : 'Show AI Copilot Panel'}
              onClick={() => setOpen(!open)}
              className="text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              style={{ color: open ? '#2563eb' : '#9ca3af', transform: open ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              <TbSquareToggle />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {activeTab === 'details' && (
            <div className="space-y-4">
              {/* Assignee & Team */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Assignee</span>
                <span className="flex items-center gap-1 text-gray-700 font-medium">
                  <HiOutlineUser className="w-4 h-4" /> Brian Byrne
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Team</span>
                <span className="flex items-center gap-1 text-gray-700 font-medium">
                  <HiOutlineUserGroup className="w-4 h-4" /> Unassigned
                </span>
              </div>
              {/* Links */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">LINKS</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700 font-medium"><HiOutlineLink className="w-4 h-4" /> Tracker ticket</span>
                    <button className="bg-gray-100 hover:bg-gray-200 rounded p-1"><span className="text-lg font-bold">+</span></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700 font-medium"><HiOutlineLink className="w-4 h-4" /> Back-office tickets</span>
                    <button className="bg-gray-100 hover:bg-gray-200 rounded p-1"><span className="text-lg font-bold">+</span></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-700 font-medium"><HiOutlineLink className="w-4 h-4" /> Side conversations</span>
                    <button className="bg-gray-100 hover:bg-gray-200 rounded p-1"><span className="text-lg font-bold">+</span></button>
                  </div>
                </div>
              </div>
              {/* Collapsible Sections */}
              <div>
                {[
                  { key: 'userData', label: 'USER DATA' },
                  { key: 'conversation', label: 'CONVERSATION ATTRIBUTES' },
                  { key: 'company', label: 'COMPANY DETAILS' },
                  { key: 'salesforce', label: 'SALESFORCE' },
                  { key: 'stripe', label: 'STRIPE' },
                  { key: 'jira', label: 'JIRA FOR TICKETS' },
                ].map(section => (
                  <div key={section.key}>
                    <button
                      className="w-full flex items-center justify-between text-xs text-gray-700 font-semibold py-2 px-0 hover:bg-gray-50 rounded transition"
                      onClick={() => toggleCollapse(section.key as keyof typeof collapse)}
                      type="button"
                    >
                      {section.label}
                      {collapse[section.key as keyof typeof collapse] ? (
                        <HiOutlineChevronUp className="w-4 h-4" />
                      ) : (
                        <HiOutlineChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {/* Collapsible content placeholder */}
                    {collapse[section.key as keyof typeof collapse] && (
                      <div className="pl-4 pb-2 text-xs text-gray-500">No data available.</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'copilot' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-blue-100 text-blue-900 ml-auto' 
                        : 'bg-gray-100 text-gray-900'
                    } max-w-[80%]`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Message Box */}
        <form onSubmit={handleSendMessage} className="px-4 py-3 flex items-center gap-2 bg-gradient-to-r from-blue-100/40 via-purple-100/40 to-pink-100/40 backdrop-blur-md border-t border-white/20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-white/20 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-white/30 backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className={`bg-blue-500/90 backdrop-blur-sm text-white rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              message.trim() ? 'hover:bg-blue-600/90' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </form>
      </aside>
      {/* Show a small toggle button when sidebar is closed */}
      {!open && (
        <button
          aria-label="Show AI Copilot Panel"
          onClick={() => setOpen(true)}
          className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-blue-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <span className="font-semibold text-xs">AI Copilot</span>
        </button>
      )}
    </>
  );
}

export type { AICopilotSidebarProps }; 