'use client'

import { getCookie, setCookie } from 'cookies-next';
import { useState, useEffect, useRef } from 'react';
import { IoSend, IoSync } from "react-icons/io5";

export default function Home() {
  const [name, setName] = useState<string>()
  const [realtime, setRealtime] = useState<boolean>(true)
  const [chat, setChat] = useState<{name: string, text: string}[]>([])
  const chatText = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const realtimeChat = setTimeout(() => {
      if(name) {
        const chatCookie: any = getCookie('simplechat')
        const chatList = chatCookie && JSON.parse(chatCookie)
        setChat(chatList)
        setRealtime(!realtime)
      }
    }, 500)

    return () => clearTimeout(realtimeChat)
  }, [realtime, name])

  useEffect(() => {
    console.log('VG9vIGhhc3R5IGZvciB0aGlzIHB1enpsZSwgSSBvbmx5IGhhZCB0aW1lIHRvIHNvbHZlIG9uZS4=')
  }, [])

  const handleName = (e: any) => {
    setName(e.target.name.value)
  }

  const handleChat = () => {
    if (chatText.current) {
      const old = Array.isArray(chat) && chat.length ? chat : []
      setCookie('simplechat', [...old, {name: name, text: chatText.current.value}], {maxAge: 60 * 60 * 24 * 7})
      chatText.current.value = ''
    }
  }
  
  return (name ?
    <main className="grid min-h-screen content-start gap-y-3 max-w-lg mx-auto p-5 pb-28 relative">
      <button onClick={() => setName('')} 
      className='flex gap-x-3 items-center justify-center mb-3 bg-slate-900 rounded-lg py-2 px-3'>
        <IoSync className="text-lg" />Change account
      </button>
      {Array.isArray(chat) && chat.length ? chat.map((item, i) => 
        <div key={i} className={`grid gap-y-1.5 w-max p-3 max-w-[70%] bg-green-400 rounded-2xl 
        ${item.name === name ? 'rounded-tr-none mr-0 ml-auto' : 'rounded-tl-none'}`}>
          <h2 className="text-sm font-bold">{item.name}</h2>
          <h1>{item.text}</h1>
        </div>
      ) : <h1 className='text-slate-800 text-center font-medium'>Start a chat</h1>}
      <div className='fixed max-w-lg mx-auto bg-slate-950 inset-x-0 bottom-0 flex gap-x-3 p-5'>
          <input type='text' name='chat' placeholder='Type here...' ref={chatText}
          className='w-full rounded-full outline-none p-3 h-12 bg-slate-50 text-slate-950 grow' />
          <button onClick={() => handleChat()}
          className='grid place-content-center h-12 p-3 rounded-full aspect-square bg-green-400'>
            <IoSend className="text-lg" />
          </button>
      </div>
    </main> :
    <div className='min-h-screen grid content-center max-w-lg p-5 mx-auto'>
      <div className='grid gap-y-5 justify-items-center'>
        <h1 className='text-xl font-bold'>what&apos;s your name?</h1>
        <form onSubmit={(e) => handleName(e)} className='grid gap-y-3 justify-center'>
          <input type='text' name="name" autoFocus className='p-3 rounded-xl outline-none bg-slate-50 text-slate-950 h-12 w-full' />
          <button type='submit' className='rounded-full bg-green-400 p-3 font-medium'>Submit</button>
        </form>
      </div>
    </div>
  )
}
