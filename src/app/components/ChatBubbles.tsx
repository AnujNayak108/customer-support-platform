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
              ? 'self-start bg-blue-100 text-blue-900' 
              : 'self-end bg-gray-100 text-gray-900'
          } px-3 sm:px-4 py-2 rounded-lg shadow-sm max-w-[90vw] sm:max-w-[80%] text-sm sm:text-base`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
} 