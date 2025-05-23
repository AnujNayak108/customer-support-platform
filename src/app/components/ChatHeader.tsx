import { EllipsisHorizontalIcon, PhoneIcon } from '@heroicons/react/24/outline';
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
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b bg-white">
      {/* Name */}
      <div className="font-semibold text-base sm:text-lg">{contact.name}</div>
      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="p-2 rounded hover:bg-gray-100 text-gray-500"><BsStar className="w-5 h-5" /></button>
        <button className="p-2 rounded hover:bg-gray-100 text-gray-500"><EllipsisHorizontalIcon className="w-5 h-5" /></button>
        <button className="p-2 rounded hover:bg-gray-100 text-gray-500"><BsTicket className="w-5 h-5" /></button>
        <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-medium flex items-center gap-1 hover:bg-gray-200"><FiPhoneCall className="w-4 h-4" /> Call</button>
        <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-medium flex items-center gap-1 hover:bg-gray-200"><MdSnooze className="w-4 h-4" /> Snooze</button>
        <button className="px-3 py-1 rounded bg-black text-white font-medium flex items-center gap-1 hover:bg-gray-800">Close</button>
      </div>
    </header>
  );
} 