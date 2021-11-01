import './App.css';
import React, {useState} from 'react';
import Table from './components/table/Table'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


let counter = 0;

 
function App() {

    const [author, setAuthor] = useState({FIO:'', Born:'', Phone:'',Gender:'',Email:'', datePickerot:'', datePickerdo:''});
    const [SearchArrayreturnedData, setSearcArrayreturnedData] =  useState();
    const [arrayreturnedData, setArrayReturnedData] = useState([{FIO:'', Born:'', Phone:'',Gender:'',Email:''}]);
    const [currencies, setCurrencies] = React.useState(
  [
   'М','Ж',''
  ]
  
);
const  setInputAuthor = (e)=>{
    const {name, value} = e.target;
    console.log(value);
  setAuthor(prevState =>({
    ...prevState,
    [name]:value
  }));
  console.log(author);

  }

  const setFilterAuthor = (e)=>{

    const {name, value} = e.target; 
    setAuthor(prevState =>({
      ...prevState,
      [name]:value
    }));
      debugger
      
      
      setSearcArrayreturnedData(arrayreturnedData.filter(authors =>{
      
      debugger
      return authors['ФИО Автора'].toLowerCase().includes(value.toLowerCase())
    })) 
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
        case 'Автор':{
            let array=[];
          for(let i=0; i<newData.length;i++){
            array.push(newData[i]);
          }
          setArrayReturnedData(array)
          setSearcArrayreturnedData(array)
        }
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
    if (author['datePickerot']){
      debugger
      currentSearch('allBooks',{
        bd:'Автор',
        where:'WHERE [Дата Рождения]',
        from:`between '${author.datePickerot}' and '${author.datePickerdo}'`
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






  return (
      <div className="App">
                <h2>Информация об авторах</h2>

     <div>

<div className="App_inputs" style={{marginBottom:'3em'}}>

   
    
  <TextField id="standard-basic" 
      
      label="Имя Автора"  
      margin="normal"
      name = 'FIO'
      variant="standard" 
      helperText="Введите имя"
      onChange={setFilterAuthor}
      style={{position:"relative",top:'40px', left:'30px'}}
      >
       
    </TextField> 


    <div style={{display:'flex', flexDirection:'column', width:'200px',
                position:'absolute', left:'390px', top:'93px' }}>
<div >
  <h3>Дата рождения</h3>
<label for="start">Начало интервала:</label>
<input type="date" id="start" name="datePickerot"
       onChange={setInputAuthor}
       min="1935-01-01" max="2021-12-31"/>
</div>
<div>
<label for="start">Конец интервала:</label>
<input type="date" id="start" name="datePickerdo"
        onChange={setInputAuthor}
       min="1935-01-01" max="2021-12-31"/>
</div>
</div>

  <TextField id="standard-basic" 
      select
      label="Пол"  
      margin="normal"
      name = 'Gender'
      variant="standard" 
      helperText="Выберете пол"
      onChange={setInputAuthor}
      style={{position:"relative",top:'54px', left:'80px'}}
      >
        {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField> 


   <Button onClick={()=>{
        searchAllDataAuthor()
      }
    } 
    style={{position:"relative",top:'94px', left:'200px'}}

    >
    Поиск</Button>
</div>

<Table data={SearchArrayreturnedData} rebindTable = {searchAllDataAuthor}
   view=''
    />

</div>
        
    </div>
  );
}

export default App;
