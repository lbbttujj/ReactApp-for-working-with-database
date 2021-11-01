import './style.css';
import React, {useState, useEffect} from 'react';
import TableBook from '../table/TableAppl'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


let counter_ = 0;

 
function App() {

   const [appl, setAppl] = useState({numberAppl:'', Name:'', date:'', genre:'', 
   count:'',datePickerdo:'',datePickerot:''});
   const [currenciesGenre, setCurrenciesGenre] = React.useState( ['']);
   const [arrayreturnedDataBook, setArrayReturnedDataBook] =  useState();
   const [SearchArrayreturnedDataBook, setSearchArrayReturnedDataBook] =  useState();
  const [currencies, setCurrencies] = React.useState(
  [
   '', "1","2","3"
  ]
  
);
  const  setInputBook = (e)=>{
    const {name, value} = e.target; 


    setAppl(prevState =>({
    ...prevState,
    [name]:value
  }));

  }

  const setFilterBook = (e)=>{

    const {name, value} = e.target; 
    setAppl(prevState =>({
      ...prevState,
      [name]:value
    }));
      debugger
      
      
    setSearchArrayReturnedDataBook(arrayreturnedDataBook.filter(books =>{
      
      debugger
      return books['Имя Автора'].toLowerCase().includes(value.toLowerCase())
    })) 
  

  }

    
  let aSpisokGenre =[];

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
    .then(function(response) {
      response.json().then(function(text) { 
        setArrayReturnedDataBook(text)
        setSearchArrayReturnedDataBook(text)
        let sSpisokGenre = new Set();
        for (let i=0;i<text.length;i++){
          sSpisokGenre.add(text[i]['Жанр'])
          }
          for(let el of sSpisokGenre){
            aSpisokGenre.push(el);
          }
          aSpisokGenre.push('');
          if(counter_==0){
            counter_=1;
          setCurrenciesGenre(aSpisokGenre);
          }
      })
    })

  
    

    // for(let i =0; i<newData.length;i++){
    //   massContractNumbers.add(newData[i]['Номер Контракта'])
    // }
    // massContractNumbers.add('');

    // massContractNumbers.forEach(el=>{
    //   sMassContractNumbers.push(el+'')
    // })
    // if (counter==0){
    // counter=1;
    // setCurrencies(sMassContractNumbers)
    // debugger
    // }
  }

  
  
  
  const searchAllDataBook =  ()=> {
    let counter =0;
    for (let i in appl){
      if(appl[i]!=''){
          counter++
      }
    }

    if(counter==0){
      currentSearch('allBooks',{
        bd:'Заявки',
        where:'',
        from:``
      })
    }
    else if (appl['Name']){

 
      currentSearch('allBooks',{
        bd:'Заявки',
        where:'WHERE [Имя Автора]',
        from:`='${appl.Name}'`
      })
  }
  else if (appl['datePickerot']){
    currentSearch('allBooks',{
      bd:'Заявки',
      where:'WHERE [Дата Заявки]',
      from:`between '${appl.datePickerot}' and  '${appl.datePickerdo}'`
    })
}
    else if (appl['genre']){
      debugger
      currentSearch('allBooks',{
        bd:'Заявки',
        where:'WHERE [Жанр]',
        from:`= '${appl.genre}' `
      })
  }
}






  return (
      <div className="App">
                <h2>Заявки</h2>

     <div>

<div className="App_inputs" style={{marginBottom:'3em'}}>

  <TextField id="nameBook" 
      label="Имя Автора" 
      name="Name" 
      margin="normal"
      variant="standard" 
      helperText="Введите имя автора"
      onChange={setFilterBook}
      style={{position:"relative",top:'10px',left:'80px'}}
     />

<div style={{display:'flex', flexDirection:'column', width:'200px',
                position:'absolute', left:'430px', top:'73px' }}>
<div >
<h3>Дата Заявки</h3>

<label for="start">Начало интервала:</label>
<input type="date" id="start" name="datePickerot"
       onChange={setInputBook}
       min="1935-01-01" max="2021-12-31"/>
</div>
<div>
<label for="start">Конец интервала:</label>
<input type="date" id="start" name="datePickerdo"
        onChange={setInputBook}
       min="1935-01-01" max="2021-12-31"/>
</div>
</div>
<TextField id="standard-basic" 
      select
      label="Жанр"  
      margin="normal"
      name = 'genre'
      variant="standard" 
      helperText="Выберете жанр"
      
      onChange={setInputBook}
      style={{position:"relative",top:'24px', left:'130px'}}
      >
        {currenciesGenre.map((option) => (
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
