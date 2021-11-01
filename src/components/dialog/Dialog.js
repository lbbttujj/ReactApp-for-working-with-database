import React, { Component,useLayoutEffect,useState } from 'react';
import './style.css';
import { CustomDialog, useDialog } from 'react-st-modal';



 const CustomDialogContent =  (props)=> {
    // use this hook to control the dialog

    if(props.type=='books'){
      var dataBook = props.data;
      var lastId = (dataBook[dataBook.length-1].ID_Книги)+1;
    }
    if(props.type=='client'){
      var dataBook = props.data;
      var lastId = (dataBook[dataBook.length-1].ID_Клиента)+1;
    }
    if(props.type=='sotr'){
      var dataBook = props.data;
      var lastId = (dataBook[dataBook.length-1].ID_Сотрудника)+1;
    }
    debugger
    const dialog = useDialog();
    const [author1, setValue] = useState({FIO:'', Born:'', Phone:'',Gender:'',Email:''});
    const [book, setValueBook] = useState({booksID:`${lastId}`, Name:'', Count:'', State:'', price:'', contractNumber:""});
    const [client, setValueClient] = useState({Id_client:`${lastId}`, FIO:'', Gender:'', Born:'', Phone:''});
    const [sotr, setValueSotr] = useState({Id_sotr:`${lastId}`, FIO:'', Gender:'', post:'',salary:'', Phone:''});
    const [contract, setValueContract] = useState({contractNumber:``,
     Name:'', circulation:'',term:'', СonclusionDate:'', fee:'',Id_Sotr:'',
     StatusAppl:'', CountBooks:'',genre:""});
  

    const text = ()=>{
      console.log('done');
    }
    
  const  setInput1 = (e)=>{
    
    const {name, value1} = e.target;
    let tValue=e.target.value;
    console.log(value1);
    /*if (name === "EmployeeId") {
      setAuthor(prevState =>({
        ...prevState,
        [name]:parseInt(value)
      }))
    }*/
    setValue(prevState =>({
    ...prevState,
    [name]:tValue
  }));
  console.log(author1);

  }
  const  setInputBook = (e)=>{
  
    const {name, value1} = e.target;
  
    let tValue=e.target.value;
    setValueBook(prevState =>({
    ...prevState,
    [name]:tValue
  }));
  console.log(book);

  }
  const  setInputContract = (e)=>{
  
    const {name} = e.target;
  
    let tValue=e.target.value;
    setValueContract(prevState =>({
    ...prevState,
    [name]:tValue
  }));
  console.log(contract);

  }
  const  setInputClient = (e)=>{
  
    const {name} = e.target;
  
    let tValue=e.target.value;
    setValueClient(prevState =>({
    ...prevState,
    [name]:tValue
  }));
  console.log(client);

  }
  const  setInputSotr = (e)=>{
  
    const {name} = e.target;
  
    let tValue=e.target.value;
    setValueSotr(prevState =>({
    ...prevState,
    [name]:tValue
  }));
  console.log(sotr);

  }

  
    
  if(props.type == 'books'){
    return (
      <div className='dialog'>
         <input name="Name" placeholder="Название Книги" onChange={setInputBook}></input>
        <input name="Count" placeholder="Количество" onChange={setInputBook}></input>
        <input name="State" placeholder="Состояяние" onChange={setInputBook}></input>
        <input name="price" placeholder="Цена" onChange={setInputBook}></input>
        {/* <input name="booksID" placeholder="resКниги" onChange={setInputBook}></input> */}
        <input name="contractNumber" placeholder="Номет контракта" onChange={setInputBook}></input>
        <div className='DialogButtons'>
        <button
          onClick={ async()=>{
           
            const newData = await fetch('/createBook',{
              method: "POST",
              headers:{
                'content-type': 'application/json',
                'Accept' : 'application/json'
              },
              body: JSON.stringify({
                ...book
              })
            })
            .then(res=>res);
            props.rebindTable();
            console.log(book);
            dialog.close(book)
        }}
        >
           Добавить    
        </button>

        </div>
      </div>
    );
  }
  else if(props.type == 'contract')
  {

    return (
      <div className='dialog'>
         <input name="contractNumber" placeholder="Номер Контракта" onChange={setInputContract}></input>
        <input name="Name" placeholder="Имя Автора" onChange={setInputContract}></input>
        <input name="circulation" placeholder="Тираж" onChange={setInputContract}></input>
        <input name="term" placeholder="Срок" onChange={setInputContract}></input>
        <input name="СonclusionDate" placeholder="Дата Заключения" onChange={setInputContract}></input>
        <input name="fee" placeholder="Гонорар" onChange={setInputContract}></input>
        <input name="IdSotr" placeholder="ID_Сотрудника" onChange={setInputContract}></input>
        <input name="StatusAppl" placeholder="Статус Заявки" onChange={setInputContract}></input>
        <input name="CountBooks" placeholder="Количество Книг" onChange={setInputContract}></input>
        <input name="genre" placeholder="Жанр" onChange={setInputContract}></input>
        <div className='DialogButtons'>
        <button
          onClick={ async()=>{
           
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
            .then(res=> res);
            props.rebindTable();
            console.log(contract);
            dialog.close(contract)
        }}
        >
           Добавить    
        </button>

        </div>
      </div>
    );

  }
  else if(props.type == 'client')
  {

    return (
      <div className='dialog'>
         {/* <input name="resclient" placeholder="resКлиента" onChange={setInputClient}></input> */}
        <input name="FIO" placeholder="ФИО" onChange={setInputClient}></input>
        <input name="Gender" placeholder="Пол" onChange={setInputClient}></input>
        <input name="Born" placeholder="Дата Рождения" onChange={setInputClient}></input>
        <input name="Phone" placeholder="Номер Телефона" onChange={setInputClient}></input>

        <div className='DialogButtons'>
        <button
          onClick={ async()=>{
           
            const newData = await fetch('/createClient',{
              method: "POST",
              headers:{
                'content-type': 'application/json',
                'Accept' : 'application/json'
              },
              body: JSON.stringify({
                ...client
              })
            })
            .then(res=> res);
            props.rebindTable();
            dialog.close(client)
        }}
        >
           Добавить    
        </button>

        </div>
      </div>
    );

  }
  else if(props.type == 'sotr')
  {

    return (
      <div className='dialog'>
         {/* <input name="ressotr" placeholder="resСотрудника" onChange={setInputSotr}></input> */}
        <input name="FIO" placeholder="ФИО" onChange={setInputSotr}></input>
        <input name="Gender" placeholder="Пол" onChange={setInputSotr}></input>
        <input name="post" placeholder="Должность" onChange={setInputSotr}></input>
        <input name="salary" placeholder="Зарплата" onChange={setInputSotr}></input>
        <input name="Phone" placeholder="Номер Телефона" onChange={setInputSotr}></input>

        <div className='DialogButtons'>
        <button
          onClick={ async()=>{
           
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
            props.rebindTable();
            dialog.close(sotr)
        }}
        >
           Добавить    
        </button>

        </div>
      </div>
    );

  }
  else{
    return (
      <div className='dialog'>
         <input name="FIO" placeholder="ФИО" onChange={setInput1}></input>
        <input name="Born" placeholder="Дата рождения" onChange={setInput1}></input>
        <input name="Phone" placeholder="Номер телефона" onChange={setInput1}></input>
        <input name="Gender" placeholder="Пол" onChange={setInput1}></input>
        <input name="Email" placeholder="Email" onChange={setInput1}></input>
        <div className='DialogButtons'>
        <button
          onClick={ async()=>{

            const newData = await fetch('/create',{
              method: "POST",
              headers:{
                'content-type': 'application/json',
                'Accept' : 'application/json'
              },
              body: JSON.stringify({
                ...author1
              })
            })
            .then(res=> res);
            props.rebindTable();
            // console.log(array);
            // setArrayReturnedData(array)
            dialog.close(author1)
            // rebindTable();
        }
          }
        >
           Добавить
          
        </button>

        {/* <button id='closeDialog'
          onClick={ () => {// Сlose the dialog and return the value
            dialog.close(author1);}}
        >
             Закрыть
        </button> */}
        </div>
      </div>
    );
  }
  }
 
class Dialog extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const {rebindTable, type,data }=this.props;
    return (
      <>
     <button    onClick={async () => {
       if(type == "books"){
        const result = await CustomDialog(
          <CustomDialogContent
          rebindTable={rebindTable}
          type={type}
          data ={data}
          />,
          {
            title: 'Добавить Книгу',
            className: 'mainDialog',
            showCloseIcon: true,
          }
        );
       }
       else if(type == "contract"){
        const result = await CustomDialog(
          <CustomDialogContent
          rebindTable={rebindTable}
          type={type}
          />,
          {
            title: 'Добавить контракт',
            className: 'mainDialog',
            showCloseIcon: true,
          }
        );
       }
       else if(type == "client"){
        const result = await CustomDialog(
          <CustomDialogContent
          rebindTable={rebindTable}
          type={type}
          data ={data}
          />,
          {
            title: 'Добавить Клиента',
            className: 'mainDialog',
            showCloseIcon: true,
          }
        );
       }
       else if(type == "sotr"){
        const result = await CustomDialog(
          <CustomDialogContent
          rebindTable={rebindTable}
          type={type}
          data ={data}

          />,
          {
            title: 'Добавить Сотрудника',
            className: 'mainDialog',
            showCloseIcon: true,
          }
        );
       }
       else {
          const result = await CustomDialog(
            <CustomDialogContent
            rebindTable={rebindTable}
            type={type}
            />,
            {
              title: 'Добавить автора',
              className: 'mainDialog',
              showCloseIcon: true,
            }
          );
       }
        }}
      >
        Добавить</button>
      </>

    );
  }
}
 
export default Dialog;