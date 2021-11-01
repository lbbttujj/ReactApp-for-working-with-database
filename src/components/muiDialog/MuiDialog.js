import React from 'react';
import MuiTable from '../../components/muiTable/Muitable'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogDetail from '../muiDiaDetail/DialogDetail';
import './style.css';


function createData(name, genre, descrip, carbs) {
    return { name, genre, descrip, carbs };
  }


  




const rows = [
    createData('Странный фонарь', 'Фантастика', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, distinctio. Illum iste, numquam, deleniti minus totam odit id debitis vitae repudiandae amet officiis quae corrupti voluptates fuga, odio assumenda laborum.',
     ''),
    createData('Странные дела', 'Фантастика', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, distinctio. Illum iste, numquam, deleniti minus totam odit id debitis vitae repudiandae amet officiis quae corrupti voluptates fuga, odio assumenda laborum.',
     ''),
  ];
  
  function BasicTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 670 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название Книги</TableCell>
              <TableCell align="left">Жанр</TableCell>
              <TableCell align="left">Краткое описание</TableCell>
              <TableCell align="left">Ссылка на книгу</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.genre}</TableCell>
                <TableCell align="right">{row.descrip}</TableCell>
                <TableCell align="right"><a href='https://www.google.ru/books/edition/%D0%A1%D0%B8%D0%BD%D0%B8%D0%B9_%D1%84%D0%BE%D0%BD%D0%B0%D1%80%D1%8C/-uk_nsFqOh4C?hl=ru&gbpv=1'><Button>Посмотреть целиком</Button></a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
            }


export default function DialogApplications({active, setActive,dialogData,
    setValueContract,contract, setValueAuthor, author}) {
const hardCodeData = {
    "Петров Ф.М.":['89162967898', 'petrov34@mail.ru','М','1999-03-03'],
    "Иванов П.Р.":['89765676778', 'ivanov29@mail.ru','М','1989-04-03'],
    "Петрова Р.К.":['89765576778', 'petrov29@mail.ru','Ж','1999-05-03'],
    "Немцова Р.Р.":['89765576778', 'nemtsov31@mail.ru','Ж','1998-03-03'],
    "Иванова К.К.":['89765576778', 'nemtsov33@mail.ru','Ж','1994-02-03'],
    "Немцов О.Р.":['89765656778', 'nemtsov39@mail.ru','М','1990-03-09'],
}


let currentData=['','','',''];
for(let el in hardCodeData){
    if(el == dialogData){
        currentData=hardCodeData[el];
    }
}

debugger
if (author['FIO']!=''&& author["Phone"]==''){
    setValueAuthor(prevState =>({
        ...prevState,
    ['Phone']:currentData[0],
    ['Email']:currentData[1],
    ['Gender']:currentData[2],
    ['Born']:currentData[3]
}));
}












console.log(author);
  
    return (
            <div className={active ? 'modal active': 'modal'} onClick={()=>{setActive(false)}} >
                <div className='modal__content_appl' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{setActive(false)}} className="close_popup_appl">x</Button>
                    <h3 className="modal__title_appl">{dialogData}</h3>
                    <div className='contacts'> <b> Контакты </b>
                    <br/>
                    <div modal__contacts>Телефон: {currentData[0]}</div>
                    <div modal__email>Email: {currentData[1]}</div>
                    </div>
                    <BasicTable/>
                    <div className='modal__btns_appl'>
                    {/* <Button  variant="outlined"  >Заключить контракт</Button> */}
                    <Button  variant="outlined" color="error" onClick={()=>{setActive(false)}} >Отказать</Button>
                <DialogDetail
                setActive = {setActive}
                contract = {contract}
                setValueContract = {setValueContract}
                author = {author}
                />
                    </div>

                </div>
            </div>
    );
  
    
  }