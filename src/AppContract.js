import './App.css';
import React, {useState} from 'react';
import TableContract from './components/table/TableContract';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import "@ui5/webcomponents/dist/Calendar";
import { DesktopDateRangePicker } from '@mui/lab';
import { DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';




let counter = 0;

 
function App() {

  const [contract, setContract] = useState(
    {contractNumber:'',Name:'',
     circulation:'',circulationot:'',circulationdo:'', term:'', termot:'', termdo:'',
     СonclusionDate:'', fee:"", feeot:"", feedo:"", Id_Sotr:"",
     StatusAppl:'', CountBooks:"", genre:"", datePickerot:'', datePickerdo:''
     });
     const [oSpisokSotr, setSotr] =  useState({'0':''});
     const [arrayreturnedDataContract, setArrayReturnedDataContract] =  useState();
     const [currencies, setCurrencies] = React.useState(
  [
   ''
  ]
  );
     const [currenciesGenre, setCurrenciesGenre] = React.useState( ['']);
     const [currenciesSotr, setCurrenciesSotr] = React.useState( ['1','4','']);

const  setInputContract = (e)=>{


  const {name, value} = e.target; 
  setContract(prevState =>({
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
        e.target.value=''
        // var stringCheck = document.getElementById('stringCheck');
    }
  }
if(
  name == 'termot'||
  name == 'termdo'||
  name == 'feeot'||
  name == 'circulationdo'||
  name == 'circulationot'||
  name == 'feedo'
  ){
    debugger
    if(!Number.isInteger(parseInt(value[value.length-1])))
    {
        alert('Ошибка! Введите число')
        e.target.value=''

        // var intCheck = document.getElementById('intCheck');
    }
}
  }
  console.log(contract);
  
}


  let aSpisokAuthor =[];
  let aSpisokGenre =[];
  let aSpisokSotr =[];
  const currentSearch = async (arg,Body)=>{
     await spisokSotr();

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
        setArrayReturnedDataContract(text)
       let sSpisokAuthor = new Set();
       let sSpisokGenre = new Set();
        for (let i=0;i<text.length;i++){
          sSpisokAuthor.add(text[i]['Имя Автора'])
          sSpisokGenre.add(text[i]['Жанр'])
          }
        for(let el of sSpisokAuthor){
          aSpisokAuthor.push(el);
        }
        for(let el of sSpisokGenre){
          aSpisokGenre.push(el);
        }
        aSpisokAuthor.push('');
        aSpisokGenre.push('');

        if(counter==0){
          counter=1;
        setCurrencies(aSpisokAuthor);
        setCurrenciesGenre(aSpisokGenre);
        }
        


     
  })})}

  
   const spisokSotr = async ()=>{
      debugger
    let newData = await fetch(`/allBooks`,{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        bd: "Сотрудник",
        where: '',
        from: ''
      })
    })
    .then(function(response) {
      response.json().then(function(text) { 
        let temporary = {};
        for(let i = 0; i<text.length; i++){
          temporary[text[i]['ID_Сотрудника']] = text[i]['ФИО']
          } 
          setSotr(temporary)
          
        })
      }
      )
    }
   
  
  
  
  const searchAllDataContract =  ()=> {

    let counter =0;
    for (let i in contract){
      if(contract[i]!=''){
          counter++
      }
    }
  
    if(counter==0){
      // spisokSotr();
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
     else if (contract['circulationot']){
        currentSearch('allBooks',{
          bd:'Контракт',
          where:'WHERE Тираж',
          from:`between ${contract.circulationot} and ${contract.circulationdo}`
        })
    }
     else if (contract['termot']){
        currentSearch('allBooks',{
          bd:'Контракт',
          where:'WHERE Срок',
          from:`between ${contract.termot} and ${contract.termdo}`
        })
    }
     else if (contract['datePickerot']){
        currentSearch('allBooks',{
          bd:'Контракт',
          where:'WHERE [Дата Заключения]',
          from:`between '${contract.datePickerot}' and  '${contract.datePickerdo}'`
        })
    }
     else if (contract['feeot']){
        currentSearch('allBooks',{
          bd:'Контракт',
          where:'WHERE Гонорар',
          from:`between ${contract.feeot} and ${contract.feedo}`
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






  return (
      <div className="App">
                        <h2>Информация о контрактах</h2>

     <div>

<div className="App_inputs" style={{marginBottom:'3em'}}>

  
{/* <ui5-daterange-picker id="mydaterange-picker1"
onChange={datePicker}
></ui5-daterange-picker> */}

{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
<DatePicker
    label="Basic example"
    onChange={datePicker}
    renderInput={(params) => <TextField {...params} />}
  />
  </LocalizationProvider> */}



<TextField id="standard-basic" 
      select
      label="Имя Автора"  
      margin="normal"
      name = 'Name'
      variant="standard" 
      helperText="Выберете имя автора"
      
      onChange={setInputContract}
      style={{position:"relative",top:'24px', right:'464px'}}
      >
        {currencies.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField>

<TextField id="standard-basic" 
      select
      label="Жанр"  
      margin="normal"
      name = 'genre'
      variant="standard" 
      helperText="Выберете жанр"
      
      onChange={setInputContract}
      style={{position:"relative",top:'24px', right:'394px'}}
      >
        {currenciesGenre.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
    </TextField>

<TextField id="standard-basic" 
      select
      label="Сотрудник"  
      margin="normal"
      name = 'Id_Sotr'
      variant="standard" 
      helperText="Выберете сотрудника"
      
      onChange={setInputContract}
      style={{position:"relative",top:'24px', right:'344px'}}
      >
       
            <MenuItem key={1} value={1}>
              Нечаев В.В.
            </MenuItem>
            <MenuItem key={4} value={4}>
              Плытник А.А.
            </MenuItem>
            <MenuItem key={2} value={''}>
              
            </MenuItem>
        
    </TextField>


    <div style={{display:'flex', flexDirection:'column', width:'200px',
                position:'relative', left:'590px', top:'-95px' }}>
<div >
<h3>Дата Заключения</h3>

<label for="start">Начало интервала:</label>
<input type="date" id="start" name="datePickerot"
       onChange={setInputContract}
       min="1935-01-01" max="2021-12-31"/>
</div>
<div>
<label for="start">Конец интервала:</label>
<input type="date" id="start" name="datePickerdo"
        onChange={setInputContract}
       min="1935-01-01" max="2021-12-31"/>
</div>
</div>

    <div style={{display:'flex', flexDirection:'column', 
width:'100px', position:'absolute',left:'770px',top:'81px'}}>
  <TextField id="standjjjhjh" 
      label="Тираж от"  
      margin="normal"
      name = 'circulationot'
      variant="standard" 
      helperText="Введите начало интервала"
      
      onChange={setInputContract}
      style={{position:"relative",top:'10px', left:'30px'}}
      />
  <TextField id="standjhjkkh" 
      label="Тираж до"  
      margin="normal"
      name = 'circulationdo'
      variant="standard" 
      helperText="Введите конец интервала"
      
      onChange={setInputContract}
      style={{position:"relative",top:'-15px', left:'30px'}}
      />

</div>
    <div style={{display:'flex', flexDirection:'column', 
width:'100px', position:'absolute',left:'920px',top:'81px'}}>
  <TextField id="standjjjhjh" 
      label="Срок от"  
      margin="normal"
      name = 'termot'
      variant="standard" 
      helperText="Введите начало интервала"
      
      onChange={setInputContract}
      style={{position:"relative",top:'10px', left:'30px'}}
      />
  <TextField id="standjhjkkh" 
      label="Срок до"  
      margin="normal"
      name = 'termdo'
      variant="standard" 
      helperText="Введите конец интервала"
      
      onChange={setInputContract}
      style={{position:"relative",top:'-15px', left:'30px'}}
      />

</div>
    <div style={{display:'flex', flexDirection:'column', 
width:'100px', position:'absolute',left:'1065px',top:'81px'}}>
  <TextField id="standjjjhjh" 
      label="Гонорар от"  
      margin="normal"
      name = 'feeot'
      variant="standard" 
      helperText="Введите начало интервала"
      
      onChange={setInputContract}
      style={{position:"relative",top:'10px', left:'30px'}}
      />
  <TextField id="standjhjkkh" 
      label="Гонорар до"  
      margin="normal"
      name = 'feedo'
      variant="standard" 
      helperText="Введите конец интервала"
      
      onChange={setInputContract}
      style={{position:"relative",top:'-15px', left:'30px'}}
      />

</div>




   <Button onClick={()=>{
        searchAllDataContract()
      }
    } 
    style={{position:"relative",top:'-188px', left:'530px'}}

    >
    Поиск</Button>
</div>

<TableContract data={arrayreturnedDataContract}
 rebindTable = {searchAllDataContract}
 sotr = {oSpisokSotr}
          
    />

</div>
        
    </div>
  );
}

export default App;
