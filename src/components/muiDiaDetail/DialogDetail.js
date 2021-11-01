import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './style.css';



  export default function DialogDetail({setActive,contract,setValueContract,author}) {
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
      setActive(false)
      console.log(contract);
      getNextNumberContract();
    };


    const getNextNumberContract = async ()=>{
        const newData = await fetch('/allBooks',{
            method: "POST",
            headers:{
              'content-type': 'application/json',
              'Accept' : 'application/json'
            },
            body: JSON.stringify({
                bd:'Контракт',
                where:'',
                from:''
            })
          })
          .then(function(response) {
            response.json().then(function(text) { 
                setValueContract(prevState =>({
                    ...prevState,
                    ['contractNumber']:text[text.length-1]['Номер контракта'] + 1
                  }));
                });
            });
        }


  
    const handleClose = () => {
      setOpen(false);
    };

    const  setInputContract = (e)=>{
        const {name} = e.target;
        let tValue=e.target.value;
        setValueContract(prevState =>({
        ...prevState,
        [name]:tValue
      }));

      console.log(contract)
    
      }

    const createContract =  async ()=>{
        const newData = await fetch('/createContract',{
            method: "POST",
            headers:{
              'content-type': 'application/json',
              'Accept' : 'application/json'
            },
            body: JSON.stringify({
              ...contract
            })
          })
    }


    const createAuthor =  async ()=>{
        const newData = await fetch('/create',{
            method: "POST",
            headers:{
              'content-type': 'application/json',
              'Accept' : 'application/json'
            },
            body: JSON.stringify({
              ...author
            })
          })
    }





  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Заключить Контракт
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Детали контракта</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Введите срок на который заключается контракт
            </DialogContentText>
            <TextField
              autoFocus
              name="term"
              id="years"
              onChange={setInputContract}
              label="Количество лет"
              fullWidth
              variant="standard"
            />
              <br/>
            <br/>
            <br/>
            <DialogContentText>
             Введите предполагаемый тираж
            </DialogContentText>
            <TextField
              autoFocus
              name = "circulation"
              margin="dense"
              id="count"
              onChange={setInputContract}
              label="Количество книг"
              fullWidth
              variant="standard"
            />
              <br/>
            <br/>
            <br/>
            <DialogContentText>
             Введите гонорар автора
            </DialogContentText>
            <TextField
              name = "fee"
              onChange={setInputContract}
              autoFocus
              margin="dense"
              id="gonorar"
              label="Гонорар"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button  color="error" onClick={handleClose}>Отменить</Button>
            <Button  onClick={
                
                     ()=>{
                        console.log(contract);
                        debugger
                        createAuthor();
                        createContract();     
                        }

                
                }>Отправить на разработку</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

//   async ()=>{
//     const newData = await fetch('/allBooks',{
//         method: "POST",
//         headers:{
//           'content-type': 'application/json',
//           'Accept' : 'application/json'
//         },
//         body: JSON.stringify({
//             bd:'Контракт',
//             where:'',
//             from:''
//         })
//       })
//       .then(function(response) {
//         response.json().then(function(text) { 
//             setValueContract(prevState =>({
//                 ...prevState,
//                 ['contractNumber']:text[text.length-1]['Номер контракта'] + 1
//               }));
//             });
//         });
//     }