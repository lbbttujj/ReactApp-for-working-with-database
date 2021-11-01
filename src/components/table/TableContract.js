import React, { Component } from 'react';
import Buttons from '../buttons/Buttons'
import Dialog from '../dialog/Dialog'
import Update from '../update/Update'
import Button from '@mui/material/Button';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './style.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';





class TableContract extends Component {

  constructor(props){
    super(props)
    this.state = { 
      contractNumber:'',
      Name : '',
      circulation : '',
      term: '',
      СonclusionDate:'',
      fee: '',
      Id_Sotr: '',
      StatusAppl: '',
      CountBooks: '',
      genre: '',
      active:false
    }
   
  }

  componentDidMount(){
  this.onSelectRow=this.onSelectRow.bind(this);
  this.deleteData=this.deleteData.bind(this);
  this.setCirculation=this.setCirculation.bind(this);
  this.StatusAppl=this.StatusAppl.bind(this);
  this.setFee=this.setFee.bind(this);
  this.setTerm=this.setTerm.bind(this);
  this.deleteBook=this.deleteBook.bind(this);
  this.deleteAuthor=this.deleteAuthor.bind(this);
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



onSelectRow(row, isSelected, e) {
  if (isSelected) {
    
    let contractNumber = row['Номер контракта']
    let Name = row['Имя Автора']
    let circulation = row['Тираж']
    let term = row['Срок']
    let СonclusionDate = row['Дата Заключения']
    let fee = row['Гонорар']
    let Id_Sotr = row['ID_Сотрудника']
    let StatusAppl = row['Состояние Заявки']
    let CountBooks = row['Количество книг']
    let genre = row['Жанр']


    this.setState({contractNumber:contractNumber})
    this.setState({Name:Name})
    this.setState({circulation:circulation})
    this.setState({term:term})
    this.setState({СonclusionDate:this.DateFormatter(СonclusionDate)})
    this.setState({fee:fee})
    this.setState({Id_Sotr:Id_Sotr})
    this.setState({StatusAppl:StatusAppl})
    this.setState({CountBooks:CountBooks})
    this.setState({genre:genre})
    this.setState({active:true})


    
  }
};


async deleteData(){
  debugger
  let book = this.state.contractNumber; 
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: book,
      bd : 'Контракт',
      field : '[Номер контракта]'
    })
  })
  .then(res=> res);
  console.log(newData);
}


async deleteAuthor(){
  debugger
  let book = this.state.Name; 
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: book,
      bd : 'Автор',
      field : '[ФИО Автора]'
    })
  })
  .then(res=> res);
}


async deleteBook(){
  
  debugger
  let book = this.state.contractNumber; 
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: book,
      bd : 'Книги',
      field : '[Номер Контракта]'
    })
  })
  .then(res=> res);
  console.log(newData);
}


StatusAppl(e){
  debugger
  this.setState({StatusAppl:e.target.value})
}
setCirculation(e){
  debugger
  let value = e.target.value;
  if(value.length>0){
    if(!Number.isInteger(parseInt(value[value.length-1])))
    {
      alert('Ошибка! Введите число')
      e.target.value=''
    }
  }
  this.setState({circulation:value})

}
setFee(e){
  debugger
  let value = e.target.value;
  if(value.length>0){

  if(!Number.isInteger(parseInt(value[value.length-1])))
  {
    alert('Ошибка! Введите число')
    e.target.value=''
  }
}
  this.setState({fee:e.target.value})
}
setTerm(e){
  debugger
  let value = e.target.value;
  if(value.length>0){
  if(!Number.isInteger(parseInt(value[value.length-1])))
  {
    alert('Ошибка! Введите число')
    e.target.value=''

  }
}
  this.setState({term:e.target.value})
}


  

  
  render() {
    
    debugger
  const  selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onSelectRow,
      bgColor: 'gold'
    }

    const currencies = [
      "Одобрена","На рассмотрении"
     ]

    const {rebindTable,data,sotr}=this.props
    // let data_ = data
    if(data){
      if(data.length>0)
    if(typeof(data[0]["ID_Сотрудника"])=='number'){
    for (let i=0; i<data.length; i++){
      data[i]["ID_Сотрудника"] = sotr[data[i]["ID_Сотрудника"]]
      }
    }
  }
    return (
      <div style={{position:'relative', top:'-70px'}}>
    

        <BootstrapTable 
        data={data} 
        selectRow={selectRowProp}
        >
         
        
          <TableHeaderColumn className='test' isKey dataFormat={this.testD} dataField='Номер контракта'
          dataAlign='center'
          headerAlign="center"
          width="160"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Номер Контракта
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataFormat={this.testD} dataField='Имя Автора'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Имя Автора
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataField='Тираж'
          dataAlign='center'
          headerAlign="center"
          width="100"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Тираж
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='Срок'
          
          dataAlign='center'
          headerAlign="center"
          width="60"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
        Срок
          </TableHeaderColumn>
       
          <TableHeaderColumn  className='test' dataFormat={this.DateFormatter} dataField='Дата Заключения'
          
          dataAlign='center'
          headerAlign="center"
          width="190"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Дата Заключения
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='Гонорар'
          
          dataAlign='center'
          headerAlign="center"
          width="90"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Гонорар
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='ID_Сотрудника'
          
          dataAlign='center'
          headerAlign="center"
          width="150"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
      Имя Сотрудника
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='Состояние Заявки'
          
          dataAlign='center'
          headerAlign="center"
          width="150"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Статус Заявки
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='Количество книг'
          
          dataAlign='center'
          headerAlign="center"
          width="150"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Количество Книг
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='Жанр'
          
          dataAlign='center'
          headerAlign="center"
          width="150"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Жанр
          </TableHeaderColumn>
       
        </BootstrapTable>

        <div className={this.state.active ? 'modal_contr active': 'modal_contr'} onClick={()=>{
           document.getElementById('term').value = ''
           document.getElementById('fee').value = ''
           document.getElementById('circulation').value = ''
          this.setState({active:false})}} >
                <div className='modal__content_contr' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{
                              document.getElementById('term').value = ''
                              document.getElementById('fee').value = ''
                              document.getElementById('circulation').value = ''
                      this.setState({active:false})}} className="close_popup_contr">x</Button>
                    <h3 className="modal__title_contr">Контракт №{this.state.contractNumber} </h3>
                    <h3 className="modal__title_contr">Автор: {this.state.Name} </h3>


                    <TextField id="standard-basic" 
                        select
                        label="Cтатус заявки"  
                        margin="normal"
                        name = 'contractNumber'
                        variant="standard" 
                        helperText="Выберете статус"
                        // value={this.state.StatusAppl}
                        onChange={this.StatusAppl}
                        size="small"
                       
                        >
                         {currencies.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                            </TextField>
                    <TextField id="circulation" 
                        
                        label="Тираж"  
                        margin="normal"
                        name = 'circulation'
                        variant="standard" 
                        helperText="Введите тираж"
                        placeholder={this.state.circulation}
                        onChange={this.setCirculation}
                        size="small"
                       
                        />
                    <TextField id="fee" 
                        
                        label="Гонорар"  
                        margin="normal"
                        name = 'fee'
                        variant="standard" 
                        helperText="Введите гонорар"
                        placeholder={this.state.fee}
                        onChange={this.setFee}
                        size="small"
                       
                        />

                    <TextField id="term" 
                        
                        label="Срок"  
                        margin="normal"
                        name = 'term'
                        variant="standard" 
                        helperText="Введите срок"
                        placeholder={this.state.fee}
                        onChange={this.setTerm}
                        size="small"
                       
                        />
                       
                    
                     
                    <div className='modal__btns_contr'>

                    <Button  variant="outlined"  onClick={async ()=>{
                              document.getElementById('term').value = ''
                              document.getElementById('fee').value = ''
                              document.getElementById('circulation').value = ''
                      debugger
                        const newData = await fetch('/update',{
                          method: "POST",
                          headers:{
                            'content-type': 'application/json',
                            'Accept' : 'application/json'
                          },
                          body: JSON.stringify({
                          circulation:this.state.circulation,
                          term:this.state.term,
                          fee:this.state.fee,
                          StatusAppl:this.state.StatusAppl,
                          contractNumber:this.state.contractNumber,
                          type:'contract'

                      


                          })
                        })
                        .then(res=> res);
                        this.setState({active:false})
                        rebindTable();
                    }}>Внести изменения</Button>
                    <Button  variant="outlined" color="error" onClick={async ()=>{
                              document.getElementById('term').value = ''
                              document.getElementById('fee').value = ''
                              document.getElementById('circulation').value = ''
                              await this.deleteBook();
                              await this.deleteData();
                              await this.deleteAuthor();
                      rebindTable();
                      this.setState({active:false})}
                      } >Рассторгнуть</Button>
                    </div>

                </div>
            </div>
      </div>
    );
  }
}
 
export default TableContract;