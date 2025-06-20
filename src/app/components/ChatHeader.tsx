import { UserButton } from "@clerk/nextjs";
import type { Contact } from './InboxSidebar';

interface ChatHeaderProps {
  contact: Contact;
  user: any;
  onLogout: () => void;
}

export default function ChatHeader({ contact, user }: ChatHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-lg font-medium text-gray-600">
            {contact.name.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{contact.name}</h2>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
} 