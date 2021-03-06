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
      –°onclusionDate:'', fee:"", Id_Sotr:"",
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
      case '–ö–Ĺ–ł–≥–ł':
        setArrayReturnedDataBook(newData)
        break;
      case '–ź–≤—ā–ĺ—Ä':
        let array=[];
      for(let i=0; i<newData.length;i++){
        array.push(newData[i]);
      }
      setArrayReturnedData(array)
      break;
      case '–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā':
        setArrayReturnedDataContract(newData)
      break;
      case '–ö–Ľ–ł–Ķ–Ĺ—ā':
        setArrayReturnedDataClient(newData)
      break;
      case '–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ':
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
        bd:'–ź–≤—ā–ĺ—Ä',
        where:'',
        from:``
      })
    }
    else 
    {
      if (author['FIO']){
      currentSearch('allBooks',{
        bd:'–ź–≤—ā–ĺ—Ä',
        where:'WHERE [–§–ė–ě –ź–≤—ā–ĺ—Ä–į]',
        from:`='${author.FIO}'`
      })
  }
    if (author['Born']){
      currentSearch('allBooks',{
        bd:'–ź–≤—ā–ĺ—Ä',
        where:'WHERE [–Ē–į—ā–į –†–ĺ–∂–ī–Ķ–Ĺ–ł—Ź]',
        from:`='${author.Born}'`
      })
  }
    if (author['Phone']){
      currentSearch('allBooks',{
        bd:'–ź–≤—ā–ĺ—Ä',
        where:'WHERE [–Ě–ĺ–ľ–Ķ—Ä –Ę–Ķ–Ľ–Ķ—Ą–ĺ–Ĺ–≤]',
        from:`='${author.Phone}'`
      })
  }
    if (author['Gender']){
      currentSearch('allBooks',{
        bd:'–ź–≤—ā–ĺ—Ä',
        where:'WHERE –ü–ĺ–Ľ',
        from:`='${author.Gender}'`
      })
  }
    if (author['Email']){
      currentSearch('allBooks',{
        bd:'–ź–≤—ā–ĺ—Ä',
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
        bd:'–ö–Ĺ–ł–≥–ł',
        where:'',
        from:``
      })
    }
    else if (book['Name']){
      currentSearch('allBooks',{
        bd:'–ö–Ĺ–ł–≥–ł',
        where:'WHERE [–Ě–į–∑–≤–į–Ĺ–ł–Ķ –ö–Ĺ–ł–≥–ł]',
        from:`='${book.Name}'`
      })
  }
    else if (book['Count']){
      currentSearch('allBooks',{
        bd:'–ö–Ĺ–ł–≥–ł',
        where:'WHERE –ö–ĺ–Ľ–ł—á–Ķ—Ā—ā–≤–ĺ',
        from:`='${book.Count}'`
      })
  }
    else if (book['State']){
      currentSearch('allBooks',{
        bd:'–ö–Ĺ–ł–≥–ł',
        where:'WHERE –°–ĺ—Ā—ā–ĺ—Ź–Ĺ–ł–Ķ',
        from:`='${book.State}'`
      })
  }
    else if (book['price']){
      currentSearch('allBooks',{
        bd:'–ö–Ĺ–ł–≥–ł',
        where:'WHERE –¶–Ķ–Ĺ–į',
        from:`='${book.price}'`
      })
  }
    else if (book['contractNumber']){
      currentSearch('allBooks',{
        bd:'–ö–Ĺ–ł–≥–ł',
        where:'WHERE [–Ě–ĺ–ľ–Ķ—Ä –ö–ĺ–Ĺ—ā—Ä–į–ļ—ā–į]',
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
      bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
      where:'',
      from:``
    })
  }
   else if (contract['contractNumber']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE [–Ě–ĺ–ľ–Ķ—Ä –ļ–ĺ–Ĺ—ā—Ä–į–ļ—ā–į]',
        from:`='${contract.contractNumber}'`
      })
  }
   else if (contract['Name']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE [–ė–ľ—Ź –ź–≤—ā–ĺ—Ä–į]',
        from:`='${contract.Name}'`
      })
  }
   else if (contract['circulation']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE –Ę–ł—Ä–į–∂',
        from:`='${contract.circulation}'`
      })
  }
   else if (contract['term']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE –°—Ä–ĺ–ļ',
        from:`='${contract.term}'`
      })
  }
   else if (contract['–°onclusionDate']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE [–Ē–į—ā–į –ó–į–ļ–Ľ—é—á–Ķ–Ĺ–ł—Ź]',
        from:`='${contract.–°onclusionDate}'`
      })
  }
   else if (contract['fee']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE –ď–ĺ–Ĺ–ĺ—Ä–į—Ä',
        from:`='${contract.fee}'`
      })
  }
   else if (contract['Id_Sotr']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE ID_–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ–į',
        from:`='${contract.Id_Sotr}'`
      })
  }
   else if (contract['StatusAppl']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE [–°–ĺ—Ā—ā–ĺ—Ź–Ĺ–ł–Ķ –ó–į—Ź–≤–ļ–ł]',
        from:`='${contract.StatusAppl}'`
      })
  }
   else if (contract['CountBooks']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:' WHERE [–ö–ĺ–Ľ–ł—á–Ķ—Ā—ā–≤–ĺ –ļ–Ĺ–ł–≥]',
        from:`='${contract.CountBooks}'`
      })
  }
   else if (contract['genre']){
      currentSearch('allBooks',{
        bd:'–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā',
        where:'WHERE –Ė–į–Ĺ—Ä',
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
      bd:'–ö–Ľ–ł–Ķ–Ĺ—ā',
      where:'',
      from:``
    })
  }
  else if (client['Id_client']){
    currentSearch('allBooks',{
      bd:'–ö–Ľ–ł–Ķ–Ĺ—ā',
      where:'WHERE [ID_–ö–Ľ–ł–Ķ–Ĺ—ā–į]',
      from:`='${client.Id_client}'`
    })
}
//   else if (client['Id_client']){
//     currentSearch('allBooks',{
//       bd:'–ö–Ľ–ł–Ķ–Ĺ—ā',
//       where:'WHERE [ID_–ö–Ľ–ł–Ķ–Ĺ—ā–į]',
//       from:`='${client.Id_client}'`
//     })
// }
  else if (client['FIO']){
    currentSearch('allBooks',{
      bd:'–ö–Ľ–ł–Ķ–Ĺ—ā',
      where:'WHERE –§–ė–ě',
      from:`='${client.FIO}'`
    })
}
  else if (client['Gender']){
    currentSearch('allBooks',{
      bd:'–ö–Ľ–ł–Ķ–Ĺ—ā',
      where:'WHERE –ü–ĺ–Ľ',
      from:`='${client.Gender}'`
    })
}
  else if (client['Born']){
    currentSearch('allBooks',{
      bd:'–ö–Ľ–ł–Ķ–Ĺ—ā',
      where:'WHERE [–Ē–į—ā–į –†–ĺ–∂–ī–Ķ–Ĺ–ł—Ź]',
      from:`='${client.Born}'`
    })
}
  else if (client['Phone']){
    currentSearch('allBooks',{
      bd:'–ö–Ľ–ł–Ķ–Ĺ—ā',
      where:'WHERE [–Ě–ĺ–ľ–Ķ—Ä –Ę–Ķ–Ľ–Ķ—Ą–ĺ–Ĺ–≤]',
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
      bd:'–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ',
      where:'',
      from:``
    })
  }
  else if (sotr['Id_sotr']){
    currentSearch('allBooks',{
      bd:'–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ',
      where:'WHERE [ID_–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ–į]',
      from:`='${sotr.Id_sotr}'`
    })
}
  else if (sotr['FIO']){
    currentSearch('allBooks',{
      bd:'–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ',
      where:'WHERE –§–ė–ě',
      from:`='${sotr.FIO}'`
    })
}
  else if (sotr['Gender']){
    currentSearch('allBooks',{
      bd:'–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ',
      where:'WHERE –ü–ĺ–Ľ',
      from:`='${sotr.Gender}'`
    })
}
  else if (sotr['post']){
    currentSearch('allBooks',{
      bd:'–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ',
      where:'WHERE –Ē–ĺ–Ľ–∂–Ĺ–ĺ—Ā—ā—Ć',
      from:`='${sotr.post}'`
    })
}
  else if (sotr['salary']){
    currentSearch('allBooks',{
      bd:'–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ',
      where:'WHERE –ó–į—Ä–Ņ–Ľ–į—ā–į',
      from:`='${sotr.salary}'`
    })
}
  else if (sotr['Phone']){
    currentSearch('allBooks',{
      bd:'–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ',
      where:'WHERE [–Ě–ĺ–ľ–Ķ—Ä –Ę–Ķ–Ľ–Ķ—Ą–ĺ–Ĺ–į]',
      from:`='${sotr.Phone}'`
    })
}
}
  const items =
   [
    { title: '–ź–≤—ā–ĺ—Ä', content: 
      <div>
        <div className="App_inputs">
          <input name="FIO" placeholder="–§–ė–ě" onChange={setInputAuthor}></input>
          <input name="Born" placeholder="–Ē–į—ā–į —Ä–ĺ–∂–ī–Ķ–Ĺ–ł—Ź" onChange={setInputAuthor}></input>
          <input name="Phone" placeholder="–Ě–ĺ–ľ–Ķ—Ä —ā–Ķ–Ľ–Ķ—Ą–ĺ–Ĺ–į" onChange={setInputAuthor}></input>
          <input name="Gender" placeholder="–ü–ĺ–Ľ" onChange={setInputAuthor}></input>
          <input name="Email" placeholder="Email" onChange={setInputAuthor}></input>
    
           <button onClick={()=> {
                searchAllDataAuthor()
              }
            }>

            –ü–ĺ–ł—Ā–ļ</button>
        </div>

        <Table data={arrayreturnedData} rebindTable = {searchAllDataAuthor}/>
    </div>
    
    },

    { title: '–ö–Ĺ–ł–≥–ł', content: 
      <div>

        <div className="App_inputs">
          {/* <input name="booksID" placeholder="Id_–ö–Ĺ–ł–≥–ł" onChange={setInputBook}></input> */}
          <input name="Name" placeholder="–Ě–į–∑–≤–į–Ĺ–ł–Ķ –ö–Ĺ–ł–≥–ł" onChange={setInputBook}></input>
          <input name="Count" placeholder="–ö–ĺ–Ľ–ł—á–Ķ—Ā—ā–≤–ĺ" onChange={setInputBook}></input>
          <input name="State" placeholder="–°–ĺ—Ā—ā–ĺ—Ź–Ĺ–ł–Ķ" onChange={setInputBook}></input>
          <input name="price" placeholder="–¶–Ķ–Ĺ–į" onChange={setInputBook}></input>
          <input name="contractNumber" placeholder="–Ě–ĺ–ľ–Ķ—Ä –ö–ĺ–Ĺ—ā—Ä–į–ļ—ā–į" onChange={setInputBook}></input>
    
           <button onClick={()=>{
                searchAllDataBook()
              }
            }>
            –ü–ĺ–ł—Ā–ļ</button>
       </div>

        <TableBook data={arrayreturnedDataBook} rebindTable = {searchAllDataBook}/>

     </div>
   },
    { title: '–ö–ĺ–Ĺ—ā—Ä–į–ļ—ā—č', content:
    
      <div>

        <div className="App_inputs">
          <input name="contractNumber" placeholder="–Ě–ĺ–ľ–Ķ—Ä –ö–ĺ–Ĺ—ā—Ä–į–ļ—ā–į" onChange={setInputContract}></input>
          <input name="Name" placeholder="–ė–ľ—Ź –ź–≤—ā–ĺ—Ä–į" onChange={setInputContract}></input>
          <input name="circulation" placeholder="–Ę–ł—Ä–į–∂" onChange={setInputContract}></input>
          <input name="term" placeholder="–°—Ä–ĺ–ļ" onChange={setInputContract}></input>
          <input name="–°onclusionDate" placeholder="–Ē–į—ā–į –ó–į–ļ–Ľ—é—á–Ķ–Ĺ–ł—Ź" onChange={setInputContract}></input>
          <input name="fee" placeholder="–ď–ĺ–Ĺ–ĺ—Ä–į—Ä" onChange={setInputContract}></input>
          <input name="Id_Sotr" placeholder="ID_–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ–į" onChange={setInputContract}></input>
          <input name="StatusAppl" placeholder="–°—ā–į—ā—É—Ā –ó–į—Ź–≤–ļ–ł" onChange={setInputContract}></input>
          <input name="CountBooks" placeholder="–ö–ĺ–Ľ–ł—á–Ķ—Ā—ā–≤–ĺ –ö–Ĺ–ł–≥" onChange={setInputContract}></input>
          <input name="genre" placeholder="–Ė–į–Ĺ—Ä" onChange={setInputContract}></input>
    
           <button onClick={()=>{
                searchAllDataContract()
              }
            }>
            –ü–ĺ–ł—Ā–ļ</button>
        </div>

        <TableContract data={arrayreturnedDataContract} rebindTable = {searchAllDataContract}/>

      </div>

    },
    { title: '–ö–Ľ–ł–Ķ–Ĺ—ā—č', content: 
  
    <div>

    <div className="App_inputs">
      {/* <input name="Id_client" placeholder="ID –ö–Ľ–ł–Ķ–Ĺ—ā–į" onChange={setInputClient}></input> */}
      <input name="FIO" placeholder="–§–ė–ě" onChange={setInputClient}></input>
      <input name="Gender" placeholder="–ü–ĺ–Ľ" onChange={setInputClient}></input>
      <input name="Born" placeholder="–Ē–į—ā–į –†–ĺ–∂–ī–Ķ–Ĺ–ł—Ź" onChange={setInputClient}></input>
      <input name="Phone" placeholder="–Ě–ĺ–ľ–Ķ—Ä –Ę–Ķ–Ľ–Ķ—Ą–ĺ–Ĺ–≤" onChange={setInputClient}></input>
  
       <button onClick={()=>{
            searchAllDataClient()
          }
        }>
        –ü–ĺ–ł—Ā–ļ</button>
    </div>

    <TableClient data={arrayreturnedDataClient} rebindTable = {searchAllDataClient}/>

  </div>
  },
    { title: '–°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ–ł', content: 

    <div>

    <div className="App_inputs">
      {/* <input name="Id_sotr" placeholder="ID –°–ĺ—ā—Ä—É–ī–Ĺ–ł–ļ–į" onChange={setInputSotr}></input> */}
      <input name="FIO" placeholder="–§–ė–ě" onChange={setInputSotr}></input>
      <input name="Gender" placeholder="–ü–ĺ–Ľ" onChange={setInputSotr}></input>
      <input name="post" placeholder="–Ē–ĺ–Ľ–∂–Ĺ–ĺ—Ā—ā—Ć" onChange={setInputSotr}></input>
      <input name="salary" placeholder="–ó–į—Ä–Ņ–Ľ–į—ā–į" onChange={setInputSotr}></input>
      <input name="Phone" placeholder="–Ě–ĺ–ľ–Ķ—Ä –Ę–Ķ–Ľ–Ķ—Ą–ĺ–Ĺ–į" onChange={setInputSotr}></input>
  
       <button onClick={()=>{
            searchAllDataSotr()
          }
        }>
        –ü–ĺ–ł—Ā–ļ</button>
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
