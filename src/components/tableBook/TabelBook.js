import React, { Component } from 'react';
import Buttons from '../buttons/Buttons'
import Dialog from '../dialog/Dialog'
import Update from '../update/Update'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './style.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import { ThemeConsumer } from 'styled-components';











class TableBook extends Component {

  constructor(props){
    super(props)
    this.state = { 
      selectedRow:'',
      selectedId : '',
      selectName: '',
      selectCount: '',
      selectState: '',
      selectPrice: '',
      selectContractNumber: ' ',
      active:false
    }
   
  }

  componentDidMount(){
  this.onSelectRow=this.onSelectRow.bind(this);
  this.deleteData=this.deleteData.bind(this);
  this.setStateBook=this.setStateBook.bind(this);
  this.setCountBook=this.setCountBook.bind(this);
  this.setPriceBook=this.setPriceBook.bind(this);
}

DateFormatter(cell) {
  if(cell){
  cell = cell.split('');
  cell.splice(-14, 14)
  cell = cell.join('')
  return ` ${cell}`;
  }
};



onSelectRow(row, isSelected, e) {
  if (isSelected) {
    // console.log(this.state.selectedRow);
    
    let selectedId = row['ID_Книги']
    let selectName = row['Название Книги']
    let selectCount = row['Количество']
    let selectState = row['Состояние']
    let selectPrice = row['Цена']
    let selectContractNumber = row['Номер Контракта']


    this.setState({selectName:selectName})
    this.setState({selectCount:selectCount})
    this.setState({selectState:selectState})
    this.setState({selectPrice:selectPrice})
    this.setState({selectContractNumber:selectContractNumber})
    this.setState({active:true})
    


    // this.state.allRows;
  }
};


async deleteData(){
  let book = this.state.selectName; 
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: book,
      bd : 'Книги',
      field : '[Название Книги]'
    })
  })
  .then(res=> res);
  console.log(newData);
  this.props.rebindTable();
}


 
setStateBook(e){
  debugger
  this.setState({selectState:e.target.value})
}
setCountBook(e){
  debugger
  let value = e.target.value;
  if(value.length>0){

  if(!Number.isInteger(parseInt(value[value.length-1])))
  {
    alert('Ошибка! Введите число')
    e.target.value=''
  }
}
  this.setState({selectCount:e.target.value})
}
setPriceBook(e){
  debugger
  let value = e.target.value;
  if(value.length>0){

  if(!Number.isInteger(parseInt(value[value.length-1])))
  {
    alert('Ошибка! Введите число')
    e.target.value=''

  }
}
  this.setState({selectPrice:e.target.value})
}

  

  
  render() {
  const  selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onSelectRow,
      bgColor: 'gold'
    }
    const {data,rebindTable,view}=this.props
    
     const currencies = [
       "В производстве","В продаже",'Снята с продажи'
      ]



      if(view=='All'){



        return (
          <div className={view=='All' ? "allbooks":'books'}
         
          >
    
            <BootstrapTable 
             
            data={this.props.data} 
            selectRow={selectRowProp}
    
            >
             
              <TableHeaderColumn className='test'  isKey dataField='ID_Книги'
              dataAlign='center'
              headerAlign="center"
              width="150"
              tdStyle={
                {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
             ID_Книги
              </TableHeaderColumn>
              <TableHeaderColumn className='test'   dataField='Название Книги'
              dataAlign='center'
              headerAlign="center"
              width="450"
              tdStyle={
                {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
             Название Книги
              </TableHeaderColumn>
              <TableHeaderColumn className='test' dataField='Количество'
              dataAlign='center'
              headerAlign="center"
              width="170"
              tdStyle={
                {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
              Количество
              </TableHeaderColumn>
              <TableHeaderColumn className='test' dataField='Состояние'
              dataAlign='center'
              headerAlign="center"
              width="190"
              tdStyle={
                {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
              Состояние
              </TableHeaderColumn>
              <TableHeaderColumn  className='test' dataField='Цена'
              
              dataAlign='center'
              headerAlign="center"
              width="100"
              tdStyle={
                {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
              Цена
              </TableHeaderColumn>
           
              <TableHeaderColumn  className='test' dataField='Номер Контракта'
              
              dataAlign='center'
              headerAlign="center"
              width="150"
              tdStyle={
                {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
            Номер Контракта
              </TableHeaderColumn>
           
            </BootstrapTable>
    
    
            <div className={this.state.active ? 'modal active': 'modal'} onClick={()=>{this.setState({active:false})}} >
                    <div className='modal__content' onClick={(e)=>{e.stopPropagation()}}>
                        <Button  onClick={()=>{

                           document.getElementById('countAllBookInput').value = ''
                           document.getElementById('allBookPrice').value = ''
                          
                          
                          this.setState({active:false})}} className="close_popup">x</Button>
                        <h3 className="modal__title">{this.state.selectName}</h3>
                        <TextField id="standard-basic" 
                            select
                            label="Состояние"  
                            margin="normal"
                            name = 'contractNumber'
                            variant="standard" 
                            helperText="Выберете состояние"
                            value={this.state.selectState}
                            onChange={this.setStateBook}
                            size="small"
                           
                            >
                              {currencies.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                          </TextField>
                        <TextField id="countAllBookInput" 
                            
                            label="Количество"  
                            margin="normal"
                            variant="standard" 
                            helperText="Введите количество книг на складе"
                            placeholder={this.state.selectCount}
                            onChange={this.setCountBook}
                            size="small"
                           
                            />
                          
                        <TextField id="allBookPrice" 
                            
                            label="Цена"  
                            margin="normal"
                             variant="standard" 
                            helperText="Введите цену книгу"
                            placeholder={this.state.selectPrice}

                            onChange={this.setPriceBook}
                            size="small"
                            />
                         
                        <div className='modal__btns'>
    
                        <Button  variant="outlined"  onClick={async ()=>{
                           document.getElementById('allBookPrice').value = ''
                           document.getElementById('countAllBookInput').value = ''
                            const newData = await fetch('/update',{
                              method: "POST",
                              headers:{
                                'content-type': 'application/json',
                                'Accept' : 'application/json'
                              },
                              body: JSON.stringify({
                              Name:this.state.selectName,
                              Count:this.state.selectCount,
                              State:this.state.selectState,
                              Price:this.state.selectPrice,
                              ContractNumber:this.state.selectContractNumber,
                              type:'book'
    
                              })
                            })
                            .then(res=> res);
                            this.setState({active:false})
                            rebindTable();
                        }}>Внести изменения</Button>
                        <Button  variant="outlined" color="error" onClick={()=>{

document.getElementById('allBookPrice').value = ''
document.getElementById('countAllBookInput').value = ''

                          this.deleteData();
                          this.setState({active:false})}
                          } >Удалить</Button>
                        </div>
    
                    </div>
                </div>
          
          </div>
        )

      }
      else{

    return (
      <div className={view=='All' ? "allbooks":'books'}
    
      >

        <BootstrapTable 
        data={this.props.data} 
        selectRow={selectRowProp}

        >
         
          <TableHeaderColumn className='test'  isKey dataField='ID_Книги'
          dataAlign='center'
          headerAlign="center"
          width="150"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
         ID_Книги
          </TableHeaderColumn>
          <TableHeaderColumn className='test'   dataField='Название Книги'
          dataAlign='center'
          headerAlign="center"
          width="450"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
         Название Книги
          </TableHeaderColumn>
          {/* <TableHeaderColumn className='test' dataField='Количество'
          dataAlign='center'
          headerAlign="center"
          width="170"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Количество
          </TableHeaderColumn> */}
          <TableHeaderColumn className='test' dataField='Состояние'
          dataAlign='center'
          headerAlign="center"
          width="190"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Состояние
          </TableHeaderColumn>
          {/* <TableHeaderColumn  className='test' dataField='Цена'
          
          dataAlign='center'
          headerAlign="center"
          width="100"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Цена
          </TableHeaderColumn> */}
       
          <TableHeaderColumn  className='test' dataField='Номер Контракта'
          
          dataAlign='center'
          headerAlign="center"
          width="150"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
        Номер Контракта
          </TableHeaderColumn>
       
        </BootstrapTable>


        <div className={this.state.active ? 'modal active': 'modal'} onClick={()=>{
             document.getElementById('countWorkBook').value = ''
             document.getElementById('workBookPrice').value = ''
          this.setState({active:false})}} >
                <div className='modal__content' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{
                      document.getElementById('countWorkBook').value = ''
                      document.getElementById('workBookPrice').value = ''
                      this.setState({active:false})}} className="close_popup">x</Button>
                    <h3 className="modal__title">{this.state.selectName}</h3>
                    <TextField id="standard-basic" 
                        select
                        label="Состояние"  
                        margin="normal"
                        name = 'contractNumber'
                        variant="standard" 
                        helperText="Выберете состояние"
                        value={this.state.selectState}
                        onChange={this.setStateBook}
                        size="small"
                       
                        >
                          {currencies.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                      </TextField>
                    <TextField id="countWorkBook" 
                        
                        label="Количество"  
                        margin="normal"
                        variant="standard" 
                        helperText="Введите количество книг на складе"
                        onChange={this.setCountBook}
                        size="small"
                       
                        />
                      
                    <TextField id="workBookPrice" 
                        
                        label="Цена"  
                        margin="normal"
                         variant="standard" 
                        helperText="Введите цену книгу"
                        onChange={this.setPriceBook}
                        size="small"
                        />
                     
                    <div className='modal__btns'>

                    <Button  variant="outlined"  onClick={async ()=>{
                         document.getElementById('countWorkBook').value = ''
                         document.getElementById('workBookPrice').value = ''
                        const newData = await fetch('/update',{
                          method: "POST",
                          headers:{
                            'content-type': 'application/json',
                            'Accept' : 'application/json'
                          },
                          body: JSON.stringify({
                          Name:this.state.selectName,
                          Count:this.state.selectCount,
                          State:this.state.selectState,
                          Price:this.state.selectPrice,
                          ContractNumber:this.state.selectContractNumber,
                          type:'book'

                          })
                        })
                        .then(res=> res);
                        this.setState({active:false})
                        rebindTable();
                    }}>Внести изменения</Button>
                    <Button  variant="outlined" color="error" onClick={()=>{
                         document.getElementById('countWorkBook').value = ''
                         document.getElementById('workBookPrice').value = ''
                      this.deleteData();
                      rebindTable();
                      this.setState({active:false})}
                      } >Удалить</Button>
                    </div>

                </div>
            </div>
      
      </div>
    );
    }
  }
}
 
export default TableBook;