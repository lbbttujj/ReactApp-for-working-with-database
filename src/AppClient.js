import './App.css';
import React, {useState} from 'react';
import Table from './components/table/TableClient'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


// or for Day.js

let counter = 0;

 
function App() {

    const [client, setClient] = useState(
        {Id_client:'',FIO:'',  Gender:'', Born:'', Phone:'' ,
         datePickerot:'', datePickerdo:''
         });
         const [arrayreturnedDataClient, setArrayReturnedDataClient] =  useState();
         const [SearchArrayreturnedDataClient, setSearchArrayReturnedDataClient] =  useState();
         const [currencies, setCurrencies] = React.useState(
  [
   'М','Ж',''
  ]
  
);

const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

const handleChange = (newValue) => {
  setValue(newValue);
};

      

const setInputClient = (e)=>{
    
    const {name, value} = e.target; 

    setClient(prevState =>({
    ...prevState,
    [name]:value
  }));
  
  console.log(client);
  }

  
  const setSearchInputClient = (e)=>{

    const {name, value} = e.target; 
    setClient(prevState =>({
      ...prevState,
      [name]:value
    }));
      debugger
      
      
      setSearchArrayReturnedDataClient(arrayreturnedDataClient.filter(clients =>{
      
      debugger
      return clients['ФИО'].toLowerCase().includes(value.toLowerCase())
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
        case 'Клиент':
            setArrayReturnedDataClient(newData)
            setSearchArrayReturnedDataClient(newData)
          break;
      default:
        break;
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
    else if (client['datePickerot']){
      currentSearch('allBooks',{
        bd:'Клиент',
        where:'WHERE [Дата Рождения]',
        from:`between '${client.datePickerot}' and  '${client.datePickerdo}'`
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




  return (
      <div className="App">

        <h2>Информация о клиентах и их покупках</h2>
     <div>

<div className="App_inputs" style={{marginBottom:'3em'}}>

<TextField id="standard-basic" 
      label="Имя"  
      margin="normal"
      name = 'FIO'
      variant="standard" 
      helperText="Введите имя"
      onChange={setSearchInputClient}
      style={{position:"absolute",top:'140px', left:'600px'}}
      >
   
    </TextField> 

   <div style={{display:'flex', flexDirection:'column', width:'200px',
                position:'relative', left:'350px', top:'0px' }}>
<div >
<h3>Дата рождения</h3>

<label for="start">Начало интервала:</label>
<input type="date" id="start" name="datePickerot"
       onChange={setInputClient}
       min="1935-01-01" max="2021-12-31"/>
</div>
<div>
<label for="start">Конец интервала:</label>
<input type="date" id="start" name="datePickerdo"
        onChange={setInputClient}
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
      onChange={setInputClient}
      style={{position:"relative",top:'-130px', left:'170px'}}
      >
        {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField> 
    



   <Button onClick={()=>{
        searchAllDataClient()
      }
    } 
    style={{position:"relative",top:'-84px', left:'300px'}}

    >
    Поиск</Button>
</div>

<Table data={SearchArrayreturnedDataClient} rebindTable = {searchAllDataClient}

    />

</div>
        
    </div>
  );
}

export default App;
