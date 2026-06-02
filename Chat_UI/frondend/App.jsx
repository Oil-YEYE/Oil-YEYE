import { useState } from 'react';
import './index.css'

function App() {
  //Your typing
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  //Process the sendMessage
  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const newMessage = {
      role: "user",
      content: input,
    };

    //Create a *newMessages*
    const newMessages = [...messages, newMessage];

    //Update messages
    setMessages(newMessages);
    setInput("");

    //Send a request and get a response object
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: newMessages,
      }),
    });

    //Parse JSON data from the response object
    const data = await res.json();

    //Get the content from inside the data
    const aiMessage = {
      role: "assistant",
      content: data.reply.content,
    };

    //Plus the ai Messages to the messages
    setMessages([...newMessages, aiMessage]);
  };
  
  return (
    <div>
      <header 
      className="chat-header"
      >CHAT UI</header>

      <main className="chat-area">
        {messages.map((msg,index)=>(
          <div key={index}>
            {msg.content}
          </div>
        ))}
      </main>

      <footer className="input-area">
        <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='type your message...'
        />
        <button onClick={sendMessage} >Send</button>
      </footer>
    </div>
  );
}

export default App;
