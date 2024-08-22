import React from "react";

function ChatApp() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      <div className="w-[50%] border border-black mt-1 mx-auto">
        {/* Chat Header */}
        <div className="p-4 bg-blue-600 text-white text-lg font-semibold">
          Chat Room
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="bg-blue-200 text-blue-800 p-2 rounded-lg inline-block">
              Hello! How are you?
            </div>
            <div className="text-sm text-gray-500">10:30 AM</div>
          </div>
          <div className="mb-4 text-right">
            <div className="bg-green-200 text-green-800 p-2 rounded-lg inline-block">
              Im good, thanks! How about you?
            </div>
            <div className="text-sm text-gray-500">10:32 AM</div>
          </div>
          {/* More messages */}
        </div>

        {/* Message Input Area */}
        <div className="p-4 bg-white flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 p-2 rounded-lg mr-2"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
