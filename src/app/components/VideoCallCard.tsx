import { MicrophoneIcon, VideoCameraIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function VideoCallCard() {
  return (
    <div className="bg-black rounded-xl p-2 sm:p-4 mt-4 sm:mt-6 mx-auto w-full max-w-full sm:max-w-xl flex flex-col gap-2 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
        <img src="/avatar5.png" className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover" />
        <img src="/avatar6.png" className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover" />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2">
        <div className="flex gap-2">
          <button aria-label="Mute mic" className="bg-gray-800 text-white p-2 rounded-full focus:ring-2 focus:ring-blue-400 hover:bg-gray-700 transition"><MicrophoneIcon className="w-5 h-5" /></button>
          <button aria-label="Toggle video" className="bg-gray-800 text-white p-2 rounded-full focus:ring-2 focus:ring-blue-400 hover:bg-gray-700 transition"><VideoCameraIcon className="w-5 h-5" /></button>
          <button aria-label="End call" className="bg-gray-800 text-white p-2 rounded-full focus:ring-2 focus:ring-blue-400 hover:bg-gray-700 transition"><PhoneIcon className="w-5 h-5" /></button>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold focus:ring-2 focus:ring-red-400 hover:bg-red-700 transition">End Call for all</button>
      </div>
    </div>
  );
} 