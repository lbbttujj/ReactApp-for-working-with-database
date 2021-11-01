import './App.css';
import React, {useState} from 'react';
import Table from './components/table/TableSotr'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


let counter = 0;

 
function App() {

    const [sotr, setSotr] = useState(
        {Id_sotr:'',FIO:'',  Gender:'', post:'', salary:'', salaryot:'', salarydo:'', Phone:''});    
        const [SearchArrayreturnedDataSotr, setSearchArrayReturnedDataSotr] =  useState(); 
        const [arrayreturnedDataSotr, setArrayReturnedDataSotr] =  useState();
         const [currencies, setCurrencies] = React.useState(
  [
   'М','Ж',''
  ]
  
);
         const [currencies2, setCurrencies2] = React.useState(
  [
   'Редактор','Дизайнер','PR-Менеджер', 'Издатель', ''
  ]
  
);
const setInputSotr = (e)=>{
    const {name, value} = e.target; 
    setSotr(prevState =>({
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
  name == 'salarydo'||
  name == 'salaryot'
 
  ){
    debugger
    if(!Number.isInteger(parseInt(value[value.length-1])))
    {
        alert('Ошибка! Введите число')
        // var intCheck = document.getElementById('intCheck');
    }
}
  }
  console.log(sotr);
  }

  const setSearchInputSotr = (e)=>{

    const {name, value} = e.target; 
    setSotr(prevState =>({
      ...prevState,
      [name]:value
    }));
      debugger
      
      
      setSearchArrayReturnedDataSotr(arrayreturnedDataSotr.filter(sotrs =>{
      
      debugger
      return sotrs['ФИО'].toLowerCase().includes(value.toLowerCase())
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
        case 'Сотрудник':
        setArrayReturnedDataSotr(newData)
        setSearchArrayReturnedDataSotr(newData)
      break;
      default:
        break;
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
    else if (sotr['salaryot']){
      currentSearch('allBooks',{
        bd:'Сотрудник',
        where:'WHERE Зарплата',
        from:`between ${sotr.salaryot} and ${sotr.salarydo}`
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






  return (
      <div className="App">
                <h2>Информация о сотрудниках</h2>

     <div>

<div className="App_inputs" style={{marginBottom:'3em'}}>

   

<TextField id="standard-basic" 
      label="ФИО Сотрудника"  
      margin="normal"
      name = 'FIO'
      variant="standard" 
      helperText="Введите имя"
      onChange={setSearchInputSotr}
      style={{position:"relative",top:'24px', right:'200px'}}
      >
  
    </TextField> 
<TextField id="standard-basic" 
      select
      label="Должность"  
      margin="normal"
      name = 'post'
      variant="standard" 
      helperText="Выберете должность"
      onChange={setInputSotr}
      style={{position:"relative",top:'35px', right:'130px'}}
      >
        {currencies2.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField> 

<TextField id="standard-basic" 
      select
      label="Пол"  
      margin="normal"
      name = 'Gender'
      variant="standard" 
      helperText="Выберете пол"
      onChange={setInputSotr}
      style={{position:"relative",top:'35px', right:'70px'}}
      >
        {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField> 
    

    <div style={{display:'flex', flexDirection:'column', 
width:'100px', position:'absolute',left:'900px',top:'90px'}}>
  <TextField id="standjjjhjh" 
      label="Зарплата от"  
      margin="normal"
      name = 'salaryot'
      variant="standard" 
      helperText="Введите начало интервала"
      
      onChange={setInputSotr}
      style={{position:"relative",top:'10px', left:'30px'}}
      />
  <TextField id="standjhjkkh" 
      label="Зарплата до"  
      margin="normal"
      name = 'salarydo'
      variant="standard" 
      helperText="Введите конец интервала"
      
      onChange={setInputSotr}
      style={{position:"relative",top:'-15px', left:'30px'}}
      />

</div>
  


   <Button onClick={()=>{
        searchAllDataSotr()
      }
    } 
    style={{position:"relative",top:'74px', left:'200px'}}

    >
    Поиск</Button>
</div>

<Table data={SearchArrayreturnedDataSotr} rebindTable = {searchAllDataSotr}

    />

</div>
        
    </div>
  );
}

export default App;
