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

  const [appl, setAppl] = useState({FIO:'',
  genre:'', countBooks:'', numAppl:'', date:'2021-10-19',
   nameBook:'', descrip:'',link:'',numBook:''
});

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [data, setData] = React.useState('100');
  const [numBook, setNumBook] = React.useState('100');
  const [count, setCount] = React.useState(1);


  // React.useEffect(()=>{

  
  // })
  

    const posts = ['Издатель','Редактор','Дизайнер','PR-Менеджер']
    const gender = ['М','Ж']


  const  setInput= (e)=>{
    
    const {name} = e.target;
    let tValue=e.target.value;
    setAppl(prevState =>({
    ...prevState,
    [name]:tValue,
    numAppl:data,
    numBook:numBook
  }));

  if(tValue.length>0){

  if(name == 'FIO'||name == 'genre'){
      if(tValue[tValue.length-1]=='0'||tValue[tValue.length-1]=='1'||
      tValue[tValue.length-1]=='2'||tValue[tValue.length-1]=='3'||
      tValue[tValue.length-1]=='4'||tValue[tValue.length-1]=='5'||
      tValue[tValue.length-1]=='6'||tValue[tValue.length-1]=='7'||
      tValue[tValue.length-1]=='8'||tValue[tValue.length-1]=='9')
      {
          alert('Ошибка! Введите строку')
          e.target.value=''
          // var stringCheck = document.getElementById('stringCheck');
          // stringCheck.show();
      }
    }
  if(name == 'countBooks'){
      debugger
      if(tValue[0]=='0'){
        alert('Ошибка! Число не может начинаться с нуля')
        e.target.value=''
      }
      if(parseInt(tValue)>2){
        alert('Ошибка! В данной режиме можно добавить не больше 2 книг за раз')
        e.target.value=''
      }
      if(!Number.isInteger(parseInt(tValue[tValue.length-1])))
      {
          alert('Ошибка! Введите число')
          e.target.value=''

          // var intCheck = document.getElementById('intCheck');
          // intCheck.show();
      }
  }
}
  console.log(appl);
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
  const handleClickOpen4 = () => {
    setOpen3(false);
    setOpen4(true);

  };

  const handleClose4 = () => {
    setOpen4(false);
    setOpen3(true);

  };
  const handleClickOpen5 = () => {
    setOpen4(false);
    setOpen5(true);

  };

  const handleClose5 = () => {
    setOpen5(false);
    setOpen4(true);

  };

  return (
    <div>
     <ui5-toast placement="TopCenter" id="stringCheck">Ошибка! Введите строку</ui5-toast>
      <ui5-toast placement="TopCenter"  id="intCheck"> Ошибка! Введите число</ui5-toast>
      <Dialog open={true} >
        <DialogTitle>Добавление заявки</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите ваше ФИО
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
          
        </DialogContent>
        <DialogActions>
         <a href='home'> <Button>Выход</Button> </a>
          <Button onClick={()=>{
            handleClickOpen();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавление заявки</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите жанр в котором написаны ваши книги
          </DialogContentText>
          <TextField
            onChange={setInput}
            autoFocus
            margin="dense"
            name = 'genre'
            label="Жанр"
            fullWidth
            variant="standard"
          > 
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Назад</Button>
          <Button onClick={async()=>{



const newData = await fetch(`/allBooks`,{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      bd: 'Заявки',
      where: '',
      from: ``
    })
  })
  .then((response)=>{
    response.json().then((text)=>{  
          setData(text[text.length-1]['Номер Заявки']+1);
    })
  });
   const newDat2 = await fetch(`/allBooks`,{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      bd: 'Заявки_Книги',
      where: '',
      from: ``
    })
  })
  .then((response)=>{
    response.json().then((text)=>{  
          setNumBook(text[text.length-1]['Номер Книги']+1);
    })
  });
            handleClickOpen2();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Добавление заявки</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите количество книг
          </DialogContentText>
          <TextField
            onChange={setInput}
            autoFocus
            margin="dense"
            name = 'countBooks'
            label="Количество Книг"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Назад</Button>
          <Button onClick={async ()=>{
              debugger
            



              const newData = await fetch(`/createAppl`,{
                method: "POST",
                headers:{
                  'content-type': 'application/json',
                  'Accept' : 'application/json'
                },
                body: JSON.stringify({
                    numAppl:appl.numAppl,
                    FIO:appl.FIO,
                    date:appl.date,
                    countBooks:appl.countBooks,
                    genre:appl.genre
            
                })
              })
              .then((response)=>{
              });
            
               
            handleClickOpen3();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>



      <Dialog open={open3} onClose={handleClose3}>
        <DialogTitle>Добавление Книг</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите название книги
          </DialogContentText>
          <TextField
          onChange={setInput}
            autoFocus
            margin="dense"
            name='nameBook'
            label="Название книги"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Назад</Button>
          <Button onClick={async ()=>{

            handleClickOpen4();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open4} onClose={handleClose4}>
        <DialogTitle>Добавление Книг</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите краткое описание книги
          </DialogContentText>
          <TextField
          onChange={setInput}
            autoFocus
            margin="dense"
            name='descrip'
            label="Описание книги"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose4}>Назад</Button>
          <Button onClick={()=>{
            handleClickOpen5();
          }}>Продолжить</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open5} onClose={handleClose5}>
        <DialogTitle>Добавление Книг</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Введите сслыку на книгу
          </DialogContentText>
          <TextField
          onChange={setInput}
            autoFocus
            margin="dense"
            name='link'
            label="Ссылка на книгу"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose5}>Назад</Button>
         <Button onClick={async ()=>{
             setCount(parseInt(appl.countBooks))
            if(parseInt(appl.countBooks)==1){
                debugger
                const newData2 = await fetch(`/createApplBook`,{
                    method: "POST",
                    headers:{
                        'content-type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    body: JSON.stringify({
                        numBook:appl.numBook+1,
                        numAppl:appl.numAppl,
                        nameBook:appl.nameBook,
                        descrip:appl.descrip,
                        link:appl.link
                        
                    })
                })
                .then((response)=>{
                    debugger
                    window.location.assign('http://localhost:3000/viewApplication')
                });
            }
            else{
                debugger
                handleClickOpen3();
                const newData1 = await fetch(`/createApplBook`,{
                    method: "POST",
                    headers:{
                      'content-type': 'application/json',
                      'Accept' : 'application/json'
                    },
                    body: JSON.stringify({
                        numBook:appl.numBook,
                        numAppl:appl.numAppl,
                        nameBook:appl.nameBook,
                        descrip:appl.descrip,
                        link:appl.link
                
                    })
                  })
                  .then((response)=>{
                  });
                appl.countBooks=appl.countBooks-1;
            }
            
    
  }}>Продолжить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


{/* <a href='viewApplication'><Button onClick={async ()=>{
    debugger
    
  }}>Продолжить</Button></a> */}