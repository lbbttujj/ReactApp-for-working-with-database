import React, {useContext, useState} from 'react';
import { Route } from 'react-router-dom';
import MuiTable from '../../components/muiTable/Muitable'
import Button from '@mui/material/Button';
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/Bar.js";

import Resume from '../../img/resume.png'
import booksWork from '../../img/booksWork.png'
import allBooks from '../../img/allBooks.png'
import contract from '../../img/contract.png'
import author from '../../img/author.png'
import sotr from '../../img/sotr.png'
import newsotr from '../../img/newsotr.png'
import client from '../../img/client.png'
import createAppl from '../../img/createAppl.png'


import { AuthContext } from '../../context';


import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/CardHeader.js";
import '@ui5/webcomponents-icons/dist/line-chart.js';
import { Card, CardHeader, Text,Icon  } from "@ui5/webcomponents-react";



const getCount = async (setCountWorkBookCard,bd,where,from)=>{
    const newData = await fetch(`/allBooks`,{
        method: "POST",
        headers:{
          'content-type': 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({
          bd: bd,
          where:where,
          from: from
        })
      })
      .then(function(response) {
        response.json().then(function(text) { 
            debugger
         setCountWorkBookCard(text.length)     
            });
        });
}
const getCountAppl = async (setCountApplCard,bd,where,from)=>{
    const newData = await fetch(`/allBooks`,{
        method: "POST",
        headers:{
          'content-type': 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({
          bd: bd,
          where:where,
          from: from
        })
      })
      .then(function(response) {
        response.json().then(function(text) { 
            debugger
            setCountApplCard(text.length)     
            });
        });
}

let counter =0

  export default function CustomizedTables() {

    const {activeAuth, setActiveAuth} = useContext(AuthContext)

  console.log(`active : ${activeAuth}`);

    const [active, setActive] = React.useState(false);
    // const [countApplCard, setCountApplCard] = React.useState(7);
    const [countWorkBookCard, setCountWorkBookCard] = React.useState(0);
    const [countApplCard, setCountApplCard] = React.useState(0);
    const [countAllBookCard, setCountAllBookCard] = React.useState(0);

    if(counter ==0){
        counter++;
        getCount(setCountWorkBookCard,'Книги','WHERE Состояние',`= 'В Производстве'`);
        getCount(setCountApplCard,'Заявки','',``);
        getCount(setCountAllBookCard,'Книги','','');
    }

    if(localStorage.auth=='true'){

      if(localStorage.role=='lbbttujj'){
        return (
          <>
           
          <div className='UICards' style={{ marginTop: "40px",  display:'flex' }}>
              
                  <a href='/viewApplication'> 
                      <Card
                           header={<CardHeader titleText="Просмотреть заявки" 
                           avatar={<img src={Resume} alt="Resume" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Количество заявок: <h2>{countApplCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/viewBooksInWork2'> 
                      <Card
                           header={<CardHeader titleText="Книги в работе" 
                           avatar={<img src={booksWork} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Книг в работе <h2>{countWorkBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/viewAllBook'> 
                      <Card
                           header={<CardHeader titleText="Все Книги" 
                           avatar={<img src={allBooks} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Всего книг <h2>{countAllBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
  
                  <a href='/viewContracts'> 
                      <Card
                           header={<CardHeader titleText="Изменить условия контрактов" 
                           avatar={<img src={contract} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/viewAuthors'> 
                      <Card
                           header={<CardHeader titleText="Изменить конк.инф. авторов" 
                           avatar={<img src={author} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/viewSotr' style={{position:'relative',right:'1450px', top:'260px'}}> 
                      <Card
                           header={<CardHeader titleText="Изменить сведения о сотрудниках" 
                           avatar={<img src={sotr} alt="booksWork" />}
                           /> }
                           style={{ width: "280px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/createSotr' style={{position:'relative',right:'1450px', top:'260px'}}> 
                      <Card
                           header={<CardHeader titleText="Добавить нового сотрудника" 
                           avatar={<img src={newsotr} alt="booksWork" />}
                           /> }
                           style={{ width: "280px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
  
                  <a href='/viewClient' style={{position:'relative',right:'1450px', top:'260px'}}> 
                      <Card
                           header={<CardHeader titleText="Получить информацию о клиентах и их покупках" 
                           avatar={<img src={client} alt="booksWork" />}
                           /> }
                           style={{ width: "300px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>

                  <a href='/createAppl' style={{position:'relative',right:'1450px', top:'260px'}}> 
                      <Card
                           header={<CardHeader titleText="Создать заявку вручную" 
                           avatar={<img src={createAppl} alt="booksWork" />}
                           /> }
                           style={{ width: "300px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
          </div>
         
          </>
      );
      }
      else if(localStorage.role=='isdat1'){
    return (
        <>
         
        <div className='UICards' style={{ marginTop: "40px",  display:'flex' }}>
            
                <a href='/viewApplication'> 
                    <Card
                         header={<CardHeader titleText="Просмотреть заявки" 
                         avatar={<img src={Resume} alt="Resume" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    <Text>Количество заявок: <h2>{countApplCard}</h2> </Text>
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

                <a href='/viewBooksInWork2'> 
                    <Card
                         header={<CardHeader titleText="Книги в работе" 
                         avatar={<img src={booksWork} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    <Text>Книг в работе <h2>{countWorkBookCard}</h2> </Text>
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

                <a href='/viewAllBook'> 
                    <Card
                         header={<CardHeader titleText="Все Книги" 
                         avatar={<img src={allBooks} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    <Text>Всего книг <h2>{countAllBookCard}</h2> </Text>
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>


                <a href='/viewContracts'> 
                    <Card
                         header={<CardHeader titleText="Изменить условия контрактов" 
                         avatar={<img src={contract} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

                <a href='/viewAuthors'> 
                    <Card
                         header={<CardHeader titleText="Изменить конк.инф. авторов" 
                         avatar={<img src={author} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

        </div>
       
        </>
    );
      }
      else if(localStorage.role=='isdat2'){
    return (
        <>
         
        <div className='UICards' style={{ marginTop: "40px",  display:'flex' }}>
            
                <a href='/viewApplication'> 
                    <Card
                         header={<CardHeader titleText="Просмотреть заявки" 
                         avatar={<img src={Resume} alt="Resume" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    <Text>Количество заявок: <h2>{countApplCard}</h2> </Text>
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

                <a href='/viewBooksInWork2'> 
                    <Card
                         header={<CardHeader titleText="Книги в работе" 
                         avatar={<img src={booksWork} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    <Text>Книг в работе <h2>{countWorkBookCard}</h2> </Text>
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

                <a href='/viewAllBook'> 
                    <Card
                         header={<CardHeader titleText="Все Книги" 
                         avatar={<img src={allBooks} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    <Text>Всего книг <h2>{countAllBookCard}</h2> </Text>
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>


                <a href='/viewContracts'> 
                    <Card
                         header={<CardHeader titleText="Изменить условия контрактов" 
                         avatar={<img src={contract} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

                <a href='/viewAuthors'> 
                    <Card
                         header={<CardHeader titleText="Изменить конк.инф. авторов" 
                         avatar={<img src={author} alt="booksWork" />}
                         /> }
                         style={{ width: "250px", height:'200px',
                                 marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                     
                    {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                    <br/>
                    <br></br>
                    <Text>Нажмите чтобы просмотреть </Text>
                 </Card></a>

        </div>
       
        </>
    );
      }
      else if(localStorage.role=='redact'){
        return (
          <>
           
          <div className='UICards' style={{ marginTop: "40px",  display:'flex' }}>
              
                 
  
                  <a href='/viewBooksInWork2'> 
                      <Card
                           header={<CardHeader titleText="Книги в работе" 
                           avatar={<img src={booksWork} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Книг в работе <h2>{countWorkBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/viewAllBook'> 
                      <Card
                           header={<CardHeader titleText="Все Книги" 
                           avatar={<img src={allBooks} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Всего книг <h2>{countAllBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
  
            
          </div>
         
          </>
      );
      }
      else if(localStorage.role=='design') {
        return (
          <>
           
          <div className='UICards' style={{ marginTop: "40px",  display:'flex' }}>
              
                 
  
                  <a href='/viewBooksInWork2'> 
                      <Card
                           header={<CardHeader titleText="Книги в работе" 
                           avatar={<img src={booksWork} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Книг в работе <h2>{countWorkBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/viewAllBook'> 
                      <Card
                           header={<CardHeader titleText="Все Книги" 
                           avatar={<img src={allBooks} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Всего книг <h2>{countAllBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
  
            
          </div>
         
          </>
      );
      }
      else if (localStorage.role=='prmanager'){
        return (
          <>
           
          <div className='UICards' style={{ marginTop: "40px",  display:'flex' }}>
              
                 
  
                  <a href='/viewBooksInWork2'> 
                      <Card
                           header={<CardHeader titleText="Книги в работе" 
                           avatar={<img src={booksWork} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Книг в работе <h2>{countWorkBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
                  <a href='/viewAllBook'> 
                      <Card
                           header={<CardHeader titleText="Все Книги" 
                           avatar={<img src={allBooks} alt="booksWork" />}
                           /> }
                           style={{ width: "250px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      <Text>Всего книг <h2>{countAllBookCard}</h2> </Text>
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
  
                  <a href='/viewClient' style={{position:'absolute',right:'572px', top:'86px'}}> 
                      <Card
                           header={<CardHeader titleText="Получить информацию о клиентах и их покупках" 
                           avatar={<img src={client} alt="booksWork" />}
                           /> }
                           style={{ width: "300px", height:'200px',
                                   marginLeft:'40px', display:'flex', flexDirection:'column'}}>
                                       
                      {/* <Text>Всего контрактов <h2>100</h2> </Text> */}
                      <br/>
                      <br></br>
                      <Text>Нажмите чтобы просмотреть </Text>
                   </Card></a>
  
          </div>
         
          </>
      );
      }
      else {
        <>
        <h1>У вас пока нет доступа</h1>
        </>
      }
    }
    else{
      return(
        <>
        <h1>У вас нет доступа</h1>
        </>
      )
    }
  }