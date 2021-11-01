import React, { Component } from 'react';
import Buttons from '../buttons/Buttons'
import Dialog from '../dialog/Dialog'
import Update from '../update/Update'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './style.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';

import Paper from '@mui/material/Paper';
import DialogDetail from '../muiDiaDetail/DialogDetail';
import { ThumbUpSharp } from '@mui/icons-material';



class TableClient extends Component {

  constructor(props){
    super(props)
    this.state = { 
       nomerAppl:'',
       name : '',
       date : '',
       genre: '',
       countBooks:'',
       active:false,
       activeContact:false,
       activeContr:false,
       currentBooks :[],



       numberPhone:'',
       gender:'',
       datePicker:'',
       email:'',


       circulation:'',
       term:'',
       fee:'',
       nextNumContr:'',
       today:'2021-10-08',
       StatusAppl:'Одобрено',
       Id_Sotr:`${localStorage.isdat}`,


       nextIDBook:'',


       showChoiceAuthor:true

    }
   
  }

  componentDidMount(){
  this.onSelectRow=this.onSelectRow.bind(this);
  this.deleteData=this.deleteData.bind(this);
  this.getoBuy=this.getoBuy.bind(this);
  this.setInputAuthor=this.setInputAuthor.bind(this);
  this.checkExistAuthor=this.checkExistAuthor.bind(this);
  this.getNextNumberContract=this.getNextNumberContract.bind(this);
  this.createContract=this.createContract.bind(this);
  this.getNextBooksId=this.getNextBooksId.bind(this);
  this.createBook=this.createBook.bind(this);
 
}

DateFormatter(cell) {
  if(cell){
  cell = cell.split('');
  cell.splice(-14, 14)
  cell = cell.join('')
  return ` ${cell}`;
  }
};

testD(cell){
 
  return cell
}




 
setInputAuthor(el){

    var name = el.target.name;
    var value = el.target.value;

    if(name == 'numberPhone'){
        this.setState({numberPhone:value})
    }
    else if(name == 'datePicker'){
        this.setState({datePicker:value})
    }
    else if(name == 'gender'){
        this.setState({gender:value})
    }
    else if(name == 'email'){
        this.setState({email:value})
    }
    else if(name == 'circulation'){
        this.setState({circulation:value})
    }
    else if(name == 'term'){
        this.setState({term:value})
    }
    else if(name == 'fee'){
        this.setState({fee:value})
    }
    if(value.length>0){

    if(name == 'FIO'||name == 'genre'){
      if(value[value.length-1]=='0'||value[value.length-1]=='1'||
      value[value.length-1]=='2'||value[value.length-1]=='3'||
      value[value.length-1]=='4'||value[value.length-1]=='5'||
      value[value.length-1]=='6'||value[value.length-1]=='7'||
      value[value.length-1]=='8'||value[value.length-1]=='9')
      {
          alert('Ошибка! Введите строку')
          el.target.value=''

          // var stringCheck = document.getElementById('stringCheck');
      }
    }
  if(
    name == 'numberPhone'||
    name == 'circulation'||
    name == 'term'||
    name == 'fee'
   
    ){
      debugger
      if(!Number.isInteger(parseInt(value[value.length-1])))
      {
          alert('Ошибка! Введите число')
          el.target.value=''

          // var intCheck = document.getElementById('intCheck');
      }
  }
}
    debugger 

}


createAuthor = async(id)=>{

    const newData = await fetch(`/create`,{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        FIO: this.state.name,
        Born: this.state.datePicker,
        Phone: this.state.numberPhone,
        Gender: this.state.gender,
        Email: this.state.email
      })
    })
}

createBook = async(book,i)=>{
debugger
    const newData = await fetch(`/createBook`,{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        Name: book,
        Count: '',
        State: "В Производстве",
        price: '',
        booksID: this.state.nextIDBook+i,
        contractNumber:this.state.nextNumContr
      })
    })
}

createContract =  async ()=>{

    
    const newData = await fetch('/createContract',{
        method: "POST",
        headers:{
          'content-type': 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({
            contractNumber:this.state.nextNumContr,
            Name:this.state.name,
            circulation:this.state.circulation,
            term:this.state.term,
            СonclusionDate:this.state.today,
            fee:this.state.fee,
            Id_Sotr:this.state.Id_Sotr,
            StatusAppl:this.state.StatusAppl,
            CountBooks:this.state.countBooks,
            genre:this.state.genre
        })
      })
}


getoBuy = async(id)=>{

  const newData = await fetch(`/allBooks`,{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
        bd: 'Заявки_Книги',
        where: 'WHERE [Номер Заявки] ',
        from: `= ${id}`
    })
  })
  .then((response)=>{
    response.json().then((text)=>{
       
      
          this.setState({currentBooks:text})

    })
  });


}

checkExistAuthor = async(id)=>{

    const newData = await fetch(`/allBooks`,{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
          bd: 'Автор',
          where: 'WHERE [ФИО Автора]',
          from: `= '${id}'`
      })
    })
    .then((response)=>{
      response.json().then((text)=>{
          if (text.length>0){
            this.setState({showChoiceAuthor:false})
            this.setState({activeContact:false})
          }
          else{
            this.setState({showChoiceAuthor:true})
            this.setState({activeContact:false})

          }
            // this.setState({currentBooks:text})
        
      })
    });
  
  
  }
  getNextNumberContract = async()=>{

    const newData = await fetch(`/allBooks`,{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
          bd: 'Контракт',
          where: '',
          from: ``
      })
    })
    .then((response)=>{
      response.json().then((text)=>{
         
            
            this.setState({nextNumContr: text[text.length-1]['Номер контракта'] + 1})
      })
    });
  
  
  }
  getNextBooksId = async()=>{

    const newData = await fetch(`/allBooks`,{
      method: "POST",
      headers:{
        'content-type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
          bd: 'Книги',
          where: '',
          from: ``
      })
    })
    .then((response)=>{
      response.json().then((text)=>{
         
            
            this.setState({nextIDBook: text[text.length-1]['ID_Книги'] + 1})
      })
    });
  
  
  }


  
  


onSelectRow(row, isSelected, e) {
  if (isSelected) {
    
    let  nomerAppl = row['Номер Заявки']
    let  name = row['Имя Автора']
    let  date = row['Дата Заявки']
    let  genre = row['Жанр']
    let  countBooks = row['Количество Книг']
   


    this.setState({ nomerAppl: nomerAppl})
    this.setState({ name: name})
    this.setState({ date: this.DateFormatter(date)})
    this.setState({ genre: genre})
    this.setState({ countBooks: countBooks})
    this.setState({active:true})

// console.log(this.state);




this.getoBuy(nomerAppl);

this.checkExistAuthor(name)

this.getNextNumberContract();

this.getNextBooksId();

  }
};


async deleteData(){
  
  let book = this.state.nomerAppl; 
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: book,
      bd : 'Заявки',
      field : '[Номер Заявки]'
    })
  })
  .then(res=> res);
  console.log(newData);
  this.props.rebindTable();
}


 


  

  
  render() {


    // let current  = this.state.buy;
    // let allbooks = this.state.books;

    // if(current.length>0){

    //   for(let i =0; i<current.length; i++){

    //       for (let j =0; j<allbooks.length; j++){

    //         if (current[i]['ID_Книги'] == allbooks[j]['ID_Книги']){
    //             current[i]['ID_Книги'] = allbooks[j]['Название Книги']
    //         }
    //       }

    // }

//   }

    // debugger

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
  const  selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onSelectRow,
      bgColor: 'gold'
    }
    const {rebindTable,data}=this.props
    
    
    return (
      <div div  style={{position:'relative', left:'300px', top:'50px'}}>
       

        <BootstrapTable 
      
        data={data} 
        selectRow={selectRowProp}
        >
         
        
          {/* <TableHeaderColumn className='test'  dataFormat={this.testD} dataField='ID_Клиента'
          dataAlign='center'
          headerAlign="center"
          width="130"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          ID_Клиента
          </TableHeaderColumn> */}
          <TableHeaderColumn className='test' isKey dataFormat={this.testD} dataField='Номер Заявки'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Номер Заявки
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataField='Имя Автора'
          dataAlign='center'
          headerAlign="center"
          width="140"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Имя Автора
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataFormat={this.DateFormatter}  dataField='Дата Заявки'
          
          dataAlign='center'
          headerAlign="center"
          width="160"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
      Дата Заявки
          </TableHeaderColumn>
       
          <TableHeaderColumn  className='test' dataField='Жанр'
          
          dataAlign='center'
          headerAlign="center"
          width="190"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Жанр
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='Количество Книг'
          
          dataAlign='center'
          headerAlign="center"
          width="190"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Количество книг
          </TableHeaderColumn>
       
        </BootstrapTable>



        <div  className={this.state.active ? 'modal_appl active': 'modal_appl'} onClick={()=>{
           
          this.setState({active:false})}} >
                <div style={{height:'300px'}} className='modal__content_appl' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{
                         
                      this.setState({active:false})}} className="close_popup_appl">x</Button>
                    <h3 className="modal__title_appl">Заявка №{this.state.nomerAppl}</h3>
                    <h3 className="modal__title2_appl">Автор: {this.state.name}</h3>
                    
         
                    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 670 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название Книги</TableCell>
              <TableCell align="left">Краткое описание</TableCell>
              <TableCell align="left">Ссылка на книгу</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.currentBooks.map((row) => (
              <TableRow
                key={row['Название Книги']}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row['Название Книги']}
                </TableCell>
                <TableCell align="right">{row['Краткое Описание']}</TableCell>
                <TableCell align="right"><a href='https://www.google.ru/books/edition/%D0%A1%D0%B8%D0%BD%D0%B8%D0%B9_%D1%84%D0%BE%D0%BD%D0%B0%D1%80%D1%8C/-uk_nsFqOh4C?hl=ru&gbpv=1'><Button>Посмотреть целиком</Button></a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                
                      
                     
                    <div className='modal__btns_appl'>

                    <Button  variant="outlined"  onClick={async ()=>{


                        this.setState({active:false})
                        this.setState({activeContact:true})
                        

                        if(this.state.showChoiceAuthor==false){

                             
                            

                            this.setState({activeContr:true})
                        }

                    }}>Заключить Контракт</Button>

                    <Button  variant="outlined" color="error" onClick={()=>{

                    

                      this.deleteData(rebindTable);
                      this.setState({active:false})
                      rebindTable();
                    }
                     
                      } >Отказать</Button>
                    </div>

                </div>
            </div>













        <div  className={this.state.activeContact&&this.state.showChoiceAuthor ? 'modal_appl active': 'modal_appl'} onClick={()=>{
           
          this.setState({active:false})}} >
                <div style={{height:'300px'}} className='modal__content_appl2' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{
                         
                      this.setState({active:false})}} 
                      className="close_popup_appl2">x</Button>
                    <h3 className="modal__title_appl2">Введите информацию об авторе {this.state.name}</h3>
                    
                    <TextField id="numberPhoneInput" 
                             style={{position:"relative",top:'0px', left:'0px'}}
                            label="Номер Телефона"  
                            margin="normal"
                            name = 'numberPhone'
                            variant="standard" 
                            helperText="Введите номер телефона"
                            // placeholder={this.state.selectCount}
                            onChange={this.setInputAuthor}
                            size="small"
                           
                            />
                 <h3>Дата рождения</h3>
<div style={{height:'40px'}}>
<input type="date" id="start"  name="datePicker"
       onChange={this.setInputAuthor}
       min="1935-01-01" max="2021-12-31"/>
</div>
                    <TextField id="genderInput" 
                 style={{position:"relative",top:'0px', right:'0px'}}
                 select
                            label="Пол"  
                            name='gender'
                            margin="normal"
                            variant="standard" 
                            helperText="Выберете пол"
                            // placeholder={this.state.selectCount}
                            onChange={this.setInputAuthor}
                            size="small"
                           
                            >
                 <MenuItem key={1} value={'М'}>
              М
            </MenuItem>
            <MenuItem key={4} value={"Ж"}>
              Ж
            </MenuItem>
            </TextField>

                    <TextField id="emailInput" 
                                             style={{position:"relative",top:'0px', right:'0px'}}

                            label="Email"  
                            margin="normal"
                            name='email'
                            variant="standard" 
                            helperText="Введите email"
                            // placeholder={this.state.selectCount}
                            onChange={this.setInputAuthor}
                            size="small"
                           
                            />
                     
                    <div className='modal__btns_appl2'>

                    <Button  variant="outlined"  onClick={()=>{
                        this.setState({activeContact:false})
                        this.setState({activeContr:true})

                        this.createAuthor()


                    }}>Продолжить</Button>

                    <Button  variant="outlined" color ='error' onClick={()=>{
                        this.setState({active:true})
                        this.setState({activeContact:false})
                    }
                     
                      } >Назад</Button>
                    </div>

                </div>
            </div>








        <div  className={this.state.activeContr ? 'modal_appl active': 'modal_appl'} onClick={()=>{
           
          this.setState({activeContact:false})}} >
                <div style={{height:'300px'}} className='modal__content_appl2' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{
                         
                      this.setState({active:false})}} 
                      className="close_popup_appl2">x</Button>
                    <h3 className="modal__title_appl2" style={{right:'10px'}}>Введите подробности контракта</h3>
                    
                    <TextField id="circulationInput" 
                             style={{position:"relative",top:'0px', left:'0px'}}
                            label="Тираж"  
                            margin="normal"
                            name = 'circulation'
                            variant="standard" 
                            helperText="Введите тираж"
                            // placeholder={this.state.selectCount}
                            onChange={this.setInputAuthor}
                            size="small"
                           
                            />
          

                    <TextField id="termInput" 
                 style={{position:"relative",top:'0px', right:'0px'}}
                 
                            label="Срок"  
                            margin="normal"
                            variant="standard" 
                            name = 'term'

                            helperText="Выберете срок"
                            // placeholder={this.state.selectCount}
                            onChange={this.setInputAuthor}
                            size="small"
                           
                            >
            
            </TextField>

                    <TextField id="feeInput" 
                                             style={{position:"relative",top:'0px', right:'0px'}}

                            label="Гонорар"  
                            margin="normal"
                            variant="standard" 
                            name = 'fee'
                            helperText="Введите гонорар"
                            // placeholder={this.state.selectCount}
                            onChange={this.setInputAuthor}
                            size="small"
                           
                            />
                     
                    <div className='modal__btns_appl2'>

                    <Button  variant="outlined"  onClick={async ()=>{
                        await this.createContract()
                        this.setState({activeContr:false})

                        for(let i=0; i<this.state.currentBooks.length; i++){
                           await this.createBook(this.state.currentBooks[i]['Название Книги'],i)
                        }
                        this.deleteData();
                        rebindTable();
                        document.getElementById('circulationInput').value = ''
                        document.getElementById('emailInput').value = ''
                        document.getElementById('genderInput').value = ''
                        document.getElementById('numberPhoneInput').value = ''
                        document.getElementById('termInput').value = ''
                        document.getElementById('feeInput').value = ''
                    }}>Заключить</Button>

                    <Button  variant="outlined" color ='error' onClick={()=>{
                        this.setState({activeContact:true})
                        this.setState({activeContr:false})
                    }
                     
                      } >Назад</Button>
                    </div>

                </div>
            </div>

       
      </div>
    );
      
      
  }
}
 
export default TableClient;




{/* <BootstrapTable 
data={this.state.currentBooks} 
expandableRow={ () => { return true; } }
expandComponent={ ()=>{return true}}
>
 


  <TableHeaderColumn className='test' isKey dataField='Название Книги'
  dataAlign='center'
  headerAlign="center"
  width="240"
  tdStyle={
    {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
  Название Книги
  </TableHeaderColumn>
 

  <TableHeaderColumn className='test'  dataField='Краткое Описание'
  dataAlign='center'
  headerAlign="center"
  width="200"
  tdStyle={
    {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
  Краткое Описание
  </TableHeaderColumn>
 

  <TableHeaderColumn className='test'  dataField='Ссылка'
  dataAlign='center'
  headerAlign="center"
  width="200"
  tdStyle={
    {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
  Ссылка на кингу
  </TableHeaderColumn>
 

</BootstrapTable> */}
