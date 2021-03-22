import React from 'react'
import {Paper,makeStyles,Button, TextField, Select,MenuItem, Input,FormControl,InputLabel} from '@material-ui/core'
const useStyles = makeStyles(theme=>({
      root:{
          backgroundColor:"#ccc",
          minHeight:"100vh"
  },
  paper:{
      position:"absolute",
      textAlign:"center",
      padding:"20px 5px",
      width:"500px",
      left:"50%",
      top:"30%",
      transform: `translate(-50% , -30% )`
  },
  formControl:{
    width:"80%",
    margin:"30px 0"
}  
}))


export default function SingUp(props) {
    const classes = useStyles()

    const [username, setUsername] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [open, setOpen] = React.useState(false);
  
    const handleChange = (event) => {
      setRoom(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    const singUp = (e) =>{
      e.preventDefault()
      props.history.push({pathname:'/chat/',data:{username:username,room:room}})

    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <h1>Join in Room</h1>
                <form autoComplete="off" onSubmit={singUp}>
                <TextField 
                    size="small"
                    style={{width:"80%"}} 
                    name="username" 
                    variant="outlined"
                    label="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
        <FormControl 
                style={{
                width:"80%",
                margin:"10px 0"
            }}
            size="small"
            variant="outlined"
        >
        <InputLabel id="demo-simple-select-label">Room Name</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={room}
          onChange={handleChange}
          variant="outlined"
          input={<Input/>}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"js"}>Js</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
        </Select>
        </FormControl>
        <Button
          type="submit"
          style={{
            backgroundColor:"#37a000",
            width:"80%",
            color:"#fff"
          }}
          variant="outlined"
          >
            Continue
          </Button>
          </form>
      </Paper>
        </div>
    )
}
