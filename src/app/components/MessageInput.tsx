import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HiLightningBolt } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { useState } from 'react';

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="w-full sm:max-w-2xl mx-auto p-2 sticky bottom-0 z-10 bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow border px-4 pt-3 pb-2 flex flex-col gap-2">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-500" />
          <span className="font-semibold text-sm">Chat</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-1" />
        </div>
        {/* Textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full min-h-[40px] max-h-32 resize-none border-0 focus:outline-none focus:ring-0 text-gray-700 text-sm placeholder-gray-400 bg-transparent"
          placeholder="Use ⌘K for shortcuts"
        />
        {/* Actions Row */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 text-gray-500">
            <button type="button" className="hover:text-blue-600 transition"><HiLightningBolt className="w-5 h-5" /></button>
            <button type="button" className="hover:text-blue-600 transition"><BsBookmark className="w-5 h-5" /></button>
            <button type="button" className="hover:text-blue-600 transition"><HiOutlineEmojiHappy className="w-5 h-5" /></button>
            <button type="button" className="hover:text-blue-600 transition"><PlusIcon className="w-5 h-5" /></button>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className={`text-gray-500 font-medium px-4 py-1 rounded transition ${
              message.trim() ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 