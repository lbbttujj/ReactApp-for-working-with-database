import './App.css';
import React, {useState, useEffect} from 'react';
import TableBook from './components/tableBook/TabelBook'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


let counter = 0;

 
function App() {

   const [book, setBook] = useState({booksID:'', Name:'', Count:'', State:'', price:'', contractNumber:""});
   const [arrayreturnedDataBook, setArrayReturnedDataBook] =  useState();
   const [SearchArrayreturnedDataBook, setSearchArrayReturnedDataBook] =  useState();
  const [currencies, setCurrencies] = React.useState(
  [
   '', "1","2","3"
  ]
  
);
  const  setInputBook = (e)=>{
    const {name, value} = e.target; 


  setBook(prevState =>({
    ...prevState,
    [name]:value
  }));
  console.log(book);

  }

  const setFilterBook = (e)=>{

    const {name, value} = e.target; 
    setBook(prevState =>({
      ...prevState,
      [name]:value
    }));
    console.log(book);
      debugger
      
      
    setSearchArrayReturnedDataBook(arrayreturnedDataBook.filter(books =>{
      
      debugger
      return books['Название Книги'].toLowerCase().includes(value.toLowerCase())
    })) 
  

  }

    // useEffect(()=>{
    //   searchAllDataBook();
    // })

  let massContractNumbers = new Set();
  let sMassContractNumbers = []
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
      case 'Книги':{
        setArrayReturnedDataBook(newData)
        setSearchArrayReturnedDataBook(newData)
      }
        break;
      default:
        break;
    }
    

    for(let i =0; i<newData.length;i++){
      massContractNumbers.add(newData[i]['Номер Контракта'])
    }
    massContractNumbers.add('');

    massContractNumbers.forEach(el=>{
      sMassContractNumbers.push(el+'')
    })
    if (counter==0){
    counter=1;
    setCurrencies(sMassContractNumbers)
    debugger
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
        where:'WHERE Состояние',
        from:`= 'В Производстве'`
      })
    }
    else if (book['Name']){

 
      // currentSearch('allBooks',{
      //   bd:'Книги',
      //   where:'WHERE [Название Книги]',
      //   from:`='${book.Name}'`
      // })
  }

    else if (book['contractNumber']){
      currentSearch('allBooks',{
        bd:'Книги',
        where:'WHERE [Номер Контракта]',
        from:`='${book.contractNumber}' and Состояние = 'В Производстве' `
      })
  }
}






  return (
      <div className="App">
                <h2>Информация о книгах в производстве</h2>

     <div>

<div className="App_inputs" style={{marginBottom:'3em'}}>

  <TextField id="nameBook" 
      label="Название книги" 
      name="Name" 
      margin="normal"
      variant="standard" 
      helperText="Введите название книги"
      onChange={setFilterBook}
      style={{position:"relative",top:'10px',right:'40px'}}
     />
  <TextField id="standard-basic" 
      select
      label="Номер Контракта"  
      margin="normal"
      name = 'contractNumber'
      variant="standard" 
      helperText="Выберете номер контракта"
      value={book.contractNumber}
      onChange={setInputBook}
      style={{position:"relative",top:'24px', left:'30px'}}
      >
        {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField>


   <Button onClick={()=>{
        searchAllDataBook()
      }
    } 
    style={{position:"relative",top:'54px', left:'200px'}}

    >
    Поиск</Button>
</div>

<TableBook data={SearchArrayreturnedDataBook} rebindTable = {searchAllDataBook}
   view=''
    />

</div>
        
    </div>
  );
}

export default App;
