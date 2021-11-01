import './App.css';
import React, {useState} from 'react';
import Table from './components/table/Table'
import TableBook from './components/tableBook/TabelBook'
import TableContract from './components/table/TableContract'
import TableClient from './components/table/TableClient'
import TableSotr from './components/table/TableSotr'


const TabContent = ({ title, content }) => (
  <div className="tabcontent">
    <h3>{title}</h3>
    <div>{content}</div>
  </div>
);

function Tabs({ items }) {
  const [ active, setActive ] = React.useState(null);

  const openTab = e => setActive(+e.target.dataset.index);

  return (
    <div>
      <div className="tab">
        {items.map((n, i) => (
          <button
            className={`tablinks ${i === active ? 'active' : ''}`}
            onClick={openTab}
            data-index={i}
          >{n.title}</button>
        ))}
      </div>
      {items[active] && <TabContent {...items[active]} />}
    </div>
  );
}



 
function App() {

   const [author, setAuthor] = useState({FIO:'', Born:'', Phone:'',Gender:'',Email:''});
   const [book, setBook] = useState({booksID:'', Name:'', Count:'', State:'', price:'', contractNumber:""});
   const [contract, setContract] = useState(
     {contractNumber:'',Name:'',
      circulation:'', term:'', 
      СonclusionDate:'', fee:"", Id_Sotr:"",
      StatusAppl:'', CountBooks:"", genre:""
      });
   const [client, setClient] = useState(
     {Id_client:'',FIO:'',  Gender:'', Born:'', Phone:''
      });
   const [sotr, setSotr] = useState(
     {Id_sotr:'',FIO:'',  Gender:'', post:'', salary:'', Phone:''
      });
  const [arrayreturnedData, setArrayReturnedData] = useState([{FIO:'', Born:'', Phone:'',Gender:'',Email:''}]);
  const [arrayreturnedDataBook, setArrayReturnedDataBook] =  useState();
  const [arrayreturnedDataContract, setArrayReturnedDataContract] =  useState();
  const [arrayreturnedDataClient, setArrayReturnedDataClient] =  useState();
  const [arrayreturnedDataSotr, setArrayReturnedDataSotr] =  useState();


 

  


  const  setInputAuthor = (e)=>{
    const {name, value} = e.target;
    console.log(value);
  setAuthor(prevState =>({
    ...prevState,
    [name]:value
  }));
  console.log(author);

  }
  const  setInputBook = (e)=>{
    const {name, value} = e.target; 


  setBook(prevState =>({
    ...prevState,
    [name]:value
  }));
  console.log(book);

  }
  const  setInputContract = (e)=>{


    const {name, value} = e.target; 
    setContract(prevState =>({
      ...prevState,
      [name]:value
    }));
    console.log(contract);
    
  }
  
  const setInputClient = (e)=>{
    
    
    const {name, value} = e.target; 

   
    setClient(prevState =>({
    ...prevState,
    [name]:value
  }));
  console.log(client);
  }


  const setInputSotr = (e)=>{
    const {name, value} = e.target; 
    setSotr(prevState =>({
    ...prevState,
    [name]:value
  }));
  console.log(sotr);
  }
  

  const currentSearch = async (arg,Body)=>{
      
    console.log(Body.from);
    const newData = await fetch(`/${arg}`,{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        bd: Body.bd,
        where: Body.where,
        from: Body.from
      })
    })
    .then(res=> res.json());

    switch (Body.bd) {
      case 'Книги':
        setArrayReturnedDataBook(newData)
        break;
      case 'Автор':
        let array=[];
      for(let i=0; i<newData.length;i++){
        array.push(newData[i]);
      }
      setArrayReturnedData(array)
      break;
      case 'Контракт':
        setArrayReturnedDataContract(newData)
      break;
      case 'Клиент':
        setArrayReturnedDataClient(newData)
      break;
      case 'Сотрудник':
        setArrayReturnedDataSotr(newData)
      break;
      default:
        break;
    }


  }

  const searchAllDataAuthor = async ()=> {
    let counter =0;
    for (let i in author){
      if(author[i]!=''){
          counter++
      }
    }
    if(counter==0){
      currentSearch('allBooks',{
        bd:'Автор',
        where:'',
        from:``
      })
    }
    else 
    {
      if (author['FIO']){
      currentSearch('allBooks',{
        bd:'Автор',
        where:'WHERE [ФИО Автора]',
        from:`='${author.FIO}'`
      })
  }
    if (author['Born']){
      currentSearch('allBooks',{
        bd:'Автор',
        where:'WHERE [Дата Рождения]',
        from:`='${author.Born}'`
      })
  }
    if (author['Phone']){
      currentSearch('allBooks',{
        bd:'Автор',
        where:'WHERE [Номер Телефонв]',
        from:`='${author.Phone}'`
      })
  }
    if (author['Gender']){
      currentSearch('allBooks',{
        bd:'Автор',
        where:'WHERE Пол',
        from:`='${author.Gender}'`
      })
  }
    if (author['Email']){
      currentSearch('allBooks',{
        bd:'Автор',
        where:'WHERE Email',
        from:`='${author.Email}'`
      })
  }
}
  
}
  
  
  const searchAllDataBook =  ()=> {
    let counter =0;
    for (let i in book){
      if(book[i]!=''){
          counter++
      }
    }

    if(counter==0){
      currentSearch('allBooks',{
        bd:'Книги',
        where:'',
        from:``
      })
    }
    else if (book['Name']){
      currentSearch('allBooks',{
        bd:'Книги',
        where:'WHERE [Название Книги]',
        from:`='${book.Name}'`
      })
  }
    else if (book['Count']){
      currentSearch('allBooks',{
        bd:'Книги',
        where:'WHERE Количество',
        from:`='${book.Count}'`
      })
  }
    else if (book['State']){
      currentSearch('allBooks',{
        bd:'Книги',
        where:'WHERE Состояние',
        from:`='${book.State}'`
      })
  }
    else if (book['price']){
      currentSearch('allBooks',{
        bd:'Книги',
        where:'WHERE Цена',
        from:`='${book.price}'`
      })
  }
    else if (book['contractNumber']){
      currentSearch('allBooks',{
        bd:'Книги',
        where:'WHERE [Номер Контракта]',
        from:`='${book.contractNumber}'`
      })
  }
}


const searchAllDataContract =  ()=> {

  let counter =0;
  for (let i in contract){
    if(contract[i]!=''){
        counter++
    }
  }

  if(counter==0){
    currentSearch('allBooks',{
      bd:'Контракт',
      where:'',
      from:``
    })
  }
   else if (contract['contractNumber']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE [Номер контракта]',
        from:`='${contract.contractNumber}'`
      })
  }
   else if (contract['Name']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE [Имя Автора]',
        from:`='${contract.Name}'`
      })
  }
   else if (contract['circulation']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE Тираж',
        from:`='${contract.circulation}'`
      })
  }
   else if (contract['term']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE Срок',
        from:`='${contract.term}'`
      })
  }
   else if (contract['СonclusionDate']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE [Дата Заключения]',
        from:`='${contract.СonclusionDate}'`
      })
  }
   else if (contract['fee']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE Гонорар',
        from:`='${contract.fee}'`
      })
  }
   else if (contract['Id_Sotr']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE ID_Сотрудника',
        from:`='${contract.Id_Sotr}'`
      })
  }
   else if (contract['StatusAppl']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE [Состояние Заявки]',
        from:`='${contract.StatusAppl}'`
      })
  }
   else if (contract['CountBooks']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:' WHERE [Количество книг]',
        from:`='${contract.CountBooks}'`
      })
  }
   else if (contract['genre']){
      currentSearch('allBooks',{
        bd:'Контракт',
        where:'WHERE Жанр',
        from:`='${contract.genre}'`
      })
  }

}

const searchAllDataClient =  ()=> {

  let counter =0;
  for (let i in client){
    if(client[i]!=''){
        counter++
    }
  }
  if(counter==0){
    currentSearch('allBooks',{
      bd:'Клиент',
      where:'',
      from:``
    })
  }
  else if (client['Id_client']){
    currentSearch('allBooks',{
      bd:'Клиент',
      where:'WHERE [ID_Клиента]',
      from:`='${client.Id_client}'`
    })
}
//   else if (client['Id_client']){
//     currentSearch('allBooks',{
//       bd:'Клиент',
//       where:'WHERE [ID_Клиента]',
//       from:`='${client.Id_client}'`
//     })
// }
  else if (client['FIO']){
    currentSearch('allBooks',{
      bd:'Клиент',
      where:'WHERE ФИО',
      from:`='${client.FIO}'`
    })
}
  else if (client['Gender']){
    currentSearch('allBooks',{
      bd:'Клиент',
      where:'WHERE Пол',
      from:`='${client.Gender}'`
    })
}
  else if (client['Born']){
    currentSearch('allBooks',{
      bd:'Клиент',
      where:'WHERE [Дата Рождения]',
      from:`='${client.Born}'`
    })
}
  else if (client['Phone']){
    currentSearch('allBooks',{
      bd:'Клиент',
      where:'WHERE [Номер Телефонв]',
      from:`='${client.Phone}'`
    })
}
}


const searchAllDataSotr =  ()=> {

  let counter =0;
  for (let i in sotr){
    if(sotr[i]!=''){
        counter++
    }
  }
  debugger
  if(counter==0){
    debugger
    currentSearch('allBooks',{
      bd:'Сотрудник',
      where:'',
      from:``
    })
  }
  else if (sotr['Id_sotr']){
    currentSearch('allBooks',{
      bd:'Сотрудник',
      where:'WHERE [ID_Сотрудника]',
      from:`='${sotr.Id_sotr}'`
    })
}
  else if (sotr['FIO']){
    currentSearch('allBooks',{
      bd:'Сотрудник',
      where:'WHERE ФИО',
      from:`='${sotr.FIO}'`
    })
}
  else if (sotr['Gender']){
    currentSearch('allBooks',{
      bd:'Сотрудник',
      where:'WHERE Пол',
      from:`='${sotr.Gender}'`
    })
}
  else if (sotr['post']){
    currentSearch('allBooks',{
      bd:'Сотрудник',
      where:'WHERE Должность',
      from:`='${sotr.post}'`
    })
}
  else if (sotr['salary']){
    currentSearch('allBooks',{
      bd:'Сотрудник',
      where:'WHERE Зарплата',
      from:`='${sotr.salary}'`
    })
}
  else if (sotr['Phone']){
    currentSearch('allBooks',{
      bd:'Сотрудник',
      where:'WHERE [Номер Телефона]',
      from:`='${sotr.Phone}'`
    })
}
}
  const items =
   [
    { title: 'Автор', content: 
      <div>
        <div className="App_inputs">
          <input name="FIO" placeholder="ФИО" onChange={setInputAuthor}></input>
          <input name="Born" placeholder="Дата рождения" onChange={setInputAuthor}></input>
          <input name="Phone" placeholder="Номер телефона" onChange={setInputAuthor}></input>
          <input name="Gender" placeholder="Пол" onChange={setInputAuthor}></input>
          <input name="Email" placeholder="Email" onChange={setInputAuthor}></input>
    
           <button onClick={()=> {
                searchAllDataAuthor()
              }
            }>

            Поиск</button>
        </div>

        <Table data={arrayreturnedData} rebindTable = {searchAllDataAuthor}/>
    </div>
    
    },

    { title: 'Книги', content: 
      <div>

        <div className="App_inputs">
          {/* <input name="booksID" placeholder="Id_Книги" onChange={setInputBook}></input> */}
          <input name="Name" placeholder="Название Книги" onChange={setInputBook}></input>
          <input name="Count" placeholder="Количество" onChange={setInputBook}></input>
          <input name="State" placeholder="Состояние" onChange={setInputBook}></input>
          <input name="price" placeholder="Цена" onChange={setInputBook}></input>
          <input name="contractNumber" placeholder="Номер Контракта" onChange={setInputBook}></input>
    
           <button onClick={()=>{
                searchAllDataBook()
              }
            }>
            Поиск</button>
       </div>

        <TableBook data={arrayreturnedDataBook} rebindTable = {searchAllDataBook}/>

     </div>
   },
    { title: 'Контракты', content:
    
      <div>

        <div className="App_inputs">
          <input name="contractNumber" placeholder="Номер Контракта" onChange={setInputContract}></input>
          <input name="Name" placeholder="Имя Автора" onChange={setInputContract}></input>
          <input name="circulation" placeholder="Тираж" onChange={setInputContract}></input>
          <input name="term" placeholder="Срок" onChange={setInputContract}></input>
          <input name="СonclusionDate" placeholder="Дата Заключения" onChange={setInputContract}></input>
          <input name="fee" placeholder="Гонорар" onChange={setInputContract}></input>
          <input name="Id_Sotr" placeholder="ID_Сотрудника" onChange={setInputContract}></input>
          <input name="StatusAppl" placeholder="Статус Заявки" onChange={setInputContract}></input>
          <input name="CountBooks" placeholder="Количество Книг" onChange={setInputContract}></input>
          <input name="genre" placeholder="Жанр" onChange={setInputContract}></input>
    
           <button onClick={()=>{
                searchAllDataContract()
              }
            }>
            Поиск</button>
        </div>

        <TableContract data={arrayreturnedDataContract} rebindTable = {searchAllDataContract}/>

      </div>

    },
    { title: 'Клиенты', content: 
  
    <div>

    <div className="App_inputs">
      {/* <input name="Id_client" placeholder="ID Клиента" onChange={setInputClient}></input> */}
      <input name="FIO" placeholder="ФИО" onChange={setInputClient}></input>
      <input name="Gender" placeholder="Пол" onChange={setInputClient}></input>
      <input name="Born" placeholder="Дата Рождения" onChange={setInputClient}></input>
      <input name="Phone" placeholder="Номер Телефонв" onChange={setInputClient}></input>
  
       <button onClick={()=>{
            searchAllDataClient()
          }
        }>
        Поиск</button>
    </div>

    <TableClient data={arrayreturnedDataClient} rebindTable = {searchAllDataClient}/>

  </div>
  },
    { title: 'Сотрудники', content: 

    <div>

    <div className="App_inputs">
      {/* <input name="Id_sotr" placeholder="ID Сотрудника" onChange={setInputSotr}></input> */}
      <input name="FIO" placeholder="ФИО" onChange={setInputSotr}></input>
      <input name="Gender" placeholder="Пол" onChange={setInputSotr}></input>
      <input name="post" placeholder="Должность" onChange={setInputSotr}></input>
      <input name="salary" placeholder="Зарплата" onChange={setInputSotr}></input>
      <input name="Phone" placeholder="Номер Телефона" onChange={setInputSotr}></input>
  
       <button onClick={()=>{
            searchAllDataSotr()
          }
        }>
        Поиск</button>
    </div>

    <TableSotr data={arrayreturnedDataSotr} rebindTable = {searchAllDataSotr}/>

  </div>
  }
  ];








  return (
      <div className="App">
    
        <Tabs items={items} />
    </div>
  );
}

export default App;
