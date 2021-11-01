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






class TableSotr extends Component {

  constructor(props){
    super(props)
    this.state = { 
       Id_sotr:'',
       FIO : '',
       Gender : '',
       post: '',
       salary:'',
       Phone:'',
       active:false
    }
   
  }

  componentDidMount(){
  this.onSelectRow=this.onSelectRow.bind(this);
  this.deleteData=this.deleteData.bind(this);
  this.setPhone=this.setPhone.bind(this);
  this.setSalary=this.setSalary.bind(this);

}



testD(cell){
 
  return cell
}



onSelectRow(row, isSelected, e) {
  if (isSelected) {
    
    let  Id_sotr = row['ID_Сотрудника']
    let  FIO = row['ФИО']
    let  Gender = row['Пол']
    let  post = row['Должность']
    let  salary = row['Зарплата']
    let  Phone = row['Номер Телефона']
   


    this.setState({ Id_sotr: Id_sotr})
    this.setState({ FIO: FIO})
    this.setState({ Gender: Gender})
    this.setState({ post: post})
    this.setState({ salary: salary})
    this.setState({ Phone: Phone})
    this.setState({active:true})

    
  }
};


async deleteData(props){
  
  let book = this.state.Id_sotr; 
  
  const newData = await fetch('/delete',{
    method: "POST",
    headers:{
      'content-type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({
      name: book,
      bd : 'Сотрудник',
      field : '[ID_Сотрудника]'
    })
  })
  .then(res=> res);
  console.log(newData);
  props.rebindTable();
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
  this.setState({Phone:e.target.value})
}
  
setSalary(e){
  let value = e.target.value;
  if(value.length>0){

  if(!Number.isInteger(parseInt(value[value.length-1])))
  {
    alert('Ошибка! Введите число')
    e.target.value=''

  }
}
  this.setState({salary:e.target.value})
}
  

  
  render() {
    
  const  selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onSelectRow,
      bgColor: 'gold'
    }
    const {rebindTable,data}=this.props
     debugger
    return (
      <div  style={{position:'relative', left:'275px', top:'90px'}}>
        

        <BootstrapTable 
        data={data} 
        selectRow={selectRowProp}
        >
         
        
          {/* <TableHeaderColumn className='test' isKey dataFormat={this.testD} dataField='ID_Сотрудника'
          dataAlign='center'
          headerAlign="center"
          width="130"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          ID_Сотрудника
          </TableHeaderColumn> */}
          <TableHeaderColumn className='test' isKey dataFormat={this.testD} dataField='ФИО'
          dataAlign='center'
          headerAlign="center"
          width="200"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          ФИО
          </TableHeaderColumn>
          <TableHeaderColumn className='test' dataField='Пол'
          dataAlign='center'
          headerAlign="center"
          width="100"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
          Пол
          </TableHeaderColumn>
          <TableHeaderColumn  className='test' dataFormat={this.DateFormatter}  dataField='Должность'
          
          dataAlign='center'
          headerAlign="center"
          width="160"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
        Должность
          </TableHeaderColumn>


          <TableHeaderColumn  className='test' dataFormat={this.DateFormatter}  dataField='Зарплата'
          
          dataAlign='center'
          headerAlign="center"
          width="160"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
        Зарплата
          </TableHeaderColumn>
       
          <TableHeaderColumn  className='test' dataField='Номер Телефона'
          
          dataAlign='center'
          headerAlign="center"
          width="190"
          tdStyle={
            {backgroundColor: '#f8f4ff'},{border: 'solid 1px black'}}>
       Номер Телефона
          </TableHeaderColumn>
       
        </BootstrapTable>


        <div  className={this.state.active ? 'modal_sotr active': 'modal_sotr'} onClick={()=>{
           document.getElementById('phoneSotrInput').value = ''
           document.getElementById('salaryInput').value = ''
          this.setState({active:false})}} >
                <div style={{height:'300px'}} className='modal__content_sotr' onClick={(e)=>{e.stopPropagation()}}>
                    <Button  onClick={()=>{
                          document.getElementById('phoneSotrInput').value = ''
                          document.getElementById('salaryInput').value = ''
                      this.setState({active:false})}} className="close_popup_sotr">x</Button>
                    <h3 className="modal__title_sotr">{this.state.FIO}</h3>
                    
                    <TextField id="phoneSotrInput" 
                        
                        label="Телефон"  
                        margin="normal"
                        variant="standard" 
                        helperText="Введите телефон"
                        placeholder={this.state.Phone}
                         onChange={this.setPhone}
                        size="small"
                       
                        />
                    <TextField id="salaryInput" 
                        
                        label="Зарплата"  
                        margin="normal"
                        variant="standard" 
                        placeholder={this.state.salary}
                        helperText="Введите зарплату"
                         onChange={this.setSalary}
                        size="small"
                       
                        />
                      
                
                      
                     
                    <div className='modal__btns_sotr'>

                    <Button  variant="outlined"  onClick={async ()=>{


                      document.getElementById('phoneSotrInput').value = ''
                      document.getElementById('salaryInput').value = ''

                      debugger
                        const newData = await fetch('/update',{
                          method: "POST",
                          headers:{
                            'content-type': 'application/json',
                            'Accept' : 'application/json'
                          },
                          body: JSON.stringify({
                          Phone:this.state.Phone,
                          salary:this.state.salary,
                          FIO:this.state.FIO,
                          Id_sotr:this.state.Id_sotr,
                          type:'sotr'

                          })
                        })
                        .then(res=> res);
                        this.setState({active:false})
                        rebindTable();
                    }}>Внести изменения</Button>
                    <Button  variant="outlined" color="error" onClick={()=>{

                        document.getElementById('phoneSotrInput').value = ''
                        document.getElementById('salaryInput').value = ''

                      this.deleteData(rebindTable);
                      this.setState({active:false})
                      rebindTable();
                    }
                     
                      } >Уволить</Button>
                    </div>

                </div>
            </div>
      </div>
    );
  }
}
 
export default TableSotr;