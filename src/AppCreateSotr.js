import './App.css';
import React, {useState,useEffect} from 'react';
import Table from './components/table/Table'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AppCreateSotr() {




  // if(props.type=='sotr'){
  //   var dataBook = props.data;
  //   var lastId = (dataBook[dataBook.length-1].ID_Сотрудника)+1;
  // }

  // const [sotr, setValueSotr] = useState({Id_sotr:`${lastId}`, 
  // FIO:'', Gender:'', post:'',salary:'', Phone:''});


  // ${props.Id_sotr}

  const [sotr, setSotr] = useState({Id_sotr:``, FIO:'', Gender:'',
  post:'', salary:'', Phone:''});

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [data, setData] = React.useState('100');


  // React.useEffect(()=>{

  
  // })
  

    const posts = ['Издатель','Редактор','Дизайнер','PR-Менеджер']
    const gender = ['М','Ж']


  const  setInput= (e)=>{
    
    const {name} = e.target;
    let tValue=e.target.value;
    setSotr(prevState =>({
    ...prevState,
    [name]:tValue,
    Id_sotr:data
  }));
  if(tValue.length>0){

  if(
    name == 'FIO'||
    name == 'genre'
  ){
    if(tValue[tValue.length-1]=='0'||tValue[tValue.length-1]=='1'||
    tValue[tValue.length-1]=='2'||tValue[tValue.length-1]=='3'||
    tValue[tValue.length-1]=='4'||tValue[tValue.length-1]=='5'||
    tValue[tValue.length-1]=='6'||tValue[tValue.length-1]=='7'||
    tValue[tValue.length-1]=='8'||tValue[tValue.length-1]=='9')
    {
        alert('Ошибка! Введите строку')
        e.target.value=''

    }
  }
if(name == 'salary'||name == 'Phone'){
    debugger
    if(!Number.isInteger(parseInt(tValue[tValue.length-1])))
    {
        alert('Ошибка! Введите число')
        e.target.value=''

    }
}
  }
  console.log(sotr);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen(false);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen(true);
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen2(false);
    setOpen3(true);

  };

  const handleClose3 = () => {
    setOpen3(false);
    setOpen2(true);

  };

  return (
    <div>
    <ui5-toast placement="TopCenter" id="stringCheck">Ошибка! Введите строку</ui5-toast>
      <ui5-toast placement="TopCenter"  id="intCheck"> Ошибка! Введите число</ui5-toast>
      <Dialog open={true} >
        <DialogTitle>Добавление нового сотрудника</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите ФИО нового сотрудника
          </DialogContentText>
          <TextField
            onChange={setInput}
            autoFocus
            margin="dense"
            name="FIO"
            label="ФИО"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={setInput}
            select
            autoFocus
            margin="dense"
            name="Gender"
            label="Пол"
            variant="standard"
          >
              {gender.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
            </TextField>
        </DialogContent>
        <DialogActions>
         <a href='home'> <Button>Выход</Button> </a>
          <Button onClick={()=>{
            handleClickOpen();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавление нового сотрудника</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите должность нового сотрудника
          </DialogContentText>
          <TextField
            select
            onChange={setInput}
            autoFocus
            margin="dense"
            name = 'post'
          
            label="Должность"
            fullWidth
            variant="standard"
          >
            {posts.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Назад</Button>
          <Button onClick={()=>{
            handleClickOpen2();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Добавление нового сотрудника</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите телефон нового сотрудника
          </DialogContentText>
          <TextField
            onChange={setInput}
            autoFocus
            margin="dense"
            name = 'Phone'
            label="Номер телефона"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Назад</Button>
          <Button onClick={async ()=>{
                const newData = await fetch(`/allBooks`,{
                  method: "POST",
                  headers:{
                    'content-type': 'application/json',
                    'Accept' : 'application/json'
                  },
                  body: JSON.stringify({
                    bd: 'Сотрудник',
                    where: '',
                    from: ``
                  })
                })
                .then((response)=>{
                  response.json().then((text)=>{  
                        setData(text[text.length-1].ID_Сотрудника+1);
                  })
                });
            handleClickOpen3();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>



      <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle>Добавление нового сотрудника</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите зарплпату нового сотрудника
          </DialogContentText>
          <TextField
          onChange={setInput}
            autoFocus
            margin="dense"
            name='salary'
            label="Зарплпата"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Назад</Button>
          <a href='viewSotr'><Button onClick={async ()=>{
            debugger
             const newData = await fetch('/createSotr',{
              method: "POST",
              headers:{
                'content-type': 'application/json',
                'Accept' : 'application/json'
              },
              body: JSON.stringify({
                ...sotr
              })
            })
            .then(res=> res);
          }}>Продолжить</Button></a>
        </DialogActions>
      </Dialog>
    </div>
  );
}