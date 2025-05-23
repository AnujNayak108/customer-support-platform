import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HiLightningBolt, HiOutlineEmojiHappy } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message.trim());
        setMessage('');
      }
    }
  };

  return (
    <div className="w-full sm:max-w-2xl mx-auto p-2 sticky bottom-0 z-10 bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-gray-100">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-sm text-gray-700">Chat</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-400 ml-1" />
        </div>
        {/* Message Input */}
        <div className="relative px-4 pt-3 pb-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className={`absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
              message.trim() 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        {/* Actions */}
        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-3 text-gray-500">
            <button type="button" className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"><HiLightningBolt className="w-5 h-5" /></button>
            <button type="button" className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"><BsBookmark className="w-5 h-5" /></button>
            <button type="button" className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"><HiOutlineEmojiHappy className="w-5 h-5" /></button>
            <button type="button" className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"><PlusIcon className="w-5 h-5" /></button>
          </div>
        </div>
      </form>
    </div>
  );
} 