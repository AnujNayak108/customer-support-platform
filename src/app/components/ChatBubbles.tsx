type Message = {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
};

type ChatBubblesProps = {
  contact: {
    id: string;
    name: string;
  };
  messages: Message[];
};

export default function ChatBubbles({ contact, messages }: ChatBubblesProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-6 px-2 sm:px-8 max-w-full sm:max-w-2xl mx-auto w-full">
      {messages.map(message => (
        <div
          key={message.id}
          className={`${
            message.sender === 'user' 
              ? 'self-end bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
              : 'self-start bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900'
          } px-4 sm:px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 max-w-[90vw] sm:max-w-[80%] text-sm sm:text-base`}
          style={{
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
} 