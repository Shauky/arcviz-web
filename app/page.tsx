'use client'
import Scene from '@/components/Scene'
import { useState } from 'react';

function ChatWindow() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User input:', input);
  };

  return (
    <div>
      {chatOpen ? (
        <div className="fixed bottom-0 right-0 z-50">
          {/* add a chat box here to display the input from the user */}
          <form onSubmit={handleSubmit}>
              <label htmlFor="input">Input:</label>
              <input type="text" id="input" value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit">Submit</button>
           </form>
          <p>{input}</p>
          <button onClick={() => setChatOpen(!chatOpen)} className="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded-lg text-sm px-2 py-1.5 leading-tight">
            Close
          </button>
        </div>
      ) : (
        <div className="fixed bottom-0 right-0 z-50">
          <button onClick={() => setChatOpen(!chatOpen)} className="text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded-lg text-sm px-2 py-1.5 leading-tight">
            Open
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 overflow-hidden">
      <div id="canvas-container" className='w-[1024px] h-[900px]'>
        <Scene />
        <div className='chat-container'>
          <p className='text-center'> There's a lady who knows </p>
          <ChatWindow/>
        </div>
      </div>
    </main>
  );
}


