export default function ConversationList() {
  return (
    <aside className="w-full lg:w-80 border-r bg-white hidden sm:block lg:block">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold">6 Open</span>
        <span className="text-xs text-gray-400">Newest</span>
      </div>
      <ul className="overflow-y-auto h-full px-2 py-2 space-y-2">
        <li className="bg-blue-50 border-l-4 border-blue-500 px-3 py-2 rounded flex flex-col gap-1 focus:ring-2 focus:ring-blue-400">
          <span className="font-semibold">Michael</span>
          <span className="text-xs text-blue-600">Messenger call active</span>
        </li>
        <li className="px-3 py-2 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 flex flex-col gap-1 transition">
          <span className="font-semibold">Whitney Hall</span>
          <span className="text-xs text-gray-400">Okay, I didn't under...</span>
        </li>
        <li className="px-3 py-2 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 flex flex-col gap-1 transition">
          <span className="font-semibold">Heather Ho</span>
          <span className="text-xs text-gray-400">Thank you!</span>
        </li>
        <li className="px-3 py-2 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 flex flex-col gap-1 transition">
          <span className="font-semibold">Aiden Sanchez</span>
          <span className="text-xs text-gray-400">Sure, no worries.</span>
        </li>
      </ul>
    </aside>
  );
} 