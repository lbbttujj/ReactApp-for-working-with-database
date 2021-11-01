import './App.css';
import React, {useState, useEffect} from 'react';
import TableBook from './components/tableBook/TabelBook'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


let counter = 0;

 
function App() {

   const [book, setBook] = useState({booksID:'', Name:'', Count:'', 
   countot:'', countdo:'',State:'', 
   price:'', priceot:'', pricedo:'', contractNumber:""});
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
  if(value.length>0){

  if(name == 'FIO'||name == 'genre'){
    if(value[value.length-1]=='0'||value[value.length-1]=='1'||
    value[value.length-1]=='2'||value[value.length-1]=='3'||
    value[value.length-1]=='4'||value[value.length-1]=='5'||
    value[value.length-1]=='6'||value[value.length-1]=='7'||
    value[value.length-1]=='8'||value[value.length-1]=='9')
    {
        alert('Ошибка! Введите строку')
        // var stringCheck = document.getElementById('stringCheck');
    }
  }
if(
  name == 'priceot'||
  name == 'pricedo'||
  name == 'countdo'||
  name == 'countot'
 
  ){
    debugger
    if(!Number.isInteger(parseInt(value[value.length-1])))
    {
        alert('Ошибка! Введите число')
        // var intCheck = document.getElementById('intCheck');
    }
}
  }
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
      case 'Книги':
        {
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

else if (book['price']){
    currentSearch('allBooks',{
      bd:'Книги',
      where:'WHERE Цена',
      from:`='${book.price}'`
    })
}
else if (book['priceot']){
    currentSearch('allBooks',{
      bd:'Книги',
      where:'WHERE Цена',
      from:`between ${book.priceot} and ${book.pricedo}`
    })
}
else if (book['countot']){
    currentSearch('allBooks',{
      bd:'Книги',
      where:'WHERE Количество',
      from:`between ${book.countot} and ${book.countdo}`
    })
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
                <h2>Информация о всех книгах</h2>

     <div>

<div className="App_inputs" style={{marginBottom:'3em'}}>

  <TextField id="nameBook" 
      label="Название книги" 
      name="Name" 
      margin="normal"
      variant="standard" 
      helperText="Введите название книги"
      onChange={setFilterBook}
      style={{position:"relative",top:'10px',right:'250px'}}
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
      style={{position:"relative",top:'24px', right:'204px'}}
      >
        {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField>

<div style={{display:'flex', flexDirection:'column', 
width:'100px', position:'absolute',left:'720px',top:'71px'}}>
  <TextField id="standjjjhjh" 
      label="Цена от"  
      margin="normal"
      name = 'priceot'
      variant="standard" 
      helperText="Введите начало интервала"
      
      onChange={setInputBook}
      style={{position:"relative",top:'10px', left:'30px'}}
      />
  <TextField id="standjhjkkh" 
      label="Цена до"  
      margin="normal"
      name = 'pricedo'
      variant="standard" 
      helperText="Введите конец интервала"
      
      onChange={setInputBook}
      style={{position:"relative",top:'-15px', left:'30px'}}
      />

</div>
<div style={{display:'flex', flexDirection:'column', 
width:'100px', position:'absolute',left:'820px',top:'71px'}}>
  <TextField id="standard-basic" 
      label="Количество от"  
      margin="normal"
      name = 'countot'
      variant="standard" 
      helperText="Введите начало интервала"
      onChange={setInputBook}
      style={{position:"relative",top:'10px', left:'90px'}}
      />
  <TextField id="standard-basic" 
      label="Количество до"  
      margin="normal"
      name = 'countdo'
      variant="standard" 
      helperText="Введите конец интервала"
      onChange={setInputBook}
      style={{position:"relative",top:'-15px', left:'90px'}}
      />
    </div>


   <Button onClick={()=>{
        searchAllDataBook()
      }
    } 
    style={{position:"relative",top:'54px', left:'200px'}}

    >
    Поиск</Button>
</div>

<TableBook data={SearchArrayreturnedDataBook} rebindTable = {searchAllDataBook}
            view='All'
    />

</div>
        
    </div>
  );
}

export default App;
