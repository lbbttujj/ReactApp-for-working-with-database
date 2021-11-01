import React, { Component } from 'react';
import Buttons from '../buttons/Buttons'
import Dialog from '../dialog/Dialog'
import Update from '../update/Update'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './style.css';
import '../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'






class Table1 extends Component {

  constructor(props){
    super(props)
    this.state = { 
      selectedRow : ' ',
      selectFIO: ' ',
      selectBorn: ' ',
      selectPhone: ' ',
      selectGender: ' ',
      selectEmail: ' ',
      active:false
    }
   
  }

  componentDidMount(){
  this.onSelectRow=this.onSelectRow.bind(this);
  this.deleteData=this.deleteData.bind(this);
  this.setPhone=this.setPhone.bind(this);
  this.setEmail=this.setEmail.bind(this);
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
    let currentRowId = row['ФИО Автора']
    let currentBorn = row['Дата Рождения']
    let currentPhone = row['Номер Телефона']
    let currentGender = row['Пол']
    let currentEmail = row['Email']
    this.setState({selectedRow:currentRowId});

    this.setState({selectFIO:currentRowId})
    this.setState({selectBorn:this.DateFormatter(currentBorn)})
    this.setState({selectPhone:currentPhone})
    this.setState({selectGender:currentGender})
    this.setState({selectEmail:currentEmail})
    this.setState({active:true})
    // this.state.allRows;
  }
};


async deleteData(){
  let author = this.state.selectedRow; 
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: author,
      bd : 'Автор',
      field : '[ФИО Автора]'
    })
  })
  .then(res=> res);
  console.log(newData);
  this.props.rebindTable();
}


 
setPhone(e){
  let value = e.target.value;
  if(value.length>0){

  if(!Number.isInteger(parseInt(value[value.length-1])))
  {
    alert('Ошибка! Введите число')
    e.target.value=''

  }
}
  this.setState({selectPhone:e.target.value})
}
setEmail(e){
  
  this.setState({selectEmail:e.target.value})
}

  

  
  render() {
  const  selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onSelectRow,
      bgColor: 'gold'
    }
    const {rebindTable}=this.props
    return (
      <div style={{position:'relative',left:'300px', top:'55px'}}>

        <BootstrapTable 
        data={this.props.data} 
        selectRow={selectRowProp}
        >
          <TableHeaderColumn className='test'isKey dataField='ФИО Автора'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          ФИО Автора
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataFormat={this.DateFormatter} dataField='Дата Рождения'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Дата Рождения
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataField='Номер Телефона'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Номер Телефона
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataField='Пол'
          dataAlign='center'
          headerAlign="center"
          width="100"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Пол
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataField='Email'
          
          dataAlign='center'
          headerAlign="center"
          width="150"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Email
          </TableHeaderColumn>
       
        </BootstrapTable>



        <div  className={this.state.active ? 'modal_author active': 'modal_author'} onClick={()=>{
            document.getElementById('phoneClientInput').value = ''
            document.getElementById('emailInput').value = ''
          this.setState({active:false})}} >
                <div style={{height:'300px'}} className='modal__content_author' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{
                       document.getElementById('phoneClientInput').value = ''
                       document.getElementById('emailInput').value = ''
                      this.setState({active:false})}} className="close_popup_author">x</Button>
                    <h3 className="modal__title_author">{this.state.selectFIO}</h3>
                    
                    <TextField id="phoneClientInput" 
                        
                        label="Телефон"  
                        margin="normal"
                        variant="standard" 
                        placeholder ={this.state.selectPhone}
                        helperText="Введите телефон"
                         onChange={this.setPhone}
                        size="small"
                       
                        />
                    <TextField id="emailInput" 
                        
                        label="Email"  
                        margin="normal"
                        variant="standard" 
                        placeholder={this.state.selectEmail}
                        helperText="Введите email"
                         onChange={this.setEmail}
                        size="small"
                       
                        />
                      
                
                      
                     
                    <div className='modal__btns_author'>

                    <Button  variant="outlined"  onClick={async ()=>{
                       document.getElementById('phoneClientInput').value = ''
                       document.getElementById('emailInput').value = ''
                      debugger
                        const newData = await fetch('/update',{
                          method: "POST",
                          headers:{
                            'content-type': 'application/json',
                            'Accept' : 'application/json'
                          },
                          body: JSON.stringify({
                          Phone:this.state.selectPhone,
                          // Email:this.state.selectEmail,
                          FIO:this.state.selectFIO,
                          email:this.state.selectEmail,
                          // Price:this.state.selectPrice,
                          // ContractNumber:this.state.selectContractNumber,
                          type:'author'

                          })
                        })
                        .then(res=> res);
                        this.setState({active:false})
                        rebindTable();
                    }}>Внести изменения</Button>
                    {/* <Button  variant="outlined" color="error" onClick={()=>{
                      this.deleteData();
                      this.setState({active:false})}
                      } >Удалить</Button> */}
                    </div>

                </div>
            </div>
      
      </div>
    );
  }
}
 
export default Table1;