import { ChatBubbleLeftRightIcon, UserGroupIcon, Cog6ToothIcon, InboxIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <aside className="w-20 bg-white border-r flex flex-col items-center py-4 space-y-2
      fixed bottom-0 left-0 right-0 z-20 flex-row justify-between md:static md:flex-col md:w-20 md:h-full md:py-4 md:space-y-2 md:space-x-0
      h-16 md:h-full shadow md:shadow-none">
      <div className="flex flex-row md:flex-col items-center gap-4 flex-1 w-full justify-center md:justify-start">
        <button aria-label="Inbox" className="bg-blue-100 text-blue-600 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 hover:bg-blue-200 transition"><InboxIcon className="w-6 h-6" /></button>
        <button aria-label="Chats" className="p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition"><ChatBubbleLeftRightIcon className="w-6 h-6" /></button>
        <button aria-label="Teams" className="p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition"><UserGroupIcon className="w-6 h-6" /></button>
        <button aria-label="Settings" className="p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition"><Cog6ToothIcon className="w-6 h-6" /></button>
      </div>
      <div className="flex flex-row md:flex-col items-center gap-2">
        <button aria-label="Profile" className="p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 transition"><img src="/avatar1.png" alt="avatar" className="w-8 h-8 rounded-full" /></button>
      </div>
    </aside>
  );
} 