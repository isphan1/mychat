import React from 'react'
import {useEffect,useState} from 'react'
import {TextField,Button} from '@material-ui/core'
import {io} from 'socket.io-client'

const Chat = (props) => {
    const [msg,setMsg] = useState('')
    const [myId,setMyId] = useState('')
  const [messages, setMessages] = useState([]);

    const socketRef = React.useRef()

    useEffect(()=>{
    socketRef.current = io('http://127.0.0.1:5000/')
  
    socketRef.current.emit("join",props.location.data)
    socketRef.current.on('myId',id=>{
      setMyId(id)
    })
    socketRef.current.on('newMsg',msg=>{
        receivedMessage(msg)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

      function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

    const submitMsg = (e) =>{
      e.preventDefault()
      socketRef.current.emit('chatMsg',{id:myId,msg:msg}) 
      setMsg("")
  }

    return (
        <div>
        <div id="chat">
          {
           messages.map(item=>{
             if(item.id === myId){
              return <p style={{background:"#fff"}} key={Math.random()*453546}>{item.msg}</p>
             }
             else{
              return <p style={{background:"#ccc"}} key={Math.random()*87546}>{item.msg}</p>

             }
            })
          }
        </div>
        <form onSubmit={submitMsg} autoComplete="off">
        <TextField 
                    size="small"
                    style={{width:"80%"}} 
                    name="msg" 
                    variant="outlined"
                    label="message"
                    value={msg}
                    onChange={(e)=>setMsg(e.target.value)}
                />
                <Button type="submit">
                  send
                  </Button>
        </form>
        </div>
    )
}

export default Chat