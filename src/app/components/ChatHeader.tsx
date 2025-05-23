import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { BsStar, BsTicket } from 'react-icons/bs';
import { FiPhoneCall } from 'react-icons/fi';
import { MdSnooze } from 'react-icons/md';

type ChatHeaderProps = {
  contact: {
    id: string;
    name: string;
  };
};

export default function ChatHeader({ contact }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Name and Online Status */}
      <div className="flex items-center gap-3">
        <div className="font-semibold text-base sm:text-lg">{contact.name}</div>
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">Online</span>
      </div>
      {/* Actions - Hidden on mobile */}
      <div className="hidden sm:flex items-center gap-2 sm:gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"><BsStar className="w-5 h-5" /></button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"><EllipsisHorizontalIcon className="w-5 h-5" /></button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"><BsTicket className="w-5 h-5" /></button>
        <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium flex items-center gap-1.5 hover:bg-gray-200 transition-colors"><FiPhoneCall className="w-4 h-4" /> Call</button>
        <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium flex items-center gap-1.5 hover:bg-gray-200 transition-colors"><MdSnooze className="w-4 h-4" /> Snooze</button>
        <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium flex items-center gap-1.5 hover:from-blue-600 hover:to-blue-700 transition-colors">Close</button>
      </div>
    </header>
  );
} 