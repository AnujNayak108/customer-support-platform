import { InboxIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function ConversationFolders() {
  return (
    <nav className="hidden md:block flex-1 overflow-y-auto px-2 py-2 space-y-2">
      <div>
        <div className="text-xs text-gray-400 px-2 mb-1">FOLDERS</div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 px-2 py-1 rounded bg-blue-50 text-blue-600 font-medium focus:ring-2 focus:ring-blue-400">
            <InboxIcon className="w-4 h-4" /> Your Inbox
          </li>
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <span className="w-2 h-2 bg-blue-400 rounded-full" /> Mentions
          </li>
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <span className="w-2 h-2 bg-gray-400 rounded-full" /> Created by you
          </li>
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <span className="w-2 h-2 bg-gray-300 rounded-full" /> Unassigned
          </li>
        </ul>
      </div>
      <div>
        <div className="text-xs text-gray-400 px-2 mt-4 mb-1">TEAMS</div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <UserGroupIcon className="w-4 h-4 text-gray-400" /> EMEA
          </li>
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <UserGroupIcon className="w-4 h-4 text-gray-400" /> APAC
          </li>
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <UserGroupIcon className="w-4 h-4 text-gray-400" /> US
          </li>
        </ul>
      </div>
      <div>
        <div className="text-xs text-gray-400 px-2 mt-4 mb-1">TEAMMATES</div>
        <ul className="space-y-1">
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <img src="/avatar2.png" className="w-5 h-5 rounded-full" /> Jane Jenson
          </li>
          <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition">
            <img src="/avatar3.png" className="w-5 h-5 rounded-full" /> Clara Richards
          </li>
        </ul>
      </div>
    </nav>
  );
} 