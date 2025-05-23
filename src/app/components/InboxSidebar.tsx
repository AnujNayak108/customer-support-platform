"use client";
import { TbSquareToggle } from 'react-icons/tb';
import { HiOutlineInbox } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

type Contact = {
  id: string;
  name: string;
  lastMessage: string;
};

type InboxSidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  contacts: Contact[];
  selectedContactId: string;
  onSelectContact: (id: string) => void;
};

export default function InboxSidebar({ open, setOpen, contacts, selectedContactId, onSelectContact }: InboxSidebarProps) {
  return (
    <>
      {/* Sidebar Panel */}
      <aside
        className={`hidden lg:flex fixed top-0 left-0 h-screen w-full lg:w-80 border-r bg-white flex-col z-30 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ boxShadow: open ? 'rgba(0,0,0,0.08) 4px 0 24px' : 'none' }}
      >
        <header className="flex flex-col border-b min-h-[66px] bg-white">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center text-black px-2 py-1 rounded-r-full text-xl font-bold">
                <HiOutlineInbox className="mr-1 text-base" /> Inbox
              </span>
            </div>
            {/* Toggle Icon */}
            <button
              aria-label={open ? 'Hide Inbox Panel' : 'Show Inbox Panel'}
              onClick={() => setOpen(!open)}
              className="text-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors"
              style={{ color: open ? '#8b5cf6' : '#9ca3af', transform: open ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              <TbSquareToggle />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div className="flex flex-col gap-3">
            {contacts.map(contact => (
              <button
                key={contact.id}
                className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition ${selectedContactId === contact.id ? 'bg-blue-50 border border-blue-200' : ''}`}
                onClick={() => onSelectContact(contact.id)}
              >
                <FaUserCircle className="w-10 h-10 text-gray-400" />
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-sm">{contact.name}</span>
                  <span className="text-xs text-gray-500">{contact.lastMessage}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>
      {/* Show a small toggle button when sidebar is closed */}
      {!open && (
        <button
          aria-label="Show Inbox Panel"
          onClick={() => setOpen(true)}
          className="hidden lg:flex fixed bottom-6 left-6 z-40 items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-purple-100 text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <span className="font-semibold text-xs">Inbox</span>
        </button>
      )}
    </>
  );
}

export type { InboxSidebarProps, Contact }; 